import { motion } from "framer-motion";
import logo from "@/assets/codecraftlogo.png";
import flag from "@/assets/flag.gif"; // ─── වෙනස: flag.gif Import කරගැනීම ───

/** Brand logo header and Center Flag */
const LogoHeader = ({ size = 96 }: { size?: number }) => {
  return (
    <>
      {/* ─── වම් පස ඇති Logo එක ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed top-6 left-4 md:left-8 z-[100] flex flex-col items-center gap-2"
      >
        <img
          src={logo}
          alt="Codecraft Logo"
          width={size}
          height={size}
          className="drop-shadow-[0_0_25px_hsl(var(--gold-glow)/0.6)]"
          style={{ width: size, height: size, objectFit: "contain" }}
        />
        <span className="hidden sm:block font-display text-[10px] sm:text-xs uppercase tracking-[0.2em] text-yellow-500 drop-shadow-md text-center">
          Codecraft
        </span>
      </motion.div>

      {/* ─── තිරයේ හරි මැද ඇති බෞද්ධ කොඩිය (Flag) ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center"
      >
        <img
          src={flag}
          alt="Buddhist Flag"
          
          className="w-14 sm:w-14 md:w-20 rounded-[2px] lg:drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] object-contain" 
        />
      </motion.div>
    </>
  );
};

export default LogoHeader;