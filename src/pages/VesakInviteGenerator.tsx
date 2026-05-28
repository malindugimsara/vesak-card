import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaLink } from "react-icons/fa";
import { Sparkles, Moon, Image as ImageIcon } from "lucide-react";

// Assets ෆෝල්ඩරයෙන් පින්තූර Import කරගැනීම
import temp1 from "@/assets/temp1.jfif";
import temp2 from "@/assets/temp2.jfif";
import temp3 from "@/assets/temp3.jfif";
import temp4 from "@/assets/temp4.jfif";
import temp5 from "@/assets/temp5.jfif";
import temp6 from "@/assets/temp6.jpg";
import temp7 from "@/assets/temp7.jpg";
import temp8 from "@/assets/temp8.jpg";

// Templates Array එකක් විදිහට සකස් කිරීම
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
  const [selectedBg, setSelectedBg] = useState("1"); // Default එක විදිහට පළමු පින්තූරය තේරී ඇත
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "";
  // Link එකට parameters 3ක් එකතු කර ඇත
  const inviteLink = `${baseUrl}/?to=${encodeURIComponent(receiverName)}&from=${encodeURIComponent(senderName)}&bg=${selectedBg}`;
  
  // යාවත්කාලීන කළ WhatsApp Message Template එක
  const messageTemplate = `*සුබ වෙසක් මංගල්‍යයක් වේවා ${receiverName}!* 🪷✨\n\n*ඉස්සර වගේ දැන් වෙසක් කාඩ් ලියන්න වෙන්නෙ නෑ කාලයත් එක්ක ඔක්කොම වෙනස් වෙලා...* 🥺\n\n*හැබැයි ඒ සුන්දර අතීතය මතක් වෙන්නත් එක්කම අලුත් විදිහකට ${senderName} ගෙන් ඔයාට පුංචි වෙසක් සුබ පැතුමක්....* 💛\n\nHappy Vesak, ${receiverName}! 🪷✨\nWishing you and your family a very Happy Vesak from ${senderName}! 🪷✨\n\n*පහළ ලින්ක් එක open කරල බලන්න 👇:*\nClick the link below:\n\n${inviteLink}`;

  const validateInputs = () => {
    if (!senderName.trim() || !receiverName.trim()) {
      setError("කරුණාකර යවන සහ ලබන නම් දෙකම ඇතුළත් කරන්න!");
      setTimeout(() => setError(""), 3000);
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 md:p-8 font-sans overflow-hidden relative">
      
      {/* Background Glowing Moon & Stars Effect */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_40px_rgba(212,175,55,0.05)] w-full max-w-2xl my-8"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <Moon className="text-yellow-500/80 w-12 h-12 mb-4 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 drop-shadow-md font-sinhala tracking-wide mb-2">
            වෙසක් ආරාධනය
          </h2>
          <p className="text-white/60 text-sm font-display tracking-widest uppercase">
            Vesak Invite Generator
          </p>
        </div>

        <div className="space-y-8">
          
          {/* ─── 1. Template Selection ─── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-4 font-sinhala">
              <ImageIcon className="w-4 h-4 text-yellow-500" /> කාඩ් පතෙහි පින්තූරය තෝරන්න
            </label>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedBg(tpl.id)}
                  className={`relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedBg === tpl.id 
                      ? "ring-2 ring-yellow-400 scale-105 shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10" 
                      : "ring-1 ring-white/10 opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img src={tpl.src} alt={`Template ${tpl.id}`} className="w-full h-full object-cover" />
                  {selectedBg === tpl.id && (
                    <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                      <Sparkles className="text-yellow-300 w-6 h-6 drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ─── 2. Names Input ─── */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Sender Name */}
            <div>
              <label className="block text-xs font-semibold text-yellow-500/80 uppercase tracking-wider mb-2 font-sinhala">
                යවන කෙනාගේ නම (From)
              </label>
              <input
                type="text"
                placeholder="උදා: කමල්"
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value);
                  setError("");
                }}
                className={`w-full p-4 bg-black/40 border ${error && !senderName ? 'border-red-500/50' : 'border-white/10'} focus:border-yellow-500/70 focus:ring-yellow-500/20 rounded-xl focus:ring-2 outline-none transition-all text-white placeholder:text-white/30 font-sinhala text-lg`}
              />
            </div>

            {/* Receiver Name */}
            <div>
              <label className="block text-xs font-semibold text-yellow-500/80 uppercase tracking-wider mb-2 font-sinhala">
                ලබන කෙනාගේ නම (To)
              </label>
              <input
                type="text"
                placeholder="උදා: නිමල් සහ පවුලේ සැමට"
                value={receiverName}
                onChange={(e) => {
                  setReceiverName(e.target.value);
                  setError("");
                }}
                className={`w-full p-4 bg-black/40 border ${error && !receiverName ? 'border-red-500/50' : 'border-white/10'} focus:border-yellow-500/70 focus:ring-yellow-500/20 rounded-xl focus:ring-2 outline-none transition-all text-white placeholder:text-white/30 font-sinhala text-lg`}
              />
            </div>
          </div>
          
          {/* Error Message */}
          {error && <p className="text-red-400 text-xs text-center animate-pulse font-sinhala -mt-4">{error}</p>}

          {/* ─── 3. Message Preview Box ─── */}
          <div className="bg-black/30 rounded-xl p-5 border border-white/5">
            <label className="flex items-center gap-2 text-xs font-semibold text-yellow-500/80 uppercase tracking-widest mb-3">
              Message Preview
            </label>
            <div className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed font-sinhala">
              {(senderName.trim() || receiverName.trim()) 
                ? messageTemplate 
                : <span className="text-white/30 italic">නම් ඇතුළත් කළ පසු මෙහි පෙනෙනු ඇත...</span>
              }
            </div>
          </div>

          {/* ─── 4. Action Buttons ─── */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleWhatsAppShare}
              className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black py-4 px-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:-translate-y-1 font-display tracking-wide overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <FaWhatsapp className="text-2xl relative z-10" />
              <span className="relative z-10 uppercase text-sm font-semibold">Share via WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-yellow-500/90 py-3.5 px-4 rounded-xl font-medium transition-all border border-yellow-500/20 shadow-sm active:bg-white/5 uppercase tracking-wider text-xs font-display"
            >
              <FaLink className={generatedLink ? "text-green-400" : ""} />
              {generatedLink ? "Link Copied!" : "Copy Link Only"}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};