## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.

## 2024-05-23 - Rate Limit IP Spoofing
**Vulnerability:** The rate limiter in `supabase/functions/_shared/rateLimit.ts` was vulnerable to IP spoofing because it blindly took the first IP from the `x-forwarded-for` header (`forwardedFor.split(",")[0]`).
**Learning:** Clients can arbitrary inject values at the beginning of the `x-forwarded-for` header, bypassing rate limiting by rotating fake IPs.
**Prevention:** Prioritize `cf-connecting-ip` and `x-real-ip` headers set by trusted infrastructure. When falling back to `x-forwarded-for`, take the right-most IP, as the trusted reverse proxy appends the true client IP to the end of the header list.
