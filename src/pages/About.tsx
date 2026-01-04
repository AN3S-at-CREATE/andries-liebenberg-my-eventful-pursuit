import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Briefcase, GraduationCap, Heart, Building2, Calendar } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">About Andries</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Marketing Innovator | Event Architect |{" "}
                <span className="text-primary glow-text-cyan">AI Pioneer</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Transforming brands through strategic marketing, world-class events, and cutting-edge AI innovation. 20+ years driving growth across industries.
              </p>
            </div>
          </MotionReveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <MotionReveal delay={0.1}>
              <Card className="glass-cyan p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">51</div>
                <p className="text-sm text-muted-foreground">Brands Served</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.2}>
              <Card className="glass-pink p-6 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.3}>
              <Card className="glass-cyan p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">2,246+</div>
                <p className="text-sm text-muted-foreground">Events Delivered</p>
              </Card>
            </MotionReveal>
            <MotionReveal delay={0.4}>
              <Card className="glass-pink p-6 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">R423M+</div>
                <p className="text-sm text-muted-foreground">Budget Managed</p>
              </Card>
            </MotionReveal>
          </div>

          {/* About Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <MotionReveal delay={0.2}>
              <Card className="glass p-8">
                <Briefcase className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Executive Experience</h3>
                <p className="text-muted-foreground">
                  Bringing 20+ years of strategic leadership as a renowned Head of Marketing & Events Executive (CMO/Manager at Maono Moja Events & 360 Vision Events Group).
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card className="glass p-8">
                <Award className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Deep Expertise</h3>
                <p className="text-muted-foreground">
                  Deep expertise blending technical production (Diploma: Entertainment Technology TUT) with strategic Marketing, Sales, Development (Code), and Business Growth.
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card className="glass p-8">
                <Building2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Proven Ability</h3>
                <p className="text-muted-foreground">
                  Proven ability to manage large-scale projects (budgets &gt;R423M, 2,246+ events), lead diverse teams, and drive significant growth (e.g., 28% market share increase for Maono Moja).
                </p>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card className="glass p-8">
                <GraduationCap className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Passionate Mentor</h3>
                <p className="text-muted-foreground">
                  Passionate mentor (TUT/AFDA) and innovator committed to sustainable practices and cutting-edge technology integration (AI, Cloud, VR/AR).
                </p>
              </Card>
            </MotionReveal>
          </div>

          {/* Heritage Section */}
          <MotionReveal delay={0.6}>
            <Card className="glass-pink mt-12 p-8 text-center">
              <Heart className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">It runs in my veins.</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Third-generation event professional with foundational experience from a young age.
              </p>
            </Card>
          </MotionReveal>

          {/* CTA */}
          <MotionReveal delay={0.7}>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/expertise" className="inline-flex items-center gap-2">
                  Explore My Expertise
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

export default About;
