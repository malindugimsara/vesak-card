import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ExternalThorana = () => {
  const [showHint, setShowHint] = useState(true);
  
  // ─── අලුත් State එක: තොරණ Viewport එකේ තියෙනවද කියලා බලන්න ───
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleIframeFocus = () => {
      setTimeout(() => {
        if (document.activeElement?.tagName === "IFRAME") {
          setShowHint(false);
        }
      }, 100);
    };

    window.addEventListener("blur", handleIframeFocus);

    const autoHideTimer = setTimeout(() => {
      setShowHint(false);
    }, 12000); 

    return () => {
      window.removeEventListener("blur", handleIframeFocus);
      clearTimeout(autoHideTimer);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden py-20">
      
      {/* Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 px-4 text-center"
      >
        <h2 className="mb-4 font-sinhala text-3xl font-bold text-yellow-400 drop-shadow-md sm:drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] sm:text-5xl">
          ඩිජිටල් වෙසක් තොරණ
        </h2>
        <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-yellow-500/70 sm:text-xs">
          Codecraft Digital Thorana
        </p>
      </motion.div>

      {/* ─── Iframe Container ─── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        // ─── වෙනස: Viewport එකට ආවම true කරනවා, එළියට ගියාම false කරනවා ───
        onViewportEnter={() => {
          setIsInView(true);
          window.dispatchEvent(new Event("pause-bgm"));
        }}
        onViewportLeave={() => {
          setIsInView(false); // මෙතනදී iframe එක unmount වෙලා සද්දේ නවතිනවා
          window.dispatchEvent(new Event("resume-bgm"));
        }}
        // amount: 0 යන්නෙන් අදහස් වෙන්නේ කන්ටේනරයෙන් 0% ක් හෝ පේනවා නම් onViewportEnter වැඩ කරන බවයි
        viewport={{ once: false, amount: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden rounded-xl border border-yellow-500/30 sm:border-2 bg-black shadow-lg sm:shadow-[0_0_40px_rgba(250,204,21,0.15)] sm:rounded-2xl aspect-[9/16] w-[90vw] max-w-sm sm:max-w-md md:aspect-video md:w-[95vw] md:max-w-5xl lg:max-w-[1200px] xl:max-w-[1400px]"
      >
        
        {/* Loading Spinner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-0">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent sm:h-10 sm:w-10"></div>
          <p className="mt-4 font-sinhala text-xs text-yellow-500/70 sm:text-sm">
            තොරණ Load වෙමින් පවතී...
          </p>
        </div>

        {/* Unmute Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{ delay: 3, duration: 0.8 }}
              className="pointer-events-none absolute bottom-4 right-14 sm:bottom-6 sm:right-16 z-20 flex items-center gap-2"
            >
              <div className="rounded-xl bg-black/90 px-3 py-1.5 font-sinhala text-[10px] sm:text-xs font-semibold text-yellow-400 border border-yellow-500/50 sm:backdrop-blur-md shadow-md sm:shadow-[0_0_15px_rgba(250,204,21,0.3)] whitespace-nowrap">
                ශබ්දය ඇසීමට Click කරන්න
              </div>
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-yellow-400 text-lg sm:text-xl drop-shadow-md sm:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
              >
                👉
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── වෙනස: isInView එක true නම් පමණක් Iframe එක පෙන්වයි ─── */}
        {isInView && (
          <iframe
            src="https://codecraft-thorana.vercel.app/index.html"
            title="Digital Vesak Thorana"
            className="absolute inset-0 z-10 h-full w-full border-none"
            allow="autoplay; fullscreen"
            allowFullScreen 
            loading="lazy"
          />
        )}
      </motion.div>

      {/* Button Section */}
      <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 0.5 }}
         className="mt-8 flex flex-col items-center px-4"
      >
        <a 
          href="https://codecraft-thorana.vercel.app/index.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2.5 font-sinhala text-sm text-yellow-400 shadow-sm sm:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-colors hover:bg-yellow-500 hover:text-black"
        >
          Full Screen නැරඹීමට ↗
        </a>
        
        <p className="mt-4 font-sinhala text-[10px] sm:text-xs text-yellow-500/60 text-center max-w-[280px] sm:max-w-sm">
          * දුරකථනයෙන් නැරඹීමේදී ශබ්දය නොඇසේ නම්, කරුණාකර ඉහත බොත්තම ඔබා Full Screen නරඹන්න.
        </p>
      </motion.div>

    </section>
  );
};

export default ExternalThorana;