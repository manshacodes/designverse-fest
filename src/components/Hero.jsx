import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import InfoKeyword from "./InfoKeyword";
import Annotation from "./Annotation";
import MetalPass from "./MetalPass";
import "./Hero.css";

const rise = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="section hero" id="top">
      <div className="section-inner">
        <div className="hero__slug">
          <span className="mono">ED. 01 — IGDTUW, DELHI</span>
          <span className="mono">14–15 MAR 2026 · 10:00–18:00</span>
        </div>

        <h1 className="hero__title chrome-text">
          <ScrambleText text="DESIGNVERSE" duration={1.1} />
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <motion.p
              className="hero__line"
              {...rise}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Two days. One campus. Every discipline of design.
            </motion.p>

            <motion.p
              className="hero__intro"
              {...rise}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            >
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
              . Open to every year, every branch.
            </motion.p>

            <motion.div
              className="hero__actions"
              {...rise}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
            >
              <a href="#register" className="btn btn--metal">
                Claim your pass
              </a>
              <a href="#highlights" className="btn btn--ghost">
                See the two days
              </a>
            </motion.div>
          </div>

          <div className="hero__object">
            <MetalPass />
            <Annotation mark="sw" className="hero__note hero__note--pass" delay={0.6}>
              milled, not printed
            </Annotation>
            <Annotation mark="up" className="hero__note hero__note--move" delay={0.9}>
              move your cursor
            </Annotation>
          </div>
        </div>
      </div>
    </section>
  );
}
