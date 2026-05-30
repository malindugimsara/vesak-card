import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import LogoHeader from "./LogoHeader";
import Lantern from "./Lantern";

interface WelcomeScreenProps {
  onOpen: () => void;
}

const WelcomeScreen = ({ onOpen }: WelcomeScreenProps) => {
  return (
    <motion.section
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }} // වේගය වැඩි කළා (0.8 -> 0.5)
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-16 text-center"
    >
      <LogoHeader />

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }} // Delay අඩු කළා
        // ─── වෙනස: Mobile වලදී text-glow ඉවත් කර සරල drop-shadow-md යෙදුවා ───
        className="font-sinhala mt-10 text-3xl font-bold text-yellow-400 drop-shadow-md sm:text-glow sm:text-gold-glow sm:drop-shadow-none sm:text-4xl md:text-5xl"
      >
        සුභ වෙසක් මංගල්‍යයක් වේවා
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        // ─── වෙනස: Mobile වලදී text-glow-soft ඉවත් කර සරල drop-shadow-sm යෙදුවා ───
        className="font-display mt-3 text-2xl italic text-yellow-500/90 drop-shadow-sm sm:text-glow-soft sm:text-gold/90 sm:drop-shadow-none sm:text-3xl"
      >
        Happy Vesak
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // Scale වෙනස (0.8 -> 0.9) GPU load එක අඩු කරයි
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-10 sm:mt-12"
      >
        <Lantern size={200} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        // ─── වෙනස: whileHover ඉවත් කර whileTap පමණක් තැබුවා ───
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        // ─── වෙනස: glow-gold සහ heavy shadow Mobile වලදී ඉවත් කළා (sm: යෙදුවා) ───
        className="mt-12 sm:mt-14 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 sm:bg-gradient-gold px-8 py-3.5 sm:px-10 sm:py-4 font-display text-base sm:text-lg font-bold uppercase tracking-widest text-black sm:text-primary-foreground shadow-md transition-all sm:glow-gold sm:hover:shadow-[0_0_40px_hsl(var(--gold-glow)/0.6)]"
      >
        <Sparkles className="h-5 w-5 text-black sm:text-current" />
        Open Card
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="font-sinhala mt-6 text-xs sm:text-sm text-white/60 sm:text-muted-foreground"
      >
        ආලෝකයේ උත්සවය • Festival of Light
      </motion.p>
    </motion.section>
  );
};

export default WelcomeScreen;