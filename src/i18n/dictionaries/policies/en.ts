/**
 * Long-form policy pages (Privacy, Terms, Security & Compliance).
 *
 * Kept out of en.ts / vi.ts so those two files stay readable. vi.ts mirrors
 * this shape through the exported `Policies` type, so a missing or extra
 * Vietnamese key fails the build.
 *
 * Inline markup supported by the Legal renderer:
 *   **text**        -> <strong>
 *   [label](/href)  -> internal link, localised automatically
 */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "label"; text: string }
  | { type: "ul"; items: PolicyListItem[] }
  | { type: "table"; head: string[]; rows: string[][] };

/** A list entry, optionally carrying nested sub-entries. */
export type PolicyListItem =
  | string
  | { text: string; children: PolicyListItem[] };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

export type PolicyPage = {
  kicker: string;
  title: string;
  /** Short label used in the sidebar navigation between policy pages. */
  navTitle: string;
  description: string;
  /** Boxed statement shown under the description (Terms of Service). */
  notice?: string;
  sections: PolicySection[];
};

/** Landing content for the /policies index page. */
export type PolicyHub = {
  kicker: string;
  title: string;
  description: string;
  intro: string;
};

export type Policies = {
  shared: {
    lastUpdatedLabel: string;
    lastUpdated: string;
    tocLabel: string;
    policiesLabel: string;
  };
  /** /policies index page. */
  hub: PolicyHub;
  privacy: PolicyPage;
  terms: PolicyPage;
  security: PolicyPage;
  pricing: PolicyPage;
  payment: PolicyPage;
  serviceProvision: PolicyPage;
  conditions: PolicyPage;
  rightsObligations: PolicyPage;
  complaints: PolicyPage;
  support: PolicyPage;
};

/** Keys of the individual policy pages (excludes `shared` and `hub`). */
export type PolicyPageKey = Exclude<keyof Policies, "shared" | "hub">;

export const policiesEn: Policies = {
  shared: {
    lastUpdatedLabel: "Last updated",
    lastUpdated: "12 October 2026",
    tocLabel: "On this page",
    policiesLabel: "Policies",
  },

  privacy: {
    kicker: "Legal",
    title: "Personal Data Protection & Privacy Policy",
    navTitle: "Privacy Policy",
    description:
      "Welcome to the Omicslab bioinformatics data analysis platform, a product operated by VIEOMICS COMPANY LIMITED. We are committed to protecting your personal data and the data you process on the Platform in accordance with Vietnamese law (the Personal Data Protection Law No. 91/2025/QH15, Decree No. 356/2025/ND-CP and the Cybersecurity Law) and international security standards.",
    notice:
      "The public Omicslab Platform (cloud) does not accept and does not process non-public sensitive personal data of individuals in Vietnam, including human genomic and health-related data. Such data must not be uploaded to the public Platform; it is supported only through a separate, contracted self-hosted deployment, in which Vieomics provides the Omicslab Platform as the platform management system and the customer performs the full deployment on its own infrastructure and self-hosts it. The service is entirely the customer’s own: the customer runs, configures, operates, analyses, stores and manages the whole stack and the data in its own environment, and no customer data is automatically transmitted from a self-hosted deployment to Vieomics, except where the customer chooses to provide information or authorise access solely for the agreed support and maintenance purposes as described in Section 1. Vieomics may assist with platform operation at the customer’s request, within the agreed service scope, but does not access or analyse the customer’s data. Responsibility for personal data follows the actual processing activities, the access granted, the purposes of processing and applicable law. Publicly available human data is not automatically anonymous: lawfully published or properly de-identified data may be processed on the public Platform only after an assessment of its source, access conditions and privacy risk (see Section 1). The public Platform is otherwise intended for non-human data (microorganisms, plants, animals and environmental samples) and simulated or benchmark data, as described in Section 1.",
    sections: [
      {
        id: "controller",
        title: "1. Definitions, Data Processing Roles and Storage Infrastructure",
        blocks: [
          {
            type: "label",
            text: "Definitions",
          },
          {
            type: "p",
            text: "**Omicslab Platform:** the software product — a bioinformatics data analysis platform — developed and operated by Vieomics. Throughout this Policy, “Platform” and “Omicslab Platform” refer to this product.",
          },
          {
            type: "p",
            text: "**Vieomics (VIEOMICS COMPANY LIMITED):** the legal entity that operates the Omicslab Platform and is responsible, as described in this Policy, for the personal data we actually collect or process (“we”, “us”). Every commitment, obligation and liability for personal data stated below belongs to Vieomics — not to the “Omicslab” brand.",
          },
          {
            type: "p",
            text: "**Personal data:** information in the form of text, numbers, images, sound or similar forms that is attached to a specific individual or helps identify a specific individual, including both basic and sensitive personal data (under the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP).",
          },
          {
            type: "p",
            text: "**User data (data uploaded by the user):** all files, datasets and resources that you (or your organisation) actively send, connect or store on the Platform, including data held in object storage and infrastructure you integrate yourself. User data is **not necessarily personal data**: it may be pure research data (microorganisms, plants, animals, environmental samples), or it may **contain personal data belonging to other people** — in which case it must not be uploaded to the public Platform, except as permitted by the rule immediately below.",
          },
          {
            type: "p",
            text: "**Customer data:** data that you (or your organisation) upload, connect, generate or process on the Platform. Customer data remains under your control and is **not automatically public**; it is distinct from the public and benchmark datasets described in Section 3.",
          },
          {
            type: "p",
            text: "**Public / benchmark dataset:** a dataset that Vieomics may make available from international public repositories, openly accessible scientific databases, other lawful public sources, or that is simulated or prepared for benchmarking. Public and benchmark datasets are **not customer data** and are covered separately in Section 3.",
          },
          {
            type: "p",
            text: "**Personal data that does not belong to the user themselves:** personal data belonging to other individuals must not be uploaded to the public Platform unless it forms part of a lawfully published or properly de-identified dataset that meets the conditions described in this Policy. Users remain responsible for assessing the lawful basis, access conditions, permitted use and privacy risks before uploading such data. **Sensitive personal data** (including patient, health and genomic data) must not be uploaded to the public Platform — it is handled only through the self-hosted deployment described in this Section, except data that has been lawfully published or properly de-identified such that re-identification is not reasonably possible.",
          },
          {
            type: "label",
            text: "Separation of Legal Roles",
          },
          {
            type: "p",
            text: "**Personal Data Controller:** The Omicslab Platform is operated by VIEOMICS COMPANY LIMITED (“we”, “us”). We act as the Personal Data Controller for information collected to operate and manage the service (including account data, usage data and technical data).",
          },
          {
            type: "p",
            text: "**Data Processor:** For research and biological data that you (or your organisation) actively upload to a platform-managed Omicslab service, you act as the Data Controller and we act as the Data Processor — operating that service and performing computation and storage in accordance with your instructions, settings and requirements. Where we act as a processor, we process customer data in accordance with your documented instructions and the applicable service agreement, and we remain responsible for our own obligations under applicable law and our contractual commitments.",
          },
          {
            type: "p",
            text: "This role applies to infrastructure we actually operate. In a **self-hosted (customer-managed) deployment**, where you run the full stack yourself and we have no access to your environment or data, we do not process that data as a processor. **Roles are determined by the actual processing activities, not by labels.** Where Vieomics accesses your servers to operate or maintain the platform at your request, views data as needed to operate or troubleshoot the platform, receives logs, diagnostics or platform/job metadata that contain personal data, or otherwise performs platform-operation activities on infrastructure you operate, those activities may make Vieomics a **processor** — or, where we determine the purposes of the processing, a **controller** — for the data involved, and the corresponding obligations apply to that extent. Vieomics does not carry out analysis of your research data. We keep a clear boundary between (i) selling or licensing the software, (ii) limited technical support and maintenance that you request, and (iii) actually operating infrastructure or processing data. Contractual statements or disclaimers do not override obligations that applicable law makes mandatory; where such an obligation applies, we comply with it regardless of the deployment model.",
          },
          {
            type: "label",
            text: "Scope: Human / Health-Related Data (Not Processed on the Public Platform)",
          },
          {
            type: "p",
            text: "The public Omicslab Platform **does not accept and does not process non-public sensitive personal data** of individuals in Vietnam, including human genomic and health-related data (for example NIPT, WES, WGS, human RNA-Seq or patients’ genetic records). You must not upload such data to the public Platform. **Publicly available data is not automatically anonymous:** data that has been lawfully published and made openly accessible, or that has been de-identified such that re-identification is not reasonably possible in the circumstances (for example some data retrieved from public repositories such as NCBI GEO/SRA), may be processed on the public Platform. Before uploading any human dataset you must assess its source, access conditions, permitted use, metadata and privacy risk — including whether it still contains or can enable inferences about individuals — and obtain any additional authorisation required for restricted or sensitive datasets. Sample or subject identifiers are not, by themselves, direct identifiers. **Do not rely on the label alone:** the file format (for example FASTQ, BAM or VCF), the use of a Sample ID or subject code instead of a patient name, or availability on a public repository such as NCBI does not by itself mean that personal-data obligations have disappeared, because genomic and health data can remain linkable to, or enable inferences about, an individual. Before processing, assess the access conditions, licence, permitted purpose, accompanying metadata — and any other data that could be combined with it — and the risk of re-identification, not just the file name. The specific rules that apply to a given dataset are a legal question; Vieomics recommends that customers confirm them with qualified Vietnamese legal counsel, and nothing in this Policy is legal advice.",
          },
          {
            type: "p",
            text: "To process sensitive data, the customer must [contact us](/contact) to arrange a **self-hosted deployment under a separate agreement**. In this model, Vieomics provides the Omicslab Platform as the platform management system, and the customer performs the full deployment on infrastructure it owns or controls and self-hosts it. The service is entirely the customer’s own: the customer runs, configures and operates the whole stack — frontend, backend and APIs, application database, object storage, compute and workflow execution, pipelines and analysis tools, and access control — and the data is created, analysed, stored and managed only in the customer’s environment. No customer data is automatically transmitted from a self-hosted deployment to Vieomics. The customer may choose to provide specific logs, diagnostics or other information, or authorise access to its environment, solely for the agreed support and maintenance purposes. Any such access or processing remains subject to applicable law and the agreed service scope. Vieomics may assist with platform operation at the customer’s request, within the agreed service scope; any such access is authorised by the customer and limited to platform operation and maintenance — **Vieomics does not analyse the customer’s data**. Responsibility for personal data follows the actual processing activities, the access granted, the purposes of processing and applicable law — the customer is responsible for its own legal basis, permissions and consent requirements where applicable, the security configuration of its environment, and any personal data processing impact assessment required by law.",
          },
          {
            type: "label",
            text: "User-Managed Infrastructure (Bring Your Own Cloud – BYOC)",
          },
          {
            type: "p",
            text: "Where you choose to connect or integrate your own storage account or analysis servers (personal API credentials) into the Omicslab Platform, you are responsible for the security, access permissions and safety of the data on that infrastructure. To the extent permitted by applicable law, we are not liable for incidents arising from systems you manage. This does not affect our own obligations under applicable law or under any separate agreement with you.",
          },
          {
            type: "label",
            text: "Deployment models",
          },
          {
            type: "p",
            text: "Omicslab builds a trusted operating layer for scientific computing and is offered through different deployment models. **Platform-Managed (Marketplace):** Omicslab provides and manages the application services, compute and storage that we operate, and processes data within that infrastructure on your instructions. **Self-hosted (customer-managed / Bring Your Own Infrastructure):** Vieomics provides the Omicslab Platform as the platform management system, and you perform the full deployment and self-host the complete Omicslab stack — frontend, backend and APIs, application database, object storage and other storage, compute and workflow execution, pipelines and third-party analysis tools, plus your credentials, access policies, backups and operational security — on infrastructure you own or control. The service is entirely your own, and no customer data is automatically transmitted from a self-hosted deployment to Vieomics, except where you choose to provide information or authorise access solely for the agreed support and maintenance purposes as described below. We supply the software, documentation, updates and licensing, and may assist with platform operation at your request; we do not access your environment or data unless you authorise access for a defined platform-operation or maintenance purpose, and we do not analyse your research data. The public, platform-managed (Marketplace) service is intended only for non-human data (microorganisms, plants, animals and environmental samples), simulated or benchmark data, and public data that has been lawfully published or properly de-identified — the latter only after the assessment described in this Section. Non-public sensitive personal data — including human genomic, genetic and health data — must not be uploaded to the public Platform and is handled only through a separate, contracted customer-managed (self-hosted) deployment.",
          },
        ],
      },
      {
        id: "collect",
        title: "2. Data We Collect & Responsibility Rules by Data Type",
        blocks: [
          {
            type: "p",
            text: "We collect and classify data into the following categories:",
          },
          {
            type: "ul",
            items: [
              "**Account data:** representative full name, email address, phone number, contact/billing address, login credentials and account preferences.",
              "**Service usage data:** activity logs on the Platform, including analysis jobs, storage history and storage usage — used for billing reconciliation, system audits and technical support.",
              "**Technical data:** IP address, browser information, device type and connection information — used to keep the service secure, prevent cyberattacks and diagnose errors.",
              "**Website access data:** aggregated traffic data collected through Google Analytics on **this website (the landing page)** — the Platform itself does not use Google Analytics — to improve the user experience, processed as described in Section 11.",
              {
                text: "**Bioinformatics analysis data (uploaded to or processed on the system):**",
                children: [
                  "**Non-human data (microorganisms, plants, animals, environmental samples):** generally classified as scientific research data. In typical cases, and provided it does not contain personal data, this data is not personal data under the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP. Users may upload, store and analyse this data without applying personal-data privacy procedures, unless it contains personal data.",
                  "**Human / health-related data:** the public Platform **does not accept and does not process non-public sensitive personal data** of individuals in Vietnam, including human genomic and health-related data (for example NIPT, WES, WGS, human RNA-Seq or patients’ genetic and clinical records). Such data must not be uploaded to the public Platform. For sensitive data, the customer must [contact us](/contact) to arrange a self-hosted deployment under a separate agreement, in which Vieomics provides the Omicslab Platform as the platform management system and the customer performs the full deployment on its own infrastructure and self-hosts it, running, configuring, analysing, storing and managing the data itself; no customer data is automatically transmitted from a self-hosted deployment to Vieomics except where the customer chooses to provide information or authorise access solely for the agreed support and maintenance purposes as described in Section 1, and Vieomics does not analyse it. **Publicly available data is not automatically anonymous:** data that has been lawfully published and made openly accessible, or that has been de-identified such that re-identification is not reasonably possible in the circumstances, may be processed on the public Platform after the assessment described in Section 1.",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "Which categories apply depends on the deployment model. In a **customer-managed deployment** the deployment is fully independent: no data from your environment — research files, analysis outputs, job metadata, logs, diagnostics or telemetry — is automatically transmitted to or stored by Vieomics. In that case the information we hold is limited to the account, billing and support information you provide to us directly, together with anything you choose to send us as part of a support request. In a **platform-managed service**, data is processed within the infrastructure we operate.",
          },
        ],
      },
      {
        id: "public-datasets",
        title: "3. Public and Benchmark Datasets",
        blocks: [
          {
            type: "p",
            text: "In addition to processing customer data, Vieomics may provide access to public, open-access, simulated or benchmark datasets to support demonstrations, education, research, benchmarking, and the testing and validation of pipelines and platform functionality.",
          },
          {
            type: "ul",
            items: [
              "**Sources:** these datasets may be obtained from international public repositories, openly accessible scientific databases, other lawful public sources, and may include simulated or benchmark data.",
              "**Not necessarily collected by Vieomics:** where a dataset is obtained from a public repository or another lawful source, Vieomics does not necessarily collect the underlying data directly from the individuals concerned, and is not necessarily the original data controller or collector of that dataset.",
              "**Provenance and licensing:** use of these datasets is subject to the licence, attribution and usage terms of the applicable repository or source. Where applicable, provenance and licensing information is provided together with the dataset.",
              "**Intended purposes:** these datasets are intended for demonstration, education, research, benchmarking and pipeline or platform testing. They are not presented as, and must not be confused with, private customer datasets.",
              "**Human data that is lawfully public:** some human research data is lawfully accessible but may still contain personal data or enable inferences about individuals. Uploading it to the public Platform requires the assessment described in Section 1; sensitive or restricted human datasets that require additional authorisation must instead be handled in a customer-managed environment.",
              "**No reclassification of customer data:** private customer datasets are not made public and are not converted into public or benchmark datasets unless the customer has separately authorised it and it is legally permitted. Vieomics does not publish, redistribute or reuse customer data as a public dataset without such authorisation.",
            ],
          },
        ],
      },
      {
        id: "bases",
        title: "4. Legal Bases for Processing",
        blocks: [
          {
            type: "p",
            text: "We process personal data on the legal bases set out in the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP (and other applicable regulations):",
          },
          {
            type: "ul",
            items: [
              "**Performance of a contract:** processing account and payment data to provide and operate the services and features you have signed up for.",
              "**Consent of the data subject:** applied when you subscribe to professional newsletters, product notices or feature updates.",
              "**Legal obligation:** retaining data or disclosing information at the request of competent state authorities, as required by Vietnamese law.",
              "**Information security:** implementing technical measures to prevent fraud and unauthorised access, and to protect Omicslab’s infrastructure.",
            ],
          },
        ],
      },
      {
        id: "use",
        title: "5. How We Use Personal Data",
        blocks: [
          {
            type: "p",
            text: "Personal data is used to: create and manage accounts, authenticate users, provide bioinformatics analysis infrastructure, ensure cybersecurity, issue invoices and provide technical support.",
          },
          {
            type: "p",
            text: "We commit to:",
          },
          {
            type: "ul",
            items: [
              "Never selling, renting or otherwise commercialising users’ personal data in any form.",
              "Never accessing, mining or sharing customer data (including research data and pseudonymised human data) for any purpose other than delivering the analysis service you request. We do not make private customer datasets public unless you have separately authorised it and it is legally permitted.",
            ],
          },
        ],
      },
      {
        id: "retention",
        title: "6. Data Retention",
        blocks: [
          {
            type: "ul",
            items: [
              "**Account data:** stored for as long as the account is active. After the account is closed, the account and its related data are only **deactivated** and retained for the period required by law (limitation periods, and statutory obligations to retain records, documents and invoices), so that the date on which any issue, dispute or legal incident arose can still be traced and evidenced at the request of a competent authority or the parties concerned. Once that period expires, the data is **deleted or anonymised**, under the exception already stated in Section 9.",
              "**Usage & audit data:** retained for the periods required by Vietnamese accounting, tax and cybersecurity law.",
              "**Research data in platform-managed storage:** data held in the platform’s object storage service (Marketplace) is stored on a **pay-as-you-go basis, billed in monthly cycles**, and only for the cycle you have paid for. If you no longer subscribe to any plan, or do not renew the storage cycle, workspace access is blocked when the cycle ends and the data is retained for a **7-day window**; after those 7 days the data is **permanently deleted** — only the audit log is kept for tracing purposes. You may also delete data yourself at any time on the Platform; a workspace you delete is recoverable during the same **7-day window** before its data is deleted.",
              "**Top-up balance (organization wallet):** prepaid credit can only be spent while your organization has a live subscription. Once the subscription lapses — expired or cancelled, with no renewal in flight — the **remaining balance is forfeited and reset to zero**, so a top-up cannot be spent without an active plan. Organizations that have never subscribed keep any balance they hold. The forfeiture sweep runs automatically every day. Payment terms, advance email notices and all deadlines are set out in Section 13 of our [Terms of Service](/terms).",
              "**Research data in a customer-managed deployment:** data held in an environment you own or control is stored and deleted under your own storage lifecycle and configuration, subject to your own legal obligations. Vieomics does not hold a copy of that data and cannot delete it from your environment.",
              "**Deletion and retained copies:** deleting an account, workspace or dataset does not necessarily erase backups, transaction records or audit logs immediately; these are overwritten or removed under the applicable retention and backup cycles.",
            ],
          },
        ],
      },
      {
        id: "security",
        title: "7. Data Security Measures",
        blocks: [
          {
            type: "p",
            text: "Security is shared between the parties. For the services and infrastructure **Vieomics directly operates and controls**, we implement the technical and operational measures below to protect the personal data and service data we hold there:",
          },
          {
            type: "ul",
            items: [
              "Encryption of data in transit (TLS/SSL) and, where the platform directly stores it, encryption at rest for the services and resources Vieomics manages — using the encryption supported by the underlying infrastructure provider and configuration (for example AES-256).",
              "Least-privilege access control (RBAC), multi-factor authentication (MFA) and system audit logs.",
              "Workspace isolation, and separation of customer mapping keys from the analysis environment where technically configured.",
              "Security monitoring and incident detection across platform-managed resources, together with regular security reviews and vulnerability assessments.",
              "Only assigned personnel bound by strict confidentiality obligations may access technical support information, and only upon your written request.",
              "**Credential handling:** in the services Vieomics directly operates, credentials used to launch jobs are encrypted and transferred securely to the execution environment; they are never shown to end users or stored in plain text there.",
              "**Architecture separation:** the control plane (job orchestration, credentials, quotas) is kept separate from the data plane.",
            ],
          },
          {
            type: "p",
            text: "These controls apply only to the services and infrastructure **Vieomics directly operates and controls**. **Cloud and infrastructure providers** are responsible for the measures in their own layer — physical and environmental security, the hypervisor, and the encryption, storage, network and logging primitives they supply — under their own terms and certifications. In a **customer-managed or BYOC deployment**, **you** are responsible for the infrastructure you operate or connect (your S3-compatible storage, database, compute, backups, access policies, logging and the analysis environment) and for verifying that those measures meet your requirements; where data sits in storage or a database you run or connect, Vieomics cannot guarantee the encryption, backup, access control or logging of that system. We remain responsible for the security of the software we supply.",
          },
          {
            type: "p",
            text: "These measures are **designed toward** the GDPR (EU) and HIPAA (US) so that the platform is ready for stricter requirements in the future; as of the date of this Policy, Omicslab **holds no certification** under any of those frameworks. Administrative penalties for cybersecurity and personal data protection violations are set out in Decree No. 330/2026/ND-CP, in force since 19 August 2026.",
          },
          {
            type: "p",
            text: "If a personal data breach affecting information we control is detected (leakage, loss or unauthorised access to personal data), we activate our internal incident-response procedure and, where applicable law requires notification, notify the competent authority and/or the affected data subjects in accordance with the applicable statutory triggers, recipients and deadlines. Incident records are kept at least for the period required by applicable law after the incident has been remediated.",
          },
          {
            type: "p",
            text: "The Platform’s security commitments and the allocation of responsibility between the parties are set out in Section 12 of this Policy.",
          },
        ],
      },
      {
        id: "sharing",
        title: "8. Sharing and Transfer of Data",
        blocks: [
          {
            type: "p",
            text: "Personal data is shared only in the following limited circumstances:",
          },
          {
            type: "ul",
            items: [
              "**Infrastructure service providers (processors):** providers of servers, payment gateways and similar services that are bound by confidentiality and data-protection obligations and process personal data only on our instructions.",
              "**State authorities:** when a written request is made by a duly empowered authority through the legally prescribed procedure.",
            ],
          },
          {
            type: "p",
            text: "Your customer data is never shared with third parties unless you instruct us to do so, or as required by law. We do not publish, redistribute or reuse customer data as a public or benchmark dataset without separate authorisation and a lawful basis.",
          },
          {
            type: "p",
            text: "**Service providers for this website:** (i) **Cloudflare Pages** — distributes the site’s static files (we do not enable Cloudflare’s analytics services); (ii) **Google Analytics** — runs only after you accept the cookie notice in Section 11; (iii) **DMCA.com** — displays the protection badge. For the Platform, we work with Marketplace infrastructure partners and the payment gateway, all bound by appropriate confidentiality and data-protection terms.",
          },
        ],
      },
      {
        id: "rights",
        title: "9. Rights of Data Subjects",
        blocks: [
          {
            type: "p",
            text: "For personal data (account and payment information), Vietnamese law grants you the following rights:",
          },
          {
            type: "ul",
            items: [
              "The right to be informed, and to give or withdraw consent.",
              "The right to access, view, edit or request correction of your data.",
              "The right to request deletion, restriction or objection to processing — except data that must be retained by law, or that is needed to resolve disputes or legal incidents (see Section 6).",
              "The right to request a copy of your data.",
              "The right to lodge complaints, file reports or claim compensation as permitted by law.",
            ],
          },
          {
            type: "p",
            text: "To exercise these rights for information we control, you can act directly in your account settings or [contact us](/contact). We acknowledge a complete and valid request promptly and aim to resolve it within 72 working hours; where a request is complex or affects legally retained data, we may need longer and will keep you informed. This is our service target, not a statutory deadline. Where personal data is held exclusively in a **customer-managed deployment** that we do not control or access, we cannot directly access, modify, export or delete that data — such requests must be directed to the organisation that controls the environment (see Section 12).",
          },
        ],
      },
      {
        id: "transfers",
        title: "10. Storage and Data Location",
        blocks: [
          {
            type: "p",
            text: "Vieomics currently operates the Omicslab Platform only in Vietnam, not abroad. **For services and infrastructure that Vieomics provides, the location of storage and processing depends on the service configuration and the infrastructure region you select.** On the Vietnam region (default), data and compute provided by Vieomics are stored and processed in Vietnam (see the table below).",
          },
          {
            type: "p",
            text: "The Platform also supports a global region for Vietnamese people or persons living in Vietnam, and multinational collaboration; for services and infrastructure provided by Vieomics, data and compute remain located in Vietnam and users simply access from abroad. Because data and compute provided by Vieomics are located in Vietnam, no transfer of personal data abroad arises in our current operation. For infrastructure you operate or connect yourself, the location depends on your configuration, as described below.",
          },
          {
            type: "table",
            head: ["Region", "Instance", "Framework", "Data residency"],
            rows: [
              ["Vietnam (default)", "platform.omicslab.vn", "PDPL (Law 91/2025 + Decree 356/2025)", "Data and compute provided by Vieomics are stored in Vietnam"],
              ["Global", "platform.omicslab.vn", "PDPL for personal data in Vietnam", "Still in Vietnam; for Vietnamese people or residents of Vietnam, and multinational collaboration"],
            ],
          },
          {
            type: "p",
            text: "Customers that need to process non-public sensitive personal data must arrange a separate, contracted customer-managed (self-hosted) deployment as described in Section 1. In a customer-managed deployment, data residency and any international transfers depend on the infrastructure and services you select — not on Vieomics. We do not control and cannot guarantee the physical location of infrastructure that you select, connect or operate — including Bring Your Own Cloud (BYOC) storage, compute or analysis servers — so we do not represent that a customer-managed or BYOC configuration stores data in Vietnam. The contact details in Section 12 apply.",
          },
          {
            type: "p",
            text: "On **this website (the landing page)** — the Platform itself does not use Google Analytics — traffic data (including IP addresses) is processed by our analytics provider as a processor and is not used for advertising. That service **runs only after you press Accept** in the cookie notice (Section 11); if you decline, no such data is transferred.",
          },
        ],
      },
      {
        id: "cookies",
        title: "11. Cookies and Identification Technologies",
        blocks: [
          {
            type: "p",
            text: "**Essential cookies:** used to keep you signed in and protect your account on the Platform — strictly necessary, no consent required.",
          },
          {
            type: "p",
            text: "**Analytics cookies (Google Analytics — this website):** used to see traffic in aggregated form. They are **enabled only after you press “Accept”** in the cookie notice at the bottom of this page; if you choose “Decline”, Google Analytics is not loaded and no cookie is set. The Omicslab Platform does not use Google Analytics.",
          },
          {
            type: "p",
            text: "**No advertising cookies:** we do not use third-party advertising or tracking cookies.",
          },
          {
            type: "p",
            text: "**You can change your mind at any time:** delete cookies and site data in your browser settings — the notice will appear again on your next visit so you can choose again.",
          },
        ],
      },
      {
        id: "responsibility",
        title: "12. Allocation of Responsibility",
        blocks: [
          {
            type: "p",
            text: "Security is a shared responsibility. The table below shows who controls each area for each deployment model.",
          },
          {
            type: "p",
            text: "**Data accepted on each model.** The public, platform-managed (Marketplace) service is intended only for non-human data (microorganisms, plants, animals and environmental samples), simulated or benchmark data, and public data that has been lawfully published or properly de-identified after the assessment described in Section 1. The platform security commitments below apply only to that data. Non-public sensitive personal data — including human genomic, genetic and health data — must not be uploaded to the public Platform and is handled only through a separate, contracted customer-managed (self-hosted) deployment.",
          },
          {
            type: "table",
            head: [
              "Control / Infrastructure",
              "Self-hosted (customer-managed)",
              "Platform-managed (Marketplace)",
            ],
            rows: [
              ["Data storage", "Your own cloud / object storage infrastructure", "Storage partitioned per workspace; encryption at rest for resources the platform directly operates, using the encryption supported by the underlying provider and configuration (for example AES-256)"],
              ["Version control", "Your own source repository (GitHub)", "Source repositories integrated in the Marketplace"],
              ["Compute infrastructure", "Your own HPC / cloud cluster", "Compute infrastructure managed directly by Omicslab"],
              ["Infrastructure access", "Managed by the customer", "Managed by the platform"],
              ["Credentials", "Managed by the customer", "Secured by the platform (never shown in plain text)"],
              ["Application stack (frontend, backend, database)", "Deployed and operated by the customer", "Operated by the platform"],
              ["Infrastructure compliance", "Customer’s responsibility", "Managed by the platform within its own scope"],
            ],
          },
          { type: "label", text: "Platform security commitments" },
          {
            type: "ul",
            items: [
              "**Architecture separation:** separation of the control plane from the data plane, where configured.",
              "**Least privilege:** short-lived credentials with tightly scoped access for every cross-boundary connection.",
              "**Environment isolation:** data isolated per workspace, with role-based access control (RBAC).",
              "**Audit transparency:** audit logging maintained to support security review.",
              "**Vulnerability management:** security incident and misconfiguration reports are received and patched promptly.",
            ],
          },
          {
            type: "p",
            text: "The commitments above apply only to the resources **Vieomics directly operates**. Cloud and infrastructure providers are responsible for their own layer, and where you operate or connect your own infrastructure (BYOC) its encryption, backup, access control and logging are your responsibility — Vieomics cannot guarantee them.",
          },
          { type: "label", text: "Mandatory customer responsibilities" },
          {
            type: "ul",
            items: [
              "**Account security:** protect your login credentials and enforce strong authentication (MFA/2FA) across your organization.",
              "**Legal and ethical compliance:** where you process human genomic or health data, do so only in a customer-managed (self-hosted) environment, and obtain full approval from an ethics board (IRB), voluntary informed consent from data subjects and any other lawful rights required. Such data must not be processed on the public Platform.",
              "**Data access control:** classify your data and set appropriate access permissions for each workspace and storage resource.",
              "**Backup and validation:** maintain independent backups and take responsibility for validating analysis outputs under your organization’s own research data management policy.",
            ],
          },
        ],
      },
      {
        id: "contact",
        title: "13. Contact",
        blocks: [
          {
            type: "p",
            text: "For any question, suggestion or support request related to privacy and personal data protection, please contact us:",
          },
          {
            type: "ul",
            items: [
              "Responsible legal entity: **VIEOMICS COMPANY LIMITED**",
              "Data protection contact (DPO): **Nguyen Tan Thanh Giang** — **giangnguyen@omicslab.io**",
              "Website: the [Contact](/contact) page",
              "Email: **contact@omicslab.io** (please state “Privacy Request” in the subject line)",
            ],
          },
        ],
      },
    ],
  },
  terms: {
    kicker: "Legal",
    title: "Terms of Service",
    navTitle: "Terms of Service",
    description:
      "These Terms govern your use of the Omicslab Platform, a bioinformatics platform for storing, analysing and sharing biological research data. The public Platform is intended only for non-human data, simulated or benchmark data, and lawfully published or properly de-identified public data. Non-public human genomic and health data is not processed on the public cloud Platform; it is handled through self-hosted (customer-managed) deployments (see Section 3).",
    notice:
      "By accessing or using the Omicslab Platform, you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        blocks: [
          {
            type: "p",
            text: "These Terms of Service constitute a legally binding agreement between you (the **User**) and **VIEOMICS COMPANY LIMITED** (the “**Company**”, “**we**”), the legal entity operating the Omicslab Platform (the “**Platform**”). By creating an account, accessing or using the Platform, you acknowledge that you have read, understood and agree to be bound by these Terms, our [Privacy Policy](/privacy), and any additional policies referenced herein.",
          },
        ],
      },
      {
        id: "eligibility",
        title: "2. Eligibility and Age Restriction",
        blocks: [
          {
            type: "p",
            text: "You must be at least **18 years of age** to create an account or use the Platform. By registering, you represent and warrant that you are 18 years of age or older and are legally capable of entering into a binding agreement. The Platform is not intended for individuals under 18, and we do not knowingly collect personal data from minors. If we become aware that a user is under 18, we will deactivate the account and handle the associated personal data in accordance with our [Privacy Policy](/privacy) — deleted or anonymised as required by law.",
          },
          {
            type: "p",
            text: "If you use the Platform on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
          },
        ],
      },
      {
        id: "sensitive-data",
        title: "3. Sensitive Data",
        blocks: [
          {
            type: "p",
            text: "The public Platform is **not intended for non-public sensitive personal data** and does not accept or process it. You must not upload non-public sensitive personal data of individuals in Vietnam to the public Platform, including human genomic, genetic, health-related and other special-category data as defined under Vietnamese law. Data that has been lawfully published and made openly accessible, or properly de-identified such that re-identification is not reasonably possible, may in limited cases be processed on the public Platform, but only where its source, access conditions, licence and privacy risk have been assessed — public availability alone does not make data anonymous. Accordingly, the public Platform is intended only for non-human data (microorganisms, plants, animals and environmental samples), simulated or benchmark data, and lawfully published or properly de-identified public data that has passed that assessment. **Do not rely on the label alone:** the file format (for example FASTQ, BAM or VCF), the use of a Sample ID or subject code instead of a patient name, or availability on a public repository such as NCBI does not by itself remove personal-data obligations, because genomic and health data can remain linkable to, or enable inferences about, an individual. Assess the access conditions, licence, permitted purpose, accompanying metadata and the risk of re-identification before processing. The rules that apply to a specific dataset are a legal question; customers should confirm them with qualified Vietnamese legal counsel.",
          },
          {
            type: "p",
            text: "To process sensitive data, you must [contact us](/contact) to arrange a **self-hosted deployment under a separate agreement**. Vieomics provides the Omicslab Platform as the platform management system, and you perform the full deployment on infrastructure you own or control and self-host it. The service is entirely your own: you run, configure and operate the whole stack — frontend, backend and APIs, application database, object storage, compute and workflow execution, pipelines and analysis tools, and access control — and the data is created, analysed, stored and managed only in your environment. No customer data is automatically transmitted from a self-hosted deployment to Vieomics. You may choose to provide specific logs, diagnostics or other information, or authorise access to your environment, solely for the agreed support and maintenance purposes. Any such access or processing remains subject to applicable law and the agreed service scope. Vieomics may assist with platform operation at your request, within the agreed service scope; any such access is authorised by you and limited to platform operation and maintenance, and **Vieomics does not analyse your data**. Responsibility for personal data follows the actual processing activities, the access granted, the purposes of processing and applicable law — you are responsible for your own legal basis, permissions, consent requirements where applicable, the security configuration of your environment, and any personal data processing impact assessment required by law.",
          },
          {
            type: "label",
            text: "Self-Hosted Deployment",
          },
          {
            type: "p",
            text: "In a self-hosted deployment, Vieomics provides the Omicslab Platform as the platform management system, and the customer performs the full deployment on infrastructure it owns or controls and self-hosts it. The customer is responsible for deploying, configuring and managing all components of the system, including the frontend, backend, database, object storage, compute resources and analysis tools.",
          },
          {
            type: "p",
            text: "Vieomics provides the Omicslab Platform as the platform management system, together with its documentation, updates and technical support within the agreed scope of service. The customer performs the full deployment and self-hosts it. In this model, Vieomics does not automatically have access to or control over the infrastructure, database or data that the customer stores and processes on its own systems, and does not analyse that data. No customer data is automatically transmitted from a self-hosted deployment to Vieomics. The customer may choose to provide specific logs, diagnostics or other information, or authorise access to its environment, solely for the agreed support and maintenance purposes. Any such access or processing remains subject to applicable law and the agreed service scope. Vieomics may assist with platform operation at the customer’s request, within the agreed scope.",
          },
          {
            type: "p",
            text: "Any access by Vieomics to the customer’s environment, if any, must be authorised by the customer and limited to the agreed support purposes. Each party’s responsibility for personal data is determined by the actual processing activities, the authority to decide on the processing, and applicable law. Where Vieomics actually accesses the environment for platform operation or support you request, views data as needed to operate or troubleshoot the platform, receives logs, diagnostics or platform/job metadata that contain personal data, or otherwise performs platform-operation activities on infrastructure you operate, those activities may make us a **processor** — or, where we determine the purposes of the processing, a **controller** — for the data involved, and we apply the corresponding obligations. We do not carry out analysis of your research data. Contractual statements do not override obligations that applicable law makes mandatory.",
          },
          {
            type: "p",
            text: "Where you operate the Platform in your own environment, you agree that:",
          },
          {
            type: "ul",
            items: [
              "You have obtained all required ethical approvals, informed consents and authorisations needed to process the data, in accordance with applicable law and your institution’s review boards.",
              "You will not process data collected from individuals who have not consented to its processing for bioinformatics research, except where permitted by law.",
              "You remain the data controller (or an authorised processor under your own agreements), and you are responsible for ensuring your use complies with all applicable data protection legislation, including the Law on Personal Data Protection (Law No. 91/2025/QH15) and, where applicable, the GDPR or HIPAA.",
              "You will not use the Platform to store unlawful content or data whose processing would violate the rights of any person.",
            ],
          },
        ],
      },
      {
        id: "accounts",
        title: "4. Accounts and Security",
        blocks: [
          {
            type: "p",
            text: "You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorised access or suspected breach. We employ industry-standard security controls for the services and infrastructure we directly operate — including encryption in transit and at rest, access control and audit logging — but no system is impenetrable, and you must take reasonable steps to protect your own credentials. Where you operate or connect your own infrastructure (BYOC), its encryption, backup, access control and logging are your responsibility and that of your providers; Vieomics cannot guarantee them. Details are published in our [E-commerce Policies](/policies).",
          },
        ],
      },
      {
        id: "acceptable-use",
        title: "5. Acceptable Use",
        blocks: [
          { type: "p", text: "You agree not to use the Platform to:" },
          {
            type: "ul",
            items: [
              "Violate any applicable law, regulation or third-party right.",
              "Upload malicious code, attempt to gain unauthorised access to the Platform, its infrastructure or other users’ data.",
              "Use the Platform to identify or re-identify individuals, or to discriminate against any person or group.",
              "Circumvent usage limits, quotas or security controls, or resell Platform access without written permission.",
              "Interfere with the operation or availability of the Platform.",
            ],
          },
        ],
      },
      {
        id: "data-protection",
        title: "6. Data Protection and Legal Compliance",
        blocks: [
          {
            type: "p",
            text: "We process personal data in accordance with the Personal Data Protection Law No. 91/2025/QH15, Decree No. 356/2025/ND-CP and equivalent regulations. Our systems and processes are also **designed to align with** the GDPR (EU) and HIPAA (US) should those frameworks come into scope for us in the future — Omicslab **holds no certification** under either of them today. Key commitments include:",
          },
          {
            type: "ul",
            items: [
              "**Lawfulness:** we process personal data only on a valid legal basis — consent, contract, legal obligation, or legitimate interests.",
              "**Data minimisation:** we collect only what is necessary to operate the Platform.",
              "**Security:** technical and organisational measures protect personal data against unauthorised access, loss or alteration within the services Vieomics directly operates; for infrastructure you operate or connect (BYOC), security is your responsibility.",
              "**Your rights:** you may exercise rights of access, rectification, erasure, restriction, portability and objection — see our [Privacy Policy](/privacy) for details.",
            ],
          },
          {
            type: "p",
            text: "For research data you upload, you retain control and ownership. We act as a **processor** only for data you provide to a platform-managed service that we operate; for data held in a customer-managed deployment we do not process it. We act as a **controller** for the account, billing, security and usage data needed to run the service.",
          },
        ],
      },
      {
        id: "service",
        title: "7. Service Availability and Warranty Disclaimer",
        blocks: [
          {
            type: "p",
            text: "We aim to provide a reliable service but do not warrant that the Platform will be uninterrupted, error-free, or that results will be scientifically valid for any particular purpose. The Platform is provided **“as is”**. You are responsible for validating analysis results and for maintaining independent backups of research data where required by your obligations.",
          },
        ],
      },
      {
        id: "liability",
        title: "8. Limitation of Liability",
        blocks: [
          {
            type: "p",
            text: "To the extent permitted by law, we are not liable for indirect or unforeseeable damages, or for the loss of data, revenue or goodwill.",
          },
          {
            type: "p",
            text: "In any event, our maximum aggregate liability relating to the Platform will not exceed the amount you have paid in the 12 months preceding the claim.",
          },
          {
            type: "p",
            text: "These Terms do not reduce or eliminate any mandatory legal liability provided by law.",
          },
        ],
      },
      {
        id: "termination",
        title: "9. Term and Termination",
        blocks: [
          {
            type: "p",
            text: "You may close your account at any time. We may suspend or terminate access — with or without notice — for violation of these Terms, unlawful activity, or as required by law. Upon termination, you remain responsible for obligations accrued before termination. Personal and research data are handled per our [Privacy Policy](/privacy).",
          },
        ],
      },
      {
        id: "changes",
        title: "10. Changes to These Terms",
        blocks: [
          {
            type: "p",
            text: "We may revise these Terms from time to time. Material changes will be announced through the Platform before taking effect. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.",
          },
        ],
      },
      {
        id: "governing-law",
        title: "11. Governing Law",
        blocks: [
          {
            type: "p",
            text: "These Terms are governed by the laws of Vietnam, without regard to conflict-of-law principles. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Vietnam.",
          },
        ],
      },
      {
        id: "contact",
        title: "12. Contact",
        blocks: [
          {
            type: "p",
            text: "Questions about these Terms may be directed to us through our [Contact](/contact) page or to **contact@omicslab.io**, or to the data protection contact referenced in the [Privacy Policy](/privacy).",
          },
        ],
      },
      {
        id: "billing",
        title: "13. Billing, Balance and Data Cycles",
        blocks: [
          {
            type: "p",
            text: "The payment terms and cycles below apply to the Platform; detailed data retention periods are set out in our [Privacy Policy](/privacy).",
          },
          {
            type: "ul",
            items: [
              "**Subscription:** billed in cycles, normally monthly. Renewal must be completed before the current cycle ends.",
              "**Marketplace storage (pay-as-you-go):** storage capacity is charged on a usage basis in monthly cycles, tied to your subscription, and cannot extend beyond the term of the subscription that is in force.",
              "**Advance email notices:** before any action is taken we email your administrators — a reminder **7 days** before the storage cycle ends, and a notice as soon as it expires.",
              "**Workspace cleanup:** when the storage cycle ends, workspace access is blocked and the data is retained for a **7-day window**; it is then permanently deleted — only the audit log is kept for tracing purposes (details in Section 6 of our [Privacy Policy](/privacy)).",
              "**Top-up balance:** can only be spent while your organization has an active subscription. When the subscription expires or is cancelled with no renewal in flight, the remaining balance is forfeited and reset to zero; balance information and deadlines are also sent by email before this is applied.",
            ],
          },
        ],
      },
    ],
  },

  hub: {
    kicker: "Legal",
    title: "Policies",
    description:
      "The policies that govern the Omicslab Platform — including the disclosures required of an e-commerce service website under Vietnam's Ministry of Industry and Trade regulations (Decree No. 52/2013/ND-CP, as amended by Decree No. 85/2021/ND-CP).",
    intro:
      "The Omicslab Platform is a bioinformatics data analysis service operated by VIEOMICS COMPANY LIMITED. The documents below form our policy set and apply together.",
  },

  security: {
    kicker: "Legal",
    title: "Security & Compliance",
    navTitle: "Security & Compliance",
    description:
      "How Omicslab secures the services it operates, where data is located, and how security and compliance responsibilities are shared between Vieomics and the customer.",
    sections: [
      {
        id: "scope",
        title: "Article 1. Scope of these commitments",
        blocks: [
          {
            type: "p",
            text: "This page describes the security measures, data-location rules and compliance posture of the Omicslab Platform. Our commitments apply only to the services and infrastructure **Vieomics directly operates and controls**. They do not extend to infrastructure a customer runs or connects itself, or to the layer supplied by a cloud or infrastructure provider.",
          },
          {
            type: "p",
            text: "Security is shared. The articles below distinguish what Vieomics does, what the cloud or infrastructure provider does, and what the customer does. Where a deployment is **self-hosted (customer-managed) or BYOC**, the customer operates the stack and Vieomics has no access to the environment or data unless the customer authorises it for a defined support or maintenance purpose.",
          },
        ],
      },
      {
        id: "residency",
        title: "Article 2. Data location and residency",
        blocks: [
          {
            type: "p",
            text: "Vieomics currently operates the Omicslab Platform only in Vietnam. **For the storage and compute that Vieomics provides, the location of storage and processing depends on the service configuration and the infrastructure region you select.** On the Vietnam region (default), data and compute provided by Vieomics are stored and processed in Vietnam.",
          },
          {
            type: "p",
            text: "**We do not represent that every resource is domestic.** The platform uses S3-compatible object storage, so a customer may connect its own bucket or use a cloud region of its choosing, and may run workloads on its own cluster. For infrastructure the customer selects, connects or operates — including Bring Your Own Cloud (BYOC) storage, compute or analysis servers, and customer-managed (self-hosted) deployments — the location of that data depends on that infrastructure, and Vieomics does not control and cannot guarantee that it is in Vietnam.",
          },
          {
            type: "p",
            text: "Because the storage and compute that Vieomics provides are located in Vietnam, no cross-border transfer of personal data arises in our current operation for those resources. Where a customer connects its own infrastructure, residency and any cross-border transfer depend on the customer's configuration, and the customer is responsible for the corresponding legal requirements. Section 10 of our [Privacy Policy](/privacy) contains the full statement.",
          },
        ],
      },
      {
        id: "measures",
        title: "Article 3. Security measures",
        blocks: [
          {
            type: "p",
            text: "For the services and infrastructure **Vieomics directly operates**, we implement:",
          },
          {
            type: "ul",
            items: [
              "Encryption of data in transit (TLS/SSL) and, where the platform directly stores it, encryption at rest for the resources Vieomics manages — using the encryption supported by the underlying infrastructure provider and configuration (for example AES-256).",
              "Least-privilege access control (RBAC), multi-factor authentication (MFA) and system audit logs.",
              "Workspace isolation, and separation of the control plane (job orchestration, credentials, quotas) from the data plane where technically configured.",
              "Security monitoring and incident detection across platform-managed resources, together with regular security reviews and vulnerability assessments.",
              "**Credential handling:** credentials used to launch jobs are encrypted and transferred securely to the execution environment; they are never shown to end users or stored in plain text there.",
            ],
          },
          {
            type: "p",
            text: "**Cloud and infrastructure providers** are responsible for the measures in their own layer — physical and environmental security, the hypervisor, and the encryption, storage, network and logging primitives they supply — under their own terms and certifications. In a **customer-managed or BYOC deployment**, the customer is responsible for the infrastructure it operates or connects (storage, database, compute, backups, access policies, logging and the analysis environment) and for verifying that those measures meet its requirements; where data sits in storage or a database the customer runs or connects, Vieomics cannot guarantee its encryption, backup, access control or logging. We remain responsible for the security of the software we supply.",
          },
        ],
      },
      {
        id: "compliance",
        title: "Article 4. Standards and compliance posture",
        blocks: [
          {
            type: "p",
            text: "Vieomics operates the Platform under Vietnamese law, including the Personal Data Protection Law No. 91/2025/QH15, Decree No. 356/2025/ND-CP and the Cybersecurity Law. Administrative penalties for cybersecurity and personal data protection violations are set out in Decree No. 330/2026/ND-CP, in force since 19 August 2026.",
          },
          {
            type: "p",
            text: "Our measures are **designed toward** the GDPR (EU) and HIPAA (US) so the platform is ready for stricter requirements in the future. As of the date of this page, **Omicslab holds no certification, independent audit or accreditation** under GDPR, HIPAA or any international certification programme. We do not claim full compliance with any framework beyond the Vietnamese law under which we operate.",
          },
          {
            type: "p",
            text: "We do not warrant that the Platform satisfies every law that may apply to a customer's particular use case. The customer is responsible for determining whether its use of the Platform fits its workload and for its own compliance obligations.",
          },
        ],
      },
      {
        id: "responsibility",
        title: "Article 5. Allocation of responsibility",
        blocks: [
          {
            type: "p",
            text: "**Platform-managed (Marketplace).** For the application services, compute and storage that Vieomics operates, Vieomics is responsible for the security measures described in Article 3, for the data it directly stores, and for its own legal obligations. This is one of our deployment models; it is not presented as a higher- or lower-assurance model than a customer-managed deployment — the assurance a customer obtains depends on the configuration actually used.",
          },
          {
            type: "p",
            text: "**Self-hosted (customer-managed / BYOC).** The customer is responsible for the infrastructure, access control, backups, logging and security configuration it operates or connects, and for its own legal basis, consents and impact assessments. To the extent permitted by law, Vieomics is not liable for incidents arising from systems the customer manages, without limiting our own obligations under applicable law or a separate agreement.",
          },
          {
            type: "p",
            text: "**Public data scope.** The public, platform-managed (Marketplace) service is intended only for non-human data (microorganisms, plants, animals and environmental samples), simulated or benchmark data, and public data that has been lawfully published or properly de-identified after the assessment described in Section 1 of our [Privacy Policy](/privacy). Non-public sensitive personal data — including human genomic, genetic and health data — is handled only through a separate, contracted customer-managed (self-hosted) deployment.",
          },
        ],
      },
      {
        id: "incidents",
        title: "Article 6. Security incidents and breach notification",
        blocks: [
          {
            type: "p",
            text: "If a personal data breach affecting information Vieomics controls is detected, we activate our internal incident-response procedure and, where applicable law requires notification, notify the competent authority and/or the affected data subjects in accordance with the applicable statutory triggers, recipients and deadlines. Incident records are kept at least for the period required by applicable law after the incident has been remediated. For a customer-managed deployment, the customer is responsible for detecting and notifying incidents in its own environment.",
          },
        ],
      },
      {
        id: "contact",
        title: "Article 7. Contact",
        blocks: [
          {
            type: "p",
            text: "For security or compliance questions, contact us through the [Contact](/contact) page or at **contact@omicslab.io**. The data protection contact is set out in Section 13 of our [Privacy Policy](/privacy).",
          },
        ],
      },
    ],
  },

  pricing: {
    kicker: "Legal",
    title: "Pricing Policy",
    navTitle: "Pricing Policy",
    description:
      "How Omicslab sets, lists and changes the prices of the Platform's services.",
    sections: [
      {
        id: "price-basis",
        title: "Article 1. Service prices and currency",
        blocks: [
          {
            type: "p",
            text: "Some products or features of the Platform are subject to service fees. Fees are published on the Platform's pricing page, in the Dashboard, or notified directly to the customer.",
          },
          {
            type: "ul",
            items: [
              "**Subscription:** charged per billing cycle, normally monthly, according to the plan selected.",
              "**Marketplace storage (pay-as-you-go):** charged on a usage basis in monthly cycles, tied to the subscription in force.",
              "**Prepaid top-up:** prepaid credit held in your organization wallet and used to pay for services on the Platform.",
            ],
          },
          {
            type: "p",
            text: "Prices are expressed in **Vietnamese Dong (VND)** and are inclusive or exclusive of VAT as stated at checkout or on the invoice. Apart from the listed fee, no other charge arises from the sale of the service. Charges for infrastructure you connect yourself (Bring Your Own Cloud) are billed by your own provider and are not part of our prices.",
          },
        ],
      },
      {
        id: "quota",
        title: "Article 2. Usage quotas and overage",
        blocks: [
          {
            type: "p",
            text: "Each plan includes usage quotas (storage, compute and concurrent jobs). If usage exceeds the subscribed quota in a cycle, the overage is charged at the effective unit price of the plan and deducted from the customer's prepaid balance without interrupting service. Customers should maintain a balance consistent with actual usage so the service runs without interruption.",
          },
        ],
      },
      {
        id: "changes",
        title: "Article 3. Changes to prices and promotions",
        blocks: [
          {
            type: "p",
            text: "Fees may be adjusted from time to time, or promotional programmes may apply. Where a change is made, we publish it on the Platform at least **20 days** before it takes effect. If the customer continues to use the service after the new fee takes effect, it is treated as acceptance of the adjusted fee.",
          },
        ],
      },
      {
        id: "refunds",
        title: "Article 4. Refunds",
        blocks: [
          {
            type: "p",
            text: "Unless otherwise required by law, fees already paid are **non-refundable**. Refunds on termination are governed by our [Service Provision, Termination and Refund Policy](/policies/service-provision).",
          },
        ],
      },
    ],
  },

  payment: {
    kicker: "Legal",
    title: "Payment Policy",
    navTitle: "Payment Policy",
    description:
      "How to register online for Omicslab services and how payment works.",
    sections: [
      {
        id: "steps",
        title: "Article 1. Online registration and payment steps",
        blocks: [
          {
            type: "ul",
            items: [
              "**Step 1:** open the pricing page on the Platform, choose the plan you want and select “Register”.",
              "**Step 2:** create an account or sign in. If you are new, complete the required details; we send a confirmation email to activate the account.",
              "**Step 3:** return to the pricing section and choose the plan that fits your needs.",
              "**Step 4:** complete your payment details and continue.",
              "**Step 5:** review the plan, apply a discount code if you have one, and continue to payment.",
              "**Step 6:** pay by QR code or bank transfer using the details provided, to activate the plan.",
            ],
          },
        ],
      },
      {
        id: "methods",
        title: "Article 2. Payment methods",
        blocks: [
          { type: "p", text: "The Platform supports the following payment methods:" },
          {
            type: "ul",
            items: [
              "Bank transfer, using the account details shown in the Dashboard or on the invoice. Please do not alter the transfer reference.",
              "Online payment gateway, supporting the domestic and international cards and methods the gateway provides.",
              "Prepaid top-up to your organization wallet.",
            ],
          },
          {
            type: "p",
            text: "Please check the payment information carefully before transferring. The service is activated or renewed only after we confirm payment.",
          },
        ],
      },
      {
        id: "cycles",
        title: "Article 3. Billing cycles and top-up balance",
        blocks: [
          {
            type: "ul",
            items: [
              "Payment is made per cycle, normally monthly. Renewal must be completed before the current cycle ends.",
              "Electronic invoices are issued as required by law.",
              "**Top-up balance:** can only be spent while your organization has an active subscription. When the subscription expires or is cancelled with no renewal in flight, the remaining balance is forfeited and reset to zero by an automatic daily sweep; email notices are sent before this is applied.",
            ],
          },
        ],
      },
      {
        id: "issues",
        title: "Article 4. Failed and duplicate payments",
        blocks: [
          {
            type: "ul",
            items: [
              "If a payment does not succeed, access to the service may be suspended until payment is completed.",
              "If a duplicate transaction or incorrect charge occurs, contact us; we reconcile the account and refund the difference.",
            ],
          },
        ],
      },
      {
        id: "refunds",
        title: "Article 5. Refunds on termination",
        blocks: [
          {
            type: "p",
            text: "Fees already paid are non-refundable except where required by law. Refunds on termination are governed by our [Service Provision, Termination and Refund Policy](/policies/service-provision).",
          },
        ],
      },
    ],
  },

  serviceProvision: {
    kicker: "Legal",
    title: "Service Provision, Termination and Refund Policy",
    navTitle: "Service Provision & Refund",
    description:
      "How the Platform's services are provided, how they end, and when fees are refunded.",
    sections: [
      {
        id: "conditions",
        title: "Article 1. Conditions for using the service",
        blocks: [
          {
            type: "p",
            text: "To use the Platform's services, a customer must meet the following conditions:",
          },
          {
            type: "ul",
            items: [
              "Have full legal capacity under the law.",
              "Be an individual, business or organisation operating lawfully.",
              "Provide complete, honest and accurate registration information as required.",
              "Have lawful rights to the infrastructure, systems or data connected to the Platform.",
              "Comply with this policy and the applicable law.",
            ],
          },
          {
            type: "p",
            text: "We may require additional information or documents to verify a customer during registration or use of the service.",
          },
          {
            type: "p",
            text: "**Data permitted on the public service.** The public, platform-managed (Marketplace) service may only be used with non-human data (microorganisms, plants, animals and environmental samples), simulated or benchmark data, and public data that has been lawfully published or properly de-identified. Non-public sensitive personal data of individuals in Vietnam — including human genomic, genetic and health data — must not be uploaded to the public service and is handled only through a separate, contracted customer-managed (self-hosted) deployment, as described in our [Privacy Policy](/privacy) and [Terms of Service](/terms).",
          },
        ],
      },
      {
        id: "delivery",
        title: "Article 2. How the service is provided",
        blocks: [
          {
            type: "ul",
            items: [
              "The service is provided **online** through the Omicslab Platform. No physical goods are delivered.",
              "Your account and workspace are activated after payment or confirmation.",
              "The service is provided on an availability basis, by region and plan. See our [Conditions and Limitations](/policies/conditions) on availability and warranty disclaimer.",
            ],
          },
        ],
      },
      {
        id: "term",
        title: "Article 3. Term of use",
        blocks: [
          {
            type: "p",
            text: "The term of use is determined by the service plan or the agreement between Omicslab and the customer, and is stated clearly before or at the time of registration. For a fixed-term service, the customer's right to use the service runs from the start of use to the end of the registered or agreed term. For periodic services, the term continues after the customer completes renewal and meets the applicable conditions.",
          },
        ],
      },
      {
        id: "termination",
        title: "Article 4. Cases of termination",
        blocks: [
          {
            type: "p",
            text: "The service may end on expiry of the term, at the customer's request, by agreement between the parties, or where Omicslab exercises its right to suspend, limit or terminate the service in the following cases:",
          },
          {
            type: "ul",
            items: [
              "The customer breaches the service conditions.",
              "Signs of fraud, abuse or a security risk are detected.",
              "The customer does not pay the applicable fees in full.",
              "At the request of a competent state authority.",
              "At the request of, or following a change by, a service or infrastructure partner.",
              "Maintenance, upgrade or protection of the system is required.",
            ],
          },
          {
            type: "p",
            text: "When the service ends, we may revoke credentials and disable access to the system. Termination does not end financial or legal obligations that arose before termination.",
          },
        ],
      },
      {
        id: "end-time",
        title: "Article 5. When the contract ends",
        blocks: [
          {
            type: "p",
            text: "The contract between Omicslab and the customer ends when one of the following occurs:",
          },
          {
            type: "ul",
            items: [
              "The agreed term expires and the parties do not agree to renew.",
              "The parties have completed their rights and obligations and agree to end the contract early.",
              "Either party exercises its right to terminate under the contract or the law.",
              "Omicslab terminates the service under the contract, the terms of use, its policies, or at the request of a competent state authority.",
              "Other cases agreed by the parties or provided by law.",
            ],
          },
          {
            type: "p",
            text: "Where the exact end time is not published and the customer is the terminating party, the time the customer sends the notice is treated as the end time.",
          },
        ],
      },
      {
        id: "termination-process",
        title: "Article 6. Process and response time for a customer's termination notice",
        blocks: [
          {
            type: "p",
            text: "After receiving a notice of termination, we check and confirm receipt within a maximum of **3 working days**. If the notice is incomplete or requires further verification, we may ask the customer for the necessary information; the period is counted from when we receive complete and valid information. Once the check is complete, we respond confirming the termination, the end time and any remaining obligations. We aim to complete the check and respond within **7 working days** of receiving complete and valid information; where reconciliation of transactions or coordination with third parties is needed, the period may be longer, and we inform the customer of the status and the expected completion time.",
          },
        ],
      },
      {
        id: "refunds",
        title: "Article 7. Refunds on termination",
        blocks: [
          {
            type: "p",
            text: "Service fees paid to Omicslab are for registering and using the service under the agreement. We do not refund service fees where the customer terminates, stops or does not continue to use the service before the term ends, except where required by law or where a separate published policy applies to a specific service. Termination does not end financial or legal obligations that arose before termination. Nothing in this policy limits your statutory rights as a consumer under Vietnamese law.",
          },
        ],
      },
    ],
  },

  conditions: {
    kicker: "Legal",
    title: "Conditions and Limitations for Providing the Service",
    navTitle: "Conditions & Limitations",
    description:
      "The conditions, limits and prohibited uses that apply to the Platform.",
    sections: [
      {
        id: "conditions",
        title: "Article 1. Conditions of use",
        blocks: [
          {
            type: "p",
            text: "To use the Platform's services, a customer must meet the following conditions:",
          },
          {
            type: "ul",
            items: [
              "Be at least **18 years old** with full legal capacity, or an organisation operating lawfully.",
              "Provide complete, honest and accurate registration information.",
              "Have lawful rights to the infrastructure, systems or data connected to the Platform.",
              "Comply with these conditions and the applicable law.",
            ],
          },
        ],
      },
      {
        id: "scope",
        title: "Article 2. Permitted scope of use",
        blocks: [
          {
            type: "p",
            text: "The Platform provides bioinformatics data storage and analysis — a software service. It does not supply physical goods. You may use the Platform to:",
          },
          {
            type: "ul",
            items: [
              "Store, manage and analyse non-human research data (microorganisms, plants, animals, environmental samples), simulated or benchmark data, and public data that has been lawfully published or properly de-identified — within your subscribed plans. Non-public sensitive personal data of individuals in Vietnam is not permitted on the public Platform.",
              "Integrate the Platform's API and tooling with your own website, application or internal systems.",
              "Synchronise analysis results and metadata with your own management software or systems.",
            ],
          },
          {
            type: "p",
            text: "**Sensitive personal data:** the public Platform does not accept or process non-public sensitive personal data of individuals in Vietnam. Human genomic or health-related data is handled only through a separate, contracted **self-hosted deployment** in which Vieomics provides the Omicslab Platform as the platform management system, you perform the full deployment on your own infrastructure and self-host it, and you run, configure, analyse, store and manage the data yourself; no customer data is automatically transmitted from a self-hosted deployment to Vieomics except where you choose to provide information or authorise access solely for the agreed support and maintenance purposes as described in the [Privacy Policy](/privacy), and Vieomics does not analyse it. **Publicly available human data is not automatically anonymous:** lawfully published or properly de-identified data may be processed on the public Platform only after an assessment of its source, access conditions and privacy risk.",
          },
        ],
      },
      {
        id: "law",
        title: "Article 3. Compliance with the law",
        blocks: [
          {
            type: "p",
            text: "You agree to use the Platform in accordance with Vietnamese law and applicable rules on data protection, cybersecurity and scientific research. You are responsible for the lawful basis, consents and ethics approvals for the data you process.",
          },
        ],
      },
      {
        id: "prohibited",
        title: "Article 4. Prohibited acts",
        blocks: [
          { type: "p", text: "You must not use the Platform to:" },
          {
            type: "ul",
            items: [
              "Violate the law or infringe the rights of any person.",
              "Upload non-public sensitive personal data of individuals in Vietnam to the public Platform (except data that has been lawfully published or de-identified).",
              "Provide false information or impersonate any person or organisation.",
              "Upload malicious code, attempt unauthorised access, or interfere with the Platform's security or stability.",
              "Re-identify individuals, or discriminate against any person or group.",
              "Circumvent quotas or security controls, or resell access without written permission.",
              "Reverse engineer, copy or exploit the Platform's software, API or technical documentation without written consent.",
            ],
          },
        ],
      },
      {
        id: "access",
        title: "Article 5. Access, credentials and integration",
        blocks: [
          {
            type: "p",
            text: "You are responsible for integrating with the Platform in accordance with our technical documentation, for protecting your credentials, and for controlling access by your staff or third parties. You must notify us immediately of any suspected credential leak, unauthorised access or abnormal use. We may apply rate limits or other technical measures to protect the infrastructure, and may change or discontinue part of the API for upgrades or legal compliance, giving reasonable notice where a change affects your integration.",
          },
        ],
      },
      {
        id: "infrastructure",
        title: "Article 6. Customer-managed infrastructure",
        blocks: [
          {
            type: "p",
            text: "Where you connect your own storage, version control or compute resources (Bring Your Own Cloud), you are responsible for the security, access permissions and safety of the data on that infrastructure. To the extent permitted by law, we are not liable for incidents arising from systems you manage, without limiting our own obligations under applicable law or a separate agreement.",
          },
        ],
      },
      {
        id: "availability",
        title: "Article 7. Service stability and availability",
        blocks: [
          {
            type: "p",
            text: "We aim to keep the system stable, safe and continuous, but we do not warrant that the service will operate 100% of the time, be free of errors or interruption, or have a fixed response time. Disruption may arise from maintenance, infrastructure or partner incidents, internet or telecommunications failures, cyberattacks, or events beyond our reasonable control.",
          },
        ],
      },
      {
        id: "suspension",
        title: "Article 8. Suspension and termination",
        blocks: [
          {
            type: "p",
            text: "We may suspend, limit or terminate the service where these conditions or the terms of use are breached, where there are signs of fraud, abuse or a security risk, where fees are not paid in full, at the request of a competent authority, or where maintenance, upgrade or protection of the system requires it. On termination, we may revoke credentials and disable access. Termination does not end financial or legal obligations that arose before termination.",
          },
        ],
      },
      {
        id: "force-majeure",
        title: "Article 9. Force majeure",
        blocks: [
          {
            type: "p",
            text: "We are not liable for delay or failure to perform due to force majeure events, including natural disasters, fire, epidemic, war, widespread power loss, cyberattacks, internet or telecommunications failures, infrastructure partner faults, or decisions of state authorities. In such cases we will endeavour to remedy the situation as soon as possible.",
          },
        ],
      },
      {
        id: "changes",
        title: "Article 10. Changes to these conditions",
        blocks: [
          {
            type: "p",
            text: "We may amend or supplement these conditions as needed to reflect our operations, partner requirements or the law. Updated versions are published on the Platform. Continued use after an amendment takes effect constitutes acceptance of it.",
          },
        ],
      },
      {
        id: "effect",
        title: "Article 11. Effect",
        blocks: [
          {
            type: "p",
            text: "These conditions take effect from the date published on the Platform. If any provision is declared invalid by a competent authority, the remaining provisions stay in effect. By registering an account or using any product, API or service, the customer confirms they have read, understood and agree to comply with all of these conditions and limitations.",
          },
        ],
      },
    ],
  },

  rightsObligations: {
    kicker: "Legal",
    title: "Rights and Obligations of the Parties",
    navTitle: "Rights & Obligations",
    description:
      "The rights and obligations of Omicslab (the platform operator) and of the customer.",
    sections: [
      {
        id: "provider",
        title: "Article 1. Rights and obligations of the platform operator (Omicslab / Vieomics)",
        blocks: [
          {
            type: "ul",
            items: [
              "Issue, publish and implement operating and transaction conditions, and publish service standards and processes on the Platform.",
              "Charge service fees according to the published [Pricing Policy](/policies/pricing), and inform buyers in full or in summary of any promotions before purchase.",
              "Ensure the Platform operates safely and stably.",
              "Suspend, limit or terminate the service in the cases described in the [Service Provision, Termination and Refund Policy](/policies/service-provision), and revoke credentials and disable access on termination.",
              "Apply measures to protect business secrets and consumer personal data in line with the published [Privacy Policy](/privacy).",
              "Receive and resolve requests, feedback and complaints from users.",
              "Monitor and prevent unlawful conduct, and cooperate with and provide information or data at the request of competent state authorities.",
              "Provide accurate and complete information, ensure service quality, and fulfil service, replacement and refund obligations; and not exploit the Platform for prohibited business, counterfeit goods, intellectual-property infringement or other unlawful conduct.",
              "Fulfil financial obligations to the State, protect buyer data and consumer information, and cooperate with competent state authorities in handling violations.",
            ],
          },
        ],
      },
      {
        id: "customer",
        title: "Article 2. Rights and obligations of the customer",
        blocks: [
          {
            type: "ul",
            items: [
              "Be assured of consumer rights and be provided with complete, accurate information about the service and the provider.",
              "Choose the service and payment method, have personal data protected, and have feedback, requests and complaints resolved in accordance with the law.",
              "Provide the necessary and accurate information, and pay fees in full and on time.",
              "Comply with the law, the operating conditions and the transaction conditions of the Platform, and not exploit the Platform to commit unlawful acts.",
            ],
          },
        ],
      },
    ],
  },

  complaints: {
    kicker: "Legal",
    title: "Method for Receiving and Resolving Feedback, Requests and Complaints",
    navTitle: "Feedback & Complaints",
    description:
      "How to submit feedback or complaints and the process and timelines for resolving them.",
    sections: [
      {
        id: "methods",
        title: "Article 1. How to submit",
        blocks: [
          {
            type: "p",
            text: "For any support request, feedback or complaint about the service, please contact us through:",
          },
          {
            type: "ul",
            items: [
              "Online form on the [Contact](/contact) page.",
              "Email **contact@omicslab.io** — please state “Feedback / Complaint” in the subject line.",
              "Data protection contact (DPO) **Nguyen Tan Thanh Giang** — **giangnguyen@omicslab.io** for complaints relating to personal data.",
              "By post or in person at: VIEOMICS COMPANY LIMITED, No. 10 Song Thao, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam.",
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Article 2. Process for receiving and handling",
        blocks: [
          {
            type: "ul",
            items: [
              "**Step 1 — Receive:** our customer support team receives the complaint through the channels above and confirms receipt.",
              "**Step 2 — Analyse and verify:** the complaint is passed to the relevant technical or service teams to check and verify the cause and severity.",
              "**Step 3 — Propose a solution and respond:** based on the verification, we propose a resolution and contact the customer directly to agree it.",
              "**Step 4 — Implement and close:** if the customer agrees, we implement the agreed resolution and notify the customer that the complaint is closed.",
            ],
          },
        ],
      },
      {
        id: "timelines",
        title: "Article 3. Response and resolution timelines",
        blocks: [
          {
            type: "p",
            text: "We acknowledge feedback, requests and complaints within **3 working days** of receipt. Depending on the nature, complexity and content of each complaint, we aim to resolve it within **7 working days** of confirming receipt of the complete information and documents needed from the customer.",
          },
          {
            type: "p",
            text: "For matters requiring further verification, reconciliation, or coordination with partners or other third parties, the resolution period may be longer. In that case we inform the customer of the status, the reason and the expected completion time.",
          },
        ],
      },
      {
        id: "tools",
        title: "Article 4. Tools and measures supporting resolution",
        blocks: [
          {
            type: "ul",
            items: [
              "**Clarify with the customer:** we may exchange with the customer through the channels above to clarify the matter, its cause and the proposed handling.",
              "**Check and reconcile information:** we may check account, transaction, usage-history and system data, and documents provided by the customer.",
              "**Request additional information:** where necessary, we may ask the customer for more information, images, documents or related materials.",
              "**Coordinate with relevant parties:** where a matter involves a partner, infrastructure provider or other third party, we may coordinate with them to check and verify.",
            ],
          },
        ],
      },
      {
        id: "escalation",
        title: "Article 5. Escalation",
        blocks: [
          {
            type: "p",
            text: "If you disagree with the outcome, you may request a review or bring the matter before a competent authority or court under Vietnamese law. Consumers may also lodge complaints with the state authority responsible for consumer protection. Nothing in this policy limits your statutory rights as a consumer.",
          },
        ],
      },
    ],
  },

  support: {
    kicker: "Legal",
    title: "Online Support",
    navTitle: "Online Support",
    description:
      "The online channels through which Omicslab supports users.",
    sections: [
      {
        id: "channels",
        title: "Article 1. Support channels",
        blocks: [
          {
            type: "p",
            text: "The Platform offers the following forms of online support:",
          },
          {
            type: "ul",
            items: [
              "**Online contact form:** available on the [Contact](/contact) page.",
              "**Support email:** **contact@omicslab.io**.",
              "**Self-service resources:** guides, FAQs and technical documentation where available.",
              "**In-product support:** the in-app chat or support channel, where it is provided for your plan.",
              "**Legal and personal data:** contact the DPO — **giangnguyen@omicslab.io**.",
            ],
          },
        ],
      },
      {
        id: "hours",
        title: "Article 2. Support hours and response",
        blocks: [
          {
            type: "p",
            text: "Support hours are business hours (office hours) excluding public holidays. Requests received outside these hours are handled on the next business day. We usually acknowledge new requests within **24 working hours**.",
          },
        ],
      },
    ],
  },
};
