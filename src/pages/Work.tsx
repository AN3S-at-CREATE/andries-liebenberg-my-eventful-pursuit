import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/seo/Seo";
import { Section } from "@/components/shared/section";
import { WorkSection } from "@/components/work/work-section";
import { breadcrumb } from "@/lib/breadcrumb";

export default function Work() {
  return <div className="min-h-screen bg-background"><Seo title="Work | AN3S" description="Event production, AI projects and source-backed work by Andries Liebenberg." path="/work" jsonLd={breadcrumb([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} /><Navbar /><main>
    <Section eyebrow="AN3S"><h1 className="text-4xl font-bold text-foreground">Work</h1></Section>
    <WorkSection includeProof />
  </main><Footer /></div>;
}