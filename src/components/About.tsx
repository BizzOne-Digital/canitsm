import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const traits = [
  {
    title: "Security-first pathways",
    copy: "Assessments, implementation and managed security grouped so you can start with evidence or operate ongoing controls.",
  },
  {
    title: "Migration with discipline",
    copy: "Tenant, cloud and device moves planned around discovery, coexistence, cutover and validation.",
  },
  {
    title: "DevSecOps in the pipeline",
    copy: "Security integrated into delivery—CI/CD gates, AppSec and cloud/container hardening without empty buzzwords.",
  },
  {
    title: "Microsoft ecosystem support",
    copy: "Partner Center readiness, compliance guidance and vulnerability support for partner-focused environments.",
  },
  {
    title: "Website & mobile development",
    copy: "Structured delivery for static, dynamic and e-commerce sites plus Android and iOS applications.",
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
          text="Security-led. Delivery-aware. Fluent IT."
          mode="words"
        />
        <p className="about__lede serif">
          CanITSM Consulting is a security- and development-focused partner for organizations
          modernizing platforms and strengthening defenses. We speak Fluent IT—so leadership gets
          clear decisions across cybersecurity, migration, DevSecOps, Microsoft ecosystems and
          application delivery.
        </p>

        <div className="about__statement">
          <p className="display">SECURE.</p>
          <p className="display">MIGRATE.</p>
          <p className="display about__statement-lead">BUILD.</p>
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
