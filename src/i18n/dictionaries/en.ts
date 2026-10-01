import { TextSegment } from "../types";
import { policiesEn } from "./policies/en";

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
    "Top up your organization wallet and spend it on compute, storage and the platform fee as you go.",
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
        text: " 20,000 VND/hour for 16 CPUs / 32 GB RAM on CloudFly, GreenNode or your own Slurm cluster — rates follow each provider's configuration.",
      },
    ],
    [
      { strong: "Platform fee:" },
      {
        text: " 1,000 VND/hour while jobs run — also applies on your own infrastructure, and covers platform maintenance only.",
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
      { label: "Price", value: "500 VND/GB" },
    ],
  },
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
    solutions: "Solutions",
    dataPlatform: "Omicslab Platform",
    pipelinesSoftwares: "Custom Solutions",
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
    security: "Security & Compliance",
  },
  policies: policiesEn,
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
    river: { title: "Founder @ Vieomics" },
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
            "You already have a Slurm HPC cluster and S3-compatible storage, and you want to grow production without tearing down the existing cluster — the platform integrates with your infrastructure, letting part of the cluster move to development while capacity scales up for production. You can then run NIPT pipelines: the platform uploads and stores data, creates samples with cohort management, and auto-triggers pre-configured pipelines at scale (via built-in mini-LIMS features). Its plugin architecture lets you integrate full LIMS capabilities when sensitive data is involved.",
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
      note:
        "Running on your own infrastructure? A small platform fee is still charged per hour while jobs run — it covers platform maintenance only.",
    },
    platforms: {
      subtitle: "Works with",
      title: "Clouds, Pipelines and Tools You Already Use",
      paragraph:
        "Built to work with any cloud and any storage, Omicslab is tuned first for Vietnam's own providers — CloudFly and GreenNode — so your research data stays in-country and your processing aligns with the Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP, which replaced Decree No. 13/2023/ND-CP.",
      items: [
        { title: "CloudFly", detail: "Vietnam cloud — Hanoi, Da Nang, HCMC" },
        { title: "GreenNode", detail: "Greennode (VNG Cloud) - Ho Chi Minh City" },
        { title: "Slurm HPC", detail: "Your own cluster, connected via SDK" },
        { title: "Nextflow", detail: "Mainly Nextflow & nf-core, not limited — extend easily with bash, Snakemake, etc." },
        { title: "Storage", detail: "S3-compatible object storage — bought by quota, or bring your own" },
        { title: "Studio", detail: "Galaxy, Streamlit, RStudio, etc. — or any Docker web app" },
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
            "Omicslab runs wherever you do: any cloud, your own Slurm HPC cluster registered via the SDK, or a fully on-premises deployment — with native provisioning for Vietnam's CloudFly and GreenNode, and storage you can buy by quota or bring yourself, including CloudFly/VNG object storage and your own buckets. Keeping workloads in-country is by design, aligning with Vietnam's Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP. Air-gapped and self-hosted environments are available on request.",
        },
        {
          question: "Do I need my own compute and storage?",
          answer:
            "No. New users can pay and get everything ready — compute, storage and pipelines — then start running right away. Create an account at platform.omicslab.io; no credit card is required to sign up.",
        },
        {
          question: "Where is my data stored?",
          answer:
            "In the storage you choose. Storage is S3-compatible object storage, so it can be CloudFly/VNG, your own bucket, or Amazon S3 — the AWS Hanoi Local Zone has been generally available since June 2026, letting S3 data be stored inside Vietnam. Each regional instance keeps customer data inside the region with no cross-border transfer, a design that supports compliance with Vietnam's Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP on cross-border transfer and data-processing impact assessment.",
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
  blogPage: {
    title: "Blog",
    description: "Explore the latest blogs and solutions from Omicslab.",
    searchPlaceholder: "Search posts...",
    searchPipelines: "Search pipelines...",
    searchInfrastructure: "Search infrastructure blogs...",
    guides: {
      title: "Infrastructure Guides",
      paragraph:
        "Technical guides for setting up and managing HPC infrastructure. Each guide can be customized to your specific requirements.",
    },
  },
  solutions: {
    index: {
      title: "Solutions",
      subtitle: "Bioinformatics solutions for multiomics research",
      paragraph:
        "Use the navigation menu to access: Omicslab Platform and Custom Solutions.",
      metadataDescription:
        "Bioinformatics solutions for multiomics analysis, data management, and pipeline execution.",
    },
    dataPlatform: {
      metadataTitle: "Omicslab Platform",
      metadataDescription:
        "Omicslab - Bioinformatics research platform for data management, HPC, and tool execution.",
      title: "Omicslab Platform",
      subtitle: "Omicslab — a comprehensive bioinformatics research platform",
      intro:
        "Bioinformatics research is often fragmented into disconnected steps — from uploading data, installing tools and running jobs on a cluster to chasing results scattered across different places — which makes reproducing results difficult. Omicslab addresses this by bringing everything onto a single platform, where storage, a catalog of tools and compute resources run seamlessly together.\n\nWith Omicslab, administrators connect the system once for the whole organization — credentials, cloud providers and HPC clusters — then grant access by role (admin, contributor or viewer). Analysts simply pick a tool, fill in the parameters through a form, hit run and follow live logs right in the web interface. Every run's configuration, activity log and related cost are stored in full, so you can reproduce results at any time.",
      note: [
        { strong: "Note:" },
        { text: " For a trial or support, reach us at " },
        {
          link: { href: "mailto:contact@omicslab.io", text: "contact@omicslab.io" },
        },
        { text: "." },
      ] as TextSegment[],
      pricing: {
        title: "Pricing",
        subscription,
        topup,
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
                item: "Metagenomics assembly (OmicsLab custom pipeline)",
                unitPrice: "100,000 VND/sample",
                qty: "100",
                subtotal: "10,000,000 VND",
              },
              {
                item: "HPC compute (16 CPUs / 32 GB)",
                unitPrice: "20,000 VND/hour",
                qty: "~200 hours",
                subtotal: "~4,000,000 VND",
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
            total: "~15,250,000 VND (~5,250,000 VND with nf-core/bacass)",
            footnote: [
              {
                text: "* Estimates based on typical bacterial genome assembly workload. Actual costs may vary. ",
              },
              { link: { href: "/contact", text: "Contact us" } },
              { text: " for a precise quote." },
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
                item: "HPC compute (16 CPUs / 32 GB)",
                unitPrice: "20,000 VND/hour",
                qty: "~50 hours",
                subtotal: "~1,000,000 VND",
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
            total: "~12,005,000 VND (~2,005,000 VND with nf-core/ampliseq)",
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
      },
    },
    pipelines: {
      metadataTitle: "Custom Solutions",
      metadataDescription:
        "Custom bioinformatics and platform services: HPC built and integrated with the platform, private platform deployments, and pipeline development and integration.",
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
  contactPage: {
    title: "Contact",
    description:
      "Get in touch with Omicslab for bioinformatics services and solutions.",
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
      title: "Omicslab",
      description:
        "End-to-end dry-lab bioinformatics services. Manage users, data, tools and compute on one platform — migrate your pipelines with minimal effort or pay and run everything.",
    },
    about: {
      title: "About Us",
      description: "Learn more about Omicslab and our team.",
    },
    blog: {
      title: "Blog",
      description: "Explore the latest blogs and solutions from Omicslab.",
    },
    contact: {
      title: "Contact",
      description:
        "Get in touch with Omicslab for bioinformatics services and solutions.",
    },
    privacy: {
      title: "Personal Data Protection & Privacy Policy",
      description:
        "How Omicslab collects, uses, stores and protects personal data under Vietnamese law and international security standards.",
    },
    terms: {
      title: "Terms of Service",
      description:
        "The terms that govern your use of the Omicslab Platform.",
    },
    security: {
      title: "Security & Compliance",
      description:
        "Two deployment models, the security controls we apply, and how responsibility is shared between Omicslab and the customer.",
    },
    securityCompliance: {
      title: "Compliance",
      description:
        "Where the Omicslab Platform is hosted, the law it follows and our compliance posture in Vietnam.",
    },
    securityResponsibility: {
      title: "Responsibility",
      description:
        "Who owns each security control in each Omicslab deployment model.",
    },
  },
};

export type Dictionary = typeof en;
