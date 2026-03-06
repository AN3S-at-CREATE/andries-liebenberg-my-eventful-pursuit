import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Github, Linkedin, MessageCircle, Mail, Menu, ChevronDown, Calendar, Megaphone, TrendingUp, Code, Rocket, Users, Zap, Plane, Brain, Wrench } from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const expertiseItems = [
  { title: "Events Management", url: "/expertise/events-management", icon: Calendar },
  { title: "Marketing", url: "/expertise/marketing", icon: Megaphone },
  { title: "Sales", url: "/expertise/sales", icon: TrendingUp },
  { title: "Development", url: "/expertise/development", icon: Code },
  { title: "Business Growth", url: "/expertise/business-growth", icon: Rocket },
  { title: "Mentorship", url: "/expertise/mentorship", icon: Users },
];

const aiItems = [
  { title: "EventPulse", url: "/ai/eventpulse", icon: Zap },
  { title: "Lynkie Sky", url: "/ai/lynkie-sky", icon: Plane },
  { title: "NeuroLogix", url: "/ai/neurologix", icon: Brain },
  { title: "Custom Models", url: "/ai/custom-models", icon: Wrench },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/30 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="AN3S" 
            className="h-10 w-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_hsl(var(--secondary))]" 
            loading="lazy"
            decoding="async"
            width="160"
            height="40"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors outline-none">
              Expertise
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-background border-secondary/30">
              <DropdownMenuItem asChild>
                <Link to="/expertise" className="flex items-center gap-2 cursor-pointer hover:text-primary">
                  <Rocket className="h-4 w-4 text-primary" />
                  All Expertise
                </Link>
              </DropdownMenuItem>
              {expertiseItems.map((item, index) => (
                <DropdownMenuItem key={item.url} asChild>
                  <Link to={item.url} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <item.icon className={`h-4 w-4 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors outline-none">
              AI
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-background border-primary/30">
              <DropdownMenuItem asChild>
                <Link to="/ai" className="flex items-center gap-2 cursor-pointer hover:text-secondary">
                  <Brain className="h-4 w-4 text-secondary" />
                  All AI Tools
                </Link>
              </DropdownMenuItem>
              {aiItems.map((item, index) => (
                <DropdownMenuItem key={item.url} asChild>
                  <Link to={item.url} className="flex items-center gap-2 cursor-pointer hover:text-secondary">
                    <item.icon className={`h-4 w-4 ${index % 2 === 0 ? 'text-secondary' : 'text-primary'}`} />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/companies" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <Building2 className="h-4 w-4 text-secondary" />
            Companies
          </Link>
          <Link to="/showcase" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            Showcase
          </Link>
          <Link to="/downloads" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Downloads
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-secondary transition-colors flex items-center gap-1">
            <Mail className="h-4 w-4 text-primary" />
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/AN3S-CREATE"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block text-muted-foreground hover:text-primary transition-colors"
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
                className="hidden sm:block text-muted-foreground hover:text-secondary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn Profile</p>
            </TooltipContent>
          </Tooltip>
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
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-secondary/30">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-secondary/30">
                  <img
                    src={logo}
                    alt="AN3S"
                    className="h-10 w-auto"
                    loading="lazy"
                    decoding="async"
                    width="160"
                    height="40"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 py-6 flex-1 overflow-y-auto">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors"
                  >
                    About
                  </Link>
                  <div className="px-3 py-2">
                    <p className="text-xs text-primary mb-2">Expertise</p>
                    <Link
                      to="/expertise"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors text-sm"
                    >
                      <Rocket className="h-4 w-4 text-primary" />
                      All Expertise
                    </Link>
                    {expertiseItems.map((item, index) => (
                      <Link
                        key={item.url}
                        to={item.url}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors text-sm"
                      >
                        <item.icon className={`h-4 w-4 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="px-3 py-2 border-t border-secondary/30">
                    <p className="text-xs text-secondary mb-2">AI</p>
                    <Link
                      to="/ai"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors text-sm"
                    >
                      <Brain className="h-4 w-4 text-secondary" />
                      All AI Tools
                    </Link>
                    {aiItems.map((item, index) => (
                      <Link
                        key={item.url}
                        to={item.url}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors text-sm"
                      >
                        <item.icon className={`h-4 w-4 ${index % 2 === 0 ? 'text-secondary' : 'text-primary'}`} />
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/companies"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Building2 className="h-4 w-4 text-secondary" />
                    Companies
                  </Link>
                  <Link
                    to="/showcase"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors"
                  >
                    Showcase
                  </Link>
                  <Link
                    to="/downloads"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    Downloads
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    Contact
                  </Link>
                </nav>

                {/* Social Links */}
                <div className="py-6 border-t border-primary/30">
                  <p className="text-xs text-secondary mb-4 px-3">Connect</p>
                  <div className="flex items-center gap-4 px-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://github.com/AN3S-CREATE"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
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
                          className="text-muted-foreground hover:text-secondary transition-colors"
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

                {/* WhatsApp CTA */}
                <div className="pt-4 border-t border-secondary/30">
                  <Button asChild variant="glow-pink" className="w-full">
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
