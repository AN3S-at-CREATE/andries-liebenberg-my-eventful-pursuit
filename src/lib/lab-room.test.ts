import { describe, expect, it } from "vitest";
import { labStars } from "@/data/lab";
import { visibleLabStars } from "./lab-galaxy";
import { findLabRoom,nextLabStar,roomTabs,selectedRoomTab,workflowBrief } from "./lab-room";
describe('Lab room access and tabs',()=>{
 it('renders exactly the approved visible stars and gives every one a room',()=>{expect(visibleLabStars()).toHaveLength(17);for(const star of visibleLabStars())expect(findLabRoom(star.slug)).toEqual(star);});
 it('returns no room for needsApproval or unknown stars',()=>{for(const star of labStars.filter(s=>s.visibility!=='show'))expect(findLabRoom(star.slug)).toBeUndefined();expect(findLabRoom('unknown')).toBeUndefined();});
 it('shows Try it only for demoId stars and defaults accordingly',()=>{for(const star of visibleLabStars()){expect(roomTabs(star).includes('try')).toBe(Boolean(star.demoId));expect(selectedRoomTab(star,null)).toBe(star.demoId?'try':'what');}});
 it('wraps only visible siblings',()=>{const stars=visibleLabStars().filter(s=>s.constellation==='ai');expect(nextLabStar(stars[stars.length-1])).toEqual(stars[0]);});
 it('bounds brief handoff to 500 characters',()=>{expect(workflowBrief({format:'x'.repeat(900)}).length).toBe(500);});
});
