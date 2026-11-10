import type { GuideChapter } from "../../types";

export const chaptersPart1: GuideChapter[] = [
  {
    slug: "bat-dau",
    number: "01",
    kicker: "Chapter 01 · Getting started",
    title: "Account, organization and initial details",
    navTitle: "Getting started",
    description:
      "Sign in, choose a language, create an organization and check the details used for invoices and support.",
    summary:
      "From first sign-in to an organization ready for workspaces: account, language, organization details and roles.",
    sections: [
      {
        id: "dang-nhap",
        title: "Sign in",
        blocks: [
          {
            type: "p",
            text: "The web platform is at [platform.omicslab.io](https://platform.omicslab.io). There are two ways to sign in: Google OAuth2, or email and password. With a Google account, choose **Continue with ...**; with email, enter the address and password, then select **Sign in**.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/01-dang-nhap-google.webp",
            alt: "Omicslab sign-in page with a Google account option and an email and password form",
            caption:
              "Sign in with Google OAuth2 or email and password. The screenshot shows the Vietnamese interface.",
          },
          {
            type: "p",
            text: "After sign-in, the platform opens the list of organizations the account belongs to. A new account with no organization sees an empty list and the create button.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/02-danh-sach-to-chuc.webp",
            alt: "Organization list after signing in",
            caption:
              "The organization list is the default entry point after sign-in.",
          },
          {
            type: "p",
            text: "If you do not have an account, use the **Sign up** link below the form. Technical reference: [Authentication](https://docs.omicslab.io/en/authentication).",
          },
        ],
      },
      {
        id: "ngon-ngu",
        title: "Choose the interface language",
        blocks: [
          {
            type: "p",
            text: "The language switch sits in the top-right corner, next to the interface icon. The platform interface and the technical documentation change language independently; switching here does not change the language of the omicslab.io website.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/03-doi-ngon-ngu.webp",
            alt: "Language switch in the top-right corner of the platform interface",
            caption:
              "Choose the interface language in the top-right corner. The setting applies to the platform only.",
          },
          {
            type: "note",
            title: "About the screenshots",
            text: "The screenshots in this guide show the Vietnamese interface. When reading the English version, field and button labels may appear in English but keep the same position.",
          },
        ],
      },
      {
        id: "tao-to-chuc",
        title: "Create an organization",
        blocks: [
          {
            type: "p",
            text: "An organization is the top-level container: members, shared credentials, workspaces and invoices all belong to one organization. Select **Organization → Add**, then enter the name, description, tax code, address, billing email and phone number.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/04-tao-to-chuc.webp",
            alt: "Create organization form with name, description, tax code, address, email, phone, data type and region",
            caption:
              "The create organization form. Legal details and the billing email are used for invoices and support.",
          },
          {
            type: "p",
            text: "Two fields deserve attention before creating the organization: **Organization type** and **Region**. The type declares the data the organization expects to process; the region determines where data is stored. In the example here, the organization is declared for public or open data and the global region (no restriction).",
          },
          {
            type: "note",
            title: "Data scope of the public platform",
            text: "The public platform (Marketplace) is intended for non-human data, simulated or benchmark data, and data that has been lawfully published or properly de-identified. Human genomic and health data of individuals in Vietnam must not be uploaded to the public platform; that data is handled through a separate self-hosted deployment under a contract. See the [Privacy Policy](/privacy) and the [Service Provision Policy](/policies/service-provision).",
          },
          {
            type: "p",
            text: "After selecting **Create**, the organization appears in the list and the creating account becomes its admin.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/05-to-chuc-da-tao.webp",
            alt: "Organization list with one newly created organization",
            caption:
              "The new organization appears in the list; the creating account becomes admin.",
          },
        ],
      },
      {
        id: "mo-to-chuc",
        title: "Open, edit and archive an organization",
        blocks: [
          {
            type: "p",
            text: "The three-dot menu at the end of each row offers **edit** and **archive**. Double-click a row to open the organization and its tabs.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/06-thao-tac-to-chuc.webp",
            alt: "Three-dot menu on an organization row with edit and delete options",
            caption: "Row actions for an organization: edit or archive.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/07-mo-cai-dat-to-chuc.webp",
            alt: "Organization settings page opened by double-clicking an organization row",
            caption:
              "Double-click to open the organization and reach the member, compute, storage, job, budget and billing tabs.",
          },
          {
            type: "p",
            text: "Archiving cannot be undone. Before archiving, check which workspaces, data and invoices still belong to the organization.",
          },
          {
            type: "p",
            text: "Organization tabs include **Members**, **Compute**, **Storage**, **Version control**, **Jobs**, **Budget** and **Billing**. Access to each tab depends on the role:",
          },
          {
            type: "table",
            head: ["Role", "What you can do"],
            rows: [
              [
                "**Admin**",
                "Manage settings, invite or remove members, delete the organization",
              ],
              ["**Contributor**", "Create workspaces, use shared credentials"],
              ["**Viewer**", "View organization details and the member list"],
            ],
          },
          {
            type: "p",
            text: "The full permission matrix is in [RBAC](https://docs.omicslab.io/en/permission).",
          },
        ],
      },
      {
        id: "dieu-kien",
        title: "What you need before continuing",
        blocks: [
          {
            type: "p",
            text: "An organization without a current subscription cannot create workspaces or run jobs. After creating the organization, the next step is usually to subscribe in the **Billing** tab, which is covered in chapter 2.",
          },
          {
            type: "note",
            title: "Plan limits",
            text: "The number of workspaces, members and concurrent jobs is limited by the plan. Check the plan table before inviting members or creating workspaces.",
          },
        ],
      },
    ],
  },
  {
    slug: "thanh-toan",
    number: "02",
    kicker: "Chapter 02 · Billing",
    title: "Subscription plans, payment and invoices",
    navTitle: "Billing",
    description:
      "Subscribe to a plan, confirm buyer details, pay by QR, top up the balance and retrieve e-invoices.",
    summary:
      "Organization transactions: choose a plan, check the buyer, pay by QR, top up the balance and obtain invoices.",
    sections: [
      {
        id: "chon-goi",
        title: "Choose a subscription plan",
        blocks: [
          {
            type: "p",
            text: "Open **Organization → Billing → Subscription**. Only organization admins can subscribe, top up, cancel a plan and view invoices; other members see the plan status only. The table below summarises the four plans at the time of writing:",
          },
          {
            type: "table",
            head: [
              "Plan",
              "Workspaces",
              "Organization members",
              "Members per workspace",
              "Concurrent Studio sessions",
              "Concurrent analyses",
              "LIMS",
            ],
            rows: [
              ["**Individual**", "1", "1", "1", "1", "1", "—"],
              ["**Lite**", "2", "1", "3", "5", "5", "✓"],
              ["**Pro**", "20", "10", "30", "50", "50", "✓"],
              [
                "**Business**",
                "By contract",
                "By contract",
                "By contract",
                "By contract",
                "By contract",
                "✓",
              ],
            ],
          },
          {
            type: "p",
            text: "**Business** is a contract plan and cannot be self-subscribed; use **Contact sales**. Prices appear on the plan cards at checkout and are not fixed in this document.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/01-chon-goi.webp",
            alt: "Billing and subscription tab with four plan cards: Individual, Lite, Pro and Business",
            caption:
              "Choose a plan in the Billing tab. Limits and prices may change over time.",
          },
        ],
      },
      {
        id: "xac-nhan",
        title: "Confirm terms and duration",
        blocks: [
          {
            type: "p",
            text: "The checkout dialog lets you choose prepaid months, apply a promo code and confirm that you have read the terms. The current plan keeps working until the new invoice is paid; abandoning checkout does not remove the plan in use.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/02-xac-nhan-dieu-khoan.webp",
            alt: "Individual plan checkout dialog with months, promo code, payment details and terms confirmation",
            caption:
              "Checkout dialog: prepaid months, promo code and terms confirmation.",
          },
          {
            type: "p",
            text: "The subscription price is held until the price adjustment date set by platform administration. The final paid period may end up to one month later; the dialog only offers month counts within that limit.",
          },
          {
            type: "note",
            title: "Payment window",
            text: "The platform accepts new payments only between **00:00 and 22:00** Vietnam time each day. After 22:00, subscribe, top-up and invoice payment buttons are temporarily closed; existing invoices and topped-up balances are unaffected. The 22:00–24:00 window is reserved for reconciliation and e-invoice issuance.",
          },
        ],
      },
      {
        id: "thong-tin",
        title: "Check the buyer details",
        blocks: [
          {
            type: "p",
            text: "Before paying, check the name, tax code, address and email on the invoice. For an individual purchase, the platform may prefill details from the Google account; if they are missing or incorrect, open account settings in the lower-left corner, edit the profile and save it.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/03-thong-tin-ca-nhan.webp",
            alt: "Account settings screen with personal details",
            caption:
              "Open account settings when personal details are missing or incorrect.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/04-chinh-sua-thong-tin.webp",
            alt: "Edit personal details form with a save button",
            caption:
              "Edit the profile and save it before creating the invoice.",
          },
          {
            type: "p",
            text: "For a company purchase, switch to the organization tab and check the organization details. If something is wrong, return to the organization list and correct it before creating the invoice.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/05-kiem-tra-to-chuc.webp",
            alt: "Screen for checking organization details used on the invoice",
            caption:
              "Check the organization details before paying on behalf of a company.",
          },
        ],
      },
      {
        id: "thanh-toan",
        title: "Pay by QR",
        blocks: [
          {
            type: "p",
            text: "Select **Pay** to create a pending invoice. The invoice page shows the SePay QR code, amount, transfer reference and bank details. Scan the code with a banking app or transfer the exact amount and reference.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/06-thanh-toan-qr.webp",
            alt: "Pending invoice with a SePay QR code, amount and bank transfer details",
            caption:
              "The pending invoice shows a QR code and bank transfer details. Keep the transfer reference unchanged.",
          },
          {
            type: "p",
            text: "The e-invoice is issued automatically when the system records the payment. Recognition time depends on the bank and payment channel, so avoid creating a duplicate invoice while waiting.",
          },
        ],
      },
      {
        id: "hoa-don",
        title: "View and retrieve invoices",
        blocks: [
          {
            type: "p",
            text: "After payment, paid invoices appear in **Billing → Invoices**. Select the eye icon to view details, or open an invoice to download PDF or XML where available.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/07-hoa-don.webp",
            alt: "Organization invoice list with statuses and a view action",
            caption: "The organization invoice list after payment.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/08-chi-tiet-hoa-don.webp",
            alt: "Invoice detail with buyer, tax code, address and e-invoice status",
            caption:
              "Invoice detail: buyer, tax code, address and e-invoice issuance status.",
          },
          {
            type: "p",
            text: "The e-invoice is also sent to the registered email address. You can retrieve it again from the SePay portal using the lookup code in the email or on the invoice.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/09-tra-cuu-sepay.webp",
            alt: "SePay e-invoice lookup portal with a lookup code and invoice preview",
            caption:
              "Retrieve the e-invoice on SePay with the code from the email or invoice.",
          },
        ],
      },
      {
        id: "nap-tien",
        title: "Top up the balance",
        blocks: [
          {
            type: "p",
            text: "The balance pays for Marketplace storage and job compute. Open **Billing → Top up**, choose an amount (minimum 10,000 VND), apply a promo code if available, then pay by QR. The top-up history records every credit.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/10-nap-tien.webp",
            alt: "Top-up form with amount and promo code fields",
            caption:
              "Top up the balance used for storage and compute. The minimum was 10,000 VND at the time of writing.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/11-xac-nhan-nap-tien.webp",
            alt: "Top-up confirmation page with amount, VAT and invoice details",
            caption:
              "Check the amount, VAT line and invoice details on the confirmation page before paying.",
          },
          {
            type: "note",
            title: "The balance is tied to the subscription",
            text: "The balance can only be used while the organization has a current subscription. If the subscription expires or is cancelled with no renewal pending, any remaining balance is reset to 0. Renew before the subscription expires if a balance remains.",
          },
          {
            type: "p",
            text: "VAT and invoice details appear on the confirmation page for each transaction. Values can differ by transaction type and by the buyer details registered; check them before confirming.",
          },
        ],
      },
      {
        id: "huy-goi",
        title: "Cancel or change a plan",
        blocks: [
          {
            type: "p",
            text: "Cancelling a subscription ends the plan immediately and returns the organization to a no-plan state. Pending checkouts also become invalid. Workspace and job limits remain in effect until you subscribe again.",
          },
          {
            type: "p",
            text: "When upgrading or changing a plan, the current plan stays active until the new invoice is paid. See [Billing](https://docs.omicslab.io/en/organizations/billing).",
          },
        ],
      },
    ],
  },
  {
    slug: "marketplace",
    number: "03",
    kicker: "Chapter 03 · Marketplace",
    title: "Storage, compute and shared tools",
    navTitle: "Marketplace",
    description:
      "Buy a storage quota, review compute credentials and choose pre-integrated analysis or Studio tools.",
    summary:
      "Reading the Marketplace: storage quotas, compute configurations, nf-core pipelines, Studio and Git credentials.",
    sections: [
      {
        id: "mua-luu-tru",
        title: "Buy a storage quota",
        blocks: [
          {
            type: "p",
            text: "Open **Organization → Storage → Add** (or **Buy quota**). Prepaid storage is prorated to the subscription expiry date and cannot exceed one month beyond the price-hold date. Choose a quota that matches the expected data volume.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/01-mua-luu-tru.webp",
            alt: "Organization storage tab with S3 storage details and an add-quota button",
            caption:
              "Organization storage. Prepaid quotas are tied to the subscription term.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/02-chon-han-muc.webp",
            alt: "Storage quota purchase dialog",
            caption: "Buy a storage quota from the Marketplace.",
          },
          {
            type: "p",
            text: "Choose a quota duration that matches the software licence term to avoid buying too much or running out mid-term. In the example, a 10 GB quota is purchased for the organization.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/03-thoi-han-han-muc.webp",
            alt: "Storage quota duration form",
            caption:
              "Choose a quota duration that fits the software usage term.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/04-han-muc-da-mua.webp",
            alt: "Storage list showing the purchased 10 GB quota",
            caption:
              "The purchased quota appears in the organization storage tab.",
          },
          {
            type: "note",
            title: "Storage and data lifecycle",
            text: "When the prepaid cycle ends, access is blocked and the data is retained for **7 days**. After 7 days the workspace is archived for purging, and the daily sweep permanently deletes the data (keeping only the audit directory). A workspace or organization deleted by the customer can be restored within the same 7 days. See the [Pricing Policy](/policies/pricing).",
          },
        ],
      },
      {
        id: "marketplace",
        title: "The shared Marketplace",
        blocks: [
          {
            type: "p",
            text: "The **Marketplace** is the platform-wide catalogue: storage, compute, pipelines, Studio applications and version-control credentials. An organization can use both its own entries and the shared Marketplace entries.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/05-marketplace.webp",
            alt: "Marketplace page with the shared storage catalogue",
            caption:
              "The Marketplace gathers platform-wide entries. Organizations can use their own and shared entries side by side.",
          },
        ],
      },
      {
        id: "tinh-toan",
        title: "Review compute resources",
        blocks: [
          {
            type: "p",
            text: "The **Compute** tab lists HPC/SLURM runners and cloud VM credentials. In the example, the platform-provided configuration uses GreenNode on a pay-as-you-go model. Check the provider, region and credential before running a job.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/06-tinh-toan.webp",
            alt: "Marketplace compute tab with GreenNode and Vietnam region details",
            caption:
              "Shared compute: an HPC/SLURM runner or cloud VM credentials.",
          },
          {
            type: "p",
            text: "If the organization uses its own HPC cluster, add a runner and credentials at organization level instead of buying a platform configuration.",
          },
        ],
      },
      {
        id: "cong-cu",
        title: "Analysis tools",
        blocks: [
          {
            type: "p",
            text: "The **Analysis** tab in the Marketplace lists pipelines that have been checked and integrated, mostly from nf-core. Each entry has a name, descriptive tags and an update date; use the search box to filter by name or tag.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/07-cong-cu-phan-tich.webp",
            alt: "List of nf-core analysis tools in the Marketplace",
            caption:
              "Pre-integrated pipelines in the Marketplace, such as nf-core/bacass for bacterial genome assembly.",
          },
          {
            type: "p",
            text: "The catalogue changes over time. Before using a pipeline on real data, check the version, parameters and licence of the upstream tool.",
          },
        ],
      },
      {
        id: "studio",
        title: "Studio applications",
        blocks: [
          {
            type: "p",
            text: "The **Studio** tab lists the interactive applications the platform provides, for example Visual Studio Code Server, JupyterLab and RStudio Server. The application runs on workspace compute and opens in the browser.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/08-studio.webp",
            alt: "List of Studio applications available in the Marketplace",
            caption:
              "Platform-provided Studio applications: VS Code Server, JupyterLab and RStudio Server.",
          },
        ],
      },
      {
        id: "phien-ban",
        title: "Version control and GitHub",
        blocks: [
          {
            type: "p",
            text: "The **Version control** tab stores the Git credentials used to reach tool repositories. Tokens for public repositories can be used directly; private repositories need credentials supplied by the organization.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/09-quan-ly-phien-ban.webp",
            alt: "Version control tab with GitHub credential details",
            caption: "Git credentials shared by the tools in the Marketplace.",
          },
          {
            type: "note",
            title: "Scope of Vieomics-provided solutions",
            text: "Some Vieomics tokens and solutions are available only when running on cloud provided by Omicslab. When self-hosting or using your own infrastructure, you configure the credentials and are responsible for repository access.",
          },
        ],
      },
      {
        id: "tu-cau-hinh",
        title: "Bring your own configuration",
        blocks: [
          {
            type: "p",
            text: "For storage and analysis, customers can configure their own resources instead of buying a platform-provided configuration. This suits organizations that already have an S3 bucket, an HPC cluster or their own credentials.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/10-tu-cau-hinh.webp",
            alt: "Interface for configuring customer-provided storage and compute",
            caption:
              "Configure storage and compute with the customer’s own resources.",
          },
          {
            type: "p",
            text: "In a self-hosted deployment, the customer operates the whole stack on its own infrastructure. Vieomics does not automatically receive data from that environment; logs are shared or access is granted only when the customer requests it within the agreed support scope.",
          },
        ],
      },
      {
        id: "chi-phi",
        title: "Cost and duration",
        blocks: [
          {
            type: "p",
            text: "Marketplace storage is charged per GB; compute is charged by runtime and resource configuration. Cost is shown before a job runs and recorded in history. Prices and quotas can change; see the [Pricing Policy](/policies/pricing) for the current calculation.",
          },
        ],
      },
    ],
  },
  {
    slug: "workspace",
    number: "04",
    kicker: "Chapter 04 · Workspace",
    title: "Members, workspaces and data",
    navTitle: "Workspace & data",
    description:
      "Invite colleagues, create a workspace, upload data to its bucket and prepare sample cohorts before analysis.",
    summary:
      "From inviting members and creating a workspace to uploading data, browsing folders and defining sample cohorts.",
    sections: [
      {
        id: "thanh-vien",
        title: "Invite organization members",
        blocks: [
          {
            type: "p",
            text: "Open **Organization → Members → Add**, enter an email address and choose a role. Organization members share the organization’s credentials, workspaces and invoices; the role determines what they can do.",
          },
          {
            type: "figure",
            src: "/guides/workspace/01-them-thanh-vien.webp",
            alt: "Organization members tab with the member list and an add button",
            caption:
              "Add a member to the organization and choose a role before sending the invitation.",
          },
          {
            type: "p",
            text: "Organization roles are **Admin**, **Contributor** and **Viewer**. Workspace roles are assigned separately for each workspace.",
          },
        ],
      },
      {
        id: "tao-workspace",
        title: "Create a workspace",
        blocks: [
          {
            type: "p",
            text: "Open **Workspaces → Add**, choose the owning organization, enter a name and description, select the visibility mode, storage credential and bucket name. Bucket names must be globally unique.",
          },
          {
            type: "figure",
            src: "/guides/workspace/02-tao-workspace.webp",
            alt: "Create workspace form with organization, name, description, visibility, storage credential and bucket name",
            caption:
              "The create workspace form. The organization needs a current subscription and room within the plan limit.",
          },
          {
            type: "p",
            text: "The organization needs a current subscription, and the number of workspaces cannot exceed the plan limit. **Private** shows the workspace to workspace and organization members only; data can be read with membership rights. **Public** lets any signed-in user see the workspace and read data in its bucket, even after the organization’s subscription ends.",
          },
          {
            type: "note",
            title: "Use Public for public data only",
            text: "A Public workspace is not suitable for restricted data, personal data or unpublished data. Check the visibility mode before uploading data.",
          },
        ],
      },
      {
        id: "mo-workspace",
        title: "Open a workspace",
        blocks: [
          {
            type: "p",
            text: "Double-click a row in the workspace list to open it. Tabs include **Data**, **Sample cohorts**, **Analysis**, **Studio**, **Viewers**, **Members**, **Budget** and **Activity**.",
          },
          {
            type: "figure",
            src: "/guides/workspace/03-mo-workspace.webp",
            alt: "Workspace list with one workspace opened",
            caption: "Double-click a workspace to enter the project workspace.",
          },
        ],
      },
      {
        id: "tai-du-lieu",
        title: "Upload data",
        blocks: [
          {
            type: "p",
            text: "Open the **Data** tab. The create control lets you upload files or folders from your computer, create a new file with content, or create a folder. For sequencing data, upload FASTQ files and the samplesheet before running a pipeline.",
          },
          {
            type: "figure",
            src: "/guides/workspace/04-tai-du-lieu.webp",
            alt: "Data tab with upload, create folder controls and the file list",
            caption:
              "Upload files or folders to the workspace bucket from the Data tab.",
          },
          {
            type: "p",
            text: "For large folders, consider splitting or compressing them before upload, then check the size and file count afterwards. The file browser can also download a whole folder as a ZIP archive.",
          },
        ],
      },
      {
        id: "duyet-du-lieu",
        title: "Browse files and folders",
        blocks: [
          {
            type: "p",
            text: "Double-click a folder to open it; the breadcrumb shows the current location. You can preview HTML, JSON or text, edit small files and reload them if needed.",
          },
          {
            type: "figure",
            src: "/guides/workspace/05-duyet-du-lieu.webp",
            alt: "Workspace file browser with breadcrumb and files in a subfolder",
            caption:
              "Browse subfolders by double-clicking. The current path appears in the breadcrumb.",
          },
          {
            type: "p",
            text: "Analysis results usually sit in the **outdir** recorded in the manifest. Note this path so you can open the results after the job finishes.",
          },
        ],
      },
      {
        id: "nhom-mau",
        title: "Define sample cohorts",
        blocks: [
          {
            type: "p",
            text: "A **sample cohort** groups samples that share a metadata schema and pipeline configuration. Open **Sample cohorts → Create**, start from a template if one fits, then fill in the shared details and samplesheet.",
          },
          {
            type: "figure",
            src: "/guides/workspace/06-nhom-mau.webp",
            alt: "Sample cohort list in the workspace",
            caption:
              "Sample cohorts let you reuse metadata and pipeline configuration across runs.",
          },
          {
            type: "p",
            text: "You can start from a template, for example **Bacterial genome assembly (nf-core/bacass)** or an nf-core WGS configuration, then adjust field names and columns to match the data.",
          },
          {
            type: "figure",
            src: "/guides/workspace/07-mau-wgs.webp",
            alt: "Create cohort form based on a WGS template with samplesheet columns",
            caption:
              "Create a cohort from a template such as the nf-core WGS configuration; samplesheet columns can be edited.",
          },
          {
            type: "note",
            title: "Sample codes instead of personal names",
            text: "Use a Sample ID or sample code instead of a person’s name in file names, samplesheets and metadata. Replacing names with codes does not by itself remove personal-data obligations; assess the dataset under the [Privacy Policy](/privacy) before uploading.",
          },
        ],
      },
      {
        id: "thanh-vien-workspace",
        title: "Workspace members",
        blocks: [
          {
            type: "p",
            text: "Open **Workspace → Members** to see who has access and their role. **Admin** manages settings, members and storage and can delete the workspace; **Contributor** runs jobs, uploads or downloads data and adds members; **Viewer** views workspace content and job status.",
          },
          {
            type: "figure",
            src: "/guides/workspace/08-thanh-vien-workspace.webp",
            alt: "Workspace members tab with users and roles",
            caption:
              "Workspace members and their roles. Reserve admin rights for people who manage infrastructure and cost.",
          },
          {
            type: "p",
            text: "Reserve admin rights for the people who actually need to manage infrastructure and cost.",
          },
        ],
      },
    ],
  },
];
