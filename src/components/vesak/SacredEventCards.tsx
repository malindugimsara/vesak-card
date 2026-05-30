import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play } from "lucide-react"; 
import ipadima from "@/assets/ipadima.jpg";
import buduwima from "@/assets/buduwima.webp";
import piriniwanpema from "@/assets/piriniwanpema.jpg";
import VideoModal from "./VideoModal";

export interface SacredEvent {
  id: string;
  sinhala: string;
  english: string;
  theme: string;
  description: string;
  image: string;
  video: string;
}

const events: SacredEvent[] = [
  {
    id: "birth",
    sinhala: "සිදුහත් කුමරුගේ උපත",
    english: "The Birth of Prince Siddhartha",
    theme: "Lotus · Royal Garden · Queen Maya",
    description:
      "In the sacred garden of Lumbini, beneath blooming Sal trees, Prince Siddhartha was born — taking seven steps upon lotus blossoms.",
    image: ipadima,
    // ─── අලුත් Unlisted Video Link එක ───
    video: "https://www.youtube.com/embed/clmPhm3gBSM?autoplay=1&rel=0&vq=small",
  },
  {
    id: "enlightenment",
    sinhala: "සම්බුද්ධත්වය",
    english: "The Enlightenment",
    theme: "Bodhi Tree · Meditation · Divine Light",
    description:
      "Beneath the Jaya Sri Maha Bodhi tree at Bodh Gaya, Siddhartha attained supreme enlightenment and became the Buddha.",
    image: buduwima,
    // ─── අලුත් Unlisted Video Link එක ───
    video: "https://www.youtube.com/embed/JejYvpUx5YI?autoplay=1&rel=0&vq=small",
  },
  {
    id: "parinirvana",
    sinhala: "පිරිනිවන් පෑම",
    english: "The Parinirvana",
    theme: "Sal Trees · Serenity · Golden Peace",
    description:
      "At Kushinagar, between twin Sal trees, the Buddha entered Parinirvana — the final liberation, leaving a path of peace for all beings.",
    image: piriniwanpema,
    // ─── අලුත් Unlisted Video Link එක ───
    video: "https://www.youtube.com/embed/MvYGIrNhqNI?autoplay=1&rel=0&vq=small",
  },
];

const SacredEventCards = () => {
  const [active, setActive] = useState<SacredEvent | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setActive(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleOpenModal = (ev: SacredEvent) => {
    setActive(ev);
    window.history.pushState({ isModalOpen: true }, "");
  };

  const handleCloseModal = () => {
    setActive(null);
    if (window.history.state?.isModalOpen) {
      window.history.back();
    }
  };

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32 bg-night-deep/30">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[80vw] sm:w-[60vw] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="mx-auto max-w-6xl text-center relative z-10">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
          className="font-sinhala text-glow text-3xl font-bold text-gold-glow sm:text-5xl mb-3 sm:mb-4"
        >
          තෙමඟුල
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] text-gold/70"
        >
          The Three Sacred Events
        </motion.p>
        
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, i) => (
            <motion.button
              key={ev.id}
              onClick={() => handleOpenModal(ev)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 70px -10px hsl(var(--gold-glow)/0.4)" }}
              // ─── වෙනස: Mobile වලදී Shadow එක අඩු කර glass (blur) එක අයින් කළා. Desktop වලට පමණක් glass එක තැබුවා ───
              className="bg-black/60 backdrop-blur-none sm:glass group relative flex flex-col items-center overflow-hidden rounded-3xl p-4 sm:p-6 text-center cursor-pointer border border-gold/20 shadow-md sm:shadow-[0_0_15px_rgba(250,204,21,0.05)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ─── වෙනස: blur-3xl කියන අධික බර effect එක Mobile වලින් සඟවා (hidden sm:block) Desktop වලට පමණක් දුන්නා ─── */}
              <div className="hidden sm:block pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-xl border border-gold/20 shadow-inner">
                
                {/* ─── වෙනස: Mobile වලදී backdrop-blur එක සම්පූර්ණයෙන්ම ඉවත් කළා (GPU load එක අඩු කිරීමට) ─── */}
                <div className="absolute inset-0 bg-black/40 sm:bg-transparent sm:group-hover:bg-black/50 transition-all duration-300 z-10 flex items-center justify-center">
                  
                  {/* ─── වෙනස: Mobile වලදී ලොකු Shadow එක වෙනුවට කුඩා Shadow එකක් (shadow-lg) භාවිතා කළා ─── */}
                  <div className="p-3 sm:p-4 rounded-full bg-gold-glow/90 text-white shadow-lg sm:shadow-[0_0_20px_rgba(250,204,21,0.6)] border border-gold/50 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform scale-90 sm:scale-100">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                  </div>
                </div>

                <img
                  src={ev.image}
                  alt={ev.english}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>
              
              {/* Content */}
              <h3 className="font-sinhala text-glow-soft mt-5 text-lg sm:text-xl font-bold text-gold-glow">
                {ev.sinhala}
              </h3>
              <p className="font-heading mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold/90">
                {ev.english}
              </p>
              
              <div className="flex-1 mt-2 sm:mt-3">
                <p className="font-display text-xs italic text-muted-foreground leading-relaxed px-1 sm:px-2">
                  {ev.theme}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 w-full flex justify-center">
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-full border border-gold/50 sm:border-gold/40 bg-gold-glow/10 sm:bg-night-deep/50 px-6 py-3 sm:py-2.5 text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold text-gold-glow sm:text-gold/80 transition-all duration-300 group-hover:border-gold group-hover:bg-gold-glow group-hover:text-night-deep group-hover:shadow-lg">
                  <Play className="w-4 h-4 fill-current" /> Play Now
                </span>
              </div>

            </motion.button>
          ))}
        </div>
      </div>

      <VideoModal event={active} onClose={handleCloseModal} />
    </section>
  );
};

export default SacredEventCards;