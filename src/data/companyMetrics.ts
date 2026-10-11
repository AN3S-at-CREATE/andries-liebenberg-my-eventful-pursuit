export type RevenueRange = {
  from: number | null;
  to: number | null;
  isMock: boolean;
  basis: "doc" | "model";
};

export type CompanyMetric = {
  companyId: string;
  revenueGrowthPct: number;
  clientsAcquired: number;
  projectsCompleted: number;
  customerSatisfactionPct: number;
  revenue: RevenueRange;
};

// Unevidenced portfolio metrics removed by Andries; populate only with sourced facts.
export const companyMetrics: CompanyMetric[] = [];

const companyMetricsMap = new Map<string, CompanyMetric>(
  companyMetrics.map(metric => [metric.companyId, metric])
);

export const getMetricsByCompanyId = (companyId: string): CompanyMetric | undefined =>
  companyMetricsMap.get(companyId);
