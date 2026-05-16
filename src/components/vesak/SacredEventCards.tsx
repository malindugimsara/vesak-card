import { motion } from "framer-motion";
import { useState } from "react";
import ipadima from "@/assets/ipadima.jpg";
import buduwima from "@/assets/buduwima.jpg";
import piriniwanpema from "@/assets/piriniwanpema.jpg";
import VideoModal from "./VideoModal";

export interface SacredEvent {
  id: string;
  sinhala: string;
  english: string;
  theme: string;
  description: string;
  image: string;
  video: string;
}

const events: SacredEvent[] = [
  {
    id: "birth",
    sinhala: "සිදුහත් කුමරුගේ උපත",
    english: "The Birth of Prince Siddhartha",
    theme: "Lotus · Royal Garden · Queen Maya",
    description:
      "In the sacred garden of Lumbini, beneath blooming Sal trees, Prince Siddhartha was born — taking seven steps upon lotus blossoms.",
    image: ipadima,
    // ─── 1. ඉපදීම (Birth) Video Link ───
    video: "https://www.youtube.com/embed/PPLxRpaQfrE?autoplay=1",
  },
  {
    id: "enlightenment",
    sinhala: "සම්බුද්ධත්වය",
    english: "The Enlightenment",
    theme: "Bodhi Tree · Meditation · Divine Light",
    description:
      "Beneath the Bodhi tree at Bodh Gaya, after deep meditation, Siddhartha attained supreme enlightenment and became the Buddha.",
    image: buduwima,
    // ─── 2. බුදුවීම (Enlightenment) Video Link ───
    video: "https://www.youtube.com/embed/Gh4uH96jo40?autoplay=1",
  },
  {
    id: "parinirvana",
    sinhala: "පිරිනිවන් පෑම",
    english: "The Parinirvana",
    theme: "Sal Trees · Serenity · Golden Peace",
    description:
      "At Kushinagar, between twin Sal trees, the Buddha entered Parinirvana — the final liberation, leaving a path of peace for all beings.",
    image: piriniwanpema,
    // ─── 3. පිරිනිවන් පෑම (Parinirvana) Video Link ───
    video: "https://www.youtube.com/embed/2gshiCe6eUg?autoplay=1",
  },
];

const SacredEventCards = () => {
  const [active, setActive] = useState<SacredEvent | null>(null);

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sinhala text-glow text-3xl font-bold text-gold-glow sm:text-5xl mb-4"
        >
          ත්‍රිවිධ වෙසක් සිදුවීම්
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-xs uppercase tracking-[0.5em] text-gold/70 sm:text-sm"
        >
          The Three Sacred Events
        </motion.p>
        
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, i) => (
            <motion.button
              key={ev.id}
              onClick={() => setActive(ev)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -3 }}
              className="glass group relative flex flex-col items-center overflow-hidden rounded-3xl p-6 text-center transition-shadow hover:shadow-[0_0_50px_hsl(var(--gold-glow)/0.3)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative h-40 w-40">
                <img
                  src={ev.image}
                  alt={ev.english}
                  loading="lazy"
                  className="h-full w-full object-contain drop-shadow-[0_0_25px_hsl(var(--gold-glow)/0.5)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-sinhala text-glow-soft mt-4 text-xl font-bold text-gold-glow">
                {ev.sinhala}
              </h3>
              <p className="font-heading mt-1 text-sm uppercase tracking-[0.2em] text-gold/90">
                {ev.english}
              </p>
              <p className="font-display mt-3 text-xs italic text-muted-foreground">
                {ev.theme}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold/80 transition group-hover:border-gold group-hover:text-gold-glow">
                Watch ▸
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <VideoModal event={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default SacredEventCards;