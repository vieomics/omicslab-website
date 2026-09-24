import { TextSegment } from "../types";

const subscription = {
  subtitle: "Subscription",
  title: "Three Tiers, Sized to Your Team",
  paragraph:
    "Limits — workspaces, members and concurrent jobs — scale by tier, while compute and storage stay usage-based.",
  tiers: [
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
        text: " nf-core pipelines are free; OmicsLab pipelines are tailored to your request; metagenomics assembly 100,000 VND/sample.",
      },
    ],
  ] as TextSegment[][],
  storage: {
    title: "S3 Storage (Marketplace)",
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
    tagline: "Omics Technology",
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
    infrastructure: "Infrastructure as a Service",
    dataPlatform: "Omicslab Platform",
    pipelinesSoftwares: "Pipelines & Softwares",
    multiomicsPipeline: "Multiomics Pipeline",
    runPipeline: "Run Pipeline",
    software: "Software",
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
    river: { title: "Founder @ Omicslab" },
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
        { title: "Storage", detail: "Bought by quota, or bring your own" },
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
            "In the storage you choose — your own bucket, or one hosted in Vietnam. Each regional instance keeps customer data inside the region with no cross-border transfer, a design that supports compliance with Vietnam's Personal Data Protection Law (Law No. 91/2025/QH15) and Decree No. 356/2025/ND-CP on cross-border transfer and data-processing impact assessment.",
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
          designation: "Founder",
          bio: "Bioinformatics professional with hands-on experience since 2019, specializing in end-to-end solutions across computational biology, high-throughput sequencing (NGS) analysis, and scalable infrastructure. His work spans the full stack of bioinformatics systems, from designing reproducible pipelines with Nextflow, Snakemake, and Galaxy to deploying production-grade platforms with CI/CD integration for automation and scalability.\n\nAs the pace of innovation in life sciences accelerates, he founded OmicsLab with a clear vision: to build a strong, foundational ecosystem that supports the entire omics journey—from core infrastructure and data generation to advanced downstream analysis and AI-driven applications. This includes developing robust HPC and cloud-based environments, managing Slurm-based compute systems, and architecting storage and workflow solutions capable of handling large-scale genomics and multi-omics data.\n\nWith a solid background in genomics, epigenetics, transcriptomics, and machine learning, he focuses on transforming complex biological data into actionable insights. He is committed to building systems that are not only scalable and reproducible, but also accessible and impactful for both research and industry. Through OmicsLab, his goal is to bridge the gap between infrastructure and innovation, enabling the next generation of bioinformatics and precision medicine solutions.",
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
        "Use the navigation menu to access: Omicslab Platform, Service Platform, or Software Platform.",
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
          { text: "For a trial or support, reach us at " },
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
                item: "Metagenomics assembly",
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
                item: "Storage (S3)",
                unitPrice: "500 VND/GB",
                qty: "~50 GB",
                subtotal: "~25,000 VND",
              },
            ],
            totalLabel: "Estimated Total / Month",
            total: "~15,025,000 VND",
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
                item: "16S rRNA analysis",
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
                item: "Storage (S3)",
                unitPrice: "500 VND/GB",
                qty: "~10 GB",
                subtotal: "~5,000 VND",
              },
            ],
            totalLabel: "Estimated Total / Month",
            total: "~12,005,000 VND",
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
            title: "Data Storage",
            paragraph:
              "Secure, scalable storage for datasets. Organize data by project, type, and analysis. Raw or processed data can be stored and shared using role-based access control (RBAC) where the data source can be registered with the S3 credential service,",
          },
          {
            title: "HPC Integration",
            paragraph:
              "Connect to Slurm HPC cluster for compute-intensive analysis. Jobs are launched and monitored via a user-friendly web interface.",
          },
          {
            title: "Tool Integration",
            paragraph:
              "Easy integration and execution of community-developed workflows (such as nf-core) as well as custom pipelines. Supports multi-omics data analysis.",
          },
          {
            title: "Project Management",
            paragraph:
              "Create and manage projects with credentials. Support independent and reproducible analyses across groups with organization-specific computing resources.",
          },
        ],
      },
      gettingStarted: {
        title: "Getting Started",
        steps: [
          "Create a project and upload your raw data files",
          "Configure credentials and access permissions",
          "Select data for pipeline execution",
          "Run pipeline on HPC and monitor progress",
          "Visualize pipeline report and download processed results",
        ],
        videoTitle: "Omicslab Platform - Bioinformatics analysis platform",
      },
      useCases: {
        title: "Use Cases",
        items: [
          {
            title: "Non-Interactive Analysis",
            paragraph:
              "Omicslab allows effortless integration and execution of community-developed workflows as well as custom pipelines with easy migration from existing tools. It supports all nf-core pipelines (https://nf-co.re/pipelines/) or required to add a minor configuration for non nf-core nextflow, snakemake and bash script pipelines",
          },
          {
            title: "Interactive Web Apps",
            paragraph:
              "Omicslab provides a secure way to publish interactive web applications from HPC environments to the public network, with authentication and centralized system control. It includes a ready-to-use Studio stack—RStudio Server, JupyterLab, and VS Code Server—and also supports access to other web-based applications such as custom dashboards.",
          },
          {
            title: "Collaborative Research",
            paragraph:
              "Support independent and reproducible analyses across computing resources (HPC, Cloud), with data stored in the cloud and organization-specific computing resources.",
          },
        ],
      },
    },
    infrastructure: {
      metadataTitle: "Infrastructure as a Service",
      metadataDescription:
        "Setup infrastructure to run Nextflow pipelines on-premises HPC or cloud (AWS, GCP).",
      title: "Infrastructure as a Service",
      subtitle:
        "Setup infrastructure to run Nextflow pipelines on-premises or in the cloud.",
      intro:
        "Run Nextflow pipelines at scale on your preferred infrastructure. We provide automated deployment for on-premises HPC clusters (Slurm) or cloud environments (AWS, GCP). Focus on your research while we handle the infrastructure.",
      searchPlaceholder: "Search infrastructure blogs...",
      available: {
        title: "Available Infrastructure",
        items: [
          {
            title: "On-Premises HPC",
            paragraph:
              "Deploy Nextflow on your local HPC cluster with Slurm, PBS, or LSF scheduler.",
          },
          {
            title: "AWS Cloud",
            paragraph:
              "Run Nextflow on AWS Batch with EC2, Fargate, or Spot instances.",
          },
          {
            title: "GCP Cloud",
            paragraph:
              "Deploy on Google Cloud Batch with Compute Engine or preemptible VMs.",
          },
        ],
      },
      onPrem: {
        title: "On-Premises HPC",
        paragraph:
          "Deploy a complete Slurm HPC cluster on your local infrastructure. We provide the setup and configuration, you provide the hardware.",
        plans: [
          {
            badge: "Setup",
            title: "Mini-HPC",
            description:
              "Small cluster for individual researchers or small labs",
            price: "$250",
            priceSuffix: " one-time",
            configTitle: "Configuration:",
            config: [
              "1 Controller/Login Node",
              "1 Compute Node",
              "Slurm Scheduler",
              "NFS Shared Storage",
              "Basic Monitoring",
            ],
            includesTitle: "Includes:",
            includes: [
              "Ansible automation setup",
              "Slurm configuration",
              "Nextflow integration",
              "Basic training session",
              "30-day support",
            ],
            note: "* Hardware not included.",
          },
          {
            badge: "Service",
            title: "HPC Maintenance",
            description: "Ongoing maintenance service for any HPC cluster",
            price: "$100",
            priceSuffix: "/month",
            configTitle: "",
            config: [] as string[],
            includesTitle: "What's Included:",
            includes: [
              "System updates and patches",
              "Slurm version upgrades",
              "Software package updates",
              "24/7 monitoring",
              "Priority support",
            ],
            note: "* Works for any HPC cluster, including ones not set up by us.",
          },
          {
            badge: "Setup",
            title: "Multi-Node HPC",
            description:
              "Scalable cluster for research groups and production workloads",
            price: "Contact",
            priceSuffix: "",
            configTitle: "Configuration:",
            config: [
              "Multiple Controller Nodes (HA)",
              "Multiple Compute Nodes",
              "GPU Support (Optional)",
              "High-Performance Storage",
              "Advanced Monitoring",
            ],
            includesTitle: "Includes:",
            includes: [
              "Custom Ansible automation",
              "High availability setup",
              "LDAP/Active Directory | NIS",
              "Full training sessions",
              "1-year support",
            ],
            note: "* Requirements vary.",
          },
        ],
      },
      cloudFeatures: {
        title: "Cloud Infrastructure Features",
        items: [
          {
            title: "Auto-Scaling",
            paragraph:
              "Automatically scale compute resources based on workload.",
          },
          {
            title: "Cost Optimization",
            paragraph:
              "Use spot/preemptible instances for batch jobs. Save up to 90%.",
          },
          {
            title: "Job Monitoring",
            paragraph: "Real-time monitoring of pipeline execution.",
          },
          {
            title: "Storage Integration",
            paragraph: "Connect to S3, GCS, or local NFS storage.",
          },
        ],
      },
    },
    pipelines: {
      metadataTitle: "Pipelines & Softwares",
      metadataDescription:
        "Multiomics pipelines and software packages for analysis.",
      title: "Pipelines & Softwares",
      subtitle:
        "Execute multiomics analysis pipelines from raw data to read-to-use exploration and AI/ML analysis",
      intro:
        "Pipelines & Software provides ready-to-use Nextflow pipelines for multi-omics analysis and open-source packages for custom analysis.",
      searchPlaceholder: "Search pipelines...",
      available: {
        title: "Available Pipelines",
        paragraph:
          "At OmicsLab, we deliver end-to-end bioinformatics solutions spanning infrastructure, data platforms, pipelines, and software for comprehensive multi-omics data management and analysis. Our services are designed to support projects at any scale, from individual studies to biobank-level cohorts. Our solution will be published partially via technical blog posts as below.",
        categories: [
          {
            title: "Genomics",
            items: [
              "Short-read germline variant calling",
              "Short-read somatic variant calling",
              "Long-read variant calling",
            ],
          },
          {
            title: "Methylation",
            items: [
              "Bisulfite sequencing analysis",
              "TAPS-based methylation calling",
              "M-bias analysis",
            ],
          },
          {
            title: "Transcriptomics",
            items: [
              "RNA-seq differential expression",
              "Single-cell transcriptomics",
              "Spatial transcriptomics",
            ],
          },
          {
            title: "Proteomics",
            items: [
              "Protein identification",
              "Quantification",
              "PTM analysis",
            ],
          },
          {
            title: "Metabolomics",
            items: [
              "Metabolite profiling",
              "Pathway analysis",
              "Targeted & untargeted",
            ],
          },
          {
            title: "Metagenomics",
            items: [
              "16S amplicon sequencing",
              "Whole-genome shotgun",
              "De novo assembly",
            ],
          },
        ],
      },
      software: {
        title: "Scalable Software Solutions",
        paragraph:
          "We provide open-source software packages for multi-omics data harmonization and analysis at scale.",
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
      title: "Omicslab | Bioinformatics Platform & Dry-Lab Services",
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
  },
};

export type Dictionary = typeof en;
