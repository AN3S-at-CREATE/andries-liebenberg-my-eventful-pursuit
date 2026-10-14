import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/brand/brand-parts";
import { ParallaxStarfield } from "@/components/effects/ParallaxStarfield";
import { facts, whatsappLink } from "@/data/facts";
import wordmark from "@/design-system/assets/an3s-wordmark.svg";
import { HeroMedia } from "./hero-media";

export function HomeHero() {
  return <section className="relative overflow-hidden px-4 py-20 md:py-28">
    <HeroMedia background />
    <ParallaxStarfield />
    <div className="container max-w-6xl relative grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
      <div className="min-w-0">
        <p className="text-label text-muted-foreground mb-8">EST. {facts.established.value}</p>
        <h1 className="relative isolate mb-8">
          <span aria-hidden="true" className="hero-halo absolute inset-0 -z-10" />
          <img src={wordmark} alt={facts.brand.value} width="440" height="144" className="w-56 md:w-96 max-w-full h-auto" fetchPriority="high" />
        </h1>
        <p className="text-sm font-semibold leading-7 lg:whitespace-nowrap mb-6"><GradientText>{facts.tagline.value}</GradientText></p>
        <p className="text-body text-foreground max-w-2xl mb-5">{facts.descriptor.value}</p>
        <p className="text-body text-muted-foreground max-w-2xl mb-8">Design, websites, apps and automation for South African businesses that thought these tools were out of reach.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="text-action text-on-glow"><a href={whatsappLink("Hi Andries, I found you on an3s.info and would like to discuss a project.")} target="_blank" rel="noopener noreferrer">WHATSAPP ANDRIES</a></Button>
          <Button asChild variant="glow-secondary" size="lg" className="text-action"><Link to="/services">SEE SERVICES</Link></Button>
        </div>
      </div>
      <div className="min-w-0"><HeroMedia /><p className="text-caption text-muted-foreground mt-3">Event production by Andries, 360 Vision Events</p></div>
    </div>
  </section>;
}