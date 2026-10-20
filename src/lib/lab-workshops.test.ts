import { readFileSync } from 'node:fs';
import { describe,expect,it } from 'vitest';
import { labStars, labWorkshopCount } from '@/data/lab';
import { findLabWorkshop,nextLabWorkshop,visibleLabWorkshops } from './lab-workshops';
import { getOffer } from './labOffers';
describe('Documented public workshop rules',()=>{
 it('counts exactly the four approved repositories that have rooms',()=>{expect(labWorkshopCount).toBe(4);expect(labWorkshopCount).toBe(visibleLabWorkshops().length);expect(visibleLabWorkshops().map(room=>room.slug)).toEqual(['inbox-insight-pro','deepsearch','grok-bot-architect','docker-disk']);for(const room of visibleLabWorkshops())expect(findLabWorkshop(room.slug)).toEqual(room);});
 it('requires public GitHub README evidence for every kept room',()=>{for(const room of visibleLabWorkshops()){expect(room.visibility).toBe('show');expect(room.sourceUrl).toMatch(/^https:\/\/github\.com\/AN3S-CREATE\/[^/]+$/);expect(room.source).toMatch(/\bREADME\b/);expect(room.how.length).toBeGreaterThanOrEqual(3);}});
 it('ships only approved data and excludes removed rooms',()=>{expect(labStars).toHaveLength(17);for(const star of labStars)expect(star.visibility).toBe('show');for(const slug of [['die','waarheid'].join('-'),['smart','lab','integration'].join('-'),'truelogix','brand-systems',['an3s','design','system'].join('-'),['flow','logix'].join(''),['intern','us'].join('-')]){expect(labStars.some(star=>star.slug===slug)).toBe(false);expect(findLabWorkshop(slug)).toBeUndefined();}for(const room of visibleLabWorkshops()){expect(room.demoId).toBeUndefined();expect(room.status).toBe('built');for(const title of room.offers)expect(getOffer(title)).toBeDefined();}expect(findLabWorkshop('unknown')).toBeUndefined();});
 it('wraps through all four documented workshops',()=>{const rooms=visibleLabWorkshops();expect(nextLabWorkshop(rooms[rooms.length-1])).toEqual(rooms[0]);});
 it('includes kept rooms once and excludes removed rooms from the sitemap',()=>{const sitemap=readFileSync('public/sitemap.xml','utf8');for(const room of visibleLabWorkshops())expect(sitemap.split(`<loc>https://an3s.info/lab/${room.slug}</loc>`)).toHaveLength(2);for(const slug of [['die','waarheid'].join('-'),['smart','lab','integration'].join('-'),'truelogix','brand-systems',['flow','logix'].join(''),['intern','us'].join('-')])expect(sitemap).not.toContain(`/lab/${slug}`);});
});
