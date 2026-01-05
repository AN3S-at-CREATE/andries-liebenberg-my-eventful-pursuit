import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

export const Footer = () => {
  return (
    <footer className="border-t border-secondary/30 bg-muted/30">
      {/* Pink accent divider at top */}
      <div className="divider-pink" />
      
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/">
              <img 
                src={logo} 
                alt="AN3S Logo" 
                className="h-12 mb-4 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_hsl(var(--primary))]" 
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Building companies with real metrics and proven execution across South Africa.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:email@hello.an3s.info" className="hover:text-secondary transition-colors">
                  email@hello.an3s.info
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:book@hello.an3s.info" className="hover:text-secondary transition-colors">
                  book@hello.an3s.info
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+27729749703" className="hover:text-primary transition-colors">
                  +27 72 974 9703
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://an3s.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  an3s.info
                </a>
              </li>
              <li>
                <a
                  href="https://profile.an3s.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4 text-primary" />
                <a
                  href="https://github.com/AN3S-CREATE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-secondary" />
                <a
                  href="https://www.linkedin.com/in/andriesliebenberg-an3s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-secondary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Pink/cyan mixed divider */}
        <div className="mt-8 pt-8 border-t border-secondary/20 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} <span className="text-primary">AN3S</span>. All rights reserved.</p>
          <p className="mt-2 text-xs">
            By using this site, you consent to the collection and processing of your data in accordance with <span className="text-secondary">POPIA</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};
