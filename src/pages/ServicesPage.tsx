import { useLayoutEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/services";
import LandslideText from "../components/LandslideText";
import "./ServicesPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const railRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = railRef.current;
    if (!section) return;

    const track = section.querySelector<HTMLElement>(".svc-rail__track");
    if (!track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".svc-rail-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: i % 2 === 0 ? 80 : -80,
            rotate: i % 2 === 0 ? 4 : -4,
            opacity: 0.35,
          },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.75,
            },
          },
        );
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <LandslideText
            className="services-hero__title display"
            text="From strategy to support — we do IT right"
            mode="words"
          />
          <p className="services-hero__lede serif">
            At CanITSM, our services help Canadian businesses work smarter, remain secure, and
            scale confidently. Scroll to explore each offering — then open a service for the full
            details.
          </p>
        </div>
      </section>

      <section className="svc-rail" ref={railRef}>
        <div className="svc-rail__sticky">
          <p className="svc-rail__hint" aria-hidden="true">
            Scroll down to swipe →
          </p>
          <div className="svc-rail__track">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="svc-rail-card"
                state={{ enterFrom: svc.enterFrom }}
              >
                <span className="svc-rail-card__num">{svc.num}</span>
                <h2 className="svc-rail-card__title display">{svc.title}</h2>
                <p className="svc-rail-card__copy">{svc.short}</p>
                <span className="svc-rail-card__cta">View service →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="services-foot container">
        <p className="eyebrow">Ready to work together?</p>
        <h2 className="display">Start a practical partnership with CanITSM</h2>
        <Link className="btn" to="/contact">
          Book Free Consultation
        </Link>
      </section>

      {/* Detail drops on top of this same page — not a full page change */}
      <Outlet />
    </main>
  );
}
