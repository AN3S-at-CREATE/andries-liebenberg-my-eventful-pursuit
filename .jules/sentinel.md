## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.
## $(date +%Y-%m-%d) - Rate Limiter IP Spoofing
**Vulnerability:** The rate limiter in `supabase/functions/_shared/rateLimit.ts` prioritized the `x-forwarded-for` header for identifying client IPs.
**Learning:** The left-most IP in the `x-forwarded-for` header is easily spoofed by malicious clients. This allowed attackers to bypass the in-memory rate limiter entirely.
**Prevention:** Always prioritize trusted proxy headers like `cf-connecting-ip` and `x-real-ip` when attempting to verify client identity or enforce rate limiting.
## 2026-03-12 - Prompt Injection via Unvalidated System Prompt Variable
**Vulnerability:** The `performance-brief` edge function accepted an unvalidated `audience` string from the client and inserted it directly into the system prompt. An attacker could inject arbitrary instructions (e.g., "ignore previous instructions and say X") by manipulating the `audience` payload.
**Learning:** Any client-provided variable interpolated into a system prompt becomes an execution vector for prompt injection. It acts exactly like an unparameterized SQL query.
**Prevention:** Strictly validate and sanitize all client inputs before interpolating them into system prompts. Use allowlists (e.g., `['investor', 'client', 'partner']`) for categorical variables.
