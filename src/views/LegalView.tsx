import Legal from "@/components/Legal";
import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
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
  const pages = [
    { path: "/privacy", label: dict.policies.privacy.navTitle },
    { path: "/terms", label: dict.policies.terms.navTitle },
    { path: "/security", label: dict.policies.security.navTitle },
    { path: "/security/compliance", label: dict.policies.compliance.navTitle },
    {
      path: "/security/responsibility",
      label: dict.policies.responsibility.navTitle,
    },
  ];

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
