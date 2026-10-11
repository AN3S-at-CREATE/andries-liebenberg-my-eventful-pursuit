import { facts } from "@/data/facts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Cookie Policy | AN3S — Andries Liebenberg"
        description="Learn how AN3S uses cookies and similar technologies, why we use them, and how you can manage your cookie preferences."
        path="/cookie-policy"
      />
      <Navbar />
      <main>
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-primary" className="mb-4">Legal</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cookie Policy
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
                1. What Are Cookies
              </h2>
              <p className="text-muted-foreground">
                Cookies are small text files stored on your device when you visit our website. 
                They help us provide a better user experience by remembering your preferences and understanding how you use our site.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass border-l-4 border-l-cyan p-8 mb-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                2. Types of Cookies We Use
              </h2>
              <p className="text-muted-foreground">
                Essential Cookies: Required for the website to function properly.<br />
                Analytics Cookies: Help us understand how visitors interact with our website.<br />
                Preference Cookies: Remember your settings and preferences.
              </p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-8" />

          <MotionReveal delay={0.3}>
            <Card className="glass border-l-4 border-l-pink p-8 mb-8" glow="primary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                3. Managing Cookies
              </h2>
              <p className="text-muted-foreground">
                You can control and manage cookies through your browser settings. 
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-cyan p-8" glow="secondary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                4. Contact
              </h2>
              <p className="text-muted-foreground">
                For questions about our cookie policy, contact us at {facts.email.value}.
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

export default CookiePolicy;
