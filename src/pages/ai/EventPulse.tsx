import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Calendar, BarChart3, Clock, ArrowRight } from "lucide-react";

const EventPulse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">AI Tool</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">EventPulse</span> AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                My proprietary platform streamlining event planning with intelligent scheduling and predictive analytics.
              </p>
            </div>
          </MotionReveal>

          {/* Key Metric */}
          <MotionReveal delay={0.1}>
            <Card className="glass-cyan p-8 text-center max-w-md mx-auto mb-12">
              <div className="text-5xl font-bold text-primary mb-2">36%</div>
              <p className="text-lg text-muted-foreground">Efficiency Improvement</p>
            </Card>
          </MotionReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <MotionReveal delay={0.2}>
              <Card className="glass p-8 text-center">
                <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Intelligent Scheduling</h3>
                <p className="text-sm text-muted-foreground">AI-powered calendar optimization for seamless event coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass p-8 text-center">
                <BarChart3 className="h-10 w-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground">Forecast attendance, budget needs, and resource allocation.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass p-8 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Real-time Insights</h3>
                <p className="text-sm text-muted-foreground">Live dashboards for event performance monitoring.</p>
              </Card>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.5}>
            <div className="text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EventPulse;
