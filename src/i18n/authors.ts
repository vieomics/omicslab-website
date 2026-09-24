import { Dictionary } from "./dictionaries/en";

/**
 * Author titles come from public/authors.yml in English; the dictionary can
 * provide a localized override keyed by the author key.
 */
export function getAuthorTitle(
  authorKey: string | undefined,
  fallback: string | undefined,
  dict: Dictionary,
): string | undefined {
  if (!authorKey) {
    return fallback;
  }
  const entry = dict.authors[authorKey as keyof Dictionary["authors"]];
  return entry?.title ?? fallback;
}
