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
              <Badge variant="glow-cyan" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">Mentorship</span> & <span className="text-secondary glow-text-pink">Industry Leadership</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Deeply committed to nurturing the <span className="text-primary">next generation</span> of <span className="text-secondary">event and marketing professionals</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-l-4 border-l-primary">
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Nurturing <span className="text-primary">Talent</span></h3>
                <p className="text-muted-foreground">
                  Deeply committed to nurturing the <span className="text-primary">next generation</span> of event and marketing professionals through <span className="text-secondary">hands-on mentorship</span>.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="pink" className="glass-pink p-8 border-l-4 border-l-secondary">
                <Mic className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Active <span className="text-secondary">Lecturer</span></h3>
                <p className="text-muted-foreground">
                  Guest lecturer and curriculum contributor at <span className="text-primary">Tshwane University of Technology (TUT)</span> and <span className="text-secondary">AFDA</span>.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="pink" className="glass-pink p-8 border-l-4 border-l-secondary">
                <Award className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Industry <span className="text-secondary">Impact</span></h3>
                <p className="text-muted-foreground">
                  Significant contributions including <span className="text-primary font-semibold">ZAR 4M+</span> in equipment sponsorship for TUT's Entertainment Technology program.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-l-4 border-l-primary">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Core <span className="text-primary">Values</span></h3>
                <p className="text-muted-foreground">
                  Focused on instilling values of <span className="text-primary">continuous learning</span>, <span className="text-secondary">innovation</span>, <span className="text-primary">ethical practices</span>, and <span className="text-secondary">client-centricity</span>.
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-cyan mt-12" />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Mentorship;
