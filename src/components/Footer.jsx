import { Sparkle, Barcode, DimLine } from "./Deco";
import { openPass } from "./Admission";
import "./Footer.css";

const NIRVANA = {
  site: "https://nirvanaigdtuw.vercel.app/",
  instagram: "https://www.instagram.com/designclubigdtuw/",
  linkedin:
    "https://www.linkedin.com/in/nirvana-design-club-of-igdtuw-6590203a8/",
};

function External({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="footer__ext" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="section footer">
      <div className="section-inner">
        <div className="footer__grid">
          <div className="footer__col">
            <span className="mono">Event</span>
            <p>13–14 March 2027</p>
            <p>10:00 — 18:00 IST</p>
            <p>IGDTUW Campus, Delhi</p>
          </div>

          <div className="footer__col">
            <span className="mono">Organised by</span>
            <External href={NIRVANA.site}>Nirvana</External>
            <p>Design Club of IGDTUW</p>
            <a href="mailto:nirvana@igdtuw.ac.in">nirvana@igdtuw.ac.in</a>
          </div>

          <div className="footer__col">
            <span className="mono">Follow</span>
            <External href={NIRVANA.instagram}>Instagram</External>
            <External href={NIRVANA.linkedin}>LinkedIn</External>
          </div>

          <div className="footer__col">
            <span className="mono">Admission</span>
            <button type="button" className="footer__link" onClick={openPass}>
              Claim your pass
            </button>
            <a href="#schedule">Full schedule</a>
            <p>Free · limited guest seats</p>
          </div>
        </div>

        <Sparkle size={21} className="sparkle--spin footer__spark footer__spark--a" />
        <Sparkle size={13} className="sparkle--pulse footer__spark footer__spark--b" />

        <p className="footer__wordmark chrome-text" aria-hidden="true">
          DESIGNVERSE
        </p>

        <div className="footer__strip">
          <Barcode bars={52} />
          <DimLine label="Ed. 01 · two days" className="footer__dim" />
        </div>

        <div className="footer__base">
          <span className="mono">© 2027 — Edition 01</span>
          <span className="mono">Built by students, for students</span>
        </div>
      </div>
    </footer>
  );
}
