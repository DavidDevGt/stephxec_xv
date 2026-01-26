import { Variants } from 'framer-motion';

// Animation timing constants
export const ANIMATION_DURATION = {
  SHORT: 0.3,
  MEDIUM: 0.6,
  LONG: 0.8,
  TRANSITION: 1,
} as const;

export const ENVELOPE_OPEN_DELAY = 1200; // milliseconds
export const ENVELOPE_OPEN_DURATION = 1000;

// Framer Motion variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: ANIMATION_DURATION.LONG, ease: "easeOut" } 
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const floatAnimation = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
};

export const butterflylAnimation = {
  y: [0, -10, 0],
  rotate: [0, 5, -5, 0],
  ...floatAnimation,
};

// Reduced motion variants for accessibility
export const fadeInUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.3, ease: "easeOut" } 
  },
};

export const staggerContainerReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
