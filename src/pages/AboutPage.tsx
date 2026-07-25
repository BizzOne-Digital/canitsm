import About from "../components/About";
import Industries from "../components/Industries";
import { Link } from "react-router-dom";
import "./PageShell.css";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <About />
      <Industries />
      <section className="page-shell__cta container">
        <Link className="btn" to="/contact">
          Book Free Consultation
        </Link>
      </section>
    </main>
  );
}
