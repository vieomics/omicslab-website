import { Menu } from "@/types/menu";
import type { Dictionary } from "@/i18n/dictionaries/en";

export default function getMenuData(dict: Dictionary): Menu[] {
  return [
    {
      id: 1,
      title: dict.nav.home,
      path: "/",
      newTab: false,
    },
    {
      id: 2,
      title: dict.nav.about,
      path: "/about",
      newTab: false,
    },
    {
      id: 5,
      title: dict.nav.contact,
      path: "/contact",
      newTab: false,
    },
    {
      id: 6,
      title: dict.nav.solutions,
      path: undefined,
      newTab: false,
      submenu: [
        {
          id: 61,
          title: dict.nav.infrastructure,
          path: "/solutions/infrastructure",
          newTab: false,
        },
        {
          id: 62,
          title: dict.nav.dataPlatform,
          path: "/solutions/data-platform",
          newTab: false,
        },
        {
          id: 63,
          title: dict.nav.pipelinesSoftwares,
          path: "/solutions/pipelines-softwares",
          newTab: false,
          submenu: [
            {
              id: 631,
              title: dict.nav.multiomicsPipeline,
              path: "/solutions/service-platform/multiomics",
              newTab: false,
            },
            {
              id: 632,
              title: dict.nav.runPipeline,
              path: "/solutions/service-platform/run",
              newTab: false,
            },
            {
              id: 633,
              title: dict.nav.software,
              path: "/solutions/software-platform",
              newTab: false,
            },
          ],
        },
      ],
    },
    {
      id: 7,
      title: dict.nav.blog,
      path: "/blogs",
      newTab: false,
    },
    {
      id: 8,
      title: dict.nav.docs,
      path: "https://docs.omicslab.io",
      newTab: false,
    },
  ];
}
