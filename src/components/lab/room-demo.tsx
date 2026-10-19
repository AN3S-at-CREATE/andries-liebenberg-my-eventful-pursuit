import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { labDemos, type LabDemo } from "@/data/lab";
import { useLabDemo } from "@/hooks/useLabDemo";
import { type LabDemoId } from "@/lib/lab-demo";
import { isInteractiveDemo, labReplay } from "@/lib/lab-room";
import { motionTokens } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DemoArtefact } from "./demo-artefact";

function InteractiveDemo({ id, demo }: { id: LabDemoId; demo: LabDemo }) {
 const {messages,result,isLoading,isReplay,error,turns,canSend,sendMessage}=useLabDemo({demoId:id,replay:()=>labReplay(id)});
 const [input,setInput]=useState("");
 const [options,setOptions]=useState<Record<string,string>>(()=>Object.fromEntries(Object.entries(demo.options).map(([key,values])=>[key,values[0]])));
 const location=useLocation(); const navigate=useNavigate(); const hasImported=useRef(false);
 const isReduced=useReducedMotion();
 useEffect(()=>{
  const state:unknown=location.state;
  if(id!=="workflow"||hasImported.current||!state||typeof state!=="object"||!("labBrief" in state)||typeof state.labBrief!=="string")return;
  hasImported.current=true;
  const brief=state.labBrief;
  navigate(`${location.pathname}${location.search}`,{replace:true,state:null});
  void sendMessage(brief);
 },[id,location.state,location.pathname,location.search,navigate,sendMessage]);
 const handleSend=async(content=input)=>{if(!content.trim()||!canSend)return;setInput("");await sendMessage(content,options);};
 return <div className="space-y-5">
  <div className="rounded-md border border-cyan p-4 text-sm text-ink-muted"><strong className="block text-cyan-glow mb-2">Demo, simulated with AI.</strong>{demo.banner}</div>
  <h3 className="text-lg font-semibold">{demo.title}</h3><p className="text-sm text-ink-muted">{demo.description}</p>
  {Object.entries(demo.options).map(([key,values])=><fieldset key={key}><legend className="capitalize text-label mb-2">{key}</legend><div className="flex flex-wrap gap-2" role="group" aria-label={key}>{values.map(value=><Button key={value} variant="outline" aria-pressed={options[key]===value} className={`min-h-11 ${options[key]===value?"border-cyan text-cyan-glow":"border-input"}`} onClick={()=>setOptions(previous=>({...previous,[key]:value}))}>{value}</Button>)}</div></fieldset>)}
  <div aria-live="polite" aria-busy={isLoading} className={`room-demo-output min-h-24 ${id==='whatsapp'?'rounded-lg border border-input bg-panel p-4 max-w-sm mx-auto':''}`}>
   {!messages.length && <p className="text-sm text-ink-muted">{demo.subtitle}</p>}
   {isReplay&&<p className="text-label text-cyan-glow mb-4">Replay</p>}
   {result && 'artefact' in result ? <DemoArtefact id={id} artefact={result.artefact}/> : <div className="space-y-4">{messages.map((message,index)=><m.div key={`${index}-${message.role}`} initial={isReduced?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:isReduced?0:motionTokens.slow,ease:motionTokens.ease}} className={`text-sm leading-relaxed ${message.role==='user'?'text-ink-muted border-l border-blue pl-3':'text-ink'}`}><span className="block text-caption text-cyan-glow mb-1">{message.role==='user'?'You':isReplay?'Replay':demo.name}</span>{message.content}</m.div>)}</div>}
   {isLoading&&<p role="status" className="text-sm text-cyan-glow mt-4">Preparing the demo response…</p>}
  </div>
  <div className="flex flex-wrap gap-2">{demo.prompts.map(prompt=><Button key={prompt} variant="outline" className="min-h-11 h-auto whitespace-normal text-left text-sm" disabled={!canSend} onClick={()=>setInput(prompt)}>{prompt}</Button>)}{demo.probe&&<Button variant="outline" disabled={!canSend} className="border-pink text-pink-glow min-h-11 h-auto whitespace-normal text-left text-sm" onClick={()=>setInput(demo.probe?.prompt??"")}>{demo.probe.label}</Button>}</div>
  <form onSubmit={event=>{event.preventDefault();void handleSend();}} className="space-y-3"><label htmlFor={`message-${id}`} className="text-label">Your message</label><Textarea id={`message-${id}`} value={input} maxLength={500} disabled={!canSend} onChange={event=>setInput(event.target.value)} className="min-h-24 border-input"/><div className="flex items-center justify-between gap-4"><span className="text-caption text-ink-muted">{input.length}/500</span><Button type="submit" disabled={!canSend||!input.trim()}>Send</Button></div></form>
  {error&&<p role="alert" className="text-sm text-danger">{error}</p>}
  <p className="text-caption text-ink-muted">{Math.max(0,6-turns)} demo turns left this session · Personal details are removed before sending. Nothing you type is kept after you close this tab.</p>
 </div>;
}
export function RoomDemo({ id, how }: { id:string; how:string[] }) {
 const demo=labDemos[id];
 if(!demo)return null;
 return <><div>
 {isInteractiveDemo(id)?<InteractiveDemo key={id} id={id} demo={demo}/>:<div className="space-y-5"><div className="rounded-md border border-cyan p-4 text-sm text-ink-muted">{demo.banner}</div><h3 className="font-semibold">{demo.title}</h3><p className="text-sm text-ink-muted">{demo.description}</p>{id==='concierge'?<Button onClick={()=>document.querySelector<HTMLButtonElement>('.concierge-dock button')?.click()}>Open the Concierge</Button>:<ol className="flex flex-wrap gap-3">{how.map((line,index)=><li key={line} className="rounded-md border border-blue p-3 text-sm"><span className="text-pink-glow mr-2">{index+1}</span>{line}</li>)}</ol>}</div>}
 </div><div className="border-t border-line mt-6 pt-5 space-y-3">{demo.truth.map((row,index)=><p key={index} className="text-sm leading-relaxed"><strong className={row.kind==='Real'?'text-success':row.kind==='Simulated'?'text-cyan-glow':'text-ink-muted'}>{row.kind}</strong><span className="text-ink-muted"> · {row.text}</span></p>)}</div></>;
}
