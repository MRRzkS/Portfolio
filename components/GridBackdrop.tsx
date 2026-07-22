// Animated heartbeat grid in Panasonic blue. Sits behind every non-hero
// section. Decorative only; the sticky inner layer keeps the pulse centered
// in the viewport as the visitor scrolls. Frozen under reduced-motion.
export default function GridBackdrop() {
  return (
    <div className="grid-backdrop" aria-hidden="true">
      <div className="grid-sticky">
        <div className="grid-layer grid-static" />
        <div className="grid-layer grid-beat" />
        <div className="grid-glow" />
      </div>
    </div>
  );
}
