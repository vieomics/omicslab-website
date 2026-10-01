import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
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

/**
 * Wrap each table in a scroll container. Tables with 5+ columns are allowed
 * to grow to their content width and scroll horizontally, instead of being
 * squeezed to 100% and wrapping every cell.
 */
function rehypeWrapTables() {
  return (tree: any) => {
    const matches: Array<{ parent: any; index: number; node: any }> = [];

    const walk = (node: any) => {
      if (!node || !Array.isArray(node.children)) return;
      node.children.forEach((child: any, index: number) => {
        if (child && child.tagName === "table") {
          matches.push({ parent: node, index, node: child });
        } else {
          walk(child);
        }
      });
    };
    walk(tree);

    for (const { parent, index, node } of matches) {
      const countTag = (n: any, tag: string): number => {
        if (!n) return 0;
        let count = n.tagName === tag ? 1 : 0;
        (n.children || []).forEach((child: any) => {
          count += countTag(child, tag);
        });
        return count;
      };
      const columns = countTag(node, "th") || countTag(node, "td");
      const classes = ["table-wrap"];
      if (columns >= 5) classes.push("table-wrap-wide");

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: classes },
        children: [node],
      };
    }
  };
}

const admonitionConfig: Record<string, { label: string; border: string }> = {
  tip: { label: "Tip", border: "#111111" },
  note: { label: "Note", border: "#6c6c6c" },
  info: { label: "Info", border: "#6c6c6c" },
  warning: { label: "Warning", border: "#2a2a2a" },
  danger: { label: "Danger", border: "#111111" },
  caution: { label: "Caution", border: "#2a2a2a" },
  important: { label: "Important", border: "#111111" },
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
          className: `admonition admonition-${type} my-4`,
          style: `border-left: 4px solid ${config.border}; background-color: #fafafa; padding-bottom: 1px`,
          "data-admonition-title": title,
        };
      }
    });
  })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  // Colour the fenced blocks (`language-bash` and friends). Only tagged
  // blocks are highlighted — detection stays off so terminal output keeps
  // its literal text. csv/groovy are not in highlight.js' common set and
  // are listed as plain text to avoid a missing-language notice per block.
  .use(rehypeHighlight, { plainText: ["csv", "groovy"] })
  .use(rehypeCopyButton)
  .use(rehypeWrapTables)
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
