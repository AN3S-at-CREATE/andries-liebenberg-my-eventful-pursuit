
// Copied from src/data/companies.ts
export type Company = {
  id: string;
  slug: string;
  name: string;
  sector: "Events/Production" | "Projects/Construction" | "Consulting/Strategy" | "Retail/Apparel" | "Tourism/Experiences" | "Industrial/B2B Services";
  description: string;
  highlights: string[];
  location: string;
  period: string;
};

export const companies: Company[] = [
  {
    id: "360-vision-events-group",
    slug: "360-vision-events-group",
    name: "360 Vision Events (Group)",
    sector: "Events/Production",
    description: "Full-service event production and management group delivering premium experiences across South Africa.",
    highlights: [
      "End-to-end event production",
      "Premium corporate events",
      "Large-scale venue management"
    ],
    location: "South Africa",
    period: "2019 – Present"
  },
  {
    id: "360-vision-events-cleaning",
    slug: "360-vision-events-cleaning",
    name: "360 Vision Events Cleaning",
    sector: "Events/Production",
    description: "Specialized cleaning services for events and venues with rapid turnaround capabilities.",
    highlights: [
      "Event venue cleaning",
      "Post-event rapid turnaround",
      "Contract cleaning services"
    ],
    location: "South Africa",
    period: "2020 – Present"
  },
  {
    id: "strydom-projects",
    slug: "strydom-projects",
    name: "Strydom Projects",
    sector: "Projects/Construction",
    description: "Construction and project management firm specializing in commercial and residential developments.",
    highlights: [
      "Commercial construction",
      "Project management",
      "Development consulting"
    ],
    location: "South Africa",
    period: "2018 – Present"
  },
  {
    id: "maono-moja-events",
    slug: "maono-moja-events",
    name: "Maono Moja Events",
    sector: "Events/Production",
    description: "Creative event production company focused on unique and memorable experiences.",
    highlights: [
      "Creative event design",
      "Brand activations",
      "Festival production"
    ],
    location: "South Africa",
    period: "2019 – Present"
  },
  {
    id: "k-and-d-resources",
    slug: "k-and-d-resources",
    name: "K AND D RESOURCES",
    sector: "Industrial/B2B Services",
    description: "Industrial services and resource management company serving B2B clients across multiple sectors.",
    highlights: [
      "Industrial resource supply",
      "B2B service contracts",
      "Supply chain management"
    ],
    location: "South Africa",
    period: "2017 – Present"
  },
  {
    id: "adventure-freaksa",
    slug: "adventure-freaksa",
    name: "Adventure FreaksA",
    sector: "Tourism/Experiences",
    description: "Adventure tourism operator offering unique outdoor experiences and travel packages.",
    highlights: [
      "Adventure tourism packages",
      "Outdoor experiences",
      "Group travel coordination"
    ],
    location: "South Africa",
    period: "2020 – Present"
  },
  {
    id: "veralogix-group",
    slug: "veralogix-group",
    name: "Veralogix Group",
    sector: "Consulting/Strategy",
    description: "Strategic consulting firm providing business transformation and operational excellence services.",
    highlights: [
      "Business strategy consulting",
      "Operational optimization",
      "Digital transformation"
    ],
    location: "South Africa",
    period: "2018 – Present"
  },
  {
    id: "bobby-verd",
    slug: "bobby-verd",
    name: "Bobby Verd",
    sector: "Retail/Apparel",
    description: "Fashion retail brand delivering contemporary apparel with a focus on quality and style.",
    highlights: [
      "Contemporary fashion retail",
      "Brand development",
      "E-commerce operations"
    ],
    location: "South Africa",
    period: "2021 – Present"
  },
  {
    id: "rubies-and-pearls",
    slug: "rubies-and-pearls",
    name: "Rubies and Pearls",
    sector: "Tourism/Experiences",
    description: "Luxury tourism and experience company specializing in curated travel and hospitality.",
    highlights: [
      "Luxury travel experiences",
      "Curated hospitality",
      "Premium event hosting"
    ],
    location: "South Africa",
    period: "2019 – Present"
  },
  {
    id: "prisma-entertainment",
    slug: "prisma-entertainment",
    name: "Prisma Entertainment",
    sector: "Events/Production",
    description: "Entertainment production company creating spectacular shows and live experiences.",
    highlights: [
      "Live entertainment production",
      "Show design and execution",
      "Artist management"
    ],
    location: "South Africa",
    period: "2018 – Present"
  }
];

// Copied from src/data/companyMetrics.ts
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

const SECTOR_BASELINES: Record<string, number> = {
  "Events/Production": 120000,
  "Projects/Construction": 200000,
  "Consulting/Strategy": 180000,
  "Retail/Apparel": 60000,
  "Tourism/Experiences": 80000,
  "Industrial/B2B Services": 250000,
};

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
    revenue: calculateIndicativeRange(120, "Events/Production"),
  },
  {
    companyId: "360-vision-events-cleaning",
    revenueGrowthPct: 44,
    clientsAcquired: 90,
    projectsCompleted: 68,
    customerSatisfactionPct: 96,
    revenue: { from: 15000000, to: 21600000, isMock: false, basis: "doc" },
  },
  {
    companyId: "strydom-projects",
    revenueGrowthPct: 52,
    clientsAcquired: 102,
    projectsCompleted: 76,
    customerSatisfactionPct: 94,
    revenue: calculateIndicativeRange(102, "Projects/Construction"),
  },
  {
    companyId: "maono-moja-events",
    revenueGrowthPct: 45,
    clientsAcquired: 95,
    projectsCompleted: 73,
    customerSatisfactionPct: 96,
    revenue: calculateIndicativeRange(95, "Events/Production"),
  },
  {
    companyId: "k-and-d-resources",
    revenueGrowthPct: 56,
    clientsAcquired: 130,
    projectsCompleted: 90,
    customerSatisfactionPct: 95,
    revenue: calculateIndicativeRange(130, "Industrial/B2B Services"),
  },
  {
    companyId: "adventure-freaksa",
    revenueGrowthPct: 41,
    clientsAcquired: 88,
    projectsCompleted: 60,
    customerSatisfactionPct: 93,
    revenue: calculateIndicativeRange(88, "Tourism/Experiences"),
  },
  {
    companyId: "veralogix-group",
    revenueGrowthPct: 50,
    clientsAcquired: 110,
    projectsCompleted: 80,
    customerSatisfactionPct: 98,
    revenue: calculateIndicativeRange(110, "Consulting/Strategy"),
  },
  {
    companyId: "bobby-verd",
    revenueGrowthPct: 38,
    clientsAcquired: 76,
    projectsCompleted: 55,
    customerSatisfactionPct: 92,
    revenue: calculateIndicativeRange(76, "Retail/Apparel"),
  },
  {
    companyId: "rubies-and-pearls",
    revenueGrowthPct: 47,
    clientsAcquired: 84,
    projectsCompleted: 61,
    customerSatisfactionPct: 95,
    revenue: { from: 12800000, to: 18800000, isMock: false, basis: "doc" },
  },
  {
    companyId: "prisma-entertainment",
    revenueGrowthPct: 53,
    clientsAcquired: 125,
    projectsCompleted: 89,
    customerSatisfactionPct: 99,
    revenue: calculateIndicativeRange(125, "Events/Production"),
  },
];

// Copied and modified from src/data/an3sKnowledge.ts
export const an3sKnowledge = {
  profile: {
    name: "Andries Liebenberg",
    brand: "AN3S",
    location: "South Africa",
    role: "Growth Strategist & Business Builder",
    yearsExperience: 8,
    companiesBuilt: 10,
    tagline: "I don't just talk growth — I've shipped it.",
  },

  skills: [
    "Business Strategy & Planning",
    "Event Production & Management",
    "Digital Transformation",
    "AI Systems Implementation",
    "Marketing Experiments & Growth Hacking",
    "Project Management",
    "B2B Sales & Client Acquisition",
    "Brand Development",
    "Process Optimization",
    "Team Leadership",
  ],

  timeline: [
    { year: "2017", event: "Founded K AND D RESOURCES - Industrial B2B services" },
    { year: "2018", event: "Launched Strydom Projects (Construction), Veralogix Group (Consulting), Prisma Entertainment (Events)" },
    { year: "2019", event: "Expanded with 360 Vision Events, Maono Moja Events, Rubies and Pearls (Tourism)" },
    { year: "2020", event: "Added 360 Vision Events Cleaning, Adventure FreaksA (Tourism)" },
    { year: "2021", event: "Launched Bobby Verd (Retail/Apparel)" },
    { year: "Present", event: "Managing portfolio of 10 active companies across 5 sectors" },
  ],

  sectors: [
    "Events & Production",
    "Construction & Projects",
    "Consulting & Strategy",
    "Retail & Apparel",
    "Tourism & Experiences",
    "Industrial B2B Services",
  ],

  services: [
    {
      name: "Growth Strategy Consulting",
      description: "Data-driven strategies to scale your business with proven methodologies.",
    },
    {
      name: "Business Process Optimization",
      description: "Streamline operations and improve efficiency across your organization.",
    },
    {
      name: "AI & Automation Implementation",
      description: "Practical AI solutions focused on ROI, not hype. Automate repetitive tasks.",
    },
    {
      name: "Event Production & Management",
      description: "End-to-end event planning and execution for corporate and private events.",
    },
    {
      name: "Marketing Campaign Design",
      description: "Test small, scale fast, measure everything. Data-driven marketing experiments.",
    },
    {
      name: "Digital Transformation Projects",
      description: "Modernize your business with technology solutions that actually work.",
    },
  ],

  stats: {
    totalClientsAcquired: 1020,
    avgGrowthRate: 47,
    avgSatisfaction: 96,
    projectsCompleted: companyMetrics.reduce((sum, m) => sum + m.projectsCompleted, 0),
  },

  methodology: {
    growth: "Data-driven experiments with rapid iteration cycles. Test hypotheses quickly, measure results, and scale what works.",
    aiSystems: "Practical AI automation focused on ROI, not hype. Start with high-impact, low-risk automations and expand from there.",
    marketing: "Test small, scale fast, measure everything. Run controlled experiments before committing large budgets.",
    projects: "Clear milestones, transparent communication, on-time delivery. Regular check-ins and adaptive planning.",
  },

  faqs: [
    {
      question: "What industries do you work in?",
      answer: "I work across Events/Production, Construction, Consulting, Retail, Tourism, and Industrial B2B Services. My experience spans 10 companies in South Africa.",
    },
    {
      question: "Where are you based?",
      answer: "I'm based in South Africa, serving clients across the country. I'm available for remote consulting internationally as well.",
    },
    {
      question: "How can I contact you?",
      answer: "You can reach me via WhatsApp at +27 72 974 9703 or email at book@hello.an3s.info. I typically respond within 24 hours.",
    },
    {
      question: "What makes you different from other consultants?",
      answer: "I've actually built and run 10 companies with real metrics. I don't just advise - I've executed. My approach is data-driven and focused on measurable results.",
    },
    {
      question: "How long do projects typically take?",
      answer: "Project timelines vary based on scope. Strategy consultations can be done in 1-2 weeks. Implementation projects typically run 1-3 months. Event productions depend on the scale.",
    },
    {
      question: "What results have you achieved?",
      answer: "Across my 10 companies: 1,020+ clients acquired, 47% average growth rate, 96% customer satisfaction, and 700+ projects completed.",
    },
    {
      question: "Do you offer retainer services?",
      answer: "Yes, I offer monthly retainer packages for ongoing growth strategy and consulting. This includes regular strategy sessions and priority support.",
    },
    {
      question: "Can you help with AI implementation?",
      answer: "Absolutely. I focus on practical AI automation that delivers ROI - things like process automation, chatbots, data analysis, and workflow optimization.",
    },
  ],

  contact: {
    email: "book@hello.an3s.info",
    whatsapp: "+27 72 974 9703",
    website: "https://an3s.info",
    portfolio: "https://profile.an3s.info",
    linkedin: "https://www.linkedin.com/in/andriesliebenberg-an3s",
    github: "https://github.com/AN3S-CREATE",
    businessHours: "Mon - Fri: 08:00 - 17:00 SAST",
  },

  // Dynamically include companies from the companies data file
  companies: companies.map((c) => ({
    name: c.name,
    sector: c.sector,
    description: c.description,
    location: c.location,
    highlights: c.highlights,
    metrics: companyMetrics.find((m) => m.companyId === c.slug), // FIXED: Use find() instead of indexing
  })),
};

// Generate a formatted knowledge string for the AI system prompt
export function generateKnowledgePrompt(): string {
  const k = an3sKnowledge;

  return `
## PROFILE
Name: ${k.profile.name}
Brand: ${k.profile.brand}
Role: ${k.profile.role}
Location: ${k.profile.location}
Experience: ${k.profile.yearsExperience} years
Companies Built: ${k.profile.companiesBuilt}
Tagline: "${k.profile.tagline}"

## STATS
- Total Clients Acquired: ${k.stats.totalClientsAcquired}+
- Average Growth Rate: ${k.stats.avgGrowthRate}%
- Customer Satisfaction: ${k.stats.avgSatisfaction}%
- Projects Completed: ${k.stats.projectsCompleted}+

## SKILLS
${k.skills.map((s) => `- ${s}`).join("\n")}

## SECTORS
${k.sectors.map((s) => `- ${s}`).join("\n")}

## SERVICES
${k.services.map((s) => `- ${s.name}: ${s.description}`).join("\n")}

## METHODOLOGY
- Growth: ${k.methodology.growth}
- AI Systems: ${k.methodology.aiSystems}
- Marketing: ${k.methodology.marketing}
- Projects: ${k.methodology.projects}

## TIMELINE
${k.timeline.map((t) => `- ${t.year}: ${t.event}`).join("\n")}

## COMPANIES (${k.companies.length} total)
${k.companies
  .map(
    (c) =>
      `- ${c.name} (${c.sector}): ${c.description}. Clients: ${c.metrics?.clientsAcquired || "N/A"}, Projects: ${c.metrics?.projectsCompleted || "N/A"}, Satisfaction: ${c.metrics?.customerSatisfactionPct || "N/A"}%`
  )
  .join("\n")}

## CONTACT
- Email: ${k.contact.email}
- WhatsApp: ${k.contact.whatsapp}
- Website: ${k.contact.website}
- LinkedIn: ${k.contact.linkedin}
- Hours: ${k.contact.businessHours}

## FAQs
${k.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}
`.trim();
}
