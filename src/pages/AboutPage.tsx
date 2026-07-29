import About from "../components/About";
import Industries from "../components/Industries";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import "./PageShell.css";

export default function AboutPage() {
  usePageMeta(
    "About CanITSM Consulting | Security & IT Experts",
    "Learn about CanITSM Consulting, its security- and development-focused service model, supported platforms and approach to secure modernization.",
  );

  return (
    <main className="page-shell">
      <section className="page-shell__hero container">
        <p className="eyebrow">About</p>
        <h1 className="page-shell__title display">Security-led. Delivery-aware.</h1>
        <p className="page-shell__lede">
          CanITSM Consulting helps organizations strengthen cybersecurity, migrate platforms,
          integrate DevSecOps, and build websites and mobile applications—with clear communication
          and scoped engagements.
        </p>
      </section>

      <About />
      <Industries />

      <section className="page-shell__cta container">
        <p className="eyebrow">Next step</p>
        <h2 className="page-shell__title display" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          Talk through the right pathway
        </h2>
        <p className="page-shell__lede" style={{ marginBottom: "1.5rem" }}>
          Whether you need assessments, migrations, testing, DevSecOps or development—we&apos;ll
          help you choose the category that fits.
        </p>
        <Link className="btn" to="/contact">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
