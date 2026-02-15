import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Contact from "./pages/Contact";
import Status from "./pages/Status";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Showcase from "./pages/Showcase";
import Downloads from "./pages/Downloads";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

// Expertise pages
import Expertise from "./pages/expertise";
import EventsManagement from "./pages/expertise/EventsManagement";
import Marketing from "./pages/expertise/Marketing";
import Sales from "./pages/expertise/Sales";
import Development from "./pages/expertise/Development";
import BusinessGrowth from "./pages/expertise/BusinessGrowth";
import Mentorship from "./pages/expertise/Mentorship";

// AI pages
import AI from "./pages/ai";
import EventPulse from "./pages/ai/EventPulse";
import LynkieSky from "./pages/ai/LynkieSky";
import NeuroLogix from "./pages/ai/NeuroLogix";
import CustomModels from "./pages/ai/CustomModels";

import { FloatingConciergeButton } from "./components/ai-tools/FloatingConciergeButton";
import { PageTransition } from "./components/layout/PageTransition";
import { BackgroundFX } from "./components/background/BackgroundFX";
import { ParallaxStarfield } from "./components/effects/ParallaxStarfield";
import { NebulaClouds } from "./components/effects/NebulaClouds";
import { LoadingScreen } from "./components/loading/LoadingScreen";
import { GlobalCursorGlow } from "./components/effects/GlobalCursorGlow";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization with extra delay for animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen isLoading={isLoading} />
        <ParallaxStarfield />
        <NebulaClouds />
        <BackgroundFX />
        <GlobalCursorGlow color="mixed" size={350} intensity={0.2} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              
              {/* Expertise routes */}
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/expertise/events-management" element={<EventsManagement />} />
              <Route path="/expertise/marketing" element={<Marketing />} />
              <Route path="/expertise/sales" element={<Sales />} />
              <Route path="/expertise/development" element={<Development />} />
              <Route path="/expertise/business-growth" element={<BusinessGrowth />} />
              <Route path="/expertise/mentorship" element={<Mentorship />} />
              
              {/* AI routes */}
              <Route path="/ai" element={<AI />} />
              <Route path="/ai/eventpulse" element={<EventPulse />} />
              <Route path="/ai/lynkie-sky" element={<LynkieSky />} />
              <Route path="/ai/neurologix" element={<NeuroLogix />} />
              <Route path="/ai/custom-models" element={<CustomModels />} />
              
              {/* Other routes */}
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:slug" element={<CompanyDetail />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Legal pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              
              {/* Admin routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              
              <Route path="/__status" element={<Status />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          <FloatingConciergeButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
