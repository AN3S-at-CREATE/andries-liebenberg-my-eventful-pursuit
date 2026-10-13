import { facts, careerPeriods, ventureFacts, proofOfWork } from "@/data/facts";
import { Panel } from "@/components/brand/brand-parts";
import { AwardWall } from "@/components/brand/award-wall";
import { Navbar } from "@/components/layout/Navbar";
import { Seo } from "@/components/seo/Seo";
import { breadcrumb } from "@/lib/breadcrumb";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Briefcase, GraduationCap, Heart, Building2, Calendar, Users, Lightbulb, Target, TrendingUp, Star, CheckCircle, Quote } from "lucide-react";

const About = () => {
  const timeline = [
    { year: careerPeriods[0].value, title: "Early Beginnings", description: "Started at Royal Diner, managing entertainment and events before higher education." },
    { year: careerPeriods[1].value, title: "Technical Foundation", description: "Technical Manager at SLS Productions, then Operations Manager at Coventry Productions." },
    { year: careerPeriods[2].value, title: "ShowGroup Era", description: "Head of Lighting Department; lighting design for televised shows." },
    { year: null, title: "360 Vision Events", description: ventureFacts["360-vision-events-group"].role },
    { year: null, title: "Maono Moja Events", description: ventureFacts["maono-moja-events"].role },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="About Andries Liebenberg | AN3S"
        description="Meet Andries Liebenberg, the person behind AN3S: strategy, design, development and automation for South African businesses."
        path="/about"
        ogType="profile"
        jsonLd={breadcrumb([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Navbar />
      <main>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-secondary" className="mb-4">Architect of Experiences, Driver of Growth</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                {facts.person.value}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6">My professional life explores the intersection of creativity, strategy and execution.</p>
              <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto">I blend an understanding of event experiences with business strategy and technical skills.</p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mb-12" />

          {/* Current Roles */}
          <MotionReveal delay={0.2}>
            <div className="py-8 mb-12 border-y border-pink/35">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary" />
                Current Roles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:shadow-[0_0_10px_hsl(var(--pink-hsl))] transition-shadow" />
                  <div>
                     <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{ventureFacts["maono-moja-events"].role}</h3>
                    <p className="text-muted-foreground">Maono Moja Events — East African expansion</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-secondary mt-2 flex-shrink-0 group-hover:shadow-[0_0_10px_hsl(var(--cyan-hsl))] transition-shadow" />
                  <div>
                     <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">{ventureFacts["360-vision-events-group"].role}</h3>
                    <p className="text-muted-foreground">360 Vision Events Group — South Africa</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Heritage Section */}
          <MotionReveal delay={0.3}>
            <div className="py-8 mb-12 border-y border-cyan/35">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Heart className="h-16 w-16 text-secondary flex-shrink-0 " />
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    My Unique Journey
                  </h3>
                  <p className="text-muted-foreground mb-4">My career began in hospitality at my mother’s venue, the old Denel Sports Grounds, hosting weddings and corporate events.</p>
                  <p className="text-muted-foreground">Working behind the scenes taught me to coordinate people, equipment and venues with a practical approach.</p>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mb-12" />

          {/* Career Timeline */}
          <MotionReveal delay={0.4}>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Career Timeline
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink via-cyan to-pink hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <MotionReveal key={item.title} delay={0.1 * index}>
                    <div className={`flex flex-col md:flex-row items-center gap-4 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <Card className={`glass p-6 md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        {item.year && <Badge variant={index % 2 === 0 ? "glow-primary" : "glow-secondary"} className="mb-2">{item.year}</Badge>}
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </Card>
                      <div className="hidden md:flex w-2/12 justify-center">
                        <div className={`w-4 h-4 rounded-full ${index % 2 === 0 ? "bg-primary" : "bg-secondary"} ring-4 ring-background`} />
                      </div>
                      <div className="hidden md:block w-5/12" />
                    </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-primary mt-16 mb-8" />

          {/* Key Strengths */}
          <MotionStagger className="grid md:grid-cols-3 gap-6">
            <MotionItem>
              <Card interactive glow="primary" className="glass-primary p-6 text-center h-full border-t-2 border-t-pink">
                <Target className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Leadership</h3>
                <p className="text-sm text-muted-foreground">Strategic planning and creative problem-solving that drives results.</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="secondary" className="glass-secondary p-6 text-center h-full border-t-2 border-t-cyan">
                <Users className="h-10 w-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Client-Centric</h3>
                <p className="text-sm text-muted-foreground">Ensuring every project exceeds expectations with personalized approaches.</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="primary" className="glass-primary p-6 text-center h-full border-t-2 border-t-pink">
                <GraduationCap className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Mentorship</h3>
                <p className="text-sm text-muted-foreground">Deep commitment to community engagement and developing future leaders.</p>
              </Card>
            </MotionItem>
          </MotionStagger>

          {/* Divider */}
          <div className="divider-secondary mt-16 mb-8" />

          <div className="py-8 mb-12 border-y border-blue/35">
            <h2 className="text-label text-foreground mb-4">Proof of work</h2>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">{proofOfWork.title}</h3>
            <ul className="list-disc pl-5 space-y-4 text-muted-foreground">
              {proofOfWork.items.map((item) => <li key={item.value}>{item.value}</li>)}
            </ul>
          </div>

          <Panel label="AWARDS" tone="awards"><AwardWall/></Panel>
          {/* Mentorship Section */}
          <MotionReveal delay={0.8}>
            <div className="mt-12 py-8 border-y border-pink/35">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Award className="h-16 w-16 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    Mentorship & Giving Back
                  </h3>
                  <p className="text-muted-foreground mb-4">I give back through guest lecturing, curriculum development, student projects and internship opportunities.</p>
                  <p className="text-muted-foreground">I am developing “As an Events GURU,” an AI-powered platform intended to connect students with mentors and resources.</p>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-secondary mt-12 mb-8" />

          {/* Vision for Future */}
          <MotionReveal>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Vision for the Future
              </h2>
            </div>
          </MotionReveal>
          <MotionStagger className="grid md:grid-cols-4 gap-4 mb-8">
            <MotionItem>
              <Card interactive glow="primary" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Content</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="secondary" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Augmented Reality</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="primary" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">AI Personalization</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="secondary" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Gamification</p>
              </Card>
            </MotionItem>
          </MotionStagger>
          <MotionReveal>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8 text-center">
              My personal motto, inspired by Queen, "The Show Must Go On," reflects my calm, decisive approach under pressure and my unwavering focus on delivering results.
            </p>
          </MotionReveal>

          {/* CTA */}
          <MotionReveal delay={1.0}>
            <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="glow">
                <Link to="/expertise" className="inline-flex items-center gap-2">
                  Explore My Expertise
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glow-secondary">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionReveal>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
