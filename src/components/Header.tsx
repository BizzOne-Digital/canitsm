import { NavLink, Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Header.css";

type HeaderProps = {
  ready: boolean;
};

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/fluent-it", label: "Fluent IT" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ ready }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useLayoutEffect(() => {
    if (!ready || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".header__brand, .header__link, .header__cta, .header__burger", {
        y: -28,
        opacity: 0,
        stagger: 0.06,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.to(".header__scan", {
        xPercent: 120,
        duration: 3.2,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 2.5,
      });

      gsap.to(".header__spark", {
        opacity: 0.15,
        scale: 1.4,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <header
      ref={rootRef}
      className={`header ${ready ? "header--ready" : ""} ${scrolled || open ? "header--solid" : ""}`}
    >
      <div className="header__beam" aria-hidden="true" />
      <div className="header__scan" aria-hidden="true" />
      <span className="header__spark header__spark--a" aria-hidden="true" />
      <span className="header__spark header__spark--b" aria-hidden="true" />

      <div className="header__bar">
        <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
          <span className="header__mark" aria-hidden="true" />
          <span className="header__logo">
            <span className="header__logo-can">CAN</span>
            <span className="header__logo-accent">ITSM</span>
          </span>
          <span className="header__tag">Consulting</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="header__link">
              <span className="header__link-text">{l.label}</span>
              <span className="header__link-glow" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__mail" href="mailto:info@canitsm.com">
            info@canitsm.com
          </a>
          <Link to="/contact" className="header__cta">
            <span className="header__cta-pulse" aria-hidden="true" />
            Book Free Consultation
          </Link>
          <button
            type="button"
            className={`header__burger ${open ? "header__burger--open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`header__drawer ${open ? "header__drawer--open" : ""}`}>
        <nav className="header__drawer-nav" aria-label="Mobile">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              <span className="header__drawer-num">0{i + 1}</span>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="header__cta header__cta--drawer"
            onClick={() => setOpen(false)}
          >
            Book Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
