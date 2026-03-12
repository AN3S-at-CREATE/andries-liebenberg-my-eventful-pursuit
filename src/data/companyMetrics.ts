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

// Sector baselines (ZAR per client per year)
const SECTOR_BASELINES: Record<string, number> = {
  "Events/Production": 120000,
  "Projects/Construction": 200000,
  "Consulting/Strategy": 180000,
  "Retail/Apparel": 60000,
  "Tourism/Experiences": 80000,
  "Industrial/B2B Services": 250000,
};

// Helper to calculate indicative range
const calculateIndicativeRange = (clients: number, sector: string): RevenueRange => {
  const baseline = SECTOR_BASELINES[sector] || 100000;
  const midpoint = clients * baseline;
  const from = Math.round((midpoint * 0.8) / 100000) * 100000;
  const to = Math.round((midpoint * 1.2) / 100000) * 100000;
  return { from, to, isMock: true, basis: "model" };
};

export const companyMetrics: CompanyMetric[] = [
  {
    companyId: "360-vision-events-group",
    revenueGrowthPct: 48,
    clientsAcquired: 120,
    projectsCompleted: 85,
    customerSatisfactionPct: 97,
    revenue: calculateIndicativeRange(120, "Events/Production"), // R11,500,000 – R17,300,000
  },
  {
    companyId: "360-vision-events-cleaning",
    revenueGrowthPct: 44,
    clientsAcquired: 90,
    projectsCompleted: 68,
    customerSatisfactionPct: 96,
    // Real ZAR from notes
    revenue: { from: 15000000, to: 21600000, isMock: false, basis: "doc" },
  },
  {
    companyId: "strydom-projects",
    revenueGrowthPct: 52,
    clientsAcquired: 102,
    projectsCompleted: 76,
    customerSatisfactionPct: 94,
    revenue: calculateIndicativeRange(102, "Projects/Construction"), // R16,300,000 – R24,500,000
  },
  {
    companyId: "maono-moja-events",
    revenueGrowthPct: 45,
    clientsAcquired: 95,
    projectsCompleted: 73,
    customerSatisfactionPct: 96,
    revenue: calculateIndicativeRange(95, "Events/Production"), // R9,100,000 – R13,700,000
  },
  {
    companyId: "k-and-d-resources",
    revenueGrowthPct: 56,
    clientsAcquired: 130,
    projectsCompleted: 90,
    customerSatisfactionPct: 95,
    revenue: calculateIndicativeRange(130, "Industrial/B2B Services"), // R26,000,000 – R39,000,000
  },
  {
    companyId: "adventure-freaksa",
    revenueGrowthPct: 41,
    clientsAcquired: 88,
    projectsCompleted: 60,
    customerSatisfactionPct: 93,
    revenue: calculateIndicativeRange(88, "Tourism/Experiences"), // R5,600,000 – R8,400,000
  },
  {
    companyId: "veralogix-group",
    revenueGrowthPct: 50,
    clientsAcquired: 110,
    projectsCompleted: 80,
    customerSatisfactionPct: 98,
    revenue: calculateIndicativeRange(110, "Consulting/Strategy"), // R15,800,000 – R23,800,000
  },
  {
    companyId: "bobby-verd",
    revenueGrowthPct: 38,
    clientsAcquired: 76,
    projectsCompleted: 55,
    customerSatisfactionPct: 92,
    revenue: calculateIndicativeRange(76, "Retail/Apparel"), // R3,600,000 – R5,500,000
  },
  {
    companyId: "rubies-and-pearls",
    revenueGrowthPct: 47,
    clientsAcquired: 84,
    projectsCompleted: 61,
    customerSatisfactionPct: 95,
    // Real ZAR from notes
    revenue: { from: 12800000, to: 18800000, isMock: false, basis: "doc" },
  },
  {
    companyId: "prisma-entertainment",
    revenueGrowthPct: 53,
    clientsAcquired: 125,
    projectsCompleted: 89,
    customerSatisfactionPct: 99,
    revenue: calculateIndicativeRange(125, "Events/Production"), // R12,000,000 – R18,000,000
  },
];

const companyMetricsMap = new Map<string, CompanyMetric>(
  companyMetrics.map(metric => [metric.companyId, metric])
);

export const getMetricsByCompanyId = (companyId: string): CompanyMetric | undefined =>
  companyMetricsMap.get(companyId);
