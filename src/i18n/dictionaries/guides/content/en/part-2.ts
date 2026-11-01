import type { GuideChapter } from "../../types";

export const chaptersPart2: GuideChapter[] = [
  {
    slug: "phan-tich",
    number: "05",
    kicker: "Chapter 05 · Analysis",
    title: "Run an analysis pipeline",
    navTitle: "Running an analysis",
    description:
      "Choose a pipeline, configure compute and parameters, run the job, follow the log and open the results in the workspace.",
    summary:
      "A full run from start to finish: choose a tool, configure compute, build the manifest, follow the job, inspect results and rerun.",
    sections: [
      {
        id: "chon-cong-cu",
        title: "Choose an analysis tool",
        blocks: [
          {
            type: "p",
            text: "Open **Workspace → Analysis → Tools**. The list contains pipelines available in the workspace, with descriptive tags and the latest update. Use the search box to filter, for example type **bacass** for the bacterial genome assembly pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/01-chon-cong-cu.webp",
            alt: "Analysis tab with a bacass search and the nf-core/bacass result",
            caption:
              "Search for a pipeline in the Analysis tab. Results show the name, tags and update date.",
          },
          {
            type: "p",
            text: "Select the pipeline name to open the run form. The first step is choosing compute resources; the suggested configuration depends on data size and pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/02-chon-pipeline.webp",
            alt: "Pipeline run form with pipeline and compute resource selection",
            caption:
              "Choose the pipeline and compute resources before filling in parameters.",
          },
        ],
      },
      {
        id: "cau-hinh-tinh-toan",
        title: "Adjust the compute configuration",
        blocks: [
          {
            type: "p",
            text: "Check CPU, memory and machine type before running. A configuration that is too small can slow the job or exhaust memory; one that is too large increases cost. The estimated cost appears next to the run button.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/03-cau-hinh-tinh-toan.webp",
            alt: "Form for adjusting job CPU, memory and machine type",
            caption:
              "Adjust resources to match the data. The estimated cost changes with the configuration.",
          },
          {
            type: "p",
            text: "For large datasets, run a small subset first to check parameters and runtime before processing everything. A test run does not replace the formal analysis result.",
          },
        ],
      },
      {
        id: "cau-hinh-chung",
        title: "General configuration and config files",
        blocks: [
          {
            type: "p",
            text: "The **General** section selects the profile, tool version and GitHub type used for the run. For Nextflow pipelines, you can point to a custom config file instead of the default.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/04-cau-hinh-chung.webp",
            alt: "Form for choosing profile, tool version and GitHub type",
            caption:
              "Choose the profile, tool version and GitHub source. Options depend on the pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/05-tep-cau-hinh.webp",
            alt: "Config file selection form for a Nextflow pipeline",
            caption:
              "Choose a config file when the pipeline is Nextflow. Leave it empty to use the default configuration.",
          },
          {
            type: "p",
            text: "The config file can come from data already uploaded to the workspace. This is convenient when an organization maintains a standard configuration across projects.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/06-cau-hinh-tu-du-lieu.webp",
            alt: "File picker for a config file in workspace data",
            caption:
              "Choose a config file already uploaded to the workspace instead of creating one.",
          },
        ],
      },
      {
        id: "tham-so",
        title: "Fill in pipeline parameters",
        blocks: [
          {
            type: "p",
            text: "The **Parameters** section contains the fields the pipeline requires. For nf-core, the input is usually a samplesheet and the output is a directory. Check the path and samplesheet format before running.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/07-tham-so.webp",
            alt: "Pipeline parameter form with input and outdir fields",
            caption:
              "Pipeline parameters. The input field accepts a samplesheet or a data directory depending on the pipeline.",
          },
          {
            type: "p",
            text: "If a parameter is a file or folder, you can choose different data from the workspace. Change only the fields that need to change so the rest of the configuration stays stable between runs.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/08-thay-du-lieu.webp",
            alt: "Picker for replacing the input file or folder with data in the workspace",
            caption:
              "Replace the input file or folder with other data in the workspace.",
          },
        ],
      },
      {
        id: "manifest",
        title: "Manifest and saved configuration",
        blocks: [
          {
            type: "p",
            text: "The **manifest** is the entire configuration of a run in JSON: pipeline, version, resources, config file and parameters. Review it before running to catch wrong paths or parameters.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/09-manifest.webp",
            alt: "Preview of the JSON manifest for an analysis run",
            caption:
              "The manifest gathers the configuration and parameters of the run. It can be saved for a later run.",
          },
          {
            type: "p",
            text: "Save the manifest to reuse it later; only the parameters or input FASTQ data need to change. This keeps the tool version and compute configuration consistent across runs.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/10-luu-manifest.webp",
            alt: "Saving the manifest for a later run",
            caption:
              "Save the manifest to reuse the configuration; the next run only needs new input data.",
          },
        ],
      },
      {
        id: "chay-tu-manifest",
        title: "Run from an existing manifest",
        blocks: [
          {
            type: "p",
            text: "If a manifest already exists in the data, open the **Data** tab, find the manifest file and use the run action instead of configuring the analysis again. The platform reads the manifest to restore the pipeline and parameters.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/11-chay-tu-manifest.webp",
            alt: "Data list with a manifest file and the run-analysis action",
            caption: "Run directly from a manifest saved in workspace data.",
          },
          {
            type: "p",
            text: "Review the manifest before running, especially if it was created on an older platform or pipeline version. Parameters that are no longer supported can stop the job early.",
          },
        ],
      },
      {
        id: "theo-doi",
        title: "Follow the job",
        blocks: [
          {
            type: "p",
            text: "After selecting run, the platform opens the job detail page. The page has **Overview**, **Configuration**, **Manifest**, **Script** and **Log** tabs.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/12-chi-tiet-job.webp",
            alt: "Analysis job detail page with overview, configuration, manifest, script and log tabs",
            caption:
              "Job detail after launch: status, pipeline, resources and configuration tabs.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/13-xem-cau-hinh.webp",
            alt: "Configuration tab of an analysis job",
            caption:
              "The Configuration tab shows the resources, config file and profile used.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/14-xem-manifest.webp",
            alt: "Manifest tab of a job with the configuration and parameters used",
            caption:
              "The Manifest tab records the full configuration of the run.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/15-xem-tham-so.webp",
            alt: "Manifest tab showing the pipeline parameters used",
            caption:
              "Review the parameters used, including input, outdir and pipeline options.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/16-json-tho.webp",
            alt: "Raw JSON view of the manifest",
            caption:
              "The raw JSON view is useful for checking or comparing configuration details.",
          },
          {
            type: "p",
            text: "The **Log** tab shows which step the job has reached. For Nextflow, the log usually covers environment setup, configuration files, data preparation and each process.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/17-log.webp",
            alt: "Log of a running analysis job with setup steps and processes",
            caption:
              "Job log. You can search it, download it and expand the viewing area.",
          },
        ],
      },
      {
        id: "ket-qua",
        title: "Open the results",
        blocks: [
          {
            type: "p",
            text: "When the job finishes, its status changes to **Completed**. If a job fails or times out, the log is the first place to check before rerunning.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/18-hoan-tat.webp",
            alt: "Completed analysis job with the Completed status",
            caption:
              "A completed job. Runtime and cost are recorded in the overview.",
          },
          {
            type: "p",
            text: "The result path is in the **outdir** parameter of the manifest. Reopen the manifest, find outdir, then switch to the Data tab and open that folder.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/19-tim-outdir.webp",
            alt: "Manifest with the outdir parameter highlighted to locate results",
            caption:
              "Find outdir in the manifest to locate the results folder.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/20-thu-muc-ket-qua.webp",
            alt: "Job result folder in the data tab",
            caption:
              "Results are in the workspace folder once the job has completed.",
          },
          {
            type: "p",
            text: "For nf-core pipelines, the MultiQC report is usually an HTML file in the results folder. Double-click it to open the combined quality and summary report.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/21-multiqc.webp",
            alt: "MultiQC report file in the results folder",
            caption:
              "Open the MultiQC report from the results folder. File names and formats depend on the pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/22-xem-toan-man.webp",
            alt: "MultiQC report expanded to full screen",
            caption: "Expand the report to read charts and tables more easily.",
          },
          {
            type: "p",
            text: "The viewer supports HTML, JSON and text. For small files you can edit the content and save it; the change affects only the copy in the workspace.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/23-xem-html-json.webp",
            alt: "HTML file viewer and JSON editor in the workspace",
            caption: "View HTML directly or edit JSON and text in the browser.",
          },
        ],
      },
      {
        id: "nhieu-job",
        title: "Multiple jobs and history",
        blocks: [
          {
            type: "p",
            text: "When several analyses run at once, the **Running** tab shows the parallel jobs so they can be followed together. The number of concurrent jobs is limited by the plan.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/24-job-dang-chay.webp",
            alt: "Running tab with several analysis jobs",
            caption: "Follow multiple running jobs within the same workspace.",
          },
          {
            type: "p",
            text: "The **History** tab keeps completed and previous jobs, including status, runtime, cost and creator. Use the status filter to find failed jobs or jobs to rerun.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/25-lich-su-job.webp",
            alt: "History tab with previous jobs and their statuses",
            caption: "Job history records status, runtime, cost and creator.",
          },
        ],
      },
      {
        id: "chay-lai",
        title: "Rerun and compare",
        blocks: [
          {
            type: "p",
            text: "The **Rerun** button creates a new job from the old configuration. You can keep the parameters or replace the input data before running.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/26-chay-lai.webp",
            alt: "Rerun icon on a history row",
            caption:
              "Rerun a job with the configuration already used. The new job has its own history.",
          },
          {
            type: "p",
            text: "After a rerun, the job page includes information about what changed compared with the previous run. Check this before comparing results so a parameter change is not mistaken for a data difference.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/27-so-sanh-chay-lai.webp",
            alt: "Comparison tab showing changes between the rerun and the original job",
            caption: "Changes between the rerun and the original run.",
          },
        ],
      },
      {
        id: "danh-gia",
        title: "Job evaluation",
        blocks: [
          {
            type: "p",
            text: "The **Evaluation** tab summarises jobs by month and status. Use it to check run counts, completion rate and cumulative workspace cost.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/28-danh-gia.webp",
            alt: "Evaluation tab with a chart of jobs by month and status",
            caption:
              "Job evaluation by month and status. Figures cover the jobs retained in history.",
          },
        ],
      },
      {
        id: "pipeline-ngoai",
        title: "Pipelines outside the platform",
        blocks: [
          {
            type: "p",
            text: "Beyond the built-in catalogue, you can configure a pipeline from an external repository. The platform provides the runtime and stores the logs, but it does not validate the content, reliability or reproducibility of the external tool.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/29-pipeline-ngoai.webp",
            alt: "External pipeline configuration form with a notice about user responsibility",
            caption:
              "External pipelines: the user is responsible for the reliability and reproducibility of the tool.",
          },
          {
            type: "note",
            title: "Responsibility when using external tools",
            text: "Before using results for publication or professional decisions, check the version, licence and parameters, and validate part of the output with an independent tool. The fact that the platform can run a pipeline does not mean the results have been verified.",
          },
        ],
      },
    ],
  },
  {
    slug: "studio",
    number: "06",
    kicker: "Chapter 06 · Studio",
    title: "Studio: VS Code, JupyterLab and RStudio",
    navTitle: "Studio",
    description:
      "Open an interactive session on workspace compute, connect through the browser, save snapshots and configure Git safely.",
    summary:
      "Run and connect Studio, use VS Code Server, JupyterLab or RStudio, save snapshots and manage Git tokens.",
    sections: [
      {
        id: "studio-la-gi",
        title: "Studio in the browser",
        blocks: [
          {
            type: "p",
            text: "**Studio** opens an interactive application on workspace compute and displays it in the browser. Data stays in the workspace bucket; the session exists only while the job runs.",
          },
          {
            type: "figure",
            src: "/guides/studio/01-studio.webp",
            alt: "Studio tab with the application list and running sessions",
            caption:
              "Studio runs a web application on workspace compute. The session is managed like a job.",
          },
        ],
      },
      {
        id: "chay-studio",
        title: "Start a Studio session",
        blocks: [
          {
            type: "p",
            text: "Open **Workspace → Studio → Tools**, choose an application, then select compute resources and startup configuration. The flow is similar to running an analysis job.",
          },
          {
            type: "figure",
            src: "/guides/studio/03-chay-studio.webp",
            alt: "Studio launch form with application and resource selection",
            caption:
              "Choose the Studio application, resources and configuration before launching.",
          },
          {
            type: "p",
            text: "Startup time depends on image download and machine configuration. With large images, the first run can take longer than later runs.",
          },
        ],
      },
      {
        id: "ket-noi",
        title: "Connect to the session",
        blocks: [
          {
            type: "p",
            text: "When the Studio job is running, open the **Log** tab to check the web address and connection status. Select **Connect** to open the session in a new tab.",
          },
          {
            type: "figure",
            src: "/guides/studio/04-ket-noi-studio.webp",
            alt: "Running Studio job with a connect button and startup log",
            caption:
              "Connect to the Studio session once the job is running. If the button is not ready, check the startup log.",
          },
          {
            type: "p",
            text: "A Studio session consumes time and cost like an analysis job. End the session when it is no longer in use to avoid unintended charges.",
          },
        ],
      },
      {
        id: "ba-ung-dung",
        title: "Three applications with preinstalled CLI tools",
        blocks: [
          {
            type: "p",
            text: "Visual Studio Code Server, JupyterLab and RStudio Server can run at the same time if the plan allows the corresponding number of sessions. Each application has its own version, shown in the session list.",
          },
          {
            type: "figure",
            src: "/guides/studio/05-ba-studio.webp",
            alt: "Three running Studio sessions: VS Code, JupyterLab and RStudio",
            caption:
              "Three Studio sessions running together: Visual Studio Code Server, JupyterLab and RStudio Server.",
          },
          {
            type: "p",
            text: "In VS Code Server, the terminal includes the environment’s command-line tools. Check the Python, R or bioinformatics tool versions before running a long command.",
          },
          {
            type: "figure",
            src: "/guides/studio/06-vscode-cli.webp",
            alt: "VS Code Server with a terminal and tool version checks",
            caption:
              "VS Code Server provides a terminal and preinstalled command-line tools.",
          },
          {
            type: "figure",
            src: "/guides/studio/07-jupyter-cli.webp",
            alt: "JupyterLab with a terminal and environment checks",
            caption:
              "JupyterLab has its own terminal and a preinstalled Python kernel.",
          },
          {
            type: "figure",
            src: "/guides/studio/08-rstudio-cli.webp",
            alt: "RStudio with a terminal and an R session",
            caption:
              "RStudio Server provides a terminal and an R session ready to use.",
          },
        ],
      },
      {
        id: "snapshot",
        title: "Save a session snapshot",
        blocks: [
          {
            type: "p",
            text: "A **snapshot** saves the session home directory to the workspace so work can continue on a later visit. Create a snapshot after installing packages or completing part of an analysis, before stopping the job.",
          },
          {
            type: "figure",
            src: "/guides/studio/09-snapshot.webp",
            alt: "Creating a snapshot of a running Studio session",
            caption:
              "Create a snapshot of the Studio session. The snapshot saves the home directory to the workspace.",
          },
          {
            type: "p",
            text: "Check that the snapshot has uploaded successfully before stopping the job. If the upload has not finished when the session stops, changes in the home directory may not be retained.",
          },
          {
            type: "figure",
            src: "/guides/studio/10-xac-nhan-snapshot.webp",
            alt: "Confirmation that the Studio snapshot uploaded successfully",
            caption:
              "Confirm the snapshot is complete before stopping the job.",
          },
        ],
      },
      {
        id: "token",
        title: "Git tokens and the credential broker",
        blocks: [
          {
            type: "p",
            text: "Git credentials can be stored at account level in **Settings → Version control**. Use a token with minimal permissions and a short lifetime for private repositories; avoid broad personal tokens for automated jobs.",
          },
          {
            type: "figure",
            src: "/guides/studio/02-github-token-tai-khoan.webp",
            alt: "Version control settings with GitHub credentials",
            caption:
              "Account-level Git credentials for repositories that require access.",
          },
          {
            type: "p",
            text: "Inside Studio, the platform can issue a sandbox Git token and keep the CLI token hidden from the user while still letting tools use it. This reduces exposure of long-lived tokens in terminals or configuration files.",
          },
          {
            type: "figure",
            src: "/guides/studio/11-sandbox-token.webp",
            alt: "Sandbox Git token design with a CLI token hidden from the user",
            caption:
              "Sandbox Git token: tools can use the token while the user does not see its full value.",
          },
          {
            type: "p",
            text: "For agent integrations, a credential broker can issue credentials per session instead of placing a fixed token in the environment. This is an additional layer, not a replacement for reviewing each token’s permissions.",
          },
          {
            type: "figure",
            src: "/guides/studio/12-credential-broker.webp",
            alt: "Credential broker integration for agents and tools in Studio",
            caption:
              "The credential broker issues per-session credentials to agent integrations.",
          },
        ],
      },
      {
        id: "chay-lai",
        title: "Rerun Studio",
        blocks: [
          {
            type: "p",
            text: "When a new session starts from a snapshot, the environment does not need to be installed again. Choose the relevant snapshot, check resources and launch; preparation is usually faster than the first run.",
          },
          {
            type: "figure",
            src: "/guides/studio/13-chay-lai-studio.webp",
            alt: "Rerunning Studio from a saved snapshot",
            caption:
              "Rerun Studio from a snapshot to continue work without setting up from scratch.",
          },
        ],
      },
    ],
  },
  {
    slug: "trinh-xem",
    number: "07",
    kicker: "Chapter 07 · Viewers",
    title: "View data and results",
    navTitle: "Viewers",
    description:
      "Open files in IGV, Mol*, ECharts and Graphic Walker without downloading them.",
    summary:
      "Four specialised viewers for genomes, molecular structures, charts and tabular data exploration.",
    sections: [
      {
        id: "tong-quan",
        title: "Four viewers",
        blocks: [
          {
            type: "p",
            text: "The **Viewers** tab opens workspace files in four viewers: **Genome (IGV)** for BAM, CRAM, SAM, VCF, BED, GFF/GTF, bigWig and bigBed; **Structure (Mol*)** for PDB, mmCIF, SDF and MOL2; **Chart (ECharts)** and **Data exploration (Graphic Walker)** for CSV/TSV.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/01-trinh-xem.webp",
            alt: "Viewers tab with IGV, MolStar, ECharts and Graphic Walker options",
            caption:
              "Choose a viewer in the sidebar. Each viewer accepts only the file types it supports.",
          },
          {
            type: "p",
            text: "The **Browse** button selects files from the workspace bucket; the picker is filtered to formats the current viewer supports. You can reload, expand to full screen or remove a loaded file without leaving the viewer.",
          },
        ],
      },
      {
        id: "molecular",
        title: "Molecular structures",
        blocks: [
          {
            type: "p",
            text: "The **Mol*** viewer renders interactive 3D structures. You can rotate, zoom, select chains or atoms and change the representation. Display changes do not modify the source file in the workspace.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/02-protein-structure.webp",
            alt: "3D protein structure in the MolStar viewer",
            caption:
              "A protein structure in Mol*. Rotating, zooming and selecting chains change the display only.",
          },
        ],
      },
      {
        id: "bieu-do",
        title: "Charts from tables",
        blocks: [
          {
            type: "p",
            text: "**ECharts** draws line, bar, area, scatter or pie charts from CSV/TSV. You can use the viewer’s sample data or select a table in the workspace, then assign columns to axes and series.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/03-bieu-do.webp",
            alt: "ECharts chart built from CSV or TSV data",
            caption:
              "An ECharts chart from a CSV/TSV table. Assign axis columns and series in the sidebar.",
          },
        ],
      },
      {
        id: "graphic-walker",
        title: "Data exploration",
        blocks: [
          {
            type: "p",
            text: "**Graphic Walker** lets you drag fields to explore a table in a Tableau-like interface. It suits quick checks of distributions or relationships before writing a formal analysis script.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/04-graphic-walker.webp",
            alt: "Graphic Walker interface with draggable data fields",
            caption:
              "Graphic Walker: drag fields onto axes to build exploratory charts.",
          },
          {
            type: "p",
            text: "A chart created in a viewer is an exploration tool, not part of the pipeline. If it needs to be reproducible, record the fields, filters and data version used.",
          },
        ],
      },
    ],
  },
  {
    slug: "quan-ly",
    number: "08",
    kicker: "Chapter 08 · Management",
    title: "Monitoring, support and account",
    navTitle: "Management & support",
    description:
      "Check budgets, review activity, submit support requests, configure the account and create API tokens.",
    summary:
      "After the analysis: budget, activity log, support, account settings and tokens for the SDK/CLI.",
    sections: [
      {
        id: "ngan-sach",
        title: "Workspace budget",
        blocks: [
          {
            type: "p",
            text: "**Budget** tracks spending, limits and storage allocation for the workspace. The **Daily spend** tab separates analysis and Studio cost by day, with the corresponding task list and cost.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/01-ngan-sach.webp",
            alt: "Workspace budget page with a daily spend chart and task list",
            caption: "Workspace budget: daily spending on analysis and Studio.",
          },
          {
            type: "p",
            text: "Budget figures reflect tasks still retained in history. When reconciling with an invoice, compare the same date range and check the organization Billing tab as well.",
          },
        ],
      },
      {
        id: "hoat-dong",
        title: "Activity and audit log",
        blocks: [
          {
            type: "p",
            text: "The **Activity** tab records actions related to data and jobs in the workspace. Use it to check who uploaded, edited or deleted data when several members work together.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/02-hoat-dong.webp",
            alt: "Activity tab with a log of data actions in the workspace",
            caption:
              "The activity log helps trace data changes between members.",
          },
          {
            type: "p",
            text: "The log supports investigation but does not replace backup or access-control procedures. For important data, keep an independent copy under the organization’s policy.",
          },
        ],
      },
      {
        id: "ho-tro",
        title: "Submit a support request",
        blocks: [
          {
            type: "p",
            text: "Open **Support → Submit request**, enter a title, choose a category (bug, feature request, billing, data, account or other), a priority and a description. Attach screenshots or log files where relevant.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/03-gui-ho-tro.webp",
            alt: "Support request form with category, priority and attachments",
            caption:
              "The support request form. Specific information usually shortens handling time.",
          },
          {
            type: "p",
            text: "Describe the workspace or project involved, when the issue occurred and the steps to reproduce it. Do not attach sensitive data or credentials to a ticket.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/04-danh-sach-ho-tro.webp",
            alt: "Support request list with status, priority and category",
            caption:
              "The account’s support requests, with status and assignee.",
          },
          {
            type: "p",
            text: "Open a request to read the conversation and follow progress. New replies are usually sent by email; you can also add comments in the ticket.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/05-chi-tiet-ho-tro.webp",
            alt: "Support request detail with the conversation and status",
            caption:
              "Support request detail: conversation, status and attachments.",
          },
        ],
      },
      {
        id: "tai-khoan",
        title: "Account settings",
        blocks: [
          {
            type: "p",
            text: "**Account settings** includes profile, account, API token, security, version control, invoices and test mode. This is where personal invoice details and user-level Git configuration are edited.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/06-che-do-thu-nghiem.webp",
            alt: "Account settings with the test mode section",
            caption:
              "Test mode runs the walkthrough with sample data without touching a real server.",
          },
          {
            type: "p",
            text: "Test mode is useful for getting familiar with the interface. While it is on, the walkthrough does not create real data; turn it off before working with a real workspace.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/07-huong-dan-tai-khoan.webp",
            alt: "Detailed guidance in the account settings",
            caption:
              "In-account guidance covers the basic steps before working with real data.",
          },
        ],
      },
      {
        id: "api-token",
        title: "API tokens for the SDK and CLI",
        blocks: [
          {
            type: "p",
            text: "Open **Settings → API token → Add**, enter a name, choose an expiry, workspace scope and role. The token is shown only once; copy it immediately and store it securely.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/08-api-token.webp",
            alt: "Create API token dialog with name, expiry, scope and role",
            caption:
              "Create an API token for the SDK or CLI. Choose the shortest expiry and narrowest scope needed.",
          },
          {
            type: "p",
            text: "A token used by a script or integration should have minimal permissions, a short lifetime and be revoked when no longer needed. Do not place tokens in public source code or support tickets.",
          },
          {
            type: "p",
            text: "Installation and CLI usage are covered in [SDK / CLI](https://docs.omicslab.io/en/sdk/installation).",
          },
        ],
      },
    ],
  },
];
