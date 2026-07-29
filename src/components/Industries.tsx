import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./Industries.css";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    name: "Financial & Accounting",
    copy: "Security assessments, identity controls and cloud migrations that respect audit and confidentiality needs.",
  },
  {
    name: "Law Firms",
    copy: "Confidentiality-minded platforms—secure communications, tenant hygiene and controlled collaboration.",
  },
  {
    name: "Healthcare Clinics",
    copy: "Privacy-aware cloud and identity patterns so clinical teams can focus on care, not infrastructure noise.",
  },
  {
    name: "Field Service & Logistics",
    copy: "Reliable device and cloud pathways that keep dispatch, mobile workflows and ops connected.",
  },
  {
    name: "Recruitment & Startups",
    copy: "Lean security baselines and scalable Microsoft or cloud setups that grow with headcount.",
  },
  {
    name: "Education Centers",
    copy: "Secure identity, collaboration and development support for educators and learners alike.",
  },
];

export default function Industries() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ind-row").forEach((row, i) => {
        const dirs = [
          { x: -180, y: 0 },
          { x: 180, y: 0 },
          { x: 0, y: 140 },
          { x: 0, y: -140 },
          { x: -120, y: 80 },
          { x: 120, y: -80 },
        ];
        const d = dirs[i % dirs.length];

        gsap.fromTo(
          row,
          { ...d, opacity: 0, rotate: gsap.utils.random(-5, 5) },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 50%",
              scrub: 1.15,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="industries" id="industries" ref={ref}>
      <div className="container">
        <p className="eyebrow">Industries We Serve</p>
        <LandslideText
          className="industries__title display"
          text="Ready to talk? We speak Fluent IT"
          mode="words"
        />

        <div className="industries__list">
          {industries.map((ind, i) => (
            <article className="ind-row" key={ind.name}>
              <span className="ind-row__num">0{i + 1}</span>
              <div>
                <h3 className="ind-row__name">{ind.name}</h3>
                <p className="ind-row__copy">{ind.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
