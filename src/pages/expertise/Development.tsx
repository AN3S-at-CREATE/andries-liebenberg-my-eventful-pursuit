import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Cloud, Brain, Layers } from "lucide-react";

const Development = () => {
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
                Technical <span className="text-secondary glow-text-pink">Develop</span><span className="text-primary glow-text-cyan">ment</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Bridging the gap between <span className="text-primary">marketing/event strategy</span> and <span className="text-secondary">technical execution</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-l-4 border-l-primary">
                <Layers className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Bridging the <span className="text-primary">Gap</span></h3>
                <p className="text-muted-foreground">
                  Seamlessly connecting <span className="text-primary">marketing/event strategy</span> with <span className="text-secondary">technical execution</span> for cohesive solutions.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="pink" className="glass-pink p-8 border-l-4 border-l-secondary">
                <Code className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Coding <span className="text-secondary">Skills</span></h3>
                <p className="text-muted-foreground">
                  Proficient in <span className="text-primary">HTML</span>, <span className="text-secondary">CSS</span>, <span className="text-primary">JavaScript</span>, <span className="text-secondary">Python</span>, <span className="text-primary">PHP</span> for custom solutions, landing pages, and automation.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="pink" className="glass-pink p-8 border-l-4 border-l-secondary">
                <Cloud className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Cloud <span className="text-secondary">Computing</span></h3>
                <p className="text-muted-foreground">
                  Expertise in Cloud Computing: <span className="text-primary">AWS Certified</span>, <span className="text-secondary">Azure Fundamentals</span>, <span className="text-primary">Google Cloud Certified</span>.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-l-4 border-l-primary">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">AI <span className="text-primary">Integration</span></h3>
                <p className="text-muted-foreground">
                  Experienced in <span className="text-secondary">AI integration</span>, including developing <span className="text-primary">proprietary AI models</span> for marketing optimization.
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

export default Development;
