/**
 * Long-form tutorial content for the /guide section.
 *
 * The structure mirrors the policy pages so a chapter can reuse the same
 * editorial layout, but adds blocks the walkthroughs need: figures, numbered
 * steps and boxed notes.
 *
 * Inline markup supported by the renderer:
 *   **text**        -> <strong>
 *   [label](/href)  -> link, internal links are localised automatically
 */

export type GuideListItem =
  | string
  | { text: string; children: GuideListItem[] };

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "label"; text: string }
  | { type: "ul"; items: GuideListItem[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "note"; title?: string; text: string };

export type GuideSection = {
  id: string;
  title: string;
  blocks: GuideBlock[];
};

export type GuideChapter = {
  /** Locale-independent URL segment, e.g. "bat-dau". */
  slug: string;
  /** Two-digit chapter number used in labels and cards. */
  number: string;
  kicker: string;
  title: string;
  /** Short label used in the sidebar between chapters. */
  navTitle: string;
  /** One sentence shown under the title and used as the meta description. */
  description: string;
  /** Two or three sentences shown on the hub card. */
  summary: string;
  sections: GuideSection[];
};

export type GuideVideo = {
  /** YouTube video ID. */
  id: string;
  /** Two-digit label shown beside the title. */
  number: string;
  title: string;
  duration: string;
  /** One or two sentences describing what the recording covers. */
  description: string;
  /** Local poster image, stored under public/. */
  thumbnail: string;
};

export type GuideVideoSeries = {
  kicker: string;
  title: string;
  description: string;
  meta: string;
  aboutLabel: string;
  intro: string;
  languageNote: string;
  listLabel: string;
  playLabel: string;
  selectedLabel: string;
  watchOnYouTube: string;
  openPlaylist: string;
  writtenGuideLabel: string;
  writtenGuideText: string;
  writtenGuideCta: string;
  docsLabel: string;
  docsText: string;
  docsCta: string;
  noteTitle: string;
  note: string;
  videos: GuideVideo[];
};

export type GuideContent = {
  shared: {
    lastUpdatedLabel: string;
    lastUpdated: string;
    chaptersLabel: string;
    tocLabel: string;
    previous: string;
    next: string;
    figureLabel: string;
    openImage: string;
    backToTop: string;
  };
  hub: {
    kicker: string;
    title: string;
    description: string;
    intro: string;
    /** Boxed scope note shown on the index page. */
    note: string;
    noteTitle: string;
    chapterLabel: string;
    sectionLabel: string;
  };
  videos: GuideVideoSeries;
  chapters: GuideChapter[];
};
