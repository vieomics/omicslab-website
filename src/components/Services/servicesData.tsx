import { Feature } from "@/types/feature";
import { SITE_LINKS } from "@/utils/siteLinks";

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
        <path d="M6 6h12v12H6V6Z" fill="white" />
        <path d="M22 6h12v12H22V6Z" fill="white" />
        <path d="M6 22h12v12H6V22Z" fill="white" />
        <path d="M22 22h12v12H22V22Z" fill="white" />
      </svg>
    ),
    title: "Manage Users, Data, Tools and Compute",
    paragraph:
      "Comprehensive access control and monitoring across the analysis system. Admins create organizations and workspaces, and manage users and resources. Analysts take those resources, build their own tools or use built-in ones (nf-core) to analyse data, deliver results and view them directly on the platform. Every data operation is logged and reviewed, keeping data provenance safe and its use traceable.",
    btn: "Open the platform",
    btnLink: SITE_LINKS.platform,
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
        <path d="M20 5 31 18h-7.5v12h-7V18H9L20 5Z" fill="white" />
        <path d="M8 32h24v4H8v-4Z" fill="white" />
      </svg>
    ),
    title: "Integrate Your Infrastructure",
    paragraph:
      "Deploy the platform on-premises, connect your own Slurm HPC cluster, and bring your existing pipelines across with minimal effort. Storage is purchased by quota, so you only pay for the capacity you choose.",
    btn: "Deployment docs",
    btnLink: SITE_LINKS.docs,
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
        <path d="M22 3 9 22h8l-3 15 14-20h-8l2-14Z" fill="white" />
      </svg>
    ),
    title: "Pay and Run, Fully Managed",
    paragraph:
      "Everything is ready: sign in, pick an nf-core pipeline such as rnaseq or sarek, set parameters and resources, then hit run — compute on CloudFly or GreenNode, storage, and results returned straight to the platform. Tuned mainly for Nextflow and nf-core, but not limited to them: beside Studio environments like RStudio, JupyterLab and VS Code, any web application deployed with Docker can run too.",
    btn: "Read the docs",
    btnLink: SITE_LINKS.docs,
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
          d="M15 20a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
          fill="white"
        />
        <path
          d="M15 23c-6.6 0-11 3.4-11 7.6V35h22v-4.4C26 26.4 21.6 23 15 23Z"
          fill="white"
        />
        <path
          d="M29 19a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
          fill="white"
        />
        <path
          d="M29 22c-1.9 0-3.6.4-5 1.2 1.9 1.6 3 3.8 3 6.4V35h10v-4c0-4-3.4-9-8-9Z"
          fill="white"
        />
      </svg>
    ),
    title: "Project-Based Bioinformatics Services",
    paragraph:
      "You already have a Slurm HPC cluster and S3-compatible storage, and you want to grow production without tearing down the existing cluster — the platform integrates with your infrastructure, letting part of the cluster move to development while capacity scales up for production. You can then run NIPT pipelines: the platform uploads and stores data, creates samples with cohort management, and auto-triggers pre-configured pipelines at scale (via built-in mini-LIMS features). Its plugin architecture lets you integrate full LIMS capabilities when sensitive data is involved.",
    btn: "Talk to us",
    btnLink: "/contact",
  },
];

export default servicesData;
