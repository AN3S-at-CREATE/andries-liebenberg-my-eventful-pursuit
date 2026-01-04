import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "growth" | "clients" | "projects" | "satisfaction";
export type FilterOption = "all" | "events" | "projects" | "consulting" | "retail" | "tourism" | "industrial";

interface CompanyFiltersProps {
  sortBy: SortOption;
  filterBy: FilterOption;
  onSortChange: (value: SortOption) => void;
  onFilterChange: (value: FilterOption) => void;
}

export const CompanyFilters = ({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}: CompanyFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-[160px] bg-card/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="growth">Growth %</SelectItem>
            <SelectItem value="clients">Clients</SelectItem>
            <SelectItem value="projects">Projects</SelectItem>
            <SelectItem value="satisfaction">Satisfaction</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sector:</span>
        <Select value={filterBy} onValueChange={(v) => onFilterChange(v as FilterOption)}>
          <SelectTrigger className="w-[180px] bg-card/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            <SelectItem value="events">Events/Production</SelectItem>
            <SelectItem value="projects">Projects/Construction</SelectItem>
            <SelectItem value="consulting">Consulting/Strategy</SelectItem>
            <SelectItem value="retail">Retail/Apparel</SelectItem>
            <SelectItem value="tourism">Tourism/Experiences</SelectItem>
            <SelectItem value="industrial">Industrial/B2B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
