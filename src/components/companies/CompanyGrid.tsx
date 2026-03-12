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

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      if (filterBy === "all") return true;
      return company.sector.toLowerCase().includes(filterBy.toLowerCase());
    });
  }, [filterBy]);

  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => {
      const metricsA = getMetricsByCompanyId(a.id);
      const metricsB = getMetricsByCompanyId(b.id);
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
  }, [filteredCompanies, sortBy]);

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
            const metrics = getMetricsByCompanyId(company.id);
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
