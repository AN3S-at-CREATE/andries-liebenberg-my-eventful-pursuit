import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompaniesPreview } from "@/components/companies/CompaniesPreview";
import { AIToolsSection } from "@/components/ai-tools/AIToolsSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { GradientText } from "@/components/brand/brand-parts";
import { ServicesBlock } from "@/components/services/service-grid";
import { facts, whatsappLink } from "@/data/facts";
import { ParallaxStarfield } from "@/components/effects/ParallaxStarfield";
import wordmark from "@/design-system/assets/an3s-wordmark.png";
export default function Index(){return <div className="min-h-screen bg-background"><Seo title="AN3S | Andries Liebenberg, Design, Web, Apps & Automation" description="AN3S, est. 2003: graphic design, websites, apps and workflow automation for South African businesses. Strategy, Chaos, and Experimental Tech." path="/"/><Navbar/><main>
<section className="relative overflow-hidden px-4 py-16 md:py-20"><ParallaxStarfield/><div className="container max-w-6xl relative text-center"><p className="text-eyebrow text-muted-foreground mb-8">EST. {facts.established.value}</p><h1 className="mb-8"><img src={wordmark} alt={facts.brand.value} width="426" height="144" className="w-72 md:w-96 h-auto mx-auto" fetchPriority="high"/></h1><p className="text-tagline mb-3"><GradientText>FUELING GROWTH AT THE INTERSECTION OF</GradientText></p><p className="text-tagline mb-8"><GradientText>STRATEGY, CHAOS, AND EXPERIMENTAL TECH</GradientText></p><p className="text-body text-foreground max-w-2xl mx-auto mb-5">{facts.descriptor.value}</p><p className="text-body text-muted-foreground max-w-2xl mx-auto mb-8">Design, websites, apps and automation for South African businesses that thought these tools were out of reach.</p><div className="flex flex-col sm:flex-row justify-center gap-4"><Button asChild size="lg" className="text-action"><a href={whatsappLink("Hi Andries, I found you on an3s.info and would like to discuss a project.")} target="_blank" rel="noopener noreferrer">WHATSAPP ANDRIES</a></Button><Button asChild variant="glow-secondary" size="lg" className="text-action"><Link to="/services">SEE SERVICES</Link></Button></div></div></section>
<ServicesBlock/><AIToolsSection/><CompaniesPreview/><section id="contact" className="py-16 px-4 border-t border-border"><div className="container max-w-2xl"><h2 className="text-3xl font-bold text-foreground mb-4">Ready to grow your business?</h2><p className="text-body text-muted-foreground mb-6">Let's discuss your next project.</p><Button asChild className="mb-4"><a href={whatsappLink("Hi Andries, I'd like to discuss a project.")} target="_blank" rel="noopener noreferrer">WhatsApp Andries</a></Button><p className="text-sm text-muted-foreground mb-8">{facts.responsePromise.value}</p><ContactForm/></div></section></main><Footer/><ScrollToTop/></div>;}
