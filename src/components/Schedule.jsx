import { motion } from "framer-motion";
import Annotation from "./Annotation";
import "./Schedule.css";

const DAYS = [
  {
    id: "sat",
    label: "Saturday",
    date: "14 MAR",
    rows: [
      ["09:30", "Doors & check-in", "Show your pass code at the desk"],
      ["10:00", "Opening", "What we're building, and how the two days run"],
      ["10:30", "Workshop block I", "UI/UX systems in Figma · all four tracks"],
      ["12:30", "Lunch & studio stalls", "Partner studios in the courtyard"],
      ["13:30", "Talks", "Founders and studio leads, main hall"],
      ["15:00", "Workshop block II", "Branding and motion"],
      ["17:00", "Build sprint opens", "Form a team, pick a brief"],
      ["18:00", "Day one close", "Sprint keeps running overnight"],
    ],
  },
  {
    id: "sun",
    label: "Sunday",
    date: "15 MAR",
    rows: [
      ["09:00", "Sprint check-in", "Mentors on the floor"],
      ["10:00", "Workshop block III", "Prototyping and handoff"],
      ["11:30", "Portfolio reviews", "1:1, fifteen minutes, sign up at the desk"],
      ["13:00", "Lunch", "Courtyard"],
      ["14:00", "Submissions close", "Hard cut-off, no extensions"],
      ["15:00", "Showcase setup", "Boards up in the main hall"],
      ["17:00", "Closing showcase", "Judged, open to everyone"],
      ["18:00", "Wrap", "Doors close at 18:30"],
    ],
  },
];

export default function Schedule() {
  return (
    <section className="section schedule" id="schedule">
      <div className="section-inner">
        <div className="schedule__head">
          <div>
            <span className="mono">03 — Running order</span>
            <h2 className="schedule__title">Two days, hour by hour</h2>
          </div>
          <Annotation mark="sw" className="schedule__note" delay={0.1}>
            the sprint runs overnight
          </Annotation>
        </div>

        <div className="schedule__days">
          {DAYS.map((day, d) => (
            <div className="day" key={day.id}>
              <div className="day__head">
                <h3 className="day__label">{day.label}</h3>
                <span className="mono">{day.date} · 2026</span>
              </div>

              <ol className="day__rows">
                {day.rows.map(([time, title, note], i) => (
                  <motion.li
                    className="slot"
                    key={time + title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: Math.min(i * 0.035 + d * 0.05, 0.4),
                    }}
                  >
                    <span className="slot__time">{time}</span>
                    <span className="slot__body">
                      <span className="slot__title">{title}</span>
                      <span className="slot__note">{note}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
