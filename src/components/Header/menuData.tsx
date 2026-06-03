import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  // {
  //   id: 3,
  //   title: "Pricing",
  //   path: "/pricing",
  //   newTab: false,
  // },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  {
    id: 6,
    title: "Solutions",
    path: undefined,
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Infrastructure as a Service",
        path: "/solutions/infrastructure",
        newTab: false,
      },
      {
        id: 62,
        title: "Data Platform",
        path: "/solutions/data-platform",
        newTab: false,
      },
      {
        id: 63,
        title: "Pipelines & Softwares",
        path: "/solutions/pipelines-softwares",
        newTab: false,
        submenu: [
          {
            id: 631,
            title: "Multiomics Pipeline",
            path: "/solutions/service-platform/multiomics",
            newTab: false,
          },
          {
            id: 632,
            title: "Run Pipeline",
            path: "/solutions/service-platform/run",
            newTab: false,
          },
          {
            id: 633,
            title: "Software",
            path: "/solutions/software-platform",
            newTab: false,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Blog",
    path: "/blogs",
    newTab: false,
  },
];
export default menuData;
