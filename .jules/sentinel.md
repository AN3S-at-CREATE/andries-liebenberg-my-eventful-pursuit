## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.

## 2025-02-23 - Edge Function Input Validation & DoS Protection
**Vulnerability:** The `an3s-concierge` edge function passed the raw `messages` array from the client directly to the LLM API. This allowed potential Prompt Injection (by injecting "system" roles) and Denial of Service / Cost attacks (by sending massive message histories or huge content strings).
**Learning:** Edge functions acting as AI gateways must be the gatekeepers of both *content* (what is said) and *structure* (how much is said). Validating the structure (array length, string length, allowed roles) is as critical as the prompt itself to prevent abuse and ensure budget safety.
**Prevention:** Always implement strict schema validation for AI endpoints:
1. Enforce a maximum number of messages (slice the tail).
2. Whitelist allowed roles (e.g., only 'user'/'assistant').
3. Enforce character limits on message content.
