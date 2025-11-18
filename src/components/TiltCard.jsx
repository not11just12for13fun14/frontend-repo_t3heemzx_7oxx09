import { useRef } from "react";

export default function TiltCard({ children, className = "", maxTilt = 10, glare = true }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-py * maxTilt).toFixed(2);
    const ry = (px * maxTilt).toFixed(2);
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (glare) {
      el.style.setProperty("--glx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--gly", `${(py + 0.5) * 100}%`);
    }
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`will-change-transform transition-transform duration-150 ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(200px 200px at var(--glx,50%) var(--gly,50%), rgba(255,255,255,0.15), transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
