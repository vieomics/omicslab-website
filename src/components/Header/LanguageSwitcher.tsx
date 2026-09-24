"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/paths";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  ariaLabel: string;
  translatedSlugs: string[];
  className?: string;
}

export default function LanguageSwitcher({
  locale,
  label,
  ariaLabel,
  translatedSlugs,
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target: Locale = locale === "vi" ? "en" : "vi";
  const href = switchLocalePath(pathname, target, translatedSlugs);

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`text-dark border-stroke hover:border-primary hover:text-primary dark:border-dark-3 flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm font-medium transition duration-300 dark:text-white ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {label}
    </Link>
  );
}
