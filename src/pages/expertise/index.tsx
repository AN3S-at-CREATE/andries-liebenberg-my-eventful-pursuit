import { CardGrid } from "@/components/shared/card-grid";
import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/seo/Seo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { disciplines } from "@/data/disciplines";
import { breadcrumb } from "@/lib/breadcrumb";
export default function Expertise(){return <div className="bg-background min-h-screen"><Seo title="Expertise | AN3S" description="AN3S disciplines spanning AI, business growth, development, marketing, brand strategy, events, sales and mentorship." path="/expertise" jsonLd={breadcrumb([{name:"Home",path:"/"},{name:"Expertise",path:"/expertise"}])}/><Navbar/><main><Section><h1 className="text-4xl font-bold text-foreground mb-5">Expertise</h1><p className="text-body text-muted-foreground max-w-2xl mb-12">Strategy, technology and creative execution for South African businesses.</p><CardGrid>{disciplines.map(area=><Card key={area.title} variant="glass" className="p-6 h-full flex flex-col border-pink/35"><img src={area.icon} alt="" width="56" height="56" className="h-icon-tile w-icon-tile mb-5"/><h2 className="text-lg font-semibold text-foreground mb-3">{area.title}</h2><p className="text-sm text-muted-foreground flex-1 mb-6">{area.description}</p><Button asChild variant="glow-secondary" className="w-full mt-auto"><Link to={area.href} aria-label={`Explore ${area.title}`}>Explore</Link></Button></Card>)}</CardGrid></Section></main><Footer/></div>;}
