import { TextSegment } from "../types";
import { policiesEn } from "./policies/en";
import { guideEn } from "./guides/en";

const subscription = {
  subtitle: "Subscription",
  title: "Four Tiers, from Individual to Business",
  paragraph:
    "Limits — workspaces, members and concurrent jobs — scale by tier, while compute and storage stay usage-based.",
  tiers: [
    {
      name: "Individual",
      highlight: "Individual learners",
      price: "100,000 VND",
      period: "/month",
      features: [
        "1 workspace",
        "1 organization member, 1 member per workspace",
        "1 Studio session and 1 analysis job at once",
        "Support SLA: response within 7 business days",
        "Storage billed by usage",
        "The full platform feature set",
      ],
      cta: "Sign up with Individual",
      ctaHref: "https://platform.omicslab.io",
    },
    {
      name: "Lite",
      highlight: "Individuals and small teams",
      price: "1,000,000 VND",
      period: "/month",
      features: [
        "Up to 2 workspaces",
        "1 organization member, 3 members per workspace",
        "5 Studio sessions and 5 analysis jobs at once",
        "LIMS included by default",
        "Support SLA: response within 24 business hours",
        "Storage billed by usage",
        "The full platform feature set",
      ],
      cta: "Sign up with Lite",
      ctaHref: "https://platform.omicslab.io",
    },
    {
      name: "Pro",
      highlight: "Most popular",
      price: "10,000,000 VND",
      period: "/month",
      features: [
        "Up to 20 workspaces",
        "10 organization members, 30 members per workspace",
        "50 Studio sessions and 50 analysis jobs at once",
        "LIMS included by default",
        "Support SLA: response within 24 business hours",
        "Storage billed by usage",
        "The full platform feature set",
      ],
      cta: "Sign up with Pro",
      ctaHref: "https://platform.omicslab.io",
    },
    {
      name: "Business",
      highlight: "Self-customizable",
      price: "Custom",
      period: "by request",
      features: [
        "Custom limits sized to your business",
        "On-premises or private (air-gapped) deployment",
        "LIMS and plugin integrations to spec",
        "Priority support — contract and SLA agreed separately",
        "A dedicated quote and pricing",
      ],
      cta: "Talk to us",
      ctaHref: "/contact",
    },
  ],
};

const topup = {
  subtitle: "Top-Up",
  title: "Pay for What You Use",
  paragraph:
    "Top up your organization wallet and spend it on compute, storage and, when applicable, the platform fee as you go. The platform fee is currently 0 VND/hour through 31 December 2026.",
  lines: [
    [
      { strong: "Top-up:" },
      {
        text: " Fund your wallet via SePay/VietQR. The balance covers compute, storage and the platform fee — top-up invoices carry 10% VAT, subscriptions 0%.",
      },
    ],
    [
      { strong: "Storage:" },
      {
        text: " 500 VND/GB per month, deducted monthly from your organization balance.",
      },
    ],
    [
      { strong: "Compute:" },
      {
        text: " 8,868 VND/hour for 16 CPUs / 32 GB RAM on GreenNode.",
      },
    ],
    [
      { strong: "Platform fee:" },
      {
        text: " 0 VND/hour through 31 December 2026 (normally 1,000 VND/hour) while jobs run — also applies on your own infrastructure, and covers platform maintenance only.",
      },
    ],
    [
      { strong: "Pipelines:" },
      {
        text: " Community pipelines such as nf-core and bacass are free — you only pay for compute and storage. Custom OmicsLab pipelines are built to your request and priced per sample, from 100,000 VND/sample.",
      },
    ],
  ] as TextSegment[][],
  storage: {
    title: "Object Storage (Marketplace)",
    specs: [
      { label: "Storage quota", value: "Unlimited" },
      { label: "Download speed", value: "10 Gbps" },
      { label: "HTTP GET/HEAD", value: "5000 req/s" },
      { label: "Data transfer", value: "Unlimited" },
      { label: "Billing", value: "Pay as you go" },
      { label: "Price", value: "500 VND/GB per month" },
    ],
  },
};

const usageCosts = {
  title: "Platform Usage Costs",
  items: [
    [
      { strong: "Platform fee:" },
      {
        text: " 0 VND/hour through 31 December 2026 (normally 1,000 VND/hour) while a job runs.",
      },
    ],
    [
      { strong: "Compute cost:" },
      {
        text: " depends on the analysis and the infrastructure provider. The cost is determined by the relevant provider's public pricing.",
      },
    ],
    [
      { strong: "Storage (S3) cost:" },
      {
        text: " is billed at the pricing of the storage provider the customer chooses, based on capacity, storage duration and any related fees (if any).",
      },
    ],
  ] as TextSegment[][],
  note: "Compute and storage costs are separate from the platform fee. The platform fee is 0 VND/hour through 31 December 2026; the standard rate is 1,000 VND/hour. Customers can view the relevant provider's pricing before use. The applicable price and estimated total are determined by the actual configuration and services selected.",
};

export const en = {
  site: {
    name: "Omicslab",
    tagline: "OMICS x AI",
    legalName: "VIEOMICS COMPANY LIMITED",
    address: "No. 10 Song Thao, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam",
    taxLabel: "Tax ID",
    taxId: "0319713358",
    phoneLabel: "Phone",
    phone: "(+84) 364002059",
  },
  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
    guide: "Guide",
    guideWritten: "Written guide",
    guideVideos: "Video tutorials",
    solutions: "Solutions",
    dataPlatform: "Omicslab Platform",
    pipelinesSoftwares: "Custom Solutions",
    metagenomics: "Microbial analysis (Metagenomics)",
    blog: "Blog",
    docs: "Docs",
    mobileMenu: "Mobile Menu",
    languageSwitcher: "Switch language",
    switchTo: "Tiếng Việt",
  },
  footer: {
    copyright: "© 2026 Omicslab. All rights reserved.",
    platform: "Omicslab platform",
    productOf: "A product of",
    legalLabel: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  policies: policiesEn,
  guide: guideEn,
  cookieConsent: {
    title: "Traffic analytics",
    message:
      "This website uses Google Analytics cookies to understand how visitors use the site. The cookie is only enabled after you press Accept; if you decline, Google Analytics is not loaded and no cookie is set. Declining does not affect your ability to view the site.",
    accept: "Accept",
    decline: "Decline",
  },
  common: {
    home: "Home",
    all: "All",
    noPosts: "No posts found matching your criteria.",
    noBlogs: "No blogs found.",
    readMore: "Read more",
    recentArticles: "Recent Articles",
    relatedArticles: "Related articles",
    browseAllArticles: "Browse all articles",
    breadcrumb: "Breadcrumb",
    aboutAuthor: "About the author",
    googleScholar: "Google Scholar",
    linkedin: "LinkedIn",
    github: "GitHub",
    tableOfContents: "Table of Contents",
    copy: "Copy",
    copied: "Copied!",
    noDate: "No date",
    anonymous: "Anonymous",
    scrollToTop: "scroll to top",
    viewOnGitHub: "View on GitHub",
    contactUs: "Contact us",
    readInOtherLanguage: "Read in Vietnamese",
  },
  authors: {
    vieomics: { title: "Founder @ Vieomics" },
  },
  home: {
    hero: {
      title: "End-to-End Dry-Lab Bioinformatics Services",
      paragraph:
        "One platform for your entire dry lab: manage users, data, tools and compute in a single place. Omicslab runs on any cloud, with pre-integrated Vietnamese providers such as CloudFly and GreenNode available pay-as-you-go. It also supports your own high-performance Slurm clusters. If you already have a system in place, we help you integrate with it rather than replace it outright — expanding your compute capacity exactly when you need it.",
      primaryCta: "Start on Omicslab",
      secondaryCta: "Read the docs",
    },
    services: {
      subtitle: "Platform & Services",
      title: "Your Entire Dry Lab on One Platform",
      paragraph:
        "Manage users, data, tools and compute infrastructure in one bioinformatics platform, with deployment options that fit your existing setup and professional services for custom requests.",
      items: [
        {
          title: "Manage Users, Data, Tools and Compute",
          paragraph:
            "Comprehensive access control and monitoring across the analysis system. Admins create organizations and workspaces, and manage users and resources. Analysts take those resources, build their own tools or use built-in ones (nf-core) to analyse data, deliver results and view them directly on the platform. Every data operation is logged and reviewed, keeping data provenance safe and its use traceable.",
          cta: "Open the platform",
        },
        {
          title: "Integrate Your Infrastructure",
          paragraph:
            "Deploy the platform on-premises, connect your own Slurm HPC cluster, and bring your existing pipelines across with minimal effort. Storage is purchased by quota, so you only pay for the capacity you choose.",
          cta: "Deployment docs",
        },
        {
          title: "Pay and Run, Fully Managed",
          paragraph:
            "Everything is ready: sign in, pick an nf-core pipeline such as rnaseq or sarek, set parameters and resources, then hit run — compute on CloudFly or GreenNode, storage, and results returned straight to the platform. Tuned mainly for Nextflow and nf-core, but not limited to them: beside Studio environments like RStudio, JupyterLab and VS Code, any web application deployed with Docker can run too.",
          cta: "Read the docs",
        },
        {
          title: "Project-Based Bioinformatics Services",
          paragraph:
            "You already have a Slurm HPC cluster and S3-compatible storage, and you want to grow production without tearing down the existing cluster — the platform integrates with your infrastructure, letting part of the cluster move to development while capacity scales up for production. Sensitive datasets such as NIPT (human genomic data) are handled only in a self-hosted deployment that runs entirely on your own infrastructure, where data stays in your environment: the platform uploads and stores data, creates samples with cohort management, and auto-triggers pre-configured pipelines at scale (via built-in mini-LIMS features). Its plugin architecture lets you integrate full LIMS capabilities when sensitive data is involved.",
          cta: "Talk to us",
        },
      ],
    },
    howItWorks: {
      subtitle: "How it works",
      title: "A Complete End-to-End Flow on the Platform",
      paragraph:
        "From creating your organization to getting results — every step happens in one place, on the platform.",
      steps: [
        {
          title: "Create your organization",
          paragraph:
            "Set up your organization, invite your team and activate your license by paying the subscription bill.",
        },
        {
          title: "Add infrastructure and storage",
          paragraph:
            "Cloud and HPC are pre-configured and ready to run — pick CloudFly, GreenNode or an Slurm cluster and pay as you go, with no configuration on your side. Already have compute and S3-compatible storage? Connect it instead.",
        },
        {
          title: "Select your input data",
          paragraph:
            "Choose the files to analyse in the data browser — upload them or pull them from your existing storage.",
        },
        {
          title: "Choose a pipeline and run",
          paragraph:
            "Run Nextflow and nf-core, or any pipeline with a preconfigured schema (bash, Snakemake and more) — parameters, resources, logs and results stay end-to-end on the platform.",
        },
      ],
      noteLabel: "Note",
      note: "Running on your own infrastructure? The platform fee is 0 VND/hour through 31 December 2026 (normally 1,000 VND/hour); compute and storage are billed by your provider.",
    },
    platforms: {
      subtitle: "Works with",
      title: "Clouds, Pipelines and Tools You Already Use",
      paragraph:
        "Built to work with any cloud and any storage, Omicslab is tuned first for Vietnam's own providers — CloudFly and GreenNode — so you can keep your research data in-country and your processing aligns with the Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP, which replaced Decree No. 13/2023/ND-CP.",
      items: [
        { title: "CloudFly", detail: "Vietnam cloud — Hanoi, Da Nang, HCMC" },
        {
          title: "GreenNode",
          detail: "Greennode (VNG Cloud) - Ho Chi Minh City",
        },
        { title: "Slurm HPC", detail: "Your own cluster, connected via SDK" },
        {
          title: "Nextflow",
          detail:
            "Mainly Nextflow & nf-core, not limited — extend easily with bash, Snakemake, etc.",
        },
        {
          title: "Storage",
          detail:
            "S3-compatible object storage — bought by quota, or bring your own",
        },
        {
          title: "Studio",
          detail: "Galaxy, Streamlit, RStudio, etc. — or any Docker web app",
        },
      ],
    },
    customers: {
      subtitle: "Our Customers",
      title: "Research Groups Working With Omicslab",
      paragraph:
        "Some of the research groups we work with are listed below. We name only the groups that have agreed to be listed.",
      cta: "Visit the research group",
      members: [
        {
          initials: "NTD",
          name: "Nguyen Thanh Danh Lab",
          affiliation:
            "T.D. Nguyen Research Group, Institute of Advanced Technology, Vietnam Academy of Science and Technology (VAST)",
          location: "Ho Chi Minh City, Vietnam",
          focus:
            "The group's work covers the synthesis and characterisation of hybrid materials, sensors for toxic compounds and heterogeneous catalysts.",
          link: "https://sites.google.com/view/nguyensresearchgroup/thanh-danh-nguyen",
        },
      ],
    },
    about: {
      title: "End-to-End Dry-Lab Bioinformatics Services, Built in Vietnam",
      paragraph1:
        "Omicslab is developed by Vieomics Company Limited. We deliver an end-to-end dry-lab service: a bioinformatics platform for users, data, tools and compute, plus the professional services that surround it.",
      cta: "Explore on GitHub",
      badge: {
        line1: "Omics",
        line2: "Dry-Lab Services",
        line3: "Platform & Professional",
      },
    },
    cta: {
      title: "Ready to Modernise Your Dry Lab?",
      titleAccent: "Start on Omicslab",
      paragraph:
        "Create an account and run your first pipeline, or contact us to migrate your pipelines, set up HPC and discuss custom bioinformatics services.",
      button: "Contact for Work",
    },
    faq: {
      subtitle: "FAQ",
      title: "Any Questions? Answered",
      paragraph:
        "Below are answers to some of the most common questions we receive.",
      items: [
        {
          question: "What is Omicslab?",
          answer:
            "Omicslab is an end-to-end dry-lab bioinformatics service. It provides a bioinformatics platform to manage users, data, tools and compute infrastructure, plus professional services for customer-specific analyses that integrate tightly with the platform.",
        },
        {
          question: "Does Omicslab operate outside Vietnam?",
          answer:
            "Currently, Vieomics **operates the Omicslab Platform only in Vietnam** and works with **Vietnamese people or persons living in Vietnam**, and multinational collaborations. Data and compute provided by Vieomics are **located in Vietnam**; we do not currently operate the Platform abroad.",
        },
        {
          question: "Can I migrate my existing pipelines and infrastructure?",
          answer:
            "Yes. Deploy the platform on-premises or in your own cloud, register your Slurm HPC cluster via the SDK and connect your storage, then bring your pipelines as Git repositories. Migration is designed to require minimal effort.",
        },
        {
          question: "Which pipelines can I run?",
          answer:
            "Any nf-core or Nextflow pipeline, and any Git repository that provides a run script and a parameter schema. Popular choices include rnaseq, sarek, scrnaseq, chipseq, atacseq, methylseq, ampliseq, mag, taxprofiler and rnafusion. MultiQC and Nextflow reports are rendered directly in the browser.",
        },
        {
          question: "Which clouds and infrastructure are supported?",
          answer:
            "Omicslab runs wherever you do: any cloud, your own Slurm HPC cluster registered via the SDK, or a fully on-premises deployment — with native provisioning for Vietnam's CloudFly and GreenNode, and storage you can buy by quota or bring yourself, including CloudFly/VNG object storage and your own buckets. Where you choose infrastructure located in Vietnam, keeping workloads in-country is supported by design, aligning with Vietnam's Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP. Air-gapped and self-hosted environments are available on request.",
        },
        {
          question: "Do I need my own compute and storage?",
          answer:
            "No. New users can pay and get everything ready — compute, storage and pipelines — then start running right away. Create an account at platform.omicslab.io; no credit card is required to sign up.",
        },
        {
          question: "Where is my data stored?",
          answer:
            "In the storage you choose. Storage is S3-compatible object storage, so it can be CloudFly/VNG, your own bucket, or Amazon S3 — the AWS Hanoi Local Zone has been generally available since June 2026, letting S3 data be stored inside Vietnam. For the storage and compute that Vieomics provides, the regional instance is designed to keep customer data inside Vietnam with no cross-border transfer, supporting compliance with Vietnam's Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP on cross-border transfer and data-processing impact assessment. Where you connect your own storage, cloud or servers (BYOC), the location of that data depends on the infrastructure you choose and operate — Vieomics does not control or guarantee it.",
        },
        {
          question: "How much does it cost?",
          answer:
            "Pricing depends on your plan, storage and compute usage. Contact us for a quote — we offer project-based contracts as well as pay-as-you-go platform usage.",
        },
      ],
    },
    blog: {
      subtitle: "Our Blogs",
      title: "Our Recent News",
      paragraph:
        "Explore the latest blogs and solutions from OmicsLab, offering tailored bioinformatics services and solutions.",
    },
    contact: {
      subtitle: "Contact us",
      title: "Let's work together on your bioinformatics needs.",
      locationLabel: "Our Location",
      emailLabel: "Email Us",
      email: "contact@omicslab.io",
    },
  },
  aboutPage: {
    title: "About Us",
    description: "Learn more about Omicslab and our team.",
    whatWeDo: {
      subtitle: "What we do",
      title: "The platform and the services around it",
      paragraph:
        "Omicslab combines a bioinformatics platform with the work needed to run it in a real laboratory. An engagement can cover only the platform, only a defined project, or both.",
      items: [
        {
          title: "Platform engineering",
          paragraph:
            "We develop and operate the Omicslab Platform: organization and workspace management, data and tool catalogs, job execution and result viewers.",
        },
        {
          title: "Infrastructure integration",
          paragraph:
            "We connect existing Slurm HPC clusters, S3-compatible storage and cloud accounts, or work within a self-hosted deployment on infrastructure the customer controls.",
        },
        {
          title: "Professional services",
          paragraph:
            "We develop and integrate pipelines, support migration from existing workflows, and provide training or platform-operation support within the agreed scope.",
        },
      ],
    },
    approach: {
      subtitle: "How we work",
      title: "Start from the system you already have",
      paragraphs: [
        "Most engagements begin with a short scoping conversation: what the analysis needs to produce, which data and infrastructure are already available, and where the current process breaks down. The deployment model, data boundaries and responsibilities are documented before implementation starts.",
        "Where an existing cluster, storage system or pipeline can be kept, we integrate with it rather than replacing it. For self-hosted and integrated deployments, the result should be a system the customer can operate and audit in its own environment.",
      ],
      links: [
        { label: "Explore the platform", href: "/solutions/data-platform" },
        {
          label: "Explore custom solutions",
          href: "/solutions/custom-solutions",
        },
        { label: "Read the user guide", href: "/guide" },
      ],
    },
    team: {
      title: "Meet Our Team",
      members: [
        {
          designation:
            "Founder @ Vieomics | Ex-DNAnexus | Scaling Multi-Omics Infrastructure & AI",
        },
      ],
    },
  },
  contactPage: {
    subtitle: "Before you write",
    title: "A short message with the essentials is enough",
    paragraph:
      "We read every message. To reply with something useful, the points below are usually enough; if a detail is missing, we will ask.",
    items: [
      {
        title: "The analysis goal",
        paragraph:
          "What the analysis should produce, and the biological or operational question behind it.",
      },
      {
        title: "The data and its constraints",
        paragraph:
          "Data type, approximate size, and whether it is public, simulated or subject to a specific access condition.",
      },
      {
        title: "The environment",
        paragraph:
          "Whether you already have a cloud account, Slurm cluster or on-premises infrastructure, and which parts you want to keep.",
      },
    ],
    support: {
      title: "Already using the platform?",
      paragraph:
        "The user guide covers organization setup, billing, workspaces and analyses. The support policy describes the support channels and scope.",
      guideLabel: "Open the user guide",
      supportLabel: "Read the support policy",
    },
  },
  blogPage: {
    title: "Blog",
    description: "Explore the latest blogs and solutions from Omicslab.",
    searchPlaceholder: "Search posts...",
    searchPipelines: "Search pipelines...",
    searchInfrastructure: "Search infrastructure blogs...",
    terminologyNote:
      "Bioinformatics has a lot of specialized terminology. Technical terms are kept in English so their original meaning is preserved.",
    guides: {
      title: "Infrastructure Guides",
      paragraph:
        "Technical guides for setting up and managing HPC infrastructure. Each guide can be customized to your specific requirements.",
    },
    topics: {
      title: "Blog topics",
      subtitle: "Every post, grouped by topic",
      description:
        "All Omicslab posts collected under a small set of topics, so a subject or a series can be read end to end.",
      intro:
        "Posts are grouped by topic below. Where a subject spans several articles, the series order is shown so the parts can be read in sequence.",
      columnPost: "Post",
      columnSeries: "Series",
      columnDate: "Date",
      postsSuffix: "posts",
      browseAll: "Browse all posts",
      browseTopics: "Browse by topic",
    },
  },
  solutions: {
    index: {
      title: "Solutions",
      subtitle: "Bioinformatics solutions for multiomics research",
      paragraph:
        "Three paths cover most requests: the managed Omicslab Platform, Microbial analysis (Metagenomics) for shotgun, amplicon, viral and MAG workflows, and Custom Solutions for pipeline development, infrastructure integration and private deployments. The three can be combined, and an existing system can be integrated rather than replaced.",
      metadataDescription:
        "Bioinformatics solutions for multiomics analysis, data management, and pipeline execution.",
    },
    metagenomics: {
      metadataTitle: "Microbial analysis (Metagenomics)",
      metadataDescription:
        "Microbial analysis on the Omicslab Platform: shotgun metagenomics, 16S/ITS amplicon, bacterial genome assembly, viral genomes, functional profiling and MAGs with nf-core/taxprofiler, bacass, viralrecon, ampliseq, funcscan and mag.",
      serviceType: "Metagenomics analysis on the Omicslab Platform",
      title: "Microbial analysis (Metagenomics)",
      subtitle:
        "From raw reads to community composition, functional potential and microbial genomes — on a reproducible platform.",
      intro:
        "Metagenomics asks which organisms are present, what genes they carry and how the community changes. Omicslab gives you a place to run the standard pipelines, keep raw and processed data together, and retain the parameters and versions behind each result. The same project can hold isolate genomes, amplicon runs and shotgun runs, so results can be compared without moving files between systems.",
      platform: {
        title: "What the platform provides",
        subtitle:
          "The analysis layer is only useful if the data, tools and records stay together. These are the pieces Omicslab brings into one project.",
        items: [
          {
            title: "Data and storage",
            paragraph:
              "S3-compatible object storage for raw reads, assemblies, reference databases and results. Data is organised by project and workspace, with role-based access.",
          },
          {
            title: "Tools and pipelines",
            paragraph:
              "nf-core pipelines and custom workflows run as analysis jobs. Containers and versions are pinned, so the same inputs and parameters can be replayed later.",
          },
          {
            title: "Compute",
            paragraph:
              "Cloud or Slurm-backed compute, sized per job. Long assemblies and many-sample screens can be queued without maintaining a local cluster.",
          },
          {
            title: "Reproducibility",
            paragraph:
              "Each run keeps its parameters, tool versions, logs and output manifest. A result is tied to the configuration that produced it.",
          },
          {
            title: "Collaboration",
            paragraph:
              "Administrators, contributors and viewers work in the same workspace. Results can be shared without copying the underlying data.",
          },
          {
            title: "Custom analysis",
            paragraph:
              "Studio provides a terminal, notebooks and project code when a standard pipeline is not enough — a new database, a different binning strategy or a downstream figure.",
          },
        ],
      },
      analyses: {
        title: "Common microbial analyses",
        subtitle:
          "These are the questions most projects start with. Each entry names the nf-core pipeline that implements it and the kind of output it produces.",
        items: [
          {
            name: "Shotgun taxonomic profiling",
            pipeline: "nf-core/taxprofiler",
            question:
              "Which taxa are present in a shotgun sample, and in what proportion?",
            output:
              "Taxonomic profiles from one or more databases, diversity estimates, Krona plots and a MultiQC report.",
            blogSlug: "shotgun-metagenomics-taxprofiler",
            blogLabel: "Read the stool metagenomics guide",
          },
          {
            name: "Bacterial genome assembly and AMR",
            pipeline: "nf-core/bacass",
            question:
              "What does an isolate genome look like, and which resistance genes does it carry?",
            output:
              "Assembly, annotation, AMR gene calls, QC and a comparison-ready genome.",
            blogSlug: "bacterial-genome-assembly-without-coding",
            blogLabel: "Read the bacterial assembly guide",
          },
          {
            name: "Viral genome analysis",
            pipeline: "nf-core/viralrecon",
            question:
              "What consensus, variants and lineage does a viral sample support?",
            output:
              "Consensus sequence, variant calls, lineage/clade assignment and coverage/QC reports.",
            blogSlug: "hbv-ngs-analysis-guide",
            blogLabel: "Read the HBV NGS guide",
          },
          {
            name: "Amplicon and 16S/ITS profiling",
            pipeline: "nf-core/ampliseq",
            question:
              "What is the community composition in an amplicon library?",
            output:
              "ASVs, taxonomic assignment, alpha/beta diversity and differential abundance.",
            blogSlug: "",
            blogLabel: "",
          },
          {
            name: "Functional profiling",
            pipeline: "nf-core/funcscan",
            question:
              "Which antimicrobial-resistance genes, biosynthetic gene clusters, antimicrobial peptides or CRISPR systems are encoded in the community?",
            output:
              "Annotated hits for ARGs, BGCs, AMPs and CRISPR arrays, with summaries for follow-up.",
            blogSlug: "",
            blogLabel: "",
          },
          {
            name: "Metagenome-assembled genomes",
            pipeline: "nf-core/mag",
            question:
              "Which microbial genomes can be reconstructed from a shotgun community?",
            output:
              "MAGs with completeness/contamination estimates, taxonomy and QC.",
            blogSlug: "",
            blogLabel: "",
          },
        ],
      },
      workflow: {
        title: "How a run works",
        subtitle:
          "The path is the same for one sample and a cohort; only the samplesheet and the resources change.",
        steps: [
          {
            title: "1. Bring the data in",
            paragraph:
              "Upload reads or connect an existing bucket. A samplesheet links each sample to its files and metadata.",
          },
          {
            title: "2. Choose the analysis",
            paragraph:
              "Pick a pipeline and a reference database. Shared parameters stay in the project so the next run starts from the same configuration.",
          },
          {
            title: "3. Run and monitor",
            paragraph:
              "The job runs on the selected compute. Logs, resource use and QC are visible while it runs, so a failed step can be diagnosed early.",
          },
          {
            title: "4. Inspect and share",
            paragraph:
              "Results stay in the workspace: tables, MultiQC, trees, assemblies and figures. Reviewers can be given access without copying the data.",
          },
          {
            title: "5. Keep the record",
            paragraph:
              "The run manifest keeps versions, parameters and checksums. That is the difference between a result and a result that can be reproduced.",
          },
        ],
      },
      blog: {
        title: "From the blog",
        subtitle: "Worked examples and guides that go with these analyses.",
        slugs: [
          "shotgun-metagenomics-taxprofiler",
          "hbv-ngs-analysis-guide",
          "reading-hbv-ngs-results",
          "bacterial-genome-assembly-without-coding",
          "bla-ndm-on-omicslab",
          "how-to-run-nf-core-pipelines-on-omicslab",
        ],
      },
      cta: {
        title: "Start with your own data",
        paragraph:
          "The platform is ready for a first project: bring a small run, compare it with the public examples, then scale the same configuration to a cohort.",
        primaryLabel: "Open the platform",
        primaryHref: "https://platform.omicslab.io",
        secondaryLabel: "Read the nf-core guide",
        secondaryHref: "/blogs/how-to-run-nf-core-pipelines-on-omicslab",
      },
    },
    dataPlatform: {
      metadataTitle: "Omicslab Platform",
      metadataDescription:
        "Omicslab - Bioinformatics research platform for data management, HPC, and tool execution.",
      serviceType: "Managed bioinformatics platform",
      title: "Omicslab Platform",
      subtitle: "Omicslab — a comprehensive bioinformatics research platform",
      intro:
        "Bioinformatics research is often fragmented into disconnected steps — from uploading data, installing tools and running jobs on a cluster to chasing results scattered across different places — which makes reproducing results difficult. Omicslab addresses this by bringing everything onto a single platform, where storage, a catalog of tools and compute resources run seamlessly together.\n\nWith Omicslab, administrators connect the system once for the whole organization — credentials, cloud providers and HPC clusters — then grant access by role (admin, contributor or viewer). Analysts simply pick a tool, fill in the parameters through a form, hit run and follow live logs right in the web interface. Every run's configuration, activity log and related cost are stored in full, so you can reproduce results at any time.",
      note: [
        { strong: "Note:" },
        { text: " For a trial or support, reach us at " },
        {
          link: {
            href: "mailto:contact@omicslab.io",
            text: "contact@omicslab.io",
          },
        },
        { text: "." },
      ] as TextSegment[],
      promo: {
        eyebrow: "Redeem · Promo code",
        title: "Lite plan — 1,000,000 VND/month, with 20,000 VND credit",
        paragraph:
          "Subscribe to the Lite plan, currently 1,000,000 VND/month, and enter the code in the promo code field to receive 20,000 VND in credit. The code is limited to 100 seats.",
        codeLabel: "Promo code",
        code: "WELCOME2VIEOMICS",
        copyLabel: "Copy code",
        copiedLabel: "Copied",
        details: [
          { label: "Plan", value: "Lite" },
          { label: "Plan price", value: "1,000,000 VND/month" },
          { label: "Value", value: "20,000 VND in credit" },
          { label: "Limit", value: "100 seats" },
        ],
        cta: "Subscribe to Lite",
        ctaHref: "https://platform.omicslab.io",
        note: [
          {
            text: "The code is entered during Lite plan checkout. See the ",
          },
          { link: { href: "/policies/pricing", text: "Pricing Policy" } },
          { text: " for how promotions are applied." },
        ] as TextSegment[],
      },
      pricing: {
        title: "Pricing",
        subscription,
        topup,
        usageCosts,
        trialNote: [
          { strong: "Note:" },
          {
            text: " The prices are for self-service use. Following the platform documentation, you create and run the analysis yourself — Vieomics does not receive your data, run everything for you and hand back the results. If you want a fully managed service, see ",
          },
          {
            link: {
              href: "/solutions/custom-solutions",
              text: "Custom Solutions",
            },
          },
          { text: ". For a trial or support, reach us at " },
          {
            link: {
              href: "mailto:contact@omicslab.io",
              text: "contact@omicslab.io",
            },
          },
          { text: "." },
        ] as TextSegment[],
        estimates: [
          {
            title: "Cost Estimate — 100 Bacterial Genome Assemblies / Month",
            columns: {
              item: "Item",
              unitPrice: "Unit Price",
              qty: "Qty",
              subtotal: "Subtotal",
            },
            rows: [
              {
                item: "Bacterial genome assembly (OmicsLab custom pipeline)",
                unitPrice: "100,000 VND/sample",
                qty: "100",
                subtotal: "10,000,000 VND",
              },
              {
                item: "Compute (16 CPUs / 32 GB on GreenNode)",
                unitPrice: "8,868 VND/hour",
                qty: "~200 hours",
                subtotal: "~1,773,600 VND",
              },
              {
                item: "Platform subscription",
                unitPrice: "1,000,000 VND/month",
                qty: "1",
                subtotal: "1,000,000 VND",
              },
              {
                item: "Storage (object storage)",
                unitPrice: "500 VND/GB",
                qty: "~5 GB/sample × 100 = ~500 GB",
                subtotal: "~250,000 VND",
              },
            ],
            totalLabel: "Estimated Total / Month",
            total: "~13,023,600 VND (~3,023,600 VND with nf-core/bacass)",
            footnote: [
              {
                text: "* Estimates based on typical bacterial genome assembly workload. Actual costs may vary. ",
              },
              { link: { href: "/contact", text: "Contact us" } },
              {
                text: " for a precise quote. New to this? Follow the step-by-step guides: ",
              },
              {
                link: {
                  href: "/blogs/how-to-run-nf-core-pipelines-on-omicslab",
                  text: "How to Run nf-core Pipelines on the Omicslab Platform",
                },
              },
              { text: " and " },
              {
                link: {
                  href: "/blogs/bacterial-genome-assembly-without-coding",
                  text: "Building a Bacterial Genome Without Writing Code",
                },
              },
              { text: "." },
            ] as TextSegment[],
          },
          {
            title: "Cost Estimate — 100 16S rRNA Samples / Month",
            columns: {
              item: "Item",
              unitPrice: "Unit Price",
              qty: "Qty",
              subtotal: "Subtotal",
            },
            rows: [
              {
                item: "16S rRNA analysis (OmicsLab custom pipeline)",
                unitPrice: "100,000 VND/sample",
                qty: "100",
                subtotal: "10,000,000 VND",
              },
              {
                item: "Compute (16 CPUs / 32 GB on GreenNode)",
                unitPrice: "8,868 VND/hour",
                qty: "~50 hours",
                subtotal: "~443,400 VND",
              },
              {
                item: "Platform subscription",
                unitPrice: "1,000,000 VND/month",
                qty: "1",
                subtotal: "1,000,000 VND",
              },
              {
                item: "Storage (object storage)",
                unitPrice: "500 VND/GB",
                qty: "~100 MB/sample × 100 = ~10 GB",
                subtotal: "~5,000 VND",
              },
            ],
            totalLabel: "Estimated Total / Month",
            total: "~11,448,400 VND (~1,448,400 VND with nf-core/ampliseq)",
            footnote: [
              {
                text: "* Estimates based on typical 16S rRNA analysis workload. Actual costs may vary. ",
              },
              { link: { href: "/contact", text: "Contact us" } },
              { text: " for a precise quote." },
            ] as TextSegment[],
          },
        ],
      },
      features: {
        title: "Key Features",
        items: [
          {
            title: "Organization",
            paragraph:
              "Create and manage organizations with members, roles and credentials. Support independent and reproducible analyses across groups with organization-specific computing resources.",
          },
          {
            title: "Compute Integration",
            paragraph:
              "Connect to Slurm HPC clusters for compute-intensive analysis. Jobs are launched and monitored via a user-friendly web interface.",
          },
          {
            title: "Tools Integration",
            paragraph:
              "Easy integration and execution of community-developed workflows (such as nf-core) as well as custom pipelines. Supports multi-omics data analysis.",
          },
          {
            title: "Data Storage",
            paragraph:
              "Secure, scalable storage for datasets. Organize data by project, type, and analysis. Raw or processed data can be stored and shared using role-based access control (RBAC), where the data source can be registered with the object-storage credential service.",
          },
        ],
      },
      gettingStarted: {
        title: "Quick start",
        steps: [
          "Create your organization",
          "Pay for your subscription",
          "Top up your wallet",
          "Create a workspace",
          "Upload your data",
          "Select the data to run the pipeline",
          "Wait for the pipeline to finish and check the result",
        ],
        notes: [
          "Pipelines can be triggered automatically for cohorts.",
          "Data can be configured to sync from your sequencing machine.",
        ],
        videoTitle: "Omicslab Platform - Bioinformatics analysis platform",
        tutorialsLink: "Open the full video page",
        tutorialsTitle: "Video tutorials",
        tutorialsDescription:
          "Six recordings that follow the quick-start steps. The overview above shows the complete flow; select a video below to play it here.",
      },
    },
    pipelines: {
      metadataTitle: "Custom Solutions",
      metadataDescription:
        "Custom bioinformatics and platform services: HPC built and integrated with the platform, private platform deployments, and pipeline development and integration.",
      serviceType: "Custom bioinformatics and platform services",
      title: "Custom Solutions",
      subtitle:
        "Custom Omicslab solutions that fit exactly what your specific bioinformatics work requires.",
      intro:
        "Describe the problem and the goal — we design, develop and deliver the complete system together with you.",
      searchPlaceholder: "Search custom solutions...",
      available: {
        title: "Choose what you need:",
        categories: [
          {
            title: "Pipeline development",
            paragraph:
              "Programming and integration of new analysis tools into your existing system.",
          },
          {
            title: "Infrastructure deployment & optimization",
            paragraph:
              "Build HPC clusters, configure S3-compatible object storage dedicated to omics data, or set up your own private cloud infrastructure.",
          },
          {
            title: "Private platform",
            paragraph:
              "Deploy a standalone Omicslab instance dedicated to your own users.",
          },
        ],
      },
      software: {
        title: "Open-source building blocks",
        paragraph:
          "The custom work above is built on tools we maintain in the open. They are where most engagements start instead of starting from scratch, and they stay available to your team after handover.",
        packages: [
          {
            name: "omicslab-kit",
            description:
              "Comprehensive toolkit for integrating multiple bioinformatics tools to set up scalable analysis pipelines. Includes tutorials for performing bioinformatics at scale using different tool configurations.",
            linkText: "View on GitHub →",
            href: "https://github.com/vieomics/omicslab-kit",
          },
          {
            name: "pyomicslab",
            description:
              "Python package for multi-omics data harmonization and analysis at scale. Integrates with multiple data sources including TCGA data (rewritten from TCGABiolinks) and provides Python-native solutions for analysis and visualization including heatmaps, survival analysis, oncoplots, and more.",
            linkText: "View on GitHub →",
            href: "https://github.com/vieomics/pyomicslab",
          },
        ],
      },
    },
  },
  errorPage: {
    title: "404 Page",
    description: "The page you are looking for does not exist.",
  },
  notFound: {
    heading: "We Can't Seem to Find The Page You're Looking For.",
    paragraph:
      "Oops! The page you are looking for does not exist. It might have been moved or deleted.",
    button: "Go To Home",
  },
  globalNotFound: {
    heading: "404 - Page Not Found",
    paragraph: "The page you are looking for does not exist.",
    homeVi: "Trang chủ (Tiếng Việt)",
    homeEn: "Home (English)",
  },
  metadata: {
    siteDescription:
      "End-to-end dry-lab bioinformatics services. Manage users, data, tools and compute on one platform — migrate your pipelines with minimal effort or pay and run everything.",
    home: {
      title: "Omicslab — End-to-End Dry-Lab Bioinformatics Platform",
      description:
        "End-to-end dry-lab bioinformatics services. Manage users, data, tools and compute on one platform — migrate your pipelines with minimal effort or pay and run everything.",
    },
    about: {
      title: "About Us",
      description:
        "Omicslab is developed by Vieomics in Vietnam: a bioinformatics platform for users, data, tools and compute, plus professional services for custom analysis and infrastructure integration.",
    },
    blog: {
      title: "Bioinformatics Blog",
      description:
        "Technical guides and notes on bioinformatics pipelines, HPC infrastructure, containers, workflow reproducibility and data analysis.",
    },
    contact: {
      title: "Contact",
      description:
        "Contact Omicslab for platform access, pipeline integration, HPC setup and custom bioinformatics services.",
    },
    guide: {
      title: "User Guide",
      description:
        "Step-by-step instructions for the Omicslab Platform: organizations, billing, workspaces, analyses, Studio and support.",
    },
    guideVideos: {
      title: "Video tutorials",
      description:
        "Seven video walkthroughs of the Omicslab Platform: account registration, workspaces, LIMS/Cohorts, samplesheets, the Viewer and Studio.",
    },
    privacy: {
      title: "Personal Data Protection & Privacy Policy",
      description:
        "How Omicslab collects, uses, stores and protects personal data under Vietnamese law and international security standards.",
    },
    terms: {
      title: "Terms of Service",
      description: "The terms that govern your use of the Omicslab Platform.",
    },
  },
};

export type Dictionary = typeof en;
