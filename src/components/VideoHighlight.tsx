import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart } from 'lucide-react';

export const VideoHighlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Small slow motion effect
    }
  }, []);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={containerRef} className="w-full relative py-16 md:py-24 overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-[90rem] mx-auto px-6 mb-12 sm:mb-16 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-4 mb-4 sm:mb-6 justify-center">
            <div className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-brand-plum/60" />
            <Heart className="w-4 h-4 text-brand-plum animate-pulse" />
            <div className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-brand-plum/60" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-display text-stone-800 tracking-tight drop-shadow-sm leading-tight">
            Our <span className="italic font-light text-brand-plum">Moments</span>
          </h2>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-brand-lavender/20 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div 
        style={{ scale, opacity }}
        className="w-[90%] max-w-6xl aspect-[3/4] sm:aspect-video lg:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative shadow-[0_30px_60px_rgba(176,137,104,0.3)] border-[8px] sm:border-[16px] border-white/90 bg-brand-rose"
      >
        <video 
          ref={videoRef}
          src="/IMG_8720.MP4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Elegant Inner Shadow */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)] pointer-events-none z-20" />
        
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none z-20" />
        
        <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 z-30 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="font-names text-4xl sm:text-5xl text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-3">
              Two Souls, One Heart
            </h3>
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/80 font-semibold drop-shadow-md">
              A Love Story Unfolding
            </p>
        </div>
      </motion.div>
    </div>
  );
};
