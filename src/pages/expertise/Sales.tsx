import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Target, TrendingUp, Users } from "lucide-react";

const Sales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Sales <span className="text-primary glow-text-cyan">Excel</span><span className="text-secondary glow-text-pink">lence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Consistently exceeded <span className="text-primary">sales targets</span> with <span className="text-secondary">strategic methodologies</span> and client-focused approach.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.1}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Revenue <span className="text-primary">Generation</span></h3>
                <p className="text-muted-foreground">
                  Consistently exceeded sales targets, generating average annual revenues of <span className="text-primary font-semibold">R7.3M - R8.3M</span> over 11 years.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <Target className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Sales <span className="text-secondary">Methodologies</span></h3>
                <p className="text-muted-foreground">
                  Developed and implemented <span className="text-secondary">scalable sales methodologies</span> and strategic pricing models for consistent growth.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="pink" className="glass-pink p-8 border-t-2 border-t-secondary">
                <TrendingUp className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven <span className="text-secondary">Success</span></h3>
                <p className="text-muted-foreground">
                  Proven success in increasing sales revenue (<span className="text-primary">+20%</span>) and market share (<span className="text-secondary">+15%</span>) through strategic initiatives.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-t-2 border-t-primary">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">CRM <span className="text-primary">Expertise</span></h3>
                <p className="text-muted-foreground">
                  Expertise in CRM systems (<span className="text-primary">Salesforce</span>, <span className="text-secondary">HubSpot</span>) to enhance team productivity (<span className="text-primary">+30%</span>) and customer acquisition (<span className="text-secondary">+35%</span>).
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-pink mt-12" />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Sales;
