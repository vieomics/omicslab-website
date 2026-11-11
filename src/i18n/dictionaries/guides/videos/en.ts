import type { GuideVideoSeries } from "../types";

export const videosEn: GuideVideoSeries = {
  kicker: "Video tutorials",
  title: "Video tutorials for the Omicslab platform",
  description:
    "Seven recordings of the Omicslab Platform, following the order from account registration through workspaces, LIMS/Cohorts, samplesheets, the Viewer and Studio.",
  meta: "7 videos · 01:24:32 · Vietnamese narration",
  aboutLabel: "About this series",
  intro:
    "The first video is an end-to-end overview of one analysis. The six numbered videos cover the main groups of features in the order they are usually encountered when starting on the platform.",
  languageNote: "Narration and on-screen text are in Vietnamese.",
  listLabel: "In this series",
  playLabel: "Play video",
  selectedLabel: "Selected",
  watchOnYouTube: "Watch on YouTube",
  openPlaylist: "Open the playlist on YouTube",
  writtenGuideLabel: "Written guide",
  writtenGuideText:
    "The written chapters cover the same workflow, with screenshots and notes on scope.",
  writtenGuideCta: "Read the user guide",
  docsLabel: "Technical documentation",
  docsText:
    "Reference material for platform configuration, limits and technical details.",
  docsCta: "Open the documentation",
  noteTitle: "Note",
  note: "The recordings reflect the interface at the time of publication. Labels, button positions and plans may change after a platform update; the technical documentation is the current reference.",
  videos: [
    {
      id: "j6f85vfLEIs",
      number: "00",
      title: "Omicslab – an end-to-end bioinformatics analysis platform",
      duration: "03:55",
      description:
        "An end-to-end analysis: managing data, choosing a pipeline, configuring compute, launching the run and following the results on the platform.",
      thumbnail: "/guides/video/tutorials/overview.jpg",
    },
    {
      id: "5KPPVZdvGcU",
      number: "01",
      title: "Creating an account on the Omicslab platform",
      duration: "04:43",
      description:
        "Register with a Google account, create an organization and configure its initial settings.",
      thumbnail: "/guides/video/tutorials/01-account-organization.jpg",
    },
    {
      id: "k2lJ5Hs0hs0",
      number: "02",
      title:
        "Creating a workspace and running an analysis with the built-in cloud configuration",
      duration: "17:28",
      description:
        "Create a workspace, upload data or start from a public workspace, select storage and compute, run an analysis and inspect the results.",
      thumbnail: "/guides/video/tutorials/02-workspace-analysis.jpg",
    },
    {
      id: "RrdDsb6D9C0",
      number: "03",
      title: "Using LIMS/Cohorts to automate and manage analyses",
      duration: "22:04",
      description:
        "Automate analyses across samples: fixed parameters are reused while each sample's raw data is supplied in turn.",
      thumbnail: "/guides/video/tutorials/03-lims-cohorts.jpg",
    },
    {
      id: "khINX3Is6F8",
      number: "04",
      title:
        "Generating samplesheets automatically for analyses and LIMS/cohorts",
      duration: "12:07",
      description:
        "Upload data in the required structure, generate a samplesheet automatically, then choose an existing nf-core pipeline or your own.",
      thumbnail: "/guides/video/tutorials/04-samplesheets.jpg",
    },
    {
      id: "bVGXvA1RJpo",
      number: "05",
      title: "Using the Viewer to inspect files on the platform",
      duration: "09:28",
      description:
        "Inspect BAM, CRAM, FASTA and BED files in IGV, protein structures in Mol*, and tabular data in ECharts and Graphic Walker.",
      thumbnail: "/guides/video/tutorials/05-viewer.jpg",
    },
    {
      id: "wgR8yl-6o9g",
      number: "06",
      title:
        "Using Studio with VS Code, JupyterLab, RStudio and a coding-agent sandbox",
      duration: "14:47",
      description:
        "Open VS Code, JupyterLab or RStudio in Studio; configure GitHub and LLM settings; use the OpenCode coding agent in VS Code.",
      thumbnail: "/guides/video/tutorials/06-studio.jpg",
    },
  ],
};
