import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CompaniesPreview } from "@/components/companies/CompaniesPreview";
import { AIToolsSection } from "@/components/ai-tools/AIToolsSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, TrendingUp, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { CursorGlow } from "@/components/effects/CursorGlow";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-24 px-4 overflow-hidden">
        {/* Interactive cursor glow */}
        <CursorGlow containerRef={heroRef} color="mixed" size={350} intensity={0.2} />
        {/* Parallax background layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
          style={{ y: backgroundY }}
        />
        
        {/* Floating glow orbs with parallax */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px] pointer-events-none"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
        />
        <motion.div
          className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-[80px] pointer-events-none"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "70%"]) }}
        />
        
        {/* Content with parallax */}
        <motion.div
          className="container max-w-4xl mx-auto text-center relative z-10"
          style={{ y: contentY, opacity }}
        >
          <MotionReveal delay={0}>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              I don't just talk growth —{" "}
              <span className="text-primary glow-text-cyan">I've shipped it.</span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              10 companies built with real metrics and proven execution across events, consulting, retail, and industrial sectors in South Africa.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-shadow duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                <Link to="/companies" className="inline-flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  View Companies
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-secondary/50 hover:bg-secondary/10 hover:border-secondary border-glow-pink-hover">
                <a
                  href="https://wa.me/27729749703"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Growth Call
                </a>
              </Button>
            </div>
          </MotionReveal>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="divider-glow h-px w-full animate-glow-breathe" />

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <MotionStagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MotionItem>
              <div className="group text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 border-glow-hover cursor-default">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Building2 className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="font-heading text-3xl font-bold">10</span>
                </div>
                <p className="text-sm text-muted-foreground">Companies Built</p>
              </div>
            </MotionItem>
            <MotionItem>
              <div className="group text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-secondary/5 border-glow-pink-hover cursor-default">
                <div className="flex items-center justify-center gap-2 text-foreground mb-2">
                  <Users className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]" />
                  <span className="font-heading text-3xl font-bold">1,020+</span>
                </div>
                <p className="text-sm text-muted-foreground">Clients Acquired</p>
              </div>
            </MotionItem>
            <MotionItem>
              <div className="group text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-secondary/5 border-glow-pink-hover cursor-default">
                <div className="flex items-center justify-center gap-2 text-secondary mb-2">
                  <TrendingUp className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--secondary))]" />
                  <span className="font-heading text-3xl font-bold glow-text-pink">47%</span>
                </div>
                <p className="text-sm text-muted-foreground">Avg. Growth</p>
              </div>
            </MotionItem>
            <MotionItem>
              <div className="group text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 border-glow-hover cursor-default">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Star className="h-6 w-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="font-heading text-3xl font-bold">96%</span>
                </div>
                <p className="text-sm text-muted-foreground">Avg. Satisfaction</p>
              </div>
            </MotionItem>
          </MotionStagger>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-glow h-px w-full animate-glow-breathe" />

      {/* AI Tools Section */}
      <AIToolsSection />

      {/* Divider */}
      <div className="divider-glow h-px w-full animate-glow-breathe" />

      {/* Companies Preview */}
      <CompaniesPreview />

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30 relative overflow-hidden">
        <CursorGlow containerRef={contactRef} color="mixed" size={300} intensity={0.15} />
        <div className="container max-w-2xl mx-auto relative z-10">
          <MotionReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to grow your business?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's discuss how I can help you achieve similar results.
              </p>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <ContactForm />
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
