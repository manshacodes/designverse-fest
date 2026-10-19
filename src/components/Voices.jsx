import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkle } from "./Deco";
import "./Voices.css";

const VOICES = [
  {
    quote: "Design systems are a team sport, not a Figma file.",
    name: "Rhea Nair",
    role: "Design Lead · Zeta",
    topic: "Workshop block I",
  },
  {
    quote: "Ship the ugly version on day one. Fix it on day two.",
    name: "Kabir Sethi",
    role: "Founder · Offscript",
    topic: "Build sprint mentor",
  },
  {
    quote: "Your portfolio is an argument, not a gallery.",
    name: "Meher Kaur",
    role: "Independent · Delhi",
    topic: "Portfolio reviews",
  },
  {
    quote: "Motion is just timing. Everything else is taste.",
    name: "Arjun Rao",
    role: "Motion Director · Studio Veer",
    topic: "Workshop block II",
  },
  {
    quote: "Nobody hires the brief. They hire the thinking.",
    name: "Tanvi Desai",
    role: "Brand Director · Marg",
    topic: "Talks, main hall",
  },
];

function VoiceCard({ voice, index, total, progress }) {
  // each card owns one slice of the scroll, then flips up and out of the way
  const start = index / total;
  const end = (index + 1) / total;

  // pivots on its own top edge and falls backwards, like a page on a flip chart
  const rotateX = useTransform(progress, [start, end], [0, -86]);
  const y = useTransform(progress, [start, end], [0, -24]);
  const mid = start + (end - start) * 0.55;
  const opacity = useTransform(progress, [start, mid, end], [1, 0.45, 0]);
  const settle = useTransform(progress, [start - 0.14, start], [0.94, 1]);

  return (
    <motion.figure
      className="voice"
      style={{
        rotateX,
        y,
        opacity,
        scale: settle,
        zIndex: total - index,
      }}
    >
      <figcaption className="voice__topic mono">{voice.topic}</figcaption>
      <blockquote className="voice__quote">“{voice.quote}”</blockquote>
      <div className="voice__who">
        <span className="voice__name">{voice.name}</span>
        <span className="voice__role">{voice.role}</span>
      </div>
      <span className="voice__count mono">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </motion.figure>
  );
}

export default function Voices() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="voices" id="voices" ref={ref}>
      <div className="voices__sticky">
        <div className="section">
          <div className="section-inner voices__inner">
            <div className="voices__copy">
              <span className="mono">04 — Who's in the room</span>
              <h2 className="voices__title">
                The people
                <br />
                you'll be
                <br />
                working next to
              </h2>
              <p className="voices__blurb">
                Eight speakers and mentors across the two days — studio leads,
                founders and independents who actually do the work. Keep
                scrolling to flip through.
              </p>
            </div>

            <Sparkle size={24} className="sparkle--spin voices__spark voices__spark--a" />
            <Sparkle size={15} className="sparkle--pulse voices__spark voices__spark--b" />

            <div className="voices__deck">
              {VOICES.map((voice, i) => (
                <VoiceCard
                  key={voice.name}
                  voice={voice}
                  index={i}
                  total={VOICES.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
