import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Briefcase, GraduationCap, Heart, Building2, Calendar, Users, Lightbulb, Target, TrendingUp, Star, CheckCircle, Quote } from "lucide-react";

const About = () => {
  const careerHighlights = [
    { icon: Calendar, label: "Events Delivered", value: "2,246+", color: "primary" },
    { icon: TrendingUp, label: "Budget Managed", value: "R423M+", color: "secondary" },
    { icon: Users, label: "Largest Event", value: "50,000+", color: "primary" },
    { icon: Star, label: "5-Star Rating", value: "100%", color: "secondary" },
  ];

  const achievements = [
    { category: "Marketing", items: ["30% event attendance increase", "45% social media engagement boost", "35% lead conversion improvement", "40% customer retention increase"] },
    { category: "Events", items: ["40% event waste reduction", "54% operational efficiency improvement", "25% repeat business increase", "30% security incident reduction"] },
    { category: "Sales", items: ["20% sales revenue increase", "35% customer acquisition boost", "25% sales cycle time reduction", "R8.3M+ avg annual sales"] },
    { category: "Development", items: ["40% development speed enhancement", "50% cost reduction via open-source", "36% efficiency via EventPulse AI", "Custom AI model development"] },
  ];

  const timeline = [
    { year: "1999-2004", title: "Early Beginnings", description: "Started career at Royal Diner, managing entertainment and 511 events with R12.8M in budgets before higher education." },
    { year: "2005-2009", title: "Technical Foundation", description: "Technical Manager at SLS Productions, then Operations Manager at Coventry Productions. Managed 277+ shows." },
    { year: "2010-2013", title: "ShowGroup Era", description: "Head of Lighting Department. Designed lighting for nationally televised shows. Reduced equipment downtime by 30%." },
    { year: "2014-2022", title: "360 Vision Events", description: "Founded and scaled to multi-million Rand enterprise. Managed 692+ shows. Pioneered virtual/hybrid events during COVID-19." },
    { year: "2023-Present", title: "Maono Moja Events", description: "CMO leading East African expansion. Achieved 28% market share increase. Developing AI-powered solutions." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="mixed" />
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Architect of Experiences, Driver of Growth</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Andries Johannes{" "}
                <span className="text-primary glow-text-cyan">Lieben</span>
                <span className="text-secondary glow-text-pink">berg</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
                For over two decades, my professional life has been a dynamic exploration at the intersection of <span className="text-primary">creativity</span>, <span className="text-secondary">strategy</span>, and <span className="text-primary">execution</span>. I've navigated the complex worlds of Marketing, Events Management, Sales, Technical Development, and Strategic Business Growth.
              </p>
              <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto">
                As a third-generation event professional, creating experiences is in my blood, but I've always blended this innate understanding with sharp business strategy and cutting-edge technical skills.
              </p>
            </div>
          </MotionReveal>

          {/* Stats Grid */}
          <MotionStagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {careerHighlights.map((stat) => (
              <MotionItem key={stat.label}>
                <Card interactive glow={stat.color === "primary" ? "cyan" : "pink"} className={stat.color === "primary" ? "glass-cyan p-6 text-center" : "glass-pink p-6 text-center"}>
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color === "primary" ? "text-primary" : "text-secondary"}`} />
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color === "primary" ? "text-primary" : "text-secondary"}`}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </MotionItem>
            ))}
          </MotionStagger>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          {/* Current Roles */}
          <MotionReveal delay={0.2}>
            <Card className="glass p-8 mb-12 border-l-4 border-l-primary">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary" />
                Current <span className="text-secondary">Roles</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:shadow-[0_0_10px_hsl(var(--primary))] transition-shadow" />
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">CMO and Events Manager</h3>
                    <p className="text-muted-foreground">Maono Moja Events — East African expansion</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-secondary mt-2 flex-shrink-0 group-hover:shadow-[0_0_10px_hsl(var(--secondary))] transition-shadow" />
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">Head of Marketing and Events</h3>
                    <p className="text-muted-foreground">360 Vision Events Group — South Africa</p>
                  </div>
                </div>
              </div>
            </Card>
          </MotionReveal>

          {/* Heritage Section */}
          <MotionReveal delay={0.3}>
            <Card className="glass-pink p-8 mb-12 border-r-4 border-r-secondary">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Heart className="h-16 w-16 text-secondary flex-shrink-0 animate-pulse" />
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    My <span className="text-secondary">Unique</span> Journey
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    My career began in Standard 6 (Grade 8), working in full-blown hospitality at my mom's venue, the old Denel Sports Grounds. I managed <span className="text-primary font-semibold">5 venues</span> and <span className="text-secondary font-semibold">7 bars</span>, hosting weddings every weekend and corporate events during the week.
                  </p>
                  <p className="text-muted-foreground">
                    While others hung out at roadhouses or arcades, I was driving a 10-ton truck (nicknamed Lizy) and managing events. I employed almost half of my grade to assist with events. By the time I sought higher education in 2004, I had already managed <span className="text-primary font-semibold">511 events</span> with budgets totaling <span className="text-secondary font-semibold">R12,880,000</span>.
                  </p>
                </div>
              </div>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-12" />

          {/* Career Timeline */}
          <MotionReveal delay={0.4}>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Career <span className="text-primary">Time</span><span className="text-secondary">line</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <MotionReveal key={item.year} delay={0.1 * index}>
                    <div className={`flex flex-col md:flex-row items-center gap-4 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <Card className={`glass p-6 md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        <Badge variant={index % 2 === 0 ? "glow-cyan" : "glow-pink"} className="mb-2">{item.year}</Badge>
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
          <div className="divider-cyan mt-16 mb-8" />

          {/* Key Strengths */}
          <MotionStagger className="grid md:grid-cols-3 gap-6">
            <MotionItem>
              <Card interactive glow="cyan" className="glass-cyan p-6 text-center h-full border-t-2 border-t-primary">
                <Target className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Leadership</h3>
                <p className="text-sm text-muted-foreground">Strategic planning and creative problem-solving that drives results.</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="pink" className="glass-pink p-6 text-center h-full border-t-2 border-t-secondary">
                <Users className="h-10 w-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Client-Centric</h3>
                <p className="text-sm text-muted-foreground">Ensuring every project exceeds expectations with personalized approaches.</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="cyan" className="glass-cyan p-6 text-center h-full border-t-2 border-t-primary">
                <GraduationCap className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Mentorship</h3>
                <p className="text-sm text-muted-foreground">Deep commitment to community engagement and developing future leaders.</p>
              </Card>
            </MotionItem>
          </MotionStagger>

          {/* Divider */}
          <div className="divider-pink mt-16 mb-8" />

          {/* Achievements Grid */}
          <MotionReveal>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Career <span className="text-secondary">High</span><span className="text-primary">lights</span>
            </h2>
          </MotionReveal>
          <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((section, index) => (
              <MotionItem key={section.category}>
                <Card interactive glow={index % 2 === 0 ? "cyan" : "pink"} className={index % 2 === 0 ? "glass-cyan p-6 h-full" : "glass-pink p-6 h-full"}>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${index % 2 === 0 ? "text-primary" : "text-secondary"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </MotionItem>
            ))}
          </MotionStagger>

          {/* Testimonial */}
          <MotionReveal delay={0.7}>
            <Card className="glass mt-16 p-8 border-l-4 border-l-primary border-r-4 border-r-secondary">
              <Quote className="h-10 w-10 text-secondary/50 mb-4" />
              <blockquote className="text-lg text-muted-foreground italic mb-4">
                "Andries has been more than a colleague; he has been an <span className="text-primary not-italic font-medium">inspiration</span>, a <span className="text-secondary not-italic font-medium">leader</span>, and a driving force behind the success. His strategic vision and innovative approach have consistently delivered outstanding results, making him an invaluable asset. Any organization would be fortunate to have Andries on their team."
              </blockquote>
              <p className="text-sm text-foreground font-medium">— Letter of <span className="text-primary">Recommendation</span></p>
            </Card>
          </MotionReveal>

          {/* Mentorship Section */}
          <MotionReveal delay={0.8}>
            <Card className="glass-cyan mt-12 p-8 border-b-4 border-b-primary">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Award className="h-16 w-16 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    <span className="text-primary">Mentorship</span> & <span className="text-secondary">Giving Back</span>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    As an Honorary Alumnus of TUT, I actively give back through guest lecturing, contributing to curriculum development, sponsoring student projects (donating over <span className="text-secondary font-semibold">ZAR 4 Million</span> in equipment to TUT's Entertainment Technology program), and providing invaluable internship and freelance opportunities.
                  </p>
                  <p className="text-muted-foreground">
                    Currently developing "<span className="text-primary">As an Events GURU</span>," an ambitious AI-powered global platform designed to connect students with mentors and resources 24/7.
                  </p>
                </div>
              </div>
            </Card>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mt-12 mb-8" />

          {/* Vision for Future */}
          <MotionReveal>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Vision for the <span className="text-primary">Fu</span><span className="text-secondary">ture</span>
              </h2>
            </div>
          </MotionReveal>
          <MotionStagger className="grid md:grid-cols-4 gap-4 mb-8">
            <MotionItem>
              <Card interactive glow="cyan" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Content</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="pink" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Augmented Reality</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="cyan" className="glass p-4 text-center">
                <Lightbulb className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">AI Personalization</p>
              </Card>
            </MotionItem>
            <MotionItem>
              <Card interactive glow="pink" className="glass p-4 text-center">
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
              <Button asChild size="lg" variant="glow-pink">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Get in Touch
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
