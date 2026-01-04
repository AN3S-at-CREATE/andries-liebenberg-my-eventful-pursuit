import { Button } from "@/components/ui/button";

export type CategoryKey = "growth" | "aiSystems" | "marketing" | "projects";

interface SuggestedPromptsProps {
  category: CategoryKey;
  onSelectPrompt: (prompt: string) => void;
}

const promptsByCategory: Record<CategoryKey, string[]> = {
  growth: [
    "What's your approach to business growth?",
    "How many companies have you built?",
    "What results have you achieved?",
    "What industries do you work in?",
  ],
  aiSystems: [
    "How do you implement AI in businesses?",
    "What AI tools do you recommend?",
    "Can you automate my processes?",
    "What's practical AI automation?",
  ],
  marketing: [
    "What marketing strategies do you use?",
    "How do you measure marketing success?",
    "What experiments should I run first?",
    "How do you approach marketing budgets?",
  ],
  projects: [
    "What types of projects do you manage?",
    "How long do projects typically take?",
    "What sectors have you worked in?",
    "How do you handle project timelines?",
  ],
};

export function SuggestedPrompts({
  category,
  onSelectPrompt,
}: SuggestedPromptsProps) {
  const prompts = promptsByCategory[category];

  return (
    <div className="space-y-3">
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
            className="text-xs bg-muted/30 border-border/50 hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
