import { cleanup,render,screen } from '@testing-library/react';
import { afterEach,describe,expect,it } from 'vitest';
import { MemoryRouter,Route,Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion,domAnimation } from 'framer-motion';
import { LabWorkshop } from './LabWorkshop';
import { LabStar } from './LabStar';
import { labWorkshopCount } from '@/data/lab';
import { visibleLabWorkshops } from '@/lib/lab-workshops';
afterEach(cleanup);
function open(path:string){render(<HelmetProvider><LazyMotion features={domAnimation}><MemoryRouter initialEntries={[path]}><Routes><Route path='/lab/workshop' element={<LabWorkshop/>}/><Route path='/lab/:slug' element={<LabStar/>}/><Route path='/lab/workshop/:slug' element={<LabStar isWorkshop/>}/></Routes></MemoryRouter></LazyMotion></HelmetProvider>);}
describe('Workshop index and room routes',()=>{
 it('links each documented repository from the workshop index',()=>{open('/lab/workshop');for(const room of visibleLabWorkshops())expect(screen.getByRole('link',{name:new RegExp(room.name)}).getAttribute('href')).toBe(`/lab/${room.slug}`);});
 it('renders each kept direct and legacy room with a public source and no AI demo',()=>{for(const room of visibleLabWorkshops()){for(const path of [`/lab/${room.slug}`,`/lab/workshop/${room.slug}`]){open(path);expect(screen.getByRole('heading',{level:1,name:room.name})).toBeDefined();expect(screen.queryByRole('tab',{name:'Try it'})).toBeNull();expect(screen.getByRole('link',{name:'View on GitHub'}).getAttribute('href')).toBe(room.sourceUrl);cleanup();}}});
 it('counts only the four kept rooms',()=>{expect(labWorkshopCount).toBe(visibleLabWorkshops().length);expect(labWorkshopCount).toBe(4);});
 it('returns NotFound for removed and unknown legacy rooms',()=>{for(const slug of ['unknown','truelogix',['flow','logix'].join(''),['intern','us'].join('-'),['die','waarheid'].join('-'),['smart','lab','integration'].join('-')]){open(`/lab/workshop/${slug}`);expect(screen.getByRole('heading',{name:'Page not found'})).toBeDefined();cleanup();}});
});
