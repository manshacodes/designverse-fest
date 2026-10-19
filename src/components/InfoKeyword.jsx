import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./InfoKeyword.css";

export default function InfoKeyword({ stat, detail, children }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="keyword"
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
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.99 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="keyword__stat">{stat}</span>
            <span className="keyword__detail">{detail}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
