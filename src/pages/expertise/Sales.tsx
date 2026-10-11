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
        title="Sales Excellence | AN3S"
        description="Consistently exceeding sales targets with strategic methodologies, proven revenue growth, and CRM expertise."
        path="/expertise/sales"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
          { name: "Sales", path: "/expertise/sales" },
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
                Sales Excellence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Consistently exceeded sales targets with strategic methodologies and client-focused approach.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Revenue Generation</h3>
                <p className="text-muted-foreground">Sales planning, CRM workflows and customer relationship development.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <Target className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sales Methodologies</h3>
                <p className="text-muted-foreground">
                  Developed and implemented scalable sales methodologies and strategic pricing models for consistent growth.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="secondary" className="glass-secondary p-8 border-t-2 border-t-cyan">
                <TrendingUp className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven Success</h3>
                <p className="text-muted-foreground">Sales planning, CRM workflows and customer relationship development.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="primary" className="glass-primary p-8 border-t-2 border-t-pink">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">CRM Expertise</h3>
                <p className="text-muted-foreground">Sales planning, CRM workflows and customer relationship development.</p>
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

export default Sales;
