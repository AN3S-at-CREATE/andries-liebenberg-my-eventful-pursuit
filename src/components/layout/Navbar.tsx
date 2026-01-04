import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Github, Linkedin, MessageCircle, Mail, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AN3S" className="h-8 w-auto" />
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
            className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/andriesliebenberg-an3s"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <a
              href="https://wa.me/27729749703"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-border">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border/50">
                  <img src={logo} alt="AN3S" className="h-8 w-auto" />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 py-6 flex-1">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/companies"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <Building2 className="h-4 w-4" />
                    Companies
                  </Link>
                  <a
                    href="https://profile.an3s.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    Portfolio
                    <span className="text-xs text-muted-foreground">↗</span>
                  </a>
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact
                  </Link>
                </nav>

                {/* Social Links */}
                <div className="py-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-4 px-3">Connect</p>
                  <div className="flex items-center gap-4 px-3">
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
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="pt-4 border-t border-border/50">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a
                      href="https://wa.me/27729749703"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
