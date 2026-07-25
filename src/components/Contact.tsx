import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandslideText from "./LandslideText";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact__panel",
        { y: 120, scale: 0.92, opacity: 0, rotate: -3 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotate: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact__panel",
            start: "top 90%",
            end: "top 45%",
            scrub: 1.1,
          },
        },
      );

      gsap.fromTo(
        ".contact__meta > *",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact__meta",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container contact__layout">
        <div>
          <p className="eyebrow">Contact</p>
          <LandslideText
            className="contact__title display"
            text="Let's build something that actually works"
            mode="words"
          />
          <p className="contact__lede serif">
            Free IT consultation. No strings. Just strategy. We'll assess your environment and
            show you how to modernize, secure, and scale.
          </p>
        </div>

        <div className="contact__panel">
          <h3 className="contact__panel-title">Start the conversation</h3>
          <form
            className="contact__form"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "mailto:info@canitsm.com";
            }}
          >
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@company.com" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} placeholder="Tell us about your IT goals" />
            </label>
            <button type="submit" className="btn">
              Book Free Consultation
            </button>
          </form>
        </div>

        <div className="contact__meta">
          <a href="mailto:info@canitsm.com">info@canitsm.com</a>
          <p>24/7 Full Time Support</p>
          <p>Available Worldwide</p>
        </div>
      </div>
    </section>
  );
}
