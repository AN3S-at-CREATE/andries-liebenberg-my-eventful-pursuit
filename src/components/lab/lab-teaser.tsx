import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LabTeaser() {
  return <article className="glass-secondary rounded-xl p-6 mt-6 flex flex-col gap-4">
    <p className="text-eyebrow text-pink-glow">New · AN3S Lab</p>
    <h3 className="text-xl font-semibold text-ink">Explore the build galaxy</h3>
    <p className="text-sm text-ink-muted">Every system, AI and venture I work on, mapped as stars. Open one to see how it works, and try the demos.</p>
    <Button asChild variant="glow-secondary" size="sm" className="w-full"><Link to="/lab">Enter the Lab</Link></Button>
  </article>;
}
