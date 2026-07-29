export type Offering = {
  name: string;
  blurb: string;
};

export type OfferingGroup = {
  title: string;
  offerings: Offering[];
};

export type Faq = {
  q: string;
  a: string;
};

export type ProcessStep = {
  title: string;
  copy: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  h1: string;
  short: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  kind: "pillar" | "category";
  parent?: string;
  children?: string[];
  offerings?: Offering[];
  groups?: OfferingGroup[];
  platforms?: string[];
  faqs?: Faq[];
  related?: string[];
  process?: ProcessStep[];
};

export type NavCategory = {
  slug: string;
  label: string;
  children?: { slug: string; label: string }[];
};

export const platformsWeSupport = [
  "Microsoft 365",
  "Azure",
  "AWS",
  "Google Workspace",
  "GCP",
  "SharePoint",
] as const;

export const OLD_SLUG_REDIRECTS: Record<string, string> = {
  "cyber-security": "/services/security",
  cybersecurity: "/services/security",
  cloud: "/services/security/managed",
  "devsecops-services": "/services/devsecops",
  "it-services-built-for-modern-business": "/services",
  "managed-it": "/services",
  "it-end-user-support": "/services",
  "microsoft-cloud": "/services/migration",
  "vendor-management": "/services",
  "it-strategy": "/services",
};

const sharedSecurityProcess: ProcessStep[] = [
  {
    title: "Discover & baseline",
    copy: "We inventory controls, identities, workloads and data flows so recommendations reflect how your environment actually operates—not a generic checklist.",
  },
  {
    title: "Prioritize & design",
    copy: "Findings are ranked by exposure and business impact. We propose a practical control design and rollout sequence that fits your platforms and change windows.",
  },
  {
    title: "Implement & validate",
    copy: "Controls are configured, tested and validated with clear evidence. We document decisions so your team can operate and audit what was deployed.",
  },
  {
    title: "Handover & improve",
    copy: "You receive runbooks, reporting expectations and recommended next steps—whether that is managed operations, deeper testing or a follow-on roadmap.",
  },
];

export const servicePages: ServicePage[] = [
  // ——— Security pillar ———
  {
    slug: "security",
    title: "Security Services",
    h1: "Security Services",
    short:
      "Assessment, implementation and managed security across email, data, endpoints, identity and cloud platforms—so risk reduction is measurable and operational.",
    description:
      "CanITSM security services help organizations understand exposure, deploy the right controls and keep those controls operating as environments change. We work across Microsoft 365, Azure, AWS, Google Workspace and related cloud applications—covering email, data, endpoints, identity and cloud posture. Engagements typically start with assessment and readiness work, move into targeted implementation, and can continue as managed security operations where you need ongoing ownership. Compliance frameworks such as SOC 2, GDPR, PCI DSS, HIPAA and DGSI can be addressed as readiness and control-alignment support, not as a guarantee of certification. Whether you need a focused review, a full platform hardening program or sustained management, the security pillar routes you to the right service line.",
    metaTitle: "Cybersecurity Services & Solutions | CanITSM Consulting",
    metaDescription:
      "Explore CanITSM security assessment, implementation and managed service options for email, data, endpoints, identity, cloud applications and cloud platforms.",
    kind: "pillar",
    children: [
      "security/assessments",
      "security/implementation",
      "security/managed",
    ],
    platforms: [...platformsWeSupport],
    related: ["migration", "penetration-testing", "devsecops", "microsoft-partner"],
    process: sharedSecurityProcess,
    faqs: [
      {
        q: "How do assessment, implementation and managed security differ?",
        a: "Assessments establish baseline risk and priorities. Implementation designs and deploys controls. Managed security operates and improves those controls over time with agreed reporting and escalation paths.",
      },
      {
        q: "Which platforms do you cover?",
        a: "We commonly work across Microsoft 365, Azure, AWS, Google Workspace, GCP and SharePoint, plus the identity, endpoint and SaaS controls connected to those environments.",
      },
      {
        q: "Do you guarantee compliance certification?",
        a: "No. We support compliance readiness and control alignment for frameworks such as SOC 2, GDPR, PCI DSS, HIPAA and DGSI. Formal certification remains with your auditor or assessor.",
      },
      {
        q: "Where should we start if we are unsure of our posture?",
        a: "Most organizations begin with Security Assessment Services to identify gaps, then move into implementation for priority controls and managed services where sustained ownership is needed.",
      },
    ],
  },

  {
    slug: "security/assessments",
    title: "Security Assessment Services",
    h1: "Security Assessment Services",
    short:
      "Structured reviews of email, data, endpoints, identity, cloud apps, Partner Center posture, compliance readiness and license utilization.",
    description:
      "Security assessments give leadership and technical teams a clear picture of control coverage, misconfigurations and residual risk before budget is spent on tools or projects. CanITSM evaluates how email, data, endpoints, identities and cloud applications are protected in your environment, then translates findings into prioritized recommendations with practical remediation paths. We also review Microsoft Partner Center security posture where relevant, assess license utilization against security capability, and support compliance readiness checks against frameworks such as SOC 2, GDPR, PCI DSS, HIPAA and DGSI. Deliverables focus on evidence, risk ranking and next-step sequencing so implementation work is scoped accurately and stakeholders share a common understanding of exposure.",
    metaTitle: "Security Assessment Services | CanITSM Consulting",
    metaDescription:
      "Evaluate email, data, endpoint, identity and cloud application security, compliance readiness, Microsoft Partner Center controls and license utilization.",
    kind: "category",
    parent: "security",
    platforms: [...platformsWeSupport],
    related: ["security/implementation", "security/managed", "penetration-testing", "microsoft-partner"],
    process: sharedSecurityProcess,
    offerings: [
      {
        name: "Email Security Assessment",
        blurb:
          "Review mail flow protections, phishing resilience, authentication policies and mailbox security controls to identify gaps that attackers commonly exploit. Findings highlight configuration weaknesses and prioritized hardening actions for Microsoft 365 or Google Workspace.",
      },
      {
        name: "Data Security Assessment",
        blurb:
          "Evaluate how sensitive data is classified, accessed, shared and retained across cloud and collaboration platforms. We identify oversharing, weak DLP coverage and storage risks so data-protection projects start from evidence, not assumptions.",
      },
      {
        name: "Endpoint Security Assessment",
        blurb:
          "Assess device posture, baseline hardening, patch currency and endpoint protection coverage across managed and unmanaged endpoints. Recommendations focus on reducing ransomware and credential-theft exposure where users actually work.",
      },
      {
        name: "Cloud App Security Assessment",
        blurb:
          "Map sanctioned and shadow SaaS usage, review conditional access and session controls, and identify risky app permissions. The result is a clearer picture of cloud-app blast radius and practical control improvements.",
      },
      {
        name: "Identity Security Assessment",
        blurb:
          "Examine identity providers, MFA coverage, privileged access paths, federation and lifecycle hygiene. We surface privilege sprawl and authentication gaps that often enable lateral movement after a single compromised account.",
      },
      {
        name: "Microsoft Partner Center Assessment",
        blurb:
          "Review Partner Center security configuration, access roles and operational practices that protect partner and customer tenants. Assessments highlight control gaps relevant to partner-centered environments without implying partner status claims.",
      },
      {
        name: "Compliance Readiness Check",
        blurb:
          "Map current controls and evidence against readiness expectations for frameworks such as SOC 2, GDPR, PCI DSS, HIPAA, DGSI and related requirements. We clarify gaps and documentation needs so audit preparation is structured—not a last-minute scramble.",
      },
      {
        name: "License Optimization Assessment",
        blurb:
          "Compare licensed security capabilities against what is actually enabled and used. We identify unused entitlements, overlapping tools and high-value features you already own but have not activated.",
      },
    ],
    faqs: [
      {
        q: "What do we receive at the end of an assessment?",
        a: "Typically a findings summary, risk-ranked issues, evidence notes and a recommended remediation sequence that can feed implementation or managed-security scoping.",
      },
      {
        q: "How invasive are assessments?",
        a: "Most work is configuration and evidence review with agreed access. We define scope, data handling and change boundaries before any hands-on validation begins.",
      },
      {
        q: "Can assessments cover multiple platforms at once?",
        a: "Yes. Hybrid scopes across Microsoft 365, Google Workspace, AWS, Azure and endpoints are common when identity and data flows span more than one platform.",
      },
      {
        q: "Is a compliance readiness check the same as an audit?",
        a: "No. It is readiness and gap analysis support. Independent auditors or assessors remain responsible for formal attestation or certification.",
      },
    ],
  },

  {
    slug: "security/implementation",
    title: "Security Implementation Services",
    h1: "Security Implementation Services",
    short:
      "Design and deploy security controls across email, data, identity, endpoints, EDR, compliance readiness and full Microsoft 365, AWS or Google Workspace programs.",
    description:
      "Security implementation turns assessment findings into working controls with clear ownership and validation. CanITSM designs and configures protections for email, data, cloud applications, identity and endpoints, including EDR deployment and log-monitoring foundations where required. We also deliver platform-wide security builds for Microsoft 365, AWS and Google Workspace, and support compliance-readiness implementations that strengthen control evidence without claiming certification outcomes. Engagements emphasize staged rollout, testing, documentation and knowledge transfer so your team can operate what we deploy. Whether you need a single control domain or a complete environment hardening program, implementation work is scoped to reduce risk while respecting change windows and business continuity.",
    metaTitle: "Security Implementation Services | CanITSM Consulting",
    metaDescription:
      "Implement controls across email, data, endpoints, identities and cloud apps, including EDR, compliance readiness, Microsoft 365, AWS and Google Workspace.",
    kind: "category",
    parent: "security",
    platforms: [...platformsWeSupport],
    related: ["security/assessments", "security/managed", "migration", "devsecops"],
    process: sharedSecurityProcess,
    offerings: [
      {
        name: "Email Security Implementation",
        blurb:
          "Configure anti-phishing, spoofing protections, secure mail transport and mailbox policies aligned to your identity and collaboration stack. Rollouts are staged to reduce false positives while closing common inbound and outbound attack paths.",
      },
      {
        name: "Data Security Implementation",
        blurb:
          "Deploy classification, DLP, retention and sharing controls that match how teams collaborate. We implement practical policies first, then tighten based on monitoring feedback so protection does not block legitimate work.",
      },
      {
        name: "Cloud App Security Implementation",
        blurb:
          "Enable discovery, conditional access, app governance and session controls for sanctioned SaaS. Implementations focus on high-risk apps and permissions that create the largest blast radius when credentials are abused.",
      },
      {
        name: "Identity Security Implementation",
        blurb:
          "Strengthen authentication, privileged access, lifecycle automation and federation settings. We implement identity controls that reduce account takeover risk while preserving workable admin and user workflows.",
      },
      {
        name: "Endpoint Security Implementation",
        blurb:
          "Deploy endpoint protection baselines, hardening policies and management integrations across your device estate. Configurations are validated for coverage gaps so unprotected endpoints do not undermine cloud and identity controls.",
      },
      {
        name: "EDR Implementation & Log Monitoring",
        blurb:
          "Stand up endpoint detection and response with log collection, retention and alerting foundations. We define signal quality, escalation paths and evidence capture so detections are actionable rather than noisy.",
      },
      {
        name: "Compliance Readiness Implementations",
        blurb:
          "Implement control and evidence improvements aligned to readiness goals for frameworks such as SOC 2, GDPR, PCI DSS, HIPAA and DGSI. Work focuses on durable control operation and documentation your auditors can review.",
      },
      {
        name: "Complete Microsoft 365 Security Implementation",
        blurb:
          "Deliver a coordinated Microsoft 365 security build spanning identity, email, endpoints, data and cloud-app controls. The program sequences dependencies so tenant hardening is coherent rather than a pile of disconnected settings.",
      },
      {
        name: "Complete AWS Security Implementation",
        blurb:
          "Implement foundational AWS security controls across accounts, identity, logging, network boundaries and workload protections. Designs emphasize least privilege, visibility and repeatable guardrails for growth.",
      },
      {
        name: "Complete Google Workspace Security Implementation",
        blurb:
          "Configure Google Workspace security across identity, mail, sharing, devices and admin controls. Implementations prioritize phishing resistance, data-sharing risk and consistent policy enforcement for distributed teams.",
      },
    ],
    faqs: [
      {
        q: "Do you implement before assessing?",
        a: "We can, when priorities are already clear. Most organizations benefit from a short assessment first so implementation effort targets the highest-risk gaps.",
      },
      {
        q: "Will users experience disruption during rollout?",
        a: "We plan staged enablement, pilot groups and rollback criteria for controls that affect authentication, mail or sharing. Change communication is part of the delivery plan.",
      },
      {
        q: "What documentation do we receive?",
        a: "Configuration summaries, decision logs, operational notes and recommended monitoring checks so your team—or a managed engagement—can sustain the controls.",
      },
      {
        q: "Can implementation feed into managed security?",
        a: "Yes. Many clients move from implementation into managed operations for email, identity, endpoints or full platform management once baselines are stable.",
      },
    ],
  },

  {
    slug: "security/managed",
    title: "Managed Security Services",
    h1: "Managed Security Services",
    short:
      "Ongoing management of email, data, endpoint, identity, cloud-app and platform security for Microsoft 365, AWS and Google Workspace environments.",
    description:
      "Managed security services keep controls current as users, apps and threats change. CanITSM provides ongoing management for email, data, endpoints, identity, cloud applications and broader cloud security, including complete managed offerings for Microsoft 365, AWS and Google Workspace. Engagements define operating boundaries, reporting cadence, escalation paths and change ownership so your team knows what is covered and what remains in-house. The focus is sustained risk reduction—policy drift correction, access hygiene, monitoring follow-through and continuous improvement—not generic help-desk ticket volume. Managed services are a strong fit after assessment and implementation when you need consistent ownership without building every security specialty internally.",
    metaTitle: "Managed Security Services | CanITSM Consulting",
    metaDescription:
      "Manage email, data, endpoint, identity, cloud application and cloud security with ongoing services for Microsoft 365, AWS and Google Workspace environments.",
    kind: "category",
    parent: "security",
    platforms: [...platformsWeSupport],
    related: ["security/assessments", "security/implementation", "migration", "penetration-testing"],
    process: [
      {
        title: "Scope & operating model",
        copy: "We agree coverage domains, access methods, change windows, reporting and escalation so managed work has clear boundaries from day one.",
      },
      {
        title: "Baseline & onboard",
        copy: "Existing controls and tooling are baselined, gaps are noted and operational runbooks are aligned to your platforms and stakeholders.",
      },
      {
        title: "Operate & report",
        copy: "Ongoing management focuses on policy health, access hygiene, monitoring follow-through and prioritized improvements with regular status reporting.",
      },
      {
        title: "Review & evolve",
        copy: "Periodic reviews adjust scope as environments grow—new apps, tenants, compliance needs or deeper testing—so managed security stays relevant.",
      },
    ],
    offerings: [
      {
        name: "Email Security Management",
        blurb:
          "Continuously tune mail protections, investigate suspicious patterns and keep authentication and anti-phishing policies healthy as campaigns evolve. Management reduces drift that quietly reopens inbound risk after initial hardening.",
      },
      {
        name: "Data Security Management",
        blurb:
          "Operate classification, DLP and sharing controls with ongoing exception handling and policy refinement. We help keep data-protection rules aligned to how collaboration actually changes over time.",
      },
      {
        name: "Endpoint Security Management",
        blurb:
          "Maintain endpoint protection coverage, hardening baselines and remediation follow-through across your device fleet. Management focuses on closing coverage gaps before they become incident entry points.",
      },
      {
        name: "Cloud App Security Management",
        blurb:
          "Monitor SaaS risk signals, review app permissions and keep conditional access and session policies current. Ongoing management limits shadow-IT exposure without blocking approved business tools.",
      },
      {
        name: "Identity Security Management",
        blurb:
          "Operate identity hygiene covering MFA enforcement, privileged access reviews, lifecycle changes and federation health. Consistent identity management reduces the most common path to account takeover.",
      },
      {
        name: "Cloud Security Management",
        blurb:
          "Provide ongoing cloud posture management across accounts, logging, network controls and configuration drift. The goal is durable visibility and guardrails as teams provision new workloads.",
      },
      {
        name: "Complete Microsoft 365 Managed Services",
        blurb:
          "Operate Microsoft 365 security as an integrated service spanning identity, email, data, endpoints and admin governance. Reporting and change management keep the tenant coherent as users and apps grow.",
      },
      {
        name: "Complete AWS Managed Services",
        blurb:
          "Manage AWS security foundations—identity, logging, guardrails and posture improvements—with clear ownership of operational tasks. Suitable when cloud teams need sustained security follow-through beyond project delivery.",
      },
      {
        name: "Complete Google Workspace Managed Services",
        blurb:
          "Provide ongoing Google Workspace security operations across identity, mail, sharing and device-related controls. Management keeps policies consistent for distributed workforces after initial implementation.",
      },
    ],
    faqs: [
      {
        q: "Is managed security the same as a help desk?",
        a: "No. These services focus on security control operation, posture and risk reduction across platforms—not general end-user IT support.",
      },
      {
        q: "Do you offer 24/7 guarantees?",
        a: "Coverage windows and response expectations are defined per engagement. We do not publish blanket 24/7 guarantees; operating hours and escalation are agreed in scope.",
      },
      {
        q: "What reporting should we expect?",
        a: "Typically status on control health, notable changes, open risks and recommended improvements on an agreed cadence, with escalation for high-priority issues.",
      },
      {
        q: "Can we start with one domain and expand later?",
        a: "Yes. Many clients begin with email or identity management and expand to full Microsoft 365, AWS or Google Workspace managed coverage as needs mature.",
      },
    ],
  },

  // ——— Migration ———
  {
    slug: "migration",
    title: "Migration Services",
    h1: "Migration Services",
    short:
      "Plan and execute Microsoft 365, GCP, Azure, AWS, SharePoint, device and security migrations—including tenant consolidation and tenant-to-tenant moves.",
    description:
      "Cloud and collaboration migrations succeed when discovery, dependency mapping and security follow-through are treated as first-class work—not afterthoughts. CanITSM plans and executes Microsoft 365 tenant moves and consolidations, GCP-to-M365 transitions, Azure-to-AWS migrations, SharePoint content moves, device migrations and security migrations across tenants and environments. Engagements cover coexistence strategy, cutover planning, validation and post-migration hardening so users land in a usable environment and control gaps are not inherited. Whether you are consolidating after acquisition, changing platforms or relocating workloads, migration services emphasize data integrity, identity continuity and a clean security baseline on the destination.",
    metaTitle: "Microsoft 365 & Cloud Migration Services | CanITSM",
    metaDescription:
      "Plan and execute Microsoft 365, GCP, AWS, Azure, SharePoint, device and tenant migrations, including consolidation and security implementation transfers.",
    kind: "category",
    platforms: [...platformsWeSupport],
    related: ["security", "security/implementation", "microsoft-partner", "development"],
    process: [
      {
        title: "Discover & map",
        copy: "We inventory identities, mailboxes, data stores, apps, devices and security dependencies so migration scope reflects real coupling—not just platform labels.",
      },
      {
        title: "Design & sequence",
        copy: "Coexistence, cutover waves, rollback criteria and security baseline requirements are designed before mass moves begin.",
      },
      {
        title: "Migrate & validate",
        copy: "Content and workloads move in controlled batches with integrity checks, access validation and issue triage through cutover.",
      },
      {
        title: "Harden & handover",
        copy: "Destination controls are confirmed, residual tasks documented and your team receives operational notes for the new environment.",
      },
    ],
    offerings: [
      {
        name: "M365 to M365 Migration",
        blurb:
          "Move users, mailboxes, OneDrive and collaboration workloads between Microsoft 365 environments with structured waves and validation. Planning covers identity mapping, coexistence and post-cutover usability so productivity is preserved.",
      },
      {
        name: "GCP to M365 Migration",
        blurb:
          "Transition from Google Cloud Platform workloads or Google-centric estates toward Microsoft 365 collaboration and related services with clear scope boundaries. We map data, identities and access patterns so the destination is operationally ready.",
      },
      {
        name: "M365 Tenant Consolidation",
        blurb:
          "Unify multiple Microsoft 365 tenants after mergers, acquisitions or historical sprawl. Consolidation work addresses identity collisions, shared data, branding and security baselines so the surviving tenant is governable.",
      },
      {
        name: "Azure to AWS Migration",
        blurb:
          "Plan and execute workload moves from Azure to AWS with dependency analysis, network and identity considerations, and cutover validation. Security and logging expectations on AWS are addressed as part of landing-zone readiness.",
      },
      {
        name: "Security Migrations across tenants and environments",
        blurb:
          "Transfer and re-establish security configurations, policies and control ownership when moving between tenants or platforms. The goal is to avoid inheriting weak baselines or orphaned exceptions after cutover.",
      },
      {
        name: "SharePoint Migration",
        blurb:
          "Migrate SharePoint sites, libraries and permissions with attention to information architecture, sharing links and broken dependency risk. Validation confirms content fidelity and access outcomes for business owners.",
      },
      {
        name: "M365 Tenant-to-Tenant Migration",
        blurb:
          "Execute tenant-to-tenant Microsoft 365 moves covering mail, files, teams collaboration and identity cutover sequencing. Detailed wave planning reduces surprise access loss during the switch.",
      },
      {
        name: "Device Migration",
        blurb:
          "Move endpoints into the target management and identity model with enrollment, policy and data considerations defined upfront. Device waves are coordinated with user communication so day-one productivity holds.",
      },
    ],
    faqs: [
      {
        q: "How do you reduce migration downtime?",
        a: "Through discovery-led wave planning, coexistence where needed, pilot cutovers and clear rollback criteria. Exact downtime depends on workload type and business constraints agreed in scope.",
      },
      {
        q: "Do migrations include security hardening?",
        a: "Security migration and destination baselines are part of our approach. Deep platform hardening can also be paired with Security Implementation Services.",
      },
      {
        q: "Can you consolidate tenants after an acquisition?",
        a: "Yes. M365 tenant consolidation and tenant-to-tenant migrations are designed for those scenarios, including identity and data collision planning.",
      },
      {
        q: "Which platforms are in scope?",
        a: "Common scopes include Microsoft 365, SharePoint, GCP, Azure, AWS and device estates connected to those environments.",
      },
    ],
  },

  // ——— Penetration testing ———
  {
    slug: "penetration-testing",
    title: "Penetration Testing Services",
    h1: "Penetration Testing Services",
    short:
      "Authorized testing across network, cloud, web, mobile, internal and external infrastructure—plus VAPT and compliance-based engagements.",
    description:
      "Penetration testing helps you find exploitable weaknesses before adversaries do—under clear authorization and rules of engagement. CanITSM delivers network and cloud testing, web and mobile application testing, internal and external infrastructure assessments, combined VAPT engagements and compliance-based penetration testing scoped to your regulatory or contractual needs. Work begins with agreed targets, timing and communication paths, then proceeds through controlled testing, evidence capture and prioritized reporting with remediation guidance. Retesting can validate fixes after engineering work. These services complement security assessments and DevSecOps practices by providing an adversarial view of how controls hold up under realistic attack techniques.",
    metaTitle: "Penetration Testing & VAPT Services | CanITSM",
    metaDescription:
      "Identify exploitable weaknesses through network, cloud, web, mobile, internal and external testing, VAPT and compliance-based penetration testing.",
    kind: "category",
    platforms: ["Microsoft 365", "Azure", "AWS", "GCP", "Google Workspace"],
    related: ["security/assessments", "security/implementation", "devsecops", "security"],
    process: [
      {
        title: "Authorize & scope",
        copy: "Targets, rules of engagement, timing, data handling and emergency contacts are documented before any testing begins.",
      },
      {
        title: "Test & evidence",
        copy: "Controlled testing exercises attack paths relevant to the agreed scope, capturing reproducible evidence without unnecessary disruption.",
      },
      {
        title: "Report & prioritize",
        copy: "Findings are ranked by exploitability and business impact, with clear reproduction notes and remediation guidance for engineering teams.",
      },
      {
        title: "Remediate & retest",
        copy: "After fixes, optional retesting validates closures and confirms residual risk so leadership can track real progress.",
      },
    ],
    offerings: [
      {
        name: "Network & Cloud Testing",
        blurb:
          "Probe network boundaries and cloud-exposed surfaces for misconfigurations, weak segmentation and reachable services that enable intrusion. Findings help prioritize hardening across hybrid and cloud estates.",
      },
      {
        name: "Web Application Testing",
        blurb:
          "Test web applications for authentication flaws, injection, access-control failures and business-logic abuse. Reports map issues to practical remediation for developers and platform owners.",
      },
      {
        name: "Mobile Application Testing",
        blurb:
          "Assess Android and iOS applications for insecure storage, weak transport protections, API abuse and client-side control failures. Testing aligns to how mobile clients actually authenticate and exchange data.",
      },
      {
        name: "Internal Infrastructure Testing",
        blurb:
          "Simulate an attacker already inside the network to evaluate lateral movement, privilege escalation and internal service exposure. Results highlight where segmentation and identity controls need reinforcement.",
      },
      {
        name: "External Infrastructure Testing",
        blurb:
          "Evaluate internet-facing hosts, services and configurations from an outside attacker perspective. Engagements identify exposed management interfaces, weak services and perimeter gaps worth immediate attention.",
      },
      {
        name: "VAPT (Vulnerability Assessment & Penetration Testing)",
        blurb:
          "Combine broad vulnerability discovery with hands-on exploitation attempts against agreed targets. VAPT delivers both coverage and depth so teams see what is present and what is practically exploitable.",
      },
      {
        name: "Compliance-Based Penetration Testing",
        blurb:
          "Structure testing and evidence to support compliance-driven requirements and readiness programs. Scope and reporting align to the frameworks or contractual testing expectations you specify—without claiming certification outcomes.",
      },
    ],
    faqs: [
      {
        q: "Will testing disrupt production?",
        a: "Rules of engagement define safe techniques, timing and stop conditions. High-risk actions are controlled and communicated so business impact stays within agreed limits.",
      },
      {
        q: "How is this different from a vulnerability scan?",
        a: "Scans list potential issues; penetration testing validates exploitability and attack paths. VAPT engagements intentionally combine both for broader coverage.",
      },
      {
        q: "Do you provide remediation support?",
        a: "Reports include remediation guidance. Implementation and DevSecOps teams can help close findings; retesting confirms fixes.",
      },
      {
        q: "Can testing support compliance programs?",
        a: "Yes, as compliance-based penetration testing and readiness evidence support. Formal certification remains with your auditor or assessor.",
      },
    ],
  },

  // ——— DevSecOps ———
  {
    slug: "devsecops",
    title: "DevSecOps Services",
    h1: "DevSecOps Services",
    short:
      "Embed security across strategy, CI/CD, AppSec, cloud/containers and platform hardening—so delivery teams ship with controls built in.",
    description:
      "DevSecOps at CanITSM integrates security into how software is designed, built, released and operated—without treating security as a late-stage gate that only rejects releases. We help teams assess maturity, design secure SDLC practices, implement CI/CD security tooling, strengthen application security and harden cloud, container and platform foundations. Offerings are organized into five groups covering strategy and assessment, CI/CD security implementation, application security, cloud and container security, and infrastructure and platform security. Engagements focus on practical pipelines, clear ownership and measurable control coverage so engineering velocity and risk reduction can coexist. Whether you need a roadmap, automated gates or deeper AppSec enablement, DevSecOps services connect tooling to process.",
    metaTitle: "DevSecOps & Application Security Services | CanITSM",
    metaDescription:
      "Integrate security across the software lifecycle with secure CI/CD, AppSec, cloud and container security, infrastructure hardening and continuous monitoring.",
    kind: "category",
    platforms: ["Azure", "AWS", "GCP", "Microsoft 365"],
    related: ["penetration-testing", "security/implementation", "development", "security"],
    process: [
      {
        title: "Assess maturity",
        copy: "We evaluate current SDLC, pipeline and platform practices to identify gaps, ownership issues and quick wins versus structural changes.",
      },
      {
        title: "Design the control path",
        copy: "Threat modeling, secure SDLC design and KPI definition shape which checks belong in CI/CD versus deeper manual AppSec work.",
      },
      {
        title: "Implement & automate",
        copy: "SAST, DAST, SCA, secret scanning, IaC and image checks are integrated with gates and workflows your teams can sustain.",
      },
      {
        title: "Enable & improve",
        copy: "Secure coding enablement, runbooks and continuous monitoring keep controls effective as architectures and release cadence evolve.",
      },
    ],
    groups: [
      {
        title: "Strategy & Assessment",
        offerings: [
          {
            name: "Maturity Assessment & Gap Analysis",
            blurb:
              "Benchmark current DevSecOps practices against delivery goals and risk tolerance. Gaps are ranked so investment targets process, tooling and skills in the right order.",
          },
          {
            name: "Secure SDLC Framework Design",
            blurb:
              "Define security activities across requirements, design, build, test and release with clear owners and exit criteria. The framework becomes a shared operating model for product and security teams.",
          },
          {
            name: "Threat Modeling & Compliance Alignment",
            blurb:
              "Identify abuse paths early and map controls to readiness expectations for relevant frameworks. Alignment stays practical—supporting evidence needs without claiming certification.",
          },
          {
            name: "Security Roadmap & KPI Definition",
            blurb:
              "Translate findings into a sequenced roadmap with measurable indicators such as coverage, mean time to remediate and gate effectiveness. Leadership gets progress metrics that reflect real risk reduction.",
          },
        ],
      },
      {
        title: "CI/CD Security Implementation",
        offerings: [
          {
            name: "Secure Pipeline Architecture",
            blurb:
              "Design pipeline stages, trust boundaries and artifact promotion paths that resist tampering. Architecture work ensures security checks are enforced where builds and releases actually happen.",
          },
          {
            name: "SAST Integration",
            blurb:
              "Embed static application security testing into developer workflows and CI with actionable severity handling. Integration emphasizes signal quality so teams fix real issues instead of drowning in noise.",
          },
          {
            name: "DAST Integration",
            blurb:
              "Add dynamic testing against running applications in controlled environments. DAST complements SAST by catching runtime and configuration issues that static analysis alone misses.",
          },
          {
            name: "SCA Integration",
            blurb:
              "Introduce software composition analysis to track vulnerable and outdated dependencies. Policies help teams remediate high-risk libraries before they reach production.",
          },
          {
            name: "Secret Scanning",
            blurb:
              "Detect credentials and keys in repositories and pipelines before they leak. Scanning is paired with remediation patterns and secret-store adoption so findings do not simply recur.",
          },
          {
            name: "Dependency Scanning",
            blurb:
              "Continuously evaluate third-party packages and transitive risk in the build graph. Teams gain visibility into supply-chain exposure tied to what they actually ship.",
          },
          {
            name: "Automated Security Gates",
            blurb:
              "Define and enforce pipeline gates that block or warn on agreed risk thresholds. Gates are tuned with engineering leaders so security policy is consistent without becoming a rubber stamp or a roadblock.",
          },
        ],
      },
      {
        title: "Application Security (AppSec)",
        offerings: [
          {
            name: "Secure Code Review",
            blurb:
              "Review critical application paths for design and implementation flaws that scanners miss. Reviews focus on authentication, authorization, data handling and high-value business logic.",
          },
          {
            name: "API Security Testing",
            blurb:
              "Test APIs for broken authentication, excessive data exposure, abuse of business flows and weak rate or access controls. Results guide both remediation and gateway policy improvements.",
          },
          {
            name: "Web Application Security Testing",
            blurb:
              "Assess web apps for common and contextual vulnerabilities with developer-ready remediation notes. Testing can complement broader penetration-testing programs when deeper AppSec focus is needed.",
          },
          {
            name: "Software Supply Chain Protection",
            blurb:
              "Strengthen how source, dependencies, build systems and artifacts are trusted and verified. Controls reduce the chance that compromised packages or pipelines become your incident.",
          },
          {
            name: "Secure Coding Enablement",
            blurb:
              "Equip developers with practical secure-coding patterns, review checklists and tooling habits. Enablement turns one-off findings into lasting engineering capability.",
          },
        ],
      },
      {
        title: "Cloud & Container Security",
        offerings: [
          {
            name: "Cloud Security Posture Management",
            blurb:
              "Establish continuous visibility into cloud misconfigurations and drift across accounts and projects. Posture management helps teams fix systemic issues rather than one-off tickets.",
          },
          {
            name: "Kubernetes Hardening",
            blurb:
              "Harden cluster configurations, RBAC, network policies and admission controls for Kubernetes environments. Work prioritizes realistic attack paths against cluster and workload boundaries.",
          },
          {
            name: "Container Hardening",
            blurb:
              "Improve base images, runtime privileges and container configuration baselines. Hardening reduces the impact of a compromised container in shared environments.",
          },
          {
            name: "Infrastructure-as-Code (IaC) Scanning",
            blurb:
              "Scan Terraform, templates and related IaC for insecure defaults before infrastructure is provisioned. Findings shift cloud risk left into the same review cycle as application code.",
          },
          {
            name: "Image Scanning",
            blurb:
              "Inspect container images for vulnerabilities and risky packages prior to deployment. Scanning integrates with registries and pipelines so unsafe images are caught early.",
          },
          {
            name: "Runtime Protection",
            blurb:
              "Introduce runtime detection and response patterns for workloads that need visibility after deployment. Runtime controls complement build-time checks when threats appear only in production behavior.",
          },
        ],
      },
      {
        title: "Infrastructure & Platform Security",
        offerings: [
          {
            name: "Infrastructure Hardening",
            blurb:
              "Apply secure baselines to servers, network services and platform components that support delivery. Hardening closes common remote-access and service-exposure gaps beneath the application layer.",
          },
          {
            name: "IAM Implementation",
            blurb:
              "Implement least-privilege identity and access management for people, services and automation. Strong IAM is foundational for both cloud operations and secure CI/CD.",
          },
          {
            name: "Zero Trust Implementation",
            blurb:
              "Design and implement zero-trust access patterns that verify identity, device and context before granting resource access. Implementations are scoped to practical phases rather than all-or-nothing rewrites.",
          },
          {
            name: "Secrets Management",
            blurb:
              "Deploy and operationalize secret stores, rotation patterns and application integration. Teams move away from hardcoded credentials toward managed, auditable secret usage.",
          },
          {
            name: "Continuous Vulnerability Monitoring",
            blurb:
              "Establish ongoing monitoring of vulnerabilities across infrastructure, images and dependencies with triage workflows. Continuous visibility keeps backlog prioritization aligned to exploitable risk.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Will DevSecOps slow our releases?",
        a: "Done well, it moves security earlier and automates checks so late surprises decrease. Gates are tuned with engineering leaders to balance risk and delivery speed.",
      },
      {
        q: "Do we need all five groups at once?",
        a: "No. Many teams start with maturity assessment and CI/CD foundations, then expand into AppSec or cloud/container hardening based on roadmap priorities.",
      },
      {
        q: "How does this relate to penetration testing?",
        a: "DevSecOps reduces recurring classes of defects in the pipeline; penetration testing validates residual exploitable risk. They reinforce each other.",
      },
      {
        q: "Which clouds and platforms do you support?",
        a: "Common engagements span Azure, AWS and GCP, with adjacent Microsoft 365 identity or platform integrations where delivery depends on them.",
      },
    ],
  },

  // ——— Microsoft Partner ———
  {
    slug: "microsoft-partner",
    title: "Microsoft Partner Services",
    h1: "Microsoft Partner Services",
    short:
      "Assessments, readiness guidance, compliance support and vulnerability review for Partner Center and partner-focused Microsoft environments.",
    description:
      "Organizations working in Microsoft partner ecosystems need strong controls around Partner Center access, customer-tenant trust boundaries and readiness evidence. CanITSM provides Microsoft Partner Center security assessments, readiness guidance, compliance support and vulnerability assessment for partner-centered environments, plus assistance for organizations seeking Microsoft Partner status. These services clarify security and process gaps; they do not invent or imply partner designations, certifications or program outcomes that have not been independently earned. Engagements are practical—reviewing access roles, operational practices, evidence readiness and exposure in environments that touch partner workflows—so teams can strengthen posture and prepare documentation with clear next steps.",
    metaTitle: "Microsoft Partner Security & Compliance | CanITSM",
    metaDescription:
      "Strengthen Microsoft Partner Center security, readiness and compliance with assessments, guidance and vulnerability support for partner-focused environments.",
    kind: "category",
    platforms: ["Microsoft 365", "Azure", "SharePoint"],
    related: ["security/assessments", "security/implementation", "migration", "penetration-testing"],
    process: [
      {
        title: "Clarify goals",
        copy: "We confirm whether the priority is Partner Center hardening, readiness documentation, compliance evidence support or vulnerability review—and what success looks like for your team.",
      },
      {
        title: "Assess & evidence",
        copy: "Access models, configurations and operating practices are reviewed against agreed criteria, with findings tied to evidence you can reuse in readiness work.",
      },
      {
        title: "Guide remediation",
        copy: "Recommendations cover control changes, process improvements and documentation gaps without overstating partner-program outcomes.",
      },
      {
        title: "Validate & next steps",
        copy: "Follow-up review confirms progress and outlines optional deeper security, migration or testing work where partner environments overlap broader Microsoft estates.",
      },
    ],
    offerings: [
      {
        name: "Microsoft Partner Center Security Assessments",
        blurb:
          "Review Partner Center security configuration, administrative roles and operational practices that protect partner and customer relationships. Assessments surface access and control gaps before they become trust incidents.",
      },
      {
        name: "Microsoft Partner Readiness Guidance",
        blurb:
          "Provide structured guidance on security and operational readiness topics relevant to partner journeys. Guidance clarifies gaps and preparation steps without claiming program approval or partner status on your behalf.",
      },
      {
        name: "Microsoft Partner Compliance Support",
        blurb:
          "Support evidence gathering and control alignment work related to partner compliance expectations. We help organize readiness artifacts; formal determinations remain with Microsoft or your assessors as applicable.",
      },
      {
        name: "Assistance for Organizations Seeking Microsoft Partner Status",
        blurb:
          "Help organizations prepare security, process and documentation foundations as they pursue partner pathways. Assistance is advisory and preparatory—it does not guarantee acceptance or designation outcomes.",
      },
      {
        name: "Vulnerability Assessment for Partner-Centered Environments",
        blurb:
          "Identify weaknesses in environments that support partner operations, customer engagement or Partner Center-adjacent infrastructure. Findings prioritize issues that could undermine partner trust boundaries.",
      },
    ],
    faqs: [
      {
        q: "Are you claiming Microsoft Partner status for CanITSM or for us?",
        a: "No unsupported partner-status claims are made. Services focus on assessments, readiness guidance and security support; program outcomes depend on Microsoft and your own submissions.",
      },
      {
        q: "Who is this for?",
        a: "IT and security teams operating Partner Center, serving customer tenants through partner workflows, or preparing partner-related security and compliance evidence.",
      },
      {
        q: "How does this relate to general Microsoft 365 security?",
        a: "Partner services focus on partner-centered controls and readiness. Broader tenant hardening is available through Security Assessment and Implementation services.",
      },
      {
        q: "Can vulnerability work include penetration testing?",
        a: "Partner-centered vulnerability assessment can be paired with broader Penetration Testing Services when deeper adversarial validation is required.",
      },
    ],
  },

  // ——— Development pillar ———
  {
    slug: "development",
    title: "Development Services",
    h1: "Development Services",
    short:
      "Website and mobile application development with structured discovery, build, testing and handover—aligned to business and security expectations.",
    description:
      "CanITSM development services cover websites and mobile applications with a delivery approach that respects clarity of requirements, quality of build and readiness for launch. The development pillar links to dedicated website and mobile offerings so stakeholders can explore static, dynamic and e-commerce web projects as well as Android and iOS application development. Work typically includes discovery, UX and technical design, implementation, testing and handover documentation. Where projects intersect with authentication, APIs or cloud platforms, we align with security and DevSecOps practices so new digital products do not introduce avoidable risk. Choose the child service that matches your product surface—web or mobile—and engage for a scoped delivery plan.",
    metaTitle: "Website & Mobile App Development Services | CanITSM",
    metaDescription:
      "Explore CanITSM website and mobile application development services, including static, dynamic and e-commerce websites plus Android and iOS applications.",
    kind: "pillar",
    children: ["development/websites", "development/mobile-apps"],
    platforms: ["Microsoft 365", "Azure", "AWS", "GCP"],
    related: ["devsecops", "security", "migration", "penetration-testing"],
    process: [
      {
        title: "Discover & define",
        copy: "We clarify audiences, goals, integrations, content needs and success criteria so scope is shared before design and build accelerate.",
      },
      {
        title: "Design & plan",
        copy: "Information architecture, UX flows and technical approach are defined with milestones that make progress and change control visible.",
      },
      {
        title: "Build & test",
        copy: "Implementation proceeds in reviewable increments with functional testing and fixes before launch readiness is declared.",
      },
      {
        title: "Launch & handover",
        copy: "Release preparation, documentation and optional post-launch support help your team operate and iterate after go-live.",
      },
    ],
    faqs: [
      {
        q: "Do you only build marketing sites?",
        a: "No. Website work spans static, dynamic and e-commerce projects. Mobile covers Android and iOS application development.",
      },
      {
        q: "Can security be part of development?",
        a: "Yes. Projects can align with DevSecOps practices, secure coding habits and testing where APIs, auth or sensitive data are involved.",
      },
      {
        q: "How do website and mobile pages differ?",
        a: "Each child page details channel-specific offerings, process nuances and FAQs. The pillar page is the overview and routing point.",
      },
      {
        q: "What do you need to start?",
        a: "Business goals, target users, known integrations, content readiness and any compliance or branding constraints help us scope accurately.",
      },
    ],
  },

  {
    slug: "development/websites",
    title: "Website Development",
    h1: "Website Development Services",
    short:
      "Static, dynamic and e-commerce websites delivered through discovery, design, development, testing and structured launch.",
    description:
      "Website development at CanITSM covers static sites, dynamic web applications and e-commerce experiences with a structured path from discovery to launch. We clarify business goals, content models, integrations and non-functional needs—performance, accessibility expectations and security basics—before build work begins. Delivery includes design alignment, implementation, testing and handover so your team can manage content and operations after go-live. Whether you need a focused marketing presence, a data-driven web application or an online storefront, offerings are scoped to the interaction model you require rather than a one-size template. Related DevSecOps and security services can be engaged when authentication, payments or sensitive data elevate risk.",
    metaTitle: "Website Development Services | CanITSM Consulting",
    metaDescription:
      "Build static, dynamic and e-commerce websites with a structured discovery, design, development, testing and launch process aligned to business requirements.",
    kind: "category",
    parent: "development",
    platforms: ["Azure", "AWS", "GCP"],
    related: ["development/mobile-apps", "devsecops", "security", "development"],
    process: [
      {
        title: "Discover & define",
        copy: "Goals, audiences, sitemap, integrations and success metrics are captured so design and development decisions stay grounded.",
      },
      {
        title: "Design & content model",
        copy: "Layouts, components and content structures are agreed early enough to reduce rework during build.",
      },
      {
        title: "Develop & test",
        copy: "Front-end and back-end work proceeds with reviews, functional testing and fixes against the agreed acceptance criteria.",
      },
      {
        title: "Launch & handover",
        copy: "Deployment, smoke checks and operational documentation complete the release so your team can maintain the site confidently.",
      },
    ],
    offerings: [
      {
        name: "Static Website Development",
        blurb:
          "Build fast, maintainable static websites for marketing, brochure and content-led experiences. Ideal when you need clear messaging, strong performance and straightforward publishing without heavy server-side complexity.",
      },
      {
        name: "Dynamic Website Development",
        blurb:
          "Deliver data-driven websites and web applications with interactive features, integrations and managed content workflows. Dynamic builds suit portals, service experiences and sites that change with user or business data.",
      },
      {
        name: "E-commerce Website Development",
        blurb:
          "Implement online storefronts with catalog, checkout and operational flows aligned to your commercial model. Scope covers the customer journey and the admin realities of running products, orders and content after launch.",
      },
    ],
    faqs: [
      {
        q: "How do I choose static vs dynamic vs e-commerce?",
        a: "Static fits content-led sites; dynamic fits interactive or data-driven experiences; e-commerce is for selling products or services online with catalog and checkout needs.",
      },
      {
        q: "Do you handle hosting?",
        a: "Hosting and platform choices are part of technical planning. Exact hosting ownership depends on the engagement scope and your preferred cloud or provider.",
      },
      {
        q: "Can you redesign an existing site?",
        a: "Yes. Discovery includes current-state review, content migration needs and phased cutover planning where required.",
      },
      {
        q: "How is security handled for storefronts and logins?",
        a: "Auth, payments and personal data raise the bar. We align secure development practices and can involve DevSecOps or testing services for higher-risk scopes.",
      },
    ],
  },

  {
    slug: "development/mobile-apps",
    title: "Mobile Application Development",
    h1: "Mobile Application Development Services",
    short:
      "Android and iOS application development from discovery and UX through build, testing, release preparation and post-launch support.",
    description:
      "Mobile application development at CanITSM covers Android and iOS products with disciplined discovery, UX, implementation, testing and release preparation. We help clarify user journeys, platform requirements, API dependencies and store-release considerations before engineering accelerates. Delivery emphasizes usable interfaces, stable builds and test coverage appropriate to the risk of the app—especially where authentication or sensitive data is involved. Post-launch support can be scoped for fixes and iteration after initial release. Pair mobile builds with API security testing or DevSecOps practices when backends and pipelines are part of the same product surface.",
    metaTitle: "Mobile App Development Services | CanITSM Consulting",
    metaDescription:
      "Plan and build Android and iOS applications through structured discovery, UX, development, testing, release preparation and post-launch support.",
    kind: "category",
    parent: "development",
    platforms: ["Azure", "AWS", "GCP"],
    related: ["development/websites", "devsecops", "penetration-testing", "development"],
    process: [
      {
        title: "Discover & UX",
        copy: "User journeys, platform constraints and API needs are defined so UX and technical design solve the right problems.",
      },
      {
        title: "Build increments",
        copy: "Features are implemented in reviewable increments with stakeholder feedback before release candidates harden.",
      },
      {
        title: "Test & harden",
        copy: "Functional testing, device coverage and security-minded checks reduce launch risk for authentication and data flows.",
      },
      {
        title: "Release & support",
        copy: "Store preparation, release notes and optional post-launch support help you ship and iterate with clear ownership.",
      },
    ],
    offerings: [
      {
        name: "Android Application Development",
        blurb:
          "Design and build Android applications aligned to your product goals, device targets and backend integrations. Delivery covers UX implementation, testing and release preparation for Google Play workflows as scoped.",
      },
      {
        name: "iOS Application Development",
        blurb:
          "Plan and develop iOS applications with attention to Apple platform patterns, performance and App Store release readiness. Engagements include structured testing and handover so your team can maintain the product after launch.",
      },
    ],
    faqs: [
      {
        q: "Do you build native apps only?",
        a: "Android and iOS offerings are the named catalog services. Technical approach for a given product is confirmed during discovery based on requirements and constraints.",
      },
      {
        q: "Can you work with an existing API backend?",
        a: "Yes. Integration discovery and contract clarity are part of scoping so mobile clients and backends stay aligned.",
      },
      {
        q: "Do you submit to app stores?",
        a: "Release preparation is included in the delivery model. Store account ownership and final submission responsibilities are defined per engagement.",
      },
      {
        q: "Should mobile apps include security testing?",
        a: "Apps that handle auth or sensitive data benefit from Mobile Application Testing and related DevSecOps practices alongside development.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return servicePages.find((p) => p.slug === normalized);
}

/** Six top-level items for the services hub and primary nav. */
export const primaryCategories: ServicePage[] = [
  "security",
  "migration",
  "penetration-testing",
  "devsecops",
  "microsoft-partner",
  "development",
].map((slug) => {
  const page = getServicePage(slug);
  if (!page) throw new Error(`Missing primary category: ${slug}`);
  return page;
});

/** Mega-menu structure with nested children for pillars. */
export const navCategories: NavCategory[] = [
  {
    slug: "security",
    label: "Security Services",
    children: [
      { slug: "security/assessments", label: "Assessments" },
      { slug: "security/implementation", label: "Implementation" },
      { slug: "security/managed", label: "Managed Security" },
    ],
  },
  {
    slug: "migration",
    label: "Migration Services",
  },
  {
    slug: "penetration-testing",
    label: "Penetration Testing Services",
  },
  {
    slug: "devsecops",
    label: "DevSecOps Services",
  },
  {
    slug: "microsoft-partner",
    label: "Microsoft Partner Services",
  },
  {
    slug: "development",
    label: "Development Services",
    children: [
      { slug: "development/websites", label: "Websites" },
      { slug: "development/mobile-apps", label: "Mobile Apps" },
    ],
  },
];
