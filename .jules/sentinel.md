## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.

## 2025-02-23 - Edge Function Input Validation for LLM Chains
**Vulnerability:** The edge function accepted a raw `messages` array from the client and passed it directly to the LLM API. This allowed role-based prompt injection (e.g., injecting `{ role: "system", content: "..." }`) and potential DoS via massive payloads.
**Learning:** `req.json()` in Deno returns `any` (or `Promise<any>`). Explicitly typing it or casting it without validation is dangerous. Robust validation must sanitize the structure (array), content types (strings), and values (roles) before usage.
**Prevention:** Implement a strict validation layer that filters allowed roles (user/assistant only), truncates content length, and limits message history depth before passing data to upstream AI services.
