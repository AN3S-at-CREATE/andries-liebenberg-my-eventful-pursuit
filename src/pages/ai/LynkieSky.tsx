import { CardGrid } from "@/components/shared/card-grid";
import { Section } from "@/components/shared/section";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { lynkieSkyLaunch } from "@/data/facts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Cloud, BarChart3, Zap, ArrowRight } from "lucide-react";

const LynkieSky = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Lynkie Sky | AN3S"
        description="Innovative tool integrating cloud capabilities with advanced marketing analytics."
        path="/ai/lynkie-sky"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "AI Tools & Projects", path: "/ai" },
          { name: "Lynkie Sky", path: "/ai/lynkie-sky" },
        ])}
      />
      <Navbar />
      <main>
      
      <Section className="relative   overflow-hidden">
        <div>
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">{lynkieSkyLaunch.value}</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Lynkie Sky
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Innovative tool integrating cloud capabilities with advanced marketing analytics.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          <CardGrid>
            <MotionReveal className="h-full" delay={0.1}>
              <Card className="h-full flex flex-col glass-secondary   p-8 text-center group" interactive glow="secondary">
                <Cloud className="h-10 w-10 text-secondary mx-auto mb-4  duration-300 " />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Cloud Integration</h3>
                <p className="text-sm text-muted-foreground">Seamless connection to major cloud platforms for data processing.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.2}>
              <Card className="h-full flex flex-col glass-primary   p-8 text-center group" interactive glow="primary">
                <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4  duration-300 " />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Marketing Analytics</h3>
                <p className="text-sm text-muted-foreground">Advanced analytics for campaign performance and ROI tracking.</p>
              </Card>
            </MotionReveal>

            <MotionReveal className="h-full" delay={0.3}>
              <Card className="h-full flex flex-col glass-secondary   p-8 text-center group" interactive glow="secondary">
                <Zap className="h-10 w-10 text-secondary mx-auto mb-4  duration-300 " />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">Instant insights from your marketing data streams.</p>
              </Card>
            </MotionReveal>
          </CardGrid>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          <MotionReveal className="h-full" delay={0.4}>
            <Card className="h-full flex flex-col glass     p-8 text-center max-w-2xl mx-auto" glow="both">
              <Sparkles className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {lynkieSkyLaunch.value}
              </h3>
              <p className="text-muted-foreground mb-6">Discuss the project and its current availability with Andries.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" variant="glow-secondary">
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Discuss Lynkie Sky
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
      </Section>

      <Section eyebrow="LYNKIE SKY" title="Meet Lynkie Sky">
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          <MotionReveal className="h-full">
            <Card variant="glass" className="h-full p-6 flex items-center justify-center">
              <img src="/media/lynkie-sky/lynkie-character-01.webp" alt="Lynkie Sky character" width="960" height="960" className="w-full h-auto object-contain" loading="lazy" />
            </Card>
          </MotionReveal>
          <MotionReveal className="h-full">
            <Card variant="glass" className="h-full p-6 flex items-center justify-center">
              <img src="/media/lynkie-sky/lynkie-meet-slide.webp" alt="Meet Lynkie-Sky introduction slide" width="960" height="540" className="w-full h-auto object-contain" loading="lazy" />
            </Card>
          </MotionReveal>
        </div>
      </Section>

      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LynkieSky;
