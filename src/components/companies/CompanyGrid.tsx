import { useState, useEffect, useMemo } from "react";
import { companies } from "@/data/companies";
import { getMetricsByCompanyId } from "@/data/companyMetrics";
import { CompanyCard } from "./CompanyCard";
import { CompanyCardSkeleton } from "./CompanyCardSkeleton";
import { CompanyFilters, type SortOption, type FilterOption } from "./CompanyFilters";
import { MotionStagger, MotionItem } from "@/components/motion/MotionReveal";

export const CompanyGrid = () => {
  const [sortBy, setSortBy] = useState<SortOption>("growth");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Wrap derived arrays in useMemo and use a Map for O(1) metrics lookup
  const { sortedCompanies, metricsMap } = useMemo(() => {
    const filtered = companies.filter((company) => {
      if (filterBy === "all") return true;
      return company.sector.toLowerCase().includes(filterBy.toLowerCase());
    });

    // Precompute a Map for O(1) lookups to avoid O(N) array .find() in sort comparator
    const map = new Map();
    filtered.forEach(company => {
      map.set(company.id, getMetricsByCompanyId(company.id));
    });

    const sorted = [...filtered].sort((a, b) => {
      const metricsA = map.get(a.id);
      const metricsB = map.get(b.id);
      if (!metricsA || !metricsB) return 0;

      switch (sortBy) {
        case "growth":
          return metricsB.revenueGrowthPct - metricsA.revenueGrowthPct;
        case "clients":
          return metricsB.clientsAcquired - metricsA.clientsAcquired;
        case "projects":
          return metricsB.projectsCompleted - metricsA.projectsCompleted;
        case "satisfaction":
          return metricsB.customerSatisfactionPct - metricsA.customerSatisfactionPct;
        default:
          return 0;
      }
    });

    return { sortedCompanies: sorted, metricsMap: map };
  }, [filterBy, sortBy]);

  return (
    <div className="space-y-6">
      <CompanyFilters
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />
      
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CompanyCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedCompanies.map((company) => {
            const metrics = metricsMap.get(company.id);
            if (!metrics) return null;
            return (
              <MotionItem key={company.id}>
                <CompanyCard company={company} metrics={metrics} />
              </MotionItem>
            );
          })}
        </MotionStagger>
      )}
    </div>
  );
};
