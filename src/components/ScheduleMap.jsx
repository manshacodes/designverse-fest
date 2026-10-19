import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValue, useMotionValueEvent } from "framer-motion";
import Annotation from "./Annotation";
import { Sparkle } from "./Deco";
import "./ScheduleMap.css";

const STOPS = [
  { day: "sat", time: "09:30", title: "Doors & check-in", note: "Pass code scanned at the desk" },
  { day: "sat", time: "10:00", title: "Opening", note: "How the two days run" },
  { day: "sat", time: "10:30", title: "Workshop I", note: "UI/UX systems in Figma" },
  { day: "sat", time: "12:30", title: "Lunch & stalls", note: "Partner studios, courtyard" },
  { day: "sat", time: "13:30", title: "Talks", note: "Founders and studio leads" },
  { day: "sat", time: "15:00", title: "Workshop II", note: "Branding and motion" },
  { day: "sat", time: "17:00", title: "Sprint opens", note: "Form a team, pick a brief" },
  { day: "sat", time: "18:00", title: "Day one close", note: "Sprint runs overnight" },
  { day: "sun", time: "09:00", title: "Sprint check-in", note: "Mentors on the floor" },
  { day: "sun", time: "10:00", title: "Workshop III", note: "Prototyping and handoff" },
  { day: "sun", time: "11:30", title: "Portfolio reviews", note: "1:1, fifteen minutes" },
  { day: "sun", time: "13:00", title: "Lunch", note: "Courtyard" },
  { day: "sun", time: "14:00", title: "Submissions close", note: "Hard cut-off" },
  { day: "sun", time: "15:00", title: "Showcase setup", note: "Boards up in the main hall" },
  { day: "sun", time: "17:00", title: "Closing showcase", note: "Judged, open to all" },
  { day: "sun", time: "18:00", title: "Wrap", note: "Doors close at 18:30" },
];

/** Smooth S-curve through the stops, with vertical tangents at each one. */
function buildPath(points) {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const bend = (b.y - a.y) * 0.5;
    d += ` C ${a.x} ${a.y + bend}, ${b.x} ${b.y - bend}, ${b.x} ${b.y}`;
  }
  return d;
}

export default function ScheduleMap() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const pathRef = useRef(null);

  const [narrow, setNarrow] = useState(false);
  const [marker, setMarker] = useState({ x: 50, y: 0 });
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setNarrow(entry.contentRect.width < 720);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // stops laid out down the map; wide screens snake, narrow ones run straight
  const points = useMemo(() => {
    const n = STOPS.length;
    return STOPS.map((stop, i) => {
      const y = ((i + 0.6) / n) * 100;
      if (narrow) return { x: 9, y, side: "right", ...stop };
      const side = i % 2 === 0 ? "left" : "right";
      const x = side === "left" ? 34 : 66;
      return { x, y, side, ...stop };
    });
  }, [narrow]);

  const d = useMemo(() => buildPath(points), [points]);

  // dash driven off the path's real length — pathLength scaling is unreliable
  // once the viewBox is stretched and the stroke is non-scaling
  const [pathLen, setPathLen] = useState(0);
  const dashOffset = useMotionValue(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLen(len);
    dashOffset.set(len * (1 - scrollYProgress.get()));
  }, [d, dashOffset, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const path = pathRef.current;
    if (!path) return;
    const clamped = Math.max(0, Math.min(1, p));
    const len = path.getTotalLength();
    dashOffset.set(len * (1 - clamped));
    const pt = path.getPointAtLength(clamped * len);
    setMarker({ x: pt.x, y: pt.y });
    setReached(points.filter((stop) => stop.y <= pt.y + 1.2).length);
  });

  return (
    <section className="section schedule-map" id="schedule" ref={sectionRef}>
      <div className="section-inner">
        <div className="schedule-map__head">
          <div>
            <span className="mono">03 — Running order</span>
            <h2 className="schedule-map__title">Walk the two days</h2>
          </div>
          <p className="schedule-map__blurb">
            Sixteen stops from the front desk on Saturday morning to the doors
            closing on Sunday evening. Scroll and the route draws itself —
            every stop you pass lights up.
          </p>
        </div>

        <div className="schedule-map__legend">
          <span className="mono">
            <i className="dot dot--sat" /> Sat 14 Mar
          </span>
          <span className="mono">
            <i className="dot dot--sun" /> Sun 15 Mar
          </span>
          <span className="mono schedule-map__progress">
            {String(Math.min(reached, STOPS.length)).padStart(2, "0")} / {STOPS.length} stops
          </span>
        </div>

        <div className={`map ${narrow ? "is-narrow" : ""}`} ref={mapRef}>
          <svg
            className="map__svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="map__route-bed"
              d={d}
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              ref={pathRef}
              className="map__route"
              d={d}
              vectorEffect="non-scaling-stroke"
              strokeDasharray={pathLen || undefined}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          <span
            className="map__marker"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            aria-hidden="true"
          />

          <ol className="map__stops">
            {points.map((stop, i) => (
              <li
                key={stop.time + stop.title}
                className={`stop stop--${stop.side} stop--${stop.day} ${
                  i < reached ? "is-reached" : ""
                }`}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              >
                <span className="stop__peg" aria-hidden="true" />
                <span className="stop__card">
                  <span className="stop__time">{stop.time}</span>
                  <span className="stop__title">{stop.title}</span>
                  <span className="stop__note">{stop.note}</span>
                </span>
              </li>
            ))}
          </ol>

          <Sparkle size={26} className="sparkle--pulse map__spark map__spark--a" />
          <Sparkle size={15} className="sparkle--spin map__spark map__spark--b" />
          <Sparkle size={20} className="sparkle--pulse map__spark map__spark--c" />

          <Annotation mark="se" className="map__note" delay={0.2}>
            the sprint runs overnight
          </Annotation>
        </div>
      </div>
    </section>
  );
}
