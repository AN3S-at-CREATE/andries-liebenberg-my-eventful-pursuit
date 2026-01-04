import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import { getMetricsByCompanyId } from "@/data/companyMetrics";
import { CompanyCard } from "./CompanyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CompaniesPreview = () => {
  const topCompanies = companies.slice(0, 4);

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Companies I Built
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            10 companies. Real metrics. Proven execution across events, consulting, retail, and industrial sectors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {topCompanies.map((company) => {
            const metrics = getMetricsByCompanyId(company.id);
            if (!metrics) return null;
            return (
              <CompanyCard key={company.id} company={company} metrics={metrics} />
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 hover:text-primary">
            <Link to="/companies" className="inline-flex items-center gap-2">
              See All Companies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
