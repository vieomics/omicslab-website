import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

function getTextContent(node: any): string {
  if (node.type === "text") return node.value || "";
  if (node.children) return node.children.map(getTextContent).join("");
  return "";
}

function rehypeCopyButton() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "pre") {
        const codeElement = node.children?.[0];
        if (codeElement?.tagName === "code") {
          const textContent = getTextContent(codeElement);

          node.properties = node.properties || {};
          node.properties["data-code"] = textContent;
          node.properties["className"] = node.properties["className"] || [];
          node.properties["className"] = [
            ...node.properties["className"],
            "relative",
          ];
        }
      }
    });
  };
}

const admonitionConfig: Record<string, { label: string; color: string }> = {
  tip: { label: "Tip", color: "#059669" },
  note: { label: "Note", color: "#2563eb" },
  info: { label: "Info", color: "#2563eb" },
  warning: { label: "Warning", color: "#d97706" },
  danger: { label: "Danger", color: "#dc2626" },
  caution: { label: "Caution", color: "#ea580c" },
  important: { label: "Important", color: "#7c3aed" },
};

const bgColors: Record<string, string> = {
  tip: "#f0fdf4",
  note: "#eff6ff",
  info: "#eff6ff",
  warning: "#fefbeb",
  danger: "#fef2f2",
  caution: "#fff7ed",
  important: "#faf5ff",
};

const processor = (unified() as any)
  .use(remarkParse, { allowHTML: true })
  .use(remarkGfm)
  .use(remarkDirective)
  .use(() => (tree: any) => {
    visit(tree, (node: any) => {
      if (node.type === "containerDirective" || node.type === "leafDirective") {
        const type = node.name;
        const config = admonitionConfig[type] || admonitionConfig.note;
        const title = node.attributes?.title || config.label;
        node.data = node.data || {};
        node.data.hName = "div";
        node.data.hProperties = {
          className: `admonition admonition-${type} my-4 rounded-r-lg`,
          style: `border-left: 4px solid ${config.color}; background-color: ${bgColors[type] || bgColors.note}; padding-bottom: 1px`,
          "data-admonition-title": title,
        };
      }
    });
  })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeCopyButton)
  .use(rehypeStringify, { allowDangerousHtml: true });

function addLinkUnderline(html: string): string {
  return html.replace(
    /<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g,
    (match, href, text) => {
      return `<a href="${href}" class="underline">${text}</a>`;
    },
  );
}

export default async function markdownToHtml(
  markdown: string,
): Promise<string> {
  const result = await processor.process(markdown);
  return addLinkUnderline(result.toString());
}
