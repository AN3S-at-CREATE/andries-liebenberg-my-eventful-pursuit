import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Privacy = () => {
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
                <span className="text-primary glow-text-cyan">Privacy</span> <span className="text-secondary glow-text-pink">Policy</span>
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
                <span className="text-primary">1.</span> Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you fill out a contact form, 
                request information, or communicate with us. This may include your <span className="text-primary">name</span>, <span className="text-secondary">email address</span>, 
                phone number, and any other information you choose to provide.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass border-l-4 border-l-secondary p-8 mb-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">2.</span> How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to <span className="text-primary">respond to your inquiries</span>, provide services you request, 
                send you marketing communications (with your consent), and <span className="text-secondary">improve our services</span>.
              </p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-8" />

          <MotionReveal delay={0.3}>
            <Card className="glass border-l-4 border-l-primary p-8 mb-8" glow="cyan">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-primary">3.</span> POPIA Compliance
              </h2>
              <p className="text-muted-foreground">
                We comply with the <span className="text-secondary">Protection of Personal Information Act (POPIA)</span> of South Africa. 
                You have the right to <span className="text-primary">access</span>, <span className="text-secondary">correct</span>, or <span className="text-primary">delete</span> your personal information at any time.
              </p>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-secondary p-8" glow="pink">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                <span className="text-secondary">4.</span> Contact Us
              </h2>
              <p className="text-muted-foreground">
                For any privacy-related questions, contact us at <span className="text-primary">create@an3s.info</span> or <span className="text-secondary">+27 72 974 9703</span>.
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

export default Privacy;
