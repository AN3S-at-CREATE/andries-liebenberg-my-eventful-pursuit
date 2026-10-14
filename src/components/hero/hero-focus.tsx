import { Link } from "react-router-dom";
import { disciplines } from "@/data/disciplines";

// The disciplines AN3S leads with: growth, marketing, development, AI and brand. Events and sales
// keep their own pages and the services filter; they just don't headline the hero.
const LEAD = new Set<string>(["AI Systems & Automation", "Business Growth", "Web & App Development", "Experimental Marketing", "Brand Strategy", "Innovation & Mentorship"]);
const focus = disciplines.filter(discipline => LEAD.has(discipline.title));

/** The key visual's Core Work panel: the lead disciplines with their design-system icons, each linking to its page. */
export function HeroFocus() {
  return <nav aria-labelledby="hero-core-work" className="brand-panel brand-panel--services mt-space-4">
    <p id="hero-core-work" className="brand-panel__tab text-label">Core Work</p>
    {/* Tiles need about 140px for the longest word ("DEVELOPMENT", "EXPERIMENTAL"): rows on phones,
        three columns at full width, two while the hero is split, three again from xl. */}
    <ul className="brand-panel__grid grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 overflow-hidden">
      {focus.map(discipline => <li key={discipline.title}>
        <Link to={discipline.href} className="flex h-full items-center gap-space-3 px-space-3 py-space-3 text-left sm:flex-col sm:py-space-4 sm:text-center text-ink-soft transition-colors hover:bg-nebula hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
          <img src={discipline.icon} alt="" width="56" height="56" className="h-icon-tile w-icon-tile shrink-0" />
          <span className="text-service uppercase text-balance">{discipline.title}</span>
        </Link>
      </li>)}
    </ul>
  </nav>;
}
