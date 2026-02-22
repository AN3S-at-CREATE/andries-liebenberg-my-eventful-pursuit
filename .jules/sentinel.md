## 2025-02-21 - Strong Password Policy Pattern
**Vulnerability:** Weak password requirements (min 6 chars) allowed easily guessable passwords.
**Learning:** Separating Sign In and Sign Up schemas allows enforcing strict policies for new accounts while maintaining access for legacy users with weaker passwords. This avoids breaking changes during security upgrades.
**Prevention:** Always use distinct schemas for registration vs authentication when upgrading security policies.

## 2025-02-22 - Prompt Injection in Concierge AI
**Vulnerability:** The AI Knowledge Base was generated on the client-side and sent to the server in the request body, allowing an attacker to inject malicious context or instructions (Prompt Injection).
**Learning:** Never trust client-provided context for AI system prompts. Even if the data seems static (like a company profile), the source of truth must be the server.
**Prevention:** Generate all system prompts and knowledge base context within the trusted environment (Edge Function/Server) and ignore client-provided context parameters.
