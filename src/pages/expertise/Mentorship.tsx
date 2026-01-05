import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Mic, Award, Heart } from "lucide-react";

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Mentorship & <span className="text-secondary glow-text-pink">Industry Leadership</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Deeply committed to nurturing the next generation of event and marketing professionals.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-8">
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Nurturing Talent</h3>
                <p className="text-muted-foreground">
                  Deeply committed to nurturing the next generation of event and marketing professionals through hands-on mentorship.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-8">
                <Mic className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Active Lecturer</h3>
                <p className="text-muted-foreground">
                  Guest lecturer and curriculum contributor at Tshwane University of Technology (TUT) and AFDA.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink p-8">
                <Award className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Industry Impact</h3>
                <p className="text-muted-foreground">
                  Significant contributions including ZAR 4M+ in equipment sponsorship for TUT's Entertainment Technology program.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-cyan p-8">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Core Values</h3>
                <p className="text-muted-foreground">
                  Focused on instilling values of continuous learning, innovation, ethical practices, and client-centricity.
                </p>
              </Card>
            </MotionReveal>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Mentorship;
