import { CardGrid } from "@/components/shared/card-grid";
import { Section } from "@/components/shared/section";
import { ProofCards } from "@/components/work/proof-card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Sparkles, Zap, Settings } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { lynkieSkyLaunch } from "@/data/facts";

const aiTools = [
  {
    title: "EventPulse AI",
    description: "Proprietary platform streamlining event planning with intelligent scheduling and predictive analytics.",
    icon: Zap,
    href: "/ai/eventpulse",
    accent: "primary" as const,
    status: "Live",
  },
  {
    title: "Lynkie Sky",
    description: "Innovative tool integrating cloud capabilities with advanced marketing analytics.",
    icon: Sparkles,
    href: "/ai/lynkie-sky",
    accent: "secondary" as const,
    status: lynkieSkyLaunch.value,
  },
  {
    title: "NeuroLogix AI",
    description: "AI-driven network offering personalized guidance, workflow automation, and strategic growth support with privacy compliance.",
    icon: Brain,
    href: "/ai/neurologix",
    accent: "primary" as const,
    status: "Live",
  },
  {
    title: "Custom AI Models",
    description: "Custom AI development for personalized marketing weighting and analysis.",
    icon: Settings,
    href: "/ai/custom-models",
    accent: "secondary" as const,
    status: "Enterprise",
  },
];

const AI = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Tools & Projects | Andries Liebenberg (AN3S)"
        description="Cutting-edge AI tools and projects by Andries Liebenberg — EventPulse, Lynkie Sky, NeuroLogix, and custom models for events and marketing operations."
        path="/ai"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "AI Tools & Projects", path: "/ai" },
        ])}
      />
      <Navbar />
      <main>
      <Section className="relative   overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-primary" className="mb-4">AI Innovation</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                AI Tools & Projects
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                I develop cutting-edge AI solutions that revolutionize events and marketing operations.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <CardGrid>
            {aiTools.map((tool) => (
              <MotionItem key={tool.href} className="h-full">
                <Link to={tool.href} className="block h-full">
                  <Card 
                    interactive
                    glow={tool.accent === "primary" ? "primary" : "secondary"}
                    className={`${tool.accent === "primary" ? "glass-primary" : "glass-secondary"} p-8 h-full flex flex-col group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <tool.icon className={`h-10 w-10 ${tool.accent === "primary" ? "text-primary" : "text-secondary"}  `} />
                      <Badge variant={tool.status === "Live" ? "glow-primary" : tool.status === lynkieSkyLaunch.value ? "glow-secondary" : "secondary"}>
                        {tool.status}
                      </Badge>
                    </div>
                    <h3 className={`font-heading text-xl font-bold text-foreground mb-3 ${tool.accent === "primary" ? "group-hover:text-primary" : "group-hover:text-secondary"} transition-colors`}>
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <div className={`mt-auto inline-flex items-center gap-2 text-sm font-medium ${tool.accent === "primary" ? "text-primary" : "text-secondary"}`}>
                      Learn more about {tool.title}
                      <ArrowRight className="h-4 w-4  " />
                    </div>
                  </Card>
                </Link>
              </MotionItem>
            ))}
          </CardGrid>

          <ProofCards />

          {/* Divider */}
          <div className="divider-primary mt-12 mb-8" />

          <MotionReveal className="h-full" delay={0.4}>
            <div className="text-center flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="glow">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Discuss AI Solutions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow-secondary">
                <Link to="/expertise" className="inline-flex items-center gap-2">
                  View Expertise
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </Section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AI;
