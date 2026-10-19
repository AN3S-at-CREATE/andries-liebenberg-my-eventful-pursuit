import type { LabStar } from "./lab";

/** Public documentation is pinned so room claims can be traced to reviewed evidence. */
export interface LabWorkshop extends LabStar {
  repository: string;
  readmeUrl: string;
  reviewedCommit: string;
  reviewedOn: string;
}

// Only documented public repositories with rooms belong here; no private inventory total.
export const labWorkshops: LabWorkshop[] = [
  {
    slug: "die-waarheid", name: "Die Waarheid", constellation: "ai", status: "built", visibility: "show",
    line: "A documented WhatsApp chat and audio analysis application with report exports.",
    what: "Die Waarheid is a repository-backed application for importing WhatsApp chat exports and audio, reviewing analysis in a dashboard, and exporting reports. Its public documentation describes a Python API, a Streamlit interface and a React frontend. This room documents the repository; it does not analyse your messages.",
    goal: "Bring chat timelines, audio analysis and report exports into one review workflow.",
    how: ["Import WhatsApp text exports or audio files into the application described in the README", "Use the Python API with the Streamlit or React interface", "Review chat timelines and analysis results in the dashboard", "Export reports for human review"],
    stack: ["Python", "FastAPI", "Streamlit", "React", "TypeScript", "Gemini API"],
    offers: ["Private AI Knowledge Assistant", "Integration & Custom Script"],
    links: [{ label: "Related simulated demo", href: "/lab/knowledge-assistant" }],
    source: "Public repository README: Usage guide, Architecture and Legal notice. Reviewed 19 October 2026; revision 0fe427e3a21d.",
    sourceUrl: "https://github.com/AN3S-CREATE/die-waarheid",
    note: "The repository describes optional external Gemini analysis. This is not a fully offline privacy guarantee. Psychological, stress and forensic interpretations are not validated here; findings require qualified human review. No upload or analysis runs in this room, and deployment is not verified.",
    repository: "AN3S-CREATE/die-waarheid",
    readmeUrl: "https://github.com/AN3S-CREATE/die-waarheid/blob/0fe427e3a21de37e4356e33fd168640257453507/README.md",
    reviewedCommit: "0fe427e3a21de37e4356e33fd168640257453507", reviewedOn: "2026-10-19",
  },
  {
    slug: "smart-lab-integration", name: "Smart Lab Integration Monitor", constellation: "build", status: "built", visibility: "show",
    line: "A standalone HTML mock of a lab integration monitor, not a connected monitoring service.",
    what: "Smart Lab Integration Monitor is a static interface showcase. The public README identifies it as a standalone HTML mock and explains how to serve it locally. It is a visual prototype, not evidence of live lab connections or operational monitoring.",
    goal: "Show a lab integration monitor interface before connecting it to real systems.",
    how: ["The interface lives in a standalone index.html file", "Serve the repository locally with Python's HTTP server", "Open the local page to view the static mock"],
    stack: ["HTML", "Python HTTP server for local preview"],
    offers: ["UI/UX Design & Clickable Prototype", "Integration & Custom Script"],
    links: [],
    source: "Public repository README: introduction, Local development and Notes. Reviewed 19 October 2026; revision 04586208217b.",
    sourceUrl: "https://github.com/AN3S-CREATE/Smart-Lab-Integration",
    note: "Built means the static interface code is in the public repository. No device connections, live data or deployed monitoring service are verified. Nothing connects to lab equipment from this room.",
    repository: "AN3S-CREATE/Smart-Lab-Integration",
    readmeUrl: "https://github.com/AN3S-CREATE/Smart-Lab-Integration/blob/04586208217b18c4844df44cb07fc4e4279520b4/README.md",
    reviewedCommit: "04586208217b18c4844df44cb07fc4e4279520b4", reviewedOn: "2026-10-19",
  },
];

