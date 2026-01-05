import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Globe, DollarSign, Cog } from "lucide-react";

const BusinessGrowth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Business <span className="text-primary glow-text-cyan">Growth</span> <span className="text-secondary glow-text-pink">Strategies</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Driving significant <span className="text-primary">organizational scaling</span> and <span className="text-secondary">market penetration</span> across Africa and internationally.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Strategic <span className="text-primary">Planning</span></h3>
                <p className="text-muted-foreground">
                  Driving significant <span className="text-primary">organizational scaling</span> and <span className="text-secondary">market penetration</span> through strategic initiatives.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Geographic <span className="text-secondary">Expansion</span></h3>
                <p className="text-muted-foreground">
                  <span className="text-primary">Africa</span> & <span className="text-secondary">International</span> market expansion with service line diversification for broader reach.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Financial <span className="text-secondary">Planning</span></h3>
                <p className="text-muted-foreground">
                  Risk assessment and driving consistent revenue growth (Average <span className="text-primary font-semibold">R7.3M+</span> annually).
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <Cog className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Operational <span className="text-primary">Efficiency</span></h3>
                <p className="text-muted-foreground">
                  Leveraging technology (<span className="text-primary">AI</span>, <span className="text-secondary">Cloud</span>) for scalable growth with <span className="text-primary font-semibold">+30% scalability</span> improvement.
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-pink mt-12" />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BusinessGrowth;
