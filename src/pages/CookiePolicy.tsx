import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto">
          <MotionReveal>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Cookie Policy
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg mb-6">
                Last updated: January 2025
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files stored on your device when you visit our website. 
                They help us provide a better user experience by remembering your preferences and understanding how you use our site.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">2. Types of Cookies We Use</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Essential Cookies:</strong> Required for the website to function properly.<br />
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.<br />
                <strong>Preference Cookies:</strong> Remember your settings and preferences.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">3. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies through your browser settings. 
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">4. Contact</h2>
              <p className="text-muted-foreground mb-4">
                For questions about our cookie policy, contact us at create@an3s.info.
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

export default CookiePolicy;
