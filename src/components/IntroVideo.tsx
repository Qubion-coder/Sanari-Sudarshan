import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
  onMusicStart?: () => void;
  readyToTransition?: boolean;
}

export function IntroVideo({ onComplete, onMusicStart, readyToTransition = true }: IntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (!readyToTransition) return;
    setIsPlaying(true);
  };

  const handleVideoEnded = () => {
    if (onMusicStart) onMusicStart();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-blush flex items-center justify-center overflow-hidden">
      {/* Blurred background video */}
      {!isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <video
            className="w-full h-full object-cover blur-sm scale-105 opacity-90"
            playsInline
            autoPlay
            muted
            loop
            src="/intro.mp4"
          />
          {/* Overlay to ensure text remains readable */}
          <div className="absolute inset-0 bg-brand-blush/20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      )}
      
      {!isPlaying ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center p-10 sm:p-16 text-center max-w-2xl w-[90%]"
        >
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/50 shadow-[0_20px_60px_rgba(176,137,104,0.15)] -z-10" />
          
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-plum/60" />
            <span className="text-brand-plum uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-semibold font-sans drop-shadow-sm">
              Denasa & Inoka
            </span>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-plum/60" />
          </div>

          <h1 className="text-5xl sm:text-7xl font-names text-stone-800 tracking-tight drop-shadow-sm mb-10 leading-tight">
            Welcome to Our <br />
            <span className="italic font-light text-brand-plum text-4xl sm:text-6xl">Wedding Celebration</span>
          </h1>

          <button
            onClick={handlePlayClick}
            disabled={!readyToTransition}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-800 text-brand-rose rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4 text-brand-plum group-hover:scale-110 transition-transform" />
              {readyToTransition ? 'View Invitation' : 'Preparing...'}
            </span>
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full bg-black z-50"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover sm:object-contain"
            playsInline
            autoPlay
            onEnded={handleVideoEnded}
            src="/intro.mp4"
          />
          <button 
            onClick={handleVideoEnded}
            className="absolute top-6 right-6 z-50 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 border border-white/20 text-[10px] tracking-widest uppercase hover:bg-white/20 hover:text-white transition-all duration-300"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </div>
  );
}
