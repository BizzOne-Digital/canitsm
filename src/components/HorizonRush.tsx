import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizonRush.css";

gsap.registerPlugin(ScrollTrigger);

type Panel = {
  tag: string;
  title: string;
  copy: string;
};

type HorizonRushProps = {
  ready?: boolean;
  id?: string;
  kicker: string;
  title: string;
  panels: Panel[];
};

export default function HorizonRush({
  ready = true,
  id,
  kicker,
  title,
  panels,
}: HorizonRushProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".horizon__track");
      const cards = gsap.utils.toArray<HTMLElement>(".horizon__card", root);
      const progress = root.querySelector<HTMLElement>(".horizon__bar-fill");
      if (!track) return;

      // Cards start off-stage alternating L/R with twist
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(card, {
          x: fromLeft ? -220 : 220,
          y: fromLeft ? 40 : -40,
          rotateY: fromLeft ? 28 : -28,
          rotateZ: fromLeft ? -6 : 6,
          opacity: 0.25,
          scale: 0.88,
        });
      });

      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.set(progress, { scaleX: self.progress });
            }
          },
        },
      });

      cards.forEach((card) => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 92%",
            end: "left 45%",
            scrub: 0.8,
          },
        });
      });

      // Side beams pulse
      gsap.to(".horizon__beam--l", {
        opacity: 0.35,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".horizon__beam--r", {
        opacity: 0.5,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="horizon" id={id} ref={ref}>
      <div className="horizon__sticky">
        <div className="horizon__beam horizon__beam--l" aria-hidden="true" />
        <div className="horizon__beam horizon__beam--r" aria-hidden="true" />

        <div className="horizon__head container">
          <p className="eyebrow">{kicker}</p>
          <h2 className="horizon__title display">{title}</h2>
          <div className="horizon__bar" aria-hidden="true">
            <span className="horizon__bar-fill" />
          </div>
          <p className="horizon__dir" aria-hidden="true">
            ← swipe with scroll →
          </p>
        </div>

        <div className="horizon__viewport">
          <div className="horizon__track">
            {panels.map((panel, i) => (
              <article
                key={panel.title}
                className={`horizon__card horizon__card--${i % 2 === 0 ? "l" : "r"}`}
              >
                <span className="horizon__side" aria-hidden="true">
                  {i % 2 === 0 ? "◀ LEFT" : "RIGHT ▶"}
                </span>
                <span className="horizon__tag">{panel.tag}</span>
                <h3 className="display">{panel.title}</h3>
                <p>{panel.copy}</p>
                <span className="horizon__idx">0{i + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
