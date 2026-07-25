import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RevealChamber.css";

gsap.registerPlugin(ScrollTrigger);

export type ChamberContent = {
  kicker: string;
  lines: string[];
  body: string;
};

type RevealChamberProps = {
  id?: string;
  content: ChamberContent;
  variant?: "purple" | "neon" | "split";
  ready?: boolean;
};

export default function RevealChamber({
  id,
  content,
  variant = "purple",
  ready = true,
}: RevealChamberProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const portal = portalRef.current;
    if (!section || !portal) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".chamber__line", section);
      const words = gsap.utils.toArray<HTMLElement>(".chamber__word", section);
      const body = section.querySelector<HTMLElement>(".chamber__body");
      const kicker = section.querySelector<HTMLElement>(".chamber__kicker");
      const peek = section.querySelector<HTMLElement>(".chamber__peek");
      const ring = section.querySelector<HTMLElement>(".chamber__ring");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        portal,
        { scale: 0.2, borderRadius: 32, rotate: variant === "split" ? -8 : 5 },
        { scale: 1, borderRadius: 0, rotate: 0, ease: "none", duration: 1 },
      )
        .fromTo(
          ring,
          { scale: 0.5, opacity: 0.9 },
          { scale: 2.4, opacity: 0, ease: "none", duration: 1 },
          0,
        )
        .to(peek, { opacity: 0, scale: 0.5, duration: 0.25 }, 0.2)
        .fromTo(kicker, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.35)
        .fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: "none" },
          0.4,
        )
        .fromTo(
          words,
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            duration: 0.25,
            ease: "none",
          },
          0.55,
        )
        .fromTo(body, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.7);
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [variant, ready]);

  return (
    <section className={`chamber chamber--${variant}`} id={id} ref={sectionRef}>
      <div className="chamber__sticky">
        <div className="chamber__hint" aria-hidden="true">
          <span>Scroll to expand</span>
          <i />
        </div>

        <div className="chamber__portal" ref={portalRef}>
          <div className="chamber__ring" aria-hidden="true" />
          <div className="chamber__shards" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="chamber__shard"
                style={{ "--i": i } as CSSProperties}
              />
            ))}
          </div>

          <p className="chamber__peek display" aria-hidden="true">
            {content.lines[0]}
          </p>

          <div className="chamber__inner">
            <p className="chamber__kicker eyebrow">{content.kicker}</p>
            <h2 className="chamber__title display">
              {content.lines.map((line) => (
                <span className="chamber__line-wrap" key={line}>
                  <span className="chamber__line">{line}</span>
                </span>
              ))}
            </h2>
            <p className="chamber__body">
              {content.body.split(" ").map((word, i, arr) => (
                <span className="chamber__word" key={`${word}-${i}`}>
                  {word}
                  {i < arr.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
