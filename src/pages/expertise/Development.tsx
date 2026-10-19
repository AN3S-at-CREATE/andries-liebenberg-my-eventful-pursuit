import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { serviceOffers, whatsappLink } from "@/data/facts";
import { CardGrid } from "@/components/shared/card-grid";
import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Code, Cloud, Brain, Layers } from "lucide-react";

const Development = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Web And App Development | AN3S"
        description="Websites, custom business systems, integrations and interface prototypes. Choose a website for a public-facing presence, a CRM or portal for business software, or a clickable prototype for interface design."
        path="/expertise/development"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Development", path: "/expertise/development" },
        ])}
      />
      <Navbar />
      <main>
      
      <Section className="relative   overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-primary" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Web and app development
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Websites, custom business systems, integrations and interface prototypes. Choose a website for a public-facing presence, a CRM or portal for business software, or a clickable prototype for interface design.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Layers className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Website scope</h3>
                <p className="text-muted-foreground">One-page Website is a single-page site. Starter Website covers up to 5 pages. Website Care Plan provides monthly updates and upkeep.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Code className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Business systems</h3>
                <p className="text-muted-foreground">Custom Business System / CRM / Portal covers business systems, CRM tools and portals; it is distinct from a standard website.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Cloud className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Connected tools</h3>
                <p className="text-muted-foreground">Integration & Custom Script covers connections and scripts for business tools, per integration.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Interfaces and apps</h3>
                <p className="text-muted-foreground">UI/UX Design & Clickable Prototype covers interface design and interactive prototypes. Mobile App development is available on request; AI workflow builds are listed separately.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-primary mt-12" />
        </div>
      </Section>


      <Section title="Offers and next steps">
        <ul className="space-y-6">
          {serviceOffers.filter((offer) => offer.discipline === "Web & App Development").map((offer) => (
            <li key={offer.title} className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
              <p className="text-body text-muted-foreground mb-3">{offer.description}</p>
              <a className="text-secondary underline underline-offset-4" href={whatsappLink(`Hi Andries, I'm interested in ${offer.title}.`)} target="_blank" rel="noopener noreferrer">Ask about {offer.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild variant="outline"><Link to="/services">View prices and quote options</Link></Button>
          <Link className="text-secondary underline underline-offset-4 self-center" to="/ai">Explore AI systems and automation</Link>
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Development;
