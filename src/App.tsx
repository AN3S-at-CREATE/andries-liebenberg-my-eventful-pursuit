import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FloatingConciergeButton } from "./components/ai-tools/FloatingConciergeButton";
import { PageTransition } from "./components/layout/PageTransition";
import { BackgroundFX } from "./components/background/BackgroundFX";
import { ParallaxStarfield } from "./components/effects/ParallaxStarfield";
import { NebulaClouds } from "./components/effects/NebulaClouds";
import { LoadingScreen } from "./components/loading/LoadingScreen";
import { PageLoader } from "./components/loading/PageLoader";
import { GlobalCursorGlow } from "./components/effects/GlobalCursorGlow";

const Index = lazy(() => import("./pages/Index"));
const Companies = lazy(() => import("./pages/Companies"));
const CompanyDetail = lazy(() => import("./pages/CompanyDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Status = lazy(() => import("./pages/Status"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Showcase = lazy(() => import("./pages/Showcase"));
const Downloads = lazy(() => import("./pages/Downloads"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));

// Expertise pages
const Expertise = lazy(() => import("./pages/expertise"));
const EventsManagement = lazy(() => import("./pages/expertise/EventsManagement"));
const Marketing = lazy(() => import("./pages/expertise/Marketing"));
const Sales = lazy(() => import("./pages/expertise/Sales"));
const Development = lazy(() => import("./pages/expertise/Development"));
const BusinessGrowth = lazy(() => import("./pages/expertise/BusinessGrowth"));
const Mentorship = lazy(() => import("./pages/expertise/Mentorship"));

// AI pages
const AI = lazy(() => import("./pages/ai"));
const EventPulse = lazy(() => import("./pages/ai/EventPulse"));
const LynkieSky = lazy(() => import("./pages/ai/LynkieSky"));
const NeuroLogix = lazy(() => import("./pages/ai/NeuroLogix"));
const CustomModels = lazy(() => import("./pages/ai/CustomModels"));

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
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          </PageTransition>
          <FloatingConciergeButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
