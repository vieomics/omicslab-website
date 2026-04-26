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
    title: "Variant Calling Pipelines",
    paragraph:
      "Production-ready Nextflow pipelines for germline and somatic short-read variant calling, optimized for accuracy and speed.",
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
    title: "Methylation Analysis",
    paragraph:
      "Advanced short-read methylation calling and analysis for epigenomic research and biomarker discovery.",
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
          d="M28 10H4c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-6 16h-8v2h8v-2zm6-8H4v-2h24v2z"
          fill="white"
        />
      </svg>
    ),
    title: "Data Platform (River)",
    paragraph:
      "Comprehensive bioinformatics data platform for integration, analysis, and management of complex multiomics datasets.",
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
          d="M20 2C10.06 2 2 10.06 2 20s8.06 18 18 18 18-8.06 18-18S29.94 2 20 2zm0 32c-7.73 0-14-6.27-14-14S12.27 6 20 6s14 6.27 14 14-6.27 14-14 14zm3.5-9h-7v2h7v-2zm0-6h-7v2h7v-2zm0-6h-7v2h7v-2z"
          fill="white"
        />
      </svg>
    ),
    title: "Genomics Kit (gkit)",
    paragraph:
      "Integrated utilities for bioinformatics setup including Spark, SLURM, HAIL, GLnexus, IGV-report and more.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
  {
    id: 5,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 6H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 18h-8v2h8v-2zm0-4h-8v2h8v-2zm0-4h-8v2h8v-2zm4-8h-4v12h-4V8h-8v12h-4V8h-4v24h20V8z"
          fill="white"
        />
      </svg>
    ),
    title: "SmartSensor",
    paragraph:
      "Innovative smartphone-based sensor technology for chemical compound analysis and characterization.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
  {
    id: 6,
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
    title: "HPC Infrastructure",
    paragraph:
      "Production-ready Ansible configuration for SLURM HPC cluster setup and management.",
    btn: "View on GitHub",
    btnLink: "https://github.com/gianglabs",
  },
];

export default servicesData;
