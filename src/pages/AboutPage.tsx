import About from "../components/About";
import Industries from "../components/Industries";
import { Link } from "react-router-dom";
import "./PageShell.css";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-shell__hero container">
        <p className="eyebrow">About</p>
        <h1 className="page-shell__title display">Your growth partner in IT</h1>
        <p className="page-shell__lede">
          CanITSM describes itself as more than an IT provider — we partner with Canadian
          organizations to build secure, modern infrastructure that supports growth and leadership.
        </p>
      </section>

      <About />
      <Industries />

      <section className="page-shell__cta container">
        <p className="eyebrow">Next step</p>
        <h2 className="page-shell__title display" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          Build a technology environment that actually works
        </h2>
        <p className="page-shell__lede" style={{ marginBottom: "1.5rem" }}>
          Let&apos;s shape the stack your business needs — then keep it secure, scalable, and clear.
        </p>
        <Link className="btn" to="/contact">
          Book Free Consultation
        </Link>
      </section>
    </main>
  );
}
