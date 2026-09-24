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
      className={`flex items-center gap-2 border border-white/25 px-3 py-2 text-[10px] font-bold tracking-[0.14em] text-[#d9dcdf] uppercase transition-colors hover:border-accent hover:text-accent ${className}`}
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
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
