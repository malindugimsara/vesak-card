import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SacredEvent } from "./SacredEventCards";

interface Props {
  event: SacredEvent | null;
  onClose: () => void;
}

const VideoModal = ({ event, onClose }: Props) => {
  // ─── අලුතින් එකතු කළ Loading State එක ───
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!event) return;
    
    setIsLoading(true); 
    
    // ─── වීඩියෝව විවෘත වූ වහාම BGM එක නවත්වන්න ───
    window.dispatchEvent(new Event("pause-bgm"));
    
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      
      // ─── වීඩියෝව වැසූ පසු නැවත BGM පටන් ගන්න ───
      window.dispatchEvent(new Event("resume-bgm"));
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-night-deep/85 px-4 py-8 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-card p-4 shadow-card gold-border sm:p-6"
          >
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 rounded-full border border-gold/40 bg-background/60 p-2 text-gold/90 backdrop-blur-md transition hover:border-gold hover:text-gold-glow"
            >
              <X size={18} />
            </button>

            <div className="relative overflow-hidden rounded-2xl bg-night-deep ring-1 ring-gold/20 flex items-center justify-center min-h-[250px] sm:min-h-[400px]">
              
              {/* ─── Loading Spinner ─── */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-20">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
                  <p className="mt-4 animate-pulse font-sinhala text-sm text-yellow-500/70">
                    වීඩියෝව Load වෙමින් පවතී...
                  </p>
                </div>
              )}

              {/* ─── The Iframe ─── */}
              <iframe
                key={event.video}
                src={`${event.video}&rel=0`}
                title={event.english}
                className={`aspect-video w-full border-none transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                // Iframe එක සම්පූර්ණයෙන් Load වුණාම isLoading false කරනවා
                onLoad={() => setIsLoading(false)} 
              ></iframe>
            </div>

            <div className="px-2 py-5 text-center sm:px-6">
              <h3 className="font-sinhala text-glow-soft text-2xl font-bold text-gold-glow">
                {event.sinhala}
              </h3>
              <p className="font-heading mt-1 text-sm uppercase tracking-[0.3em] text-gold/90">
                {event.english}
              </p>
              <p className="font-display mx-auto mt-3 max-w-2xl text-base italic text-foreground/80">
                {event.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;