import { Locale, defaultLocale } from "./config";
import { en, Dictionary } from "./dictionaries/en";
import { vi } from "./dictionaries/vi";

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export { locales, defaultLocale, isLocale } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./dictionaries/en";
export type { TextSegment } from "./types";
export { localizePath, stripLocale, switchLocalePath } from "./paths";
