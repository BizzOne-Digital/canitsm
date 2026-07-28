import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CrossfireLanes.css";

gsap.registerPlugin(ScrollTrigger);

type Lane = {
  text: string;
  from: "left" | "right";
};

type CrossfireLanesProps = {
  ready?: boolean;
  id?: string;
  kicker: string;
  lanes: Lane[];
  body: string;
};

export default function CrossfireLanes({
  ready = true,
  id,
  kicker,
  lanes,
  body,
}: CrossfireLanesProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const laneEls = gsap.utils.toArray<HTMLElement>(".crossfire__lane", root);
      const bodyEl = root.querySelector<HTMLElement>(".crossfire__body");
      const glow = root.querySelector<HTMLElement>(".crossfire__impact");
      const kickerEl = root.querySelector<HTMLElement>(".crossfire__kicker");
      const shards = gsap.utils.toArray<HTMLElement>(".crossfire__shard", root);

      gsap.set(laneEls, {
        xPercent: (i) => (lanes[i]?.from === "left" ? -120 : 120),
        opacity: 0.15,
        filter: "blur(8px)",
      });
      gsap.set(bodyEl, { opacity: 0, y: 40 });
      gsap.set(kickerEl, { opacity: 0, y: 20 });
      gsap.set(glow, { scale: 0.4, opacity: 0 });
      gsap.set(shards, { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      tl.to(kickerEl, { opacity: 1, y: 0, duration: 0.35 }, 0);

      laneEls.forEach((lane, i) => {
        const start = 0.15 + i * 0.18;
        tl.to(
          lane,
          {
            xPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          },
          start,
        );
      });

      // Impact bloom when lanes lock
      tl.to(
        glow,
        { scale: 1.4, opacity: 1, duration: 0.4, ease: "power2.out" },
        0.72,
      )
        .to(
          shards,
          {
            scale: 1,
            opacity: 1,
            x: (i) => (i % 2 === 0 ? -80 : 80) + gsap.utils.random(-40, 40),
            y: () => gsap.utils.random(-60, 60),
            duration: 0.45,
            stagger: 0.03,
          },
          0.75,
        )
        .to(bodyEl, { opacity: 1, y: 0, duration: 0.4 }, 0.85)
        .to(glow, { opacity: 0.35, scale: 1.1, duration: 0.35 }, 0.95);

      // Continuous micro drift for life
      gsap.to(".crossfire__lane--left .crossfire__text", {
        x: 12,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".crossfire__lane--right .crossfire__text", {
        x: -12,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready, lanes]);

  return (
    <section className="crossfire" id={id} ref={ref}>
      <div className="crossfire__sticky">
        <div className="crossfire__impact" aria-hidden="true" />
        <div className="crossfire__shards" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`crossfire__shard crossfire__shard--${i % 3}`} />
          ))}
        </div>

        <p className="eyebrow crossfire__kicker">{kicker}</p>

        <div className="crossfire__lanes">
          {lanes.map((lane) => (
            <div
              key={lane.text}
              className={`crossfire__lane crossfire__lane--${lane.from}`}
            >
              <span className="crossfire__text display">{lane.text}</span>
              <span className="crossfire__ghost display" aria-hidden="true">
                {lane.text}
              </span>
            </div>
          ))}
        </div>

        <p className="crossfire__body">{body}</p>

        <div className="crossfire__hint" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
