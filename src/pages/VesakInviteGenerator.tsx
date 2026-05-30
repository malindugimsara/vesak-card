import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// ─── වෙනස: ArrowLeft අයිකනය Import කිරීම ───
import { Sparkles, Moon, Image as ImageIcon, ArrowLeft, Info } from "lucide-react";

import temp1 from "@/assets/temp1.jpg";
import temp2 from "@/assets/temp2.jpg";
import temp3 from "@/assets/temp3.jpg";
import temp4 from "@/assets/temp4.jpg";
import temp5 from "@/assets/temp5.jpg";
import temp6 from "@/assets/temp6.jpg";
import temp7 from "@/assets/temp7.jpg";
import temp8 from "@/assets/temp8.jpg";

import LogoHeader from "@/components/vesak/LogoHeader";
import StarsBackground from "@/components/vesak/StarsBackground";
import FloatingParticles from "@/components/vesak/FloatingParticles";
import Footer from "@/components/vesak/Footer";

const templates = [
  { id: "1", src: temp1 },
  { id: "2", src: temp2 },
  { id: "3", src: temp3 },
  { id: "4", src: temp4 },
  { id: "5", src: temp5 },
  { id: "6", src: temp6 },
  { id: "7", src: temp7 },
  { id: "8", src: temp8 },
];

export const VesakInviteGenerator = () => {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [selectedBg, setSelectedBg] = useState("1"); 
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "";
  const inviteLink = `${baseUrl}/?to=${encodeURIComponent(receiverName)}&from=${encodeURIComponent(senderName)}&bg=${selectedBg}`;
  const navigate = useNavigate();

  const messageTemplate = `*සුබ වෙසක් මංගල්‍යයක් වේවා ${receiverName}!* 🪷✨\n\n*ඉස්සර වගේ දැන් වෙසක් කාඩ් ලියන්න වෙන්නෙ නෑ කාලයත් එක්ක ඔක්කොම වෙනස් වෙලා...* 🥺\n\n*හැබැයි ඒ සුන්දර අතීතය මතක් වෙන්නත් එක්කම අලුත් විදිහකට ${senderName} ගෙන් ඔයාට පුංචි වෙසක් සුබ පැතුමක්....* 💛\n\nHappy Vesak, ${receiverName}! 🪷✨\nWishing you and your family a very Happy Vesak from ${senderName}! 🪷✨\n\n*පහළ ලින්ක් එක open කරල බලන්න 👇:*\nClick the link below:\n\n${inviteLink}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateInputs = () => {
    if (!senderName.trim() || !receiverName.trim()) {
      setError("කරුණාකර යවන සහ ලබන නම් දෙකම ඇතුළත් කරන්න!");
      document.getElementById('name-inputs')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setError(""), 4000);
      return false;
    }
    return true;
  };

  const handleWhatsAppShare = () => {
    if (!validateInputs()) return;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageTemplate)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = () => {
    if (!validateInputs()) return;
    navigator.clipboard.writeText(inviteLink);
    setGeneratedLink(inviteLink);
    setTimeout(() => setGeneratedLink(""), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-sky font-sans overflow-x-hidden relative">
      
      <StarsBackground />
      <FloatingParticles />

      {/* ─── Logo Header (පෙර පරිදිම තබා ගැනීම) ─── */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 sm:px-6 pt-6">
        <LogoHeader size={48} />
        <div className="w-10"></div> 
      </header>

      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-6 md:top-10 right-4 sm:right-10 md:right-16 w-24 sm:w-48 md:w-64 pointer-events-none z-0"
      >
        <img
          src="/moon.png"
          alt="Vesak Full Moon"
          className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,249,196,0.6)]"
        />
      </motion.div>

      <main className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-8 w-full relative z-10 mt-24 md:mt-28 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="backdrop-blur-xl bg-black/40 border-2 border-yellow-500/30 p-5 sm:p-8 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(250,204,21,0.15)] w-full max-w-2xl flex flex-col"
        >
          {/* ─── වෙනස: ආපසු යාමේ බොත්තම (Back Button) කාඩ් පතේ ඉහළට එක් කිරීම ─── */}
          <button 
            onClick={() => navigate(-1)}
            className="self-start flex items-center gap-2 text-yellow-500/90 hover:text-yellow-400 transition-colors p-2 bg-black/40 backdrop-blur-md rounded-full border border-yellow-500/40 shadow-[0_0_10px_rgba(250,204,21,0.2)] mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-sinhala text-sm hidden sm:inline font-bold pr-2">ආපසු</span>
          </button>
          
          <div className="text-center mb-8 flex flex-col items-center">
            {/* "වෙසක් සුබ පැතුම් යවමු" යන්නට පහළින් දර්ශනය වේ */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] font-sinhala tracking-wide mb-2">
              වෙසක් සුබ පැතුම් යවමු
            </h2>
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mt-2">
              <Info className="w-4 h-4 text-yellow-500" />
              <p className="text-yellow-100/90 text-xs sm:text-sm font-sinhala font-medium">
                පහත පියවර 3 අනුගමනය කර...
              </p>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* ─── පියවර 1 ─── */}
            <div className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10">
              <label className="flex items-center gap-3 text-base sm:text-lg font-bold text-yellow-400 mb-4 font-sinhala">
                <span className="bg-yellow-500 text-black w-6 h-6 flex items-center justify-center rounded-full text-sm">1</span>
                කාඩ් පතෙහි පින්තූරය තෝරන්න
              </label>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedBg(tpl.id)}
                    className={`relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-300 ${
                      selectedBg === tpl.id 
                        ? "ring-4 ring-yellow-400 scale-105 shadow-[0_0_20px_rgba(250,204,21,0.6)] z-10" 
                        : "ring-1 ring-white/20 opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img src={tpl.src} alt={`Template ${tpl.id}`} className="w-full h-full object-cover" />
                    {selectedBg === tpl.id && (
                      <div className="absolute inset-0 bg-yellow-500/30 flex items-center justify-center backdrop-blur-[1px]">
                        <Sparkles className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── පියවර 2: නම් ඇතුළත් කිරීම (Highlighting Border එක් කිරීම) ─── */}
            <div id="name-inputs" className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10 relative">
              <label className="flex items-center gap-3 text-base sm:text-lg font-bold text-yellow-400 mb-5 font-sinhala">
                <span className="bg-yellow-500 text-black w-6 h-6 flex items-center justify-center rounded-full text-sm">2</span>
                නම් දෙක ඇතුළත් කරන්න
              </label>
              
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2 font-sinhala">
                    ඔබගේ නම (යවන කෙනා)
                  </label>
                  <input
                    type="text"
                    placeholder="උදා: කමල්"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      setError("");
                    }}
                    // border-2 border-yellow-500/40 සහ shadow effect එකතු කළා
                    className={`w-full p-4 bg-black/60 border-2 ${error && !senderName ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-yellow-500/40'} focus:border-yellow-400 focus:ring-yellow-400/30 rounded-xl outline-none transition-all text-white placeholder:text-white/40 font-sinhala text-lg shadow-[0_0_10px_rgba(250,204,21,0.15)]`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2 font-sinhala">
                    යවන කෙනාගේ නම (ලබන කෙනා)
                  </label>
                  <input
                    type="text"
                    placeholder="උදා: නිමල්"
                    value={receiverName}
                    onChange={(e) => {
                      setReceiverName(e.target.value);
                      setError("");
                    }}
                    // border-2 border-yellow-500/40 සහ shadow effect එකතු කළා
                    className={`w-full p-4 bg-black/60 border-2 ${error && !receiverName ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-yellow-500/40'} focus:border-yellow-400 focus:ring-yellow-400/30 rounded-xl outline-none transition-all text-white placeholder:text-white/40 font-sinhala text-lg shadow-[0_0_10px_rgba(250,204,21,0.15)]`}
                  />
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                  <p className="bg-red-500/90 text-white px-4 py-1 rounded-full text-xs font-bold animate-bounce font-sinhala shadow-lg border border-red-400">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* ─── පියවර 3 ─── */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-black/40 p-4 sm:p-6 rounded-2xl border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
              <label className="flex items-center gap-3 text-base sm:text-lg font-bold text-yellow-400 mb-4 font-sinhala">
                <span className="bg-yellow-500 text-black w-6 h-6 flex items-center justify-center rounded-full text-sm">3</span>
                යවන්න
              </label>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsAppShare}
                  className="group relative w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 font-display tracking-wide overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <FaWhatsapp className="text-2xl sm:text-3xl relative z-10" />
                  <span className="relative z-10 uppercase text-sm sm:text-base font-bold">WhatsApp වෙත යවන්න</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-black/50 hover:bg-black/80 text-yellow-400 py-3.5 px-4 rounded-xl font-bold transition-all border-2 border-yellow-500/50 shadow-sm active:scale-95 uppercase tracking-wider text-xs sm:text-sm font-display"
                >
                  <FaLink className={generatedLink ? "text-green-400 text-lg" : "text-lg"} />
                  {generatedLink ? "Link Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      <Footer />

    </div>
  );
};