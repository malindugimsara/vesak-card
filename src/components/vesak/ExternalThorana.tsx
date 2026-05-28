import { motion } from "framer-motion";

const ExternalThorana = () => {
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
        <h2 className="mb-4 font-sinhala text-3xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] sm:text-5xl">
          ඩිජිටල් වෙසක් තොරණ
        </h2>
        <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-yellow-500/70 sm:text-xs">
          Athukorala Group Digital Thorana
        </p>
      </motion.div>

      {/* ─── Iframe Container ─── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        onViewportEnter={() => window.dispatchEvent(new Event("pause-bgm"))}
        onViewportLeave={() => window.dispatchEvent(new Event("resume-bgm"))}
        viewport={{ once: false, amount: 0.4 }} 
        transition={{ duration: 1, delay: 0.2 }}
        // ─── වෙනස: aspect-[9/16] (Mobile) සහ md:aspect-video (Desktop) එක් කළා. Desktop වල පළල වැඩි කළා. ───
        className="relative overflow-hidden rounded-xl border-2 border-yellow-500/30 bg-black shadow-[0_0_40px_rgba(250,204,21,0.15)] sm:rounded-2xl aspect-[9/16] w-[90vw] max-w-sm sm:max-w-md md:aspect-video md:w-[95vw] md:max-w-4xl lg:max-w-5xl"
      >
        
        {/* Loading Spinner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent sm:h-10 sm:w-10"></div>
          <p className="mt-4 animate-pulse font-sinhala text-xs text-yellow-500/70 sm:text-sm">
            තොරණ Load වෙමින් පවතී...
          </p>
        </div>

        {/* The External Link */}
        <iframe
          src="https://kusa-jathakaya-thorana.vercel.app"
          title="Digital Vesak Thorana"
          className="absolute inset-0 z-10 h-full w-full border-none"
          allowFullScreen 
        />
      </motion.div>

      {/* Button Section */}
      <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 0.8 }}
         className="mt-8 flex flex-col items-center px-4"
      >
        <a 
          href="https://kusa-jathakaya-thorana.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2.5 font-sinhala text-sm text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all hover:bg-yellow-500 hover:text-black"
        >
          Full Screen නැරඹීමට ↗
        </a>
      </motion.div>

    </section>
  );
};

export default ExternalThorana;