import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Intro.css";

type IntroProps = {
  onComplete: () => void;
};

export default function Intro({ onComplete }: IntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          gsap.to(root, {
            autoAlpha: 0,
            duration: 0.6,
            onComplete,
          });
        },
      });

      gsap.set(".intro__curtain--top", { yPercent: -100 });
      gsap.set(".intro__curtain--bottom", { yPercent: 100 });
      gsap.set(".intro__curtain--left", { xPercent: -100 });
      gsap.set(".intro__curtain--right", { xPercent: 100 });
      gsap.set(".intro__aperture", { clipPath: "inset(48% 48% 48% 48%)" });

      tl.fromTo(
        ".intro__mark",
        { scale: 0.15, rotate: -720, opacity: 0, filter: "blur(24px)" },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "expo.out",
        },
      )
        .fromTo(
          ".intro__tag",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.7",
        )
        .to(".intro__mark", {
          scale: 1.2,
          rotate: 22,
          duration: 0.55,
          ease: "power2.in",
        })
        // Theater curtains slam shut into a square frame
        .to(".intro__curtain--top", { yPercent: 0, duration: 0.95 }, "curtains")
        .to(".intro__curtain--bottom", { yPercent: 0, duration: 0.95 }, "curtains")
        .to(".intro__curtain--left", { xPercent: 0, duration: 0.95 }, "curtains")
        .to(".intro__curtain--right", { xPercent: 0, duration: 0.95 }, "curtains")
        .to(".intro__brand-block", { opacity: 0, scale: 0.8, duration: 0.4 }, "-=0.25")
        // Square aperture holds, then expands like a stage reveal
        .to(".intro__aperture", {
          clipPath: "inset(14% 18% 14% 18%)",
          duration: 0.7,
          ease: "power3.inOut",
        })
        .to(".intro__aperture", {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.15,
          ease: "expo.inOut",
        })
        .to(
          [".intro__curtain--top", ".intro__curtain--bottom"],
          { yPercent: (i: number) => (i === 0 ? -110 : 110), duration: 1.1 },
          "-=0.65",
        )
        .to(
          [".intro__curtain--left", ".intro__curtain--right"],
          { xPercent: (i: number) => (i === 0 ? -110 : 110), duration: 1.1 },
          "<",
        )
        .to(".intro__flash", { opacity: 0.4, duration: 0.12 }, "-=0.4")
        .to(".intro__flash", { opacity: 0, duration: 0.5 });
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro__flash" />
      <div className="intro__stage">
        <div className="intro__brand-block">
          <div className="intro__mark">
            <span className="intro__can">CAN</span>
            <span className="intro__itsm">ITSM</span>
          </div>
          <p className="intro__tag">Consulting · Canada</p>
        </div>

        <div className="intro__aperture">
          <div className="intro__aperture-glow" />
        </div>

        <div className="intro__curtain intro__curtain--top" />
        <div className="intro__curtain intro__curtain--bottom" />
        <div className="intro__curtain intro__curtain--left" />
        <div className="intro__curtain intro__curtain--right" />
      </div>
    </div>
  );
}
