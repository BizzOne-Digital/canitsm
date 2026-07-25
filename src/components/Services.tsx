import { useLayoutEffect, useRef } from "react";
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
    copy: "Expert Microsoft 365 implementation and support, seamless cloud migrations, and reliable backup and business continuity.",
    from: "right",
  },
  {
    num: "03",
    title: "Cybersecurity & Compliance",
    copy: "We secure devices, manage passwords, and train employees to ensure strong cybersecurity and regulatory compliance.",
    from: "bottom",
  },
  {
    num: "04",
    title: "IT Services Built for Modern Business",
    copy: "We'll assess your current environment and show you how to modernize, secure, and scale your technology.",
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
          From strategy to support — we do IT right. Run smarter, stay secure, and scale with
          confidence.
        </p>

        <div className="services__grid">
          {services.map((s) => (
            <article key={s.num} className="svc-card" data-from={s.from}>
              <span className="svc-card__num">{s.num}</span>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__copy">{s.copy}</p>
              <a href="#contact" className="svc-card__link">
                Get Started →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
