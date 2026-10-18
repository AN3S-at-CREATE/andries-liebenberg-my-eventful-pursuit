import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/seo/Seo";
import { PricingLedger } from "@/components/services/pricing-ledger";
import { breadcrumb } from "@/lib/breadcrumb";
export default function Services(){return <div className="min-h-screen bg-background"><Seo title="Services | AN3S" description="AI, automation, websites, apps, marketing, brand and event design services for South African businesses." path="/services" jsonLd={breadcrumb([{name:"Home",path:"/"},{name:"Services",path:"/services"}])}/><Navbar/><main><Section>
  <p className="text-eyebrow text-pink-glow mb-5">SERVICES AND PRICES</p>
  <h1 className="text-3xl sm:text-5xl leading-tight text-ink mb-6"><span className="block font-light">EIGHT DISCIPLINES.</span><span className="block font-extrabold">ONE PRICE LIST.</span></h1>
  <p className="text-body text-ink-muted max-w-2xl">Every discipline starts at a published price. Larger and private work is scoped with you, starting with a paid Discovery Sprint that is credited to the build.</p>
  <div className="flex flex-wrap gap-x-6 gap-y-3 my-6 text-caption text-ink-muted">
    <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-pink" />Published starting price</span>
    <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full border border-cyan" />Scoped with you</span>
  </div>
  <p className="text-caption text-ink-muted mb-12">Prices in ZAR. Numeric prices are excl. VAT if applicable.</p>
  <PricingLedger />
</Section></main><Footer/></div>;}
