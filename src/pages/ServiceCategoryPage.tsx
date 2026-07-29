import { Link, Navigate, useLocation } from "react-router-dom";
import {
  getServicePage,
  platformsWeSupport,
  OLD_SLUG_REDIRECTS,
  type ServicePage,
} from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";
import "./ServiceCategoryPage.css";

function Breadcrumbs({ page }: { page: ServicePage }) {
  const crumbs: { to: string; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
  ];
  if (page.parent) {
    const parent = getServicePage(page.parent);
    if (parent) {
      crumbs.push({ to: `/services/${parent.slug}`, label: parent.title });
    }
  }
  crumbs.push({ to: `/services/${page.slug}`, label: page.title });

  return (
    <nav className="svc-cat__crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={c.to}>
          {i > 0 && <span className="svc-cat__crumb-sep">/</span>}
          {i === crumbs.length - 1 ? (
            <span aria-current="page">{c.label}</span>
          ) : (
            <Link to={c.to}>{c.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function ServiceCategoryPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/services\/?/, "").replace(/\/$/, "");
  const redirect = OLD_SLUG_REDIRECTS[slug];
  const page = redirect ? undefined : getServicePage(slug);

  usePageMeta(
    page?.metaTitle ?? "Services | CanITSM Consulting",
    page?.metaDescription ??
      "Explore CanITSM services for security, migration, penetration testing, DevSecOps and development.",
  );

  if (redirect) return <Navigate to={redirect} replace />;
  if (!page) return <Navigate to="/services" replace />;

  const childPages = (page.children ?? [])
    .map((s) => getServicePage(s))
    .filter(Boolean) as ServicePage[];

  const related = (page.related ?? [])
    .map((s) => getServicePage(s))
    .filter(Boolean) as ServicePage[];

  const platforms = page.platforms?.length ? page.platforms : [...platformsWeSupport];

  return (
    <main className="svc-cat">
      <section className="svc-cat__hero">
        <div className="container">
          <Breadcrumbs page={page} />
          <p className="eyebrow">{page.kind === "pillar" ? "Service pillar" : "Service category"}</p>
          <h1 className="svc-cat__h1 display">{page.h1}</h1>
          <p className="svc-cat__lede">{page.description}</p>
          <div className="svc-cat__hero-actions">
            <Link className="btn" to="/contact">
              Book a Consultation
            </Link>
            <Link className="btn btn-ghost" to="/services">
              All services
            </Link>
          </div>
        </div>
      </section>

      {childPages.length > 0 && (
        <section className="svc-cat__section container">
          <h2 className="svc-cat__h2 display">Explore this practice area</h2>
          <div className="svc-cat__child-grid">
            {childPages.map((child) => (
              <Link key={child.slug} to={`/services/${child.slug}`} className="svc-cat__card">
                <h3>{child.title}</h3>
                <p>{child.short}</p>
                <span>View details →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {page.offerings && page.offerings.length > 0 && (
        <section className="svc-cat__section container">
          <h2 className="svc-cat__h2 display">Named offerings</h2>
          <p className="svc-cat__section-lede">
            Each item below is a scoped engagement option within this category—not a separate thin
            URL.
          </p>
          <div className="svc-cat__offer-grid">
            {page.offerings.map((o) => (
              <article key={o.name} className="svc-cat__offer">
                <h3>{o.name}</h3>
                <p>{o.blurb}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {page.groups && page.groups.length > 0 && (
        <section className="svc-cat__section container">
          <h2 className="svc-cat__h2 display">Service groups</h2>
          {page.groups.map((g) => (
            <div key={g.title} className="svc-cat__group">
              <h3 className="svc-cat__group-title">{g.title}</h3>
              <div className="svc-cat__offer-grid">
                {g.offerings.map((o) => (
                  <article key={o.name} className="svc-cat__offer">
                    <h4>{o.name}</h4>
                    <p>{o.blurb}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {page.process && page.process.length > 0 && (
        <section className="svc-cat__section container">
          <h2 className="svc-cat__h2 display">How we deliver</h2>
          <div className="svc-cat__process">
            {page.process.map((step, i) => (
              <article key={step.title} className="svc-cat__step">
                <span>0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="svc-cat__section container">
        <h2 className="svc-cat__h2 display">Platforms we work across</h2>
        <ul className="svc-cat__platforms">
          {platforms.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {page.faqs && page.faqs.length > 0 && (
        <section className="svc-cat__section container">
          <h2 className="svc-cat__h2 display">FAQs</h2>
          <div className="svc-cat__faqs">
            {page.faqs.map((f) => (
              <details key={f.q} className="svc-cat__faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="svc-cat__section container">
          <h2 className="svc-cat__h2 display">Related services</h2>
          <div className="svc-cat__child-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`/services/${r.slug}`} className="svc-cat__card">
                <h3>{r.title}</h3>
                <p>{r.short}</p>
                <span>Learn more →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="svc-cat__cta container">
        <p className="eyebrow">Next step</p>
        <h2 className="display">Ready to scope this engagement?</h2>
        <p>
          Tell us about your environment and priorities—we&apos;ll recommend the right pathway across
          security, migration, DevSecOps or development.
        </p>
        <Link className="btn" to="/contact">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
