import { Sparkle } from "./Deco";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="section footer">
      <div className="section-inner">
        <div className="footer__grid">
          <div className="footer__col">
            <span className="mono">Event</span>
            <p>14–15 March 2026</p>
            <p>10:00 — 18:00 IST</p>
            <p>IGDTUW Campus, Delhi</p>
          </div>

          <div className="footer__col">
            <span className="mono">Contact</span>
            <a href="mailto:designverse@igdtuw.ac.in">designverse@igdtuw.ac.in</a>
            <p>Design &amp; Innovation Society</p>
          </div>

          <div className="footer__col">
            <span className="mono">Follow</span>
            <a href="#top">Instagram</a>
            <a href="#top">LinkedIn</a>
          </div>

          <div className="footer__col">
            <span className="mono">Admission</span>
            <a href="#register">Claim your pass</a>
            <p>Free · limited guest seats</p>
          </div>
        </div>

        <Sparkle size={21} className="sparkle--spin footer__spark footer__spark--a" />
        <Sparkle size={13} className="sparkle--pulse footer__spark footer__spark--b" />

        <p className="footer__wordmark chrome-text" aria-hidden="true">
          DESIGNVERSE
        </p>

        <div className="footer__base">
          <span className="mono">© 2026 — Edition 01</span>
          <span className="mono">Built by students, for students</span>
        </div>
      </div>
    </footer>
  );
}
