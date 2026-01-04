import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Share2, BarChart3 } from "lucide-react";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Marketing <span className="text-secondary glow-text-pink">Mastery</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Driving comprehensive marketing strategies across diverse industries with data-driven precision.
              </p>
            </div>
          </MotionReveal>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">+30%</div>
                <p className="text-sm text-muted-foreground">Event Attendance</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">+45%</div>
                <p className="text-sm text-muted-foreground">Social Engagement</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.3}>
              <Card className="glass-cyan p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Marketing Tools</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.4}>
              <Card className="glass-pink p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </Card>
            </MotionReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.2}>
              <Card className="glass p-8">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Executive Leadership</h3>
                <p className="text-muted-foreground">
                  Driving comprehensive marketing strategies across diverse industries with proven executive-level leadership.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass p-8">
                <BarChart3 className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven Results</h3>
                <p className="text-muted-foreground">
                  Increasing event attendance (+30%), boosting social media engagement (+45%) through data-driven campaigns.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass p-8">
                <Share2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Digital Expertise</h3>
                <p className="text-muted-foreground">
                  Expertise in integrated digital campaigns (SEO/SEM, Content, Social Media, Email, PPC) and traditional marketing.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card className="glass p-8">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Brand Development</h3>
                <p className="text-muted-foreground">
                  Skilled in brand development, campaign management, market research, and public relations with 100+ marketing software tools proficiency.
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

export default Marketing;
