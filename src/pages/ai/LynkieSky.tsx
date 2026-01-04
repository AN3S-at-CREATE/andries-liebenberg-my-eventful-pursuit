import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Coming April 2025</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-secondary glow-text-pink">Lynkie</span> Sky
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Innovative tool integrating cloud capabilities with advanced marketing analytics.
              </p>
            </div>
          </MotionReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <MotionReveal delay={0.1}>
              <Card className="glass-pink p-8 text-center">
                <Cloud className="h-10 w-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Cloud Integration</h3>
                <p className="text-sm text-muted-foreground">Seamless connection to major cloud platforms for data processing.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card className="glass-cyan p-8 text-center">
                <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Marketing Analytics</h3>
                <p className="text-sm text-muted-foreground">Advanced analytics for campaign performance and ROI tracking.</p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass-pink p-8 text-center">
                <Zap className="h-10 w-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">Instant insights from your marketing data streams.</p>
              </Card>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.4}>
            <Card className="glass p-8 text-center max-w-2xl mx-auto">
              <Sparkles className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Be the First to Know</h3>
              <p className="text-muted-foreground mb-6">
                Join the waitlist to get early access when Lynkie Sky launches in April 2025.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Join Waitlist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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
