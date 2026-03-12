import { cn } from "@/lib/utils";
import { TrendingUp, Bot, Beaker, FolderKanban } from "lucide-react";
import type { CategoryKey } from "./SuggestedPrompts";

interface CategoryTabsProps {
  activeCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
}

const categories: { key: CategoryKey; label: string; icon: React.ElementType }[] = [
  { key: "growth", label: "Growth", icon: TrendingUp },
  { key: "aiSystems", label: "AI Systems", icon: Bot },
  { key: "marketing", label: "Marketing", icon: Beaker },
  { key: "projects", label: "Projects", icon: FolderKanban },
];

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div
      className="flex border-b border-border/50"
      role="tablist"
      aria-label="Prompt Categories"
    >
      {categories.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          role="tab"
          aria-selected={activeCategory === key}
          aria-controls={`panel-${key}`}
          id={`tab-${key}`}
          onClick={() => onCategoryChange(key)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            activeCategory === key
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
