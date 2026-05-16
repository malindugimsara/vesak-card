import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bucket from "@/assets/bucket.png";

interface Props {
  onComplete?: () => void;
}

// ─── Firefly data type ───────────────────────────────────────────────
interface FireflyData {
  id: number;
  x: number;
  y: number;
  dur: number;
  delay: number;
  dx: number[];
  dy: number[];
}

// ─── Circle lantern data type ────────────────────────────────────────
interface CircleLantern {
  x: number;
  y: number;
  size: number;
  delay: number;
}

let fireflyCounter = 0;

// ─── Night Sky Canvas ────────────────────────────────────────────────
const NightSky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d")!;
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#020714");
      sky.addColorStop(0.45, "#060e25");
      sky.addColorStop(0.78, "#0a1833");
      sky.addColorStop(1, "#0e1e3a");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 220; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h * 0.65;
        const sr = Math.random() * 1.1 + 0.2;
        ctx.globalAlpha = Math.random() * 0.7 + 0.2;
        ctx.fillStyle = ["#e8eeff", "#fff8e8", "#ffe8d0"][Math.floor(Math.random() * 3)];
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const base = h - h * 0.07;
      ctx.fillStyle = "#040b1c";
      ctx.fillRect(0, base, w, h);

      const cx = w * 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - 72, base); ctx.lineTo(cx - 38, base - h * 0.042);
      ctx.lineTo(cx - 30, base - h * 0.11); ctx.lineTo(cx - 17, base - h * 0.19);
      ctx.lineTo(cx - 7, base - h * 0.24); ctx.lineTo(cx, base - h * 0.31);
      ctx.lineTo(cx + 7, base - h * 0.24); ctx.lineTo(cx + 17, base - h * 0.19);
      ctx.lineTo(cx + 30, base - h * 0.11); ctx.lineTo(cx + 38, base - h * 0.042);
      ctx.lineTo(cx + 72, base);
      ctx.closePath(); ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx - 3, base - h * 0.31);
      ctx.lineTo(cx, base - h * 0.37);
      ctx.lineTo(cx + 3, base - h * 0.31);
      ctx.fill();

      [[w * 0.28, 0.20], [w * 0.72, 0.20]].forEach(([tx, th]) => {
        ctx.beginPath();
        ctx.moveTo(tx - 32, base); ctx.lineTo(tx - 22, base - h * 0.05);
        ctx.lineTo(tx - 14, base - h * 0.13); ctx.lineTo(tx - 7, base - h * th);
        ctx.lineTo(tx, base - h * (th + 0.03)); ctx.lineTo(tx + 7, base - h * th);
        ctx.lineTo(tx + 14, base - h * 0.13); ctx.lineTo(tx + 22, base - h * 0.05);
        ctx.lineTo(tx + 32, base);
        ctx.closePath(); ctx.fill();
      });

      for (let i = 0; i < 7; i++) {
        const tx = w * (0.07 + i * 0.13);
        const treeH = h * (0.09 + (i % 3) * 0.025);
        ctx.beginPath();
        ctx.moveTo(tx - 12, base); ctx.lineTo(tx - 14, base - treeH * 0.42);
        ctx.lineTo(tx - 9, base - treeH * 0.42); ctx.lineTo(tx - 15, base - treeH * 0.68);
        ctx.lineTo(tx - 8, base - treeH * 0.68); ctx.lineTo(tx - 11, base - treeH);
        ctx.lineTo(tx + 11, base - treeH); ctx.lineTo(tx + 8, base - treeH * 0.68);
        ctx.lineTo(tx + 15, base - treeH * 0.68); ctx.lineTo(tx + 9, base - treeH * 0.42);
        ctx.lineTo(tx + 14, base - treeH * 0.42); ctx.lineTo(tx + 12, base);
        ctx.closePath(); ctx.fill();
      }

      const wg = ctx.createLinearGradient(0, h * 0.83, 0, base);
      wg.addColorStop(0, "rgba(15,50,110,0.55)");
      wg.addColorStop(1, "rgba(4,14,40,0.9)");
      ctx.fillStyle = wg;
      ctx.fillRect(0, h * 0.83, w, base - h * 0.83);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
};

// ─── Main Image Lantern ───────────────────────────────────────────────
const MainLantern = ({ lit }: { lit: boolean }) => (
  <img
    src={bucket}
    alt="Main Lantern"
    style={{
      display: "block",
      // ─── වෙනස 1: ප්‍රධාන ලන්තෑරුම සැලකිය යුතු ලෙස විශාල කළා ───
      width: "clamp(200px, 35vw, 350px)",
      height: "auto",
      transformOrigin: "50% 0%",
      filter: lit 
        ? "brightness(1.2) contrast(1.1) drop-shadow(0 0 30px rgba(251,146,60,0.8))" 
        : "brightness(0.4) contrast(0.9) drop-shadow(0 0 0px rgba(251,146,60,0))",
      animation: lit ? "swayLit 3s ease-in-out infinite" : undefined,
      borderRadius: "12px",
      transition: "filter 0.5s ease-in-out"
    }}
  />
);

// ─── Circle Image Lantern (lit, smaller) ─────────────────────────────
const CircleLanternSVG = ({ size, swayDelay }: { size: number; swayDelay: number }) => {
  return (
    <img
      src={bucket}
      alt="Circle Lantern"
      style={{
        display: "block",
        width: size,
        height: "auto",
        filter: "brightness(1.1) contrast(1.1) drop-shadow(0 0 15px rgba(251,146,60,0.6))",
        animation: `swayLit ${2.5 + swayDelay * 0.3}s ${swayDelay}s ease-in-out infinite`,
        transformOrigin: "50% 0%",
        borderRadius: "8px",
      }}
    />
  );
};

// ─── Firefly ─────────────────────────────────────────────────────────
const Firefly = ({ data }: { data: FireflyData }) => (
  <div
    style={{
      position: "absolute",
      left: `${data.x}%`,
      top: `${data.y}%`,
      width: 4, height: 4,
      borderRadius: "50%",
      background: "#fef08a",
      boxShadow: "0 0 7px 3px rgba(254,240,138,0.5)",
      pointerEvents: "none",
      zIndex: 4,
      animation: `fireflyAnim ${data.dur}s ${data.delay}s ease-in-out infinite`,
      // @ts-ignore
      "--fx": `${data.dx[0]}px`,
      "--fy": `${data.dy[0]}px`,
    } as React.CSSProperties}
  />
);

// ─── Ripple ───────────────────────────────────────────────────────────
const Ripple = ({ x, y, onDone }: { x: number; y: number; onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: "absolute",
        left: x, top: y,
        width: 12, height: 12,
        borderRadius: "50%",
        border: "2px solid rgba(251,191,36,0.85)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 15,
        animation: "rippleOut 0.8s ease-out forwards",
      }}
    />
  );
};

// ─── Petal ────────────────────────────────────────────────────────────
const Petal = ({ x, delay, dur, emoji, px }: { x: number; delay: number; dur: number; emoji: string; px: number }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      bottom: "8%",
      fontSize: 18,
      pointerEvents: "none",
      zIndex: 5,
      animation: `petalRise ${dur}s ${delay}s ease-in forwards`,
      // @ts-ignore
      "--px": `${px}px`,
    } as React.CSSProperties}
  >
    {emoji}
  </div>
);

// ─── CSS keyframes injected once ─────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes hintPulse {
      0%,100% { opacity:0.4; transform:translateX(-50%) translateY(0); }
      50% { opacity:1; transform:translateX(-50%) translateY(-6px); }
    }
    @keyframes tapBounce {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes swayLit {
      0%,100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    @keyframes fireflyAnim {
      0% { opacity:0; transform: translate(0,0); }
      20% { opacity:0.9; }
      80% { opacity:0.5; }
      100% { opacity:0; transform: translate(var(--fx), var(--fy)); }
    }
    @keyframes rippleOut {
      from { width:12px; height:12px; opacity:1; }
      to { width:90px; height:90px; opacity:0; }
    }
    @keyframes petalRise {
      0% { opacity:0; transform: translate(0,0) rotate(0deg) scale(0.5); }
      10% { opacity:0.85; }
      80% { opacity:0.6; }
      100% { opacity:0; transform: translate(var(--px), -520px) rotate(380deg) scale(1.2); }
    }
  `}</style>
);

// ─── Main Component ───────────────────────────────────────────────────
const ClickToLight = ({ onComplete }: Props) => {
  const [isLit, setIsLit] = useState(false);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [fireflies, setFireflies] = useState<FireflyData[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [circleLanterns, setCircleLanterns] = useState<CircleLantern[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number; dur: number; emoji: string; px: number }[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  // initial fireflies
  useEffect(() => { spawnFireflies(8); }, []);

  const spawnFireflies = useCallback((n: number) => {
    const newFF: FireflyData[] = Array.from({ length: n }, () => ({
      id: fireflyCounter++,
      x: Math.random() * 85 + 5,
      y: Math.random() * 55 + 10,
      dur: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      dx: [Math.random() * 80 - 40, Math.random() * 80 - 40, Math.random() * 80 - 40],
      dy: [Math.random() * 60 - 30, Math.random() * 60 - 30, Math.random() * 60 - 30],
    }));
    setFireflies((f) => [...f, ...newFF]);
  }, []);

  const buildCircleLanterns = useCallback(() => {
    const sw = window.innerWidth, sh = window.innerHeight;
    const isMobile = sw < 768;
    const count = isMobile ? 6 : 8; 
    
    // ලන්තෑරුම් ටිකක් ලොකු කරපු නිසා වටරවුම (Radius) චුට්ටක් එළියට ගත්තා overlap වෙන එක අඩු කරන්න
    const rx = isMobile ? sw * 0.38 : sw * 0.38;
    const ry = isMobile ? sh * 0.26 : sh * 0.30;
    
    // ─── වෙනස 2: වටේ තියෙන ලන්තෑරුම් වල Base Size එක සැලකිය යුතු ලෙස වැඩි කළා ───
    const baseSize = isMobile ? 80 : 120;

    // හරියටම (+) හැඩයට එන්න Offset එක
    const angleOffset = -Math.PI / 2;

    const newLanterns: CircleLantern[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + angleOffset;
      return {
        x: 50 + (rx / sw) * 100 * Math.cos(angle),
        y: 40 + (ry / sh) * 100 * Math.sin(angle),
        size: baseSize + Math.random() * 15, // Randomly size එක පොඩ්ඩක් වෙනස් වෙනවා
        delay: i * 0.18 + 0.3,
      };
    });
    setCircleLanterns(newLanterns);
  }, []);

  const handleLightLantern = useCallback((e: React.MouseEvent) => {
    if (isLit) return;
    setIsLit(true);
    e.stopPropagation();

    const rid = Date.now();
    setRipples((r) => [...r, { id: rid, x: e.clientX, y: e.clientY }]);

    spawnFireflies(20);

    setTimeout(() => buildCircleLanterns(), 100);

    setTimeout(() => {
      setShowSuccess(true);
      const emojis = ["🪷", "🌸", "🌺", "🌼"];
      const newPetals = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 85 + 5,
        delay: i * 0.24,
        dur: 4 + Math.random() * 3,
        emoji: emojis[i % emojis.length],
        px: Math.random() * 60 - 30,
      }));
      setPetals(newPetals);
    }, 1400);

    // ─── START ZOOM OUT ANIMATION ───
    setTimeout(() => {
      setIsZoomingOut(true);
    }, 3000);

    // ─── COMPLETE AND UNMOUNT ───
    setTimeout(() => {
      onCompleteRef.current?.();
    }, 3500); 
  }, [isLit, spawnFireflies, buildCircleLanterns]);

  const overlayOpacity = isLit ? 0.05 : 0.88;

  return (
    <>
      <GlobalStyles />
      <motion.div
        animate={{ 
          scale: isZoomingOut ? 3 : 1,
          opacity: isZoomingOut ? 0 : 1,
          filter: isZoomingOut ? "blur(10px)" : "blur(0px)" 
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "fixed", inset: 0, zIndex: 50, overflow: "hidden",
          background: "#020714", touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          transformOrigin: "50% 50%"
        }}
      >
        <NightSky />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute", inset: 0, background: "#020714",
            pointerEvents: "none", zIndex: 1,
            opacity: overlayOpacity, transition: "opacity 1.2s ease",
          }}
        />

        {/* Warm glow when lit */}
        {isLit && (
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
              background: "radial-gradient(ellipse at 50% 40%, rgba(251,146,60,0.22) 0%, transparent 78%)",
              animation: "none", opacity: 1, transition: "opacity 2s ease",
            }}
          />
        )}

        {/* Fireflies */}
        <div style={{ zIndex: 4 }}>
          {fireflies.map((ff) => <Firefly key={ff.id} data={ff} />)}
        </div>

        {/* Ripples */}
        {ripples.map((r) => (
          <Ripple key={r.id} x={r.x} y={r.y}
            onDone={() => setRipples((prev) => prev.filter((p) => p.id !== r.id))} />
        ))}

        {/* Petals */}
        {petals.map((p) => <Petal key={p.id} {...p} />)}

        {/* Circle lanterns */}
        <AnimatePresence>
          {isLit && circleLanterns.map((cl, idx) => (
            <motion.div
              key={`cl-${idx}`}
              style={{
                position: "absolute",
                zIndex: 8,
                pointerEvents: "none",
              }}
              initial={{ left: "50%", top: "40%", scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ left: `${cl.x}%`, top: `${cl.y}%`, scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              transition={{
                delay: cl.delay,
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1], 
              }}
            >
              <CircleLanternSVG size={cl.size} swayDelay={cl.delay} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Main lantern */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
          initial={{ x: "-50%", y: "-50%", scale: 1 }}
          animate={{ x: "-50%", y: "-50%", scale: isLit ? 0.75 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onClick={handleLightLantern}
        >
          <MainLantern lit={isLit} />

          {!isLit && (
            <div style={{ marginTop: 10, animation: "tapBounce 1.2s ease-in-out infinite" }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ display: "block" }}>
                <circle cx="28" cy="28" r="26"
                  fill="rgba(255,220,100,0.12)"
                  stroke="rgba(255,220,100,0.4)"
                  strokeWidth="1" />
                <text x="28" y="36" textAnchor="middle" fontSize="26">👆</text>
              </svg>
            </div>
          )}
        </motion.div>

        {/* Tap hint */}
        {!isLit && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ 
              opacity: [0.4, 1, 0.4], 
              y: 0, 
              x: "-50%" 
            }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            transition={{ 
              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 0.5 }
            }}
            className="fixed bottom-8 left-1/2 z-30 flex w-[90%] max-w-[400px] flex-col items-center gap-1.5 text-center pointer-events-none"
          >       
            <p
              className="font-sinhala text-[#ffdc64] drop-shadow-[0_0_10px_rgba(255,220,100,0.6)]"
              style={{
                fontSize: "clamp(14px, 4vw, 20px)",
                letterSpacing: "0.05em",
              }}
            >
              ✦ <span className="inline-block scale-110 drop-shadow-none">👆</span> Click කරන්න ✦
            </p>

            <p
              className="text-[rgba(255,220,100,0.6)] uppercase"
              style={{
                fontSize: "clamp(10px, 2.5vw, 14px)",
                letterSpacing: "clamp(0.15em, 0.6vw, 0.3em)",
              }}
            >
              tap the <span className="inline-block text-sm opacity-90">👆</span> to light it
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ClickToLight;