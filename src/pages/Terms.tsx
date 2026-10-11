import { facts } from "@/data/facts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Terms of Service | AN3S — Andries Liebenberg"
        description="The terms and conditions governing your use of the AN3S website and services provided by Andries Liebenberg."
        path="/terms"
      />
      <Navbar />
      <main>
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-secondary" className="mb-4">Legal</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <MotionReveal delay={0.1}>
            <Card className="glass border-l-4 border-l-cyan p-8 mb-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass border-l-4 border-l-pink p-8 mb-8" glow="primary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                2. Services
              </h2>
              <p className="text-muted-foreground">
                AN3S provides marketing, event management, sales consulting, development, and AI solutions. 
                Specific terms for individual services will be outlined in separate agreements.
              </p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-8" />

          <MotionReveal delay={0.3}>
            <Card className="glass border-l-4 border-l-cyan p-8 mb-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, and software, is the property 
                of AN3S and protected by South African and international copyright laws.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-pink p-8 mb-8" glow="primary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                4. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                AN3S shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use of our services.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.5}>
            <Card className="glass border-l-4 border-l-cyan p-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                5. Contact
              </h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at {facts.email.value}.
              </p>
            </Card>
          </MotionReveal>
        </div>
      </section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Terms;
