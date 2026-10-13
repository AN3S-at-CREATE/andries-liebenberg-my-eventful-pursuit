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
        title="Mentorship & Industry Leadership | AN3S"
        description="Nurturing the next generation of event and marketing professionals through mentorship, lecturing, and industry impact."
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
                Mentorship & Industry Leadership
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Deeply committed to nurturing the next generation of event and marketing professionals.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Nurturing Talent</h3>
                <p className="text-muted-foreground">
                  Deeply committed to nurturing the next generation of event and marketing professionals through hands-on mentorship.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Mic className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Active Lecturer</h3>
                <p className="text-muted-foreground">
                  Guest lecturer and curriculum contributor at Tshwane University of Technology (TUT) and AFDA.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Award className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Industry Impact</h3>
                <p className="text-muted-foreground">Practical mentorship and opportunities for continuous learning.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Core Values</h3>
                <p className="text-muted-foreground">
                  Focused on instilling values of continuous learning, innovation, ethical practices, and client-centricity.
                </p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-primary mt-12" />
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Mentorship;
