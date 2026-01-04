import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { PerformanceBriefModal } from "@/components/companies/PerformanceBriefModal";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-4 border-b border-border/50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Companies I Built
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I don't just talk growth — I've shipped it. 10 companies with real metrics and proven execution across events, consulting, retail, and industrial sectors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PerformanceBriefModal />
            <Button asChild variant="outline" className="border-primary/50 hover:bg-primary/10">
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
        </div>
      </section>

      {/* Company Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <CompanyGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Companies;
