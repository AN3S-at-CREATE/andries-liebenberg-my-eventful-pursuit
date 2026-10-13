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
    "role": "Head of Marketing and Events",
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
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
    "role": null,
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
    "year": 2026
  },
  "prisma-entertainment": {
    "role": "Project Manager",
    "source": "Andries confirmed roles; venture dates withheld, 13 October 2026",
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
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2026
  },
  {
    "value": "Young Entrepreneur of the Year (YE Awards 2019)",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2019
  },
  {
    "value": "South African Small Business Awards",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2026
  },
  {
    "value": "National Presidential Small & Cooperatives Awards 2016",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2016
  },
  {
    "value": "EY Entrepreneur Of The Year",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2026
  },
  {
    "value": "The South African Future Trust Awards 2025",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2025
  },
  {
    "value": "Absa Supplier Development Award",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2026
  },
  {
    "value": "BCX Digital Innovation Awards",
    "source": "Award wall names supplied by Andries, 11 October 2026",
    "year": 2026
  }
] as const;

/** Prices supplied by Andries; each offer carries its VAT qualification. */
export const servicePrices = {
  "Graphic Design": [
    {
      "value": "Logo Starter from R1,500",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    },
    {
      "value": "Brand Identity Starter from R3,500",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    }
  ],
  "Website Design & Development": [
    {
      "value": "One-page site from R2,999",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    },
    {
      "value": "Starter Website (up to 5 pages) R4,500",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    },
    {
      "value": "Care Plan R650 per month",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    }
  ],
  "Marketing & Workflow Automation": [
    {
      "value": "Automation Starter (one workflow) from R3,500",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    }
  ],
  "App Development": [
    {
      "value": "Simple web app or portal from R9,500",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    },
    {
      "value": "Discovery Sprint R2,500, credited against the build",
      "vat": "excl. VAT if applicable",
      "source": "Andries supplied service prices, 13 October 2026",
      "year": 2026
    }
  ]
} as const;
