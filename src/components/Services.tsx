import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import { primaryCategories } from "../data/catalog";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const fromCycle = ["left", "right", "bottom", "top", "left", "right"];

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
          text="Security, migration and development—done with clarity"
          mode="words"
        />
        <p className="services__sub serif">
          Six category pathways covering assessments through managed security, cloud migrations,
          penetration testing, DevSecOps, Microsoft Partner support, and website/mobile development.
        </p>

        <div className="services__grid">
          {primaryCategories.map((s, i) => (
            <article key={s.slug} className="svc-card" data-from={fromCycle[i % fromCycle.length]}>
              <span className="svc-card__num">0{i + 1}</span>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__copy">{s.short}</p>
              <Link to={`/services/${s.slug}`} className="svc-card__link">
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
