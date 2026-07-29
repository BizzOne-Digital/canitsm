import { useOutletContext } from "react-router-dom";
import Process from "../components/Process";
import { Link } from "react-router-dom";
import "./PageShell.css";

type Ctx = { introDone: boolean };

export default function ProcessPage() {
  const { introDone } = useOutletContext<Ctx>();

  return (
    <main className="page-shell">
      <section className="page-shell__hero container">
        <p className="eyebrow">Process</p>
        <h1 className="display page-shell__title">Discover. Design. Deliver.</h1>
        <p className="page-shell__lede">
          A clear engagement path from goals and risk to scoped delivery—whether you need security,
          migration, testing, DevSecOps or development.
        </p>
      </section>
      <Process ready={introDone} />
      <section className="page-shell__cta container">
        <Link className="btn" to="/contact">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
