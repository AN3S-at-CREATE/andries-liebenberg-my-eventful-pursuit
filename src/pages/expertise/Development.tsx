import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Cloud, Brain, Layers } from "lucide-react";

const Development = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Technical <span className="text-secondary glow-text-pink">Development</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Bridging the gap between marketing/event strategy and technical execution.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-8">
                <Layers className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Bridging the Gap</h3>
                <p className="text-muted-foreground">
                  Seamlessly connecting marketing/event strategy with technical execution for cohesive solutions.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-8">
                <Code className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Coding Skills</h3>
                <p className="text-muted-foreground">
                  Proficient in HTML, CSS, JavaScript, Python, PHP for custom solutions, landing pages, and automation.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink p-8">
                <Cloud className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Cloud Computing</h3>
                <p className="text-muted-foreground">
                  Expertise in Cloud Computing: AWS Certified, Azure Fundamentals, Google Cloud Certified.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-cyan p-8">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">AI Integration</h3>
                <p className="text-muted-foreground">
                  Experienced in AI integration, including developing proprietary AI models for marketing optimization.
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

export default Development;
