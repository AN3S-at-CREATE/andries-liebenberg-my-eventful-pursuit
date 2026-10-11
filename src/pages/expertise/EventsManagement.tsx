import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Lightbulb, Users, Leaf, Globe } from "lucide-react";

const EventsManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Events Management | AN3S"
        description="Event management, technical production, logistics and protocol coordination."
        path="/expertise/events-management"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Events Management", path: "/expertise/events-management" },
        ])}
      />
      <Navbar />
      <main>
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Events Management
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Event planning, technical production, logistics and protocol coordination.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Extensive Experience</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Budget Management</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Technical Production</h3>
                <p className="text-muted-foreground">
                  Master of lighting, sound, AV, and stage design. Seamlessly integrating the latest innovations to wow audiences.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">High-Profile Clients</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <Leaf className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sustainable Practices</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.6}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">VVIP Protocol</h3>
                <p className="text-muted-foreground">
                  Meticulous VVIP protocol management with high-profile international events in Dubai and India.
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventsManagement;
