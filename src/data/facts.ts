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
    "value": "book@hello.an3s.info",
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

/** Derived tenure since the verified establishment year, not a separate career claim. */
export const yearsExperience = new Date().getFullYear() - facts.established.value;
export const whatsappNumber = facts.whatsapp.value.replace(/\D/g, "");
export const whatsappUrl = `https://wa.me/${whatsappNumber}`;
/** Build a service-specific contact link without duplicating contact facts. */
export function whatsappLink(message: string): string { return `${whatsappUrl}?text=${encodeURIComponent(message)}`; }

// No client event permissions have been supplied.
export const permittedEvents: { value: string; source: string; year: number; clientPermission: true }[] = [];

// Existing venture periods retained by explicit user instruction; not performance evidence.
export const ventureFacts = {
  "360-vision-events-group": {
    "period": "2019 \u2013 Present",
    "role": "Head of Marketing and Events",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2019
  },
  "360-vision-events-cleaning": {
    "period": "2020 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2020
  },
  "strydom-projects": {
    "period": "2018 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2018
  },
  "maono-moja-events": {
    "period": "2019 \u2013 Present",
    "role": "CMO and Events Manager",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2019
  },
  "k-and-d-resources": {
    "period": "2017 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2017
  },
  "adventure-freaksa": {
    "period": "2020 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2020
  },
  "odm-studio": {
    "period": "2018 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2018
  },
  "bobby-verd": {
    "period": "2021 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2021
  },
  "rubies-and-pearls": {
    "period": "2019 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2019
  },
  "prisma-entertainment": {
    "period": "2018 \u2013 Present",
    "role": "Role awaiting confirmation",
    "source": "Existing portfolio; periods retained by Andries in the 11 October 2026 brief",
    "year": 2018
  }
} as const;
