import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompaniesPreview } from "@/components/companies/CompaniesPreview";
import { AIToolsSection } from "@/components/ai-tools/AIToolsSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { Section } from "@/components/shared/section";
import { HomeHero } from "@/components/hero/home-hero";
import { WorkSection } from "@/components/work/work-section";
import { ServicesBlock } from "@/components/services/service-grid";
import { ChaosGap } from "@/components/home/chaos-gap";
import { facts, whatsappLink } from "@/data/facts";
export default function Index(){return <div className="min-h-screen bg-background"><Seo title="AN3S | Strategic Development & Growth Advisor for Intelligent Businesses" description="AN3S, est. 2003: graphic design, websites, apps and workflow automation for South African businesses. Strategy, Chaos, and Experimental Tech." path="/"/><Navbar/><main>
<HomeHero/>
<div className="relative z-10 bg-background"><ServicesBlock/><WorkSection/><AIToolsSection/><ChaosGap/><CompaniesPreview/><Section id="contact" className="border-t border-border" title="Ready to grow your business?" lead="Let's discuss your next project."><div className="max-w-2xl"><Button asChild className="mb-4"><a href={whatsappLink("Hi Andries, I'd like to discuss a project.")} target="_blank" rel="noopener noreferrer">WhatsApp Andries</a></Button><p className="text-sm text-muted-foreground mb-8">{facts.responsePromise.value}</p><ContactForm/></div></Section></div></main><div className="relative z-10 bg-background"><Footer/></div><ScrollToTop/></div>;}
