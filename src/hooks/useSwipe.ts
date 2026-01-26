import { useRef, useCallback, TouchEvent } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface UseSwipeOptions {
  threshold?: number; // Minimum pixels to trigger swipe (default: 50)
  onSwipe?: SwipeHandlers;
}

export const useSwipe = (options: UseSwipeOptions = {}) => {
  const { threshold = 50, onSwipe = {} } = options;
  
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    touchEnd.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = touchStart.current.y - touchEnd.current.y;

    // Check if it's more of a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipe.onSwipeLeft) {
          onSwipe.onSwipeLeft();
        } else if (deltaX < 0 && onSwipe.onSwipeRight) {
          onSwipe.onSwipeRight();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && onSwipe.onSwipeUp) {
          onSwipe.onSwipeUp();
        } else if (deltaY < 0 && onSwipe.onSwipeDown) {
          onSwipe.onSwipeDown();
        }
      }
    }
  }, [threshold, onSwipe]);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};
