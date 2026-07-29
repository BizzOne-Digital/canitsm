import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Nav.css";

type NavProps = {
  ready: boolean;
};

export default function Nav({ ready }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${ready ? "nav--ready" : ""} ${scrolled ? "nav--scrolled" : ""}`}>
      <NavLink to="/" className="nav__brand" end>
        <span>CAN</span>
        <span className="nav__accent">ITSM</span>
      </NavLink>
      <nav className="nav__links" aria-label="Primary">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/contact" className="nav__cta">
          Book a Consultation
        </NavLink>
      </nav>
    </header>
  );
}
