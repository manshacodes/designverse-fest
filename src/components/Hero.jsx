import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import InfoKeyword from "./InfoKeyword";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="section hero" id="top">
      <div className="section-inner hero__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          IGDTUW presents
        </motion.p>

        <h1 className="hero__title">
          <ScrambleText text="DESIGNVERSE" duration={1.3} />
        </h1>

        <motion.p
          className="hero__subhead"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Two days. One campus. Every discipline of design in one place.
        </motion.p>

        <motion.div
          className="hero__tags"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <span className="tag tag--amber">14–15 MAR 2026</span>
          <span className="tag tag--amber">10 AM – 6 PM</span>
          <span className="tag tag--blue">IGDTUW Campus, Delhi</span>
        </motion.div>

        <motion.p
          className="hero__intro"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Two days of{" "}
          <InfoKeyword
            color="blue"
            stat="6 hands-on workshops"
            detail="Figma, motion, branding, and prototyping — bring a laptop."
          >
            workshops
          </InfoKeyword>{" "}
          led by working designers, talks from{" "}
          <InfoKeyword
            color="red"
            stat="8 speakers"
            detail="Design leads from studios, startups, and independent practice."
          >
            founders and studios
          </InfoKeyword>
          , and{" "}
          <InfoKeyword
            color="amber"
            stat="24-hour build sprint"
            detail="Form a team Saturday morning, ship something by Sunday night."
          >
            a live build sprint
          </InfoKeyword>{" "}
          — open to every student, every year, every discipline.
        </motion.p>
      </div>
    </section>
  );
}
