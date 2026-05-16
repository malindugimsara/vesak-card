import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const TRACK = "/vesak-bgm.mp3"; 

interface MusicToggleProps {
  autoPlay?: boolean;
}

export const MusicToggle = ({ autoPlay }: MusicToggleProps) => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);
  
  const hasAttemptedPlay = useRef(false);
  
  // ─── අලුත්: සිග්නල් ආවම කලින් play වුණාද කියලා මතක තියාගන්න ───
  const playingRef = useRef(playing);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.preload = "auto"; 
    audio.load(); 
    audio.loop = true;
    audio.volume = 0.4; 
    ref.current = audio;
    
    return () => {
      audio.pause();
      ref.current = null;
    };
  }, []);

  // ─── අලුත්: Custom Events හඳුනාගැනීම (Pause / Resume) ───
  useEffect(() => {
    const handlePauseBGM = () => {
      if (ref.current && playingRef.current) {
        wasPlayingRef.current = true; // ප්ලේ වෙවී තිබුණු බව මතක තියාගන්නවා
        ref.current.pause();
        setPlaying(false);
      }
    };

    const handleResumeBGM = () => {
      if (ref.current && wasPlayingRef.current) {
        ref.current.play().then(() => setPlaying(true)).catch(() => {});
        wasPlayingRef.current = false;
      }
    };

    window.addEventListener("pause-bgm", handlePauseBGM);
    window.addEventListener("resume-bgm", handleResumeBGM);

    return () => {
      window.removeEventListener("pause-bgm", handlePauseBGM);
      window.removeEventListener("resume-bgm", handleResumeBGM);
    };
  }, []);

  useEffect(() => {
    if (autoPlay && ref.current && !playing && !hasAttemptedPlay.current) {
      hasAttemptedPlay.current = true; 
      if (ref.current.readyState >= 2) {
        ref.current.play().then(() => setPlaying(true)).catch(() => {});
      } else {
        ref.current.addEventListener('canplay', () => {
          if (!playingRef.current) {
            ref.current?.play().then(() => setPlaying(true)).catch(() => {});
          }
        }, { once: true });
      }
    }
  }, [autoPlay, playing]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (ref.current && !playing && !hasAttemptedPlay.current) {
        hasAttemptedPlay.current = true;
        if (ref.current.readyState >= 2) {
          ref.current.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          ref.current.addEventListener('canplay', () => {
            if (!playingRef.current) {
                ref.current?.play().then(() => setPlaying(true)).catch(() => {});
            }
          }, { once: true });
        }
      }
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [playing]);

  const toggle = () => {
    if (!ref.current) return;
    hasAttemptedPlay.current = true; 
    wasPlayingRef.current = false; // User Manual click කරොත් Auto resume වෙන එක නවත්වනවා

    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      onClick={(e) => {
        e.stopPropagation(); 
        toggle();
      }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-5 right-5 z-[100] flex items-center justify-center rounded-full border border-yellow-500/30 bg-black/40 p-3 backdrop-blur-md transition-all hover:border-yellow-400 hover:bg-black/60 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] cursor-pointer"
    >
      {playing ? (
        <Music className="w-5 h-5 text-yellow-400 animate-pulse drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
      ) : (
        <VolumeX className="w-5 h-5 text-yellow-100/40" />
      )}
    </motion.button>
  );
};