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

  // 180deg is the near point of the ring, dead centre and facing the camera.
  // Undealt cards sit stacked there and swing out to their resting angle.
  const angle = 180 + (restAngle - 180) * dealt;

  const radius = lerp(radiusRange[0], radiusRange[1], expansion);
  const rad = (angle * Math.PI) / 180;
  const x = Math.sin(rad) * radius;
  // Pull the ring back so its nearest point sits on the screen plane. With a
  // short perspective anything in front of it blows up to infinity.
  const z = -Math.cos(rad) * radius - radius;
  const scale = lerp(scaleRange[0], scaleRange[1], expansion) * lerp(0.82, 1, dealt);
  const opacity = dealt;
  // face outward from the ring centre, so the near card looks straight at you
  // and the far arc turns its back (hidden by backface-visibility)
  const rotateY = 180 - angle;

  return { x, z, rotateY, scale, opacity };
}
