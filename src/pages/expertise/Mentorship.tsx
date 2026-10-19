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
import { GraduationCap, Mic, Award, Heart } from "lucide-react";

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Innovation And Mentorship | AN3S"
        description="AI introductions for small teams, adoption workshops, one-to-one mentoring and corporate talks. These offers focus on learning and discussion rather than building or operating a software system."
        path="/expertise/mentorship"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Mentorship", path: "/expertise/mentorship" },
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
                Innovation and mentorship
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">AI introductions for small teams, adoption workshops, one-to-one mentoring and corporate talks. These offers focus on learning and discussion rather than building or operating a software system.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">AI introduction</h3>
                <p className="text-muted-foreground">AI Starter Session is a 2-hour AI introduction for a small team.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Mic className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Team workshops</h3>
                <p className="text-muted-foreground">AI Adoption Workshop is a half-day workshop for up to 15 people.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Award className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">One-to-one mentoring</h3>
                <p className="text-muted-foreground">1:1 Mentoring provides one-to-one sessions, scoped by quote rather than a published fixed package.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Corporate talks</h3>
                <p className="text-muted-foreground">Corporate Talk / Keynote is available for corporate audiences, scoped by quote. For an AI system or workflow build, see AI Systems & Automation.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-primary mt-12" />
        </div>
      </Section>


      <Section title="Offers and next steps">
        <ul className="space-y-6">
          {serviceOffers.filter((offer) => offer.discipline === "Innovation & Mentorship").map((offer) => (
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

export default Mentorship;
