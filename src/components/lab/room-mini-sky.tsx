import type { LabStar } from "@/data/lab";
import { positionLabStars, visibleLabStars } from "@/lib/lab-galaxy";
import { EvidenceGlyph } from "./evidence-glyph";
export function RoomMiniSky({ star }: { star: LabStar }) {
 const points = positionLabStars(visibleLabStars().filter(item => item.constellation === star.constellation), true);
 return <svg viewBox="90 180 800 430" className="w-full h-40" role="img" aria-label={`${star.constellation} constellation, ${star.name} selected`}>
  <polyline points={points.map(point=>`${point.x},${point.y}`).join(" ")} fill="none" className="stroke-blue" strokeWidth="2" opacity="0.45" />
  {points.map(({star:item,x,y})=><g key={item.slug} transform={`translate(${x} ${y})`}>
   {item.slug===star.slug && <circle r="22" fill="none" className="stroke-cyan" strokeWidth="4" opacity="0.4"/>}<EvidenceGlyph status={item.status}/>
   <text y="32" textAnchor="middle" className="fill-ink" fontSize="24">{item.name}</text>
  </g>)}
 </svg>;
}
