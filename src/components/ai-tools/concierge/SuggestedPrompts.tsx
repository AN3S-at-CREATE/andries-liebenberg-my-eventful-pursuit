import { Button } from "@/components/ui/button";

export type CategoryKey = "growth" | "aiSystems" | "marketing" | "projects";

interface SuggestedPromptsProps {
  category: CategoryKey;
  onSelectPrompt: (prompt: string) => void;
}

const clientPrompts: string[] = [
  "I need a website. What does it cost?",
  "Can you automate my WhatsApp enquiries?",
  "I need a logo and brand. Where do I start?",
  "Book a call with Andries",
];

export function SuggestedPrompts({
  category,
  onSelectPrompt,
}: SuggestedPromptsProps) {
  const prompts = clientPrompts;

  return (
    <div
      className="space-y-3"
      role="tabpanel"
      id={`panel-${category}`}
      aria-labelledby={`tab-${category}`}
    >
      <p className="text-sm text-muted-foreground text-center">
        Try asking:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {prompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onSelectPrompt(prompt)}
            className="text-xs bg-muted/30 border-border/50 hover:bg-primary/20 hover:border-pink/50 hover:text-primary transition-all"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
