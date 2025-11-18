import { useRef, useState } from "react";
import clsx from "clsx";

export default function MagneticButton({ as = "button", href = "#", children, className = "", onClick, ...props }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "translate3d(0,0,0)" });
  const [ripples, setRipples] = useState([]);

  const reset = () => setStyle({ transform: "translate3d(0,0,0)" });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setStyle({
      transform: `translate3d(${relX * 0.15}px, ${relY * 0.15}px, 0)`,
      boxShadow: `0 8px 30px rgba(123,51,126,0.45), 0 0 0 1px rgba(123,51,126,0.25) inset`,
    });
  };

  const onLeave = () => {
    reset();
  };

  const onBtnClick = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
    onClick?.(e);
  };

  const Comp = as === "a" ? "a" : "button";

  return (
    <Comp
      ref={ref}
      href={as === "a" ? href : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onBtnClick}
      className={clsx(
        "relative overflow-hidden rounded-2xl px-6 py-3 font-semibold transition will-change-transform select-none",
        "bg-[#7B337E] text-white shadow-[0_8px_30px_rgba(123,51,126,0.35)]",
        "hover:scale-[1.03] active:scale-[0.98]",
        className
      )}
      style={style}
      {...props}
    >
      {children}
      {/* ripple */}
      <span className="pointer-events-none absolute inset-0">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/40 animate-ripple"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </span>
    </Comp>
  );
}
