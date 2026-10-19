import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useLabDemo } from "./useLabDemo";
import { requestLabDemo } from "@/lib/lab-demo";
vi.mock("@/lib/lab-demo", async importOriginal => ({ ...await importOriginal<typeof import("@/lib/lab-demo")>(), requestLabDemo: vi.fn() }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });
describe("Lab hook", () => {
  it("scrubs input before state and calls and enforces six session turns across remounts", async () => {
    vi.mocked(requestLabDemo).mockResolvedValue({ message: "Example response" });
    const replay = vi.fn(() => ({ message: "Scripted replay" }));
    const first = renderHook(() => useLabDemo({ demoId: "whatsapp", replay }));
    for (let index = 0; index < 6; index++) await act(async () => { await first.result.current.sendMessage("test@example.com 072 974 9703"); });
    expect(first.result.current.turns).toBe(6);
    expect(first.result.current.messages[0].content).toBe("[removed] [removed]");
    expect(requestLabDemo).toHaveBeenCalledTimes(6);
    expect(JSON.stringify(vi.mocked(requestLabDemo).mock.calls)).not.toContain("test@example.com");
    first.unmount();
    const second = renderHook(() => useLabDemo({ demoId: "whatsapp", replay }));
    await act(async () => { await second.result.current.sendMessage("A seventh message"); });
    expect(requestLabDemo).toHaveBeenCalledTimes(6);
    expect(second.result.current.canSend).toBe(false);
    expect(sessionStorage.getItem("ai-lab:turns:whatsapp")).toBe("6");
    expect(localStorage.length).toBe(0);
    expect(JSON.stringify(sessionStorage)).not.toContain("removed");
  });
  it("switches to caller-owned replay without more model calls", async () => {
    vi.mocked(requestLabDemo).mockResolvedValue({ replay: true });
    const replay = vi.fn(() => ({ artefact: { generic: "Example", tuned: "Scripted version" } }));
    const { result } = renderHook(() => useLabDemo({ demoId: "voice", replay }));
    await act(async () => { await result.current.sendMessage("Rewrite a greeting"); });
    await act(async () => { await result.current.sendMessage("Rewrite another greeting"); });
    expect(result.current.isReplay).toBe(true);
    expect(requestLabDemo).toHaveBeenCalledTimes(1);
    expect(replay).toHaveBeenCalledTimes(2);
    expect(result.current.result).toEqual({ artefact: { generic: "Example", tuned: "Scripted version" } });
  });
  it("does not spend a turn on invalid options", async () => {
    const { result } = renderHook(() => useLabDemo({ demoId: "eventpulse", replay: () => ({ message: "Unused" }) }));
    await act(async () => { await result.current.sendMessage("A conference", { event: "Unsupported" }); });
    expect(result.current.turns).toBe(0); expect(requestLabDemo).not.toHaveBeenCalled();
  });
});
