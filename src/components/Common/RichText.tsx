import Link from "next/link";
import { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/paths";
import { TextSegment } from "@/i18n/types";

interface RichTextProps {
  segments: TextSegment[];
  locale: Locale;
  className?: string;
}

/**
 * Renders a translated paragraph that contains inline bold text and internal
 * links, keeping the inline markup out of the translation strings.
 */
export default function RichText({
  segments,
  locale,
  className,
}: RichTextProps) {
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if ("strong" in segment) {
          return <strong key={index}>{segment.strong}</strong>;
        }
        if ("link" in segment) {
          return (
            <Link
              key={index}
              href={localizeHref(segment.link.href, locale)}
              className="underline"
            >
              {segment.link.text}
            </Link>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
}
