import Legal from "@/components/Legal";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { policyPageRoutes } from "@/i18n/policyRoutes";
import type { PolicyPage } from "@/i18n/dictionaries/policies/en";

interface LegalViewProps {
  dict: Dictionary;
  locale: Locale;
  /** Locale-independent path of the page being rendered, e.g. "/privacy". */
  path: string;
  page: PolicyPage;
}

export default function LegalView({
  dict,
  locale,
  path,
  page,
}: LegalViewProps) {
  const pages = policyPageRoutes.map((route) => ({
    path: route.path,
    label: dict.policies[route.key].navTitle,
  }));

  return (
    <Legal
      page={page}
      pages={pages}
      currentPath={path}
      locale={locale}
      shared={dict.policies.shared}
    />
  );
}
