import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  ready: boolean;
};

export default function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero__line", {
        y: 80,
        opacity: 0,
        rotate: 4,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.15,
      });

      gsap.from(".hero__cta-row", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });

      gsap.to(".hero__orb", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero__plane", {
        scale: 1.15,
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__plane" aria-hidden="true" />
      <div className="hero__orb hero__orb--a" aria-hidden="true" />
      <div className="hero__orb hero__orb--b" aria-hidden="true" />

      <div className="hero__content container">
        <p className="eyebrow hero__line">Canada-based IT Consulting</p>
        <h1 className="hero__title display hero__line" aria-label="CanITSM">
          <span className="hero__brand-can">CAN</span>
          <span className="hero__brand-itsm">ITSM</span>
        </h1>
        <LandslideText
          as="p"
          className="hero__lede serif"
          text="Modernize. Secure. Scale. Proactive IT for ambitious Canadian businesses."
          mode="words"
          scrub={0.8}
          start="top 90%"
          end="top 55%"
        />
        <div className="hero__cta-row">
          <Link className="btn" to="/contact">
            Book Free Consultation
          </Link>
          <Link className="btn btn-ghost" to="/services">
            Explore Services
          </Link>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
