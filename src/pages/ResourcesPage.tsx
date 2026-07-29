import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import "./PageShell.css";
import "./ResourcesPage.css";

const guides = [
  {
    title: "Security assessment readiness checklist",
    category: "Cybersecurity",
    blurb:
      "What evidence, access and stakeholders to prepare before an email, identity or cloud security assessment.",
    to: "/services/security/assessments",
  },
  {
    title: "Planning a Microsoft 365 tenant migration",
    category: "Migration",
    blurb:
      "Discovery, coexistence and cutover considerations for tenant-to-tenant and consolidation projects.",
    to: "/services/migration",
  },
  {
    title: "Where DevSecOps fits in your delivery pipeline",
    category: "DevSecOps",
    blurb:
      "A practical view of SAST, DAST, secret scanning and automated gates without slowing release cadence.",
    to: "/services/devsecops",
  },
  {
    title: "Penetration testing: rules of engagement basics",
    category: "Penetration Testing",
    blurb:
      "Authorization, scope boundaries, reporting expectations and how remediation guidance should land.",
    to: "/services/penetration-testing",
  },
];

export default function ResourcesPage() {
  usePageMeta(
    "Cybersecurity, Cloud & DevSecOps Resources | CanITSM",
    "Read practical CanITSM articles and guides on cybersecurity, cloud migration, Microsoft 365, AWS, Google Workspace, DevSecOps and application development.",
  );

  return (
    <main className="page-shell resources-page">
      <section className="page-shell__hero container">
        <p className="eyebrow">Resources</p>
        <h1 className="page-shell__title display">Cybersecurity, Cloud & DevSecOps Resources</h1>
        <p className="page-shell__lede">
          Practical guides that support buying decisions and project readiness. Each resource links
          to the related service pathway—so you can move from reading to scoping quickly.
        </p>
      </section>

      <section className="container resources__grid">
        {guides.map((g) => (
          <article key={g.title} className="resources__card">
            <span className="resources__cat">{g.category}</span>
            <h2>{g.title}</h2>
            <p>{g.blurb}</p>
            <Link to={g.to}>Related service →</Link>
          </article>
        ))}
      </section>

      <section className="page-shell__cta container">
        <Link className="btn" to="/contact">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
