import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
  },
  {
    title: "Media Kit",
    description: "Logos, brand assets, and press materials.",
    icon: Presentation,
    href: "#",
  },
  {
    title: "Case Studies",
    description: "Detailed breakdowns of successful projects and campaigns.",
    icon: FileSpreadsheet,
    href: "#",
  },
];

const Downloads = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Resources</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary glow-text-pink">Downloads</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                All documents for project screening and collaboration.
              </p>
            </div>
          </MotionReveal>

          <div className="space-y-6">
            {downloads.map((item, index) => (
              <MotionReveal key={item.title} delay={0.1 * (index + 1)}>
                <Card className="glass p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </Card>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal delay={0.5}>
            <Card className="glass-pink mt-12 p-8 text-center">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Need specific materials?</h3>
              <p className="text-muted-foreground mb-6">
                Contact me for case studies, campaign details, or custom presentations.
              </p>
              <Button asChild className="bg-secondary hover:bg-secondary/90">
                <a href="/contact">Request Materials</a>
              </Button>
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
