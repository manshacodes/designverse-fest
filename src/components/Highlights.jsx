import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useSpring } from "framer-motion";
import { reelPose } from "../lib/reelPose";
import "./Highlights.css";

const ACTIVITIES = [
  { label: "UI/UX Workshop", note: "Figma systems · 2 hrs" },
  { label: "Branding Bootcamp", note: "Identity design · 2 hrs" },
  { label: "Motion & Illustration", note: "After Effects basics" },
  { label: "Live Build Sprint", note: "24 hrs · teams of 4" },
  { label: "Portfolio Reviews", note: "1:1 with mentors" },
  { label: "Design Talks", note: "8 speakers · main hall" },
  { label: "Studio Tours", note: "Partner studios, Delhi" },
  { label: "Closing Showcase", note: "Judged · Sunday 5 PM" },
];

const TOTAL = ACTIVITIES.length;
const COLORS = ["red", "amber", "blue"];

export default function Highlights() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  const formation = useMotionValue(0);
  const expansion = useMotionValue(0);
  const angleTarget = useRef(0);
  const angleSpring = useSpring(0, { stiffness: 90, damping: 22, mass: 0.7 });

  const [width, setWidth] = useState(900);
  const dragging = useRef(false);
  const lastX = useRef(0);

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
      duration: 1.7,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        animate(expansion, 1, { duration: 1.1, ease: [0.5, 0, 0.15, 1] });
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, formation, expansion]);

  const radiusRange = useMemo(() => {
    const r = clampNum(width * 0.36, 150, 520);
    return [r * 0.42, r];
  }, [width]);

  const cardSize = useMemo(() => {
    const w = clampNum(width * 0.19, 112, 190);
    return { width: w, height: w * 1.3 };
  }, [width]);

  useEffect(() => {
    let raf;
    const tick = () => {
      if (!dragging.current && !reduceMotion && expansion.get() > 0.98) {
        angleTarget.current += 0.1;
        angleSpring.set(angleTarget.current);
      }

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
          scaleRange: [0.55, 1],
        });
        node.style.transform = `translate(-50%, -50%) translate3d(${pose.x}px, 0, ${pose.z}px) rotateY(${pose.rotateY}deg) scale(${pose.scale})`;
        node.style.opacity = pose.opacity;
      }

      if (ringRef.current) {
        const tilt = -16 * (1 - e);
        ringRef.current.style.transform = `rotateX(${tilt}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [formation, expansion, angleSpring, radiusRange, reduceMotion]);

  const onPointerDown = (e) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    angleTarget.current += dx * 0.35;
    angleSpring.set(angleTarget.current);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="section highlights" id="highlights" ref={sectionRef}>
      <div className="section-inner">
        <p className="eyebrow">Event overview</p>
        <h2 className="highlights__title">Where the two days go</h2>
        <p className="highlights__hint">Drag to look around</p>

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
                className={`reel-card reel-card--${COLORS[i % COLORS.length]}`}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                style={{ width: cardSize.width, height: cardSize.height }}
              >
                <span className="reel-card__index">
                  {String(i + 1).padStart(2, "0")}/
                  {String(TOTAL).padStart(2, "0")}
                </span>
                <span className="reel-card__label">{activity.label}</span>
                <span className="reel-card__note">{activity.note}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function clampNum(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
