import { Facebook, Instagram, Mail, PhoneOutgoing, Twitter } from "lucide-react";
import codecraftlogo from "@/assets/codecraftlogo.png";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-8 border-t border-gold/15 px-6 py-10 text-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <img
          src={codecraftlogo}
          alt="CodeCraft"
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 "
        />
        <p className="font-display text-xs  tracking-[0.2em] sm:tracking-[0.4em] text-muted-foreground">
          <span className="text-bold  px-1 py-[0.1rem] rounded text-gold-glow">CodeCraft</span> -  Designed by <span className="italic">Malindu</span> 
        </p>
        <div className="mt-3 flex items-center gap-5 text-gold/70">
          <a href="https://www.facebook.com/profile.php?id=61589021800561" aria-label="Facebook" className="transition-colors hover:text-gold-glow">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="tel:+94788536767" aria-label="Phone" className="transition-colors hover:text-gold-glow">
            <PhoneOutgoing className="h-5 w-5" />
          </a>
          <a href="mailto:codecraftservicesm@gmail.com" aria-label="Email" className="transition-colors hover:text-gold-glow">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;