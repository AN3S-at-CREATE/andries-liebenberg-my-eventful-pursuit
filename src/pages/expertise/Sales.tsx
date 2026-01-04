import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Target, TrendingUp, Users } from "lucide-react";

const Sales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Sales <span className="text-primary glow-text-cyan">Excellence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Consistently exceeded sales targets with strategic methodologies and client-focused approach.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-8">
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Revenue Generation</h3>
                <p className="text-muted-foreground">
                  Consistently exceeded sales targets, generating average annual revenues of R7.3M - R8.3M over 11 years.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-8">
                <Target className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sales Methodologies</h3>
                <p className="text-muted-foreground">
                  Developed and implemented scalable sales methodologies and strategic pricing models for consistent growth.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink p-8">
                <TrendingUp className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven Success</h3>
                <p className="text-muted-foreground">
                  Proven success in increasing sales revenue (+20%) and market share (+15%) through strategic initiatives.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-cyan p-8">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">CRM Expertise</h3>
                <p className="text-muted-foreground">
                  Expertise in CRM systems (Salesforce, HubSpot) to enhance team productivity (+30%) and customer acquisition (+35%).
                </p>
              </Card>
            </MotionReveal>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Sales;
