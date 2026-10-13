import { facts, yearsExperience, ventureFacts } from "./facts.ts";
import { services } from "./services.ts";
export const an3sKnowledge = {
 profile: {name:facts.person.value,brand:facts.brand.value,role:facts.descriptor.value,location:facts.serviceArea.value,yearsExperience,experience:facts.careerStart.label,tagline:facts.tagline.value},
 services,
 timeline: Object.entries(ventureFacts).map(([slug,fact])=>({event:slug,...(fact.role ? {role:fact.role} : {})})),
 contact:{email:facts.email.value,whatsapp:facts.whatsapp.value,responsePromise:facts.responsePromise.value},
};
/** The concierge shares the same evidence authority as public pages. */
export function generateKnowledgePrompt(): string {return `Verified AN3S information:\n${JSON.stringify(an3sKnowledge,null,2)}\nEstablished: ${facts.established.value}. Career experience must always be described as "since 2000", never as a count of years. Venture dates are unconfirmed and must not be stated. Never invent numbers, outcomes, client names, awards won, certifications, unsupplied prices, timelines or guarantees. No client event permissions are recorded. Only the recorded venture roles are confirmed; omit all others. Use the supplied service prices with "excl. VAT if applicable". Refer additional price and project scope questions to Andries on WhatsApp. Use AN3S, not a different brand. No emojis or exclamation marks.`;}
