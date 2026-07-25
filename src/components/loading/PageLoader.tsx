import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh] w-full"
      role="status"
      aria-label="Loading content"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
    </div>
  );
}
