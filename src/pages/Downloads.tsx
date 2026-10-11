import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo/Seo";
import { whatsappLink } from "@/data/facts";
export default function Downloads(){return <div className="bg-background min-h-screen"><Seo title="Resources | AN3S" description="Request portfolio and collaboration materials from Andries on WhatsApp." path="/downloads" noindex/><Navbar/><main className="container max-w-4xl py-20"><h1 className="text-4xl font-bold text-foreground mb-6">Resources</h1><p className="text-body text-muted-foreground mb-8">Portfolio, brand materials and project information.</p><Button asChild><a href={whatsappLink("Hi Andries, I'd like to request portfolio materials.")} target="_blank" rel="noopener noreferrer">Request on WhatsApp</a></Button></main><Footer/></div>;}
