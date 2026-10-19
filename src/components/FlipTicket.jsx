import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./FlipTicket.css";

const TRACKS = ["UI/UX", "Branding", "Motion", "Product"];

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DV26-${code}`;
}

export default function FlipTicket() {
  const stageRef = useRef(null);
  const cardRef = useRef(null);

  const [flipped, setFlipped] = useState(false);
  // once the turn has landed we drop out of 3D entirely: hit-testing through a
  // rotated, mirrored plane is unreliable and the form stops taking clicks
  const [settled, setSettled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [code] = useState(makeCode);
  const [height, setHeight] = useState(270);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    track: TRACKS[0],
  });

  // cursor tilt, summed with the flip so both can act on the same axis
  const tiltX = useSpring(0, { stiffness: 130, damping: 17, mass: 0.5 });
  const tiltY = useSpring(0, { stiffness: 130, damping: 17, mass: 0.5 });
  const flipY = useSpring(0, { stiffness: 85, damping: 16, mass: 0.9 });
  const sx = useMotionValue(50);
  const sy = useMotionValue(35);
  const sxS = useSpring(sx, { stiffness: 110, damping: 20 });
  const syS = useSpring(sy, { stiffness: 110, damping: 20 });

  const rotateY = useTransform([flipY, tiltY], ([f, t]) => f + t);
  const sheen = useTransform(
    [sxS, syS],
    ([a, b]) =>
      `radial-gradient(520px circle at ${a}% ${b}%, rgba(255,255,255,0.42), rgba(255,255,255,0.11) 32%, rgba(255,255,255,0) 64%)`
  );

  useEffect(() => {
    if (!flipped) {
      setSettled(false);
      flipY.set(0);
      return undefined;
    }
    flipY.set(180);
    const t = window.setTimeout(() => {
      // jump (not animate) back to 0 as the face's own 180deg is removed in the
      // same commit, so the card looks identical but is flat and clickable
      flipY.jump(0);
      setSettled(true);
    }, 820);
    return () => window.clearTimeout(t);
  }, [flipped, flipY]);

  // front is a ticket; the form side needs room, so the card grows as it turns
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.getBoundingClientRect().width || 440;
      setHeight(flipped ? Math.max(w / 1.72, 470) : w / 1.72);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [flipped]);

  useEffect(() => {
    const el = stageRef.current;
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
      tiltY.set(Math.max(-14, Math.min(14, (nx - 0.5) * 26)));
      tiltX.set(Math.max(-11, Math.min(11, (0.5 - ny) * 19)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [sx, sy, tiltX, tiltY]);

  const open = useCallback(() => {
    setFlipped(true);
    const lenis = window.__lenis;
    if (lenis && stageRef.current) {
      lenis.scrollTo(stageRef.current, { offset: -110, duration: 1.1 });
    } else {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  useEffect(() => {
    const handler = () => open();
    window.addEventListener("open-pass", handler);
    return () => window.removeEventListener("open-pass", handler);
  }, [open]);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`ticket-stage ${settled ? "is-flat" : ""}`} ref={stageRef}>
      <motion.div
        className="ticket-drop"
        initial={{ x: 210, y: -330, rotate: 15, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: flipped ? 0 : -2.5, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        <motion.div
          className={`ticket ${flipped ? "is-flipped" : ""} ${
            settled ? "is-settled" : ""
          }`}
          ref={cardRef}
          style={settled ? { height } : { rotateX: tiltX, rotateY, height }}
        >
          {/* ---------- front: the pass ---------- */}
          <div className="ticket__face ticket__face--front">
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

            <button
              type="button"
              className="ticket__hit"
              aria-expanded={flipped}
              onClick={open}
            >
              <span className="ticket__hit-label">Tap to fill it in</span>
            </button>
          </div>

          {/* ---------- back: the form ---------- */}
          <div className="ticket__face ticket__face--back">
            <div className="ticket__rim" aria-hidden="true" />

            {submitted ? (
              <div className="ticket-form__done">
                <span className="mono">Admitted</span>
                <p className="ticket-form__code">{code}</p>
                <p className="ticket-form__done-note">
                  Screenshot this. A copy would normally reach{" "}
                  {form.email || "your inbox"} within the hour.
                </p>
                <button
                  type="button"
                  className="ticket__back-link"
                  onClick={() => setFlipped(false)}
                >
                  ← Back to the pass
                </button>
              </div>
            ) : (
              <form className="ticket-form" onSubmit={onSubmit}>
                <div className="ticket-form__head">
                  <span className="mono">Registration · free</span>
                  <button
                    type="button"
                    className="ticket__back-link"
                    onClick={() => setFlipped(false)}
                  >
                    ← Back
                  </button>
                </div>

                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    id="pass-name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Full name"
                  />
                </label>

                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    id="pass-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@igdtuw.ac.in"
                  />
                </label>

                <label className="field">
                  <span className="field__label">Phone</span>
                  <input
                    id="pass-phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="10 digits"
                  />
                </label>

                <fieldset className="tracks">
                  <legend className="field__label">Track</legend>
                  <div className="tracks__options">
                    {TRACKS.map((track) => (
                      <label key={track} className="tracks__chip">
                        <input
                          type="radio"
                          name="track"
                          value={track}
                          checked={form.track === track}
                          onChange={update("track")}
                        />
                        {track}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button type="submit" className="ticket-form__submit">
                  Issue my pass
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
