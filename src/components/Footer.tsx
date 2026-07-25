import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/services";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer__mega-word",
        {
          y: 120,
          rotate: () => gsap.utils.random(-18, 18),
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          stagger: { each: 0.08, from: "random" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer__mega",
            start: "top 90%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".footer__col, .footer__brand-block",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer__top",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      gsap.to(".footer__marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });

      gsap.to(".footer__float", {
        y: "+=24",
        x: "+=12",
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.7,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__glow" aria-hidden="true" />
      <div className="footer__float footer__float--a" aria-hidden="true" />
      <div className="footer__float footer__float--b" aria-hidden="true" />

      <div className="footer__mega" aria-hidden="true">
        <span className="footer__mega-word">SECURE</span>
        <span className="footer__mega-word">SCALE</span>
        <span className="footer__mega-word">LEAD</span>
      </div>

      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__marquee-track">
          <span>FLUENT IT · 24/7 SUPPORT · CANADA · CLOUD · CYBER · CANITSM · </span>
          <span>FLUENT IT · 24/7 SUPPORT · CANADA · CLOUD · CYBER · CANITSM · </span>
        </div>
      </div>

      <div className="footer__top container">
        <div className="footer__brand-block">
          <Link to="/" className="footer__logo">
            <span>CAN</span>
            <span className="footer__logo-accent">ITSM</span>
          </Link>
          <p className="footer__blurb">
            Canada-based IT consulting. We modernize, secure, and scale technology for ambitious
            businesses — with Fluent IT, not jargon.
          </p>
          <Link to="/contact" className="btn footer__cta">
            <span className="footer__cta-shine" aria-hidden="true" />
            Book Free Consultation
          </Link>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h3 className="footer__heading">Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/process">Process</Link>
            <Link to="/fluent-it">Fluent IT</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Services</h3>
            {services.slice(0, 4).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} state={{ enterFrom: s.enterFrom }}>
                {s.title}
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <a href="mailto:info@canitsm.com">info@canitsm.com</a>
            <p>24/7 Full Time Support</p>
            <p>Available Worldwide</p>
            <p className="footer__note">Free IT consultation — no strings, just strategy.</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} CanITSM Consulting. All rights reserved.</p>
          <p className="footer__credit">Secure · Scale · Lead</p>
        </div>
      </div>
    </footer>
  );
}
