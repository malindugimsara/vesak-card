import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SacredEvent } from "./SacredEventCards";

interface Props {
  event: SacredEvent | null;
  onClose: () => void;
}

const VideoModal = ({ event, onClose }: Props) => {
  // ─── Loading State එක ───
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!event) return;
    
    setIsLoading(true); 
    
    // ─── වීඩියෝව විවෘත වූ වහාම BGM එක නවත්වන්න ───
    window.dispatchEvent(new Event("pause-bgm"));
    
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    
    // ─── අලුත් Trick එක: තත්පර 1.5 කට පසු අනිවාර්යයෙන්ම Loading Screen එක ඉවත් කිරීම (Fallback) ───
    // Iframe onLoad event එක පරක්කු වුණත් මෙයින් වීඩියෝව ඉක්මනින් පෙන්වයි.
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(fallbackTimer); // Timer එක Clear කිරීම
      
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
            // ─── flex-col සහ max-h-[95vh] යොදා කාඩ් එක Mobile එකට ගැලපෙන සේ සකස් කළා ───
            className="relative w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden rounded-3xl bg-gradient-card p-4 shadow-card gold-border sm:p-6"
          >
            
            <div className="relative overflow-hidden rounded-2xl bg-night-deep ring-1 ring-gold/20 flex items-center justify-center min-h-[200px] sm:min-h-[400px] flex-shrink-0">
              
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
                // Iframe එක සම්පූර්ණයෙන් Load වුණාම isLoading false කරනවා. (නමුත් Fallback එක ඊටත් කලින් වැඩ කළ හැක).
                onLoad={() => setIsLoading(false)} 
              ></iframe>
            </div>

            {/* ─── විස්තරය overflow-y-auto දමා Scroll විය හැකි ලෙස සකස් කළා ─── */}
            <div className="px-2 py-4 text-center sm:px-6 overflow-y-auto flex-1">
              <h3 className="font-sinhala text-glow-soft text-xl sm:text-2xl font-bold text-gold-glow">
                {event.sinhala}
              </h3>
              <p className="font-heading mt-1 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold/90">
                {event.english}
              </p>
              <p className="font-display mx-auto mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base italic text-foreground/80">
                {event.description}
              </p>
            </div>

            {/* ─── පහළ Close Button එක ─── */}
            <div className="mt-2 flex justify-center pt-2 border-t border-yellow-500/20">
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-gradient-to-r from-red-900/80 to-red-700 hover:from-red-600 hover:to-red-500 border border-red-500/50 text-white px-8 py-3 rounded-full font-sinhala font-bold text-sm sm:text-base shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                <X className="w-5 h-5" /> Close
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;