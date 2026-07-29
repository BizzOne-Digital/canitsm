import { useLayoutEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero";
import Services from "../components/Services";
import RevealChamber from "../components/RevealChamber";
import CrossfireLanes from "../components/CrossfireLanes";
import HorizonRush from "../components/HorizonRush";
import PinnedGrow from "../components/PinnedGrow";
import Process from "../components/Process";
import FluentIT from "../components/FluentIT";
import About from "../components/About";
import Industries from "../components/Industries";
import LandslideText from "../components/LandslideText";
import { primaryCategories } from "../data/catalog";
import { usePageMeta } from "../hooks/usePageMeta";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { introDone: boolean };

export default function HomePage() {
  const { introDone } = useOutletContext<Ctx>();
  const stormRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const cascadeRef = useRef<HTMLElement>(null);

  usePageMeta(
    "CanITSM Consulting | Security, Cloud & DevSecOps",
    "CanITSM delivers cybersecurity, cloud migration, DevSecOps and development services across Microsoft 365, Azure, AWS, Google Workspace and GCP.",
  );

  useLayoutEffect(() => {
    if (!introDone) return;

    const ctx = gsap.context(() => {
      // Infinite neon marquee
      gsap.to(".home-marquee__track", {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });

      // Stats slam in from random directions
      gsap.utils.toArray<HTMLElement>(".home-stat").forEach((el, i) => {
        const dirs = [
          { x: -160, y: 0 },
          { x: 160, y: 0 },
          { x: 0, y: 140 },
          { x: 0, y: -120 },
        ];
        const d = dirs[i % dirs.length];
        gsap.fromTo(
          el,
          { ...d, opacity: 0, rotate: gsap.utils.random(-18, 18), scale: 0.7 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      });

      // Text storm — words tumble like rocks across the viewport
      if (stormRef.current) {
        gsap.fromTo(
          ".home-storm__word",
          {
            y: () => gsap.utils.random(180, 420),
            x: () => gsap.utils.random(-100, 100),
            rotate: () => gsap.utils.random(-40, 40),
            opacity: 0,
            scale: () => gsap.utils.random(0.6, 1.3),
          },
          {
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            stagger: { each: 0.04, from: "random" },
            scrollTrigger: {
              trigger: stormRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1.2,
            },
          },
        );
      }

      // Cascade panels pin & flip through
      if (cascadeRef.current) {
        const panels = gsap.utils.toArray<HTMLElement>(".home-cascade__panel");
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 80, rotateX: -25 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cascadeRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) {
            tl.fromTo(
              panel,
              { scale: 0.85, opacity: 0.4 },
              { scale: 1, opacity: 1, duration: 0.4 },
              0,
            );
          } else {
            tl.to(panels[i - 1], { autoAlpha: 0, y: -60, rotateX: 20, duration: 0.35 }, "+=0.1");
            tl.fromTo(
              panel,
              { autoAlpha: 0, y: 100, rotateX: -30, scale: 0.9 },
              { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.45 },
              "<",
            );
          }
        });
      }

      // Float orbs on home
      gsap.to(".home-orb", {
        y: "+=40",
        x: "+=20",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      // Service strip cards fly in
      gsap.utils.toArray<HTMLElement>(".home-strip__card").forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            x: i % 2 === 0 ? -180 : 180,
            y: i % 2 === 0 ? 60 : -60,
            rotate: i % 2 === 0 ? -8 : 8,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 50%",
              scrub: 1.1,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [introDone]);

  const stormWords = [
    "SECURE",
    "MIGRATE",
    "DEVSECOPS",
    "FLUENT",
    "IT",
    "CANADA",
    "CLOUD",
    "VAPT",
    "TRUST",
    "BUILD",
  ];

  const cascade = [
    {
      kicker: "01 · Discover",
      title: "Clarify goals and risk",
      copy: "We map platforms, constraints and priorities so the right category—security, migration, testing, DevSecOps or development—is clear from day one.",
    },
    {
      kicker: "02 · Design",
      title: "Scope a practical path",
      copy: "Assessments, migrations or delivery workflows become a roadmap with defined scope, evidence and handoff expectations.",
    },
    {
      kicker: "03 · Deliver",
      title: "Implement and validate",
      copy: "Controls, cutovers and builds land with documentation your team can operate, audit and extend.",
    },
    {
      kicker: "04 · Support",
      title: "Handoff or manage",
      copy: "Clean handover—or ongoing managed security and partner support where continuous coverage is needed.",
    },
  ];

  return (
    <main className="home-page">
      <Hero ready={introDone} />

      {/* Neon marquee */}
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee__track">
          <span>SECURITY · MIGRATION · DEVSECOPS · PEN TESTING · DEVELOPMENT · CANITSM · </span>
          <span>SECURITY · MIGRATION · DEVSECOPS · PEN TESTING · DEVELOPMENT · CANITSM · </span>
        </div>
      </div>

      <Services />

      {/* Stats slam */}
      <section className="home-stats" ref={statsRef}>
        <div className="home-orb home-orb--a" aria-hidden="true" />
        <div className="home-orb home-orb--b" aria-hidden="true" />
        <div className="container home-stats__grid">
          <article className="home-stat">
            <p className="home-stat__num display">6</p>
            <p className="home-stat__label">Service categories</p>
          </article>
          <article className="home-stat">
            <p className="home-stat__num display">~80</p>
            <p className="home-stat__label">Named offerings</p>
          </article>
          <article className="home-stat">
            <p className="home-stat__num display">M365</p>
            <p className="home-stat__label">Azure · AWS · GCP</p>
          </article>
          <article className="home-stat">
            <p className="home-stat__num display">1</p>
            <p className="home-stat__label">Clear consultation path</p>
          </article>
        </div>
      </section>

      <RevealChamber
        ready={introDone}
        id="secure"
        variant="purple"
        content={{
          kicker: "Secure · Migrate · Build",
          lines: ["SECURE.", "MIGRATE.", "BUILD."],
          body: "CanITSM Consulting strengthens cybersecurity, migrates platforms safely, integrates DevSecOps into delivery, and builds websites and mobile apps—Fluent IT, not jargon.",
        }}
      />

      {/* Rock text storm */}
      <section className="home-storm" ref={stormRef}>
        <div className="container">
          <p className="eyebrow">Language of growth</p>
          <div className="home-storm__wall">
            {stormWords.map((w) => (
              <span key={w} className="home-storm__word display">
                {w}
              </span>
            ))}
          </div>
          <LandslideText
            className="home-storm__line display"
            text="We speak Fluent IT so you speak fluent business"
            mode="words"
          />
        </div>
      </section>

      <PinnedGrow ready={introDone} />

      {/* Service strip with fly-ins */}
      <section className="home-strip">
        <div className="container">
          <p className="eyebrow">Featured services</p>
          <LandslideText
            className="home-strip__title display"
            text="Six pathways. One consultation."
            mode="words"
          />
          <div className="home-strip__grid">
            {primaryCategories.map((s, i) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="home-strip__card">
                <span className="home-strip__num">0{i + 1}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.short}</p>
                <span className="home-strip__cta">Learn more →</span>
              </Link>
            ))}
          </div>
          <Link className="btn home-strip__all" to="/services">
            View all services
          </Link>
        </div>
      </section>

      <CrossfireLanes
        ready={introDone}
        id="fluent-reveal"
        kicker="The Fluent IT Advantage"
        lanes={[
          { text: "WE SPEAK IT", from: "left" },
          { text: "YOU SPEAK", from: "right" },
          { text: "BUSINESS", from: "left" },
        ]}
        body="Stop translating technical headaches. We bridge complex infrastructure and your bottom line — no jargon, just results."
      />

      {/* Cascade story panels */}
      <section className="home-cascade" ref={cascadeRef}>
        <div className="home-cascade__sticky">
          {cascade.map((c) => (
            <article className="home-cascade__panel" key={c.kicker}>
              <p className="eyebrow">{c.kicker}</p>
              <h2 className="display">{c.title}</h2>
              <p>{c.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <Process ready={introDone} />
      <FluentIT />
      <About />
      <Industries />

      <HorizonRush
        ready={introDone}
        id="support-reveal"
        kicker="Clear pathways"
        title="From assessment to build."
        panels={[
          {
            tag: "Security",
            title: "Assess, implement, manage",
            copy: "Three security lines so you can start with evidence, roll out controls, or operate day-to-day protections.",
          },
          {
            tag: "Migration",
            title: "Move platforms safely",
            copy: "Tenant, cloud and device migrations with discovery, coexistence and cutover discipline.",
          },
          {
            tag: "DevSecOps",
            title: "Ship with security built in",
            copy: "CI/CD security, AppSec and cloud/container controls integrated into delivery workflows.",
          },
          {
            tag: "Development",
            title: "Websites and mobile apps",
            copy: "Structured discovery-to-launch delivery for static, dynamic, e-commerce and Android/iOS apps.",
          },
        ]}
      />

      {/* Final CTA blast */}
      <section className="home-finale">
        <div className="home-orb home-orb--c" aria-hidden="true" />
        <div className="container home-finale__inner">
          <LandslideText
            className="home-finale__title display"
            text="Let's build something that actually works"
            mode="chars"
          />
          <p className="home-finale__copy">
            Book a consultation. Tell us your platform and goals—we&apos;ll recommend the right
            pathway and a clear next step.
          </p>
          <div className="home-finale__actions">
            <Link className="btn" to="/contact">
              Book a Consultation
            </Link>
            <Link className="btn btn-ghost" to="/about">
              Meet CanITSM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
