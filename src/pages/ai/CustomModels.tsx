import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings, Target, BarChart3, Cpu, ArrowRight } from "lucide-react";

const CustomModels = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Enterprise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">Custom</span> <span className="text-secondary glow-text-pink">AI Models</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Specialized AI models developed for <span className="text-primary">personalized marketing</span> weighting and <span className="text-secondary">deep analysis</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <MotionReveal delay={0.1}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 group" interactive glow="pink">
                <Settings className="h-10 w-10 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">oh-dcft-v3.1-claude</h3>
                <p className="text-muted-foreground">
                  Proprietary model for personalized marketing weighting and deep content analysis.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 group" interactive glow="cyan">
                <Target className="h-10 w-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Precision Targeting</h3>
                <p className="text-muted-foreground">
                  Models trained on industry-specific data for highly accurate predictions.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 group" interactive glow="cyan">
                <BarChart3 className="h-10 w-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Marketing Optimization</h3>
                <p className="text-muted-foreground">
                  AI-driven insights for campaign optimization and audience segmentation.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 group" interactive glow="pink">
                <Cpu className="h-10 w-10 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">Custom Development</h3>
                <p className="text-muted-foreground">
                  Tailored AI solutions built to your specific business requirements.
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <MotionReveal delay={0.5}>
            <div className="text-center flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="glow-pink">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Discuss Custom Solutions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow">
                <Link to="/ai" className="inline-flex items-center gap-2">
                  View All Tools
                </Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default CustomModels;
