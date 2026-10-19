import { useState } from "react";
import { motion } from "framer-motion";
import Annotation from "./Annotation";
import "./Register.css";

const TRACKS = ["UI/UX", "Branding", "Motion", "Product"];

function makeTicketCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DV26-${code}`;
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
          <span className="mono">03 — Admission</span>
          <h2 className="register__title">Claim your pass</h2>
          <p className="register__body">
            Free for IGDTUW students, with a limited block of guest seats for
            other campuses. Fill the pass, keep the code, show it at the door.
          </p>
          <Annotation mark="se" className="register__note" delay={0.2}>
            takes about 20 seconds
          </Annotation>
        </div>

        <motion.div
          className="pass-form"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pass-form__head">
            <div className="pass-form__head-row">
              <span className="pass-form__brand">DESIGNVERSE</span>
              <span className="pass-form__ed">ED. 01</span>
            </div>
            <span className="pass-form__dates">14–15 MAR 2026 · IGDTUW, DELHI</span>
          </div>

          <div className="pass-form__perf" aria-hidden="true" />

          {submitted ? (
            <div className="pass-form__done">
              <span className="mono">Admitted</span>
              <p className="pass-form__code">{ticketCode}</p>
              <p className="pass-form__done-note">
                Screenshot this. A copy would normally reach{" "}
                {form.email || "your inbox"} within the hour.
              </p>
            </div>
          ) : (
            <form className="pass-form__body" onSubmit={onSubmit}>
              <label className="field">
                <span className="field__label">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Full name"
                />
              </label>

              <label className="field">
                <span className="field__label">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@igdtuw.ac.in"
                />
              </label>

              <div className="field-row">
                <label className="field">
                  <span className="field__label">Phone</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="10 digits"
                  />
                </label>

                <label className="field">
                  <span className="field__label">College / Branch</span>
                  <input
                    value={form.college}
                    onChange={update("college")}
                    placeholder="IGDTUW, CSE"
                  />
                </label>
              </div>

              <fieldset className="tracks">
                <legend className="field__label">Track</legend>
                <div className="tracks__options">
                  {TRACKS.map((track) => (
                    <label key={track} className="tracks__chip">
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

              <div className="pass-form__tear" aria-hidden="true" />

              <button type="submit" className="pass-form__submit">
                Issue my pass
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
