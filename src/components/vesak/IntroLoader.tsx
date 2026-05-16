import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import buddha from "@/assets/buddha.png";

interface Props {
  onFinish: () => void;
}

const IntroLoader = ({ onFinish }: Props) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 4500);
    const t2 = setTimeout(onFinish, 5500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, hsl(230 55% 9%) 0%, hsl(232 60% 4%) 70%)" }}
    >
      {/* Light rays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 1 : 0.7 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(45 100% 70% / 0.35) 0%, transparent 45%)",
        }}
      />

      {/* Soft fog */}
      <div className="pointer-events-none absolute inset-0 opacity-40"
           style={{ background: "radial-gradient(ellipse at 50% 80%, hsl(45 100% 70% / 0.15), transparent 60%)" }} />

      {/* Floating petals */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-3 w-3 rounded-full bg-lotus/70 blur-[1px] animate-[petal-fall_linear_infinite]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Candlelight particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={`c${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-gold-glow animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${30 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: "0 0 12px hsl(var(--gold-glow))",
          }}
        />
      ))}

      {/* Buddha */}
      <motion.img
        src={buddha}
        alt="Lord Buddha"
        width={420}
        height={420}
        initial={{ opacity: 0, scale: 0.85, y: 0 }}
        animate={{
          opacity: exiting ? 0 : 1,
          scale: exiting ? 1.05 : 1,
          y: exiting ? -60 : 0,
        }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="relative z-10 h-auto w-[260px] sm:w-[340px] md:w-[400px] drop-shadow-[0_0_60px_hsl(var(--gold-glow)/0.8)]"
      />

      {/* Aura ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] rounded-full animate-glow-pulse"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, hsl(var(--gold-glow) / 0.3) 0%, transparent 60%)",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: exiting ? 0 : 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.4 }}
        className="font-sinhala text-glow relative z-10 mt-8 text-3xl font-bold text-gold-glow sm:text-5xl"
      >
        නමෝ බුද්ධාය
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="font-display relative z-10 mt-3 text-base italic text-gold/90 sm:text-xl"
      >
        May peace and wisdom illuminate all beings
      </motion.p>

      <button
        onClick={() => {
          setExiting(true);
          setTimeout(onFinish, 800);
        }}
        className="absolute bottom-8 right-8 z-20 rounded-full border border-gold/40 bg-background/40 px-5 py-2 text-xs uppercase tracking-widest text-gold/80 backdrop-blur-md transition-colors hover:border-gold hover:text-gold-glow"
      >
        Skip Intro
      </button>

      {/* Final flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0.6 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="pointer-events-none absolute inset-0 bg-gold-glow"
      />
    </motion.div>
  );
};

export default IntroLoader;