import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Users, Shield, Workflow, ArrowRight } from "lucide-react";

const NeuroLogix = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">AI Network</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">Neuro</span><span className="text-secondary glow-text-pink">Logix</span> AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-driven network offering <span className="text-primary">personalized guidance</span>, <span className="text-secondary">workflow automation</span>, and strategic growth support.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 group" interactive glow="cyan">
                <Brain className="h-10 w-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Personalized Guidance</h3>
                <p className="text-muted-foreground">
                  AI-powered recommendations tailored to your specific business needs and goals.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 group" interactive glow="pink">
                <Workflow className="h-10 w-10 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">Workflow Automation</h3>
                <p className="text-muted-foreground">
                  Streamline repetitive tasks and processes with intelligent automation.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 group" interactive glow="pink">
                <Users className="h-10 w-10 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">Business Integration</h3>
                <p className="text-muted-foreground">
                  Integrates across business functions like employee assistance and client onboarding.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 group" interactive glow="cyan">
                <Shield className="h-10 w-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Privacy & Compliance</h3>
                <p className="text-muted-foreground">
                  Built with privacy-first principles ensuring full regulatory compliance.
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <MotionReveal delay={0.5}>
            <div className="text-center flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="glow">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Explore NeuroLogix
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow-pink">
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

export default NeuroLogix;
