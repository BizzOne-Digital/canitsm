import { Link, useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import RevealChamber from "../components/RevealChamber";
import PinnedGrow from "../components/PinnedGrow";
import "./HomePage.css";

type Ctx = { introDone: boolean };

export default function HomePage() {
  const { introDone } = useOutletContext<Ctx>();

  return (
    <main>
      <Hero ready={introDone} />

      <section className="home-services-cta container">
        <p className="eyebrow">What We Do</p>
        <h2 className="display home-services-cta__title">Services built for modern Canadian business</h2>
        <p className="home-services-cta__copy">
          From 24/7 support to cloud, cybersecurity, and custom IT strategy — explore the full suite.
        </p>
        <Link className="btn" to="/services">
          Explore All Services
        </Link>
      </section>

      <RevealChamber
        ready={introDone}
        id="secure"
        variant="purple"
        content={{
          kicker: "Secure · Scale · Lead",
          lines: ["HIDDEN POWER", "UNLOCKED"],
          body: "CanITSM empowers Canadian businesses to scale securely and smartly — with modern infrastructure and proactive support.",
        }}
      />

      <PinnedGrow ready={introDone} />

      <section className="home-links container">
        <Link to="/about" className="home-link-card">
          <span className="eyebrow">About</span>
          <h3 className="display">Our story</h3>
        </Link>
        <Link to="/process" className="home-link-card">
          <span className="eyebrow">Process</span>
          <h3 className="display">How we work</h3>
        </Link>
        <Link to="/fluent-it" className="home-link-card">
          <span className="eyebrow">Fluent IT</span>
          <h3 className="display">No jargon</h3>
        </Link>
        <Link to="/contact" className="home-link-card">
          <span className="eyebrow">Contact</span>
          <h3 className="display">Let's talk</h3>
        </Link>
      </section>
    </main>
  );
}
