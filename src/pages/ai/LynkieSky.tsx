import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Cloud, BarChart3, Zap, ArrowRight } from "lucide-react";

const LynkieSky = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Coming April 2025</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary glow-text-pink">Lynkie</span> <span className="text-primary glow-text-cyan">Sky</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Innovative tool integrating <span className="text-primary">cloud capabilities</span> with <span className="text-secondary">advanced marketing analytics</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <MotionReveal delay={0.1}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 text-center group" interactive glow="pink">
                <Cloud className="h-10 w-10 text-secondary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Cloud Integration</h3>
                <p className="text-sm text-muted-foreground">Seamless connection to major cloud platforms for data processing.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-cyan border-l-4 border-l-primary p-8 text-center group" interactive glow="cyan">
                <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Marketing Analytics</h3>
                <p className="text-sm text-muted-foreground">Advanced analytics for campaign performance and ROI tracking.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink border-l-4 border-l-secondary p-8 text-center group" interactive glow="pink">
                <Zap className="h-10 w-10 text-secondary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">Instant insights from your marketing data streams.</p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <MotionReveal delay={0.4}>
            <Card className="glass border-l-4 border-l-secondary border-r-4 border-r-primary p-8 text-center max-w-2xl mx-auto" glow="both">
              <Sparkles className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Be the <span className="text-primary">First</span> to <span className="text-secondary">Know</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Join the waitlist to get <span className="text-primary">early access</span> when Lynkie Sky launches in <span className="text-secondary">April 2025</span>.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" variant="glow-pink">
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Join Waitlist
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glow">
                  <Link to="/ai" className="inline-flex items-center gap-2">
                    View All Tools
                  </Link>
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LynkieSky;
