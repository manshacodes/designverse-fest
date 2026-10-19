import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./InfoKeyword.css";

export default function InfoKeyword({ color = "red", stat, detail, children }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={`keyword keyword--${color}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            className="keyword__card"
            role="status"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <span className="keyword__stat">{stat}</span>
            <span className="keyword__detail">{detail}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
