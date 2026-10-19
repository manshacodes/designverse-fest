import "./Footer.css";

export default function Footer() {
  return (
    <footer className="section footer">
      <div className="section-inner footer__inner">
        <div className="footer__brand">
          <p className="footer__mark">
            DESIGN<span>VERSE</span>
          </p>
          <p className="footer__tagline">
            A student design &amp; innovation fest, by IGDTUW.
          </p>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Event</p>
          <p>14–15 March 2026</p>
          <p>10 AM – 6 PM</p>
          <p>IGDTUW Campus, Delhi</p>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Contact</p>
          <a href="mailto:designverse@igdtuw.ac.in">
            designverse@igdtuw.ac.in
          </a>
          <p>Design &amp; Innovation Society</p>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Follow</p>
          <a href="#top">Instagram</a>
          <a href="#top">LinkedIn</a>
        </div>
      </div>

      <div className="section-inner footer__bottom">
        <p>© 2026 DesignVerse. Built by students, for students.</p>
        <a href="#register" className="footer__cta">
          Get a ticket →
        </a>
      </div>
    </footer>
  );
}
