import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Annotation from "./Annotation";
import { Sparkle, Rivets } from "./Deco";
import "./Admission.css";

const DOORS = new Date("2027-03-13T10:00:00+05:30");
const SEATS_TOTAL = 250;
const SEATS_TAKEN = 187;

const TERMS = [
  ["Cost", "Free", "No fee for any attendee, either campus"],
  ["Guests", "40", "Reserved for students from other campuses"],
  ["Closes", "9 Mar 2027", "Or when the 250 are gone"],
  ["Bring", "Laptop + ID", "Student ID is checked at the door"],
];

const FAQS = [
  [
    "Do I need a portfolio to register?",
    "No. DesignVerse is open to every year and every branch, with no portfolio, no prior experience and no selection round.",
  ],
  [
    "Can I come for just one day?",
    "Yes. The pass covers both days, but nothing is compulsory — turn up for the blocks you want and skip the rest.",
  ],
  [
    "Do I need a team for the build sprint?",
    "No. Teams form on site at the Saturday evening kickoff, and mentors help match people who arrive on their own.",
  ],
  [
    "I'm from another college. Can I attend?",
    "Yes — 40 of the 250 seats are held for students from other campuses. Register with your own college email.",
  ],
];

export function openPass() {
  window.dispatchEvent(new CustomEvent("open-pass"));
}

function useCountdown(target) {
  const [left, setLeft] = useState(() => target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(0, left);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    mins: Math.floor((clamped / 60000) % 60),
    secs: Math.floor((clamped / 1000) % 60),
  };
}

export default function Admission() {
  const { days, hours, mins, secs } = useCountdown(DOORS.getTime());
  const barRef = useRef(null);
  const barInView = useInView(barRef, { once: true, amount: 0.2 });
  const [open, setOpen] = useState(null);

  const pct = Math.round((SEATS_TAKEN / SEATS_TOTAL) * 100);

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
            the door on the thirteenth.
          </p>
        </div>

        {/* live countdown to doors */}
        <div className="countdown" aria-label="Time until doors open">
          <span className="mono countdown__label">Doors open in</span>
          <div className="countdown__units">
            {[
              [days, "Days"],
              [hours, "Hrs"],
              [mins, "Min"],
              [secs, "Sec"],
            ].map(([value, unit]) => (
              <div className="unit" key={unit}>
                <span className="unit__value">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="mono unit__name">{unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* seats remaining */}
        <div className="seats" ref={barRef}>
          <Rivets inset={-4} />
          <div className="seats__row">
            <span className="mono">Seats claimed</span>
            <span className="mono seats__count">
              {SEATS_TAKEN} / {SEATS_TOTAL}
            </span>
          </div>
          <div className="seats__track">
            <motion.div
              className="seats__fill"
              initial={{ width: 0 }}
              animate={barInView ? { width: `${pct}%` } : { width: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>
          <span className="mono seats__left">
            {SEATS_TOTAL - SEATS_TAKEN} left · 40 held for guest campuses
          </span>
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

        {/* FAQ accordion */}
        <div className="faq">
          <span className="mono faq__label">Before you ask</span>
          {FAQS.map(([q, a], i) => (
            <div className={`faq__item ${open === i ? "is-open" : ""}`} key={q}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{q}</span>
                <span className="faq__sign" aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

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
