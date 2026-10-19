import { useState } from "react";
import { openPass } from "./Admission";
import "./Nav.css";

const LINKS = [
  { href: "#highlights", label: "What happens" },
  { href: "#schedule", label: "Schedule" },
  { href: "#voices", label: "Speakers" },
  { href: "#register", label: "Pass" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__mark">
          DESIGNVERSE
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <button type="button" className="nav__cta" onClick={openPass}>
          Claim your pass
        </button>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`nav__mobile ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <button
          type="button"
          className="nav__cta"
          onClick={() => {
            setOpen(false);
            openPass();
          }}
        >
          Claim your pass
        </button>
      </div>
    </header>
  );
}
