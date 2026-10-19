export const LYNKIE_SAFETY_MESSAGE = "This demo can't help with that. If a child is in danger, contact Childline South Africa on 116 (free, 24 hours).";

/** Remove specified identifiers before either client state or model processing. */
export function scrubLabPii(text: string): string {
  return text
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[removed]")
    .replace(/(?<!\d)\d{13}(?!\d)/g, "[removed]")
    .replace(/(?<![\w+])(?:\+27(?:\s*\d){9}|0(?:\s*\d){9})(?!\s*\d)/g, "[removed]");
}

/** A deterministic guard bypasses generation for high-risk child-safety requests. */
export function needsLynkieSafetyResponse(text: string): boolean {
  return /\b(?:self[\s-]?harm|suicid\w*|abuse[dr]?|abusive|molest\w*|hurt(?:ing)?\s+(?:me|by\s+(?:someone|somebody))|(?:someone|somebody|he|she|they)\s+(?:(?:is|are|has|have)\s+)?(?:hurts?|hurting|hit(?:ting)?|beat(?:ing)?)(?:\s+me)?|kill\s+myself|cut\s+myself|selfmoord|mishandel\w*)\b/i.test(text);
}
