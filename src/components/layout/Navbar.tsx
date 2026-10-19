import { whatsappUrl, facts } from "@/data/facts";
import { createContext, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu } from "lucide-react";
// The wordmark comes from the AN3S design system (src/design-system/assets).
import logo from "@/design-system/assets/an3s-wordmark.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { title: "AN3S", url: "/" },
  { title: "Services", url: "/services" },
  { title: "Work", url: "/work" },
  { title: "AI", url: "/ai" },
  { title: "Lab", url: "/lab" },
  { title: "Dreamforge", url: "/ai#dreamforge" },
  { title: "Contact", url: "/contact" },
];

// Route-owned compatibility instances are suppressed by the persistent app shell.
export const PersistentNavContext = createContext(false);

export const Navbar = () => {
  const isPersistent = useContext(PersistentNavContext);
  return isPersistent ? null : <SiteNavbar />;
};

function SiteNavbar() {
  const location = useLocation();
  const isReduced = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isActive = (url: string) => !url.includes("#") && (url === "/" ? location.pathname === "/" : location.pathname === url || location.pathname.startsWith(`${url}/`));
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-nav fixed top-0 inset-x-0 h-16 z-50 ${hasScrolled ? "has-scrolled" : ""}`}>
      <a href="#page-content" className="skip-link">Skip to content</a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="AN3S Brand Logo — Andries Liebenberg"
            className="h-10 w-auto"
            fetchPriority="high"
            decoding="sync"
            width="118"
            height="40"
          />
          <span className="text-label text-muted-foreground">Est. {facts.established.value}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
          {navLinks.map((item) => (
            <Link key={item.url} to={item.url} aria-current={isActive(item.url) ? "page" : undefined} className="relative py-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              {isActive(item.url) && <m.span aria-hidden="true" layoutId="nav-rail" className="nav-rail absolute inset-x-0 bottom-0 h-0.5" transition={{ duration: isReduced ? 0 : motionTokens.slow, ease: motionTokens.ease }} />}
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden xl:block text-sm text-muted-foreground">Gauteng · South Africa</span>
          <Button asChild size="sm" className="inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <a
              href={whatsappUrl}
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
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-cyan/30">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 pb-6 border-b border-cyan/30">
                  <img
                    src={logo}
                    alt="AN3S"
                    className="h-10 w-auto"
                    fetchPriority="high"
                    decoding="sync"
                    width="118"
                    height="40"
                  />
                  <span className="text-label text-muted-foreground">Est. {facts.established.value}</span>
                </div>

                <nav className="flex flex-col gap-1 py-6 flex-1 overflow-y-auto" aria-label="Mobile navigation">
                  {navLinks.map((item) => (
                    <Link
                      key={item.url}
                      to={item.url}
                      onClick={closeMenu}
                      aria-current={isActive(item.url) ? "page" : undefined}
                      className={`px-3 py-3 border-l-2 hover:text-primary hover:bg-primary/10 rounded-md transition-colors ${isActive(item.url) ? "text-ink border-pink" : "text-muted-foreground border-transparent"}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t border-cyan/30">
                  <p className="text-sm text-muted-foreground px-3 pb-3">Gauteng · South Africa</p>
                  <Button asChild variant="glow-secondary" className="w-full">
                    <a
                      href={whatsappUrl}
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
