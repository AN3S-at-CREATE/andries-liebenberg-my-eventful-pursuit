import { ClipboardList, MessageSquareText, Calculator } from "lucide-react";
import { AIToolCard } from "./AIToolCard";
import { ConciergeModal } from "./concierge/ConciergeModal";
import { Button } from "@/components/ui/button";

export function AIToolsSection() {
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

          {/* ROI Calculator */}
          <AIToolCard
            icon={Calculator}
            title="ROI Calculator"
            description="Calculate potential returns from growth experiments with interactive sliders and ZAR output."
            status="coming-soon"
            accentColor="primary"
          />
        </div>
      </div>
    </section>
  );
}
