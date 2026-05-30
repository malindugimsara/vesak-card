import { useState, useEffect, useMemo } from "react";
import boleaf from "@/assets/boleaf.png";

/** Floating Bo leaves and golden glow particles drifting upward. */
const FloatingParticles = () => {
  // ─── වෙනස 1: අංශු ගණන (Particle Count) තබා ගැනීමට State එකක් සෑදීම ───
  // ආරම්භයේදී දුරකථනයකට ගැලපෙන ලෙස 10ක් ලෙස තබා ගනිමු
  const [particleCount, setParticleCount] = useState(10);

  // ─── වෙනස 2: Screen Size එක අනුව අංශු ගණන තීරණය කිරීම ───
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setParticleCount(25); // Desktop/Tablet සඳහා අංශු 25ක්
      } else {
        setParticleCount(10); // Mobile සඳහා අංශු 10ක් (Lag වීම වැළැක්වීමට)
      }
    };

    // Component එක Load වන විටම මෙය ක්‍රියාත්මක කරන්න
    handleResize();

    // දුරකථනය Rotate කරද්දී හෝ Screen Size වෙනස් කරද්දී Update වීමට
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 28,
        delay: Math.random() * 18,
        duration: 18 + Math.random() * 14,
        isLeaf: i % 3 === 0,
        opacity: 0.4 + Math.random() * 0.4,
      })),
    [particleCount] // ─── වෙනස 3: particleCount වෙනස් වන විට පමණක් මෙය නැවත සෑදීමට ───
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
              // ─── අතිරේක වෙනස: drop-shadow එක GPU එකට බර වැඩිනම් අනාගතයේදී මෙය ඉවත් කළ හැක ───
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