import { facts, whatsappUrl, whatsappNumber } from "@/data/facts";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo/Seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Phone, MapPin, Clock, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Contact | AN3S" description="Contact Andries on WhatsApp to discuss design, websites, apps and automation for your South African business." path="/contact"/>
      <Navbar />
      
      <main className="container py-12 relative overflow-hidden">
        {/* Hero Section */}
        <div className="text-center mb-12 relative z-10">
          <Badge variant="glow-secondary" className="mb-4">Connect</Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to discuss your next project or explore partnership opportunities? 
            Reach out and let's build something remarkable together.
          </p>
        </div>

        {/* Divider */}
        <div className="divider-primary mb-12" />

        <div className="mb-10 text-center"><Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp Andries</a></Button><p className="text-sm text-muted-foreground mt-4">{facts.responsePromise.value}</p></div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-6">
            {/* Contact Information Cards */}
            <Card className="glass-primary border-l-4 border-l-pink">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href="mailto:email@hello.an3s.info" 
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        email@hello.an3s.info
                      </a>
                      <br />
                      <a 
                        href={`mailto:${facts.email.value}`} 
                        className="text-foreground hover:text-secondary transition-colors"
                      >
                        book@hello.an3s.info
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                      <a 
                        href={`tel:+${whatsappNumber}`} 
                        className="text-foreground hover:text-secondary transition-colors"
                      >
                        {facts.whatsapp.value}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">{facts.serviceArea.value}</p>
                    </div>
                  </div>


                    <div>
                      <p className="text-sm text-muted-foreground">Business Hours</p>
                      <p className="text-foreground">Mon - Fri: 08:00 - 17:00 SAST</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-pink/30">
                  <p className="text-sm text-secondary mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://github.com/AN3S-CREATE"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_10px_hsl(var(--pink-hsl)/0.3)] transition-all"
                          aria-label="GitHub Profile"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub Profile</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://www.linkedin.com/in/andriesliebenberg-an3s"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 hover:shadow-[0_0_10px_hsl(var(--cyan-hsl)/0.3)] transition-all"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>LinkedIn Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="glass border-t-2 border-t-pink border-b-2 border-b-cyan">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://an3s.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    → an3s.info
                  </a>
                  <a
                    href="https://profile.an3s.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                  >
                    → Portfolio
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-secondary mt-12" />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
