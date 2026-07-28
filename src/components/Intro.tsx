import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import "./Intro.css";

type IntroProps = {
  onComplete: () => void;
};

const PARTICLES = Array.from({ length: 40 }, (_, i) => i);
const BARS = Array.from({ length: 24 }, (_, i) => i);
const HEX = [0, 1, 2, 3];
const TAG_WORDS = ["Secure", "Scale", "Lead", "Fluent IT", "Canada"];

export default function Intro({ onComplete }: IntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.55,
        ease: "power2.out",
        onComplete,
      });
    };

    const ctx = gsap.context(() => {
      const progress = { value: 0 };

      gsap.set(".intro__curtain--top", { yPercent: -105 });
      gsap.set(".intro__curtain--bottom", { yPercent: 105 });
      gsap.set(".intro__curtain--left", { xPercent: -105 });
      gsap.set(".intro__curtain--right", { xPercent: 105 });
      gsap.set(".intro__aperture", { clipPath: "inset(49% 49% 49% 49%)" });
      gsap.set(".intro__letter--can", { x: -180, opacity: 0, rotateY: 70 });
      gsap.set(".intro__letter--itsm", { x: 180, opacity: 0, rotateY: -70 });
      gsap.set(".intro__tag-word", { y: 40, opacity: 0, scale: 0.8 });
      gsap.set(".intro__hex", { scale: 0.2, opacity: 0, rotate: -40 });
      gsap.set(".intro__particle", { scale: 0, opacity: 0 });
      gsap.set(".intro__bar", { scaleY: 0, opacity: 0 });
      gsap.set(".intro__ring-svg", { opacity: 0 });
      gsap.set(".intro__ring-progress", { strokeDashoffset: 283 });
      gsap.set(".intro__counter", { opacity: 0, scale: 0.8 });
      gsap.set(".intro__badge", { y: -20, opacity: 0 });
      gsap.set(".intro__sub", { opacity: 0, y: 16 });
      gsap.set(".intro__skip", { opacity: 0 });
      gsap.set(".intro__flare", { scale: 0, opacity: 0 });
      gsap.set(".intro__grid", { opacity: 0 });
      gsap.set(".intro__slash", { scaleX: 0, opacity: 0 });

      // Ambient loops
      gsap.to(".intro__particle", {
        y: "random(-50, 50)",
        x: "random(-40, 40)",
        duration: "random(2.8, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.05, from: "random" },
        delay: 1,
      });

      gsap.to(".intro__hex", {
        rotate: "+=360",
        duration: 22,
        repeat: -1,
        ease: "none",
        stagger: 0.3,
      });

      gsap.to(".intro__bar", {
        scaleY: () => gsap.utils.random(0.25, 1),
        duration: 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.05, from: "center", repeat: -1 },
        delay: 1.2,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.to(".intro__skip", { opacity: 1, duration: 0.4 })
        .to(".intro__grid", { opacity: 1, duration: 0.7 }, 0)
        .to(
          ".intro__particle",
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: { each: 0.02, from: "center" },
            ease: "back.out(1.7)",
          },
          0.15,
        )

        // Hex portals bloom
        .to(
          ".intro__hex",
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.1,
            stagger: 0.1,
            ease: "expo.out",
          },
          0.25,
        )

        // Energy bars rise
        .to(
          ".intro__bar",
          {
            scaleY: () => gsap.utils.random(0.4, 1),
            opacity: 0.85,
            duration: 0.7,
            stagger: { each: 0.03, from: "center" },
            ease: "back.out(1.4)",
          },
          0.4,
        )

        // Progress ring + counter
        .to(".intro__ring-svg", { opacity: 1, duration: 0.4 }, 0.35)
        .to(".intro__counter", { opacity: 1, scale: 1, duration: 0.45 }, 0.4)
        .to(
          progress,
          {
            value: 100,
            duration: 2.6,
            ease: "power1.inOut",
            onUpdate: () => {
              if (progressRef.current) {
                progressRef.current.textContent = `${Math.round(progress.value)
                  .toString()
                  .padStart(2, "0")}`;
              }
            },
          },
          0.4,
        )
        .to(
          ".intro__ring-progress",
          { strokeDashoffset: 0, duration: 2.6, ease: "power1.inOut" },
          0.4,
        )

        // Diagonal slashes
        .to(
          ".intro__slash",
          { scaleX: 1, opacity: 1, duration: 0.7, stagger: 0.08, ease: "expo.out" },
          0.9,
        )

        // Brand letters collide from L/R
        .to(
          ".intro__letter--can",
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          1.5,
        )
        .to(
          ".intro__letter--itsm",
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          1.5,
        )
        .to(
          ".intro__flare",
          { scale: 1.8, opacity: 0.9, duration: 0.35, ease: "power2.out" },
          2.15,
        )
        .to(".intro__flare", { scale: 2.6, opacity: 0, duration: 0.7 }, 2.35)

        // Glitch punch
        .to(".intro__mark", { x: 8, duration: 0.04, yoyo: true, repeat: 7, ease: "none" }, 2.2)
        .to(".intro__mark", { x: 0, duration: 0.06 }, 2.5)

        .to(".intro__badge", { y: 0, opacity: 1, duration: 0.45 }, 2.3)
        .to(
          ".intro__tag-word",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.6)",
          },
          2.4,
        )
        .to(".intro__sub", { opacity: 1, y: 0, duration: 0.5 }, 2.7)

        // Hold a beat, then theatrical close
        .to(".intro__brand-block", { scale: 1.08, duration: 0.55, ease: "power2.in" }, 3.3)
        .to(
          [".intro__hex", ".intro__bars", ".intro__ring-svg", ".intro__particle", ".intro__grid"],
          { opacity: 0, duration: 0.4 },
          3.35,
        )
        .to(".intro__curtain--top", { yPercent: 0, duration: 0.85, ease: "power4.inOut" }, "curtains")
        .to(".intro__curtain--bottom", { yPercent: 0, duration: 0.85, ease: "power4.inOut" }, "curtains")
        .to(".intro__curtain--left", { xPercent: 0, duration: 0.85, ease: "power4.inOut" }, "curtains")
        .to(".intro__curtain--right", { xPercent: 0, duration: 0.85, ease: "power4.inOut" }, "curtains")
        .to(
          ".intro__brand-block",
          { opacity: 0, scale: 0.7, filter: "blur(12px)", duration: 0.4 },
          "-=0.35",
        )

        // Aperture explode
        .to(".intro__aperture", {
          clipPath: "inset(16% 20% 16% 20%)",
          duration: 0.55,
          ease: "power3.inOut",
        })
        .to(".intro__aperture", {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          ease: "expo.inOut",
        })
        .to(
          [".intro__curtain--top", ".intro__curtain--bottom"],
          { yPercent: (i: number) => (i === 0 ? -110 : 110), duration: 1.05 },
          "-=0.65",
        )
        .to(
          [".intro__curtain--left", ".intro__curtain--right"],
          { xPercent: (i: number) => (i === 0 ? -110 : 110), duration: 1.05 },
          "<",
        )
        .to(".intro__flash", { opacity: 0.7, duration: 0.1 }, "-=0.4")
        .to(".intro__flash", { opacity: 0, duration: 0.5 });

      const skipBtn = root.querySelector(".intro__skip");
      const onSkip = () => {
        tl.progress(1);
        tl.kill();
        finish();
      };
      skipBtn?.addEventListener("click", onSkip);
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro__flash" />
      <div className="intro__grid" />

      <button type="button" className="intro__skip">
        Skip intro
      </button>

      <div className="intro__stage">
        {PARTICLES.map((i) => (
          <span
            key={i}
            className={`intro__particle intro__particle--${i % 4}`}
            style={{
              left: `${4 + ((i * 19) % 92)}%`,
              top: `${6 + ((i * 29) % 88)}%`,
            }}
          />
        ))}

        {HEX.map((h) => (
          <div
            key={h}
            className={`intro__hex intro__hex--${h}`}
            style={{ "--i": h } as CSSProperties}
          />
        ))}

        <div className="intro__slash intro__slash--a" />
        <div className="intro__slash intro__slash--b" />

        <div className="intro__bars" aria-hidden="true">
          {BARS.map((i) => (
            <span key={i} className="intro__bar" />
          ))}
        </div>

        <div className="intro__flare" />

        <div className="intro__brand-block">
          <div className="intro__badge">CANITSM · EST</div>

          <div className="intro__ring-wrap">
            <svg className="intro__ring-svg" viewBox="0 0 100 100">
              <circle className="intro__ring-track" cx="50" cy="50" r="45" />
              <circle className="intro__ring-progress" cx="50" cy="50" r="45" />
            </svg>
            <div className="intro__counter">
              <span ref={progressRef}>00</span>
              <em>%</em>
            </div>
          </div>

          <div className="intro__mark">
            {"CAN".split("").map((ch, i) => (
              <span key={`c-${i}`} className="intro__letter intro__letter--can">
                {ch}
              </span>
            ))}
            {"ITSM".split("").map((ch, i) => (
              <span key={`i-${i}`} className="intro__letter intro__letter--itsm">
                {ch}
              </span>
            ))}
          </div>

          <p className="intro__tag">
            {TAG_WORDS.map((word, i) => (
              <span key={`${word}-${i}`} className="intro__tag-word">
                {word}
              </span>
            ))}
          </p>
          <p className="intro__sub">Digitally transform · Secure · Scale</p>
        </div>

        <div className="intro__aperture">
          <div className="intro__aperture-glow" />
        </div>

        <div className="intro__curtain intro__curtain--top" />
        <div className="intro__curtain intro__curtain--bottom" />
        <div className="intro__curtain intro__curtain--left" />
        <div className="intro__curtain intro__curtain--right" />
      </div>
    </div>
  );
}
