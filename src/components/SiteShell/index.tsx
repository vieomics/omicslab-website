import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import Providers from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

interface SiteShellProps {
  dict: Dictionary;
  locale: Locale;
  translatedSlugs: string[];
  children: React.ReactNode;
}

/**
 * Shared chrome rendered by both root layouts (Vietnamese and English).
 */
export default function SiteShell({
  dict,
  locale,
  translatedSlugs,
  children,
}: SiteShellProps) {
  return (
    <Providers>
      <div className="isolate">
        <Header dict={dict} locale={locale} translatedSlugs={translatedSlugs} />
        {children}
        <Footer dict={dict} locale={locale} />
        <ScrollToTop label={dict.common.scrollToTop} />
      </div>
    </Providers>
  );
}
