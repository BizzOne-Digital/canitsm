import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discover",
    copy: "Clarify goals, platforms, constraints and risk so the right service pathway is obvious.",
  },
  {
    title: "Design",
    copy: "Translate needs into a Fluent IT roadmap—assessments, migrations, testing or builds with clear scope.",
  },
  {
    title: "Deliver",
    copy: "Implement, validate and document so your team can operate, audit and extend what we ship.",
  },
  {
    title: "Support",
    copy: "Hand over cleanly—or continue with managed security and partner support when ongoing coverage fits.",
  },
];

type ProcessProps = {
  ready?: boolean;
};

export default function Process({ ready = true }: ProcessProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".process__track");
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="process" id="process" ref={ref}>
      <div className="process__sticky">
        <div className="process__head container">
          <p className="eyebrow">The CanITSM Process</p>
          <LandslideText
            className="process__title display"
            text="Discover. Design. Deliver."
            mode="words"
          />
        </div>
        <div className="process__track">
          {steps.map((step, i) => (
            <article className="process-card" key={step.title}>
              <span className="process-card__idx">0{i + 1}</span>
              <h3 className="process-card__title display">{step.title}</h3>
              <p className="process-card__copy serif">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
