export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * One pose function drives both the loader ring and the open carousel.
 * formation (0..1): cards deal out from a stacked front position to their
 * resting angle on the ring, staggered by slot so the deal travels around it.
 * expansion (0..1): the ring itself grows from a small loader radius to the
 * full carousel radius. angleOffset: current rotation from idle spin + drag.
 */
export function reelPose({
  slot,
  total,
  formation,
  expansion,
  angleOffset,
  radiusRange,
  scaleRange,
}) {
  const restAngle = (slot * 360) / total + angleOffset;
  const order = slot / total;
  const DEAL = 0.55;
  const t = clamp((formation - order * (1 - DEAL)) / DEAL, 0, 1);
  const dealt = easeOutCubic(t);

  // Undealt cards sit stacked at the front and swing out to restAngle.
  const angle = restAngle * dealt;

  const radius = lerp(radiusRange[0], radiusRange[1], expansion);
  const rad = (angle * Math.PI) / 180;
  const x = Math.sin(rad) * radius;
  const z = -Math.cos(rad) * radius;
  const scale = lerp(scaleRange[0], scaleRange[1], expansion) * lerp(0.82, 1, dealt);
  const opacity = dealt;
  const rotateY = -angle;

  return { x, z, rotateY, scale, opacity };
}
