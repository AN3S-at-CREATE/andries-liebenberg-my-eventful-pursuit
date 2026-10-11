import { facts } from "@/data/facts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Privacy Policy | AN3S — Andries Liebenberg"
        description="How AN3S (Andries Liebenberg) collects, uses, and protects your personal information in line with South Africa's POPIA requirements."
        path="/privacy"
      />
      <Navbar />
      <main>
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-primary" className="mb-4">Legal</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <MotionReveal delay={0.1}>
            <Card className="glass border-l-4 border-l-pink p-8 mb-8" glow="primary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you fill out a contact form, 
                request information, or communicate with us. This may include your name, email address, 
                phone number, and any other information you choose to provide.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass border-l-4 border-l-cyan p-8 mb-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to respond to your inquiries, provide services you request, 
                send you marketing communications (with your consent), and improve our services.
              </p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-8" />

          <MotionReveal delay={0.3}>
            <Card className="glass border-l-4 border-l-pink p-8 mb-8" glow="primary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                3. POPIA Compliance
              </h2>
              <p className="text-muted-foreground">
                We comply with the Protection of Personal Information Act (POPIA) of South Africa. 
                You have the right to access, correct, or delete your personal information at any time.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-cyan p-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                4. Contact Us
              </h2>
              <p className="text-muted-foreground">
                For any privacy-related questions, contact us at {facts.email.value} or {facts.whatsapp.value}.
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

export default Privacy;
