import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GUEST_INFO } from '../constants';
import { ENVELOPE_OPEN_DELAY, ENVELOPE_OPEN_DURATION } from '../constants/animations';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Check for prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    
    setIsOpening(true);
    
    // Delay the actual state change to allow animation to play
    const delay = prefersReducedMotion ? 0 : ENVELOPE_OPEN_DELAY;
    timeoutRef.current = setTimeout(() => {
      onOpen();
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Trigger open on Enter or Space key
    if ((e.key === 'Enter' || e.key === ' ') && !isOpening) {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* Container for vertical movement */}
      <motion.div
        animate={isOpening ? { y: 1000, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : ENVELOPE_OPEN_DURATION / 1000, 
          ease: "easeInOut", 
          delay: prefersReducedMotion ? 0 : 0.5 
        }}
        className="relative w-full max-w-md px-3 sm:px-4 perspective-1000"
      >
        {/* Dynamic Text Floating Above */}
        <motion.div 
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="text-center mb-6 sm:mb-8 text-cream space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-serif text-gold tracking-wider">{GUEST_INFO.family}</h2>
          <div className="inline-block px-3 sm:px-4 py-1 border border-gold/50 rounded-full text-xs sm:text-sm font-sans tracking-widest uppercase">
            Pases Reservados: {GUEST_INFO.passes}
          </div>
        </motion.div>

        {/* The Envelope */}
        <div 
          ref={envelopeRef}
          className="relative w-full aspect-[4/3] bg-burgundy shadow-2xl rounded-sm mx-auto max-w-xs sm:max-w-sm"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Abre la invitación presionando Enter o Space"
          aria-pressed={isOpening}
        >
          {/* Envelope Body Texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-rose-950 opacity-50"></div>

          {/* Bottom Flap (Triangle) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-red-950/20 backdrop-brightness-90 z-10 clip-path-triangle-bottom"></div>

          {/* Top Flap (The animation key) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.6, 
              ease: "easeInOut" 
            }}
            style={{ transformOrigin: "top" }}
            className="absolute top-0 left-0 right-0 h-1/2 z-20"
          >
             <div className="w-full h-full bg-burgundy border-b-2 border-red-900/50 shadow-lg relative flex justify-center items-end"
                  style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}>
                
                {/* Wax Seal */}
                <div className="absolute -bottom-4 sm:-bottom-6 w-10 sm:w-12 h-10 sm:h-12 bg-gold rounded-full shadow-md flex items-center justify-center border-2 border-yellow-600/50 z-30">
                  <span className="font-serif text-red-900 font-bold text-base sm:text-xl">XV</span>
                </div>
             </div>
          </motion.div>

          {/* The Card Inside (Peek effect) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isOpening ? { y: -100 } : { y: 0 }}
            transition={{ 
              delay: prefersReducedMotion ? 0 : 0.3, 
              duration: prefersReducedMotion ? 0 : 0.5 
            }}
            className="absolute left-3 sm:left-4 right-3 sm:right-4 top-2 bottom-2 bg-cream z-0 flex flex-col items-center justify-start pt-6 sm:pt-8 shadow-inner"
          >
             <h3 className="font-script text-2xl sm:text-3xl text-burgundy">Stephanie</h3>
             <p className="text-xs uppercase tracking-widest mt-1 sm:mt-2 text-gray-500">Mis Quince Años</p>
          </motion.div>

          {/* Side flaps styling illusion */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none border-x-[20px] border-b-[20px] border-transparent border-l-burgundy/80 border-r-burgundy/80 border-b-burgundy/80"
            style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </div>

        <motion.p 
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="text-center mt-6 sm:mt-8 text-white/60 text-xs sm:text-sm animate-pulse px-4"
        >
          Toca el sello o presiona Enter para abrir
        </motion.p>

      </motion.div>
    </motion.div>
  );
};

export default Envelope;