import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── ධම්මපද ගාථා සහ බුදු වදන් ලැයිස්තුව ───
const quotes = [
  {
    pali: "මනෝ පුබ්බඞ්ගමා ධම්මා, මනෝ සෙට්ඨා මනෝමයා...",
    sinhala: "සියලු දේට සිත මූලික වේ. සිත ප්‍රධාන වේ.",
    english: "Mind precedes all mental states. Mind is their chief; they are all mind-wrought.",
  },
  {
    pali: "නහි වේරේන වේරානි - සම්මන්තීධ කුදාචනං",
    sinhala: "වෛරයෙන් වෛරය කිසිදා නොසන්සිඳේ. අවෛරයෙන්ම එය සන්සිඳේ.",
    english: "Hatred is never appeased by hatred in this world; by non-hatred alone is hatred appeased.",
  },
  {
    pali: "ආරෝග්‍යා පරමා ලාභා - සන්තුට්ඨී පරමං ධනං",
    sinhala: "නිරෝගීකම උතුම්ම ලාභයයි. සතුට උතුම්ම ධනයයි.",
    english: "Health is the ultimate profit, contentment is the ultimate wealth.",
  },
  {
    pali: "සබ්බ පාපස්ස අකරණං - කුසලස්ස උපසම්පදා",
    sinhala: "සියලු පව් කිරීමෙන් වැළකීමත්, කුසල් රැස් කිරීමත් බුදුවරුන්ගේ අනුශාසනාවයි.",
    english: "To avoid all evil, to cultivate good, and to cleanse one's mind—this is the teaching of the Buddhas.",
  }
];

const BuddhaQuotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // තත්පර 15කට වරක් ගාථාව මාරු වීම
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 15000); // 15 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden py-20">
      
      {/* ─── Background Dharma Chakra (Subtle & Spinning slowly) ─── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute z-0 opacity-[0.03] md:opacity-[0.05]"
      >
        <svg width="400" height="400" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#fbbf24" strokeWidth="1" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="#fbbf24" strokeWidth="2" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="50" y1="50"
              x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="#fbbf24" strokeWidth="0.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* ─── Glowing Orbs (Mobile Optimization: blur අඩු කර ඇත) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-yellow-600/10 blur-[50px] sm:blur-[100px] z-0 pointer-events-none" />

      {/* ─── Title ─── */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        // Mobile වලදී glow effect ඉවත් කර drop shadow යෙදීම
        className="font-sinhala text-3xl sm:text-5xl font-bold text-yellow-400 drop-shadow-md sm:drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] mb-6 lg:mb-12"
      >
        ❖ ධම්ම පදය ❖
      </motion.h2>

      {/* ─── Quotes Container ─── */}
      {/* වෙනස: වැරදි Comment ඉවත් කර, Mobile වලදී shadow සහ blur ඉවත් කළා */}
      <div className="z-10 flex min-h-[300px] w-[90%] max-w-3xl flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center border border-yellow-500/20 sm:border-yellow-500/30 rounded-2xl sm:rounded-3xl bg-black/60 sm:bg-black/20 sm:backdrop-blur-sm shadow-md sm:shadow-[0_0_30px_rgba(250,204,21,0.2)]">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} 
            // ─── වෙනස: GPU බර අඩු කිරීමට filter: "blur(5px)" සම්පූර්ණයෙන්ම ඉවත් කර opacity සහ Y පමණක් තැබුවා ───
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 sm:gap-6"
          >
            {/* පාලි ගාථාව */}
            <p className="font-sinhala text-lg sm:text-xl md:text-3xl font-medium leading-relaxed text-yellow-300 drop-shadow-sm sm:drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]">
              "{quotes[currentIndex].pali}"
            </p>

            {/* සිංහල තේරුම */}
            <p className="font-sinhala text-base sm:text-lg md:text-xl text-yellow-100/90">
              {quotes[currentIndex].sinhala}
            </p>

            {/* English Translation */}
            <p className="mt-2 sm:mt-4 font-display text-xs sm:text-sm md:text-base italic tracking-wide text-yellow-200/50">
              {quotes[currentIndex].english}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Quote Indicator Dots ─── */}
      <div className="z-10 mt-10 sm:mt-12 flex gap-3">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              idx === currentIndex 
                ? "bg-yellow-400 w-6 shadow-[0_0_8px_#facc15]" 
                : "bg-yellow-700/50 hover:bg-yellow-500/80"
            }`}
            aria-label={`Go to quote ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default BuddhaQuotes;