import { useCallback, useEffect, useRef, useState } from "react";
import { LAB_SESSION_TURNS, parseLabResult, requestLabDemo, type LabDemoId, type LabMessage, type LabReplay, type LabResult } from "@/lib/lab-demo";
import { LYNKIE_SAFETY_MESSAGE, needsLynkieSafetyResponse, scrubLabPii } from "../../supabase/functions/ai-lab-demo/privacy";

const memoryTurns = new Map<LabDemoId, number>();
function readTurns(demoId: LabDemoId): number {
  try {
    const count = Number(sessionStorage.getItem(`ai-lab:turns:${demoId}`));
    return Number.isInteger(count) && count >= 0 ? Math.max(count, memoryTurns.get(demoId) ?? 0) : memoryTurns.get(demoId) ?? 0;
  } catch { return memoryTurns.get(demoId) ?? 0; }
}
function reserveTurn(demoId: LabDemoId): number | null {
  const turns = readTurns(demoId);
  if (turns >= LAB_SESSION_TURNS) return null;
  const next = turns + 1;
  memoryTurns.set(demoId, next);
  try { sessionStorage.setItem(`ai-lab:turns:${demoId}`, String(next)); } catch { /* In-memory fallback never persists content. */ }
  return next;
}

interface UseLabDemoOptions { demoId: LabDemoId; replay: LabReplay }

/** The future Lab supplies its script; conversations exist only in this mounted hook's state. */
export function useLabDemo({ demoId, replay }: UseLabDemoOptions) {
  const [messages, setMessages] = useState<LabMessage[]>([]);
  const [result, setResult] = useState<LabResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turns, setTurns] = useState(() => readTurns(demoId));
  const busy = useRef(false);
  const generation = useRef(0);
  const history = useRef<LabMessage[]>([]);
  const replayMode = useRef(false);
  const replayRef = useRef(replay);
  replayRef.current = replay;

  useEffect(() => {
    generation.current++;
    history.current = [];
    replayMode.current = false;
    busy.current = false;
    setMessages([]); setResult(null); setError(null); setIsReplay(false); setIsLoading(false); setTurns(readTurns(demoId));
    return () => { generation.current++; };
  }, [demoId]);

  const sendMessage = useCallback(async (content: string, options: Record<string, string> = {}): Promise<LabResult | null> => {
    if (busy.current) return null;
    if (!content.trim() || content.trim().length > 500) {
      setError("Enter a message between 1 and 500 characters."); return null;
    }
    const count = reserveTurn(demoId);
    if (count === null) { setError("This demo's six session turns are used."); return null; }
    setTurns(count); setError(null); setIsLoading(true); busy.current = true;
    const currentGeneration = generation.current;
    const scrubbed = scrubLabPii(content.trim());
    const nextMessages: LabMessage[] = [...history.current, { role: "user", content: scrubbed }];
    history.current = nextMessages;
    setMessages(nextMessages);
    const context = { demoId, messages: nextMessages.slice(-12), options: Object.fromEntries(Object.entries(options).map(([key, value]) => [key, scrubLabPii(value)])) };
    try {
      let output: LabResult;
      if (demoId === "lynkie" && needsLynkieSafetyResponse(scrubbed)) output = { message: LYNKIE_SAFETY_MESSAGE };
      else if (replayMode.current) output = parseLabResult(await replayRef.current(context));
      else {
        const response = await requestLabDemo(context);
        if ("replay" in response) {
          replayMode.current = true;
          output = parseLabResult(await replayRef.current(context));
        } else output = response;
      }
      if (generation.current !== currentGeneration) return null;
      const assistant = scrubLabPii("message" in output ? output.message : JSON.stringify(output.artefact));
      const safeOutput = parseLabResult(JSON.parse(scrubLabPii(JSON.stringify(output))));
      history.current = [...nextMessages, { role: "assistant", content: assistant.slice(0, 500) }];
      setMessages(history.current); setResult(safeOutput); setIsReplay(replayMode.current);
      return safeOutput;
    } catch {
      if (generation.current === currentGeneration) setError("The demo is unavailable. Please try again later.");
      return null;
    } finally {
      if (generation.current === currentGeneration) { busy.current = false; setIsLoading(false); }
    }
  }, [demoId]);

  return { messages, result, isLoading, isReplay, error, turns, canSend: turns < LAB_SESSION_TURNS && !isLoading, sendMessage };
}
