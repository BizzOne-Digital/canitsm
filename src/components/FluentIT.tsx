import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./FluentIT.css";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "No Jargon, Just Results",
    copy: "Stop translating technical headaches. We Speak Fluent IT so you can speak fluent business. We bridge the gap between complex infrastructure and your bottom line.",
  },
  {
    title: "Proactive over Reactive",
    copy: "While others fix problems, we prevent them. Our 24/7 monitoring ensures your tech stack evolves as fast as the Canadian market does.",
  },
  {
    title: "Digital Transformation",
    copy: "From legacy server migrations to AI-ready cloud environments, we don't just manage your tech — we modernize it for the next generation of business.",
  },
];

export default function FluentIT() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fluent-block").forEach((block, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          block,
          {
            x: 160 * dir,
            y: 80,
            rotate: 6 * dir,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 90%",
              end: "top 40%",
              scrub: 1.2,
            },
          },
        );
      });

      gsap.to(".fluent__marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="fluent" id="fluent" ref={ref}>
      <div className="fluent__marquee" aria-hidden="true">
        <div className="fluent__marquee-track">
          <span>SECURE · SCALE · LEAD · FLUENT IT · </span>
          <span>SECURE · SCALE · LEAD · FLUENT IT · </span>
        </div>
      </div>

      <div className="container">
        <p className="eyebrow">The Fluent IT Advantage</p>
        <LandslideText
          className="fluent__title display"
          text="We speak IT so you speak business"
          mode="chars"
          scrub={1}
        />

        <div className="fluent__list">
          {pillars.map((p) => (
            <article className="fluent-block" key={p.title}>
              <h3 className="fluent-block__title serif">{p.title}</h3>
              <p className="fluent-block__copy">{p.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
