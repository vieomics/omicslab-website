import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeExpressiveCode, {
  createRenderer,
  type RehypeExpressiveCodeOptions,
} from "rehype-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

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

// Expressive Code renders every fenced code block at build time with Shiki
// (VS Code grammars + the `dark-plus` theme) inside an editor or terminal
// frame with line numbers — the same presentation as the docs site
// (opendocs). Its copy-button script is intentionally not injected: article
// bodies are swapped in through `dangerouslySetInnerHTML`, where inline
// scripts never execute, so CodeBlockWrapper owns that behavior instead.
const expressiveCodeOptions: RehypeExpressiveCodeOptions = {
  themes: ["dark-plus"],
  plugins: [pluginLineNumbers()],
  defaultProps: { showLineNumbers: true },
  styleOverrides: {
    borderRadius: "6px",
    codeFontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
    codeFontSize: "0.875rem",
    codeLineHeight: "1.55",
    frames: { frameBoxShadowCssValue: "none" },
  },
  customCreateRenderer: async (options) => {
    const renderer = await createRenderer(options);
    return { ...renderer, jsModules: [] };
  },
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
  // Expressive Code colours the fenced blocks and wraps them in the same
  // code frame used by the docs. Unknown languages (csv, groovy, …) fall
  // back to plain text without failing the build.
  .use(rehypeExpressiveCode, expressiveCodeOptions)
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
