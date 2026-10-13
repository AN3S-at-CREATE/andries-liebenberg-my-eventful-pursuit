import { Link } from "react-router-dom";
import { companies } from "@/data/companies";
import { CompanyCard } from "./CompanyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { Section } from "@/components/shared/section";
import { CardGrid } from "@/components/shared/card-grid";

export const CompaniesPreview = () => {
  const topCompanies = companies.slice(0, 4);

  return (
    <Section>
        <MotionReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ventures
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A venture portfolio across events, consulting, retail and industrial services.
            </p>
          </div>
        </MotionReveal>

        <CardGrid className="mb-10">
          {topCompanies.map((company) => {
            return (
              <MotionItem key={company.id} className="h-full">
                <CompanyCard company={company} />
              </MotionItem>
            );
          })}
        </CardGrid>

        <MotionReveal delay={0.4}>
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="border-pink/50 hover:bg-primary/10 hover:text-primary border-glow-primary-hover">
              <Link to="/companies" className="inline-flex items-center gap-2">
                See all ventures
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </MotionReveal>
    </Section>
  );
};
