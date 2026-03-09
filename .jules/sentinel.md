## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.

## 2025-03-09 - IP Spoofing Rate Limit Bypass
**Vulnerability:** The rate limiting logic `getClientIP` checked the `x-forwarded-for` header before more secure proxy headers like `cf-connecting-ip`. This allowed an attacker to bypass rate limiting simply by setting a fake IP address in the `x-forwarded-for` header.
**Learning:** `x-forwarded-for` is easily spoofed by the client, and the left-most IP should not be trusted if the request goes through a proxy that sets trusted headers (like Cloudflare).
**Prevention:** Always prioritize trusted proxy headers (`cf-connecting-ip`, `x-real-ip`) over `x-forwarded-for` when identifying the client IP for security or rate-limiting purposes.
