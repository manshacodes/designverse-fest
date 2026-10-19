import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reelPose } from "../lib/reelPose";
import Annotation from "./Annotation";
import { Sparkle } from "./Deco";
import "./Highlights.css";

gsap.registerPlugin(ScrollTrigger);

// simple stroke glyphs, one per block, drawn in the same silver as the type
const GLYPHS = {
  artboard: "M3 7h18M3 17h18M7 3v18M17 3v18",
  mark: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4",
  bezier: "M3 18c6 0 12-12 18-12M3 18h3M18 6h3M4.5 16.5v3M19.5 4.5v3",
  stopwatch: "M12 21a8 8 0 100-16 8 8 0 000 16zM12 9v4l2.5 2.5M9 2h6",
  sheets: "M7 4h10v16H7zM4 7v13h10",
  mic: "M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM6 11a6 6 0 0012 0M12 18v3",
  door: "M4 21V5l10-2v20M4 21h16M14 21V8h6v13M10 12h.8",
  trophy: "M7 4h10v5a5 5 0 01-10 0V4zM5 5h2M17 5h2M12 14v4M9 21h6",
};

const ACTIVITIES = [
  { label: "UI/UX Workshop", note: "Design systems in Figma", day: "Sat", time: "10:30", len: "2 hrs", cap: "60 seats", glyph: "artboard" },
  { label: "Design Talks", note: "Founders and studio leads", day: "Sat", time: "13:30", len: "90 min", cap: "Open", glyph: "mic" },
  { label: "Branding Bootcamp", note: "Brief to finished mark", day: "Sat", time: "15:00", len: "2 hrs", cap: "60 seats", glyph: "mark" },
  { label: "Motion & Illustration", note: "After Effects fundamentals", day: "Sat", time: "15:00", len: "2 hrs", cap: "40 seats", glyph: "bezier" },
  { label: "Live Build Sprint", note: "Team up, ship by Sunday", day: "Sat", time: "17:00", len: "24 hrs", cap: "25 teams", glyph: "stopwatch" },
  { label: "Studio Tours", note: "Partner studios across Delhi", day: "Sun", time: "10:00", len: "3 hrs", cap: "30 seats", glyph: "door" },
  { label: "Portfolio Reviews", note: "1:1 with working designers", day: "Sun", time: "11:30", len: "15 min", cap: "80 slots", glyph: "sheets" },
  { label: "Closing Showcase", note: "Judged, open to everyone", day: "Sun", time: "17:00", len: "60 min", cap: "Open", glyph: "trophy" },
];

const TOTAL = ACTIVITIES.length;

export default function Highlights() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  const formation = useMotionValue(0);
  const expansion = useMotionValue(0);
  const angleTarget = useRef(0);
  const angleSpring = useSpring(0, { stiffness: 110, damping: 24, mass: 0.6 });

  const [width, setWidth] = useState(900);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const scrollAngle = useRef(0);

  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      formation.set(1);
      expansion.set(1);
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(formation, 1, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        animate(expansion, 1, { duration: 0.75, ease: [0.65, 0, 0.2, 1] });
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, formation, expansion]);

  const cardSize = useMemo(() => {
    const w = Math.min(352, Math.max(168, width * 0.26));
    return { width: w, height: w * 1.4 };
  }, [width]);

  // radius follows card width so the plates sit shoulder to shoulder around
  // the ring rather than floating apart in the middle of the stage
  const radiusRange = useMemo(() => {
    const r = cardSize.width * 1.52;
    return [r * 0.42, r];
  }, [cardSize.width]);

  useEffect(() => {
    let raf;
    const tick = () => {
      if (!dragging.current && !reduceMotion && expansion.get() > 0.98) {
        angleTarget.current += 0.085;
      }
      angleSpring.set(angleTarget.current + scrollAngle.current);

      const angleOffset = angleSpring.get();
      const f = formation.get();
      const e = expansion.get();

      for (let i = 0; i < TOTAL; i += 1) {
        const node = cardRefs.current[i];
        if (!node) continue;
        const pose = reelPose({
          slot: i,
          total: TOTAL,
          formation: f,
          expansion: e,
          angleOffset,
          radiusRange,
          scaleRange: [0.68, 1],
        });
        node.style.transform = `translate(-50%, -50%) translate3d(${pose.x}px, 0, ${pose.z}px) rotateY(${pose.rotateY}deg) scale(${pose.scale})`;
        node.style.opacity = pose.opacity;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(${-18 * (1 - e)}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [formation, expansion, angleSpring, radiusRange, reduceMotion]);

  // scroll scrubs the ring round, the way the GSAP scroll demos scrub a timeline
  useEffect(() => {
    if (reduceMotion) return undefined;
    const el = stageRef.current;
    if (!el) return undefined;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollAngle.current = (self.progress - 0.5) * 190;
      },
    });

    return () => st.kill();
  }, [reduceMotion]);

  // Touch needs its own path. Pointer events get cancelled the moment the
  // browser decides the gesture is a scroll, so horizontal swipes never
  // reached the ring on a phone.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    let startX = 0;
    let startY = 0;
    let lastTouchX = 0;
    let axis = null;

    const onStart = (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      lastTouchX = t.clientX;
      axis = null;
    };

    const onMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      if (axis === null) {
        const dx = Math.abs(t.clientX - startX);
        const dy = Math.abs(t.clientY - startY);
        if (dx > 6 || dy > 6) axis = dx > dy ? "x" : "y";
      }
      if (axis === "x") {
        e.preventDefault();
        dragging.current = true;
        angleTarget.current += (t.clientX - lastTouchX) * 0.42;
        lastTouchX = t.clientX;
      }
    };

    const onEnd = () => {
      dragging.current = false;
      axis = null;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  const step = (dir) => {
    angleTarget.current += dir * (360 / TOTAL);
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "touch") return;
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (e.pointerType === "touch") return;
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    angleTarget.current += dx * 0.32;
    angleSpring.set(angleTarget.current);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="highlights" id="highlights" ref={sectionRef}>
      <div className="section">
        <div className="section-inner highlights__head">
          <div>
            <span className="mono">02 — What happens</span>
            <h2 className="highlights__title">Where the two days go</h2>
          </div>
          <p className="highlights__blurb">
            Eight blocks across Saturday and Sunday. Pick a track and stay in
            it, or move between all four — nothing is locked, and nothing
            clashes with the sprint.
          </p>
        </div>
      </div>

      <div className="highlights__stage-wrap">
        <Sparkle size={30} className="sparkle--pulse hl__spark hl__spark--a" />
        <Sparkle size={16} className="sparkle--spin hl__spark hl__spark--b" />
        <Sparkle size={22} className="sparkle--pulse hl__spark hl__spark--c" />
        <div
          className="reel-stage"
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="reel-ring" ref={ringRef}>
            {ACTIVITIES.map((activity, i) => (
              <a
                key={activity.label}
                href="#register"
                className={`reel-card ${i % 4 === 0 ? "reel-card--chrome" : ""}`}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                style={{ width: cardSize.width, height: cardSize.height }}
              >
                <svg
                  className="reel-card__watermark"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={GLYPHS[activity.glyph]}
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="reel-card__day">{activity.day}</span>

                <span className="reel-card__top">
                  <span className="reel-card__index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    className="reel-card__glyph"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d={GLYPHS[activity.glyph]}
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className="reel-card__body">
                  <span className="reel-card__label">{activity.label}</span>
                  <span className="reel-card__note">{activity.note}</span>
                  <span className="reel-card__meta">
                    <span>
                      <em>When</em>
                      {activity.day} {activity.time}
                    </span>
                    <span>
                      <em>Runs</em>
                      {activity.len}
                    </span>
                    <span>
                      <em>Space</em>
                      {activity.cap}
                    </span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="reel-controls">
          <button
            type="button"
            className="reel-btn"
            onClick={() => step(-1)}
            aria-label="Previous session"
          >
            ←
          </button>
          <span className="mono reel-controls__hint">Swipe or tap</span>
          <button
            type="button"
            className="reel-btn"
            onClick={() => step(1)}
            aria-label="Next session"
          >
            →
          </button>
        </div>

        <Annotation mark="up" className="highlights__note" delay={0.3}>
          grab it, spin it
        </Annotation>
      </div>
    </section>
  );
}
