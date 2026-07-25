import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LandslideText.css";

gsap.registerPlugin(ScrollTrigger);

type LandslideTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: "words" | "chars";
  scrub?: boolean | number;
  start?: string;
  end?: string;
};

export default function LandslideText({
  text,
  className = "",
  as: Tag = "h2",
  mode = "words",
  scrub = 1,
  start = "top 85%",
  end = "top 35%",
}: LandslideTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>(
      mode === "chars" ? ".rock-char" : ".rock-word",
    );

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          y: () => gsap.utils.random(120, 280),
          x: () => gsap.utils.random(-80, 80),
          rotate: () => gsap.utils.random(-35, 35),
          opacity: 0,
          scale: () => gsap.utils.random(0.7, 1.15),
        },
        {
          y: 0,
          x: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          stagger: {
            each: 0.045,
            from: "random",
          },
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: scrub === false ? false : scrub,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, mode, scrub, start, end]);

  const parts =
    mode === "chars"
      ? text.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i} className="rock-space">
              {" "}
            </span>
          ) : (
            <span key={i} className="rock-char">
              {ch}
            </span>
          ),
        )
      : text.split(" ").map((word, i) => (
          <span key={i} className="rock-word">
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        ));

  return (
    <Tag className={`landslide ${className}`} ref={ref as never}>
      {parts}
    </Tag>
  );
}
