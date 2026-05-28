import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// ─── වෙනස: 'X' අයිකන් එක Import කරගත්තා ───
import { Sparkles, Flame, ChevronDown, Share2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import temp1 from "@/assets/temp1.jfif";
import temp2 from "@/assets/temp2.jfif";
import temp3 from "@/assets/temp3.jfif";
import temp4 from "@/assets/temp4.jfif";
import temp5 from "@/assets/temp5.jfif";
import temp6 from "@/assets/temp6.jpg";
import temp7 from "@/assets/temp7.jpg";
import temp8 from "@/assets/temp8.jpg";

const backgrounds: Record<string, string> = {
  "1": temp1,
  "2": temp2,
  "3": temp3,
  "4": temp4,
  "5": temp5,
  "6": temp6,
  "7": temp7,
  "8": temp8,
};

interface Props {
  onJourney: () => void;
  onLight: () => void; 
}

const HeroSection = ({ onJourney, onLight }: Props) => {
  const [isArrowHighlighted, setIsArrowHighlighted] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const [receiverName, setReceiverName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [bgImage, setBgImage] = useState(temp1);
  
  const [isInviteCard, setIsInviteCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const to = searchParams.get("to");
    const from = searchParams.get("from");
    const bg = searchParams.get("bg");
    const oldName = searchParams.get("name");

    if (bg && backgrounds[bg]) {
      setIsInviteCard(true);
      setBgImage(backgrounds[bg]);
      if (to) setReceiverName(to);
      if (from) setSenderName(from);
    } else {
      setIsInviteCard(false);
      if (to) setReceiverName(to);
      else if (oldName) setReceiverName(oldName);
    }
  }, []);

  const handleLightClick = () => {
    setIsArrowHighlighted(true);
    onLight();
    setTimeout(() => {
      setIsArrowHighlighted(false);
    }, 3000);
  };

  const handleShareClick = async () => {
    navigate("/share-card"); 
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-16 text-center overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-6 md:top-10 right-4 sm:right-10 md:right-16 w-32 sm:w-48 md:w-64 pointer-events-none"
      >
        <img
          src="/moon.png"
          alt="Vesak Full Moon"
          className="hidden lg:block lg:w-full lg:h-full object-contain drop-shadow-[0_0_50px_rgba(255,249,196,0.6)]"
        />
      </motion.div>

      {isInviteCard ? (
        
        /* ─── 3D Book Layout ─── */
        <div 
          className="relative z-10 w-[88vw] max-w-[360px] md:max-w-[460px] lg:max-w-[500px] aspect-[3/4] mt-24 md:mt-32"
          style={{ perspective: "1500px" }}
        >
          <motion.div
            // ─── වෙනස: Mobile වලදී දකුණට යන එක අඩු කළා (5%) ───
            animate={{ x: isCardOpen ? "5%" : "0%" }} 
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* ─── Inside Content ─── */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#111] via-black to-[#0a0a0a] backdrop-blur-xl border border-yellow-500/30 rounded-r-3xl rounded-l-md p-4 sm:p-8 md:p-10 flex flex-col justify-center items-center shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-opacity duration-1000 ${
                isCardOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: isCardOpen ? "auto" : "none" }}
            >
              {/* ─── වෙනස: Close Button එක ─── */}
              <button 
                onClick={() => setIsCardOpen(false)}
                className="absolute top-3 right-3 text-yellow-500/50 hover:text-yellow-400 transition-colors p-1"
                aria-label="Close Card"
              >
                <X size={20} />
              </button>

              <p className="font-heading mb-2 md:mb-5 text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-gold/80 drop-shadow-md">
                ~ වෙසක් පෝය 2026 ~
              </p>
              
              {/* ─── වෙනස: Mobile View එකට ගැලපෙන්න අකුරු ප්‍රමාණ සහ හිඩැස් (gap) හැදුවා ─── */}
              <h1 className="text-glow flex flex-col gap-1 md:gap-4 text-lg font-bold leading-tight text-gold-glow sm:text-2xl md:text-4xl mb-3 md:mb-6 px-2">
                <span className="font-sinhala drop-shadow-lg text-yellow-400">
                  {receiverName ? `${receiverName}, සුබ වෙසක් මංගල්‍යයක් වේවා!` : "සැමට සුබ වෙසක් මංගල්‍යයක් වේවා!"}
                </span>
                {senderName && (
                  <span className="font-sinhala text-[11px] sm:text-sm md:text-base mt-1 sm:mt-2 opacity-90 text-yellow-100/90 leading-relaxed">
                    මේ පුංචි සුබ පැතුම <br/> <span className="text-yellow-400 text-sm sm:text-lg md:text-xl">"{senderName}"</span> ගෙන්... 💛
                  </span>
                )}
              </h1>

              <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-6">
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
                <span className="text-base md:text-2xl drop-shadow-md">🪷</span>
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
              </div>
              
              <p className="font-sinhala-sans mx-auto max-w-[260px] sm:max-w-sm text-[11px] sm:text-sm md:text-base leading-relaxed text-white/90 drop-shadow-sm px-2">
                දයාව, කරුණාව සහ ප්‍රඥාවෙන් ලොව ආලෝකමත් කරමු.
              </p>

              {/* ─── වෙනස: Buttons වල padding (py) අඩු කළා ඉඩ ඉතුරු කරගන්න ─── */}
              <div className="mt-5 md:mt-8 flex flex-col gap-2 md:gap-4 w-full px-2 sm:px-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLightClick} 
                  className="w-full bg-gradient-gold glow-gold inline-flex items-center justify-center gap-2 rounded-full py-2 sm:py-2.5 md:py-3.5 font-heading text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4" /> වෙසක් බලන්න
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onJourney}
                  className="w-full bg-black/50 border border-yellow-500/50 hover:bg-yellow-500/10 inline-flex items-center justify-center gap-2 rounded-full py-2 sm:py-2.5 md:py-3.5 font-heading text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-glow transition-colors"
                >
                  <Flame className="h-3 w-3 md:h-4 md:w-4" /> තොරණ බලන්න
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleShareClick}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 inline-flex items-center justify-center gap-2 rounded-full py-2 sm:py-2.5 md:py-3.5 font-heading text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-white transition-colors"
                >
                  <Share2 className="h-3 w-3 md:h-4 md:w-4" /> වෙසක් කාඩ් යවන්න
                </motion.button>
              </div>
            </div>

            {/* ─── Front Cover ─── */}
            <motion.div
              className="absolute inset-0 cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d", 
                transformOrigin: "left center", 
                // ─── වෙනස: pointerEvents සෑමවිටම auto කර ඇත, එවිට ඇරුණට පස්සෙත් click කරලා වහන්න පුළුවන් ───
                pointerEvents: "auto",
                zIndex: 20 
              }}
              animate={{ rotateY: isCardOpen ? -155 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              // ─── වෙනස: Click කළාම Open/Close දෙකම (Toggle) වෙනවා ───
              onClick={() => setIsCardOpen(!isCardOpen)}
            >
              {/* Front Image Side */}
              <div
                className="absolute inset-0 rounded-r-3xl rounded-l-md overflow-hidden border-2 border-yellow-500/40 shadow-2xl bg-black"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <img src={bgImage} alt="Card Cover" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                
                {!isCardOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-6 sm:bottom-10 md:bottom-12 w-full flex justify-center px-4"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 10px rgba(250,204,21,0.2)", "0 0 25px rgba(250,204,21,0.6)", "0 0 10px rgba(250,204,21,0.2)"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-auto bg-black/70 backdrop-blur-md border border-yellow-500/60 rounded-full py-2.5 px-5 flex flex-col items-center justify-center text-center"
                    >
                      <span className="font-sinhala text-yellow-400 text-xs sm:text-sm md:text-base drop-shadow-[0_0_5px_rgba(250,204,21,0.8)] whitespace-nowrap">
                        👆 දිගහැරීමට Click කරන්න
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Back of the Cover (Inside Left Page) */}
              <div
                className="absolute inset-0 rounded-l-3xl rounded-r-md border-2 border-yellow-500/30 bg-gradient-to-r from-black to-[#1a1205]"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30 border-r border-yellow-500/50">
                  <span className="text-5xl sm:text-6xl md:text-7xl text-yellow-500 drop-shadow-lg">🪷</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      ) : (

        /* ─── Standard Layout (Normal View) ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 max-w-4xl w-[90vw] md:w-full bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-[2rem] p-8 sm:p-12 md:p-16 shadow-[0_0_60px_rgba(212,175,55,0.15)] mt-32 md:mt-40"
        >
          <div className="absolute top-6 left-6 text-yellow-500/40 text-xl md:text-2xl pointer-events-none">✤</div>
          <div className="absolute top-6 right-6 text-yellow-500/40 text-xl md:text-2xl pointer-events-none">✤</div>
          <div className="absolute bottom-6 left-6 text-yellow-500/40 text-xl md:text-2xl pointer-events-none">✤</div>
          <div className="absolute bottom-6 right-6 text-yellow-500/40 text-xl md:text-2xl pointer-events-none">✤</div>

          <p className="font-heading mb-6 text-sm uppercase tracking-[0.3em] text-gold/80 sm:text-base drop-shadow-md">
            ~ වෙසක් පෝය 2026 ~
          </p>
          
          <h1 className="text-glow flex flex-col gap-4 text-3xl font-bold leading-tight text-gold-glow sm:text-5xl md:text-6xl mb-8">
            <span className="font-sinhala drop-shadow-lg">
              {receiverName ? `${receiverName}, සුබ වෙසක් මංගල්‍යයක් වේවා!` : "සැමට සුබ වෙසක් මංගල්‍යයක් වේවා!"}
            </span>
            <span className="font-display text-2xl sm:text-4xl md:text-5xl opacity-90 text-yellow-100/90">
              {receiverName ? `Happy Vesak, ${receiverName}!` : "Happy Vesak to All!"}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
            <span className="text-2xl md:text-3xl drop-shadow-md">🪷</span>
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
          </div>
          
          <p className="font-sinhala-sans mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl drop-shadow-sm">
            දයාව, කරුණාව සහ ප්‍රඥාවෙන් ලොව ආලෝකමත් කරමු.
          </p>
          <p className="font-display mt-3 text-base italic text-gold/80 sm:text-lg">
            Let kindness, compassion and wisdom light the world.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 md:gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLightClick} 
              className="bg-gradient-gold glow-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <Sparkles className="h-4 w-4" /> වෙසක් බලන්න
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onJourney}
              className="bg-black/50 border border-yellow-500/50 hover:bg-yellow-500/10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-gold-glow transition-colors"
            >
              <Flame className="h-4 w-4" /> තොරණ බලන්න
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShareClick}
              className="bg-white/5 border border-white/10 hover:bg-white/10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-white transition-colors"
            >
              <Share2 className="h-4 w-4" /> වෙසක් කාඩ් යවන්න
            </motion.button>
          </div>
        </motion.div>

      )}

      {/* Scroll Down Arrow */}
      <motion.div
        animate={
          isArrowHighlighted
            ? { y: [0, 15, 0], scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }
            : { y: [0, 10, 0], scale: 1, opacity: (!isInviteCard || isCardOpen) ? 0.6 : 0 }
        }
        transition={
          isArrowHighlighted
            ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        className={`absolute bottom-4 sm:bottom-6 z-10 flex flex-col items-center justify-center rounded-full transition-all duration-500 ${
          isArrowHighlighted 
            ? "text-yellow-400 bg-yellow-500/20 p-3 shadow-[0_0_20px_rgba(250,204,21,0.6)]" 
            : "text-gold/60 p-2"
        }`}
        style={{ pointerEvents: (!isInviteCard || isCardOpen) ? "auto" : "none" }}
      >
        {isArrowHighlighted && (
          <span className="mb-2 font-sinhala text-[10px] sm:text-xs text-yellow-400 drop-shadow-md">
            පහළට
          </span>
        )}
        <ChevronDown className={`transition-all duration-500 ${isArrowHighlighted ? "h-6 w-6 sm:h-8 sm:w-8" : "h-5 w-5 sm:h-6 sm:w-6"}`} />
      </motion.div>
    </section>
  );
};

export default HeroSection;