## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.

## 2024-05-24 - Rate Limiting IP Spoofing Prevention
**Vulnerability:** The Edge Functions use `x-forwarded-for` header to identify client IPs before checking `cf-connecting-ip` and `x-real-ip`. The `x-forwarded-for` header can be easily spoofed by attackers by setting it to a fake IP in their request.
**Learning:** `cf-connecting-ip` (Cloudflare) or `x-real-ip` are generally trusted headers set by the proxy/WAF. `x-forwarded-for` can contain client-provided values. Prioritizing `x-forwarded-for` allows bypassing IP-based rate limits.
**Prevention:** Prioritize trusted headers like `cf-connecting-ip` and `x-real-ip` before falling back to `x-forwarded-for`.
