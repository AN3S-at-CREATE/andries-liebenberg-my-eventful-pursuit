import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Share2, BarChart3 } from "lucide-react";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Marketing <span className="text-secondary glow-text-pink">Mas</span><span className="text-primary glow-text-cyan">tery</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Driving <span className="text-primary">comprehensive marketing strategies</span> across diverse industries with <span className="text-secondary">data-driven precision</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <MotionReveal delay={0.1}>
              <Card interactive glow="cyan" className="glass-cyan p-6 text-center border-t-2 border-t-primary">
                <div className="text-3xl font-bold text-primary mb-2">+30%</div>
                <p className="text-sm text-muted-foreground">Event Attendance</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.2}>
              <Card interactive glow="pink" className="glass-pink p-6 text-center border-t-2 border-t-secondary">
                <div className="text-3xl font-bold text-secondary mb-2">+45%</div>
                <p className="text-sm text-muted-foreground">Social Engagement</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.3}>
              <Card interactive glow="cyan" className="glass-cyan p-6 text-center border-t-2 border-t-primary">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Marketing Tools</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.4}>
              <Card interactive glow="pink" className="glass-pink p-6 text-center border-t-2 border-t-secondary">
                <div className="text-3xl font-bold text-secondary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </Card>
            </MotionReveal>
          </div>

          {/* Divider */}
          <div className="divider-cyan mb-8" />

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.2}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-l-4 border-l-primary">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Executive <span className="text-primary">Leadership</span></h3>
                <p className="text-muted-foreground">
                  Driving comprehensive marketing strategies across diverse industries with proven <span className="text-primary">executive-level leadership</span>.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card interactive glow="pink" className="glass-pink p-8 border-l-4 border-l-secondary">
                <BarChart3 className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven <span className="text-secondary">Results</span></h3>
                <p className="text-muted-foreground">
                  Increasing event attendance (<span className="text-primary">+30%</span>), boosting social media engagement (<span className="text-secondary">+45%</span>) through data-driven campaigns.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card interactive glow="cyan" className="glass-cyan p-8 border-l-4 border-l-primary">
                <Share2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Digital <span className="text-primary">Expertise</span></h3>
                <p className="text-muted-foreground">
                  Expertise in integrated digital campaigns (<span className="text-primary">SEO/SEM</span>, <span className="text-secondary">Content</span>, <span className="text-primary">Social Media</span>, <span className="text-secondary">Email</span>, <span className="text-primary">PPC</span>) and traditional marketing.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card interactive glow="pink" className="glass-pink p-8 border-l-4 border-l-secondary">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Brand <span className="text-secondary">Development</span></h3>
                <p className="text-muted-foreground">
                  Skilled in brand development, campaign management, market research, and public relations with <span className="text-primary font-semibold">100+ marketing software tools</span> proficiency.
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

export default Marketing;
