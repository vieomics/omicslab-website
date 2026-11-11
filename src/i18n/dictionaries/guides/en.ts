import type { GuideContent } from "./types";
import { chaptersPart1 } from "./content/en/part-1";
import { chaptersPart2 } from "./content/en/part-2";
import { videosEn } from "./videos/en";

export const guideEn: GuideContent = {
  shared: {
    lastUpdatedLabel: "Updated",
    lastUpdated: "3 November 2026",
    chaptersLabel: "Chapters",
    tocLabel: "Contents",
    previous: "Previous chapter",
    next: "Next chapter",
    figureLabel: "Figure",
    openImage: "Open full size",
    backToTop: "Back to top",
  },
  hub: {
    kicker: "User guide",
    title: "Using the Omicslab platform",
    description:
      "Step-by-step walkthroughs of the Omicslab Platform, arranged by everyday tasks: account and organization, payment, workspaces, analyses, Studio, viewers and support.",
    intro:
      "This guide was compiled from an actual sequence of actions on the Omicslab Platform and checked against the [technical documentation](https://docs.omicslab.io/en/intro). Chapters are grouped by what the reader is trying to do rather than by screenshot order, so the guide can be read from the start or opened at the relevant part. Each chapter follows the same structure: the goal, the steps and screenshots; a note on scope appears where relevant.",
    note: "Screenshots were taken on the Vietnamese interface at the time of writing. Labels, button positions and some values may differ after a platform update; check the technical documentation or the checkout page for the current version and plan limits before making a transaction.",
    noteTitle: "Note",
    chapterLabel: "Chapter",
    sectionLabel: "sections",
  },
  videos: videosEn,
  chapters: [...chaptersPart1, ...chaptersPart2],
};
