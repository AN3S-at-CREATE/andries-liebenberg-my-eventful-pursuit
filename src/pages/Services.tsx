import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/seo/Seo";
import { ServicesBlock } from "@/components/services/service-grid";
import { breadcrumb } from "@/lib/breadcrumb";
export default function Services(){return <div className="min-h-screen bg-background"><Seo title="Services | AN3S" description="Graphic design, marketing and workflow automation, app development, and website design and development for South African businesses." path="/services" jsonLd={breadcrumb([{name:"Home",path:"/"},{name:"Services",path:"/services"}])}/><Navbar/><main><Section><h1 className="text-4xl font-bold text-foreground mb-5">Services</h1><p className="text-body text-muted-foreground max-w-2xl">Design, websites, apps and automation for South African businesses that thought these tools were out of reach.</p></Section><ServicesBlock/></main><Footer/></div>;}
