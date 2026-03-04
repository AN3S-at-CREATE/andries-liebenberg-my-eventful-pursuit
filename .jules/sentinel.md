## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-21 - Prompt Injection via Client-Side Context
**Vulnerability:** The AI's "knowledge base" (system prompt context) was sent by the client in the API request body. This allowed malicious users to inject false instructions or override system rules by manipulating the request payload (Prompt Injection).
**Learning:** Never trust the client to provide the "source of truth" context for an AI agent. The context must be generated or retrieved server-side where it cannot be tampered with.
**Prevention:** Hardcode or retrieve context data within the Edge Function. Client input should be strictly limited to the user's message.

## 2025-02-21 - Lack of Deep Validation in AI Edge Functions
**Vulnerability:** Weak or missing validation of `req.json()` payloads allowed for potential Prompt Injection (e.g., submitting messages with a `"system"` role) and Denial of Service (DoS) attacks via oversized message arrays or exceedingly long content strings in AI functions.
**Learning:** Using implicit `any` and assuming incoming payloads conform to an expected interface leaves API endpoints vulnerable. Validating shape but not content bounds (length/size) is insufficient to protect AI models and gateway resources.
**Prevention:** Always parse incoming JSON as `unknown`, then explicitly validate its structure and values. Enforce strict array length limits, string length limits, and enum checks for critical fields like `role`.
