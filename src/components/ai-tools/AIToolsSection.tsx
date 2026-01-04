import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipboardList, MessageSquareText, Calculator } from "lucide-react";
import { AIToolCard } from "./AIToolCard";
import { ConciergeModal } from "./concierge/ConciergeModal";
import { ROICalculatorModal } from "./calculator/ROICalculatorModal";
import { Button } from "@/components/ui/button";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
import { CursorGlow } from "@/components/effects/CursorGlow";

export function AIToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [roiInitialValues, setRoiInitialValues] = useState<{
    revenue?: number;
    investment?: number;
    growth?: number;
    timeframe?: number;
  } | undefined>();
  const [autoOpenROI, setAutoOpenROI] = useState(false);

  // Check for ROI calculator params in URL
  useEffect(() => {
    const hasROI = searchParams.get("roi") === "1";
    if (hasROI) {
      const revenue = Number(searchParams.get("r")) || undefined;
      const investment = Number(searchParams.get("i")) || undefined;
      const growth = Number(searchParams.get("g")) || undefined;
      const timeframe = Number(searchParams.get("t")) || undefined;

      setRoiInitialValues({ revenue, investment, growth, timeframe });
      setAutoOpenROI(true);

      // Clean up URL params after reading
      searchParams.delete("roi");
      searchParams.delete("r");
      searchParams.delete("i");
      searchParams.delete("g");
      searchParams.delete("t");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      <CursorGlow containerRef={sectionRef} color="mixed" size={300} intensity={0.15} />
      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Glass container for the section */}
        <div className="rounded-2xl bg-card/20 backdrop-blur-xl border border-foreground/5 p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          {/* Header */}
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                AI-Powered Growth Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Leverage AI to diagnose, plan, and calculate your growth potential
                with tools built from real experience.
              </p>
            </div>
          </MotionReveal>

          <MotionStagger className="grid md:grid-cols-3 gap-6">
            {/* AI Growth Diagnostic Wizard */}
            <MotionItem>
              <AIToolCard
                icon={ClipboardList}
                title="Growth Diagnostic"
                description="7-step wizard to diagnose your business growth needs and get personalized recommendations."
                status="coming-soon"
                accentColor="primary"
              />
            </MotionItem>

            {/* Ask AN3S Concierge - AVAILABLE */}
            <MotionItem>
              <AIToolCard
                icon={MessageSquareText}
                title="Ask AN3S Concierge"
                description="Chat with AI about my experience, methodologies, and how I can help grow your business."
                status="available"
                accentColor="secondary"
              >
                <ConciergeModal
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary transition-shadow duration-300 hover:shadow-[0_0_15px_hsl(var(--secondary)/0.4)]"
                    >
                      <MessageSquareText className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  }
                />
              </AIToolCard>
            </MotionItem>

            {/* ROI Calculator - AVAILABLE */}
            <MotionItem>
              <AIToolCard
                icon={Calculator}
                title="ROI Calculator"
                description="Calculate potential returns from growth experiments with interactive sliders and ZAR output."
                status="available"
                accentColor="primary"
              >
                <ROICalculatorModal
                  initialValues={roiInitialValues}
                  autoOpen={autoOpenROI}
                  onAutoOpenComplete={() => setAutoOpenROI(false)}
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate ROI
                    </Button>
                  }
                />
              </AIToolCard>
            </MotionItem>
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
