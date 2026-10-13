import { Section } from "@/components/shared/section";
import { CardGrid } from "@/components/shared/card-grid";
import { companies } from "@/data/companies";
import { permittedEvents } from "@/data/facts";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Seo } from "@/components/seo/Seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EventGallery } from "@/components/showcase/EventGallery";
import {
  Image,
  Play, 
  ExternalLink, 
  Calendar, 
  Users, 
  DollarSign, 
  Globe, 
  Building2, 
  Briefcase,
  Star,
  MapPin,
  Award,
  Zap,
  TrendingUp
} from "lucide-react";

const Showcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Showcase | AN3S" description="Creative work, event production and the AN3S venture portfolio." path="/showcase"/>
      <Navbar />
      
      <main>
      {/* Hero Section */}
      <Section className="relative   overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">Portfolio</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Live Showcase
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Selected highlights from spectacular events and transformative business projects across South Africa and internationally.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />


        </div>
      </Section>

      {/* Event Gallery Section */}
      <Section className="  bg-muted/20">
        <div>
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-primary" className="mb-4">Photo Gallery</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Event Highlights
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visual showcase of our spectacular event productions. Click any image to explore.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-8" />

          <MotionReveal className="h-full" delay={0.2}>
            <EventGallery />
          </MotionReveal>
        </div>
      </Section>

      {/* Live Portfolio CTA */}
      <Section className=" ">
        <div>
          <MotionReveal className="h-full" delay={0.2}>
            <Card className="glass p-8 md:p-12 text-center    ">
              <Image className="h-16 w-16 text-secondary mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Full Live Portfolio
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Dive into my daily updates and life portfolio featuring selected highlights from spectacular events across South Africa and internationally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="glow">
                  <a href="https://create.an3s.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    View Live Portfolio
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="glow-secondary" size="lg">
                  <Link to="/companies">View Company Work</Link>
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </div>
      </Section>

      <Section title="Ventures"><CardGrid>{["360-vision-events-group","odm-studio","prisma-entertainment","adventure-freaksa"].map(slug=>{const company=companies.find(item=>item.slug===slug);return company?<CompanyCard key={slug} company={company}/>:null;})}</CardGrid>{permittedEvents.length>0&&<ul>{permittedEvents.filter(event=>event.clientPermission).map(event=><li key={event.value}>{event.value}</li>)}</ul>}</Section>
      {/* CTA Section */}
      <Section className="  bg-muted/20">
        <div>
          {/* Divider */}
          <div className="divider-primary mb-12" />

          <MotionReveal>
            <Card className="glass-secondary p-8 md:p-12 text-center  ">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Create Something Spectacular?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's discuss how we can bring your vision to life with proven expertise and flawless execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="glow-secondary">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="glow" size="lg">
                  <Link to="/about">Learn More About Me</Link>
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </div>
      </Section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Showcase;
