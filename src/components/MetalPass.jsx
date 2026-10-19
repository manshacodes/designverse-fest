import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./MetalPass.css";

export default function MetalPass() {
  const ref = useRef(null);

  const px = useMotionValue(50);
  const py = useMotionValue(40);

  const rx = useSpring(0, { stiffness: 140, damping: 18, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 140, damping: 18, mass: 0.5 });
  const sx = useSpring(50, { stiffness: 120, damping: 20 });
  const sy = useSpring(40, { stiffness: 120, damping: 20 });

  const sheen = useTransform(
    [sx, sy],
    ([a, b]) =>
      `radial-gradient(460px circle at ${a}% ${b}%, rgba(255,255,255,0.40), rgba(255,255,255,0.10) 34%, rgba(255,255,255,0) 66%)`
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      px.set(nx * 100);
      py.set(ny * 100);
      sx.set(Math.max(-30, Math.min(130, nx * 100)));
      sy.set(Math.max(-30, Math.min(130, ny * 100)));
      ry.set(Math.max(-15, Math.min(15, (nx - 0.5) * 26)));
      rx.set(Math.max(-12, Math.min(12, (0.5 - ny) * 20)));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, rx, ry, sx, sy]);

  return (
    <div className="pass-stage" ref={ref}>
      <motion.div
        className="pass"
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 26, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <div className="pass__face">
          <motion.div className="pass__sheen" style={{ backgroundImage: sheen }} />

          <div className="pass__row pass__row--top">
            <span className="pass__brand">DESIGNVERSE</span>
            <span className="pass__ed">ED. 01</span>
          </div>

          <div className="pass__chip" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="pass__row pass__row--bottom">
            <div className="pass__block">
              <span className="pass__key">ADMIT</span>
              <span className="pass__val">ONE STUDENT</span>
            </div>
            <div className="pass__block">
              <span className="pass__key">DATES</span>
              <span className="pass__val">14–15 MAR 2026</span>
            </div>
          </div>

          <div className="pass__stub" aria-hidden="true">
            <span className="pass__stub-code">DV—26</span>
          </div>

          <div className="pass__perf" aria-hidden="true" />
          <div className="pass__rim" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  );
}
