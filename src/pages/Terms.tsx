import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto">
          <MotionReveal>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Terms of Service
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg mb-6">
                Last updated: January 2025
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">2. Services</h2>
              <p className="text-muted-foreground mb-4">
                AN3S provides marketing, event management, sales consulting, development, and AI solutions. 
                Specific terms for individual services will be outlined in separate agreements.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">3. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on this website, including text, graphics, logos, and software, is the property 
                of AN3S and protected by South African and international copyright laws.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                AN3S shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use of our services.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">5. Contact</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these terms, contact us at create@an3s.info.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Terms;
