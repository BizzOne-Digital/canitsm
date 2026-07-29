import FluentIT from "../components/FluentIT";
import RevealChamber from "../components/RevealChamber";
import { Link, useOutletContext } from "react-router-dom";
import "./PageShell.css";

type Ctx = { introDone: boolean };

export default function FluentPage() {
  const { introDone } = useOutletContext<Ctx>();

  return (
    <main className="page-shell">
      <FluentIT />
      <RevealChamber
        ready={introDone}
        id="fluent-page-reveal"
        variant="neon"
        content={{
          kicker: "The Fluent IT Advantage",
          lines: ["WE SPEAK IT", "YOU SPEAK", "BUSINESS"],
          body: "Stop translating technical headaches. We bridge complex infrastructure and your bottom line — no jargon, just results.",
        }}
      />
      <section className="page-shell__cta container">
        <Link className="btn" to="/contact">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
