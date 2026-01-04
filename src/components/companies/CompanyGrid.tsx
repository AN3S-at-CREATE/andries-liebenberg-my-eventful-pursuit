import { useState } from "react";
import { companies } from "@/data/companies";
import { companyMetrics, getMetricsByCompanyId } from "@/data/companyMetrics";
import { CompanyCard } from "./CompanyCard";
import { CompanyFilters, type SortOption, type FilterOption } from "./CompanyFilters";

export const CompanyGrid = () => {
  const [sortBy, setSortBy] = useState<SortOption>("growth");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const filteredCompanies = companies.filter((company) => {
    if (filterBy === "all") return true;
    return company.sector.toLowerCase().includes(filterBy.toLowerCase());
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
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

  return (
    <div className="space-y-6">
      <CompanyFilters
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCompanies.map((company) => {
          const metrics = getMetricsByCompanyId(company.id);
          if (!metrics) return null;
          return (
            <CompanyCard key={company.id} company={company} metrics={metrics} />
          );
        })}
      </div>
    </div>
  );
};
