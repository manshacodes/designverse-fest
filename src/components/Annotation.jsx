import { motion } from "framer-motion";
import "./Annotation.css";

/* Wobbly, drawn-by-hand strokes — deliberately imperfect bezier curves. */
const MARKS = {
  se: {
    box: "0 0 74 62",
    paths: [
      "M3 7C24 9 45 20 57 44",
      "M57 45C52 40 47 37 42 36",
      "M57 45C56 38 56 32 58 26",
    ],
  },
  sw: {
    box: "0 0 74 62",
    paths: [
      "M71 7C50 9 29 20 17 44",
      "M17 45C22 40 27 37 32 36",
      "M17 45C18 38 18 32 16 26",
    ],
  },
  up: {
    box: "0 0 56 70",
    paths: [
      "M27 67C25 46 26 28 30 5",
      "M30 4C27 10 23 15 18 19",
      "M30 4C33 10 37 15 42 19",
    ],
  },
  underline: {
    box: "0 0 120 16",
    paths: ["M3 7C28 2 72 2 117 6", "M8 12C34 8 76 7 112 11"],
  },
};

export default function Annotation({
  children,
  mark = "se",
  className = "",
  style,
  delay = 0,
}) {
  const spec = MARKS[mark] ?? MARKS.se;

  return (
    <span className={`annot annot--${mark} ${className}`} style={style}>
      <span className="hand annot__text">{children}</span>
      <svg
        className="annot__mark"
        viewBox={spec.box}
        fill="none"
        aria-hidden="true"
      >
        {spec.paths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="var(--marker)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.45,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </svg>
    </span>
  );
}
