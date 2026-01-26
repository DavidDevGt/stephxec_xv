import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useImageDimensions } from '../hooks/useImageDimensions';

interface ImageSliderProps {
  images: Array<{ src: string; alt: string }>;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
  maintainAspectRatio?: boolean;
  maxHeight?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = true,
  autoPlayDelay = 5000,
  showIndicators = true,
  showControls = true,
  className = '',
  maintainAspectRatio = true,
  maxHeight = '500px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<Array<{ width: number; height: number; aspectRatio: number }>>([]);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Load all images to calculate max aspect ratio
  useEffect(() => {
    const loadImages = async () => {
      const dimensions = await Promise.all(
        images.map(
          (image) =>
            new Promise<{ width: number; height: number; aspectRatio: number }>((resolve) => {
              const img = new Image();
              img.onload = () => {
                resolve({
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  aspectRatio: img.naturalWidth / img.naturalHeight,
                });
              };
              img.onerror = () => {
                resolve({ width: 16, height: 9, aspectRatio: 16 / 9 }); // Fallback
              };
              img.src = image.src;
            })
        )
      );
      setImageDimensions(dimensions);
    };
    loadImages();
  }, [images]);

  // Use the maximum aspect ratio to prevent layout shift
  const stableAspectRatio = useMemo(() => {
    if (imageDimensions.length === 0) return 16 / 9; // Default fallback
    return Math.max(...imageDimensions.map((d) => d.aspectRatio));
  }, [imageDimensions]);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || isHovered || isTouching) return;

    autoPlayRef.current = setTimeout(() => {
      handleNext();
    }, autoPlayDelay);

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [currentIndex, autoPlay, autoPlayDelay, isHovered, isTouching]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Swipe/Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent vertical scroll if horizontal swipe is happening
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
    
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsTouching(false);
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    const minSwipeDistance = 30; // Minimum pixels to trigger swipe

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swiped left -> next image
        handleNext();
      } else {
        // Swiped right -> previous image
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={sliderRef}
      className={`relative w-full overflow-hidden rounded-lg shadow-2xl group cursor-grab active:cursor-grabbing bg-gradient-to-b from-burgundy/5 via-transparent to-burgundy/5 ${className}`}
      style={
        maintainAspectRatio
          ? {
              aspectRatio: stableAspectRatio,
              maxHeight,
            }
          : undefined
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Galería de imágenes con navegación de deslizamiento"
      aria-live="polite"
    >
      {/* Images Container */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {showControls && (
        <>
          {/* Previous Button - Larger on mobile */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all duration-300 opacity-0 sm:opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 active:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gold/50 touch:opacity-100 active:scale-90"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Next Button - Larger on mobile */}
          <motion.button
            onClick={handleNext}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all duration-300 opacity-0 sm:opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 active:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gold/50 touch:opacity-100 active:scale-90"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={24} />
          </motion.button>
        </>
      )}

      {/* Indicators/Dots - Touch-friendly size */}
      {showIndicators && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2 px-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 touch:scale-150 ${
                index === currentIndex
                  ? 'bg-gold w-2.5 h-2.5 sm:w-3 sm:h-3'
                  : 'bg-white/40 w-2 h-2 sm:w-2 sm:h-2 hover:bg-white/60 active:bg-white/80'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 1.2 }}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-black/50 backdrop-blur-md text-white px-3 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-serif select-none">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Mobile swipe hint - Shows only on mobile, fades after first swipe */}
      {!isTouching && images.length > 1 && (
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="absolute bottom-14 sm:hidden left-1/2 -translate-x-1/2 z-20 text-white/70 text-xs font-sans whitespace-nowrap pointer-events-none"
        >
          Desliza para cambiar
        </motion.div>
      )}
    </div>
  );
};

export default ImageSlider;
