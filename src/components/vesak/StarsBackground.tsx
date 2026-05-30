import { useState, useEffect, useMemo } from "react";

/** Twinkling stars across the night sky. Pure CSS, lightweight. */
const StarsBackground = () => {
  // ─── වෙනස 1: තරු ගණන තබා ගැනීමට State එකක් සෑදීම ───
  // ආරම්භයේදී දුරකථනයකට ගැලපෙන ලෙස 20ක් ලෙස තබා ගනිමු
  const [starCount, setStarCount] = useState(20);

  // ─── වෙනස 2: Screen Size එක අනුව තරු ගණන තීරණය කිරීම ───
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setStarCount(60); // Desktop/Tablet සඳහා තරු 60ක්
      } else {
        setStarCount(20); // Mobile සඳහා තරු 20ක් (Lag වීම වැළැක්වීමට)
      }
    };

    // Component එක Load වන විටම මෙය ක්‍රියාත්මක කරන්න
    handleResize();

    // Screen Size වෙනස් කරද්දී (හෝ Rotate කරද්දී) Update වීමට
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [starCount] // ─── වෙනස 3: starCount වෙනස් වන විට පමණක් මෙය නැවත සෑදීමට ───
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold-glow animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            // ─── අතිරේක වෙනස: Mobile වලදී Shadow එක ඉවත් කිරීමට අවශ්‍ය නම් මෙහි වෙනසක් කළ හැක ───
            // නමුත් Stars වල Shadow එක කුඩා නිසා ලොකු බලපෑමක් නැත.
            boxShadow: "0 0 6px hsl(var(--gold-glow) / 0.8)",
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;