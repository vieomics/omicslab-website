export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Headings are extracted from rendered HTML, where characters such as `&` are
 * entity-encoded (`&amp;`, `&#x26;`). Decode them so the ToC renders the
 * actual text instead of the raw entity.
 */
function decodeEntities(text: string): string {
  const named: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&nbsp;": " ",
  };

  const fromCodePoint = (value: number, fallback: string): string =>
    Number.isFinite(value) && value >= 0 && value <= 0x10ffff
      ? String.fromCodePoint(value)
      : fallback;

  return text
    .replace(/&#x([0-9a-f]+);/gi, (match, hex: string) =>
      fromCodePoint(parseInt(hex, 16), match),
    )
    .replace(/&#(\d+);/g, (match, dec: string) =>
      fromCodePoint(parseInt(dec, 10), match),
    )
    .replace(
      /&(amp|lt|gt|quot|apos|#39|nbsp);/g,
      (match) => named[match] ?? match,
    );
}

export function extractHeadings(htmlContent: string): TocItem[] {
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-4]>/gi;
  const headings: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: decodeEntities(match[3].trim()),
    });
  }

  if (headings.length === 0) {
    const altRegex = /<h([2-4])[^>]*>([^<]*)<\/h[2-4]>/gi;
    let altMatch;
    let idCounter = 0;
    while ((altMatch = altRegex.exec(htmlContent)) !== null) {
      const text = decodeEntities(altMatch[2].trim());
      const id =
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || `heading-${idCounter++}`;
      headings.push({
        level: parseInt(altMatch[1]),
        id,
        text,
      });
    }
  }

  return headings;
}
