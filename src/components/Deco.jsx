import "./Deco.css";

const SPARKLE =
  "M50 0 C54.5 28 72 45.5 100 50 C72 54.5 54.5 72 50 100 C45.5 72 28 54.5 0 50 C28 45.5 45.5 28 50 0 Z";

/** One set of chrome gradients, shared by every decorative shape. */
export function DecoDefs() {
  return (
    <svg className="deco-defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dv-chrome" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="16%" stopColor="#e3eaed" />
          <stop offset="34%" stopColor="#8d979c" />
          <stop offset="50%" stopColor="#2c3337" />
          <stop offset="64%" stopColor="#99a3a8" />
          <stop offset="84%" stopColor="#f4f8f9" />
          <stop offset="100%" stopColor="#6a7378" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A four-point sparkle, milled out of the same chrome as everything else. */
export function Sparkle({ size = 26, className = "", style }) {
  return (
    <svg
      className={`sparkle ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      <path d={SPARKLE} fill="url(#dv-chrome)" />
    </svg>
  );
}

/** Printer's crop marks — the corners you'd trim a poster to. */
export function CropMarks({ className = "" }) {
  return (
    <span className={`crop ${className}`} aria-hidden="true">
      <i className="crop__c crop__c--tl" />
      <i className="crop__c crop__c--tr" />
      <i className="crop__c crop__c--bl" />
      <i className="crop__c crop__c--br" />
    </span>
  );
}

/** A registration target, the kind used to line up print plates. */
export function RegMark({ size = 22, className = "" }) {
  return (
    <svg
      className={`regmark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M12 0v7M12 17v7M0 12h7M17 12h7"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

/** A measuring rule: millimetre ticks with a long mark every tenth. */
export function Ruler({ ticks = 48, className = "" }) {
  return (
    <span className={`ruler ${className}`} aria-hidden="true">
      {Array.from({ length: ticks }, (_, i) => (
        <i key={i} className={i % 10 === 0 ? "ruler__t ruler__t--major" : "ruler__t"} />
      ))}
    </span>
  );
}

/** A domed rivet, like the ones holding a metal panel down. */
export function Rivet({ size = 9, className = "", style }) {
  return (
    <span
      className={`rivet ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}

/** Four rivets, one per corner of whatever box this sits in. */
export function Rivets({ inset = 14 }) {
  return (
    <span className="rivets" style={{ "--rivet-inset": `${inset}px` }} aria-hidden="true">
      <Rivet className="rivets__r rivets__r--tl" />
      <Rivet className="rivets__r rivets__r--tr" />
      <Rivet className="rivets__r rivets__r--bl" />
      <Rivet className="rivets__r rivets__r--br" />
    </span>
  );
}

/** Ticket barcode — irregular bar widths so it doesn't read as a pattern. */
export function Barcode({ bars = 46, className = "" }) {
  const widths = Array.from({ length: bars }, (_, i) => {
    const n = Math.sin(i * 12.9898) * 43758.5453;
    return 1 + Math.floor(Math.abs(n - Math.floor(n)) * 3);
  });
  return (
    <span className={`barcode ${className}`} aria-hidden="true">
      {widths.map((w, i) => (
        <i key={i} style={{ width: w }} />
      ))}
    </span>
  );
}

/** An engineering dimension line: |←—— label ——→| */
export function DimLine({ label, className = "" }) {
  return (
    <span className={`dim ${className}`} aria-hidden="true">
      <i className="dim__cap" />
      <i className="dim__rule" />
      <span className="dim__label">{label}</span>
      <i className="dim__rule" />
      <i className="dim__cap" />
    </span>
  );
}
