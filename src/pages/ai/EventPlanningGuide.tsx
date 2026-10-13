import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { breadcrumb } from "@/lib/breadcrumb";
import { whatsappLink } from "@/data/facts";

const PATH = "/ai/event-planning-guide";
const TITLE = "AI tools for event planning: a practical guide | AN3S";
const DESCRIPTION =
  "A practical guide to using AI tools across event planning, from concept and budgeting to guest communication, on-the-day operations and post-event reporting.";

interface GuideSection {
  id: string;
  heading: string;
  intro: string;
  uses: string[];
  watch: string;
}

const sections: GuideSection[] = [
  {
    id: "concept",
    heading: "Concept and creative direction",
    intro: "Use AI as a brainstorming partner before the first supplier call.",
    uses: [
      "Generate theme options from a short brief, audience and venue type.",
      "Draft mood-board directions and run-of-show outlines to react to.",
      "Turn rough notes into a clear one-page event brief for the team.",
    ],
    watch: "Treat outputs as starting points. The final concept should reflect the client, not the model.",
  },
  {
    id: "budget",
    heading: "Budgeting and supplier planning",
    intro: "Spreadsheet assistants and chat tools speed up the admin around money.",
    uses: [
      "Build a budget template with categories, contingency and payment dates.",
      "Compare supplier quotes side by side and flag what each one leaves out.",
      "Draft clear requests for quotation so suppliers price the same scope.",
    ],
    watch: "Never let AI invent prices. Every figure should come from a real quote.",
  },
  {
    id: "timeline",
    heading: "Timelines and task management",
    intro: "Project tools with built-in AI keep long lead times under control.",
    uses: [
      "Work backwards from the event date to a task list with owners.",
      "Summarise meeting notes into actions and deadlines automatically.",
      "Set reminders for supplier confirmations and final numbers.",
    ],
    watch: "Someone still owns the plan. Automation reminds; it does not decide.",
  },
  {
    id: "guests",
    heading: "Guest communication and registration",
    intro: "This is where automation saves the most repetitive work.",
    uses: [
      "Draft invitations, reminders and joining instructions in a consistent voice.",
      "Answer common guest questions through a chat assistant or WhatsApp flow.",
      "Sync registrations, dietary needs and access requirements into one list.",
    ],
    watch: "Collect only the personal information you need and tell guests why, in line with POPIA.",
  },
  {
    id: "marketing",
    heading: "Promotion and content",
    intro: "AI helps small teams keep up with the content an event needs.",
    uses: [
      "Draft social posts, email sequences and speaker introductions.",
      "Resize and adapt visuals for different channels.",
      "Write accessible alt text and captions for event imagery.",
    ],
    watch: "Check every claim, name and date by hand before anything is published.",
  },
  {
    id: "on-the-day",
    heading: "On-the-day operations",
    intro: "Keep the tools simple when the doors open.",
    uses: [
      "Share a live run sheet the whole crew can see on their phones.",
      "Use check-in tools to track arrivals against registrations.",
      "Log issues quickly by voice note and have them summarised for the debrief.",
    ],
    watch: "Have a paper backup. Venues lose signal at the worst moments.",
  },
  {
    id: "after",
    heading: "Post-event reporting",
    intro: "Turn feedback into something the client can act on.",
    uses: [
      "Summarise survey responses into themes and suggestions.",
      "Draft the wrap report from your notes, photos and attendance data.",
      "Build a lessons-learned list to reuse for the next event.",
    ],
    watch: "Report what actually happened. Do not let a summary smooth over real problems.",
  },
];

const checklist = [
  "Start with one repetitive task, not the whole event.",
  "Keep a person responsible for every decision and every figure.",
  "Protect guest data and only share it with tools you trust.",
  "Review every AI draft before it reaches a client, supplier or guest.",
];

export default function EventPlanningGuide() {
  const jsonLd = [
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "AI", path: "/ai" },
      { name: "AI tools for event planning", path: PATH },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "AI tools for event planning: a practical guide",
      description: DESCRIPTION,
      inLanguage: "en-ZA",
      mainEntityOfPage: `https://an3s.info${PATH}`,
      author: { "@type": "Person", name: "Andries Liebenberg", url: "https://an3s.info/about" },
      publisher: { "@type": "Organization", name: "AN3S", url: "https://an3s.info" },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} ogType="article" jsonLd={jsonLd} />
      <Navbar />
      <main>
        <article className="container max-w-3xl py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/ai" className="hover:text-foreground">AI</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-foreground">Event planning guide</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Guide</p>
          <h1 className="text-4xl font-bold uppercase tracking-wider text-foreground mb-5">
            AI tools for event planning
          </h1>
          <p className="text-body text-muted-foreground mb-10">
            A practical walk through each stage of an event, showing where AI tools save time, where they need a
            careful human eye, and how to start without overhauling the way your team works.
          </p>

          <nav aria-label="Guide contents" className="glass rounded-lg border border-pink/35 p-6 mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">In this guide</h2>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-foreground">{s.heading}</a>
                </li>
              ))}
              <li><a href="#getting-started" className="hover:text-foreground">Getting started</a></li>
            </ol>
          </nav>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-3">{s.heading}</h2>
              <p className="text-muted-foreground mb-4">{s.intro}</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                {s.uses.map((u) => <li key={u}>{u}</li>)}
              </ul>
              <p className="border-l-2 border-cyan/60 pl-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Watch for: </span>{s.watch}
              </p>
            </section>
          ))}

          <section id="getting-started" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-3">Getting started</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {checklist.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </section>

          <section className="glass rounded-lg border border-cyan/35 p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Want help setting this up for your events?</h2>
            <p className="text-muted-foreground mb-5">
              Tell me about your next event and I will suggest where automation fits.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={whatsappLink("Hi Andries, I read the AI tools for event planning guide.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services">See services</Link>
              </Button>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
