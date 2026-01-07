import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GUEST_INFO } from '../constants';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Delay the actual state change to allow animation to play
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
      exit={{ opacity: 0 }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* Container for vertical movement */}
      <motion.div
        animate={isOpening ? { y: 1000, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        className="relative w-full max-w-md px-4 perspective-1000"
      >
        {/* Dynamic Text Floating Above */}
        <motion.div 
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          className="text-center mb-8 text-cream space-y-2"
        >
          <h2 className="text-3xl font-serif text-gold tracking-wider">{GUEST_INFO.family}</h2>
          <div className="inline-block px-4 py-1 border border-gold/50 rounded-full text-sm font-sans tracking-widest uppercase">
            Pases Reservados: {GUEST_INFO.passes}
          </div>
        </motion.div>

        {/* The Envelope */}
        <div 
          className="relative w-full aspect-[4/3] bg-burgundy shadow-2xl rounded-sm cursor-pointer mx-auto max-w-[350px]"
          onClick={handleOpen}
        >
          {/* Envelope Body Texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-rose-950 opacity-50"></div>

          {/* Bottom Flap (Triangle) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-red-950/20 backdrop-brightness-90 z-10 clip-path-triangle-bottom"></div>

          {/* Top Flap (The animation key) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute top-0 left-0 right-0 h-1/2 z-20"
          >
             <div className="w-full h-full bg-burgundy border-b-2 border-red-900/50 shadow-lg relative flex justify-center items-end"
                  style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}>
                
                {/* Wax Seal */}
                <div className="absolute -bottom-6 w-12 h-12 bg-gold rounded-full shadow-md flex items-center justify-center border-2 border-yellow-600/50 z-30">
                  <span className="font-serif text-red-900 font-bold text-xl">XV</span>
                </div>
             </div>
          </motion.div>

          {/* The Card Inside (Peek effect) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isOpening ? { y: -100 } : { y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute left-4 right-4 top-2 bottom-2 bg-cream z-0 flex flex-col items-center justify-start pt-8 shadow-inner"
          >
             <h3 className="font-script text-3xl text-burgundy">Stephanie</h3>
             <p className="text-xs uppercase tracking-widest mt-2 text-gray-500">Mis Quince Años</p>
          </motion.div>

          {/* Side flaps styling illusion */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none border-x-[20px] border-b-[20px] border-transparent border-l-burgundy/80 border-r-burgundy/80 border-b-burgundy/80"
            style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </div>

        <motion.p 
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          className="text-center mt-8 text-white/60 text-sm animate-pulse"
        >
          Toca el sello para abrir
        </motion.p>

      </motion.div>
    </motion.div>
  );
};

export default Envelope;