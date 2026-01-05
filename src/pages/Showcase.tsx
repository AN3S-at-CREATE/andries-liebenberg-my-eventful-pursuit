import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EventGallery } from "@/components/showcase/EventGallery";
import {
  Image,
  Play, 
  ExternalLink, 
  Calendar, 
  Users, 
  DollarSign, 
  Globe, 
  Building2, 
  Briefcase,
  Star,
  MapPin,
  Award,
  Zap,
  TrendingUp
} from "lucide-react";

const eventPortfolio = [
  {
    name: "Africity 2060",
    type: "International Summit",
    description: "Large-scale continental summit bringing together African leaders and innovators for urban development dialogue.",
    metrics: { attendees: "5,000+", budget: "R12M+", duration: "5 days" },
    highlights: ["Multi-venue coordination", "VVIP protocol management", "International delegates"],
    icon: Globe,
    variant: "cyan" as const
  },
  {
    name: "Transnet Corporate Events",
    type: "Corporate Excellence",
    description: "Series of high-profile corporate events for South Africa's freight logistics company.",
    metrics: { events: "15+", budget: "R8M+", satisfaction: "98%" },
    highlights: ["Executive conferences", "Award ceremonies", "Team building experiences"],
    icon: Building2,
    variant: "pink" as const
  },
  {
    name: "ABSA Leadership Summit",
    type: "Banking & Finance",
    description: "Premier leadership gathering for one of Africa's largest financial services groups.",
    metrics: { attendees: "800+", budget: "R5M+", duration: "3 days" },
    highlights: ["Keynote productions", "Interactive workshops", "Gala dinner"],
    icon: Briefcase,
    variant: "cyan" as const
  },
  {
    name: "SASOL Innovation Expo",
    type: "Industrial Showcase",
    description: "Cutting-edge technology exhibition for the integrated energy and chemicals company.",
    metrics: { exhibitors: "120+", visitors: "3,000+", budget: "R7M+" },
    highlights: ["Technical staging", "Interactive displays", "VIP tours"],
    icon: Zap,
    variant: "pink" as const
  },
  {
    name: "Nedbank Stakeholder Conference",
    type: "Financial Services",
    description: "Annual stakeholder engagement event with live streaming and hybrid attendance.",
    metrics: { attendees: "1,200+", hybrid: "2,500+", budget: "R4M+" },
    highlights: ["Hybrid event technology", "Live broadcasting", "Q&A management"],
    icon: TrendingUp,
    variant: "cyan" as const
  },
  {
    name: "Liberty Life Gala Awards",
    type: "Awards Ceremony",
    description: "Prestigious awards ceremony celebrating top performers in the insurance industry.",
    metrics: { guests: "600+", awards: "45+", budget: "R3M+" },
    highlights: ["Red carpet production", "Live entertainment", "Stage design"],
    icon: Award,
    variant: "pink" as const
  }
];

const caseStudies = [
  {
    title: "360 Vision Events Group",
    sector: "Events/Production",
    challenge: "Build a full-service event production company from the ground up in a competitive market.",
    solution: "Developed end-to-end capabilities including technical production, vendor management, and premium client services.",
    results: ["200+ successful events", "98% client satisfaction", "R50M+ in managed budgets"],
    period: "2019 – Present"
  },
  {
    title: "Veralogix Group",
    sector: "Consulting/Strategy",
    challenge: "Establish a strategic consulting firm that delivers measurable business transformation results.",
    solution: "Created data-driven methodologies combining operational optimization with digital transformation expertise.",
    results: ["47% average client growth", "80+ consulting engagements", "Multiple industry sectors served"],
    period: "2018 – Present"
  },
  {
    title: "Prisma Entertainment",
    sector: "Entertainment Production",
    challenge: "Create spectacular live entertainment experiences that stand out in the crowded events space.",
    solution: "Built creative production capabilities with artist management and innovative show design.",
    results: ["100+ live productions", "Festival-scale events", "International artist coordination"],
    period: "2018 – Present"
  },
  {
    title: "Adventure FreaksA",
    sector: "Tourism/Experiences",
    challenge: "Develop unique adventure tourism offerings that attract both local and international travelers.",
    solution: "Curated outdoor experiences and group travel packages with safety-first approach.",
    results: ["500+ adventure seekers served", "Unique destination packages", "High repeat customer rate"],
    period: "2020 – Present"
  }
];

const stats = [
  { label: "Events Produced", value: "2,246+", icon: Calendar },
  { label: "Budget Managed", value: "R423M+", icon: DollarSign },
  { label: "Happy Clients", value: "1,020+", icon: Users },
  { label: "Years Experience", value: "20+", icon: Star }
];

const Showcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <ParallaxElements variant="cyan" />
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-pink" className="mb-4">Portfolio</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Live <span className="text-primary glow-text-cyan">Show</span><span className="text-secondary glow-text-pink">case</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Selected highlights from <span className="text-primary">spectacular events</span> and <span className="text-secondary">transformative business projects</span> across South Africa and internationally.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-12" />

          {/* Stats Bar */}
          <MotionStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <MotionItem key={index}>
                <Card interactive glow={index % 2 === 0 ? "cyan" : "pink"} className={`${index % 2 === 0 ? "glass-cyan border-t-2 border-t-primary" : "glass-pink border-t-2 border-t-secondary"} p-6 text-center`}>
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${index % 2 === 0 ? "text-primary" : "text-secondary"}`} />
                  <div className={`text-2xl md:text-3xl font-bold ${index % 2 === 0 ? "text-primary" : "text-secondary"}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* Event Gallery Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-cyan" className="mb-4">Photo Gallery</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Event <span className="text-primary glow-text-cyan">High</span><span className="text-secondary glow-text-pink">lights</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visual showcase of our <span className="text-primary">spectacular event productions</span>. Click any image to explore.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-8" />

          <MotionReveal delay={0.2}>
            <EventGallery />
          </MotionReveal>
        </div>
      </section>

      {/* Live Portfolio CTA */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal delay={0.2}>
            <Card className="glass p-8 md:p-12 text-center border-l-4 border-l-primary border-r-4 border-r-secondary">
              <Image className="h-16 w-16 text-secondary mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Full <span className="text-primary">Live</span> <span className="text-secondary">Portfolio</span>
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Dive into my daily updates and life portfolio featuring selected highlights from spectacular events across South Africa and internationally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="glow">
                  <a href="https://create.an3s.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    View Live Portfolio
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="glow-pink" size="lg">
                  <Link to="/companies">View Company Work</Link>
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </div>
      </section>

      {/* Event Portfolio Section */}
      <section className="relative py-16 px-4 bg-muted/20 overflow-hidden">
        <ParallaxElements variant="pink" />
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-cyan" className="mb-4">Event Portfolio</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                High-Profile <span className="text-secondary glow-text-pink">Eve</span><span className="text-primary glow-text-cyan">nts</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trusted by <span className="text-primary">industry leaders</span> for their most <span className="text-secondary">important occasions</span>.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-cyan mb-8" />

          <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventPortfolio.map((event, index) => (
              <MotionItem key={index}>
                <Card interactive glow={event.variant === 'cyan' ? 'cyan' : 'pink'} className={`${event.variant === 'cyan' ? 'glass-cyan border-t-2 border-t-primary' : 'glass-pink border-t-2 border-t-secondary'} p-6 h-full`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${event.variant === 'cyan' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                      <event.icon className={`h-6 w-6 ${event.variant === 'cyan' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">{event.name}</h3>
                      <Badge variant={event.variant === 'cyan' ? 'glow-cyan' : 'glow-pink'} className="mt-1">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(event.metrics).map(([key, value], i) => (
                      <div key={key} className={`text-center p-2 rounded ${i % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                        <div className={`text-sm font-bold ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    {event.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className={`h-3 w-3 ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </Card>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-12">
              <Badge variant="glow-pink" className="mb-4">Case Studies</Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Business <span className="text-primary glow-text-cyan">Trans</span><span className="text-secondary glow-text-pink">formations</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real results from <span className="text-primary">building</span> and <span className="text-secondary">scaling companies</span> across multiple sectors.
              </p>
            </div>
          </MotionReveal>

          {/* Divider */}
          <div className="divider-pink mb-8" />

          <MotionStagger className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <MotionItem key={index}>
                <Card interactive glow={index % 2 === 0 ? "cyan" : "pink"} className={`${index % 2 === 0 ? "glass-cyan border-l-4 border-l-primary" : "glass-pink border-l-4 border-l-secondary"} p-8 h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold text-foreground">{study.title}</h3>
                    <Badge variant={index % 2 === 0 ? "glow-cyan" : "glow-pink"}>{study.sector}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <MapPin className={`h-4 w-4 ${index % 2 === 0 ? "text-primary" : "text-secondary"}`} />
                    South Africa · {study.period}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-secondary mb-2">Solution</h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Results</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className={`h-3 w-3 ${i % 2 === 0 ? "text-primary" : "text-secondary"}`} />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          {/* Divider */}
          <div className="divider-cyan mb-12" />

          <MotionReveal>
            <Card className="glass-pink p-8 md:p-12 text-center border-b-4 border-b-secondary">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Create Something <span className="text-primary glow-text-cyan">Spec</span><span className="text-secondary glow-text-pink">tacular</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's discuss how we can bring your vision to life with <span className="text-primary">proven expertise</span> and <span className="text-secondary">flawless execution</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="glow-pink">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="glow" size="lg">
                  <Link to="/about">Learn More About Me</Link>
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

export default Showcase;
