import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

  return (
    <header
      className={`header ${ready ? "header--ready" : ""} ${scrolled || open ? "header--solid" : ""}`}
    >
      <div className="header__bar">
        <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
          <span className="header__mark" aria-hidden="true" />
          <span className="header__logo">
            <span>CAN</span>
            <span className="header__logo-accent">ITSM</span>
          </span>
          <span className="header__tag">Consulting</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="header__link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__mail" href="mailto:info@canitsm.com">
            info@canitsm.com
          </a>
          <Link to="/contact" className="header__cta">
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
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="header__cta header__cta--drawer" onClick={() => setOpen(false)}>
            Book Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
