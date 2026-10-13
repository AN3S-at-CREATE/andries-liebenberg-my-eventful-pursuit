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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Calendar, BarChart3, Clock, ArrowRight } from "lucide-react";

const EventPulse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="EventPulse AI | AN3S"
        description="Proprietary platform streamlining event planning with intelligent scheduling and predictive analytics."
        path="/ai/eventpulse"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "AI Tools & Projects", path: "/ai" },
          { name: "EventPulse AI", path: "/ai/eventpulse" },
        ])}
      />
      <Navbar />
      <main>
      
      <Section className="relative   overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-primary" className="mb-4">AI Tool</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                EventPulse AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                My proprietary platform streamlining event planning with intelligent scheduling and predictive analytics.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.2}>
              <Card className="h-full flex flex-col glass-primary   p-8 text-center group" interactive glow="primary">
                <Calendar className="h-10 w-10 text-primary mx-auto mb-4  duration-300 " />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Intelligent Scheduling</h3>
                <p className="text-sm text-muted-foreground">AI-powered calendar optimization for seamless event coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card className="h-full flex flex-col glass-secondary   p-8 text-center group" interactive glow="secondary">
                <BarChart3 className="h-10 w-10 text-secondary mx-auto mb-4  duration-300 " />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground">Forecast attendance, budget needs, and resource allocation.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.4}>
              <Card className="h-full flex flex-col glass-primary   p-8 text-center group" interactive glow="primary">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4  duration-300 " />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Real-time Insights</h3>
                <p className="text-sm text-muted-foreground">Live dashboards for event performance monitoring.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          <MotionReveal className="h-full" delay={0.5}>
            <div className="text-center flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="glow">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow-secondary">
                <Link to="/ai" className="inline-flex items-center gap-2">
                  View All Tools
                </Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventPulse;
