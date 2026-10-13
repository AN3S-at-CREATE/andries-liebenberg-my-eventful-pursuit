/** User-confirmed facts only; numerical claims require recorded evidence. */
export const facts = {
  "brand": {
    "value": "AN3S",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "person": {
    "value": "Andries Liebenberg",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "careerStart": {
    "value": 2000,
    "label": "since 2000",
    "source": "Andries cleanup brief, 13 October 2026",
    "year": 2026
  },
  "established": {
    "value": 2003,
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "whatsapp": {
    "value": "+27 72 974 9703",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "email": {
    "value": "create@an3s.info",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "serviceArea": {
    "value": "Gauteng; remote across South Africa",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "responsePromise": {
    "value": "I reply on WhatsApp within one working day",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "tagline": {
    "value": "Fueling growth at the intersection of Strategy, Chaos, and Experimental Tech.",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  },
  "descriptor": {
    "value": "Strategic Development & Growth Advisor for Intelligent Businesses.",
    "source": "Andries authorised content brief, 11 October 2026",
    "year": 2026
  }
} as const;

/** Experience is calculated from the confirmed career start, separately from establishment. */
export const careerStart = facts.careerStart.value;
export const yearsExperience = new Date().getFullYear() - careerStart;
export const whatsappNumber = facts.whatsapp.value.replace(/\D/g, "");
export const whatsappUrl = `https://wa.me/${whatsappNumber}`;
/** Build a service-specific contact link without duplicating contact facts. */
export function whatsappLink(message: string): string { return `${whatsappUrl}?text=${encodeURIComponent(message)}`; }

// No client event permissions have been supplied.
export const permittedEvents: { value: string; source: string; year: number; clientPermission: true }[] = [];

// Only confirmed roles; venture dates are withheld pending confirmation.
export const ventureFacts = {
  "360-vision-events-group": {
    "role": "Head of Marketing and Events",
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "360-vision-events-cleaning": {
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "strydom-projects": {
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "maono-moja-events": {
    "role": "Managing Director (Maono Moja Events Group)",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  "k-and-d-resources": {
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "adventure-freaksa": {
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "odm-studio": {
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "bobby-verd": {
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "rubies-and-pearls": {
    "role": "Head of Business Development",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  "prisma-entertainment": {
    "role": "Project Manager",
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "eventpulse-ai": {
    "name": "EventPulse AI",
    "sector": "AI/Software",
    "role": "Co-Founder & CTO",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  "lynkie-sky-ai": {
    "name": "Lynkie Sky AI",
    "sector": "AI/Software",
    "role": "Co-Founder & Chief Innovation Officer",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  "veralogix-group": {
    "name": "Veralogix Group",
    "sector": "AI & Data Platforms",
    "role": "Group Lead Engineer, AI & Data Platforms",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  }
} as const;

export const careerPeriods = [
  {
    "value": "1999-2004",
    "source": "Existing career timeline retained from portfolio; user authorised metric removal",
    "year": 1999
  },
  {
    "value": "2005-2009",
    "source": "Existing career timeline retained from portfolio; user authorised metric removal",
    "year": 2005
  },
  {
    "value": "2010-2013",
    "source": "Existing career timeline retained from portfolio; user authorised metric removal",
    "year": 2010
  },
  {
    "value": "2014-2022",
    "source": "Existing career timeline retained from portfolio; user authorised metric removal",
    "year": 2014
  },
  {
    "value": "2023-Present",
    "source": "Existing career timeline retained from portfolio; user authorised metric removal",
    "year": 2023
  }
] as const;

// Display names authorised by Andries; no claim of winning or nomination is implied.
export const awardNames = [
  {
    "value": "Africa CEO Forum Awards",
    "source": "Award wall names supplied by Andries, 11 October 2026"
  },
  {
    "value": "Young Entrepreneur of the Year (YE Awards 2019)",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2019
  },
  {
    "value": "South African Small Business Awards",
    "source": "Award wall names supplied by Andries, 11 October 2026"
  },
  {
    "value": "National Presidential Small & Cooperatives Awards 2016",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2016
  },
  {
    "value": "EY Entrepreneur Of The Year",
    "source": "Award wall names supplied by Andries, 11 October 2026"
  },
  {
    "value": "The South African Future Trust Awards 2025",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2025
  },
  {
    "value": "Absa Supplier Development Award",
    "source": "Award wall names supplied by Andries, 11 October 2026"
  },
  {
    "value": "BCX Digital Innovation Awards",
    "source": "Award wall names supplied by Andries, 11 October 2026"
  }
] as const;

/** Current offers and prices supplied by Andries; no inferred scope or results. */
export const serviceOffers = [
  {
    "discipline": "AI Systems & Automation",
    "title": "AI Chatbot / WhatsApp Assistant",
    "description": "Chat assistance for business enquiries.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R4,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "AI Systems & Automation",
    "title": "Automation Starter",
    "description": "Automation for routine business tasks.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R3,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "AI Systems & Automation",
    "title": "AI Workflow Build",
    "description": "Connected workflows with AI steps.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R7,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "AI Systems & Automation",
    "title": "Private AI Knowledge Assistant",
    "description": "Private search and chat for business knowledge.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "quote only after a R2,500 Discovery Sprint",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Business Growth",
    "title": "AI & Growth Audit",
    "description": "A review of AI use and business priorities.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R1,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Web & App Development",
    "title": "Websites",
    "description": "Website design and development.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "R2,999 one-page / R4,500 up to 5 pages",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Web & App Development",
    "title": "Custom Business System / CRM / Portal",
    "description": "Business systems, CRM tools and portals.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R9,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Web & App Development",
    "title": "Integration & Custom Script",
    "description": "Connections and scripts for business tools.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R7,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Web & App Development",
    "title": "UI/UX Design & Clickable Prototype",
    "description": "Interface design and interactive prototypes.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "from R3,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Web & App Development",
    "title": "Mobile App",
    "description": "Mobile application development.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "on request",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "Brand Strategy",
    "title": "Logo / Brand Identity",
    "description": "Logo design and brand identity.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "Logo from R1,500 / Brand Identity from R3,500",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  },
  {
    "discipline": "3D Virtualization & Events",
    "title": "Event 3D Visualisation & Technical Plan",
    "description": "Event layouts and technical planning in 3D.",
    "descriptionSource": "Andries approved neutral service descriptions, 13 October 2026",
    "price": "quote only",
    "vat": "excl. VAT if applicable",
    "source": "Andries content update, 13 October 2026",
    "year": 2026
  }
] as const;

/** Confirmed launch wording, separate from withheld venture periods. */
export const lynkieSkyLaunch = {
  "value": "Launched 2025",
  "source": "Andries content update, 13 October 2026",
  "year": 2025
} as const;

/** Exact CV evidence authorised for About and AI Systems. */
export const proofOfWork = {
  "title": "Andries's work while at Veralogix Group",
  "source": "CV p3",
  "items": [
    {
      "value": "Built a self-hosted group data lake and a private AI chat platform, keeping sensitive data on group infrastructure in line with POPIA.",
      "source": "CV p3"
    },
    {
      "value": "Built a document-search AI (RAG) pipeline: 83,838 chunks, all PII-scanned.",
      "source": "CV p3"
    },
    {
      "value": "Took FlowLogix, an offline-first collaboration platform, from first commit to production readiness in 7 days.",
      "source": "CV p3"
    },
    {
      "value": "68 repos and 617 commits in a 60-day window.",
      "source": "CV p3"
    }
  ]
} as const;
