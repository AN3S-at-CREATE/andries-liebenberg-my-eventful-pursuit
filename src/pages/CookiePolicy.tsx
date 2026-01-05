import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-4xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-cyan" className="mb-4">Legal</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                <span className="text-primary glow-text-cyan">Cookie</span> <span className="text-secondary glow-text-pink">Policy</span>
              </h1>
              <p className="text-muted-foreground">
                Last updated: <span className="text-primary">January 2025</span>
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <MotionReveal delay={0.1}>
            <Card className="glass border-l-4 border-l-primary p-8 mb-8" glow="cyan">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-primary">1.</span> What Are Cookies
              </h2>
              <p className="text-muted-foreground">
                Cookies are small <span className="text-primary">text files</span> stored on your device when you visit our website. 
                They help us provide a better user experience by <span className="text-secondary">remembering your preferences</span> and understanding how you use our site.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass border-l-4 border-l-secondary p-8 mb-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">2.</span> Types of Cookies We Use
              </h2>
              <p className="text-muted-foreground">
                <span className="text-primary font-semibold">Essential Cookies:</span> Required for the website to function properly.<br />
                <span className="text-secondary font-semibold">Analytics Cookies:</span> Help us understand how visitors interact with our website.<br />
                <span className="text-primary font-semibold">Preference Cookies:</span> Remember your settings and preferences.
              </p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-8" />

          <MotionReveal delay={0.3}>
            <Card className="glass border-l-4 border-l-primary p-8 mb-8" glow="cyan">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-primary">3.</span> Managing Cookies
              </h2>
              <p className="text-muted-foreground">
                You can <span className="text-secondary">control and manage</span> cookies through your browser settings. 
                Please note that disabling certain cookies may affect the <span className="text-primary">functionality</span> of our website.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-secondary p-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">4.</span> Contact
              </h2>
              <p className="text-muted-foreground">
                For questions about our cookie policy, contact us at <span className="text-primary">create@an3s.info</span>.
              </p>
            </Card>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default CookiePolicy;
