import { useState } from "react";
import "./Nav.css";

const LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#highlights", label: "Highlights" },
  { href: "#register", label: "Register" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__mark">
          DESIGN<span>VERSE</span>
        </a>

        <nav className="nav__links nav__links--desktop" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#register" className="nav__cta nav__cta--desktop">
          Get a ticket
        </a>

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
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`nav__mobile ${open ? "is-open" : ""}`}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#register"
          className="nav__cta"
          onClick={() => setOpen(false)}
        >
          Get a ticket
        </a>
      </div>
    </header>
  );
}
