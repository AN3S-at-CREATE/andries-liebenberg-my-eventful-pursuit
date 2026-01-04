import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Github, Linkedin } from "lucide-react";
import { CursorGlow } from "@/components/effects/CursorGlow";

const Contact = () => {
  const mainRef = useRef<HTMLElement>(null);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main ref={mainRef} className="container py-12 relative overflow-hidden">
        <CursorGlow containerRef={mainRef} color="mixed" size={300} intensity={0.15} />
        <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to discuss your next project or explore partnership opportunities? 
            Reach out and let's build something remarkable together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-6">
            {/* Contact Information Cards */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
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
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        book@hello.an3s.info
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                      <a 
                        href="tel:+27729749703" 
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        +27 72 974 9703
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">South Africa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Hours</p>
                      <p className="text-foreground">Mon - Fri: 08:00 - 17:00 SAST</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/AN3S-CREATE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/andriesliebenberg-an3s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
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
                    className="grayscale contrast-125 opacity-80"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    → Portfolio
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
