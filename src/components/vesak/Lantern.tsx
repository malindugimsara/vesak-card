import { motion } from "framer-motion";
import lanternImg from "@/assets/lantern.png";

interface LanternProps {
  size?: number;
}

/** Hanging Vesak lantern with gentle swing + warm glow. */
const Lantern = ({ size = 220 }: LanternProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative inline-block"
      style={{ width: size, transformOrigin: "top center" }}
    >
      <div
        className="origin-top animate-swing"
        style={{ transformOrigin: "top center" }}
      >
        <img
          src={lanternImg}
          alt="Vesak lantern"
          width={size}
          height={size * 1.3}
          className="animate-glow-pulse h-auto w-full"
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 1.4,
          height: size * 1.4,
          background:
            "radial-gradient(circle, hsl(var(--gold-glow) / 0.35) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );
};

export default Lantern;