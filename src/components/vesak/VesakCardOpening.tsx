import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import lotus from "@/assets/lotus.png";
import Lantern from "./Lantern";

interface Props {
  onOpened: () => void;
}

const VesakCardOpening = ({ onOpened }: Props) => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/vesak-song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    audioRef.current?.play().catch(() => {
      /* autoplay blocked, will require user toggle */
    });
    setTimeout(onOpened, 1800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    if (!next && audioRef.current.paused) audioRef.current.play().catch(() => {});
    setMuted(next);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-40 flex items-center justify-center px-4 py-10"
      style={{ perspective: 1600 }}
    >
      {/* Fireflies */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold-glow animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: "0 0 12px hsl(var(--gold-glow))",
          }}
        />
      ))}

      {/* Mute button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="absolute right-6 top-6 z-50 rounded-full border border-gold/40 bg-background/40 p-3 text-gold/80 backdrop-blur-md transition hover:border-gold hover:text-gold-glow"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <motion.button
        onClick={handleOpen}
        aria-label="Open Vesak greeting card"
        animate={{ y: open ? 0 : [0, -6, 0] }}
        transition={{ duration: 4, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
        className="group relative h-[420px] w-[320px] sm:h-[480px] sm:w-[380px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Inside (revealed when open) */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-card p-8 text-center shadow-card gold-border"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle at center, hsl(var(--gold-glow) / 0.4), transparent 70%)",
                }}
              />
              <Lantern size={90} />
              <h3 className="font-sinhala text-glow mt-4 text-2xl font-bold text-gold-glow">
                ඔබට සුභ වෙසක් මංගල්‍යයක් වේවා
              </h3>
              <p className="font-display mt-2 italic text-gold/90">
                May this Vesak fill your heart with light
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card cover (folds up) */}
        <motion.div
          animate={{ rotateX: open ? -170 : 0 }}
          transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-card p-8 text-center shadow-card gold-border"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/20" />
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-saffron/20 blur-3xl" />

          <Lantern size={110} />

          <img
            src={lotus}
            alt=""
            className="mt-4 h-12 w-12 drop-shadow-[0_0_10px_hsl(var(--lotus)/0.6)]"
          />

          <h2 className="font-sinhala text-glow mt-4 text-2xl font-bold leading-snug text-gold-glow sm:text-3xl">
            සුභ වෙසක් මංගල්‍යයක්
          </h2>
          <p className="font-display mt-3 text-sm uppercase tracking-[0.35em] text-gold/80 sm:text-base">
            Open Your Vesak Blessing
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold/90 backdrop-blur-md transition group-hover:border-gold group-hover:text-gold-glow">
            Tap to Open
          </span>
        </motion.div>
      </motion.button>
    </motion.section>
  );
};

export default VesakCardOpening;