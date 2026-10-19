import { readFileSync } from 'node:fs';
import { describe,expect,it } from 'vitest';
import { labWorkshops } from '@/data/lab-workshops';
import { labStars, labWorkshopCount } from '@/data/lab';
import { findLabWorkshop,nextLabWorkshop,visibleLabWorkshops } from './lab-workshops';
import { getOffer } from './labOffers';
describe('Documented public workshop rules',()=>{
 it('counts exactly the six documented repositories that have rooms',()=>{expect(labWorkshopCount).toBe(6);expect(visibleLabWorkshops().map(room=>room.slug)).toEqual(['die-waarheid','smart-lab-integration','inbox-insight-pro','deepsearch','grok-bot-architect','docker-disk']);for(const room of visibleLabWorkshops())expect(findLabWorkshop(room.slug)).toEqual(room);});
 it('pins public documentation to a reviewed revision',()=>{for(const room of labWorkshops){expect(room.reviewedCommit).toMatch(/^[a-f0-9]{40}$/);expect(room.readmeUrl).toBe(`https://github.com/${room.repository}/blob/${room.reviewedCommit}/README.md`);expect(room.sourceUrl).toBe(`https://github.com/${room.repository}`);expect(room.how.length).toBeGreaterThanOrEqual(3);}});
 it('does not duplicate or expose approval-gated stars',()=>{expect(new Set(labWorkshops.map(room=>room.slug)).size).toBe(labWorkshops.length);for(const room of labWorkshops){expect(labStars.some(star=>star.slug===room.slug&&star.sourceUrl===room.sourceUrl)).toBe(true);expect(room.demoId).toBeUndefined();expect(room.status).not.toBe('live');for(const title of room.offers)expect(getOffer(title)).toBeDefined();}expect(findLabWorkshop('truelogix')).toBeUndefined();expect(findLabWorkshop('unknown')).toBeUndefined();});
 it('wraps through all six documented workshops',()=>{const rooms=visibleLabWorkshops();expect(nextLabWorkshop(rooms[rooms.length-1])).toEqual(rooms[0]);});
 it('includes every documented room exactly once in the sitemap',()=>{const sitemap=readFileSync('public/sitemap.xml','utf8');for(const room of visibleLabWorkshops())expect(sitemap.split(`<loc>https://an3s.info/lab/${room.slug}</loc>`)).toHaveLength(2);expect(sitemap).not.toContain('/lab/workshop/truelogix');});
});
