import { motion } from "framer-motion";
import logo from "@/assets/codecraftlogo.png";

/** Brand logo header — easy to replace by swapping src/assets/logo.png. */
const LogoHeader = ({ size = 96 }: { size?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      // ─── වෙනස: මැද තිබුණු එක වම් පසට (left-4 md:left-8) ගෙනාවා ───
      className="fixed top-6 left-4 md:left-8 z-[100] flex flex-col items-center gap-2"
    >
      <img
        src={logo}
        alt="code craft"
        width={size}
        height={size}
        className="drop-shadow-[0_0_25px_hsl(var(--gold-glow)/0.6)]"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
      <span className="hidden sm:block font-display text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold/80 drop-shadow-md text-center">
        code craft
      </span>
    </motion.div>
  );
};

export default LogoHeader;