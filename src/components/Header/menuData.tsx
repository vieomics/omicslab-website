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
          id: 62,
          title: dict.nav.dataPlatform,
          path: "/solutions/data-platform",
          newTab: false,
        },
        {
          id: 63,
          title: dict.nav.pipelinesSoftwares,
          path: "/solutions/custom-solutions",
          newTab: false,
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
