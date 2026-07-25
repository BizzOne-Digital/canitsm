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
      "Expert Microsoft 365 implementation and support, seamless cloud migrations, and reliable backup and business continuity.",
    hero: "Cloud built for growth",
    description:
      "We provide expert Microsoft 365 implementation and support, seamless cloud migrations, and reliable backup and business continuity solutions so your business stays online and compliant.",
    points: [
      "Microsoft 365 setup & administration",
      "Zero-downtime cloud migrations",
      "Backup & business continuity",
      "Identity & access management",
    ],
    enterFrom: "right",
  },
  {
    slug: "cybersecurity",
    num: "03",
    title: "Cybersecurity & Compliance",
    short:
      "We secure devices, manage passwords, and train employees to ensure strong cybersecurity and regulatory compliance.",
    hero: "Security without the jargon",
    description:
      "MDM secures and manages all company devices centrally. Password management and security training ensure safe access. We keep you compliant and protected around the clock.",
    points: [
      "MDM for all company devices",
      "Password management & MFA",
      "Employee security awareness training",
      "Compliance-ready controls (PIPEDA & more)",
    ],
    enterFrom: "bottom",
  },
  {
    slug: "managed-it",
    num: "04",
    title: "IT Services Built for Modern Business",
    short:
      "We'll assess your current environment and show you how to modernize, secure, and scale your technology.",
    hero: "Modern IT. Real results.",
    description:
      "Comprehensive IT solutions designed to keep your business running smoothly. From infrastructure management to responsive end-user support, we ensure reliability, efficiency, and round-the-clock assistance.",
    points: [
      "IT strategy & consultation",
      "Infrastructure setup & device management",
      "Business continuity & disaster recovery",
      "Technology integration & automation",
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
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
