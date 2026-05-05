export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(htmlContent: string): TocItem[] {
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-4]>/gi;
  const headings: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].trim(),
    });
  }

  if (headings.length === 0) {
    const altRegex = /<h([2-4])[^>]*>([^<]*)<\/h[2-4]>/gi;
    let altMatch;
    let idCounter = 0;
    while ((altMatch = altRegex.exec(htmlContent)) !== null) {
      const text = altMatch[2].trim();
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
