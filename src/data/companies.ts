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

export const getCompanyBySlug = (slug: string): Company | undefined =>
  companies.find((c) => c.slug === slug);

export const getCompanyById = (id: string): Company | undefined =>
  companies.find((c) => c.id === id);
