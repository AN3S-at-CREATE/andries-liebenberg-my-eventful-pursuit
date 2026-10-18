import { CardGrid } from "@/components/shared/card-grid";
import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Calendar, DollarSign, Lightbulb, Users, Leaf, Globe, ChevronLeft, ChevronRight } from "lucide-react";

const RENDER_CAPTION = "3D stage render by Andries Liebenberg";
const renders = Array.from({ length: 10 }, (_, i) => `/media/renders/render-stage-${String(i + 1).padStart(2, "0")}.webp`);

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
      
      <Section className="relative   overflow-hidden">
        <div>
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

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Extensive Experience</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Budget Management</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Technical Production</h3>
                <p className="text-muted-foreground">
                  Master of lighting, sound, AV, and stage design. Seamlessly integrating the latest innovations to wow audiences.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">High-Profile Clients</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.5}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Leaf className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sustainable Practices</h3>
                <p className="text-muted-foreground">Event planning, technical production, logistics and protocol coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.6}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">VVIP Protocol</h3>
                <p className="text-muted-foreground">
                  Meticulous VVIP protocol management with high-profile international events in Dubai and India.
                </p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventsManagement;
