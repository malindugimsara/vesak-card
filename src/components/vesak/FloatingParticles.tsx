import { useMemo } from "react";
import boleaf from "@/assets/boleaf.png";

/** Floating Bo leaves and golden glow particles drifting upward. */
const FloatingParticles = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 28,
        delay: Math.random() * 18,
        duration: 18 + Math.random() * 14,
        isLeaf: i % 3 === 0,
        opacity: 0.4 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute animate-[float-up_linear_infinite]"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          {p.isLeaf ? (
            <img
              src={boleaf}
              alt=""
              loading="lazy"
              width={p.size}
              height={p.size}
              className="h-full w-full object-contain"
              style={{ filter: "drop-shadow(0 0 8px hsl(var(--gold-glow) / 0.5))" }}
            />
          ) : (
            <span
              className="block h-full w-full rounded-full bg-gold-glow"
              style={{ boxShadow: "0 0 12px hsl(var(--gold-glow) / 0.8)" }}
            />
          )}
        </span>
      ))}
    </div>
  );
};

export default FloatingParticles;