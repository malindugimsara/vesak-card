import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarsBackground from "@/components/vesak/StarsBackground";
import FloatingParticles from "@/components/vesak/FloatingParticles";
import TempleSilhouette from "@/components/vesak/TempleSilhouette";
import IntroLoader from "@/components/vesak/IntroLoader";
// ClickToLight component එක ඉවත් කර ඇත
import HeroSection from "@/components/vesak/HeroSection";
import LanternStreet from "@/components/vesak/LanternStreet";
import DansalaSection from "@/components/vesak/DansalaSection";
import TempleSection from "@/components/vesak/BuddhaQuotes";
import FinalBlessing from "@/components/vesak/FinalBlessing";
import Footer from "@/components/vesak/Footer";
import CursorGlow from "@/components/vesak/CursorGlow";
import LogoHeader from "@/components/vesak/LogoHeader";
import SacredEventCards from "@/components/vesak/SacredEventCards";
import ExternalThorana from "@/components/vesak/ExternalThorana";
import { MusicToggle } from "@/components/vesak/MusicToggle";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const journeyRef = useRef<HTMLDivElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);

  const scrollTo = (el: HTMLElement | null) =>
    el?.scrollIntoView({ behavior: "smooth", block: "start" });

  const replay = () => {
    setIntroDone(false);
    setIntroKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-sky">
      
      <StarsBackground />
      <FloatingParticles />
      <CursorGlow />

      {/* 1. මුලින්ම Intro Loader එක */}
      <AnimatePresence>
        {!introDone && (
          <IntroLoader key={introKey} onFinish={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      {/* 2. Intro එක ඉවර වුණාම කෙලින්ම සම්පූර්ණ Website එක Load වෙනවා */}
      {introDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative z-10"
        >
          {/* ─── Music Player Button ─── */}
          <MusicToggle autoPlay={true} />
          
          <header className="absolute left-0 right-0 top-0 z-30 flex justify-center px-6 pt-6">
            <LogoHeader size={56} />
          </header>
          
          <TempleSilhouette />

          <HeroSection
            onJourney={() => scrollTo(journeyRef.current)}
            onLight={() => scrollTo(templeRef.current)}
          />
          <div ref={templeRef}>
            <SacredEventCards />
          </div>
          
          <div ref={journeyRef}>
            <ExternalThorana />
            <LanternStreet />
            {/* <ThoranaSection /> */}
            <DansalaSection />
            <TempleSection />
            <FinalBlessing onReplay={replay} />
          </div>
          <Footer />
        </motion.div>
      )}
    </main>
  );
};

export default Index;