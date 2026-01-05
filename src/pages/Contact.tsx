import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ContactForm } from "@/components/contact/ContactForm";
import { ParallaxElements } from "@/components/effects/ParallaxElements";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-12 relative overflow-hidden">
        <ParallaxElements variant="mixed" />
        {/* Hero Section */}
        <div className="text-center mb-12 relative z-10">
          <Badge variant="glow-pink" className="mb-4">Connect</Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary glow-text-cyan">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to discuss your next project or explore partnership opportunities? 
            Reach out and let's build something <span className="text-primary">remarkable</span> together.
          </p>
        </div>

        {/* Divider */}
        <div className="divider-cyan mb-12" />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-6">
            {/* Contact Information Cards */}
            <Card className="glass-cyan border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Contact <span className="text-primary">Information</span>
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
                        href="mailto:book@hello.an3s.info" 
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
                        href="tel:+27729749703" 
                        className="text-foreground hover:text-secondary transition-colors"
                      >
                        +27 72 974 9703
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">South Africa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Hours</p>
                      <p className="text-foreground">Mon - Fri: 08:00 - 17:00 SAST</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-primary/30">
                  <p className="text-sm text-secondary mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/AN3S-CREATE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_10px_hsl(var(--primary)/0.3)] transition-all"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/andriesliebenberg-an3s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 hover:shadow-[0_0_10px_hsl(var(--secondary)/0.3)] transition-all"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="glass-pink border-r-4 border-r-secondary overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683849.345181841!2d22.937505949999998!3d-30.559482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c34a689d9ee1251%3A0xe85d630c1fa4e8a0!2sSouth%20Africa!5e0!3m2!1sen!2s!4v1704326400000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AN3S Location - South Africa"
                    className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="glass border-t-2 border-t-primary border-b-2 border-b-secondary">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Quick <span className="text-secondary">Links</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://an3s.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="text-primary">→</span> an3s.info
                  </a>
                  <a
                    href="https://profile.an3s.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <span className="text-secondary">→</span> Portfolio
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-pink mt-12" />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
