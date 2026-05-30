import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, ChevronDown, Share2, X, Info, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import temp1 from "@/assets/temp1.jpg";
import temp2 from "@/assets/temp2.jpg";
import temp3 from "@/assets/temp3.jpg";
import temp4 from "@/assets/temp4.jpg";
import temp5 from "@/assets/temp5.jpg";
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
        /* ─── 3D Book Layout (Share Card View) ─── */
        <div 
          // ─── වෙනස: Mobile වලදී aspect-[2/3] සහ min-h-[550px] යොදා උස වැඩි කළා. Desktop එකට sm:aspect-[3/4] දුන්නා ───
          className="relative z-10 w-[90vw] max-w-[380px] md:max-w-[460px] lg:max-w-[500px] min-h-[550px] sm:min-h-0 aspect-[2/3] sm:aspect-[3/4] mt-24 md:mt-32"
          style={{ perspective: "1500px" }}
        >
          <motion.div
            animate={{ x: isCardOpen ? "5%" : "0%" }} 
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* ─── Right Page (Inside Content) ─── */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#1a150b] via-black to-[#0a0a0a] sm:backdrop-blur-xl border border-yellow-500/30 sm:border-2 sm:border-yellow-500/40 rounded-r-3xl rounded-l-md p-4 pt-12 sm:p-6 sm:pt-14 md:p-8 md:pt-16 flex flex-col justify-start items-center shadow-lg sm:shadow-[0_0_60px_rgba(250,204,21,0.25)] transition-opacity duration-1000 overflow-y-auto overflow-x-hidden ${
                isCardOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: isCardOpen ? "auto" : "none" }}
            >
              <button 
                onClick={() => setIsCardOpen(false)}
                className="absolute top-3 right-3 text-yellow-500/70 hover:text-yellow-400 transition-colors p-2 bg-yellow-500/10 rounded-full"
                aria-label="Close Card"
              >
                <X size={20} />
              </button>

              <p className="font-heading mb-2 md:mb-3 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-yellow-500/90 drop-shadow-md">
                ~ වෙසක් පෝය 2026 ~
              </p>
              
              <div className="text-center w-full px-1 sm:px-2 flex flex-col items-center justify-center">
                <h1 className="font-sinhala font-bold flex flex-col items-center gap-1 mb-2 w-full max-w-[280px] sm:max-w-sm">
                  <span className="text-3xl sm:text-4xl md:text-3xl text-yellow-300 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)] break-words whitespace-normal text-center w-full leading-tight">
                    {receiverName ? receiverName : "ඔබ සැමට"}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg text-yellow-100/90 mt-1 whitespace-normal text-center">
                    සුබ වෙසක් මංගල්‍යයක් වේවා!
                  </span>
                </h1>

                {senderName && (
                  <div className="mt-2 bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 border border-yellow-500/40 rounded-2xl py-3 px-4 sm:px-8 flex flex-col items-center shadow-[0_0_20px_rgba(250,204,21,0.15)] w-full max-w-[280px] sm:max-w-sm">
                    <span className="font-sinhala text-[10px] sm:text-xs text-yellow-100/80 mb-1">මේ පුංචි සුබ පැතුම</span>
                    <span className="font-sinhala text-lg sm:text-xl md:text-2xl text-green-400 font-extrabold drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] tracking-wide break-words whitespace-normal text-center w-full leading-tight">
                      "{senderName}"
                    </span>
                    <span className="font-sinhala text-[10px] sm:text-xs text-yellow-100/80 mt-1">ගෙන්... 💛</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-4 my-3 md:my-5 w-full">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-yellow-500/70"></div>
                <span className="text-base md:text-2xl drop-shadow-md">🪷</span>
                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-yellow-500/70"></div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-3 px-1 sm:px-2 mt-auto pb-2">
                <p className="font-sinhala text-xs sm:text-sm text-yellow-500/80 text-center mb-1">පහතින් තෝරන්න 👇</p>
                
                <button onClick={handleLightClick} className="group relative w-full flex items-center justify-between bg-gradient-to-r from-yellow-600/90 to-yellow-500/80 p-3 sm:p-4 rounded-xl border border-yellow-400/50 shadow-md sm:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-transform active:scale-95">
                  <div className="flex items-center gap-3">
                    <div className="bg-black/30 p-2 rounded-full"><Sparkles className="w-5 h-5 text-white" /></div>
                    <div className="text-left"><span className="block font-sinhala font-bold text-black text-sm sm:text-base">වෙසක් නරඹන්න</span><span className="block font-sinhala-sans text-[10px] sm:text-xs text-black/80">පහන් කූඩු සහ සැරසිලි</span></div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-black/80 group-hover:translate-x-1 transition-transform" />
                </button>

                <button onClick={onJourney} className="group relative w-full flex items-center justify-between bg-black/60 hover:bg-yellow-500/10 p-3 sm:p-4 rounded-xl border border-yellow-500/40 transition-transform active:scale-95">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/10 p-2 rounded-full"><Flame className="w-5 h-5 text-yellow-400" /></div>
                    <div className="text-left"><span className="block font-sinhala font-bold text-yellow-400 text-sm sm:text-base">ඩිජිටල් තොරණ</span><span className="block font-sinhala-sans text-[10px] sm:text-xs text-yellow-100/60">කුස ජාතක කතාව</span></div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-yellow-500/80 group-hover:translate-x-1 transition-transform" />
                </button>

                <button onClick={handleShareClick} className="group relative w-full flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 sm:p-4 rounded-xl border border-white/10 transition-transform active:scale-95">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-full"><Share2 className="w-5 h-5 text-white" /></div>
                    <div className="text-left"><span className="block font-sinhala font-bold text-white text-sm sm:text-base">ඔබත් සුබපැතුමක් යවන්න</span><span className="block font-sinhala-sans text-[10px] sm:text-xs text-white/50">ඔබේ නමින් කාඩ් එකක්</span></div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* ─── Left Page (3D Front & Inside Cover) ─── */}
            <motion.div
              className="absolute inset-0 cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d", 
                transformOrigin: "left center", 
                pointerEvents: isCardOpen ? "none" : "auto", 
                zIndex: 20 
              }}
              animate={{ rotateY: isCardOpen ? -155 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onClick={() => !isCardOpen && setIsCardOpen(true)}
            >
              {/* 1. Outside Cover (පිටත පෙනෙන පින්තූරය) */}
              <div
                className="absolute inset-0 rounded-r-3xl rounded-l-md overflow-hidden border border-yellow-500/30 sm:border-2 sm:border-yellow-500/50 shadow-md sm:shadow-[0_0_30px_rgba(250,204,21,0.3)] bg-black"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <img src={bgImage} alt="Card Cover" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                
                {!isCardOpen && (
                  <div className="absolute bottom-8 w-full flex justify-center pointer-events-none">
                    <div className="bg-black/80 sm:backdrop-blur-md border border-yellow-400 rounded-full py-3 px-6 shadow-[0_0_15px_rgba(250,204,21,0.4)] animate-pulse">
                      <span className="font-sinhala text-yellow-400 font-bold">👆 කාඩ් එක විවෘත කරන්න</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Inside Cover (පෙරලුවාම පෙනෙන නෙළුම් මල සහිත පිටුව) */}
              <div
                className="absolute inset-0 rounded-l-3xl rounded-r-md border border-yellow-500/20 sm:border-2 sm:border-yellow-500/30 bg-gradient-to-r from-black to-[#1a1205]"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div 
                  className="w-full h-full flex flex-col items-center justify-center opacity-40 border-r border-yellow-500/50 pointer-events-auto"
                  onClick={(e) => { e.stopPropagation(); setIsCardOpen(false); }} 
                >
                  <span className="text-6xl sm:text-7xl text-yellow-500 drop-shadow-lg">🪷</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      ) : (

        /* ─── Standard Layout (Main Page) ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 w-[95vw] max-w-5xl bg-black/90 sm:bg-black/50 sm:backdrop-blur-xl border border-yellow-500/30 sm:border-2 sm:border-yellow-500/40 rounded-[2rem] p-5 sm:p-10 md:p-14 shadow-xl sm:shadow-[0_0_60px_rgba(250,204,21,0.2)] mt-32 md:mt-40"
        >
          <div className="absolute top-6 left-6 text-yellow-500/50 text-xl hidden sm:block">✤</div>
          <div className="absolute top-6 right-6 text-yellow-500/50 text-xl hidden sm:block">✤</div>
          
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="font-sinhala font-bold text-3xl sm:text-5xl md:text-6xl text-yellow-400 drop-shadow-md sm:drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] leading-tight mb-2">
              ඔබ සැමට සුබ වෙසක් මංගල්‍යයක් වේවා!
            </h1>
            <p className="font-display text-lg sm:text-2xl opacity-90 text-yellow-100 tracking-wider">Happy Vesak to All!</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-10">
            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-yellow-500/70"></div>
            <span className="text-3xl sm:text-4xl drop-shadow-md">🪷</span>
            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-yellow-500/70"></div>
          </div>

          {/* Action Section */}
          <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-3xl p-5 sm:p-8">
            
            <div className="flex flex-col items-center mb-6 text-yellow-400">
              <div className="bg-yellow-500/20 p-2 rounded-full mb-2 animate-bounce">
                <ChevronDown className="w-5 h-5" />
              </div>
              <h2 className="font-sinhala text-base sm:text-lg font-bold tracking-wide">ඔබට අවශ්‍ය අංගය පහතින් තෝරන්න</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              
              <button onClick={handleLightClick} className="group relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-600/90 to-yellow-500/80 rounded-2xl border border-yellow-400/50 shadow-md sm:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-transform active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-black/20 p-4 rounded-full mb-3 shadow-inner">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-sinhala text-lg sm:text-xl font-bold text-black w-full text-center">වෙසක් නරඹන්න</span>
                  <span className="font-sinhala-sans text-xs sm:text-sm text-black/80 mt-1 font-medium">පහන් කූඩු සහ සැරසිලි</span>
                </div>
              </button>

              <button onClick={onJourney} className="group relative flex flex-col items-center justify-center p-6 bg-black/60 sm:bg-[#111] rounded-2xl border border-yellow-500/40 sm:border-yellow-500/50 shadow-md sm:shadow-[0_0_15px_rgba(250,204,21,0.1)] transition-transform active:scale-95 hover:bg-yellow-500/10 overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-yellow-500/10 p-4 rounded-full mb-3 shadow-inner">
                    <Flame className="w-8 h-8 text-yellow-400" />
                  </div>
                  <span className="font-sinhala text-lg sm:text-xl font-bold text-yellow-400 w-full text-center">ඩිජිටල් තොරණ</span>
                  <span className="font-sinhala-sans text-xs sm:text-sm text-yellow-100/60 mt-1 font-medium">කුස ජාතක කතාව</span>
                </div>
              </button>

              <button onClick={handleShareClick} className="group relative flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/10 shadow-md sm:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-transform active:scale-95 overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-full mb-3 shadow-inner">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-sinhala text-lg sm:text-xl font-bold w-full text-center text-white">වෙසක් කාඩ් යවන්න</span>
                  <span className="font-sinhala-sans text-xs sm:text-sm text-white/50 mt-1 font-medium">ඔබේ නමින් කාඩ් එකක්</span>
                </div>
              </button>

            </div>
          </div>
        </motion.div>

      )}

      {/* Scroll Down Arrow for Body (Hidden when Card is open) */}
      <motion.div
        animate={
          isArrowHighlighted
            ? { y: [0, 15, 0], scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }
            : { y: [0, 10, 0], scale: 1, opacity: (!isInviteCard || isCardOpen) ? 0.6 : 0 }
        }
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-4 sm:bottom-6 z-10 flex flex-col items-center justify-center p-2 rounded-full ${isArrowHighlighted ? "text-yellow-400" : "text-yellow-500/60"}`}
        style={{ pointerEvents: (!isInviteCard || isCardOpen) ? "auto" : "none" }}
      >
        <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;