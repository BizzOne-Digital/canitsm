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
        <h1 className="display page-shell__title">Clarity. Partnership. Purpose.</h1>
        <p className="page-shell__lede">
          Transforming your IT infrastructure is a strategic journey — and we walk it with you.
        </p>
      </section>
      <Process ready={introDone} />
      <section className="page-shell__cta container">
        <Link className="btn" to="/contact">
          Start with a consultation
        </Link>
      </section>
    </main>
  );
}
