import { Feature } from "@/types/feature";

const servicesData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2C10.06 2 2 10.06 2 20c0 9.94 8.06 18 18 18s18-8.06 18-18C38 10.06 29.94 2 20 2zm0 32c-7.73 0-14-6.27-14-14S12.27 6 20 6s14 6.27 14 14-6.27 14-14 14z"
          fill="white"
        />
        <path
          d="M20 10c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
          fill="white"
        />
      </svg>
    ),
    title: "Bioinformatics Pipelines",
    paragraph:
      "Production-ready pipelines for comprehensive bioinformatics analysis and data processing.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
  {
    id: 2,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2C10.06 2 2 10.06 2 20c0 9.94 8.06 18 18 18s18-8.06 18-18C38 10.06 29.94 2 20 2zm-2 24h4v4h-4v-4zm0-12h4v12h-4V14zm2-8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
          fill="white"
        />
      </svg>
    ),
    title: "Multiomics",
    paragraph:
      "Advanced integration and harmonization of complex multiomics datasets for comprehensive analysis at scale.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
  {
    id: 3,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 10H12c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-4 12h-2v4h-2v-4h-2v-2h2v-4h2v4h2v2z"
          fill="white"
        />
      </svg>
    ),
    title: "Infrastructure HPC SLURM",
    paragraph:
      "Production-ready infrastructure configuration for high-performance computing cluster setup and management.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
  {
    id: 4,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 10H4c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-6 16h-8v2h8v-2zm6-8H4v-2h24v2z"
          fill="white"
        />
      </svg>
    ),
    title: "Data Platform (only for Vietnam region)",
    paragraph:
      "Comprehensive bioinformatics data platform for integration, analysis, and management of complex datasets.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
];

export default servicesData;
