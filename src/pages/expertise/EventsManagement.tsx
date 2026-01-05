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
              <Badge variant="glow-cyan" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Events <span className="text-primary glow-text-cyan">Management</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                With over 20 years in the industry, I've orchestrated more than 2,246 successful events, from conceptualization to flawless execution.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-8">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Extensive Experience</h3>
                <p className="text-muted-foreground">
                  Over 20 years and 2,246+ successful events. End-to-end event management expertise with a track record of delighting clients.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-8">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Budget Management</h3>
                <p className="text-muted-foreground">
                  Managed event costs exceeding ZAR 423 million. Navigating complex logistics and multimillion-rand budgets with precision.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-cyan p-8">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Technical Production</h3>
                <p className="text-muted-foreground">
                  Master of lighting, sound, AV, and stage design. Seamlessly integrating the latest innovations to wow audiences.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-pink p-8">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">High-Profile Clients</h3>
                <p className="text-muted-foreground">
                  Trusted by industry leaders: Africity 2060, Transnet, ABSA, SASOL, Nedbank, and Liberty Life.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card className="glass-cyan p-8">
                <Leaf className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sustainable Practices</h3>
                <p className="text-muted-foreground">
                  Visionary pioneer fusing cutting-edge technology with sustainable practices, achieving 40% reduction in event waste.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.6}>
              <Card className="glass-pink p-8">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">VVIP Protocol</h3>
                <p className="text-muted-foreground">
                  Meticulous VVIP protocol management with high-profile international events in Dubai and India.
                </p>
              </Card>
            </MotionReveal>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventsManagement;
