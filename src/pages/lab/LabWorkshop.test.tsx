import { cleanup,render,screen } from '@testing-library/react';
import { afterEach,describe,expect,it } from 'vitest';
import { MemoryRouter,Route,Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion,domAnimation } from 'framer-motion';
import { LabWorkshop } from './LabWorkshop';
import { LabStar } from './LabStar';
import { labWorkshops } from '@/data/lab-workshops';
import { visibleLabWorkshops } from '@/lib/lab-workshops';
afterEach(cleanup);
function open(path:string){render(<HelmetProvider><LazyMotion features={domAnimation}><MemoryRouter initialEntries={[path]}><Routes><Route path='/lab/workshop' element={<LabWorkshop/>}/><Route path='/lab/:slug' element={<LabStar/>}/><Route path='/lab/workshop/:slug' element={<LabStar isWorkshop/>}/></Routes></MemoryRouter></LazyMotion></HelmetProvider>);}
describe('Workshop index and room routes',()=>{
 it('links each documented repository from the workshop index',()=>{open('/lab/workshop');for(const room of visibleLabWorkshops())expect(screen.getByRole('link',{name:new RegExp(room.name)}).getAttribute('href')).toBe(`/lab/${room.slug}`);});
 it('renders each room with reviewed documentation and no AI demo',()=>{for(const room of labWorkshops){open(`/lab/${room.slug}`);expect(screen.getByRole('heading',{level:1,name:room.name})).toBeDefined();expect(screen.queryByRole('tab',{name:'Try it'})).toBeNull();expect(screen.getByRole('link',{name:'Read reviewed documentation'}).getAttribute('href')).toBe(room.readmeUrl);expect(screen.getByRole('link',{name:'Back to the galaxy'}).getAttribute('href')).toBe(`/lab?c=${room.constellation}`);cleanup();}});
 it('returns NotFound for unknown and approval-gated repositories',()=>{for(const slug of ['unknown','truelogix','flowlogix','intern-us']){open(`/lab/workshop/${slug}`);expect(screen.getByRole('heading',{name:'Page not found'})).toBeDefined();cleanup();}});
});
