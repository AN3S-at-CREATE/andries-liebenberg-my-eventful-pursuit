import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { serviceOffers, whatsappLink } from "@/data/facts";

interface AnswerPart { text: string; isPriced?: boolean }
interface ChaosQuestion { ask: string; offerTitle: string; answer: AnswerPart[] }

/** The four approved Concierge starter questions; prices are read from facts.ts, never retyped. */
export const CHAOS_QUESTIONS: ChaosQuestion[] = [
  { ask: "I need a website. What does it cost?", offerTitle: "One-page Website", answer: [
    { text: "A single-page website, designed and built by me. Need more room? " },
    { text: "Starter Website", isPriced: true }, { text: ", up to 5 pages, " }, { text: "from R4,500", isPriced: true },
    { text: ". Keep it current with the " }, { text: "Website Care Plan", isPriced: true }, { text: " at " }, { text: "R650 per month", isPriced: true }, { text: "." },
  ] },
  { ask: "Can you automate my WhatsApp enquiries?", offerTitle: "Automation Starter", answer: [
    { text: "Yes. I automate one routine task per workflow, " }, { text: "from R3,500", isPriced: true },
    { text: ". Want it to chat back too? " }, { text: "AI Chatbot / WhatsApp Assistant", isPriced: true }, { text: ", " },
    { text: "from R4,500", isPriced: true }, { text: ", Meta, API and model fees extra." },
  ] },
  { ask: "I need a logo and brand. Where do I start?", offerTitle: "Logo Starter", answer: [
    { text: "Start with " }, { text: "Logo Starter", isPriced: true }, { text: ", " }, { text: "from R1,500", isPriced: true },
    { text: ". Need more than a mark? " }, { text: "Brand Identity Starter", isPriced: true }, { text: ", " }, { text: "from R3,500", isPriced: true }, { text: "." },
  ] },
  { ask: "Book a call with Andries", offerTitle: "AI & Growth Audit", answer: [
    { text: "Book a session. " }, { text: "AI & Growth Audit", isPriced: true }, { text: ", " }, { text: "from R1,500", isPriced: true },
    { text: " per session. Reply YES and I will send times on WhatsApp." },
  ] },
];

const FIRST_YEAR = 2000;
const EST_YEAR = 2003;

function Strata() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);
  const step = 100 / (years.length - 1);
  const x = (year: number) => (year - FIRST_YEAR) * step;
  return <div className="mt-12 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
    <figure aria-label={`Strata: one line per year from ${FIRST_YEAR} to ${currentYear}`}>
      <svg viewBox="-1 0 102 12" preserveAspectRatio="none" className="h-10 w-full" aria-hidden="true">
        {years.map(year => <line key={year} x1={x(year)} x2={x(year)} y1={year === currentYear || year === EST_YEAR ? 0 : 4} y2={12}
          vectorEffect="non-scaling-stroke" strokeWidth={year === currentYear || year === EST_YEAR ? 2 : 1}
          stroke="currentColor" className={year === currentYear ? "text-primary" : year === EST_YEAR ? "text-secondary" : "text-border"} />)}
      </svg>
      <figcaption className="relative mt-2 h-8 text-xs text-muted-foreground">
        <span className="absolute left-0">{FIRST_YEAR}</span>
        <span className="absolute top-4 -translate-x-1/2 whitespace-nowrap text-secondary" style={{ left: `${x(EST_YEAR)}%` }}>Est. {EST_YEAR}</span>{/* ds-allow: computed SVG tick position */}
        <span className="absolute right-0 text-primary">{currentYear}</span>
      </figcaption>
    </figure>
    <p className="text-xs text-muted-foreground md:text-right">One line a year · Since 2000. Est. 2003. This year is the pink line.</p>
  </div>;
}

/** Homepage "You ask first" triad: question, decision in the gap, answer. */
export function ChaosGap() {
  const [selected, setSelected] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [isLit, setIsLit] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") { setIsLit(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setIsLit(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const question = CHAOS_QUESTIONS[selected];
  const offer = serviceOffers.find(item => item.title === question.offerTitle);
  const hasNumericPrice = offer ? /R\d/.test(offer.price) : false;

  return <section ref={ref} id="start-here" aria-labelledby="chaos-gap-title" className={`chaos-gap-section px-4 py-20 md:py-28 ${isLit ? "is-lit" : ""}`}>
    <div className="container max-w-6xl">
      <p className="text-label text-secondary mb-4">START HERE</p>
      <h2 id="chaos-gap-title" className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-foreground mb-5">YOU ASK FIRST</h2>
      <p className="text-body text-muted-foreground max-w-2xl mb-12">Pick the question closest to yours. The answer comes with a list price and one next step.</p>

      <div className="chaos-gap-triad" aria-live="polite">
        <div className="chaos-field border border-pink/35 p-6 md:p-8">
          <span className="chaos-edge chaos-edge-ask" aria-hidden="true" />
          <p className="text-label text-primary mb-4">YOU ASK</p>
          <p className="text-2xl md:text-3xl font-bold text-pink-glow">{question.ask}</p>
          <p className="mt-4 text-xs text-muted-foreground">One of the four AN3S Concierge starter questions.</p>
        </div>

        <div className="chaos-gap flex flex-col items-center justify-center gap-2 px-2 py-6 text-center">
          <p className="text-label text-muted-foreground">CHAOS</p>
          {offer && <>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground">{offer.title}</p>
            <p className="text-lg font-extrabold text-foreground">{offer.price}</p>
            {hasNumericPrice && offer.vat && <p className="text-xs text-muted-foreground">{offer.vat}</p>}
            <Button asChild size="sm" variant="outline" className="mt-2 border-cyan text-secondary">
              <a href={whatsappLink(`Hi Andries, YES to the ${offer.title} (${offer.price}). Please send me the next step.`)} target="_blank" rel="noopener noreferrer">REPLY YES</a>
            </Button>
          </>}
        </div>

        <div className="chaos-field border border-blue/35 p-6 md:p-8">
          <span className="chaos-edge chaos-edge-answer" aria-hidden="true" />
          <p className="text-label text-secondary mb-4">I ANSWER</p>
          <p className="text-body text-foreground">{question.answer.map((part, index) => part.isPriced
            ? <strong key={index} className="font-extrabold text-cyan-glow">{part.text}</strong>
            : <span key={index}>{part.text}</span>)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild><a href={whatsappLink(`Hi Andries, ${question.ask}`)} target="_blank" rel="noopener noreferrer">WhatsApp Andries</a></Button>
            <Button asChild variant="outline"><Link to="/services">See all prices</Link></Button>
          </div>
        </div>
      </div>

      <div role="group" aria-label="Choose a question" className="mt-8 flex flex-wrap gap-2">
        {CHAOS_QUESTIONS.map((item, index) => <Button key={item.ask} type="button" size="sm" variant="outline" aria-pressed={index === selected}
          onClick={() => setSelected(index)} className={`h-auto py-1.5 whitespace-normal text-left ${index === selected ? "border-pink text-primary" : ""}`}>{item.ask}</Button>)}
      </div>

      <Strata />
    </div>
  </section>;
}
