import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaLink } from "react-icons/fa";
import { Sparkles, Moon } from "lucide-react";

export const VesakInviteGenerator = () => {
  const [userName, setUserName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "";
  const inviteLink = `${baseUrl}/?name=${encodeURIComponent(userName)}`;
  
  // Vesak WhatsApp Message Template
  const messageTemplate = `*සුබ වෙසක් මංගලයක් වේවා ${userName}!* 🪷✨\n\n*ඉස්සර වගේ දැන් වෙසක් කාඩ් ලියන්න වෙන්නෙ නෑ කාලයත් එක්ක ඔක්කොම වෙනස් වෙලා...* 🥺\n\n*හැබැයි ඉස්සර වගේ වෙසක් කාඩ් නැති උනත් ඒ සුන්දර අතීතය මතක් වෙන්නත් එක්කම අලුත් විදිහකට මගෙන් ඔයාට පුංචි වෙසක් සුබ පැතුමක්....* 💛\n\nHappy Vesak, ${userName}! 🪷✨\nWishing you and your family a very Happy Vesak! 🪷✨\n\n*පහළ ලින්ක් එක open කරල බලන්න 👇:*\nClick the link below:\n\n${inviteLink}`;

  const handleWhatsAppShare = () => {
    if (!userName.trim()) {
      setError("කරුණාකර නමක් ඇතුළත් කරන්න (Please enter a name)!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageTemplate)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = () => {
    if (!userName.trim()) {
      setError("කරුණාකර නමක් ඇතුළත් කරන්න!");
      setTimeout(() => setError(""), 3000);
      return;
    }
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
        // Glassmorphism effect matching your Vesak theme
        className="relative z-10 backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_0_40px_rgba(212,175,55,0.05)] w-full max-w-lg"
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

        <div className="space-y-6">
          {/* Guest Name Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3 font-sinhala">
              <Sparkles className="w-4 h-4 text-yellow-500" /> යවන කෙනාගේ නම (Guest Name)
            </label>
            <input
              type="text"
              placeholder="උදා: කමල් සහා පවුලේ සැමට"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError("");
              }}
              className={`w-full p-4 bg-black/40 border ${error ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:border-yellow-500/70 focus:ring-yellow-500/20'} rounded-xl focus:ring-2 outline-none transition-all text-white placeholder:text-white/30 shadow-inner font-sinhala text-lg`}
            />
            {error && <p className="text-red-400 text-xs mt-2 ml-1 animate-pulse font-sinhala">{error}</p>}
          </div>

          {/* Message Preview Box */}
          <div className="bg-black/30 rounded-xl p-5 border border-white/5">
            <label className="flex items-center gap-2 text-xs font-semibold text-yellow-500/80 uppercase tracking-widest mb-3">
              Message Preview
            </label>
            <div className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed font-sinhala">
              {userName.trim() ? messageTemplate : <span className="text-white/30 italic">නමක් ඇතුළත් කළ පසු මෙහි පෙනෙනු ඇත...</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={handleWhatsAppShare}
              className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black py-4 px-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:-translate-y-1 font-display tracking-wide overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <FaWhatsapp className="text-2xl relative z-10" />
              <span className="relative z-10 uppercase text-sm">Share via WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-yellow-500/90 py-3.5 px-4 rounded-xl font-medium transition-all border border-yellow-500/20 shadow-sm active:bg-white/5 uppercase tracking-wider text-xs font-display"
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