import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./MetalCursor.css";

export default function MetalCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  // the ball lags behind the pointer; the ring tracks it exactly
  const ballX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.55 });
  const ballY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return undefined;

    setEnabled(true);
    document.documentElement.classList.add("has-metal-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const el = e.target;
      setHot(
        !!(el instanceof Element && el.closest("a, button, input, label, .reel-stage"))
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-metal-cursor");
    };
  }, [x, y, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className={`metal-ball ${hot ? "is-hot" : ""}`}
        aria-hidden="true"
        style={{ x: ballX, y: ballY }}
      />
      <motion.div
        className="metal-ring"
        aria-hidden="true"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
