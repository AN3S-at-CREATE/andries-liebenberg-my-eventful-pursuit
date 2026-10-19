import { Link } from "react-router-dom";
import { serviceOffers, whatsappLink } from "@/data/facts";
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
import { EVENT_SERVICE_NOTE } from "@/lib/service-pricing";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { Calendar, DollarSign, Lightbulb, Users, Leaf, Globe, ChevronLeft, ChevronRight } from "lucide-react";

const RENDER_CAPTION = "3D stage render by Andries Liebenberg";
const renders = Array.from({ length: 10 }, (_, i) => `/media/renders/render-stage-${String(i + 1).padStart(2, "0")}.webp`);

const EventsManagement = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const showPrev = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + renders.length - 1) % renders.length)), []);
  const showNext = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + 1) % renders.length)), []);
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  }, [showPrev, showNext]);
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Events Design And Technical Planning | AN3S"
        description="Event layouts, stage concepts, lighting plots and hybrid-event technical plans. AN3S handles design and technical planning; full productions are delivered by 360 Vision Events."
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
        <img src="/media/renders/render-stage-04.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/85" aria-hidden="true" />
        <div className="relative">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Events design and technical planning
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Event layouts, stage concepts, lighting plots and hybrid-event technical plans. AN3S handles design and technical planning; full productions are delivered by 360 Vision Events.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">3D event layouts</h3>
                <p className="text-muted-foreground">Event 3D Visualisation & Technical Plan covers event layouts and technical planning in 3D.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Stage and venue concepts</h3>
                <p className="text-muted-foreground">3D Concept Render provides a stage or venue concept, priced per view. The gallery below shows supplied stage renders by Andries.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Lighting plots</h3>
                <p className="text-muted-foreground">Lighting Design / Lighting Plot is scoped by quote. It is a technical-design offer, separate from event graphics.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Event graphics</h3>
                <p className="text-muted-foreground">Event Graphics covers a flyer, banner or programme design, per design.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.5}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Leaf className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Hybrid and virtual planning</h3>
                <p className="text-muted-foreground">Hybrid / Virtual Event Technical Plan focuses on technical planning for events with virtual components.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.6}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Production responsibility</h3>
                <p className="text-muted-foreground">AN3S provides event design and technical planning. Full event productions are delivered by 360 Vision Events.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          <p className="mt-6 text-caption text-muted-foreground">{EVENT_SERVICE_NOTE}</p>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </Section>

      <Section eyebrow="3D VISUALIZATION" title="3D stage and venue renders">
        <CardGrid>
          {renders.map((src, i) => (
            <MotionReveal key={src} className="h-full">
              <button type="button" onClick={() => setOpenIndex(i)} className="block w-full border border-border overflow-hidden interactive-edge" aria-label={`${RENDER_CAPTION} ${i + 1} of 10 — open larger view`}>
                <img src={src} alt={RENDER_CAPTION} width="960" height="540" className="aspect-video w-full object-cover" loading="lazy" />
              </button>
            </MotionReveal>
          ))}
        </CardGrid>
        <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
          <DialogContent className="max-w-4xl" onKeyDown={handleKeyDown}>
            <DialogTitle className="sr-only">{RENDER_CAPTION}</DialogTitle>
            {openIndex !== null && <img src={renders[openIndex]} alt={RENDER_CAPTION} className="w-full object-contain" />}
            <p className="text-sm text-muted-foreground text-center">{RENDER_CAPTION}</p>
            <div className="flex justify-between gap-4">
              <Button type="button" variant="outline" onClick={showPrev} aria-label="Previous render"><ChevronLeft className="h-4 w-4" /> Previous</Button>
              <Button type="button" variant="outline" onClick={showNext} aria-label="Next render">Next <ChevronRight className="h-4 w-4" /></Button>
            </div>
          </DialogContent>
        </Dialog>
      </Section>


      <Section title="Offers and next steps">
        <ul className="space-y-6">
          {serviceOffers.filter((offer) => offer.discipline === "3D Virtualization & Events").map((offer) => (
            <li key={offer.title} className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
              <p className="text-body text-muted-foreground mb-3">{offer.description}</p>
              <a className="text-secondary underline underline-offset-4" href={whatsappLink(`Hi Andries, I'm interested in ${offer.title}.`)} target="_blank" rel="noopener noreferrer">Ask about {offer.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild variant="outline"><Link to="/services">View prices and quote options</Link></Button>
          <Link className="text-secondary underline underline-offset-4 self-center" to="/ai/event-planning-guide">Read the event-planning guide</Link>
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventsManagement;
