import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambleText({
  text,
  as: Tag = "span",
  duration = 1.1,
  delay = 0,
  className,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      el.textContent = text;
      return undefined;
    }

    const tween = gsap.to(el, {
      duration,
      delay,
      ease: "none",
      scrambleText: {
        text,
        chars: "upper",
        revealDelay: 0.08,
        speed: 0.35,
      },
    });

    return () => tween.kill();
  }, [text, duration, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
