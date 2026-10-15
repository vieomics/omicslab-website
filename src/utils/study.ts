import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Locale } from "@/i18n/config";
import markdownToHtml from "./markdownToHtml";
import { getPostBySlug } from "./markdown";
import { extractHeadings, type TocItem } from "./toc";

/**
 * Study content lives in `public/study/<locale>/<track>/` as markdown files so a
 * new course is added by dropping files in place, with no code change:
 *
 *   public/study/vi/wgs-bacterial-metagenomics/_track.md   course metadata
 *   public/study/vi/wgs-bacterial-metagenomics/01-*.md     lessons, ordered
 *
 * Lesson frontmatter (title, description, order, module, duration, level,
 * related) drives the curriculum; the body is rendered through the same
 * markdown pipeline as the blog.
 */

const studyRoot = join(process.cwd(), "public/study");

export interface StudyLessonMeta {
  /** URL segment, e.g. "assembly-with-nf-core-bacass". */
  slug: string;
  title: string;
  description: string;
  /** Position across the whole track; the curriculum is sorted by it. */
  order: number;
  /** Module heading the lesson belongs to (groups consecutive lessons). */
  module: string;
  duration: string;
  level?: string;
}

export interface StudyModule {
  title: string;
  lessons: StudyLessonMeta[];
}

export interface StudyTrackMeta {
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  outcomes: string[];
  tools: string[];
}

export interface StudyTrack extends StudyTrackMeta {
  modules: StudyModule[];
  /** Lessons in curriculum order, flattened across modules. */
  lessons: StudyLessonMeta[];
  lessonCount: number;
}

export interface StudyLesson {
  track: StudyTrack;
  lesson: StudyLessonMeta;
  /** Index of the lesson within the track (0-based). */
  index: number;
  content: string;
  headings: TocItem[];
  related: { slug: string; title: string; excerpt?: string }[];
}

function localeDirectory(locale: Locale): string {
  return join(studyRoot, locale);
}

function trackDirectory(locale: Locale, trackSlug: string): string {
  return join(localeDirectory(locale), trackSlug);
}

/** Track folders that carry a `_track.md` file, newest additions last. */
export function getTrackSlugs(locale: Locale): string[] {
  const base = localeDirectory(locale);
  if (!fs.existsSync(base)) return [];

  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(join(base, entry.name, "_track.md")),
    )
    .map((entry) => entry.name)
    .sort();
}

function readTrackMeta(locale: Locale, trackSlug: string): StudyTrackMeta | null {
  const file = join(trackDirectory(locale, trackSlug), "_track.md");
  if (!fs.existsSync(file)) return null;

  const { data } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug: (data.slug as string) || trackSlug,
    title: (data.title as string) || trackSlug,
    description: (data.description as string) || "",
    level: (data.level as string) || "",
    duration: (data.duration as string) || "",
    outcomes: Array.isArray(data.outcomes) ? (data.outcomes as string[]) : [],
    tools: Array.isArray(data.tools) ? (data.tools as string[]) : [],
  };
}

function lessonFileNames(locale: Locale, trackSlug: string): string[] {
  const dir = trackDirectory(locale, trackSlug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .sort();
}

function readLessonMeta(
  locale: Locale,
  trackSlug: string,
  fileName: string,
): StudyLessonMeta {
  const file = join(trackDirectory(locale, trackSlug), fileName);
  const { data } = matter(fs.readFileSync(file, "utf8"));
  const fallbackSlug = fileName.replace(/^\d+-/, "").replace(/\.md$/, "");

  return {
    slug: (data.slug as string) || fallbackSlug,
    title: (data.title as string) || fallbackSlug,
    description: (data.description as string) || "",
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : 0,
    module: (data.module as string) || "",
    duration: (data.duration as string) || "",
    level: data.level as string | undefined,
  };
}

/** A track with its curriculum, or null when the folder does not exist. */
export function getTrack(locale: Locale, trackSlug: string): StudyTrack | null {
  const meta = readTrackMeta(locale, trackSlug);
  if (!meta) return null;

  const lessons = lessonFileNames(locale, trackSlug)
    .map((fileName) => readLessonMeta(locale, trackSlug, fileName))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  const modules: StudyModule[] = [];
  for (const lesson of lessons) {
    let current = modules.find((item) => item.title === lesson.module);
    if (!current) {
      current = { title: lesson.module, lessons: [] };
      modules.push(current);
    }
    current.lessons.push(lesson);
  }

  return { ...meta, modules, lessons, lessonCount: lessons.length };
}

/** Every track for a locale, in curriculum order. */
export function getAllTracks(locale: Locale): StudyTrack[] {
  return getTrackSlugs(locale)
    .map((slug) => getTrack(locale, slug))
    .filter((track): track is StudyTrack => track !== null);
}

/** Flat list of `{ track, lesson }` pairs across every track (for routing). */
export function getAllStudyParams(
  locale: Locale,
): { track: string; lesson: string }[] {
  return getAllTracks(locale).flatMap((track) =>
    track.lessons.map((lesson) => ({ track: track.slug, lesson: lesson.slug })),
  );
}

function findLessonFile(
  locale: Locale,
  trackSlug: string,
  lessonSlug: string,
): string | null {
  const realSlug = lessonSlug.replace(/\.md$/, "");
  for (const fileName of lessonFileNames(locale, trackSlug)) {
    const meta = readLessonMeta(locale, trackSlug, fileName);
    if (meta.slug === realSlug) return fileName;
  }
  return null;
}

/**
 * Resolve an image referenced from a lesson. Relative paths live next to the
 * lessons (`.../<track>/imgs/`); the other locale is used as a fallback so a
 * translation can reuse the original artwork.
 */
function resolveImageSrc(
  locale: Locale,
  trackSlug: string,
  src: string,
): string {
  if (src.startsWith("/") || src.startsWith("http")) return src;

  const relative = src.replace(/^\.\//, "");
  const candidates: Locale[] = locale === "vi" ? ["vi", "en"] : ["en", "vi"];

  for (const candidate of candidates) {
    const absolute = join(studyRoot, candidate, trackSlug, relative);
    if (fs.existsSync(absolute)) {
      return `/study/${candidate}/${trackSlug}/${relative}`;
    }
  }

  return `/study/${locale}/${trackSlug}/${relative}`;
}

function isPublicFile(src: string): boolean {
  if (src.startsWith("http")) return true;
  const relative = src.replace(/^\//, "");
  return fs.existsSync(join(process.cwd(), "public", relative));
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function readAttribute(attrs: string, name: string): string {
  const match = attrs.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? match[1] : "";
}

/**
 * Turn rendered images into `<figure>` blocks: the markdown title (or the alt
 * text) becomes the caption. Images whose file is not present yet render a
 * labelled placeholder box instead, so the layout can be reviewed before the
 * artwork is produced.
 */
function renderFigures(
  html: string,
  locale: Locale,
  trackSlug: string,
  figureLabel: string,
): string {
  const wrap = (imgTag: string): string => {
    const attrs = imgTag.replace(/^<img\s*/i, "").replace(/\/?>$/, "");
    const src = resolveImageSrc(locale, trackSlug, readAttribute(attrs, "src"));
    const alt = readAttribute(attrs, "alt");
    const title = readAttribute(attrs, "title");
    const caption = title || alt;

    const media = isPublicFile(src)
      ? `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" loading="lazy" />`
      : `<div class="study-figure-placeholder" role="img" aria-label="${escapeAttribute(
          alt || caption,
        )}"><span>${escapeAttribute(figureLabel)}</span></div>`;

    const captionHtml = caption
      ? `<figcaption>${caption}</figcaption>`
      : "";

    return `<figure class="study-figure">${media}${captionHtml}</figure>`;
  };

  let output = html.replace(/<img\s+[^>]*?\/?>/gi, (img) => wrap(img));
  // The pipeline wraps a lone image in a paragraph; lift the figure back out.
  output = output.replace(
    /<p>\s*(<figure[\s\S]*?<\/figure>)\s*<\/p>/gi,
    "$1",
  );
  return output;
}

/** Rewrite relative markdown image paths before the pipeline runs. */
function rewriteMarkdownImages(
  markdown: string,
  locale: Locale,
  trackSlug: string,
): string {
  return markdown.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_match, alt: string, src: string, title?: string) => {
      const resolved = resolveImageSrc(locale, trackSlug, src);
      return title
        ? `![${alt}](${resolved} "${title}")`
        : `![${alt}](${resolved})`;
    },
  );
}

export async function getStudyLesson(
  locale: Locale,
  trackSlug: string,
  lessonSlug: string,
  figureLabel: string,
): Promise<StudyLesson | null> {
  const track = getTrack(locale, trackSlug);
  if (!track) return null;

  const fileName = findLessonFile(locale, trackSlug, lessonSlug);
  if (!fileName) return null;

  const file = join(trackDirectory(locale, trackSlug), fileName);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  const index = track.lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  const lesson = index >= 0 ? track.lessons[index] : null;
  if (!lesson) return null;

  const prepared = rewriteMarkdownImages(content, locale, trackSlug);
  const rendered = await markdownToHtml(prepared);
  const html = renderFigures(rendered, locale, trackSlug, figureLabel);

  const relatedSlugs: string[] = Array.isArray(data.related)
    ? (data.related as string[])
    : [];
  const related: { slug: string; title: string; excerpt?: string }[] = [];
  for (const slug of relatedSlugs) {
    const post = getPostBySlug(locale, slug, ["title", "slug", "excerpt"]);
    if (!post) continue;
    related.push({
      slug: (post.slug as string) || slug,
      title: (post.title as string) || slug,
      excerpt: (post.excerpt as string) || undefined,
    });
  }

  return {
    track,
    lesson,
    index,
    content: html,
    headings: extractHeadings(html),
    related,
  };
}
