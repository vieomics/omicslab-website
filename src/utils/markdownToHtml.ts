import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const processor = (unified() as any)
  .use(remarkParse, { allowHTML: true })
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeHighlight)
  .use(rehypeStringify, { allowDangerousHtml: true });

export default async function markdownToHtml(
  markdown: string,
): Promise<string> {
  const result = await processor.process(markdown);
  return result.toString();
}
