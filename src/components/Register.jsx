import { useState } from "react";
import { motion } from "framer-motion";
import "./Register.css";

const TRACKS = ["UI/UX", "Branding", "Motion", "Product"];

function makeTicketCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DSGN-${code}`;
}

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    track: TRACKS[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketCode] = useState(makeTicketCode);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section register" id="register">
      <div className="section-inner register__inner">
        <div className="register__copy">
          <p className="eyebrow">Prominent, as requested</p>
          <h2 className="register__title">Grab your ticket</h2>
          <p className="register__body">
            Registration is free for IGDTUW students and open to a limited
            number of guest seats from other campuses. Fill in the ticket —
            yes, the actual ticket — to lock your spot.
          </p>
        </div>

        <motion.div
          className="ticket"
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="ticket__head">
            <span className="ticket__brand">DESIGNVERSE</span>
            <span className="ticket__dates">14–15 MAR 2026</span>
          </div>

          <div className="ticket__perforation" aria-hidden="true" />

          {submitted ? (
            <div className="ticket__success">
              <p className="ticket__success-kicker">You're in ✓</p>
              <p className="ticket__code">{ticketCode}</p>
              <p className="ticket__success-note">
                A confirmation would normally land in {form.email || "your inbox"}
                . Save this code — show it at check-in.
              </p>
            </div>
          ) : (
            <form className="ticket__form" onSubmit={onSubmit}>
              <label className="ticket__field">
                <span>Name*</span>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Ananya Sharma"
                />
              </label>

              <label className="ticket__field">
                <span>Email*</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@igdtuw.ac.in"
                />
              </label>

              <label className="ticket__field">
                <span>Phone*</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="98xxxxxxxx"
                />
              </label>

              <label className="ticket__field">
                <span>College / Branch</span>
                <input
                  value={form.college}
                  onChange={update("college")}
                  placeholder="IGDTUW, CSE"
                />
              </label>

              <fieldset className="ticket__tracks">
                <legend>Track you're most excited for</legend>
                <div className="ticket__track-options">
                  {TRACKS.map((track) => (
                    <label key={track} className="ticket__track-chip">
                      <input
                        type="radio"
                        name="track"
                        value={track}
                        checked={form.track === track}
                        onChange={update("track")}
                      />
                      {track}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="ticket__tear" aria-hidden="true" />

              <button type="submit" className="ticket__submit">
                <span>✱</span> Register now <span>✱</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
