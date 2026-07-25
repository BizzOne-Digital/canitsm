import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  ready: boolean;
};

/** Smooth zig-zag polyline across the mesh */
function zigPath(
  startY: number,
  amp: number,
  step: number,
  phase = 0,
): string {
  const points: string[] = [];
  for (let x = 0; x <= 1200; x += step) {
    const up = ((x / step + phase) % 2 === 0);
    const y = startY + (up ? -amp : amp);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

function vertZig(x: number, phase = 0): string {
  const points: string[] = [];
  for (let y = 20; y <= 300; y += 28) {
    const left = ((y / 28 + phase) % 2 === 0);
    points.push(`${x + (left ? -14 : 14)},${y}`);
  }
  return `M${points.join(" L")}`;
}

export default function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Keep hidden until intro finishes
    if (!ready) {
      gsap.set([".hero__content", ".hero__mesh", ".hero__scroll"], {
        y: 160,
        opacity: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const content = root.querySelector<HTMLElement>(".hero__content");
      const mesh = root.querySelector<HTMLElement>(".hero__mesh");
      const scrollHint = root.querySelector<HTMLElement>(".hero__scroll");
      const meshInner = root.querySelector<HTMLElement>(".hero__mesh-inner");

      gsap.set(content, { y: 220, opacity: 0 });
      gsap.set(mesh, { y: 280, opacity: 0 });
      gsap.set(scrollHint, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      // 1) Content slides up from bottom after intro
      tl.to(content, {
        y: 0,
        opacity: 1,
        duration: 1.45,
        ease: "power4.out",
      });

      // 2) Then mesh layer rises from below
      tl.to(
        mesh,
        {
          y: 0,
          opacity: 1,
          duration: 1.55,
          ease: "power3.out",
        },
        "-=0.55",
      );

      tl.to(scrollHint, { opacity: 1, duration: 0.6 }, "-=0.4");

      // Continuous smooth zig-zag float (after entrance)
      tl.add(() => {
        gsap.to(".hero__mesh-layer--back", {
          y: -14,
          x: 10,
          duration: 4.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".hero__mesh-layer--front", {
          y: 16,
          x: -14,
          duration: 5.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".hero__mesh-layer--mid", {
          y: 8,
          x: 8,
          duration: 3.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        if (meshInner) {
          gsap.to(meshInner, {
            yPercent: 22,
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
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  const hLines = Array.from({ length: 12 }, (_, i) => ({
    d: zigPath(48 + i * 18, 10 + (i % 3) * 4, 48, i % 2),
    opacity: 0.28 + (i % 4) * 0.1,
  }));

  const hLines2 = Array.from({ length: 9 }, (_, i) => ({
    d: zigPath(70 + i * 22, 14 + (i % 2) * 6, 40, (i + 1) % 2),
    opacity: 0.4 + (i % 3) * 0.12,
  }));

  const vLines = Array.from({ length: 16 }, (_, i) => ({
    d: vertZig(50 + i * 72, i % 2),
    opacity: 0.22 + (i % 3) * 0.08,
  }));

  return (
    <section
      className={`hero ${ready ? "hero--ready" : "hero--waiting"}`}
      id="top"
      ref={ref}
    >
      <div className="hero__plane" aria-hidden="true" />

      <div className="hero__mesh" aria-hidden="true">
        <div className="hero__mesh-inner">
          <div className="hero__mesh-glow" />

          <svg
            className="hero__mesh-layer hero__mesh-layer--back"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroMeshGradA" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient id="heroMeshFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="55%" stopColor="#00e5ff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#05050a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,210 L80,150 L160,230 L240,130 L320,220 L400,145 L480,235 L560,140 L640,225 L720,155 L800,240 L880,148 L960,228 L1040,160 L1120,235 L1200,170 V320 H0 Z"
              fill="url(#heroMeshFill)"
            />
            {hLines.map((line, i) => (
              <path
                key={`hb-${i}`}
                d={line.d}
                fill="none"
                stroke="url(#heroMeshGradA)"
                strokeWidth="1.15"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={line.opacity}
              />
            ))}
            {vLines.map((line, i) => (
              <path
                key={`vb-${i}`}
                d={line.d}
                fill="none"
                stroke="url(#heroMeshGradA)"
                strokeWidth="0.85"
                strokeLinejoin="round"
                opacity={line.opacity}
              />
            ))}
          </svg>

          <svg
            className="hero__mesh-layer hero__mesh-layer--mid"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroMeshGradM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            {Array.from({ length: 7 }).map((_, i) => (
              <path
                key={`hm-${i}`}
                d={zigPath(90 + i * 24, 18, 36, i % 2)}
                fill="none"
                stroke="url(#heroMeshGradM)"
                strokeWidth="1.3"
                strokeLinejoin="round"
                opacity={0.35 + (i % 3) * 0.1}
              />
            ))}
          </svg>

          <svg
            className="hero__mesh-layer hero__mesh-layer--front"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroMeshGradB" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            {hLines2.map((line, i) => (
              <path
                key={`hf-${i}`}
                d={line.d}
                fill="none"
                stroke="url(#heroMeshGradB)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={line.opacity}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="hero__content container">
        <p className="eyebrow hero__eyebrow">Canada-based IT Consulting</p>
        <h1 className="hero__brand display" aria-label="CanITSM">
          <span>CAN</span>
          <span className="hero__brand-accent">ITSM</span>
        </h1>
        <h2 className="hero__headline display">
          Digitally transform.
          <br />
          Secure your tech.
          <br />
          Scale with confidence.
        </h2>
        <p className="hero__lede">
          CanITSM helps ambitious Canadian businesses modernize infrastructure, protect digital
          assets, and grow with proactive IT — Fluent IT, not jargon.
        </p>
        <div className="hero__cta-row">
          <Link className="btn" to="/contact">
            Book Free Consultation
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
