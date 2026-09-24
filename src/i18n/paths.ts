import { Locale, defaultLocale } from "./config";

/**
 * Prefix a locale-independent path with the locale prefix.
 * Vietnamese (default) has no prefix, English is served under /en.
 *
 * localizePath("/about", "vi") -> "/about"
 * localizePath("/about", "en") -> "/en/about"
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return clean || "/";
  }
  return `/${locale}${clean}` || `/${locale}`;
}

/**
 * Prefix internal links with the locale, leaving external URLs untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }
  return localizePath(href, locale);
}

/**
 * Remove the locale prefix from a pathname.
 *
 * stripLocale("/en/about") -> { locale: "en", path: "/about" }
 * stripLocale("/about")     -> { locale: "vi", path: "/about" }
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const englishPrefix = "/en";
  if (
    pathname === englishPrefix ||
    pathname.startsWith(`${englishPrefix}/`)
  ) {
    const rest = pathname.slice(englishPrefix.length);
    return { locale: "en", path: rest || "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

/**
 * Build the equivalent path in the target locale.
 * Blog detail pages without a translation fall back to the blog index.
 */
export function switchLocalePath(
  pathname: string,
  target: Locale,
  translatedSlugs: string[] = [],
): string {
  const { path } = stripLocale(pathname);

  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (!translatedSlugs.includes(slug)) {
      return localizePath("/blogs", target);
    }
    return localizePath(`/blogs/${slug}`, target);
  }

  return localizePath(path, target);
}
