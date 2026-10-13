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
        title="Marketing Mastery | AN3S"
        description="Comprehensive, data-driven marketing strategies across diverse industries for measurable growth."
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
                Marketing Mastery
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Driving comprehensive marketing strategies across diverse industries with data-driven precision.
              </p>
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
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Executive Leadership</h3>
                <p className="text-muted-foreground">
                  Driving comprehensive marketing strategies across diverse industries with proven executive-level leadership.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <BarChart3 className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven Results</h3>
                <p className="text-muted-foreground">Campaign planning, audience research and performance measurement across marketing channels.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Share2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Digital Expertise</h3>
                <p className="text-muted-foreground">
                  Expertise in integrated digital campaigns (SEO/SEM, Content, Social Media, Email, PPC) and traditional marketing.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.5}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Brand Development</h3>
                <p className="text-muted-foreground">Campaign planning, audience research and performance measurement across marketing channels.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Marketing;
