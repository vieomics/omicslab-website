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

export type Policies = {
  shared: {
    lastUpdatedLabel: string;
    lastUpdated: string;
    tocLabel: string;
    policiesLabel: string;
  };
  privacy: PolicyPage;
  terms: PolicyPage;
  security: PolicyPage;
  compliance: PolicyPage;
  responsibility: PolicyPage;
};

export const policiesEn: Policies = {
  shared: {
    lastUpdatedLabel: "Last updated",
    lastUpdated: "25 September 2026",
    tocLabel: "On this page",
    policiesLabel: "Policies",
  },

  privacy: {
    kicker: "Legal",
    title: "Personal Data Protection & Privacy Policy",
    navTitle: "Privacy Policy",
    description:
      "Welcome to the Omicslab bioinformatics data analysis platform, a product operated by VIEOMICS COMPANY LIMITED. We are committed to protecting your personal data and research data in accordance with Vietnamese law (the Personal Data Protection Law No. 91/2025/QH15, Decree No. 356/2025/ND-CP and the Cybersecurity Law) and international security standards.",
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
            text: "**Vieomics (VIEOMICS COMPANY LIMITED):** the legal entity that operates the Omicslab Platform and is legally responsible for all collection, processing, storage and protection of data described in this Policy (“we”, “us”). Every commitment, obligation and liability for personal data stated below belongs to Vieomics — not to the “Omicslab” brand.",
          },
          {
            type: "p",
            text: "**Personal data:** information in the form of text, numbers, images, sound or similar forms that is attached to a specific individual or helps identify a specific individual, including both basic and sensitive personal data (under the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP).",
          },
          {
            type: "p",
            text: "**User data (data uploaded by the user):** all files, datasets and resources that you (or your organisation) actively send, connect or store on the Platform, including data held in object storage and infrastructure you integrate yourself. User data is **not necessarily personal data**: it may be pure research data (microorganisms, plants, animals, environmental samples), or it may **contain personal data belonging to other people**.",
          },
          {
            type: "p",
            text: "**Personal data that does not belong to the user themselves:** you may upload other people’s personal data — for example patient data for the laboratory, hospital or research institute you represent. In that case you are the **Data Controller** for that data and are responsible for the lawful basis of collection, consent and anonymisation; Vieomics acts solely as the **Data Processor** on your instructions (see Section 2).",
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
            text: "**Data Processor:** For research and biological data that you (or your organisation) actively upload to the Omicslab Platform, you act as the Data Controller. We act solely as the Data Processor — operating the Platform and performing computation and storage entirely in accordance with your instructions, settings and requirements.",
          },
          {
            type: "label",
            text: "Infrastructure for Storage and Processing of Bioinformatics Data Derived from Human / Patient Samples",
          },
          {
            type: "p",
            text: "Bioinformatics data files derived from human or patient samples (for example NIPT, WES, WGS, human RNA-Seq or genetic records) may be stored and analysed only on cloud infrastructure belonging to Infrastructure Partners formally designated by us, which have binding confidentiality contracts and data processing agreements (DPA) with VIEOMICS, ensuring full compliance with Vietnamese law on information security and personal data protection.",
          },
          {
            type: "label",
            text: "User-Managed Infrastructure (Bring Your Own Cloud – BYOC)",
          },
          {
            type: "p",
            text: "Where you choose to connect or integrate your own storage account or analysis servers (personal API credentials) into the Omicslab Platform, you are solely responsible for the security, access permissions and safety of the data on that infrastructure. We are released from all liability for incidents arising from your own systems.",
          },
        ],
      },
      {
        id: "collect",
        title: "2. Data We Collect & Responsibility Rules by Biological Data Type",
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
              "**Website access data:** aggregated, anonymised traffic data collected through Google Analytics on **this website (the landing page)** — the Platform itself does not use Google Analytics — to improve the user experience.",
              {
                text: "**Bioinformatics analysis data (uploaded to the system):**",
                children: [
                  "**Non-human data (microorganisms, plants, animals, environmental samples):** classified as purely technical / scientific research data. This data is not subject to the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP on personal data protection. Users are free to upload, store and run any analysis pipeline without having to apply personal privacy procedures.",
                  {
                    text: "**Human / patient data (bioinformatics data derived from human samples):** includes non-invasive prenatal testing (NIPT) results, whole exome sequencing (WES), whole genome sequencing (WGS), RNA sequencing of human samples (RNA-Seq), and patients’ genetic records and clinical genomic data. This is **sensitive personal data** under the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP. Omicslab does not manage and does not access the real identity of patients or data subjects. The following mandatory legal responsibilities apply:",
                    children: [
                      "**Anonymisation obligation:** customers undertake that every data file (FASTQ, BAM, VCF, …) uploaded is accompanied only by a technical identifier (Sample ID). Files must not contain any personally identifiable information (PII) such as full name, national ID/passport number, date of birth or medical record number in the file name, metadata or sample title.",
                      "**Patient consent:** the customer (laboratory, hospital or research institute) bears full legal responsibility for collecting lawful consent from patients/data subjects before sequencing and analysis are performed.",
                      "**Mapping key:** the key linking Sample IDs to patients’ real identities resides entirely on the customer’s own internal system (local LIMS). Omicslab accepts no legal responsibility for this mapping table.",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bases",
        title: "3. Legal Bases for Processing",
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
        title: "4. How We Use Personal Data",
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
              "Never accessing, mining or sharing research data (whether microbial, plant or animal data, or anonymised human data) for any purpose other than delivering the analysis service you request.",
            ],
          },
        ],
      },
      {
        id: "retention",
        title: "5. Data Retention",
        blocks: [
          {
            type: "ul",
            items: [
              "**Account data:** stored for as long as the account is active. After the account is closed, the account and its related data are only **deactivated** and retained for the period required by law (limitation periods, and statutory obligations to retain records, documents and invoices), so that the date on which any issue, dispute or legal incident arose can still be traced and evidenced at the request of a competent authority or the parties concerned. Once that period expires, the data is **deleted or anonymised**, under the exception already stated in Section 8.",
              "**Usage & audit data:** retained for the periods required by Vietnamese accounting, tax and cybersecurity law.",
              "**Research data (object storage):** held in the platform’s object storage service (Marketplace) on a **pay-as-you-go basis, billed in monthly cycles**, and only for the cycle you have paid for. If you no longer subscribe to any plan, or do not renew the storage cycle, workspace access is blocked, the data is retained for a **one-month grace period** and is then **removed from the workspace entirely** — only the audit log is kept for tracing purposes. You may also delete data yourself at any time on the Platform, or deletion is carried out under a signed data processing agreement (DPA).",
              "**Top-up balance (organization wallet):** prepaid credit can only be spent while your organization has a live subscription. Once the subscription lapses — expired or cancelled, with no renewal in flight — the **remaining balance is forfeited and reset to zero**, so a top-up cannot be spent without an active plan. Organizations that have never subscribed keep any balance they hold. The forfeiture sweep runs automatically every day. Payment terms, advance email notices and all deadlines are set out in Section 13 of our [Terms of Service](/terms).",
            ],
          },
        ],
      },
      {
        id: "security",
        title: "6. Data Security Measures",
        blocks: [
          {
            type: "p",
            text: "We apply strict technical and operational security standards to protect all data on our systems:",
          },
          {
            type: "ul",
            items: [
              "Encryption of all data in transit (TLS/SSL) and at rest.",
              "Least-privilege access control (RBAC), multi-factor authentication (MFA) and system audit logs.",
              "Regular security reviews and vulnerability assessments.",
              "Only assigned personnel bound by strict confidentiality obligations may access technical support information, and only upon your written request.",
            ],
          },
          {
            type: "p",
            text: "These measures are **designed toward** the GDPR (EU) and HIPAA (US) so that the platform is ready for stricter requirements in the future; as of the date of this Policy, Omicslab **holds no certification** under any of those frameworks.",
          },
          {
            type: "p",
            text: "If a personal data protection violation is detected (leakage, loss or unauthorised access to personal data), we draw up an official record and **notify the specialised personal data protection authority and the data subjects concerned within 72 hours of detection**, while activating our internal incident-response procedure. Incident records are kept for at least five years after the incident has been remediated.",
          },
          {
            type: "p",
            text: "See the full standards on our [Security & Compliance](/security) page.",
          },
        ],
      },
      {
        id: "sharing",
        title: "7. Sharing and Transfer of Data",
        blocks: [
          {
            type: "p",
            text: "Personal data is shared only in the following limited circumstances:",
          },
          {
            type: "ul",
            items: [
              "**Infrastructure service providers (processors):** providers of servers, payment gateways and similar services that have signed confidentiality and data processing agreements with us.",
              "**State authorities:** when a written request is made by a duly empowered authority through the legally prescribed procedure.",
            ],
          },
          {
            type: "p",
            text: "Your research data is never shared with third parties unless you instruct us to do so.",
          },
          {
            type: "p",
            text: "**Service providers for this website:** (i) **Cloudflare Pages** — distributes the site’s static files (we do not enable Cloudflare’s analytics services); (ii) **Google Analytics** — runs only after you accept the cookie notice in Section 10; (iii) **DMCA.com** — displays the protection badge. For the Platform, we work with Marketplace infrastructure partners and the payment gateway, all bound by data processing agreements (DPA).",
          },
        ],
      },
      {
        id: "rights",
        title: "8. Rights of Data Subjects",
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
              "The right to request deletion, restriction or objection to processing — except data that must be retained by law, or that is needed to resolve disputes or legal incidents (see Section 5).",
              "The right to request a copy of your data.",
              "The right to lodge complaints, file reports or claim compensation as permitted by law.",
            ],
          },
          {
            type: "p",
            text: "To exercise these rights, you can act directly in your account settings or [contact us](/contact). We will respond to and process your request within 72 working hours of receiving complete and valid information.",
          },
        ],
      },
      {
        id: "transfers",
        title: "9. Storage and International Data Transfers",
        blocks: [
          {
            type: "p",
            text: "Omicslab’s servers, compute infrastructure and object storage are hosted 100% in standard-compliant data centres located within Vietnam, in strict compliance with the Cybersecurity Law and Decree 53/2022/ND-CP. Where any personal data is transferred abroad, we commit to completing the impact assessment procedures required by Vietnamese law. The only exception is traffic analytics on **this website (the landing page)** — the Platform itself does not use Google Analytics: traffic data (including IP addresses) is processed by our analytics provider as a processor and is not used for advertising — see Section 10. This service **runs only after you press Accept** in the cookie notice (Section 10); if you decline, no data is transferred.",
          },
        ],
      },
      {
        id: "cookies",
        title: "10. Cookies and Identification Technologies",
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
        id: "contact",
        title: "11. Contact",
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
      "These Terms govern your use of the Omicslab Platform, a bioinformatics platform for storing, analysing and sharing biological and genomic research data.",
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
            text: "The Platform may be used to store, process and analyse **sensitive data**, including human genomic, genetic, health-related and other special-category data as defined under Vietnamese law (with the GDPR and HIPAA as additional reference frameworks the Platform designs toward). Because of the sensitivity of this data, you agree that:",
          },
          {
            type: "ul",
            items: [
              "You have obtained all required ethical approvals, informed consents and authorisations needed to process the data you upload, in accordance with applicable law and your institution’s review boards.",
              "You will not upload data collected from individuals who have not consented to its processing for bioinformatics research, except where permitted by law.",
              "You remain the data controller (or an authorised processor under your own agreements) for data you upload, and you are responsible for ensuring your use complies with all applicable data protection legislation, including the Law on Personal Data Protection (Law No. 91/2025/QH15) and, where applicable, the GDPR or HIPAA.",
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
            text: "You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorised access or suspected breach. We employ industry-standard security controls — including encryption in transit and at rest, access control and audit logging — but no system is impenetrable, and you must take reasonable steps to protect your own credentials. Details are published on our [Security & Compliance](/security) page.",
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
              "**Security:** technical and organisational measures protect personal data against unauthorised access, loss or alteration.",
              "**Your rights:** you may exercise rights of access, rectification, erasure, restriction, portability and objection — see our [Privacy Policy](/privacy) for details.",
            ],
          },
          {
            type: "p",
            text: "For research data you upload, you retain control and ownership. We act as a **processor** with respect to data you provide, and as a **controller** with respect to account and usage data needed to run the service.",
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
            text: "You may close your account at any time. We may suspend or terminate access — with or without notice — for violation of these Terms, unlawful activity, or as required by law. Upon termination, you remain responsible for obligations accrued before termination. Personal and research data are handled per our [Privacy Policy](/privacy) and any data processing agreement in effect.",
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
              "**Advance email notices:** before any action is taken we email your administrators — a reminder **7 days** before the storage cycle ends, and a notice as soon as it expires. After expiry, data is retained for a **one-month grace period** before it is cleaned up.",
              "**Workspace cleanup:** once the grace period passes, workspace data is deleted — only the audit log is kept for tracing purposes (details in Section 5 of our [Privacy Policy](/privacy)).",
              "**Top-up balance:** can only be spent while your organization has an active subscription. When the subscription expires or is cancelled with no renewal in flight, the remaining balance is forfeited and reset to zero; balance information and deadlines are also sent by email before this is applied.",
            ],
          },
        ],
      },
    ],
  },

  security: {
    kicker: "Security & Compliance",
    title: "Security & Compliance",
    navTitle: "Security & Compliance",
    description:
      "Two deployment models, the security controls we apply, and how responsibility is shared between Omicslab and the customer.",
    sections: [
      {
        id: "trust-model",
        title: "Trust Model & Security",
        blocks: [
          {
            type: "p",
            text: "Omicslab builds a trusted operating layer for scientific computing, tuned for sensitive omics and health-data workloads. We offer two flexible deployment models:",
          },
          {
            type: "ul",
            items: [
              "**Bring Your Own Infrastructure (BYO):** connect your own existing storage, version control and compute resources — keeping your data entirely under your internal control.",
              "**Platform-Managed:** deployed directly on infrastructure managed by Omicslab, with a full commitment to data-safety standards.",
            ],
          },
        ],
      },
      {
        id: "compliance",
        title: "1. Legal Compliance & Data Security",
        blocks: [
          {
            type: "p",
            text: "Omicslab’s systems are hosted in Vietnam and comply strictly with Vietnamese law on personal data protection — in particular the Personal Data Protection Law No. 91/2025/QH15 and Decree No. 356/2025/ND-CP.",
          },
          {
            type: "ul",
            items: [
              "**Storage & processing:** all data is stored and processed domestically.",
              "**Cross-border transfer:** data is transferred abroad only with your consent and in full accordance with the conditions prescribed by law.",
              "**Separation of Control & Data:** the control plane (job orchestration, credentials, quotas) is completely separate from the data plane. Data flows only between the storage endpoints and compute environments you designate.",
              "**Privacy policies:** the detailed rules on data processing are published in our [Terms of Service](/terms) and [Privacy Policy](/privacy).",
            ],
          },
        ],
      },
      {
        id: "controls",
        title: "2. Security Controls",
        blocks: [
          {
            type: "ul",
            items: [
              "**Encryption:** TLS applied consistently to data in transit and AES-256 to data at rest, across all platform-managed resources.",
              "**Access Control & Audit:** role-based access control (RBAC), strict per-workspace isolation and complete automatic audit logging of every operation that touches the data plane.",
              "**Credential Handling:** credentials used to launch jobs are encrypted and transferred securely to the execution environment. They are never shown to end users or stored in plain text.",
            ],
          },
        ],
      },
      {
        id: "responsibility",
        title: "3. Responsibility by Deployment Model",
        blocks: [
          {
            type: "p",
            text: "The level of security assurance depends on the deployment model you choose:",
          },
          {
            type: "ul",
            items: [
              "**Marketplace (highest assurance):** applies to storage and compute resources provisioned by Omicslab administrators (superusers) from strictly vetted providers. Omicslab is responsible for all security measures and compliance commitments on this infrastructure.",
              "**Bring Your Own (BYO):** when you connect your own storage and compute infrastructure, the risk and management responsibility are yours — including choosing the provider, configuring the system and setting up the corresponding safeguards.",
            ],
          },
        ],
      },
      {
        id: "more",
        title: "Learn More",
        blocks: [
          {
            type: "ul",
            items: [
              "The [Compliance](/security/compliance) page: details of our security standards, operating framework and server locations.",
              "The [Shared Responsibility](/security/responsibility) page: a detailed matrix of which party controls each security measure for each deployment model.",
            ],
          },
        ],
      },
    ],
  },
  compliance: {
    kicker: "Security & Compliance",
    title: "Compliance",
    navTitle: "Compliance",
    description:
      "Where the platform is hosted, the law it follows, and the compliance posture for the Vietnam operation.",
    sections: [
      {
        id: "hosting",
        title: "Data Hosting",
        blocks: [
          {
            type: "p",
            text: "The Omicslab Platform is hosted in **Vietnam**. Customer data — including any research, biological or genomic data uploaded to the platform — is stored and processed on infrastructure located in Vietnam and does not leave the country.",
          },
          {
            type: "p",
            text: "The platform is operated in accordance with **Vietnamese civil law** and the **Law on Personal Data Protection (Law No. 91/2025/QH15)** together with **Decree No. 356/2025/ND-CP** (which replaced Decree No. 13/2023/ND-CP), in force since 1 January 2026.",
          },
        ],
      },
      {
        id: "data-residency",
        title: "Data Residency",
        blocks: [
          {
            type: "p",
            text: "Data residency is simple: data uploaded to the platform stays in Vietnam. No data is transferred across borders, and cross-border data transfer requirements therefore do not apply to customer data.",
          },
          {
            type: "table",
            head: ["Region", "Instance", "Framework", "Data residency"],
            rows: [
              ["Vietnam", "vn.omicslab.io", "PDPL (Law 91/2025 + Decree 356/2025)", "Data stays in Vietnam"],
            ],
          },
          {
            type: "p",
            text: "Our legal posture applies to the current Vietnam operation. If the platform is expanded to operate in other jurisdictions in the future, this page will be updated to reflect the applicable law and hosting arrangements for that operation.",
          },
        ],
      },
      {
        id: "framework",
        title: "The Law We Follow",
        blocks: [
          {
            type: "p",
            text: "The platform is operated as a legal and data-processing service governed by Vietnamese law. The primary legal framework is the Law on Personal Data Protection (Law No. 91/2025/QH15) together with Decree No. 356/2025/ND-CP (which replaced Decree No. 13/2023/ND-CP), governing how personal data is collected, processed and protected in Vietnam, including consent requirements, data-subject rights and breach notifications.",
          },
        ],
      },
      {
        id: "posture",
        title: "Compliance Posture",
        blocks: [
          {
            type: "p",
            text: "We maintain our compliance posture through technical and organisational measures that implement the requirements of Vietnamese law — encryption in transit and at rest, access control, audit logging and a documented approach to handling personal data.",
          },
          {
            type: "p",
            text: "Administrative penalties for cybersecurity and personal data protection violations are set out in Decree No. 330/2026/ND-CP, in force since 19 August 2026. This posture reflects the current Vietnam operation only. Should the platform expand internationally, the compliance framework and any relevant certificates will be updated and published on this page.",
          },
          {
            type: "p",
            text: "Omicslab’s systems, controls and processes are **designed toward** the GDPR (EU) and HIPAA (US) so that the platform can serve regulated workloads in those jurisdictions in the future. As of the date of this page, Omicslab **has not been certified, audited or attested** under GDPR, HIPAA or any other international certification scheme — the statements here describe design intent and compliance with Vietnamese law only. Any certification obtained will be published on this page.",
          },
          {
            type: "p",
            text: "We do not warrant that the Platform complies with every law that may apply to your particular use. You remain responsible for determining the appropriateness of using the Platform for your workloads and for your own compliance. See the [Privacy Policy](/privacy) for the full data-protection commitments.",
          },
        ],
      },
    ],
  },

  responsibility: {
    kicker: "Security & Compliance",
    title: "Responsibility",
    navTitle: "Responsibility",
    description:
      "Security is a shared responsibility. This page sets out who owns each control in each deployment model, and what we ask of you.",
    sections: [
      {
        id: "matrix",
        title: "Shared Responsibility Matrix",
        blocks: [
          {
            type: "table",
            head: [
              "Control / Infrastructure",
              "Tier 1 (self-managed infrastructure)",
              "Tier 2 (platform-managed — Marketplace)",
            ],
            rows: [
              [
                "Data storage",
                "Your own cloud / object storage infrastructure",
                "Encrypted AES-256 storage on the platform (partitioned per workspace)",
              ],
              [
                "Version control",
                "Your own source repository (GitHub)",
                "Source repositories integrated in the Marketplace",
              ],
              [
                "Compute infrastructure",
                "Your own HPC / cloud cluster",
                "Compute infrastructure managed directly by Omicslab",
              ],
              ["Infrastructure access", "Managed by the customer", "Managed by the platform"],
              [
                "Credentials",
                "Managed by the customer",
                "Secured by the platform (never shown in plain text)",
              ],
              [
                "Infrastructure compliance",
                "Customer’s responsibility",
                "Guaranteed by the platform",
              ],
            ],
          },
          {
            type: "label",
            text: "Operational Split",
          },
          {
            type: "ul",
            items: [
              "**Tier 1:** the customer provides — and is fully responsible for — storage, source code and compute infrastructure (operated on the understanding that infrastructure risk is yours).",
              "**Tier 2:** the highest-assurance model — every resource is provisioned and managed directly by Omicslab through strictly vetted infrastructure partners.",
            ],
          },
        ],
      },
      {
        id: "platform",
        title: "1. Platform Security Commitments",
        blocks: [
          {
            type: "ul",
            items: [
              "**Architecture separation:** strict separation of the control plane from the customer’s data plane.",
              "**Least privilege:** short-lived credentials with tightly scoped access for every cross-boundary connection.",
              "**Environment isolation:** data isolated per workspace, with role-based access control (RBAC).",
              "**Audit transparency:** immutable audit logs maintained to support security review.",
              "**Vulnerability management:** security incident and misconfiguration reports are received and patched promptly.",
            ],
          },
          {
            type: "p",
            text: "**Note:** under Tier 2, these commitments extend down to the entire underlying hardware infrastructure.",
          },
        ],
      },
      {
        id: "customer",
        title: "2. Mandatory Customer Responsibilities",
        blocks: [
          {
            type: "ul",
            items: [
              "**Account security:** protect your login credentials and enforce strong authentication (MFA/2FA) across your organization.",
              "**Legal & ethical compliance:** obtain full approval from an ethics board (IRB), voluntary informed consent from data subjects and any other lawful rights required before uploading human genomic or health data.",
              "**Data access control:** classify your data and set appropriate access permissions for each workspace and storage resource.",
              "**Backup & validation:** maintain independent backups and take responsibility for validating analysis outputs under your organization’s own research data management policy.",
            ],
          },
        ],
      },
    ],
  },
};
