import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { PerformanceBriefModal } from "@/components/companies/PerformanceBriefModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Ventures | AN3S"
        description="Explore Andries Liebenberg’s venture portfolio across events, consulting, retail and industrial services."
        path="/companies"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Ventures", path: "/companies" },
        ])}
      />
      <Navbar />
      <main>

      {/* Hero */}
      <Section className="relative   border-b border-cyan/30 overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-8">
              <Badge variant="glow-secondary" className="mb-4">Portfolio</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Ventures
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A portfolio of ventures across events, consulting, retail and industrial services.</p>
            </div>
          </MotionReveal>

          <MotionReveal className="h-full" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PerformanceBriefModal />
              <Button asChild variant="glow-secondary">
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
      </Section>

      {/* Divider */}
      <div className="divider-primary h-px w-full" />

      {/* Company Grid */}
      <Section className=" ">
        <div>
          <CompanyGrid />
        </div>
      </Section>

      {/* Divider */}
      <div className="divider-secondary h-px w-full" />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Companies;
