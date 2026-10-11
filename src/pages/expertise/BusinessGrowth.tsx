import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Target, Globe, DollarSign, Cog } from "lucide-react";

const BusinessGrowth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Business Growth Strategies | AN3S"
        description="Driving organizational scaling and market penetration across Africa and internationally through strategic planning and operational efficiency."
        path="/expertise/business-growth"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Business Growth", path: "/expertise/business-growth" },
        ])}
      />
      <Navbar />
      <main>
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Business Growth Strategies
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Driving significant organizational scaling and market penetration across Africa and internationally.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Strategic Planning</h3>
                <p className="text-muted-foreground">
                  Driving significant organizational scaling and market penetration through strategic initiatives.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <Globe className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Geographic Expansion</h3>
                <p className="text-muted-foreground">
                  Africa & International market expansion with service line diversification for broader reach.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <DollarSign className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Financial Planning</h3>
                <p className="text-muted-foreground">Strategic planning, risk assessment and operational development shaped around your business.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <Cog className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Operational Efficiency</h3>
                <p className="text-muted-foreground">Strategic planning, risk assessment and operational development shaped around your business.</p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-secondary mt-12" />
        </div>
      </section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BusinessGrowth;
