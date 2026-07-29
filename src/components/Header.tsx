import { NavLink, Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navCategories } from "../data/catalog";
import "./Header.css";

type HeaderProps = {
  ready: boolean;
};

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", hasMenu: true },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ ready }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
    const close = () => {
      setOpen(false);
      setServicesOpen(false);
    };
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
      className={`header ${ready ? "header--ready" : ""} ${scrolled || open ? "header--solid" : ""}`}
      ref={rootRef}
    >
      <div className="header__beam" aria-hidden="true" />
      <div className="header__scan" aria-hidden="true" />
      <span className="header__spark header__spark--a" aria-hidden="true" />
      <span className="header__spark header__spark--b" aria-hidden="true" />

      <div className="header__bar">
        <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
          <img
            className="header__logo-img"
            src="/canitsm-logo.png"
            alt="CanITSM — We Speak Fluent IT"
            width={190}
            height={90}
          />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {links.map((l) =>
            l.hasMenu ? (
              <div
                key={l.to}
                className={`header__services ${servicesOpen ? "header__services--open" : ""}`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink
                  to={l.to}
                  className="header__link"
                  onFocus={() => setServicesOpen(true)}
                >
                  <span className="header__link-text">{l.label}</span>
                  <span className="header__link-glow" aria-hidden="true" />
                </NavLink>
                <div className="header__mega" role="menu">
                  {navCategories.map((cat) => (
                    <div key={cat.slug} className="header__mega-col">
                      <Link
                        to={`/services/${cat.slug}`}
                        className="header__mega-title"
                        onClick={() => setServicesOpen(false)}
                      >
                        {cat.label}
                      </Link>
                      {cat.children?.map((child) => (
                        <Link
                          key={child.slug}
                          to={`/services/${child.slug}`}
                          onClick={() => setServicesOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} className="header__link">
                <span className="header__link-text">{l.label}</span>
                <span className="header__link-glow" aria-hidden="true" />
              </NavLink>
            ),
          )}
        </nav>

        <div className="header__actions">
          <a className="header__mail" href="mailto:info@canitsm.com">
            info@canitsm.com
          </a>
          <Link to="/contact" className="header__cta">
            <span className="header__cta-pulse" aria-hidden="true" />
            Book a Consultation
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
          <div className="header__drawer-services">
            {navCategories.map((cat) => (
              <div key={cat.slug}>
                <Link to={`/services/${cat.slug}`} onClick={() => setOpen(false)}>
                  {cat.label}
                </Link>
                {cat.children?.map((child) => (
                  <Link
                    key={child.slug}
                    to={`/services/${child.slug}`}
                    className="header__drawer-child"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="header__cta header__cta--drawer"
            onClick={() => setOpen(false)}
          >
            Book a Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
