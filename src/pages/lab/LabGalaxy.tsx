import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo/Seo";
import { GalaxySky } from "@/components/lab/galaxy-sky";
import { LabList } from "@/components/lab/lab-list";
import { EvidenceIcon } from "@/components/lab/evidence-glyph";
import { labStatusLabels, labWorkshopCount, type LabStatus } from "@/data/lab";
import { labSignal, visibleConstellations, visibleLabStars, type LabSignal } from "@/lib/lab-galaxy";
import "@/components/lab/lab.css";

export function LabGalaxy() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [params, setParams] = useSearchParams();
  const [isListVisible, setIsListVisible] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);
  const signal = labSignal(params.get("c"), isMobile);
  const stars = visibleLabStars();
  const groups = visibleConstellations();
  const handleSignal = (value: LabSignal) => {
    const next = new URLSearchParams(params);
    next.set("c", value); setParams(next, { replace: true });
  };
  return <main id="page-content" className="lab-galaxy text-ink">
    <Seo path="/lab" title="AN3S Lab | Systems, AIs and ventures by Andries Liebenberg" description="The AN3S Lab: an interactive map of the AI systems, automations, apps and ventures Andries Liebenberg builds, with simulated demos where possible." />
    <div className="lab-galaxy-layout">
      <aside className="lab-sidebar">
        <p className="text-eyebrow text-pink-glow mb-6">AN3S Lab</p>
        <h1 className="lab-heading mb-6"><span className="block font-light">THE BUILD</span><span className="block font-extrabold">GALAXY</span></h1>
        <p className="lab-intro text-sm leading-relaxed text-ink-muted">Every star is something I have built, run or am building. Move closer to read it. Select one to open its room: what it does, how it is wired, and a demo where there is one.</p>
        <h2 className="text-label mt-8 mb-3">Signal</h2>
        <div role="tablist" aria-label="Constellation signal" className="lab-flags" onKeyDown={event => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
          const values: LabSignal[] = ["all", ...groups.map(group => group.id)];
          const current = values.indexOf(signal);
          const index = event.key === "Home" ? 0 : event.key === "End" ? values.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + values.length) % values.length;
          event.preventDefault(); handleSignal(values[index]);
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
        }}>
          {[{ id: "all" as const, name: "All" }, ...groups].map(group => <Button key={group.id} role="tab" aria-selected={signal === group.id} aria-controls="lab-signal-sky" tabIndex={signal === group.id ? 0 : -1} variant="ghost" className={`lab-flag border ${signal === group.id ? "border-cyan text-cyan-glow bg-cyan/5" : "border-input text-ink-muted"}`} onClick={() => handleSignal(group.id)}>
            {group.name}<span className="ml-2 text-caption">{group.id === "all" ? stars.length : stars.filter(star => star.constellation === group.id).length}</span>
          </Button>)}
        </div>
        <div className="hidden md:block mt-9">
          <h2 className="text-label mb-4">Evidence rings</h2>
          <ul className="space-y-3">{(Object.keys(labStatusLabels) as LabStatus[]).map(status => <li key={status} className="flex items-center gap-3 text-caption text-ink-muted"><EvidenceIcon status={status} /><span>{labStatusLabels[status]}</span></li>)}</ul>
          <p className="text-caption text-ink-muted mt-5">Rings come from each star's source, never typed by hand.</p>
        </div>
      </aside>
      <div id="lab-signal-sky" role="tabpanel" aria-label="Selected constellation sky" className="lab-main-sky">
        <GalaxySky signal={signal} isMobile={isMobile} />
        <div className="lab-sky-footer">
          <p className="hidden md:block text-caption text-ink-muted">Tab through stars · Enter opens · Esc returns</p>
          <div className="lab-workshop"><p className="text-caption text-ink-muted">In the workshop: {labWorkshopCount} documented public repositories</p>
            <Button asChild variant="ghost" className="min-h-11 text-cyan-glow"><Link to="/lab/workshop">Open the workshop</Link></Button>
            <Button variant="ghost" className="hidden md:inline-flex mt-3 text-cyan-glow" aria-expanded={isListVisible} aria-controls="lab-list" onClick={() => setIsListVisible(value => !value)}>List view</Button>
          </div>
        </div>
      </div>
    </div>
    {(isMobile || isListVisible) && <div className="lab-list-surface"><LabList constellation={isMobile && signal !== "all" ? signal : undefined} /></div>}
  </main>;
}
