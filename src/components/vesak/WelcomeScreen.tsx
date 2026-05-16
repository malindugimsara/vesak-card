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
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center"
    >
      <LogoHeader />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="font-sinhala text-glow mt-10 text-3xl font-bold text-gold-glow sm:text-4xl md:text-5xl"
      >
        සුභ වෙසක් මංගල්‍යයක් වේවා
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="font-display text-glow-soft mt-3 text-2xl italic text-gold/90 sm:text-3xl"
      >
        Happy Vesak
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12"
      >
        <Lantern size={200} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpen}
        className="bg-gradient-gold glow-gold mt-14 inline-flex items-center gap-2 rounded-full px-10 py-4 font-display text-lg font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:shadow-[0_0_60px_hsl(var(--gold-glow)/0.8)]"
      >
        <Sparkles className="h-5 w-5" />
        Open Card
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="font-sinhala mt-6 text-sm text-muted-foreground"
      >
        ආලෝකයේ උත්සවය • Festival of Light
      </motion.p>
    </motion.section>
  );
};

export default WelcomeScreen;