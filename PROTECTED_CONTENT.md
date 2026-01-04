# PROTECTED CONTENT REGISTRY

> **RULE:** Nothing in this list may be removed. If restructuring is needed, duplicate/move content but do not delete. Only additive changes allowed.

---

## 1. Routes & Pages (DO NOT DELETE)

| Route | Page Component | File Path |
|-------|---------------|-----------|
| `/` | Index (Home) | `src/pages/Index.tsx` |
| `/companies` | Companies | `src/pages/Companies.tsx` |
| `/companies/:slug` | CompanyDetail | `src/pages/CompanyDetail.tsx` |
| `/contact` | Contact | `src/pages/Contact.tsx` |
| `*` | NotFound (404) | `src/pages/NotFound.tsx` |

---

## 2. Major UI Sections by Page (DO NOT DELETE)

### Home Page (`/`)
- Hero Section: "I don't just talk growth — I've shipped it."
- Stats Section: Companies Built (10), Clients Acquired (1,020+), Avg. Growth (47%), Avg. Satisfaction (96%)
- **AI Tools Section**: Growth Diagnostic, AN3S Concierge, ROI Calculator
- Companies Preview: Grid of featured companies
- Contact Section: "Ready to grow your business?" with ContactForm

### Companies Page (`/companies`)
- Hero: "Companies I Built" headline + description
- Performance Brief Modal (AI-powered)
- Book a Growth Call CTA (WhatsApp)
- Company Grid with all 10 companies

### Company Detail Page (`/companies/:slug`)
- Header: Company name, sector badge, description, location, period
- Performance Metrics: Revenue Range, Revenue Growth, Customer Satisfaction, Clients Acquired, Projects Completed
- Key Highlights: Bullet list of achievements
- CTA Strip: WhatsApp + Email buttons
- Navigation: Previous/Next company links

### Contact Page (`/contact`)
- Hero: "Get in Touch" headline
- Contact Form: Name, email, message fields
- Contact Information Card: Email, Phone/WhatsApp, Location, Business Hours
- Social Links: GitHub, LinkedIn
- Map: Google Maps embed (South Africa)
- Quick Links: an3s.info, Portfolio

---

## 3. Layout Components (DO NOT DELETE)

### Navbar (`src/components/layout/Navbar.tsx`)
- AN3S Logo/Brand
- Navigation Links: Home, Companies, Portfolio, Contact
- Social Icons: GitHub, LinkedIn
- WhatsApp CTA Button
- Mobile Menu (Sheet/hamburger)

### Footer (`src/components/layout/Footer.tsx`)
- AN3S Brand + Description
- Contact: email@hello.an3s.info, book@hello.an3s.info, +27 72 974 9703
- Links: an3s.info, Portfolio, GitHub, LinkedIn
- Copyright + POPIA notice

### Floating Concierge Button (`src/components/ai-tools/FloatingConciergeButton.tsx`)
- Fixed position bottom-right on all pages
- First-visit tooltip onboarding
- Opens AN3S Concierge modal

---

## 4. Data Files & Datasets (DO NOT DELETE)

### `src/data/companies.ts`
Contains 10 South African companies:
1. 360 Vision Events (Group) - Events/Production
2. 360 Vision Events Cleaning - Events/Production
3. Strydom Projects - Projects/Construction
4. Maono Moja Events - Events/Production
5. K AND D RESOURCES - Industrial/B2B Services
6. Adventure FreaksA - Tourism/Experiences
7. Veralogix Group - Consulting/Strategy
8. Bobby Verd - Retail/Apparel
9. Rubies and Pearls - Tourism/Experiences
10. Prisma Entertainment - Events/Production

### `src/data/companyMetrics.ts`
- Sector baselines (ZAR per client per year)
- Revenue calculations (indicative ranges)
- Per-company metrics: revenueGrowthPct, clientsAcquired, projectsCompleted, customerSatisfactionPct
- TruthBadge basis: "doc" (verified) or "model" (indicative)

### `src/data/an3sKnowledge.ts`
- Profile information (name, brand, location, role, experience)
- Skills list (10 core competencies)
- Timeline (2017-Present company history)
- Sectors served (6 industries)
- Services offered (6 service categories)
- Aggregate stats (clients, growth, satisfaction, projects)
- Methodology (growth, AI systems, marketing, projects)
- FAQs (8 common questions with answers)
- Contact information

---

## 5. AI/Tool Components (DO NOT DELETE)

### IMPLEMENTED ✅

| Component | File Path | Description |
|-----------|-----------|-------------|
| Performance Brief Modal | `src/components/companies/PerformanceBriefModal.tsx` | AI-generated company performance briefs |
| AN3S Concierge Modal | `src/components/ai-tools/concierge/ConciergeModal.tsx` | AI chat assistant with category tabs |
| Concierge Chat Message | `src/components/ai-tools/concierge/ChatMessage.tsx` | Individual chat message bubbles |
| Concierge Category Tabs | `src/components/ai-tools/concierge/CategoryTabs.tsx` | Growth/AI/Marketing/Projects tabs |
| Concierge Suggested Prompts | `src/components/ai-tools/concierge/SuggestedPrompts.tsx` | Category-specific prompt chips |
| ROI Calculator Modal | `src/components/ai-tools/calculator/ROICalculatorModal.tsx` | Interactive sliders + chart + ZAR output |
| AI Tool Card | `src/components/ai-tools/AIToolCard.tsx` | Reusable card component for AI tools |
| AI Tools Section | `src/components/ai-tools/AIToolsSection.tsx` | Home page section with 3 tool cards |
| Floating Concierge Button | `src/components/ai-tools/FloatingConciergeButton.tsx` | Global floating chat button |

### PLANNED ⏳

| Component | Description | Status |
|-----------|-------------|--------|
| AI Growth Diagnostic Wizard | Multi-step wizard to diagnose business growth needs | ⏳ Planned |

---

## 6. Edge Functions (DO NOT DELETE)

| Function | File Path | Description |
|----------|-----------|-------------|
| performance-brief | `supabase/functions/performance-brief/index.ts` | AI performance brief generation |
| send-contact-email | `supabase/functions/send-contact-email/index.ts` | Contact form email sending via Resend |
| an3s-concierge | `supabase/functions/an3s-concierge/index.ts` | AI chat with knowledge base constraints |

---

## 7. Hooks (DO NOT DELETE)

| Hook | File Path | Description |
|------|-----------|-------------|
| useConciergeChat | `src/hooks/useConciergeChat.ts` | Chat state, streaming, rate limiting |
| use-mobile | `src/hooks/use-mobile.tsx` | Mobile breakpoint detection |
| use-toast | `src/hooks/use-toast.ts` | Toast notifications |

---

## 8. Utility Files (DO NOT DELETE)

| File | Purpose |
|------|---------|
| `src/lib/formatters.ts` | ZAR currency formatting, percentages, numbers |
| `src/lib/utils.ts` | Tailwind class merge utilities |
| `src/index.css` | AN3S theme tokens (cyberpink neon) |

---

## 9. Contact Information (DO NOT DELETE)

- **Primary Email:** email@hello.an3s.info
- **Booking Email:** book@hello.an3s.info
- **WhatsApp/Phone:** +27 72 974 9703
- **GitHub:** https://github.com/AN3S-CREATE
- **LinkedIn:** https://www.linkedin.com/in/andriesliebenberg-an3s
- **Portfolio:** https://profile.an3s.info
- **Website:** https://an3s.info
- **Location:** South Africa
- **Business Hours:** Mon - Fri: 08:00 - 17:00 SAST

---

## Verification

Before any restructuring, verify all items above still exist. If moving content:
1. Document the new location
2. Update this registry
3. Never delete - only relocate
