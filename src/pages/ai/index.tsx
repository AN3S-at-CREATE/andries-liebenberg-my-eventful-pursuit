import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Sparkles, Zap, Settings } from "lucide-react";

const aiTools = [
  {
    title: "EventPulse AI",
    description: "Proprietary platform streamlining event planning with intelligent scheduling and predictive analytics. Improves efficiency by 36%.",
    icon: Zap,
    href: "/ai/eventpulse",
    accent: "cyan" as const,
    status: "Live",
  },
  {
    title: "Lynkie Sky",
    description: "Launching April 2025 - Innovative tool integrating cloud capabilities with advanced marketing analytics.",
    icon: Sparkles,
    href: "/ai/lynkie-sky",
    accent: "pink" as const,
    status: "Coming Soon",
  },
  {
    title: "NeuroLogix AI",
    description: "AI-driven network offering personalized guidance, workflow automation, and strategic growth support with privacy compliance.",
    icon: Brain,
    href: "/ai/neurologix",
    accent: "cyan" as const,
    status: "Live",
  },
  {
    title: "Custom AI Models",
    description: "Specialized AI models like oh-dcft-v3.1-claude for personalized marketing weighting and analysis.",
    icon: Settings,
    href: "/ai/custom-models",
    accent: "pink" as const,
    status: "Enterprise",
  },
];

const AI = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">AI Innovation</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">AI</span> Tools & <span className="text-secondary glow-text-pink">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                I develop <span className="text-primary">cutting-edge AI solutions</span> that revolutionize <span className="text-secondary">events</span> and <span className="text-primary">marketing</span> operations.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <MotionStagger className="grid md:grid-cols-2 gap-8">
            {aiTools.map((tool) => (
              <MotionItem key={tool.href}>
                <Link to={tool.href}>
                  <Card 
                    interactive
                    glow={tool.accent === "cyan" ? "cyan" : "pink"}
                    className={`${tool.accent === "cyan" ? "glass-cyan border-l-4 border-l-primary" : "glass-pink border-l-4 border-l-secondary"} p-8 h-full group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <tool.icon className={`h-10 w-10 ${tool.accent === "cyan" ? "text-primary" : "text-secondary"} group-hover:scale-110 transition-transform`} />
                      <Badge variant={tool.status === "Live" ? "glow-cyan" : tool.status === "Coming Soon" ? "glow-pink" : "secondary"}>
                        {tool.status}
                      </Badge>
                    </div>
                    <h3 className={`font-heading text-xl font-bold text-foreground mb-3 ${tool.accent === "cyan" ? "group-hover:text-primary" : "group-hover:text-secondary"} transition-colors`}>
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <div className={`inline-flex items-center gap-2 text-sm font-medium ${tool.accent === "cyan" ? "text-primary" : "text-secondary"}`}>
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>

          {/* Divider */}
          <div className="divider-cyan mt-12 mb-8" />

          <MotionReveal delay={0.4}>
            <div className="text-center flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="glow">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Discuss AI Solutions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow-pink">
                <Link to="/expertise" className="inline-flex items-center gap-2">
                  View Expertise
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

export default AI;
