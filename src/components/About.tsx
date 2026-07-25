import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const traits = [
  {
    title: "Custom-Tailored IT Plans",
    copy: "We don't believe in one-size-fits-all. Strategies designed specifically for your business needs.",
  },
  {
    title: "100% Canadian Support",
    copy: "Work with local, highly trained IT professionals who understand your business context.",
  },
  {
    title: "Vendor & Software Management",
    copy: "Simplify how you manage all your vendors and software with one trusted partner.",
  },
  {
    title: "Microsoft 365 Experts",
    copy: "Expert implementation and management of Microsoft 365 for modern workplaces.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about__statement",
        { scale: 0.85, opacity: 0, rotateX: 18 },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about__statement",
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".about-trait").forEach((el, i) => {
        const fromY = i % 2 === 0 ? 100 : -80;
        const fromX = i < 2 ? -100 : 100;
        gsap.fromTo(
          el,
          { x: fromX, y: fromY, opacity: 0, rotate: gsap.utils.random(-8, 8) },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <p className="eyebrow">About Us</p>
        <LandslideText
          className="about__title display"
          text="Not just your IT provider — your growth partner"
          mode="words"
        />
        <p className="about__lede serif">
          A Canada-based IT company, driven by innovation and built on trust. We modernize and
          secure the digital backbone of ambitious Canadian businesses.
        </p>

        <div className="about__statement">
          <p className="display">SECURE.</p>
          <p className="display">SCALE.</p>
          <p className="display about__statement-lead">LEAD.</p>
        </div>

        <div className="about__traits">
          {traits.map((t) => (
            <article className="about-trait" key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
