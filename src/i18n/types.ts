export type TextSegment =
  | { text: string }
  | { strong: string }
  | { link: { href: string; text: string } };
