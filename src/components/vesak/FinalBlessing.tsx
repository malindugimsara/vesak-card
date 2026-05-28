import { motion } from "framer-motion";
import { Share2, RotateCcw } from "lucide-react";
import lotus from "@/assets/lotus.png";
// 1. ADDED: react-router-dom එකෙන් useNavigate import කිරීම
import { useNavigate } from "react-router-dom"; 

interface Props {
  onReplay: () => void;
}

const FinalBlessing = ({ onReplay }: Props) => {
  // 2. ADDED: navigate function එක හදාගැනීම
  const navigate = useNavigate();

  // 3. UPDATED: Share button එක එබුවම Admin page එකට යන විදිහට හැදුවා
  const handleShareClick = () => {
    // ඔයාගේ App.tsx එකේ Admin page එකට දීලා තියෙන path එක මෙතන දෙන්න.
    // උදාහරණයක් විදිහට "/admin" හෝ "/vesak-admin"
    navigate("/share-card"); 
  };

  return (
    <section className="relative px-6 py-28 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="mx-auto mb-8 w-32 sm:w-40"
      >
        <img
          src={lotus}
          alt="Lotus"
          width={160}
          height={160}
          loading="lazy"
          className="h-auto w-full drop-shadow-[0_0_30px_hsl(var(--lotus)/0.7)]"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
        className="font-sinhala text-glow mx-auto max-w-3xl text-2xl font-bold leading-relaxed text-gold-glow sm:text-4xl"
      >
        සියලු සත්ත්වයෝ සුවපත් වෙත්වා
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="font-display mt-4 text-lg italic text-gold/90 sm:text-2xl"
      >
        May all beings be happy and peaceful.
      </motion.p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        
        {/* UPDATED Button: onClick එක handleShareClick වලට වෙනස් කළා */}
        <button
          onClick={handleShareClick}
          className="bg-gradient-gold glow-gold inline-flex items-center gap-2 rounded-full px-7 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
        >
          <Share2 className="h-4 w-4" /> Share Vesak Card
        </button>

        <button
          onClick={onReplay}
          className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-gold-glow transition-transform hover:scale-105"
        >
          <RotateCcw className="h-4 w-4" /> Replay Journey
        </button>

      </div>
    </section>
  );
};

export default FinalBlessing;