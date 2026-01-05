import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, TrendingUp, DollarSign, Code, Briefcase, GraduationCap } from "lucide-react";

const expertiseAreas = [
  {
    title: "Events Management",
    description: "20+ years orchestrating 2,246+ successful events with budgets exceeding R423M.",
    icon: Calendar,
    href: "/expertise/events-management",
    accent: "cyan" as const,
  },
  {
    title: "Marketing",
    description: "Data-driven strategies increasing attendance +30% and social engagement +45%.",
    icon: TrendingUp,
    href: "/expertise/marketing",
    accent: "pink" as const,
  },
  {
    title: "Sales",
    description: "Consistent R7.3M-R8.3M annual revenue with +20% sales growth methodologies.",
    icon: DollarSign,
    href: "/expertise/sales",
    accent: "cyan" as const,
  },
  {
    title: "Development",
    description: "Full-stack skills bridging strategy with technical execution using AI & Cloud.",
    icon: Code,
    href: "/expertise/development",
    accent: "pink" as const,
  },
  {
    title: "Business Growth",
    description: "Strategic planning driving +30% scalability and Africa-wide expansion.",
    icon: Briefcase,
    href: "/expertise/business-growth",
    accent: "cyan" as const,
  },
  {
    title: "Mentorship",
    description: "Nurturing next-gen professionals at TUT & AFDA with R4M+ industry contributions.",
    icon: GraduationCap,
    href: "/expertise/mentorship",
    accent: "pink" as const,
  },
];

const Expertise = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">Expertise</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Areas of <span className="text-primary glow-text-cyan">Expertise</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                20+ years of cross-industry expertise spanning Marketing, Events, Sales, Development, and Business Growth.
              </p>
            </div>
          </MotionReveal>

          <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area) => (
              <MotionItem key={area.href}>
                <Link to={area.href}>
                  <Card interactive glow={area.accent === "cyan" ? "cyan" : "pink"} className={`${area.accent === "cyan" ? "glass-cyan" : "glass-pink"} p-8 h-full group`}>
                    <area.icon className={`h-10 w-10 mb-4 ${area.accent === "cyan" ? "text-primary" : "text-secondary"}`} />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{area.description}</p>
                    <div className={`inline-flex items-center gap-2 text-sm font-medium ${area.accent === "cyan" ? "text-primary" : "text-secondary"}`}>
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Expertise;
