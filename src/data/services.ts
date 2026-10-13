import { servicePrices } from "./facts.ts";
export const services = [
  {
    "title": "Graphic Design",
    "prices": servicePrices["Graphic Design"],
    "description": "Brand visuals, layouts and design assets for print and digital use.",
    "icon": "brand-strategy"
  },
  {
    "title": "Marketing & Workflow Automation",
    "prices": servicePrices["Marketing & Workflow Automation"],
    "description": "Campaign setup, connected tools and automation for everyday business workflows.",
    "icon": "experimental-marketing"
  },
  {
    "title": "App Development",
    "prices": servicePrices["App Development"],
    "description": "Business apps with tailored screens, forms and connected workflows.",
    "icon": "web-app-development"
  },
  {
    "title": "Website Design & Development",
    "prices": servicePrices["Website Design & Development"],
    "description": "Website design, development and content structure for your business.",
    "icon": "web-app-development"
  }
] as const;
