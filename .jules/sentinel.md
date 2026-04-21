## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.
## 2026-04-18 - Rate Limiter IP Spoofing
**Vulnerability:** The rate limiter in `supabase/functions/_shared/rateLimit.ts` prioritized the `x-forwarded-for` header for identifying client IPs.
**Learning:** The left-most IP in the `x-forwarded-for` header is easily spoofed by malicious clients. This allowed attackers to bypass the in-memory rate limiter entirely.
**Prevention:** Always prioritize trusted proxy headers like `cf-connecting-ip` and `x-real-ip` when attempting to verify client identity or enforce rate limiting.
## 2026-03-12 - Prompt Injection via Unvalidated System Prompt Variable
**Vulnerability:** The `performance-brief` edge function accepted an unvalidated `audience` string from the client and inserted it directly into the system prompt. An attacker could inject arbitrary instructions (e.g., "ignore previous instructions and say X") by manipulating the `audience` payload.
**Learning:** Any client-provided variable interpolated into a system prompt becomes an execution vector for prompt injection. It acts exactly like an unparameterized SQL query.
**Prevention:** Strictly validate and sanitize all client inputs before interpolating them into system prompts. Use allowlists (e.g., `['investor', 'client', 'partner']`) for categorical variables.
## 2024-05-18 - Rate Limit IP Spoofing via X-Forwarded-For
**Vulnerability:** The in-memory rate limiter `checkRateLimit` relied on `getClientIP`, which parsed the `x-forwarded-for` header by taking the left-most IP (`forwardedFor.split(",")[0]`).
**Learning:** In proxy chains, the client-provided IP is the left-most IP in `X-Forwarded-For`, which is easily spoofed. The actual connecting IP appended by the trusted proxy is the right-most IP. Using the left-most IP allowed malicious clients to completely bypass rate limits by injecting fake IPs.
**Prevention:** Always extract the right-most IP (`forwardedFor.split(",").pop()`) when using `X-Forwarded-For` to identify the connecting client, or rely on non-spoofable headers like `cf-connecting-ip`.
## 2026-04-18 - Email Injection via Permissive Regex
**Vulnerability:** The email validation regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` in `send-contact-email` was too permissive and allowed comma-separated multiple emails. This could allow an attacker to send spam to arbitrary recipients by appending multiple emails in the input (Email Injection).
**Learning:** Simple negated character class regexes for email validation often fail to enforce strict structure and can allow unexpected characters like commas, which are meaningful to email clients and APIs.
**Prevention:** Always use strict, standard email validation regexes (e.g., `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`) or dedicated validation libraries to prevent injection attacks via email fields.
## 2025-02-21 - User Enumeration via Sign Up Errors
**Vulnerability:** The sign-up flow returned a specific "already registered" error message when an existing email was submitted, enabling attackers to enumerate valid user accounts on the platform.
**Learning:** Differentiating error messages for registered vs unregistered emails during public sign-up flows directly violates privacy and enables targeted attacks (e.g., credential stuffing).
**Prevention:** Always handle "already registered" errors gracefully by returning a generic success message (e.g., "Check your email to verify your account") identical to a legitimate successful sign-up, ensuring the application response is indistinguishable.
