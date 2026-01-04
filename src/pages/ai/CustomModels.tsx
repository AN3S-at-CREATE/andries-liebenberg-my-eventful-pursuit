import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Enterprise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Custom <span className="text-secondary glow-text-pink">AI Models</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Specialized AI models developed for personalized marketing weighting and analysis.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <MotionReveal delay={0.1}>
              <Card className="glass-pink p-8">
                <Settings className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">oh-dcft-v3.1-claude</h3>
                <p className="text-muted-foreground">
                  Proprietary model for personalized marketing weighting and deep content analysis.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-cyan p-8">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Precision Targeting</h3>
                <p className="text-muted-foreground">
                  Models trained on industry-specific data for highly accurate predictions.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-cyan p-8">
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Marketing Optimization</h3>
                <p className="text-muted-foreground">
                  AI-driven insights for campaign optimization and audience segmentation.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-pink p-8">
                <Cpu className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Custom Development</h3>
                <p className="text-muted-foreground">
                  Tailored AI solutions built to your specific business requirements.
                </p>
              </Card>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.5}>
            <div className="text-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Discuss Custom Solutions
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

export default CustomModels;
