import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroTerrain from "./HeroTerrain";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  ready: boolean;
};

const BRAND_CAN = "CAN".split("");
const BRAND_ITSM = "ITSM".split("");
const HEADLINES = [
  "Secure your stack.",
  "Migrate with confidence.",
  "Build and ship safer.",
];
const ORBIT_DOTS = Array.from({ length: 12 }, (_, i) => i);
const SPARKS = Array.from({ length: 24 }, (_, i) => i);

export default function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (!ready) {
      gsap.set(
        [
          ".hero__content",
          ".hero__mesh",
          ".hero__scroll",
          ".hero__aurora",
          ".hero__constellation",
          ".hero__orbit",
          ".hero__sparks",
          ".hero__rail",
        ],
        { opacity: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const content = root.querySelector<HTMLElement>(".hero__content");
      const mesh = root.querySelector<HTMLElement>(".hero__mesh");
      const scrollHint = root.querySelector<HTMLElement>(".hero__scroll");
      const meshInner = root.querySelector<HTMLElement>(".hero__mesh-inner");

      gsap.set(".hero__letter", {
        yPercent: 130,
        rotateX: -85,
        opacity: 0,
        filter: "blur(12px)",
      });
      gsap.set(".hero__line-inner", { yPercent: 110 });
      gsap.set(".hero__lede", { y: 40, opacity: 0 });
      gsap.set(".hero__eyebrow", { y: 24, opacity: 0, letterSpacing: "0.6em" });
      gsap.set(".hero__cta-row .btn", { y: 36, opacity: 0, scale: 0.92 });
      gsap.set(".hero__brand-glow", { scale: 0.4, opacity: 0 });
      gsap.set(".hero__orbit-ring", { scale: 0.5, opacity: 0, rotate: -40 });
      gsap.set(".hero__spark", { scale: 0, opacity: 0 });
      gsap.set(content, { opacity: 1, y: 0 });
      gsap.set(mesh, { y: 160, opacity: 0 });
      gsap.set(scrollHint, { opacity: 0, y: 20 });
      gsap.set(".hero__aurora", { opacity: 0, scale: 0.85 });
      gsap.set(".hero__constellation", { opacity: 0 });
      gsap.set(".hero__rail", { opacity: 0, x: -20 });
      gsap.set(".hero__sparks", { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.08,
      });

      // Atmosphere rises
      tl.to(".hero__aurora", {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      })
        .to(".hero__constellation", { opacity: 1, duration: 1 }, "-=1")
        .to(".hero__rail", { opacity: 1, x: 0, duration: 0.8 }, "-=0.8")

        // Orbit rings bloom behind brand
        .to(
          ".hero__orbit-ring",
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.15,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.9",
        )
        .to(
          ".hero__brand-glow",
          { scale: 1.2, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.85",
        )

        // Eyebrow
        .to(
          ".hero__eyebrow",
          {
            y: 0,
            opacity: 1,
            letterSpacing: "0.28em",
            duration: 0.75,
          },
          "-=0.55",
        )

        // Brand letters cascade / slam
        .to(
          ".hero__letter",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.055,
            ease: "back.out(1.85)",
          },
          "-=0.35",
        )
        .fromTo(
          ".hero__brand",
          { scale: 1.08 },
          { scale: 1, duration: 0.55, ease: "power2.out" },
          "-=0.35",
        )
        // Micro glitch shake
        .to(".hero__brand", {
          x: 6,
          duration: 0.05,
          yoyo: true,
          repeat: 5,
          ease: "none",
        })
        .to(".hero__brand", { x: 0, duration: 0.08 })

        // Sparks burst
        .to(
          ".hero__spark",
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: { each: 0.02, from: "center" },
            ease: "power2.out",
          },
          "-=0.55",
        )
        .to(
          ".hero__spark",
          {
            x: () => gsap.utils.random(-160, 160),
            y: () => gsap.utils.random(-100, 100),
            opacity: 0,
            scale: 0,
            duration: 0.9,
            stagger: 0.015,
            ease: "power2.out",
          },
          "-=0.15",
        )

        // Headline lines wipe up
        .to(
          ".hero__line-inner",
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power4.out",
          },
          "-=0.7",
        )
        .to(
          ".hero__lede",
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.45",
        )
        .to(
          ".hero__cta-row .btn",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.4",
        )

        // Terrain rises from below
        .to(
          mesh,
          { y: 0, opacity: 1, duration: 1.7, ease: "power3.out" },
          "-=0.85",
        )
        .to(scrollHint, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");

      // Continuous motion loops
      tl.add(() => {
        gsap.to(".hero__orbit-ring--0", {
          rotate: 360,
          duration: 28,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".hero__orbit-ring--1", {
          rotate: -360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".hero__orbit-ring--2", {
          rotate: 360,
          duration: 36,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".hero__aurora-blob--a", {
          xPercent: 12,
          yPercent: -8,
          scale: 1.15,
          duration: 7,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".hero__aurora-blob--b", {
          xPercent: -14,
          yPercent: 10,
          scale: 1.2,
          duration: 8.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".hero__aurora-blob--c", {
          xPercent: 8,
          yPercent: 12,
          scale: 0.9,
          duration: 6.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        gsap.to(".hero__node", {
          opacity: 0.25,
          scale: 0.7,
          duration: 1.6,
          stagger: { each: 0.12, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });

        if (meshInner) {
          gsap.to(meshInner, {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        gsap.to(content, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero__orbit", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    const spotlight = root.querySelector<HTMLElement>(".hero__spotlight");
    const onMove = (e: MouseEvent) => {
      if (!spotlight) return;
      const rect = root.getBoundingClientRect();
      gsap.to(spotlight, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    root.addEventListener("mousemove", onMove);

    return () => {
      root.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, [ready]);

  return (
    <section
      className={`hero ${ready ? "hero--ready" : "hero--waiting"}`}
      id="top"
      ref={ref}
    >
      <div className="hero__plane" aria-hidden="true" />
      <div className="hero__spotlight" aria-hidden="true" />

      <div className="hero__aurora" aria-hidden="true">
        <span className="hero__aurora-blob hero__aurora-blob--a" />
        <span className="hero__aurora-blob hero__aurora-blob--b" />
        <span className="hero__aurora-blob hero__aurora-blob--c" />
      </div>

      <div className="hero__constellation" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="hero__node"
            style={{
              left: `${6 + ((i * 37) % 88)}%`,
              top: `${8 + ((i * 53) % 70)}%`,
            }}
          />
        ))}
      </div>

      <p className="hero__rail" aria-hidden="true">
        Fluent IT · Security · Migration · DevSecOps
      </p>

      <div className="hero__orbit" aria-hidden="true">
        <div className="hero__orbit-ring hero__orbit-ring--0">
          {ORBIT_DOTS.slice(0, 4).map((i) => (
            <span key={i} className="hero__orbit-dot" style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <div className="hero__orbit-ring hero__orbit-ring--1" />
        <div className="hero__orbit-ring hero__orbit-ring--2" />
      </div>

      <div className="hero__sparks" aria-hidden="true">
        {SPARKS.map((i) => (
          <span
            key={i}
            className={`hero__spark hero__spark--${i % 3}`}
            style={{
              left: `${42 + (i % 6) * 3}%`,
              top: `${28 + Math.floor(i / 6) * 4}%`,
            }}
          />
        ))}
      </div>

      <div className="hero__mesh" aria-hidden="true">
        <div className="hero__mesh-inner">
          <HeroTerrain active={ready} />
        </div>
      </div>

      <div className="hero__content container">
        <p className="eyebrow hero__eyebrow">Security · Migration · DevSecOps · Development</p>

        <div className="hero__brand-wrap">
          <div className="hero__brand-glow" aria-hidden="true" />
          <h1 className="hero__brand display" aria-label="CanITSM">
            {BRAND_CAN.map((ch, i) => (
              <span key={`c-${i}`} className="hero__letter hero__letter--can">
                {ch}
              </span>
            ))}
            {BRAND_ITSM.map((ch, i) => (
              <span key={`i-${i}`} className="hero__letter hero__letter--itsm">
                {ch}
              </span>
            ))}
          </h1>
        </div>

        <h2 className="hero__headline display">
          {HEADLINES.map((line) => (
            <span key={line} className="hero__line">
              <span className="hero__line-inner">{line}</span>
            </span>
          ))}
        </h2>

        <p className="hero__lede">
          CanITSM delivers cybersecurity, cloud migration, penetration testing, DevSecOps, Microsoft
          Partner support and development services across Microsoft 365, Azure, AWS, Google Workspace
          and GCP — Fluent IT, not jargon.
        </p>

        <div className="hero__cta-row">
          <Link className="btn" to="/contact">
            Book a Consultation
          </Link>
          <Link className="btn btn-ghost" to="/services">
            Explore Services
          </Link>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
