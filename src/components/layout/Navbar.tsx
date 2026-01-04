import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Github, Linkedin, MessageCircle, Mail } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-primary">AN3S</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            Companies
          </Link>
          <a
            href="https://profile.an3s.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Portfolio
          </a>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/AN3S-CREATE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/andriesliebenberg-an3s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a
              href="https://wa.me/27729749703"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
