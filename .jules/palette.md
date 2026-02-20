## 2024-05-23 - Accessibility of Icon-Only Links
**Learning:** Icon-only links (e.g., social media icons) were found implemented as raw `<a>` tags containing `lucide-react` icons, lacking both `aria-label` for screen readers and tooltips for mouse users. This creates a significant accessibility barrier and poor UX.
**Action:** Systematically wrap all icon-only interactive elements with Shadcn UI `Tooltip` components and enforce `aria-label` attributes on the interactive element itself.
