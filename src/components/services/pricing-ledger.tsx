import type { ReactNode } from "react";
import { serviceOffers, whatsappLink } from "@/data/facts";
import { disciplines } from "@/data/disciplines";
import { MotionItem } from "@/components/motion/MotionReveal";
import { Button } from "@/components/ui/button";
import { disciplineEntryPrice, entryPriceLabel, EVENT_SERVICE_NOTE, numericServicePrice, priceBandPosition, type ServiceOffer } from "@/lib/service-pricing";

function ScopedChip({ children }: { children: ReactNode }) {
  return <span className="inline-flex w-fit rounded-full border border-cyan px-3 py-1 text-caption text-cyan">{children}</span>;
}

function PriceBand({ offers }: { offers: readonly ServiceOffer[] }) {
  const prices = offers.map(offer => numericServicePrice(offer.price)).filter((price): price is number => price !== null);
  const hasScoped = offers.some(offer => numericServicePrice(offer.price) === null);
  return <div aria-hidden="true" className="flex items-center gap-3 mt-5">
    <svg viewBox="-2 0 104 12" preserveAspectRatio="none" className="h-5 w-[82%] overflow-visible">
      <line x1="0" x2="100" y1="6" y2="6" className="stroke-line" vectorEffect="non-scaling-stroke" />
      {prices.map((price, index) => <svg key={index} x={priceBandPosition(price) - 1} y="3" width="2" height="6" viewBox="0 0 6 6" preserveAspectRatio="xMidYMid meet" overflow="visible"><circle cx="3" cy="3" r="3" className="fill-pink" /></svg>)}
    </svg>
    {hasScoped && <ScopedChip>SCOPED</ScopedChip>}
  </div>;
}

function OfferRow({ offer }: { offer: ServiceOffer }) {
  const isScoped = numericServicePrice(offer.price) === null;
  const discovery = serviceOffers.find(item => item.title === "Discovery Sprint");
  const hasDiscoveryStep = isScoped && offer.price.includes("Discovery Sprint");
  return <li data-ledger-row data-scoped={isScoped} className="grid gap-3 py-5 min-[600px]:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
    <div className="min-w-0">
      <h3 className="text-base font-semibold text-ink break-words">{offer.title}</h3>
      <p className="mt-2 text-caption text-ink-muted">{offer.description}</p>
    </div>
    <div className="flex min-w-0 flex-col items-start min-[600px]:items-end min-[600px]:text-right">
      {isScoped ? <>
        <ScopedChip>SCOPED WITH YOU</ScopedChip>
        <p data-scoped-price className="mt-2 text-sm text-ink-soft">{offer.price.charAt(0).toUpperCase() + offer.price.slice(1)}</p>
        {hasDiscoveryStep && discovery && <p className="mt-2 text-caption text-pink-glow">First step: Discovery Sprint {discovery.price}<span className="block">{discovery.vat}</span></p>}
      </> : <>
        <p className="text-lg font-bold text-ink">{offer.price}</p>
        {offer.vat && <p className="text-caption text-ink-muted mt-1">{offer.vat}</p>}
      </>}
      <Button asChild variant="link" className="min-h-control h-auto px-0 text-action text-cyan-glow hover:text-cyan-glow">
        <a href={whatsappLink(`Hi Andries, I'm interested in ${offer.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Discuss ${offer.title} on WhatsApp`}>ASK</a>
      </Button>
    </div>
  </li>;
}

/** Services-only disclosure ledger; homepage cards retain their existing presentation. */
export function PricingLedger() {
  return <div className="grid items-start gap-6 min-[900px]:grid-cols-2" data-pricing-ledger>
    {disciplines.map((discipline, index) => {
      const offers = serviceOffers.filter(offer => offer.discipline === discipline.title);
      const entryPrice = disciplineEntryPrice(offers);
      return <MotionItem key={discipline.title}>
        <div className="rounded-lg bg-gradient-neon p-px hover:shadow-glow-cyan transition-shadow motion-reduce:transition-none">
          <details open={index < 2} className="group rounded-lg bg-panel text-ink" data-discipline-panel>
            <summary className="relative min-h-control cursor-pointer list-none rounded-lg p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              <div className="flex items-start gap-3 pr-7">
                <span className="text-eyebrow text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="text-label uppercase text-ink break-words">{discipline.title}</h2>
              </div>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute right-5 top-6 h-5 w-5 fill-none stroke-cyan group-open:rotate-180 motion-reduce:transform-none"><path d="m6 9 6 6 6-6" strokeWidth="2" /></svg>
              <p className="mt-6 text-eyebrow text-pink-glow">STARTS AT</p>
              <p data-entry-price className="mt-2 text-4xl sm:text-5xl font-extrabold text-ink">{entryPrice === null ? "Scoped with you" : entryPriceLabel(entryPrice)}</p>
              <p className="mt-2 text-caption text-ink-muted">excl. VAT if applicable · {offers.length} offers</p>
              <PriceBand offers={offers} />
            </summary>
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <ul className="border-t border-line divide-y divide-line">{offers.map(offer => <OfferRow key={offer.title} offer={offer} />)}</ul>
              {discipline.title === "3D Virtualization & Events" && <p className="mt-4 border-l-2 border-blue pl-4 text-caption text-ink-muted">{EVENT_SERVICE_NOTE}</p>}
            </div>
          </details>
        </div>
      </MotionItem>;
    })}
  </div>;
}