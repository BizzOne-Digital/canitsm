import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Audit",
    copy: "We listen to your current environment to understand your tech gaps.",
  },
  {
    title: "Translate",
    copy: 'We turn complex needs into a clear "Fluent IT" roadmap.',
  },
  {
    title: "Implement",
    copy: "Seamless deployment with zero downtime for your team.",
  },
  {
    title: "Optimize",
    copy: "Quarterly strategy reviews to ensure your tech stays ahead of the curve.",
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
            text="Clarity. Partnership. Purpose."
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
