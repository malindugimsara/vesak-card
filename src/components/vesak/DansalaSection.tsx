import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Custom SVGs for Dansal Items ───

const TeaCupIcon = () => (
  <svg viewBox="0 0 100 120" className="w-24 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)] md:w-32">
    
    {/* Steam (උණුසුම් දුම) */}
    <path d="M38 35 C 28 20, 48 10, 38 0" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0ms' }} />
    <path d="M50 40 C 40 25, 60 15, 50 5" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.8" className="animate-pulse" style={{ animationDelay: '300ms' }} />
    <path d="M62 35 C 52 20, 72 10, 62 0" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '600ms' }} />

    {/* Saucer (පීරිසිය) */}
    <ellipse cx="50" cy="95" rx="35" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <ellipse cx="50" cy="97" rx="20" ry="4" fill="#e2e8f0" />

    {/* Cup Handle (කෝප්පයේ අත) */}
    <path d="M70 55 C 95 55, 95 80, 68 85" fill="none" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
    <path d="M70 55 C 95 55, 95 80, 68 85" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

    {/* Cup Body (කෝප්පය) */}
    <path d="M25 45 L25 75 C 25 95, 75 95, 75 75 L75 45 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

    {/* Tea Bag Tag (තේ කොළ ටැග් එක) */}
    <path d="M25 55 Q 12 65 15 80" fill="none" stroke="#94a3b8" strokeWidth="1" />
    <rect x="10" y="80" width="10" height="12" fill="#fef08a" stroke="#d97706" strokeWidth="1" rx="1" />
    <circle cx="15" cy="86" r="1.5" fill="#d97706" />

    {/* Cup Top / Rim (කෝප්පයේ කට) */}
    <ellipse cx="50" cy="45" rx="25" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

    {/* Inside Tea (තේ) */}
    <ellipse cx="50" cy="46" rx="22" ry="6" fill="#92400e" />
    <ellipse cx="48" cy="47" rx="18" ry="4" fill="#78350f" />
    
    {/* Light reflection on tea (තේ එකේ දිලිසීම) */}
    <ellipse cx="56" cy="45" rx="5" ry="1.5" fill="#d97706" opacity="0.7" />
    
  </svg>
);

const KadalaIcon = () => (
  <svg viewBox="0 0 100 120" className="w-24 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)] md:w-32">
    {/* Paper Cone (Gotuwa) */}
    <path d="M15 45 L85 45 L50 110 Z" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
    <path d="M15 45 Q50 60 85 45" fill="none" stroke="#d97706" strokeWidth="2" />
    {/* Chickpeas (Kadala) */}
    {[
      { cx: 35, cy: 40 }, { cx: 45, cy: 35 }, { cx: 55, cy: 38 }, { cx: 65, cy: 42 },
      { cx: 40, cy: 30 }, { cx: 50, cy: 28 }, { cx: 60, cy: 32 }, { cx: 50, cy: 42 },
      { cx: 30, cy: 45 }, { cx: 70, cy: 44 }, { cx: 48, cy: 20 }, { cx: 55, cy: 22 },
      { cx: 42, cy: 24 }
    ].map((pos, i) => (
      <g key={i}>
        <circle cx={pos.cx} cy={pos.cy} r="5" fill="#b45309" />
        <circle cx={pos.cx - 1} cy={pos.cy - 1} r="2" fill="#d97706" />
      </g>
    ))}
    <path d="M25 55 L45 100 M75 55 L55 100" stroke="#d97706" strokeWidth="1" opacity="0.3" />
  </svg>
);

// ─── Main Component ───

const VirtualDansala = () => {
  const [selectedDansala, setSelectedDansala] = useState<"icecream" | "kadala" | null>(null);
  const [showBlessing, setShowBlessing] = useState(false);

  // දානය ලබාගැනීමේ ක්‍රියාවලිය
  const handleTakeDansala = (type: "icecream" | "kadala") => {
    setSelectedDansala(type);
    setShowBlessing(true);

    // තත්පර 3කට පසු Popup එක ඉබේම වැසී යයි
    setTimeout(() => {
      setShowBlessing(false);
      setTimeout(() => setSelectedDansala(null), 500); // Wait for exit animation
    }, 2000);
  };

  return (
    <section className="relative w-full py-24 overflow-hidden">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-sinhala text-glow text-3xl font-bold text-gold-glow sm:text-5xl mb-4">
          ඩිජිටල් දන්සල
        </h2>
        <p className="font-heading text-xs uppercase tracking-[0.5em] text-gold/70 sm:text-sm">
          Virtual Dansala
        </p>
      </motion.div>

      {/* Dansal Stalls */}
      <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center gap-10 md:flex-row md:gap-16 px-6">
        
        {/* තේ දන්සල */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="flex w-full max-w-sm flex-col items-center rounded-2xl border-2 border-green-500/30 bg-gradient-to-b from-green-900/20 to-black p-8 text-center shadow-[0_0_30px_rgba(236,72,153,0.15)]"
        >
          <TeaCupIcon />
          <h3 className="mt-6 font-sinhala text-2xl font-bold text-green-300">තේ දන්සල</h3>
          <p className="mt-2 text-sm text-green-100/60 font-sinhala">උණුසුම් තේ කෝප්පයක් රස විදිමු.</p>
          <button 
            onClick={() => handleTakeDansala("icecream")}
            className="mt-6 rounded-full bg-green-600 px-6 py-2 font-sinhala text-white transition-colors hover:bg-green-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          >
            ලබා ගන්න
          </button>
        </motion.div>

        {/* කඩල දන්සල */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="flex w-full max-w-sm flex-col items-center rounded-2xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-900/20 to-black p-8 text-center shadow-[0_0_30px_rgba(217,119,6,0.15)]"
        >
          <KadalaIcon />
          <h3 className="mt-6 font-sinhala text-2xl font-bold text-amber-400">කඩල දන්සල</h3>
          <p className="mt-2 text-sm text-amber-100/60 font-sinhala">උණුසුම් කඩල ගොටුවක රස විඳින්න.</p>
          <button 
            onClick={() => handleTakeDansala("kadala")}
            className="mt-6 rounded-full bg-amber-600 px-6 py-2 font-sinhala text-white transition-colors hover:bg-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.5)]"
          >
            ලබා ගන්න
          </button>
        </motion.div>

      </div>

      {/* ─── Blessing Modal (Animation Popup) ─── */}
      <AnimatePresence>
        {showBlessing && selectedDansala && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Glow effect behind icon */}
              <div className={`absolute top-10 h-32 w-32 rounded-full blur-3xl ${selectedDansala === "icecream" ? "bg-green-500/50" : "bg-amber-500/50"}`} />
              
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {selectedDansala === "icecream" ? <TeaCupIcon /> : <KadalaIcon />}
              </motion.div>

              <h2 className="mt-8 font-sinhala text-5xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] md:text-6xl">
                ඔබට පිං සිද්ද වේවා..! 🙏
              </h2>
              <p className="mt-4 font-sinhala text-lg text-yellow-100/80">
                {selectedDansala === "icecream" ? "තේ දන්සලට" : "කඩල දන්සලට"} පැමිණී ඔබට තෙරුවන් සරණයි.
              </p>

              {/* Sparkles (Floating upward) */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, y: 0, x: 0 }}
                  animate={{ opacity: 0, y: -100, x: (Math.random() - 0.5) * 100 }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                  className="absolute bottom-10 h-2 w-2 rounded-full bg-yellow-300"
                  style={{ boxShadow: "0 0 10px #fde047" }}
                />
              ))}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default VirtualDansala;