import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipboardList, MessageSquareText, Calculator } from "lucide-react";
import { AIToolCard } from "./AIToolCard";
import { ConciergeModal } from "./concierge/ConciergeModal";
import { ROICalculatorModal } from "./calculator/ROICalculatorModal";
import { Button } from "@/components/ui/button";

export function AIToolsSection() {
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
    <section className="py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI-Powered Growth Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leverage AI to diagnose, plan, and calculate your growth potential
            with tools built from real experience.
          </p>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* AI Growth Diagnostic Wizard */}
          <AIToolCard
            icon={ClipboardList}
            title="Growth Diagnostic"
            description="7-step wizard to diagnose your business growth needs and get personalized recommendations."
            status="coming-soon"
            accentColor="primary"
          />

          {/* Ask AN3S Concierge - AVAILABLE */}
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
                  className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary"
                >
                  <MessageSquareText className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              }
            />
          </AIToolCard>

          {/* ROI Calculator - AVAILABLE */}
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
        </div>
      </div>
    </section>
  );
}
