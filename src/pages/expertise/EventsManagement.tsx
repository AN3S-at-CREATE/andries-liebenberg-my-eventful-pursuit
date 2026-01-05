import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Lightbulb, Users, Leaf, Globe } from "lucide-react";

const EventsManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Events <span className="text-primary glow-text-cyan">Manage</span><span className="text-secondary glow-text-pink">ment</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                With over <span className="text-primary font-semibold">20 years</span> in the industry, I've orchestrated more than <span className="text-secondary font-semibold">2,246 successful events</span>, from conceptualization to flawless execution.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Extensive <span className="text-primary">Experience</span></h3>
                <p className="text-muted-foreground">
                  Over <span className="text-primary font-semibold">20 years</span> and <span className="text-secondary font-semibold">2,246+</span> successful events. End-to-end event management expertise with a track record of delighting clients.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Budget <span className="text-secondary">Management</span></h3>
                <p className="text-muted-foreground">
                  Managed event costs exceeding <span className="text-secondary font-semibold">ZAR 423 million</span>. Navigating complex logistics and multimillion-rand budgets with precision.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Technical <span className="text-primary">Production</span></h3>
                <p className="text-muted-foreground">
                  Master of <span className="text-primary">lighting</span>, <span className="text-secondary">sound</span>, <span className="text-primary">AV</span>, and <span className="text-secondary">stage design</span>. Seamlessly integrating the latest innovations to wow audiences.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">High-Profile <span className="text-secondary">Clients</span></h3>
                <p className="text-muted-foreground">
                  Trusted by industry leaders: <span className="text-primary">Africity 2060</span>, <span className="text-secondary">Transnet</span>, <span className="text-primary">ABSA</span>, <span className="text-secondary">SASOL</span>, <span className="text-primary">Nedbank</span>, and <span className="text-secondary">Liberty Life</span>.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <Leaf className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sustainable <span className="text-primary">Practices</span></h3>
                <p className="text-muted-foreground">
                  Visionary pioneer fusing cutting-edge technology with sustainable practices, achieving <span className="text-primary font-semibold">40% reduction</span> in event waste.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.6}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">VVIP <span className="text-secondary">Protocol</span></h3>
                <p className="text-muted-foreground">
                  Meticulous VVIP protocol management with high-profile international events in <span className="text-primary">Dubai</span> and <span className="text-secondary">India</span>.
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-pink mt-12" />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventsManagement;
