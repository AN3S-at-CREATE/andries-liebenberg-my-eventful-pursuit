import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { serviceOffers, whatsappLink } from "@/data/facts";
import { CardGrid } from "@/components/shared/card-grid";
import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Target, TrendingUp, Users } from "lucide-react";

const Sales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Sales Leadership | AN3S"
        description="CRM and sales pipeline setup, plus part-time sales and marketing advisory. These offers focus on sales organisation rather than campaign design or a custom software build."
        path="/expertise/sales"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Sales", path: "/expertise/sales" },
        ])}
      />
      <Navbar />
      <main>
      
      <Section className="relative   overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Sales leadership
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">CRM and sales pipeline setup, plus part-time sales and marketing advisory. These offers focus on sales organisation rather than campaign design or a custom software build.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">CRM and sales pipeline</h3>
                <p className="text-muted-foreground">CRM & Sales Pipeline Setup is available in HubSpot or a spreadsheet.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <Target className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Part-time advisory</h3>
                <p className="text-muted-foreground">Sales & Marketing Advisory is scoped by quote rather than sold as a fixed campaign package.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card interactive glow="secondary" className="h-full flex flex-col glass-secondary p-8  ">
                <TrendingUp className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Choose the right scope</h3>
                <p className="text-muted-foreground">Use the pipeline setup offer for CRM and pipeline organisation. Use advisory when the request is for part-time sales and marketing input.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card interactive glow="primary" className="h-full flex flex-col glass-primary p-8  ">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Custom systems are separate</h3>
                <p className="text-muted-foreground">A custom CRM, business system or portal belongs under Web & App Development, rather than the HubSpot or spreadsheet setup offer.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </Section>


      <Section title="Offers and next steps">
        <ul className="space-y-6">
          {serviceOffers.filter((offer) => offer.discipline === "Sales Leadership").map((offer) => (
            <li key={offer.title} className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
              <p className="text-body text-muted-foreground mb-3">{offer.description}</p>
              <a className="text-secondary underline underline-offset-4" href={whatsappLink(`Hi Andries, I'm interested in ${offer.title}.`)} target="_blank" rel="noopener noreferrer">Ask about {offer.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild variant="outline"><Link to="/services">View prices and quote options</Link></Button>
          <Link className="text-secondary underline underline-offset-4 self-center" to="/expertise/development">Explore custom business systems</Link>
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Sales;
