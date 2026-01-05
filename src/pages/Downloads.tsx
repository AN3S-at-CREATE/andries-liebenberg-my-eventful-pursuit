import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Presentation, FileSpreadsheet } from "lucide-react";

const downloads = [
  {
    title: "Full Portfolio PDF",
    description: "Complete portfolio with all project details and case studies.",
    icon: FileText,
    href: "#",
    accent: "cyan" as const,
  },
  {
    title: "Media Kit",
    description: "Logos, brand assets, and press materials.",
    icon: Presentation,
    href: "#",
    accent: "pink" as const,
  },
  {
    title: "Case Studies",
    description: "Detailed breakdowns of successful projects and campaigns.",
    icon: FileSpreadsheet,
    href: "#",
    accent: "cyan" as const,
  },
];

const Downloads = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-4xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">Resources</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary glow-text-pink">Down</span><span className="text-primary glow-text-cyan">loads</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                All documents for <span className="text-primary">project screening</span> and <span className="text-secondary">collaboration</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <MotionStagger className="space-y-6">
            {downloads.map((item, index) => (
              <MotionItem key={item.title}>
                <Card 
                  interactive 
                  glow={item.accent === "cyan" ? "cyan" : "pink"} 
                  className={`${item.accent === "cyan" ? "glass-cyan border-l-4 border-l-primary" : "glass-pink border-l-4 border-l-secondary"} p-6 flex items-center justify-between`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${item.accent === "cyan" ? "bg-primary/20" : "bg-secondary/20"}`}>
                      <item.icon className={`h-6 w-6 ${item.accent === "cyan" ? "text-primary" : "text-secondary"}`} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {item.title.split(' ').map((word, i) => (
                          <span key={i} className={i % 2 === 0 ? "" : item.accent === "cyan" ? "text-primary" : "text-secondary"}>
                            {word}{' '}
                          </span>
                        ))}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button variant={item.accent === "cyan" ? "glow" : "glow-pink"} size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </Card>
              </MotionItem>
            ))}
          </MotionStagger>

          {/* Divider */}
          <div className="divider-cyan mt-12 mb-8" />

          <MotionReveal delay={0.5}>
            <Card className="glass-pink mt-12 p-8 text-center border-b-4 border-b-secondary">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Need <span className="text-primary">specific</span> <span className="text-secondary">materials</span>?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact me for <span className="text-primary">case studies</span>, <span className="text-secondary">campaign details</span>, or <span className="text-primary">custom presentations</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="glow-pink">
                  <a href="/contact">Request Materials</a>
                </Button>
                <Button asChild variant="glow">
                  <a href="/showcase">View Showcase</a>
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Downloads;
