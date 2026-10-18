import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/brand/brand-parts";
import { facts, whatsappLink } from "@/data/facts";
import { HeroMedia } from "./hero-media";

// Byte-identical copy of the design-system wordmark, served from public/media.
const wordmark = "/media/wordmark.png";

export function HomeHero() {
  return <section className="relative px-4 py-20 md:py-28">
    <HeroMedia src="/media/hero-intro.mp4" webmSrc="/media/hero-intro.webm" poster="/media/hero-poster.jpg" />
    <div className="container max-w-6xl relative z-10 flex flex-col items-center text-center">
      <div className="min-w-0 flex flex-col items-center">
        <h1 className="relative isolate mb-8">
          <span aria-hidden="true" className="hero-halo absolute inset-0 -z-10" />
          <img src={wordmark} alt={facts.brand.value} width="426" height="144" className="w-56 md:w-96 max-w-full h-auto" fetchPriority="high" />
        </h1>
        <p className="text-lg md:text-2xl font-semibold leading-relaxed max-w-4xl mb-6"><GradientText>{facts.tagline.value}</GradientText></p>
        <p className="text-body text-foreground max-w-2xl mb-5">{facts.descriptor.value}</p>
        <p className="text-body text-muted-foreground max-w-2xl mb-8">Design, websites, apps and automation for South African businesses that thought these tools were out of reach.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="rounded-full text-on-glow"><a href={whatsappLink("Hi Andries, I found you on an3s.info and would like to discuss a project.")} target="_blank" rel="noopener noreferrer">WhatsApp Andries</a></Button>
          <Button asChild variant="glow-secondary" size="lg" className="rounded-full bg-transparent border-cyan text-secondary"><Link to="/services">See services</Link></Button>
        </div>
      </div>
    </div>
  </section>;
}