import { motion } from "framer-motion";
import lantern from "@/assets/lantern.png";

const LanternStreet = () => {
  const lanterns = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    delay: i * 0.2,
    size: 90 + (i % 3) * 30,
    drop: (i % 2) * 30,
  }));

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-heading text-glow text-center text-2xl font-semibold uppercase tracking-[0.4em] text-gold-glow sm:text-3xl"
      >
        Vesak Lantern Street
      </motion.h2>

      <div className="relative mt-12 flex h-[320px] items-start justify-around sm:h-[380px]">
        {/* String */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: l.drop }}
            viewport={{ once: true }}
            transition={{ delay: l.delay, duration: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative flex flex-col items-center"
            style={{ transformOrigin: "top center" }}
          >
            <div className="h-8 w-px bg-gold/50" />
            <div className="origin-top animate-swing" style={{ animationDelay: `${l.delay}s` }}>
              <img
                src={lantern}
                alt="Vesak kuduwa"
                width={l.size}
                height={l.size * 1.3}
                loading="lazy"
                className="h-auto animate-glow-pulse"
                style={{ width: l.size }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-sinhala text-glow-soft lg:mt-12 text-center text-lg italic text-gold/90 sm:text-xl"
      >
        “සෑම කූඩුවකම බැබළෙන්නේ බලාපොරොත්තුවයි”
      </motion.p>
      <p className="font-display mt-2 text-center text-sm italic text-muted-foreground">
        In every lantern shines a hope
      </p>
    </section>
  );
};

export default LanternStreet;