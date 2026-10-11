import { facts, yearsExperience, ventureFacts } from "./facts.ts";
import { services } from "./services.ts";
export const an3sKnowledge = {
 profile: {name:facts.person.value,brand:facts.brand.value,role:facts.descriptor.value,location:facts.serviceArea.value,yearsExperience,tagline:facts.tagline.value},
 services,
 timeline: Object.entries(ventureFacts).map(([slug,fact])=>({year:fact.year,event:slug,role:fact.role})),
 contact:{email:facts.email.value,whatsapp:facts.whatsapp.value,responsePromise:facts.responsePromise.value},
};
/** The concierge shares the same evidence authority as public pages. */
export function generateKnowledgePrompt(): string {return `Verified AN3S information:\n${JSON.stringify(an3sKnowledge,null,2)}\nEstablished: ${facts.established.value}. Tenure is derived from this year, not a verified employment history. Never invent numbers, outcomes, client names, awards won, certifications, prices, timelines or guarantees. No client event permissions are recorded. Roles awaiting confirmation must not be guessed. Refer price and project scope questions to Andries on WhatsApp. Use AN3S, not a different brand. No emojis or exclamation marks.`;}
