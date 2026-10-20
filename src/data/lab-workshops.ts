import type { LabStar } from "./lab";

/** Public documentation is pinned so room claims can be traced to reviewed evidence. */
export interface LabWorkshop extends LabStar {
  repository: string;
  readmeUrl: string;
  reviewedCommit: string;
  reviewedOn: string;
}

// Only documented public repositories with rooms belong here; no private inventory total.
export const labWorkshops: LabWorkshop[] = [];

