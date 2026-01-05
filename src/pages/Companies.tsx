import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { PerformanceBriefModal } from "@/components/companies/PerformanceBriefModal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 px-4 border-b border-secondary/30 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-8">
              <Badge variant="glow-pink" className="mb-4">Portfolio</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Companies <span className="text-primary glow-text-cyan">I</span> <span className="text-secondary glow-text-pink">Built</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I don't just talk growth — I've shipped it. <span className="text-primary font-semibold">10 companies</span> with real metrics and proven execution across <span className="text-secondary">events</span>, <span className="text-primary">consulting</span>, <span className="text-secondary">retail</span>, and <span className="text-primary">industrial</span> sectors.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PerformanceBriefModal />
              <Button asChild variant="glow-pink">
                <a
                  href="https://wa.me/27729749703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book a Growth Call
                </a>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-cyan h-px w-full" />

      {/* Company Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <CompanyGrid />
        </div>
      </section>

      {/* Divider */}
      <div className="divider-pink h-px w-full" />

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Companies;
