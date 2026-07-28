export type EnterFrom = "top" | "bottom" | "left" | "right";

export type Service = {
  slug: string;
  num: string;
  title: string;
  short: string;
  hero: string;
  description: string;
  points: string[];
  enterFrom: EnterFrom;
};

export const services: Service[] = [
  {
    slug: "it-end-user-support",
    num: "01",
    title: "IT & End-User Support",
    short:
      "24/7 help desk support with full visibility, seamless cloud migrations, and complete device lifecycle management.",
    hero: "Support that never sleeps",
    description:
      "We offer 24/7 help desk support with full visibility, seamless cloud migrations, and complete device lifecycle management from procurement to secure disposal. Your team stays productive — we handle the rest.",
    points: [
      "24/7 help desk with full ticket visibility",
      "Device lifecycle from purchase to disposal",
      "Remote & on-site end-user assistance",
      "Proactive monitoring to prevent downtime",
    ],
    enterFrom: "top",
  },
  {
    slug: "microsoft-cloud",
    num: "02",
    title: "Microsoft & Cloud Services",
    short:
      "Cloud transformation built around Microsoft 365, Azure, AWS, and Google — with migration, backup, and ongoing optimization.",
    hero: "Future in the cloud",
    description:
      "Cloud adoption that improves flexibility, resilience, and scalability. We plan and configure secure cloud infrastructure, deploy Microsoft 365, and keep environments optimized after go-live — so your business stays online and compliant.",
    points: [
      "Microsoft 365 deployment, configuration & administration",
      "Migrations: M365, AWS, Google Workspace, SharePoint, tenant-to-tenant & devices",
      "Secure cloud infrastructure setup across Azure, AWS & GCP",
      "Data storage, backup, continuity & ongoing management",
    ],
    enterFrom: "right",
  },
  {
    slug: "cybersecurity",
    num: "03",
    title: "Cybersecurity & Compliance",
    short:
      "Enterprise-grade security and compliance — assessments, implementation, managed monitoring, and threat prevention.",
    hero: "Stay protected",
    description:
      "A proactive security framework that reduces risk before incidents disrupt operations. From assessments and implementation to managed monitoring, penetration testing, and compliance support — we strengthen defenses without the jargon.",
    points: [
      "Security assessments: email, endpoints, cloud, identity & compliance readiness",
      "Implementation across Microsoft 365, AWS, Google Workspace & endpoints",
      "Managed security, threat detection, network & firewall protection",
      "Penetration testing, audits, risk assessments & regulatory compliance",
    ],
    enterFrom: "bottom",
  },
  {
    slug: "managed-it",
    num: "04",
    title: "IT Services Built for Modern Business",
    short:
      "IT solutions designed for operational performance and growth — strategy, infrastructure, continuity, and automation.",
    hero: "Modern IT. Real results.",
    description:
      "Comprehensive IT solutions designed to keep your business running smoothly. We assess your technology position, build a practical roadmap, manage infrastructure and devices, and integrate systems so teams work faster with less manual effort.",
    points: [
      "IT strategy & consultation with a practical roadmap",
      "Infrastructure setup & employee device management",
      "Business continuity planning & ongoing technical support",
      "Technology integration & automation to cut manual work",
    ],
    enterFrom: "left",
  },
  {
    slug: "vendor-management",
    num: "05",
    title: "Vendor & Software Management",
    short: "Simplify how you manage all your vendors and software with one trusted partner.",
    hero: "One point of contact",
    description:
      "We manage your third-party vendors — ISPs, software, and more — so IT complexity stops at our desk. One partner. Clear accountability.",
    points: [
      "Single point of contact for all vendors",
      "License & renewal tracking",
      "Vendor performance reviews",
      "Cost optimization recommendations",
    ],
    enterFrom: "top",
  },
  {
    slug: "it-strategy",
    num: "06",
    title: "Custom-Tailored IT Plans",
    short:
      "We don't believe in one-size-fits-all. Strategies designed specifically for your business needs.",
    hero: "Strategy that fits you",
    description:
      "Quarterly strategy reviews align tech with business goals. We create IT roadmaps that are secure, scalable, and built around how you actually work.",
    points: [
      "Custom IT roadmaps",
      "Quarterly strategy reviews",
      "Budget-aligned tech planning",
      "100% Canadian support team",
    ],
    enterFrom: "right",
  },
  {
    slug: "devsecops",
    num: "07",
    title: "DevSecOps Services",
    short:
      "Secure software delivery without slowing teams down — strategy, CI/CD security, apps, cloud, and platforms.",
    hero: "Ship fast. Stay secure.",
    description:
      "DevSecOps that protects the software lifecycle while development keeps moving. From maturity assessments and secure SDLC design to automated security gates and cloud-native controls, we embed security into how you build and run software.",
    points: [
      "Strategy & assessment: maturity, secure SDLC, threat modeling & roadmaps",
      "CI/CD security: SAST, DAST, SCA, secret & dependency scanning",
      "Application security: API/web testing & software supply-chain protection",
      "Cloud, container & platform security: Kubernetes, IaC, zero-trust & secrets",
    ],
    enterFrom: "left",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
