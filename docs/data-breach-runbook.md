# Personal Data Breach Runbook

Internal procedure for Omicslab / **VIEOMICS COMPANY LIMITED** when a personal
data protection incident is detected. This runbook backs the 72-hour commitment
published in the Privacy Policy (§6 Data Security Measures).

Legal basis: **Law No. 91/2025/QH15 (PDPL), Article 23** and **Decree No.
356/2025/ND-CP** (notification content, Article 28 and related provisions);
sanctions under **Decree No. 330/2026/ND-CP**.

> Owner: [DPO / data protection contact — name + email, to be filled]
> Review cadence: every 6 months, or after any incident.

---

## 1. What counts as an incident

Trigger this runbook when any of the following is confirmed **or reasonably
suspected**:

- leakage, loss or destruction of personal data (including research datasets
  that contain patient/human genomic data);
- unauthorised access, disclosure or transfer of personal data;
- ransomware, account takeover, exposed storage bucket/credentials, misconfigured
  workspace permissions, lost laptop/phone with access to production systems;
- a processor (hosting partner, payment gateway, analytics vendor, support tool)
  reports an incident affecting our data.

Non-personal outages (site down, job failures with no data exposure) do **not**
trigger the legal notification duty, but are still logged.

## 2. Roles

| Role | Responsibility |
|---|---|
| Incident commander | Owns the timeline, decides on containment, signs off notifications |
| Technical lead | Forensics, containment, evidence capture |
| DPO / legal | Drafts notifications, liaises with the authority and data subjects |
| Comms | Single spokesperson; no statements outside the approved notice |

In a small team one person may hold several roles — the **72-hour clock does not
pause** because someone is unavailable.

## 3. Timeline (T0 = detection)

| When | Action |
|---|---|
| **T0** | Detect/verify. Record *when* and *how* the incident was discovered, who found it. Start the incident log. |
| **T0 + 4 h** | Contain: revoke credentials, close the exposure, snapshot logs **without destroying evidence**. |
| **T0 + 24 h** | Scope: which data types (identifiable / sensitive / biometric), how many data subjects, what time period, which systems and processors are involved. |
| **T0 + 48 h** | Draft the notification in the statutory content set (§5 below); DPO/legal review; incident commander approves. |
| **T0 + 72 h** | **Deadline:** notify the specialised personal data protection authority **and** the affected data subjects. Sending one minute late is a violation in itself. |
| **T0 + 7 d** | Remediation plan, root cause, hardening actions with owners and dates. |
| **T0 + 5 y** | Keep the incident record at least **5 years from the day remediation is complete**. |

If full scoping is impossible within 72 hours, **notify on time with the facts
you have** and supplement afterwards — do not use incomplete scoping as a reason
to miss the deadline.

## 4. Evidence to collect

- incident log with timestamps and actors (immutable copy);
- affected tables/buckets/exports, queries, access logs, auth logs;
- screenshots/exported logs stored in the restricted incident folder;
- the *biên bản* (official record) confirming the violation, signed by the
  incident commander.

## 5. Notification content (Decree 356/2025)

Both notifications must, as a minimum, contain:

1. nature of the violation — time, place, act, actors involved;
2. categories of personal data affected (identifiable / sensitive / biometric)
   and the number of records;
3. number of data subjects affected;
4. likely consequences and harm to the data subjects;
5. measures taken or proposed to mitigate and remediate;
6. contact point of the notifier.

**Authority:** the specialised personal data protection authority under the
Ministry of Public Security (Cục An ninh mạng và phòng, chống tội phạm sử dụng
công nghệ cao — **A05**) — channel: [dpo email / portal — to be filled].

**Data subjects:** direct notice (email) to affected users, in plain language,
in Vietnamese, with what to do next (password reset, monitoring, contact).

## 6. Related obligations this runbook depends on

- **DPO / data protection unit** appointed and published in the Privacy Policy
  §11 — required to run this process.
- **DPIA / cross-border transfer dossiers** filed with the authority (within
  **60 days** of starting processing / cross-border transfer, using the Decree
  356 templates).
- **Consent records** retained and producible on request (site analytics,
  optional communications).
- **Processor contracts (DPA)** in place with hosting, payment and analytics
  vendors so their own notification duties flow to us.

## 7. Post-incident checklist

- [ ] Contained and root cause identified
- [ ] `biên bản` signed and archived
- [ ] Authority notified (≤72 h) with proof of sending
- [ ] Data subjects notified (≤72 h) where required
- [ ] Remediation actions tracked to completion
- [ ] Incident record filed for ≥5 years
- [ ] Privacy policy / compliance page updated if the incident changes our posture
- [ ] Post-mortem held, lessons added to this runbook
