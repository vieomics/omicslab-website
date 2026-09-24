import { TextSegment } from "../types";

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
    dataPlatform: "Data Platform",
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
      title: "Innovative Bioinformatics Services & Open-Source Tools",
      paragraph:
        "Omicslab empowers researchers with scalable bioinformatics solutions. From advanced variant calling pipelines to cutting-edge multiomics analysis tools, we provide production-ready workflows and software for complex biological data analysis.",
      contactCta: "Contact for Work",
      githubCta: "View on GitHub",
    },
    services: {
      subtitle: "Our Services",
      title: "Comprehensive Bioinformatics Solutions",
      paragraph:
        "From production-grade variant calling pipelines to cutting-edge data platforms, we provide complete tools and workflows for your bioinformatics research needs.",
      items: [
        {
          title: "Bioinformatics Pipelines",
          paragraph:
            "Production-ready pipelines for comprehensive bioinformatics analysis and data processing.",
        },
        {
          title: "Multiomics",
          paragraph:
            "Advanced integration and harmonization of complex multiomics datasets for comprehensive analysis at scale.",
        },
        {
          title: "Infrastructure HPC SLURM",
          paragraph:
            "Production-ready infrastructure configuration for high-performance computing cluster setup and management.",
        },
        {
          title: "Data Platform (only for Vietnam region)",
          paragraph:
            "Comprehensive bioinformatics data platform for integration, analysis, and management of complex datasets.",
        },
      ],
    },
    about: {
      title: "Empowering Bioinformatics Research",
      paragraph1:
        "Omicslab is an open-source initiative driving innovation in bioinformatics and multiomics research. We build scalable tools, workflows, and libraries designed to support complex experimental designs across bioinformatics applications.",
      paragraph2:
        "Our mission is to empower researchers with accessible, high-performance, and modern solutions for data analysis and integrative multiomics. From production-ready variant calling pipelines to cutting-edge data platforms, we provide everything you need for advanced bioinformatics research.",
      cta: "Explore on GitHub",
      badge: {
        line1: "Omics",
        line2: "Open Sources",
        line3: "Optimization",
      },
    },
    cta: {
      title: "What Are You Looking For?",
      titleAccent: "Get Started Now",
      paragraph:
        "We provide open-source solutions. If you're interested, contact us to discuss a partnership.",
      button: "Contact for Work",
    },
    faq: {
      subtitle: "FAQ",
      title: "Any Questions? Answered",
      paragraph:
        "Below are answers to some of the most common questions we receive.",
      items: [
        {
          question: "Is there a cost for using your solutions?",
          answer:
            "Our open-source solutions are available at no cost. The Data Platform subscription is 1,000,000 VND/month for 10 users (fixed price until end of July 2026). Storage (S3) is 1,000 VND/GB/month. HPC compute starts at 20,000 VND/hour (max 16 CPUs / 32 GB RAM, ratio 1:2). nf-core pipelines are free, OmicsLab pipelines are adjusted, and metagenomics assembly is 100,000 VND/sample for complete genomes. Fully local deployment of the platform and HPC is also available — contact us for details.",
        },
        {
          question: "How is pricing structured?",
          answer:
            "We provide customized pricing based on your technical requirements and project scope. Rather than hourly billing, we offer project-based contracts that align with your business objectives and timeline.",
        },
        {
          question: "What is the availability of your data platform?",
          answer:
            "Our data platform is currently under trial in Vietnam. Contact us to get 2 free genomics assembly sample runs on the platform. Full integration is supported when using our IaaS infrastructure for High Performance Computing with SLURM configuration.",
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
        "Use the navigation menu to access: Data Platform, Service Platform, or Software Platform.",
      metadataDescription:
        "Bioinformatics solutions for multiomics analysis, data management, and pipeline execution.",
    },
    dataPlatform: {
      metadataTitle: "Data Platform",
      metadataDescription:
        "RIVER - Bioinformatics research platform for data management, HPC, and tool execution.",
      title: "Data Platform",
      subtitle:
        "Rapid Integration and Visualization for Enhanced Research (RIVER) - A scalable platform that unifies data management, high-performance computing (HPC), and tool execution.",
      intro:
        "Bioinformatics research often requires collecting and curating data, executing computational tools, and managing results across distributed resources with high reproducibility. In addition, challenges related to efficiency, accessibility, and security must be addressed. RIVER integrates three key components: data storage, tool version control, and computing resources. Acting as a controller, RIVER provides a role-based access control system, enabling users to create and manage credentials, projects, and tools, while analysis jobs are launched and monitored via a user-friendly web interface.",
      note: [
        { strong: "Note:" },
        { text: " The Data Platform is currently under " },
        { strong: "trial" },
        { text: ". It is " },
        { strong: "not free" },
        { text: ". " },
        { link: { href: "/contact", text: "Contact us" } },
        { text: " to get " },
        { strong: "2 free genomics assembly sample runs" },
        { text: " on the platform." },
      ] as TextSegment[],
      pricing: {
        title: "Pricing",
        cards: [
          {
            title: "Platform Subscription",
            price: "1,000,000 VND",
            period: "/month for 10 users",
            highlight: "Fixed price until end of July 2026",
            features: [
              "Role-based access control",
              "Project & credential management",
              "Web interface & monitoring",
            ],
          },
          {
            title: "Storage (S3)",
            price: "1,000 VND",
            period: "/GB per month",
            features: [
              "Secure scalable object storage",
              "Data organized by project",
              "RBAC for data access",
            ],
          },
          {
            title: "HPC Compute",
            price: "20,000 VND",
            period: "/hour (max 16 CPUs / 32 GB RAM)",
            note: "Ratio 1:2 — 1,250 VND/hour per 1 CPU + 2 GB RAM",
            features: [
              "nf-core pipelines: Free",
              "OmicsLab pipelines: Adjusted",
              "Metagenomics assembly: 100,000 VND/sample",
              "Slurm HPC cluster access",
              "Interactive web apps (RStudio, Jupyter, VS Code)",
            ],
          },
        ],
        trialNote: [
          { text: "The platform is currently under trial. " },
          { link: { href: "/contact", text: "Contact us" } },
          { text: " to get " },
          { strong: "2 free genomics assembly sample runs" },
          { text: "." },
        ] as TextSegment[],
        localNote: [
          { strong: "Fully local deployment" },
          { text: " of the entire platform and HPC is available. " },
          { link: { href: "/contact", text: "Contact us" } },
          { text: " for more details." },
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
                unitPrice: "1,000 VND/GB",
                qty: "~50 GB",
                subtotal: "~50,000 VND",
              },
            ],
            totalLabel: "Estimated Total / Month",
            total: "~15,050,000 VND",
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
                unitPrice: "1,000 VND/GB",
                qty: "~10 GB",
                subtotal: "~10,000 VND",
              },
            ],
            totalLabel: "Estimated Total / Month",
            total: "~12,010,000 VND",
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
              "RIVER allows effortless integration and execution of community-developed workflows as well as custom pipelines with easy migration from existing tools. It supports all nf-core pipelines (https://nf-co.re/pipelines/) or required to add a minor configuration for non nf-core nextflow, snakemake and bash script pipelines",
          },
          {
            title: "Interactive Web Apps",
            paragraph:
              "RIVER provides a secure way to publish interactive web applications from HPC environments to the public network, with authentication and centralized system control. It includes a ready-to-use Studio stack—RStudio Server, JupyterLab, and VS Code Server—and also supports access to other web-based applications such as custom dashboards.",
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
  pricingPage: {
    title: "Pricing",
    description:
      "Omicslab pricing for the data platform, storage, and HPC compute.",
    section: {
      subtitle: "Pricing",
      title: "Contact Us for Pricing",
      paragraph:
        "The Data Platform is currently under trial. Contact us to get 2 free genomics assembly sample runs on the platform.",
      lines: [
        [
          { strong: "Platform subscription:" },
          {
            text: " 1,000,000 VND/month for 10 users — fixed until end of July 2026.",
          },
        ],
        [
          { strong: "Storage (S3):" },
          { text: " 1,000 VND/GB/month." },
        ],
        [
          { strong: "HPC compute:" },
          {
            text: " 20,000 VND/hour (max 16 CPUs / 32 GB RAM, ratio 1:2). nf-core pipelines free, OmicsLab pipelines adjusted, metagenomics assembly 100,000 VND/sample.",
          },
        ],
        [
          { strong: "Fully local deployment" },
          {
            text: " of platform & HPC also available — contact us for details.",
          },
        ],
      ] as TextSegment[][],
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
      "Innovative bioinformatics solutions for researchers. Production-ready variant calling pipelines, multiomics analysis tools, and data platforms.",
    home: {
      title: "Omicslab - Omics Technology",
      description:
        "Innovative bioinformatics solutions for researchers. Production-ready variant calling pipelines, multiomics analysis tools, and data platforms.",
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
    pricing: {
      title: "Pricing",
      description:
        "Omicslab pricing for the data platform, storage, and HPC compute.",
    },
  },
};

export type Dictionary = typeof en;
