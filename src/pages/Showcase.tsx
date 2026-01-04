import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Image, Play, ExternalLink } from "lucide-react";

const Showcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <MotionReveal>
            <div className="text-center mb-16">
              <Badge variant="glow-cyan" className="mb-4">Portfolio</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Live <span className="text-primary glow-text-cyan">Showcase</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Selected highlights from my spectacular events and marketing campaigns.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <Card className="glass p-12 text-center">
              <Image className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Full Live Portfolio</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Dive into my daily updates and life portfolio featuring selected highlights from spectacular events across South Africa and internationally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="https://create.an3s.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    View Live Portfolio
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/companies">View Company Work</Link>
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
