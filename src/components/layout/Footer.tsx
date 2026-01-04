import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">AN3S</h3>
            <p className="text-sm text-muted-foreground">
              Building companies with real metrics and proven execution across South Africa.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@an3s.info" className="hover:text-foreground transition-colors">
                  hello@an3s.info
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:book@an3s.info" className="hover:text-foreground transition-colors">
                  book@an3s.info
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+27729749703" className="hover:text-foreground transition-colors">
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
                  className="hover:text-foreground transition-colors"
                >
                  an3s.info
                </a>
              </li>
              <li>
                <a
                  href="https://profile.an3s.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a
                  href="https://github.com/AN3S-CREATE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://www.linkedin.com/in/andriesliebenberg-an3s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AN3S. All rights reserved.</p>
          <p className="mt-2 text-xs">
            By using this site, you consent to the collection and processing of your data in accordance with POPIA.
          </p>
        </div>
      </div>
    </footer>
  );
};
