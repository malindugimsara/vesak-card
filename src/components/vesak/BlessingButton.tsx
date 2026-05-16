import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/** Sadhu blessing button — on click, three "Sadhu" rise gently. */
const BlessingButton = () => {
  const [bursts, setBursts] = useState<number[]>([]);

  const handleClick = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 2400);
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="bg-gradient-gold glow-gold font-sinhala rounded-full px-10 py-3 text-lg font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_70px_hsl(var(--gold-glow)/0.9)]"
      >
        සාදු 🙏
      </motion.button>

      <AnimatePresence>
        {bursts.map((id) => (
          <div
            key={id}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, x: (i - 1) * 60, scale: 0.6 }}
                animate={{ opacity: [0, 1, 1, 0], y: -120 - i * 20, scale: 1.1 }}
                transition={{ duration: 2.2, delay: i * 0.15, ease: "easeOut" }}
                className="text-glow font-sinhala absolute text-xl font-semibold text-gold-glow"
              >
                සාදු
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BlessingButton;