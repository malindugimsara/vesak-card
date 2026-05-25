import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, ChevronDown } from "lucide-react";

interface Props {
  onJourney: () => void;
  // 1. FIX: මෙතන 'onLight' විදිහටම තියන්න ඕනේ, මොකද Index.tsx එකෙන් pass කරන්නේ ඒ නමින්.
  onLight: () => void; 
}

const HeroSection = ({ onJourney, onLight }: Props) => {
  const [isArrowHighlighted, setIsArrowHighlighted] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLightClick = () => {
    setIsArrowHighlighted(true);
    
    // 2. FIX: මෙතනට onLight() කෝල් කරන්න ඕනේ.
    onLight();

    setTimeout(() => {
      setIsArrowHighlighted(false);
    }, 3000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-32 text-center">
      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute right-8 top-20 h-28 w-28 rounded-full bg-moon animate-moon-pulse sm:right-20 sm:h-40 sm:w-40"
        style={{ boxShadow: "0 0 80px hsl(var(--moon-glow) / 0.7)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-heading mb-4 mt-12 text-md uppercase tracking-[0.2em] text-gold/70 sm:text-sm lg:text-xl">
          වෙසක් පෝය 2026
        </p>
        
        <h1 className="text-glow flex flex-col gap-3 text-3xl font-bold leading-tight text-gold-glow sm:text-5xl md:text-6xl">
          <span className="font-sinhala">
            {userName ? `${userName}, සුබ වෙසක් මංගල්‍යයක් වේවා!` : "සැමට සුබ වෙසක් මංගල්‍යයක් වේවා!"}
          </span>
          <span className="font-display text-2xl sm:text-4xl md:text-5xl opacity-90">
            {userName ? `Happy Vesak, ${userName}!` : "Happy Vesak to All!"}
          </span>
        </h1>
        
        <p className="font-sinhala-sans mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-xl">
          දයාව, කරුණාව සහ ප්‍රඥාවෙන් ලොව ආලෝකමත් කරමු.
        </p>
        <p className="font-display mt-3 text-base italic text-gold/80 sm:text-lg">
          Let kindness, compassion and wisdom light the world.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            // 3. FIX: මෙතනට handleLightClick දෙන්න, එතකොට arrow එකත් එක්කම scroll වෙනවා.
            onClick={handleLightClick} 
            className="bg-gradient-gold glow-gold inline-flex items-center gap-2 rounded-full px-8 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary-foreground"
          >
            <Sparkles className="h-4 w-4" /> වෙසක් බලන්න යමු
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onJourney}
            className="glass inline-flex items-center gap-2 rounded-full px-8 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-gold-glow"
          >
            <Flame className="h-4 w-4" /> තොරණ බලන්න යමු
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Scroll Down Arrow ─── */}
      <motion.div
        animate={
          isArrowHighlighted
            ? { 
                y: [0, 15, 0], 
                scale: [1, 1.3, 1],
                opacity: [1, 0.8, 1] 
              }
            : { y: [0, 10, 0], scale: 1, opacity: 0.6 }
        }
        transition={
          isArrowHighlighted
            ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        className={`absolute bottom-8 z-10 flex flex-col items-center justify-center rounded-full transition-all duration-500 ${
          isArrowHighlighted 
            ? "text-yellow-400 bg-yellow-500/20 p-3 shadow-[0_0_20px_rgba(250,204,21,0.6)]" 
            : "text-gold/60 p-2"
        }`}
      >
        {isArrowHighlighted && (
          <span className="mb-2 font-sinhala text-xs text-yellow-400 drop-shadow-md">
            පහළට
          </span>
        )}
        <ChevronDown className={`transition-all duration-500 ${isArrowHighlighted ? "h-8 w-8" : "h-6 w-6"}`} />
      </motion.div>
    </section>
  );
};

export default HeroSection;