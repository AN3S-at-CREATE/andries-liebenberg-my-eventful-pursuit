import { Section } from "@/components/shared/section";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectorBadge } from "@/components/companies/SectorBadge";
import { Button } from "@/components/ui/button";
import { facts, whatsappUrl, lynkieSkyLaunch, proofOfWork } from "@/data/facts";
import { companies, getCompanyBySlug } from "@/data/companies";
import { ArrowLeft, ArrowRight, MessageCircle, Mail, MapPin } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const company = getCompanyBySlug(slug || "");

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
            Company not found
          </h1>
          <Button asChild>
            <Link to="/companies">Back to ventures</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentIndex = companies.findIndex((c) => c.slug === slug);
  const prevCompany = currentIndex > 0 ? companies[currentIndex - 1] : null;
  const nextCompany = currentIndex < companies.length - 1 ? companies[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${company.name} | AN3S Ventures`}
        description={company.role ? `${company.name}: ${company.sector}. ${company.role}.` : company.name}
        path={`/companies/${company.slug}`}
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Ventures", path: "/companies" },
          { name: company.name, path: `/companies/${company.slug}` },
        ])}
      />
      <Navbar />


      <main>
      {/* Header */}
      <Section className="relative   border-b border-border/50 overflow-hidden">
        <div>
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ventures
          </Link>

          <div className="space-y-4">
            {company.role && <SectorBadge sector={company.sector} />}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {company.name}
            </h1>
            {company.role && <p className="text-lg text-muted-foreground">{company.role}</p>}
            
            {company.role && company.location && <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
            </div>}
          </div>
        </div>
      </Section>

      {company.role && <Section title="Andries's role">
        <p className="text-body text-muted-foreground max-w-3xl mb-6">
          {company.slug === "360-vision-events-group" && "Andries's role at 360 Vision Events (Group) is Head of Marketing and Events. The Work gallery shows event production by Andries at 360 Vision Events; AN3S's own event offers focus on design and technical planning, while full productions are delivered by 360 Vision Events."}
          {company.slug === "maono-moja-events" && "Andries is Managing Director (Maono Moja Events Group). This is a managing-director role, distinct from his Head of Marketing and Events role at 360 Vision Events and his Project Manager role at Prisma Entertainment."}
          {company.slug === "rubies-and-pearls" && "Andries's role at Rubies and Pearls is Head of Business Development. This venture entry records that business-development responsibility, separate from his event-production and AI engineering roles elsewhere in the portfolio."}
          {company.slug === "prisma-entertainment" && "Andries is Project Manager at Prisma Entertainment. This project-management role is distinct from his Managing Director role at Maono Moja Events Group and his marketing-and-events role at 360 Vision Events."}
          {company.slug === "eventpulse-ai" && "EventPulse AI is an AI/Software venture where Andries is Co-Founder & CTO. It is a separate venture from Lynkie Sky AI, where his confirmed role is Chief Innovation Officer, and from the Veralogix Group engineering work documented on Work."}
          {company.slug === "lynkie-sky-ai" && `Lynkie Sky AI is an AI/Software venture. ${lynkieSkyLaunch.value}. Andries is Co-Founder & Chief Innovation Officer; the Lynkie Sky page includes supplied logo, character and introduction imagery. This role is distinct from his Co-Founder & CTO role at EventPulse AI.`}
          {company.slug === "veralogix-group" && "Andries's role at Veralogix Group is Group Lead Engineer, AI & Data Platforms. The source-backed work record covers self-hosted data and private AI chat, document-search AI and an offline-first collaboration platform. These are Veralogix work examples, not results attributed to other ventures."}
        </p>
        {company.slug === "veralogix-group" && <ul className="space-y-4 mb-6">{proofOfWork.items.map((item) => <li key={item.value} className="text-body text-muted-foreground">{item.value} <span className="text-caption text-secondary">({item.source})</span></li>)}</ul>}
        <Link className="text-secondary underline underline-offset-4" to={company.slug === "lynkie-sky-ai" ? "/ai/lynkie-sky" : "/work"}>{company.slug === "lynkie-sky-ai" ? "Explore Lynkie Sky imagery" : "Explore work and role evidence"}</Link>
      </Section>}

      {/* CTA Strip */}
      <Section className="  border-t border-border/50">
        <div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/50">
              <a
                href={`mailto:${facts.email.value}`}
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Navigation */}
      <Section className="  border-t border-border/50 bg-muted/20">
        <div>
          <div className="flex justify-between items-center">
            {prevCompany ? (
              <Link
                to={`/companies/${prevCompany.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{prevCompany.name}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            
            <Link
              to="/companies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              All ventures
            </Link>

            {nextCompany ? (
              <Link
                to={`/companies/${nextCompany.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="hidden sm:inline">{nextCompany.name}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </Section>

      </main>
      <Footer />
    </div>
  );
};

export default CompanyDetail;
