import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PinnedGrow.css";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    kicker: "01 · Strategy-First",
    title: "Quarterly Strategy Reviews",
    copy: "Ensure your technology is always supporting your next big business move — not lagging behind it.",
  },
  {
    kicker: "02 · 24/7 Security",
    title: "Around-the-Clock Threat Hunting",
    copy: "Sleep soundly knowing proactive monitoring protects your data while your team focuses on growth.",
  },
  {
    kicker: "03 · Vendor Consolidation",
    title: "One Point of Contact",
    copy: "We manage your third-party vendors — ISPs, software, and more — so IT complexity stops at our desk.",
  },
  {
    kicker: "04 · Fluent IT",
    title: "No Jargon. Just Results.",
    copy: "Stop translating technical headaches. We speak Fluent IT so you can speak fluent business.",
  },
];

function TitleLines({ title }: { title: string }) {
  let parts: string[];

  if (title.includes(". ")) {
    parts = title.split(". ").map((p, i, arr) => (i < arr.length - 1 ? `${p}.` : p));
  } else {
    const words = title.split(" ");
    if (words.length <= 3) {
      parts = [title];
    } else {
      const mid = Math.ceil(words.length / 2);
      parts = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    }
  }

  return (
    <h2 className="grow-emerge display grow-panel__title">
      {parts.map((line) => (
        <span className="grow-panel__title-line" key={line}>
          {line}
        </span>
      ))}
    </h2>
  );
}

type PinnedGrowProps = {
  ready?: boolean;
};

export default function PinnedGrow({ ready = true }: PinnedGrowProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".grow-panel");
      const peek = section.querySelector<HTMLElement>(".grow-frame__peek");

      gsap.set(panels.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        frame,
        { scale: 0.22, borderRadius: 24, rotate: -6 },
        { scale: 1, borderRadius: 0, rotate: 0, ease: "none", duration: 1 },
      )
        .to(peek, { opacity: 0, scale: 0.6, duration: 0.2 }, 0.2)
        .to(".grow-frame__label", { opacity: 1, y: 0, duration: 0.15 }, 0.35);

      panels.forEach((panel, i) => {
        const bits = panel.querySelectorAll(".grow-emerge");
        const start = 0.4 + i * 0.15;
        if (i === 0) {
          tl.fromTo(
            bits,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.2, ease: "none" },
            start,
          );
        } else {
          tl.to(panels[i - 1], { autoAlpha: 0, duration: 0.1 }, start - 0.05);
          tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, start);
          tl.fromTo(
            bits,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.2, ease: "none" },
            start + 0.05,
          );
        }
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="pinned-grow" id="advantage" ref={sectionRef}>
      <div className="pinned-grow__sticky">
        <p className="pinned-grow__hint" aria-hidden="true">
          Keep scrolling — expand
        </p>
        <div className="grow-frame" ref={frameRef}>
          <div className="grow-frame__glow" />
          <div className="grow-frame__pulse" aria-hidden="true" />
          <p className="grow-frame__peek display" aria-hidden="true">
            ADVANTAGE
          </p>
          <p className="grow-frame__label eyebrow">The CanITSM Advantage</p>
          <div className="grow-frame__viewport">
            <div className="grow-track">
              {slides.map((s) => (
                <article className="grow-panel" key={s.kicker}>
                  <div className="grow-panel__well">
                    <p className="grow-emerge eyebrow">{s.kicker}</p>
                    <TitleLines title={s.title} />
                    <p className="grow-emerge serif grow-panel__copy">{s.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
