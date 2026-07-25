import { Link } from "react-router-dom";
import { services } from "../data/services";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />

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
          <p className="footer__credit">
            Secure · Scale · Lead
          </p>
        </div>
      </div>
    </footer>
  );
}
