import React from 'react';
import { motion } from 'framer-motion';
import { butterflylAnimation } from '../constants/animations';

interface ButterflyProps {
  className?: string;
  delay?: number;
}

/**
 * Decorative floating butterfly component
 * Memoized to prevent unnecessary re-renders
 */
const Butterfly: React.FC<ButterflyProps> = ({ className = '', delay = 0 }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={prefersReducedMotion ? {} : {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={prefersReducedMotion ? { duration: 0.3 } : {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold opacity-70"
      >
        <path d="M12 12C10 9 9 3 12 3C15 3 14 9 12 12Z" fill="currentColor" />
        <path d="M12 12C9 14 3 13 3 10C3 7 9 7 12 12Z" fill="currentColor" />
        <path d="M12 12C15 14 21 13 21 10C21 7 15 7 12 12Z" fill="currentColor" />
        <path d="M12 12C10 15 10 21 12 21C14 21 14 15 12 12Z" fill="currentColor" />
      </svg>
    </motion.div>
  );
};

export default React.memo(Butterfly);
