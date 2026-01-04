import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { PerformanceBriefModal } from "@/components/companies/PerformanceBriefModal";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { CursorGlow } from "@/components/effects/CursorGlow";

const Companies = () => {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="py-16 px-4 border-b border-border/50 relative overflow-hidden">
        <CursorGlow containerRef={heroRef} color="mixed" size={300} intensity={0.15} />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-8">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Companies I Built
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I don't just talk growth — I've shipped it. 10 companies with real metrics and proven execution across events, consulting, retail, and industrial sectors.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PerformanceBriefModal />
              <Button asChild variant="outline" className="border-secondary/50 hover:bg-secondary/10 hover:border-secondary border-glow-pink-hover">
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
      <div className="divider-glow h-px w-full animate-glow-breathe" />

      {/* Company Grid */}
      <section ref={gridRef} className="py-12 px-4 relative overflow-hidden">
        <CursorGlow containerRef={gridRef} color="mixed" size={300} intensity={0.15} />
        <div className="container max-w-6xl mx-auto relative z-10">
          <CompanyGrid />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Companies;
