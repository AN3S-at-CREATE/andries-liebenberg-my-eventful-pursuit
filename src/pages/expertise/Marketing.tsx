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
import { TrendingUp, Users, Share2, BarChart3 } from "lucide-react";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Experimental Marketing | AN3S"
        description="Search visibility reviews and campaign creative: social posts, ad designs, newsletter templates and short-video edits. This page focuses on marketing material, not a website build or sales pipeline."
        path="/expertise/marketing"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Marketing", path: "/expertise/marketing" },
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
                Experimental marketing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Search visibility reviews and campaign creative: social posts, ad designs, newsletter templates and short-video edits. This page focuses on marketing material, not a website build or sales pipeline.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />
          {/* Divider */}
          <div className="divider-primary mb-8" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Search visibility</h3>
                <p className="text-muted-foreground">SEO & Visibility Audit is a once-off review of search and online visibility.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <BarChart3 className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Social content</h3>
                <p className="text-muted-foreground">Choose a single Social Post Design or a Social Content Pack of 10 post designs.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Share2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Ads and video</h3>
                <p className="text-muted-foreground">Ad Creative covers a single ad design; Short Video / Reel Edit covers an edit of a short video or reel.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.5}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Email templates</h3>
                <p className="text-muted-foreground">Email Newsletter Template provides a reusable newsletter design. Brand identity work is listed separately under Brand Strategy.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </Section>


      <Section title="Offers and next steps">
        <ul className="space-y-6">
          {serviceOffers.filter((offer) => offer.discipline === "Experimental Marketing").map((offer) => (
            <li key={offer.title} className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
              <p className="text-body text-muted-foreground mb-3">{offer.description}</p>
              <a className="text-secondary underline underline-offset-4" href={whatsappLink(`Hi Andries, I'm interested in ${offer.title}.`)} target="_blank" rel="noopener noreferrer">Ask about {offer.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild variant="outline"><Link to="/services">View prices and quote options</Link></Button>
          <Link className="text-secondary underline underline-offset-4 self-center" to="/expertise/business-growth">Explore business growth advisory</Link>
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Marketing;
