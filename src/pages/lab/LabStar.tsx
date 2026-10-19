import { useParams, Link, useSearchParams } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { Seo } from "@/components/seo/Seo";
import { EvidenceIcon } from "@/components/lab/evidence-glyph";
import { RoomMiniSky } from "@/components/lab/room-mini-sky";
import { RoomOffers } from "@/components/lab/room-offers";
import { RoomDemo } from "@/components/lab/room-demo";
import { labWorkshops } from "@/data/lab-workshops";
import { labConstellations, labDemos, labStatusLabels } from "@/data/lab";
import { findLabRoom,nextLabStar,roomTabs,roomTabLabels,selectedRoomTab,type RoomTab } from "@/lib/lab-room";
import { visibleLabStars } from "@/lib/lab-galaxy";
import { findLabWorkshop, nextLabWorkshop, visibleLabWorkshops } from "@/lib/lab-workshops";
import { getOffer } from "@/lib/labOffers";
import { motionTokens } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";
import "@/components/lab/room.css";

export function LabStar({ isWorkshop = false }: { isWorkshop?: boolean }) {
 const {slug}=useParams(); const [params,setParams]=useSearchParams(); const isReduced=useReducedMotion();
 const workshop=isWorkshop?findLabWorkshop(slug):undefined;
 const documentation=labWorkshops.find(item=>item.slug===slug);
 const star=isWorkshop?workshop:findLabRoom(slug);
 if(!star)return <NotFound/>;
 const constellation=labConstellations.find(group=>group.id===star.constellation);
 const next=workshop?nextLabWorkshop(workshop):nextLabStar(star);const tabs=roomTabs(star);const tab=selectedRoomTab(star,params.get('tab'));
 const roomBase=isWorkshop?'/lab/workshop':'/lab';
 const demo=star.demoId?labDemos[star.demoId]:undefined;
 const firstOffer=getOffer(star.offers[0]);
 const handleTab=(value:RoomTab)=>{const nextParams=new URLSearchParams(params);nextParams.set('tab',value);setParams(nextParams,{replace:true});};
 return <main id="page-content" className="lab-room text-ink">
  <Seo path={`/lab/${star.slug}`} title={`${star.name} | AN3S Lab`} description={star.line}/>
  <div className="room-layout">
   <aside><nav aria-label="Breadcrumb" className="text-caption text-ink-muted mb-6"><Link to="/lab" className="text-cyan-glow">Lab</Link> / {isWorkshop?<Link to="/lab/workshop" className="text-cyan-glow">Workshop</Link>:constellation?.name} / {star.name}</nav>
    <section className="room-panel room-panel-blue"><h2 className="text-label">You are here</h2>{workshop?<div className="py-6"><EvidenceIcon status={star.status}/><p className="text-sm mt-4">{constellation?.name}</p><p className="text-caption text-ink-muted break-all mt-3">{workshop.sourceUrl?.replace("https://github.com/", "")}</p></div>:<RoomMiniSky star={star}/>}</section>
    <div className="grid gap-3 mt-5"><Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal"><Link to={isWorkshop?'/lab/workshop':`/lab?c=${star.constellation}`} state={isWorkshop?undefined:{labFocus:star.slug}}>{isWorkshop?'Back to the workshop':'Back to the galaxy'}</Link></Button>{next&&<Button asChild variant="ghost" className="h-auto min-h-11 whitespace-normal text-cyan-glow"><Link to={`${roomBase}/${next.slug}`}>Next in {isWorkshop?'the workshop':constellation?.name}: {next.name}</Link></Button>}</div>
   </aside>
   <div className="room-main"><div className="mb-5"><div className="w-10 scale-150 origin-left mb-5"><EvidenceIcon status={star.status}/></div><p className="text-eyebrow text-pink-glow mb-3">{constellation?.name} · {isWorkshop?'Workshop':'Star'} {String((isWorkshop?visibleLabWorkshops():visibleLabStars()).findIndex(item=>item.slug===star.slug)+1).padStart(2,'0')}</p><h1 className="room-title font-extrabold">{star.name}</h1><p className="text-sm text-ink-muted leading-relaxed mt-4">{star.what}</p></div>
    <section className="room-panel"><h2 className="text-label text-pink-glow mb-3">Room</h2><div role="tablist" aria-label="Star room" className="room-tabs" onKeyDown={event=>{
     if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(tabs.indexOf(tab)+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;handleTab(tabs[index]);event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
    }}>{tabs.map(value=><Button key={value} id={`room-tab-${value}`} role="tab" aria-selected={tab===value} aria-controls={`room-content-${value}`} tabIndex={tab===value?0:-1} variant="ghost" className={tab===value?'text-pink-glow border-b border-pink':'text-ink-muted'} onClick={()=>handleTab(value)}>{roomTabLabels[value]}</Button>)}</div>
     <m.div key={`${star.slug}-${tab}`} id={`room-content-${tab}`} role="tabpanel" aria-labelledby={`room-tab-${tab}`} className="room-scroll" initial={isReduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:isReduced?0:motionTokens.base,ease:motionTokens.ease}}>
      {tab==='what'&&<div className="space-y-5 text-sm leading-relaxed"><p>{star.what}</p><h3 className="text-label">Goal</h3><p className="text-ink-muted">{star.goal}</p>{star.note&&<p className="text-ink-muted">{star.note}</p>}<div className="flex flex-wrap gap-3">{star.links.map(link=><Button asChild key={link.href} variant="outline" className="min-h-11 h-auto whitespace-normal">{link.href.startsWith('/')?<Link to={link.href}>{link.label}</Link>:<a href={link.href}>{link.label}</a>}</Button>)}{documentation&&<Button asChild variant="outline" className="min-h-11 h-auto whitespace-normal"><a href={documentation.readmeUrl} target="_blank" rel="noopener noreferrer">Read reviewed documentation</a></Button>}</div></div>}
      {tab==='how'&&<ol className="space-y-4 text-sm font-mono">{[...star.how,...(demo?.wiring??[])].map((line,index)=><li key={`${index}-${line}`} className="border-l border-blue pl-3">{line}</li>)}</ol>}
      {tab==='try'&&star.demoId&&<RoomDemo key={star.slug} id={star.demoId} how={star.how}/>}
      {tab==='build'&&<RoomOffers star={star}/>}
     </m.div>
    </section>
   </div>
   <aside className="space-y-5"><section className="room-panel"><h2 className="text-label text-pink-glow mb-5">Facts</h2><dl className="space-y-5 text-sm"><div><dt className="text-label mb-2">Status</dt><dd className="inline-block rounded-sm border border-input px-2 py-1 text-cyan-glow">{labStatusLabels[star.status]}</dd></div><div><dt className="text-label mb-2">Goal</dt><dd className="text-ink-muted leading-relaxed">{star.goal}</dd></div>{star.stack.length>0&&<div><dt className="text-label mb-2">Stack</dt><dd className="flex flex-wrap gap-2">{star.stack.map(line=><span key={line} className="rounded-sm border border-input px-2 py-1 text-caption text-ink-muted">{line}</span>)}</dd></div>}<div><dt className="text-label mb-2">Source</dt><dd className="text-ink-muted">{star.source}{star.sourceUrl&&<a href={star.sourceUrl} target="_blank" rel="noopener noreferrer" className="block min-h-11 py-3 text-cyan-glow">View on GitHub</a>}</dd></div></dl></section><section className="room-panel room-panel-blue"><h2 className="text-label mb-5">Build it for you</h2><RoomOffers star={star}/></section></aside>
  </div>
  {firstOffer&&createPortal(<div className="room-bottom-bar text-ink"><div><p className="text-caption text-ink-muted">{firstOffer.title}</p><p className="text-sm text-cyan-glow">{firstOffer.price}{firstOffer.vat&&<span className="text-caption text-ink-muted"> · {firstOffer.vat}</span>}</p></div><Button asChild><a href={whatsappLink(`Hi Andries, I saw ${star.name} in the AN3S Lab.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a></Button></div>,document.body)}
 </main>;
}
