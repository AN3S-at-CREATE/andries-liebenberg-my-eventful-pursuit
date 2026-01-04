import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">AI Network</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">NeuroLogix</span> AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-driven network offering personalized guidance, workflow automation, and strategic growth support.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-8">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Personalized Guidance</h3>
                <p className="text-muted-foreground">
                  AI-powered recommendations tailored to your specific business needs and goals.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-8">
                <Workflow className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Workflow Automation</h3>
                <p className="text-muted-foreground">
                  Streamline repetitive tasks and processes with intelligent automation.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink p-8">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Business Integration</h3>
                <p className="text-muted-foreground">
                  Integrates across business functions like employee assistance and client onboarding.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-cyan p-8">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Privacy & Compliance</h3>
                <p className="text-muted-foreground">
                  Built with privacy-first principles ensuring full regulatory compliance.
                </p>
              </Card>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.5}>
            <div className="text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Explore NeuroLogix
                  <ArrowRight className="h-4 w-4" />
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
