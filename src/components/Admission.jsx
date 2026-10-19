import { motion } from "framer-motion";
import Annotation from "./Annotation";
import { Sparkle } from "./Deco";
import "./Admission.css";

const TERMS = [
  ["Cost", "Free", "No fee for any attendee, either campus"],
  ["Seats", "250", "First come, allocated on registration"],
  ["Guests", "40", "Reserved for students from other campuses"],
  ["Closes", "10 Mar 2026", "Or when the 250 are gone"],
  ["Bring", "Laptop + ID", "Student ID is checked at the door"],
  ["Teams", "Formed on site", "You don't need one to register"],
];

export function openPass() {
  window.dispatchEvent(new CustomEvent("open-pass"));
}

export default function Admission() {
  return (
    <section className="section admission" id="register">
      <div className="section-inner">
        <div className="admission__head">
          <div>
            <span className="mono">05 — Admission</span>
            <h2 className="admission__title">Getting in</h2>
          </div>
          <p className="admission__blurb">
            Registration takes about twenty seconds and costs nothing. You'll
            get a pass code on the spot — that code is what gets scanned at
            the door on the fourteenth.
          </p>
        </div>

        <dl className="terms">
          {TERMS.map(([label, value, note], i) => (
            <motion.div
              className="term"
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(i * 0.05, 0.3),
              }}
            >
              <dt className="mono">{label}</dt>
              <dd className="term__value">{value}</dd>
              <dd className="term__note">{note}</dd>
            </motion.div>
          ))}
        </dl>

        <Sparkle size={28} className="sparkle--pulse adm__spark adm__spark--a" />
        <Sparkle size={17} className="sparkle--spin adm__spark adm__spark--b" />

        <div className="admission__cta">
          <button type="button" className="btn btn--metal" onClick={openPass}>
            Claim your pass
          </button>
          <Annotation mark="se" className="admission__note" delay={0.1}>
            flips the pass open
          </Annotation>
        </div>
      </div>
    </section>
  );
}
