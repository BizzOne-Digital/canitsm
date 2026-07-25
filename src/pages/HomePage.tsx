import { useLayoutEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero";
import Services from "../components/Services";
import RevealChamber from "../components/RevealChamber";
import PinnedGrow from "../components/PinnedGrow";
import Process from "../components/Process";
import FluentIT from "../components/FluentIT";
import About from "../components/About";
import Industries from "../components/Industries";
import LandslideText from "../components/LandslideText";
import { services } from "../data/services";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { introDone: boolean };

export default function HomePage() {
  const { introDone } = useOutletContext<Ctx>();
  const stormRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const cascadeRef = useRef<HTMLElement>(null);

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
    "SCALE",
    "LEAD",
    "FLUENT",
    "IT",
    "CANADA",
    "CLOUD",
    "24/7",
    "TRUST",
    "MODERNIZE",
  ];

  const cascade = [
    {
      kicker: "01 · Listen",
      title: "We hear the business first",
      copy: "Initial consultation — goals, gaps, and the future you want to build.",
    },
    {
      kicker: "02 · Design",
      title: "Roadmaps that actually ship",
      copy: "Strategy & planning aligned to security, scale, and your bottom line.",
    },
    {
      kicker: "03 · Deploy",
      title: "Zero-drama implementation",
      copy: "Systems, cloud, and integrations with zero disruption to your team.",
    },
    {
      kicker: "04 · Support",
      title: "Always on. Always ahead.",
      copy: "Ongoing support and quarterly reviews so tech never lags the business.",
    },
  ];

  return (
    <main className="home-page">
      <Hero ready={introDone} />

      {/* Neon marquee */}
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee__track">
          <span>SECURE · SCALE · LEAD · FLUENT IT · CANITSM · 24/7 SUPPORT · </span>
          <span>SECURE · SCALE · LEAD · FLUENT IT · CANITSM · 24/7 SUPPORT · </span>
        </div>
      </div>

      <Services />

      {/* Stats slam */}
      <section className="home-stats" ref={statsRef}>
        <div className="home-orb home-orb--a" aria-hidden="true" />
        <div className="home-orb home-orb--b" aria-hidden="true" />
        <div className="container home-stats__grid">
          <article className="home-stat">
            <p className="home-stat__num display">24/7</p>
            <p className="home-stat__label">Full time support</p>
          </article>
          <article className="home-stat">
            <p className="home-stat__num display">100%</p>
            <p className="home-stat__label">Canadian team</p>
          </article>
          <article className="home-stat">
            <p className="home-stat__num display">M365</p>
            <p className="home-stat__label">Certified experts</p>
          </article>
          <article className="home-stat">
            <p className="home-stat__num display">1</p>
            <p className="home-stat__label">Point of contact</p>
          </article>
        </div>
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
            text="Pick a lane. We crash open the rest."
            mode="words"
          />
          <div className="home-strip__grid">
            {services.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                state={{ enterFrom: s.enterFrom }}
                className="home-strip__card"
              >
                <span className="home-strip__num">{s.num}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.short}</p>
                <span className="home-strip__cta">Open →</span>
              </Link>
            ))}
          </div>
          <Link className="btn home-strip__all" to="/services">
            Swipe all services
          </Link>
        </div>
      </section>

      <RevealChamber
        ready={introDone}
        id="fluent-reveal"
        variant="neon"
        content={{
          kicker: "The Fluent IT Advantage",
          lines: ["WE SPEAK IT", "YOU SPEAK", "BUSINESS"],
          body: "Stop translating technical headaches. We bridge complex infrastructure and your bottom line — no jargon, just results.",
        }}
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

      <RevealChamber
        ready={introDone}
        id="support-reveal"
        variant="split"
        content={{
          kicker: "24/7 Full Time Support",
          lines: ["ALWAYS ON", "ALWAYS AHEAD"],
          body: "From strategy to support, we're your partner in digital transformation — available worldwide when you need us.",
        }}
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
            Free IT consultation. No strings. Just strategy — modernize, secure, and scale.
          </p>
          <div className="home-finale__actions">
            <Link className="btn" to="/contact">
              Book Free Consultation
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
