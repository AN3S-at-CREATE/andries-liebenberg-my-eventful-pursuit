import { Section } from "@/components/shared/section";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectorBadge } from "@/components/companies/SectorBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { facts, whatsappUrl } from "@/data/facts";
import { companies, getCompanyBySlug } from "@/data/companies";
import { ArrowLeft, ArrowRight, MessageCircle, Mail, MapPin, Calendar, CheckCircle } from "lucide-react";
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
