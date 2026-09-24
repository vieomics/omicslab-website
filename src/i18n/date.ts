import { format } from "date-fns";
import { enUS, vi as viLocale } from "date-fns/locale";
import { Locale } from "./config";

export function formatDate(date: string | Date, locale: Locale): string {
  const value = typeof date === "string" ? new Date(date) : date;
  if (isNaN(value.getTime())) {
    return "";
  }
  const pattern = locale === "vi" ? "d MMMM, yyyy" : "dd MMM yyyy";
  return format(value, pattern, {
    locale: locale === "vi" ? viLocale : enUS,
  });
}
