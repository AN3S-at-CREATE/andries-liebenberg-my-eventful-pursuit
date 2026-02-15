import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetricCard } from "@/components/companies/MetricCard";
import { SectorBadge } from "@/components/companies/SectorBadge";
import { TruthBadge } from "@/components/companies/TruthBadge";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { companies, getCompanyBySlug } from "@/data/companies";
import { getMetricsByCompanyId } from "@/data/companyMetrics";
import { formatZARRange, formatPercentage, formatNumber } from "@/lib/formatters";
import { ArrowLeft, ArrowRight, MessageCircle, Mail, MapPin, Calendar, CheckCircle } from "lucide-react";

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const company = getCompanyBySlug(slug || "");
  const metrics = company ? getMetricsByCompanyId(company.id) : null;

  if (!company || !metrics) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
            Company not found
          </h1>
          <Button asChild>
            <Link to="/companies">Back to Companies</Link>
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
      <Navbar />

      {/* Header */}
      <section className="relative py-12 px-4 border-b border-border/50 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-4xl mx-auto relative z-10">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Link>

          <div className="space-y-4">
            <SectorBadge sector={company.sector} />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {company.name}
            </h1>
            <p className="text-lg text-muted-foreground">{company.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {company.period}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">
            Performance Metrics
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="md:col-span-2 lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                <CardHeader className="pb-2">
                  <p className="text-sm text-muted-foreground">Revenue Range</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-2xl font-heading font-bold text-foreground mb-2">
                    {formatZARRange(metrics.revenue.from, metrics.revenue.to)}
                  </p>
                  <TruthBadge basis={metrics.revenue.basis} />
                </CardContent>
              </Card>
            </div>
            <MetricCard
              label="Revenue Growth"
              value={formatPercentage(metrics.revenueGrowthPct)}
            />
            <MetricCard
              label="Customer Satisfaction"
              value={formatPercentage(metrics.customerSatisfactionPct)}
            />
            <MetricCard
              label="Clients Acquired"
              value={formatNumber(metrics.clientsAcquired)}
            />
            <MetricCard
              label="Projects Completed"
              value={formatNumber(metrics.projectsCompleted)}
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">
            Key Highlights
          </h2>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {company.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 px-4 border-t border-border/50">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a
                href="https://wa.me/27729749703"
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
                href="mailto:book@an3s.info"
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 px-4 border-t border-border/50 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
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
              All Companies
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
      </section>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
