import { Facebook, Mail, PhoneOutgoing } from "lucide-react";
import codecraftlogo from "@/assets/codecraftlogo.png";

const Footer = () => {
  return (
    // Birthday card එකේ පළලට සමානව max-w-2xl දාලා තියෙනවා
    <footer className="relative z-10 mt-12 mb-6 px-4 w-full max-w-2xl mx-auto text-center">
      
      {/* Theme එකට ගැළපෙන Optimized Glass Card එක */}
      <div className="optimized-glass-card neon-border rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4">
        
        {/* Logo with Glow Effect */}
        <div className="relative p-1 rounded-full gradient-button" style={{ boxShadow: "0 0 15px hsla(330, 100%, 70%, 0.3)" }}>
          <img
            src={codecraftlogo}
            alt="CodeCraft"
            width={48}
            height={48}
            loading="lazy"
            decoding="async" // Mobile performance optimization
            className="h-12 w-12 rounded-full object-cover border-2 border-background/40"
          />
        </div>

        {/* Brand Text */}
        <p className="font-display text-sm tracking-widest text-muted-foreground mt-2">
          <span className="font-bold text-gradient-birthday text-base drop-shadow-sm">CodeCraft</span> 
          <span className="opacity-70 text-xs"> • Designed by </span> 
          <span className="italic text-[hsl(var(--rose))] font-semibold">Malindu</span>
        </p>

        {/* Social Links (Mobile Touch Optimized) */}
        <div className="mt-3 flex items-center gap-6">
          <a 
            href="https://www.facebook.com/profile.php?id=61589021800561" 
            aria-label="Facebook" 
            target="_blank"
            rel="noopener noreferrer"
            // JS නැතුව CSS වලින්ම click වෙද්දි පොඩි වෙන effect එක (active:scale-90)
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[hsl(var(--blue))] hover:bg-white/10 hover:shadow-[0_0_10px_hsl(var(--blue))] active:scale-90 transition-all duration-200"
          >
            <Facebook className="h-5 w-5" />
          </a>
          
          <a 
            href="tel:+94788536767" 
            aria-label="Phone" 
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[hsl(var(--gold))] hover:bg-white/10 hover:shadow-[0_0_10px_hsl(var(--gold))] active:scale-90 transition-all duration-200"
          >
            <PhoneOutgoing className="h-5 w-5" />
          </a>
          
          <a 
            href="mailto:codecraftservicesm@gmail.com" 
            aria-label="Email" 
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[hsl(var(--pink))] hover:bg-white/10 hover:shadow-[0_0_10px_hsl(var(--pink))] active:scale-90 transition-all duration-200"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;