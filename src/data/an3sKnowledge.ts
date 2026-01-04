import { companies } from "./companies";
import { companyMetrics } from "./companyMetrics";

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
    projectsCompleted: Object.values(companyMetrics).reduce((sum, m) => sum + m.projectsCompleted, 0),
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
    metrics: companyMetrics[c.slug],
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
