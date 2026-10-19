import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reelPose } from "../lib/reelPose";
import Annotation from "./Annotation";
import { Sparkle } from "./Deco";
import "./Highlights.css";

gsap.registerPlugin(ScrollTrigger);

const ACTIVITIES = [
  { label: "UI/UX Workshop", note: "Figma systems · 2 hrs" },
  { label: "Branding Bootcamp", note: "Identity design · 2 hrs" },
  { label: "Motion & Illustration", note: "After Effects basics" },
  { label: "Live Build Sprint", note: "24 hrs · teams of 4" },
  { label: "Portfolio Reviews", note: "1:1 with mentors" },
  { label: "Design Talks", note: "8 speakers · main hall" },
  { label: "Studio Tours", note: "Partner studios, Delhi" },
  { label: "Closing Showcase", note: "Judged · Sunday 17:00" },
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

  const onPointerDown = (e) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
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
                <span className="reel-card__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="reel-card__body">
                  <span className="reel-card__label">{activity.label}</span>
                  <span className="reel-card__note">{activity.note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <Annotation mark="up" className="highlights__note" delay={0.3}>
          grab it, spin it
        </Annotation>
      </div>
    </section>
  );
}
