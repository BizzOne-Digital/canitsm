import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "IT & End-User Support",
    copy: "24/7 help desk support with full visibility, seamless cloud migrations, and complete device lifecycle management.",
    from: "left",
  },
  {
    num: "02",
    title: "Microsoft & Cloud Services",
    copy: "Cloud transformation built around Microsoft 365, Azure, AWS, and Google — with migration, backup, and ongoing optimization.",
    from: "right",
  },
  {
    num: "03",
    title: "Cybersecurity & Compliance",
    copy: "Enterprise-grade security and compliance — assessments, implementation, managed monitoring, and threat prevention.",
    from: "bottom",
  },
  {
    num: "04",
    title: "IT Services Built for Modern Business",
    copy: "IT solutions designed for operational performance and growth — strategy, infrastructure, continuity, and automation.",
    from: "top",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".svc-card").forEach((card) => {
        const from = card.dataset.from;
        const x = from === "left" ? -140 : from === "right" ? 140 : 0;
        const y = from === "top" ? -140 : from === "bottom" ? 140 : 0;

        gsap.fromTo(
          card,
          { x, y, opacity: 0, rotate: from === "left" || from === "right" ? -4 : 4 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 45%",
              scrub: 1.1,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <p className="eyebrow">What We Do</p>
        <LandslideText
          className="services__title display"
          text="Services that keep Canadian businesses sharp"
          mode="words"
        />
        <p className="services__sub serif">
          CanITSM helps Canadian businesses modernize infrastructure, protect digital assets, and
          grow with confidence — through IT and end-user support, Microsoft and cloud services,
          cybersecurity and compliance, and modern-business IT solutions.
        </p>

        <div className="services__grid">
          {services.map((s) => (
            <article key={s.num} className="svc-card" data-from={s.from}>
              <span className="svc-card__num">{s.num}</span>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__copy">{s.copy}</p>
              <Link to="/services" className="svc-card__link">
                Get Started →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
