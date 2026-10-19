import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import InfoKeyword from "./InfoKeyword";
import Annotation from "./Annotation";
import FlipTicket from "./FlipTicket";
import { openPass } from "./Admission";
import { Sparkle, Ruler, RegMark } from "./Deco";
import "./Hero.css";

const rise = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="section hero" id="top">
      <div className="section-inner">
        <div className="hero__slug">
          <span className="mono">
            <RegMark size={13} /> ED. 01 — IGDTUW, DELHI
          </span>
          <Ruler ticks={34} className="hero__rule" />
          <span className="mono">14–15 MAR 2026 · 10:00–18:00 IST</span>
        </div>

        <h1 className="hero__title chrome-text" data-speed="0.92">
          <ScrambleText text="DESIGNVERSE" duration={1.1} />
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <motion.p
              className="hero__line"
              {...rise}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            >
              Two days. One campus.<br />Every discipline of design.
            </motion.p>

            <motion.p
              className="hero__intro"
              {...rise}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              A student design &amp; innovation fest run by the Design &amp;
              Innovation Society at IGDTUW.{" "}
              <InfoKeyword
                stat="6 hands-on workshops"
                detail="Figma systems, motion, branding, prototyping. Bring a laptop."
              >
                Workshops
              </InfoKeyword>{" "}
              run by working designers, talks from{" "}
              <InfoKeyword
                stat="8 speakers"
                detail="Design leads from studios, startups and independent practice."
              >
                founders and studios
              </InfoKeyword>
              , and{" "}
              <InfoKeyword
                stat="24-hour build sprint"
                detail="Team up Saturday morning. Ship something by Sunday night."
              >
                a 24-hour build sprint
              </InfoKeyword>
              . Open to every year, every branch — no portfolio required.
            </motion.p>

            <motion.div
              className="hero__actions"
              {...rise}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            >
              <button type="button" className="btn btn--metal" onClick={openPass}>
                Claim your pass
              </button>
              <a href="#schedule" className="btn btn--ghost">
                See the schedule
              </a>
            </motion.div>

            <motion.dl
              className="hero__facts"
              {...rise}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.54 }}
            >
              <div>
                <dt className="mono">Admission</dt>
                <dd>Free</dd>
              </div>
              <div>
                <dt className="mono">Seats</dt>
                <dd>250</dd>
              </div>
              <div>
                <dt className="mono">Tracks</dt>
                <dd>Four</dd>
              </div>
              <div>
                <dt className="mono">Edition</dt>
                <dd>First</dd>
              </div>
            </motion.dl>
          </div>

          <Sparkle size={34} className="sparkle--pulse hero__spark hero__spark--a" />
          <Sparkle size={19} className="sparkle--spin hero__spark hero__spark--b" />
          <Sparkle size={13} className="sparkle--pulse hero__spark hero__spark--c" />

          <div className="hero__object" data-speed="1.12">
            <FlipTicket />
            <Annotation mark="sw" className="hero__note hero__note--pass" delay={1.2}>
              click it to fill it in
            </Annotation>
          </div>
        </div>
      </div>
    </section>
  );
}
