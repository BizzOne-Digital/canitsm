import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { getService, type EnterFrom } from "../data/services";
import "./ServiceRockOverlay.css";

const dirOffset: Record<EnterFrom, { x: number; y: number }> = {
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export default function ServiceRockOverlay() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const service = getService(slug);
  const enterFrom: EnterFrom = service?.enterFrom ?? "top";

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !service) return;

    const dir = dirOffset[enterFrom];
    const dist = Math.max(window.innerWidth, window.innerHeight) * 0.85;
    const rocks = gsap.utils.toArray<HTMLElement>(".rock-slab", root);
    const bits = gsap.utils.toArray<HTMLElement>(".rock-bit", root);
    const panel = root.querySelector<HTMLElement>(".rock-panel");
    const veil = root.querySelector<HTMLElement>(".rock-veil");

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(veil, { opacity: 0 });
      gsap.set(panel, {
        x: dir.x * dist * 0.55,
        y: dir.y * dist * 0.55,
        rotate: gsap.utils.random(-28, 28),
        scale: 0.75,
        opacity: 0,
      });
      gsap.set(rocks, {
        x: () => dir.x * dist + gsap.utils.random(-120, 120),
        y: () => dir.y * dist + gsap.utils.random(-120, 120),
        rotate: () => gsap.utils.random(-50, 50),
        scale: () => gsap.utils.random(0.5, 1.1),
        opacity: 0,
      });
      gsap.set(bits, {
        y: 80,
        x: () => gsap.utils.random(-40, 40),
        rotate: () => gsap.utils.random(-20, 20),
        opacity: 0,
        scale: 0.7,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(veil, { opacity: 1, duration: 0.45 }, 0)
        // Rock slabs crash in from the entry side
        .to(
          rocks,
          {
            x: () => gsap.utils.random(-30, 30),
            y: () => gsap.utils.random(-20, 40),
            rotate: () => gsap.utils.random(-12, 12),
            scale: 1,
            opacity: 0.9,
            duration: 0.85,
            stagger: { each: 0.06, from: "random" },
            ease: "bounce.out",
          },
          0.1,
        )
        // Main container tumbles in like a boulder
        .to(
          panel,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 1.05,
            ease: "bounce.out",
          },
          0.35,
        )
        // Text bits tumble into place
        .to(
          bits,
          {
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: { each: 0.045, from: "random" },
            ease: "back.out(1.6)",
          },
          0.75,
        )
        // Debris settles / fades slightly
        .to(
          rocks,
          {
            opacity: 0.25,
            scale: 0.95,
            duration: 0.6,
          },
          1.1,
        );
    }, root);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [slug, enterFrom, service]);

  const close = () => {
    const root = rootRef.current;
    if (!root) {
      navigate("/services");
      return;
    }

    const dir = dirOffset[enterFrom];
    const dist = Math.max(window.innerWidth, window.innerHeight) * 0.7;
    const rocks = root.querySelectorAll(".rock-slab");
    const panel = root.querySelector(".rock-panel");
    const veil = root.querySelector(".rock-veil");

    const tl = gsap.timeline({
      onComplete: () => navigate("/services"),
    });

    tl.to(".rock-bit", {
      y: dir.y * 60 || 40,
      x: dir.x * 40,
      rotate: () => gsap.utils.random(-25, 25),
      opacity: 0,
      stagger: 0.02,
      duration: 0.35,
      ease: "power2.in",
    })
      .to(
        panel,
        {
          x: dir.x * dist * 0.4,
          y: dir.y * dist * 0.4,
          rotate: gsap.utils.random(-20, 20),
          scale: 0.85,
          opacity: 0,
          duration: 0.55,
          ease: "power3.in",
        },
        0.1,
      )
      .to(
        rocks,
        {
          x: () => dir.x * dist + gsap.utils.random(-80, 80),
          y: () => dir.y * dist + gsap.utils.random(-80, 80),
          rotate: () => gsap.utils.random(-40, 40),
          opacity: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.in",
        },
        0.05,
      )
      .to(veil, { opacity: 0, duration: 0.35 }, 0.25);
  };

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div
      className={`rock-overlay rock-overlay--${enterFrom}`}
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      <button type="button" className="rock-veil" aria-label="Close detail" onClick={close} />

      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className={`rock-slab rock-slab--${i % 3}`}
          style={{ "--i": i } as CSSProperties}
          aria-hidden="true"
        />
      ))}

      <article className="rock-panel">
        <button type="button" className="rock-panel__close rock-bit" onClick={close}>
          ✕ Close
        </button>

        <p className="eyebrow rock-bit">
          Service {service.num}
        </p>
        <h2 className="display rock-panel__title rock-bit">{service.title}</h2>
        <p className="rock-panel__hero rock-bit">{service.hero}</p>
        <p className="rock-panel__desc rock-bit">{service.description}</p>

        <ul className="rock-panel__points">
          {service.points.map((point) => (
            <li key={point} className="rock-bit">
              {point}
            </li>
          ))}
        </ul>

        <div className="rock-panel__actions rock-bit">
          <Link className="btn" to="/contact">
            Get Started
          </Link>
          <button type="button" className="btn btn-ghost" onClick={close}>
            Keep browsing
          </button>
        </div>
      </article>
    </div>
  );
}
