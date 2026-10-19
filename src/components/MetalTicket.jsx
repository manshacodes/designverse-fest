import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./MetalTicket.css";

/**
 * The pass itself, milled out of metal. Tilts toward the pointer and the
 * specular highlight tracks it, so the surface reads as a real object.
 */
export default function MetalTicket({ drop = false }) {
  const ref = useRef(null);

  const rx = useSpring(0, { stiffness: 130, damping: 17, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 130, damping: 17, mass: 0.5 });
  const sx = useSpring(50, { stiffness: 110, damping: 20 });
  const sy = useSpring(35, { stiffness: 110, damping: 20 });

  const sheen = useTransform(
    [sx, sy],
    ([a, b]) =>
      `radial-gradient(520px circle at ${a}% ${b}%, rgba(255,255,255,0.42), rgba(255,255,255,0.11) 32%, rgba(255,255,255,0) 64%)`
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
      sx.set(Math.max(-25, Math.min(125, nx * 100)));
      sy.set(Math.max(-25, Math.min(125, ny * 100)));
      ry.set(Math.max(-17, Math.min(17, (nx - 0.5) * 30)));
      rx.set(Math.max(-13, Math.min(13, (0.5 - ny) * 22)));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rx, ry, sx, sy]);

  const entrance = drop
    ? {
        initial: { x: 220, y: -340, rotate: 16, opacity: 0 },
        animate: { x: 0, y: 0, rotate: -2.5, opacity: 1 },
        transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
      }
    : {
        initial: { opacity: 0, y: 24, rotate: -2.5 },
        whileInView: { opacity: 1, y: 0, rotate: -2.5 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div className="ticket-stage" ref={ref}>
      <motion.div className="ticket-drop" {...entrance}>
        <motion.div className="ticket" style={{ rotateX: rx, rotateY: ry }}>
          <div className="ticket__face">
            <motion.div className="ticket__sheen" style={{ backgroundImage: sheen }} />

            <div className="ticket__main">
              <span className="ticket__kicker">Admit one · student pass</span>

              <span className="ticket__name">DESIGNVERSE</span>

              <div className="ticket__meta">
                <span className="ticket__cell">
                  <em>Dates</em>14–15 MAR 2026
                </span>
                <span className="ticket__cell">
                  <em>Doors</em>10:00 IST
                </span>
                <span className="ticket__cell">
                  <em>Venue</em>IGDTUW, Delhi
                </span>
              </div>
            </div>

            <div className="ticket__perf" aria-hidden="true" />

            <div className="ticket__stub">
              <span className="ticket__stub-code">DV—26—0001</span>
              <span className="ticket__stub-ed">ED. 01</span>
            </div>

            <div className="ticket__rim" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
