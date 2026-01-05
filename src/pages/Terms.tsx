import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-4xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-pink" className="mb-4">Legal</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                <span className="text-primary glow-text-cyan">Terms</span> of <span className="text-secondary glow-text-pink">Service</span>
              </h1>
              <p className="text-muted-foreground">
                Last updated: <span className="text-secondary">January 2025</span>
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <MotionReveal delay={0.1}>
            <Card className="glass border-l-4 border-l-secondary p-8 mb-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">1.</span> Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using this website, you <span className="text-primary">accept and agree</span> to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass border-l-4 border-l-primary p-8 mb-8" glow="cyan">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-primary">2.</span> Services
              </h2>
              <p className="text-muted-foreground">
                AN3S provides <span className="text-primary">marketing</span>, <span className="text-secondary">event management</span>, sales consulting, development, and AI solutions. 
                Specific terms for individual services will be outlined in separate agreements.
              </p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-8" />

          <MotionReveal delay={0.3}>
            <Card className="glass border-l-4 border-l-secondary p-8 mb-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">3.</span> Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                All content on this website, including <span className="text-primary">text</span>, <span className="text-secondary">graphics</span>, logos, and software, is the property 
                of AN3S and protected by South African and international copyright laws.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-primary p-8 mb-8" glow="cyan">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-primary">4.</span> Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                AN3S shall not be liable for any <span className="text-secondary">indirect</span>, incidental, special, consequential, or punitive damages 
                resulting from your use of our services.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.5}>
            <Card className="glass border-l-4 border-l-secondary p-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">5.</span> Contact
              </h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at <span className="text-primary">create@an3s.info</span>.
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

export default Terms;
