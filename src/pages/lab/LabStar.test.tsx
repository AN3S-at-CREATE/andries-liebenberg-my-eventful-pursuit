import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import { LabStar } from './LabStar';
import { labStars } from '@/data/lab';
import { visibleLabStars } from '@/lib/lab-galaxy';
vi.mock('@/hooks/useLabDemo',()=>({useLabDemo:()=>({messages:[],result:null,isLoading:false,isReplay:false,error:null,turns:0,canSend:true,sendMessage:vi.fn()})}));
afterEach(cleanup);
function open(slug:string){render(<HelmetProvider><LazyMotion features={domAnimation}><MemoryRouter initialEntries={[`/lab/${slug}`]}><Routes><Route path='/lab/:slug' element={<LabStar/>}/></Routes></MemoryRouter></LazyMotion></HelmetProvider>);}
describe('Lab star routes',()=>{
 it('renders a room for every visible star and gates the Try it tab',()=>{for(const star of visibleLabStars()){open(star.slug);expect(screen.getByRole('heading',{name:star.name,level:1})).toBeDefined();expect(screen.queryByRole('tab',{name:'Try it'})!==null).toBe(Boolean(star.demoId));cleanup();}});
 it('renders existing NotFound for every unapproved star and unknown slugs',()=>{for(const slug of [...labStars.filter(star=>star.visibility!=='show').map(star=>star.slug),'unknown']){open(slug);expect(screen.getByRole('heading',{name:'Page not found'})).toBeDefined();cleanup();}});
});
