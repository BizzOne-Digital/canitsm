import { Link } from "react-router-dom";
import { primaryCategories, platformsWeSupport } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";
import LandslideText from "../components/LandslideText";
import "./ServicesPage.css";
import "./ServicesHubExtras.css";

export default function ServicesPage() {
  usePageMeta(
    "IT Security, Migration & Development Services | CanITSM",
    "Explore CanITSM services for security assessments, implementation, managed security, migrations, penetration testing, DevSecOps and software development.",
  );

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <LandslideText
            className="services-hero__title display"
            text="IT Security, Migration & Development Services"
            mode="words"
          />
          <p className="services-hero__lede serif">
            CanITSM helps organizations strengthen security, migrate platforms safely, integrate
            DevSecOps into delivery, and build websites and mobile apps—across Microsoft 365, Azure,
            AWS, Google Workspace, GCP and SharePoint.
          </p>
          <Link className="btn" to="/contact">
            Book a Consultation
          </Link>
        </div>
      </section>

      <section className="svc-hub container">
        <h2 className="svc-hub__h2 display">Six service categories</h2>
        <p className="svc-hub__lede">
          Related offerings are grouped into strong category pages—so you get depth without thin,
          near-duplicate URLs.
        </p>
        <div className="svc-hub__grid">
          {primaryCategories.map((cat, i) => (
            <Link key={cat.slug} to={`/services/${cat.slug}`} className="svc-hub__card">
              <span className="svc-hub__num">0{i + 1}</span>
              <h3 className="display">{cat.title}</h3>
              <p>{cat.short}</p>
              <span className="svc-hub__cta">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="svc-hub container">
        <h2 className="svc-hub__h2 display">Platforms we work across</h2>
        <ul className="svc-hub__platforms">
          {platformsWeSupport.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="svc-hub container">
        <h2 className="svc-hub__h2 display">Engagement model</h2>
        <div className="svc-hub__process">
          <article>
            <h3>1. Discover</h3>
            <p>Clarify goals, constraints, platforms and risk so recommendations fit your reality.</p>
          </article>
          <article>
            <h3>2. Design</h3>
            <p>Map a practical roadmap—controls, migration path or delivery workflow—with clear scope.</p>
          </article>
          <article>
            <h3>3. Deliver</h3>
            <p>Implement, test and validate with documentation your team can operate and audit.</p>
          </article>
          <article>
            <h3>4. Support</h3>
            <p>Hand over cleanly or continue with managed operations where ongoing coverage is needed.</p>
          </article>
        </div>
      </section>

      <section className="services-foot container">
        <p className="eyebrow">Ready to work together?</p>
        <h2 className="display">Start with a consultation</h2>
        <p className="svc-hub__foot-copy">
          Share your priorities and we&apos;ll point you to the right security, migration, DevSecOps
          or development pathway.
        </p>
        <Link className="btn" to="/contact">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
