import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/seo/Seo";
import { Section } from "@/components/shared/section";
import { WorkSection } from "@/components/work/work-section";
import { CardGrid } from "@/components/shared/card-grid";
import { MotionItem } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { breadcrumb } from "@/lib/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const brandLogos = [
  { src: "/media/brand/an3s-logo-01.webp", caption: "AN3S logo exploration" },
  { src: "/media/brand/an3s-logo-02.webp", caption: "AN3S logo exploration" },
  { src: "/media/brand/an3s-logo-03.webp", caption: "AN3S logo exploration" },
  { src: "/media/brand/an3s-logo-04.webp", caption: "AN3S logo exploration" },
  { src: "/media/brand/360vd-logo-01.webp", caption: "360 Vision Design logo" },
  { src: "/media/brand/360vd-logo-02.webp", caption: "360 Vision Design logo" },
];

export default function Work() {
  return <div className="min-h-screen bg-background"><Seo title="Work | AN3S" description="Event production, AI projects and source-backed work by Andries Liebenberg." path="/work" jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} /><Navbar /><main>
    <Section eyebrow="AN3S"><h1 className="text-4xl font-bold text-foreground mb-6">EVENTS, AI AND DESIGN WORK</h1><p className="text-body text-muted-foreground max-w-3xl">Event-production photographs, stage and venue concepts, AI venture roles and brand imagery by Andries Liebenberg. Explore the examples alongside the separate, source-backed record of his work at Veralogix Group; concept renders are not photographs of completed events.</p></Section>
    <WorkSection includeProof />
    <Section eyebrow="BRAND" title="Brand identity" lead="AN3S logo explorations and supplied 360 Vision Design logos. These images show identity work, separate from the event-production photographs and 3D stage concepts above.">
      <CardGrid>
        {brandLogos.map((logo) => (
          <MotionItem key={logo.src} className="h-full">
            <Card variant="glass" className="h-full p-6 flex flex-col items-center justify-center gap-4">
              <img src={logo.src} alt={logo.caption} width="480" height="480" className="w-full h-auto object-contain" loading="lazy" />
              <p className="text-sm text-muted-foreground">{logo.caption}</p>
              <p className="text-sm text-muted-foreground">{logo.caption === "AN3S logo exploration" ? "An AN3S identity exploration, not a replacement for the site's official wordmark." : "A supplied 360 Vision Design identity image, shown as brand work rather than an event-production example."}</p>
            </Card>
          </MotionItem>
        ))}
      </CardGrid>
      <Button asChild variant="outline" className="mt-8"><Link to="/services">Explore brand design offers</Link></Button>
    </Section>
  </main><Footer /></div>;
}
