import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompaniesPreview } from "@/components/companies/CompaniesPreview";
import { AIToolsSection } from "@/components/ai-tools/AIToolsSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, TrendingUp, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            I don't just talk growth —{" "}
            <span className="text-primary">I've shipped it.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">
            10 companies built with real metrics and proven execution across events, consulting, retail, and industrial sectors in South Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow-pulse">
              <Link to="/companies" className="inline-flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                View Companies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/50 hover:bg-muted/50">
              <a
                href="https://wa.me/27729749703"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Growth Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-border/50 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center animate-fade-in [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards] p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 cursor-default">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Building2 className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                <span className="font-heading text-3xl font-bold">10</span>
              </div>
              <p className="text-sm text-muted-foreground">Companies Built</p>
            </div>
            <div className="group text-center animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 cursor-default">
              <div className="flex items-center justify-center gap-2 text-foreground mb-2">
                <Users className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]" />
                <span className="font-heading text-3xl font-bold">1,020+</span>
              </div>
              <p className="text-sm text-muted-foreground">Clients Acquired</p>
            </div>
            <div className="group text-center animate-fade-in [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards] p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 cursor-default">
              <div className="flex items-center justify-center gap-2 text-secondary mb-2">
                <TrendingUp className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--secondary))]" />
                <span className="font-heading text-3xl font-bold">47%</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg. Growth</p>
            </div>
            <div className="group text-center animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards] p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 cursor-default">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Star className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                <span className="font-heading text-3xl font-bold">96%</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg. Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <AIToolsSection />

      {/* Companies Preview */}
      <CompaniesPreview />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to grow your business?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss how I can help you achieve similar results.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
