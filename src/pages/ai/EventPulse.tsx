import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
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
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">AI Tool</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-primary glow-text-cyan">Event</span><span className="text-secondary glow-text-pink">Pulse</span> AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                My proprietary platform streamlining <span className="text-primary">event planning</span> with <span className="text-secondary">intelligent scheduling</span> and predictive analytics.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          {/* Key Metric */}
          <MotionReveal delay={0.1}>
            <Card className="glass-cyan border-t-2 border-t-primary p-8 text-center max-w-md mx-auto mb-12" glow="cyan">
              <div className="text-5xl font-bold text-primary glow-text-cyan mb-2">36%</div>
              <p className="text-lg text-muted-foreground">Efficiency Improvement</p>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <MotionReveal delay={0.2}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 text-center group" interactive glow="cyan">
                <Calendar className="h-10 w-10 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Intelligent Scheduling</h3>
                <p className="text-sm text-muted-foreground">AI-powered calendar optimization for seamless event coordination.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 text-center group" interactive glow="pink">
                <BarChart3 className="h-10 w-10 text-secondary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground">Forecast attendance, budget needs, and resource allocation.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 text-center group" interactive glow="cyan">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Real-time Insights</h3>
                <p className="text-sm text-muted-foreground">Live dashboards for event performance monitoring.</p>
              </Card>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.5}>
            <div className="text-center flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="glow">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow-pink">
                <Link to="/ai" className="inline-flex items-center gap-2">
                  View All Tools
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
