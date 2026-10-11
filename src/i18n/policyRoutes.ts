import type { PolicyPageKey } from "./dictionaries/policies/en";

export type PolicyPageRoute = { key: PolicyPageKey; path: string };

/**
 * Ordered set of policy pages. Drives the legal sidebar, the /policies hub and
 * the sitemap so the set stays consistent in one place.
 */
export const policyPageRoutes: PolicyPageRoute[] = [
  { key: "privacy", path: "/privacy" },
  { key: "terms", path: "/terms" },
  { key: "security", path: "/policies/security" },
  { key: "pricing", path: "/policies/pricing" },
  { key: "payment", path: "/policies/payment" },
  { key: "serviceProvision", path: "/policies/service-provision" },
  { key: "conditions", path: "/policies/conditions" },
  { key: "rightsObligations", path: "/policies/rights-obligations" },
  { key: "complaints", path: "/policies/complaints" },
  { key: "support", path: "/policies/support" },
];

/** Pages served under the /policies/[doc] dynamic route. */
export const policyDocumentRoutes = policyPageRoutes.filter((route) =>
  route.path.startsWith("/policies/"),
);
