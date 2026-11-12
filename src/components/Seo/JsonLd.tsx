interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Render schema.org JSON-LD in the document. JSON.stringify output is safe to
 * place in a script tag once `<` is escaped, which prevents a frontmatter value
 * from closing the script element early.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
