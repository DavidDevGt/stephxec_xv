import { useState, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
  isLoaded: boolean;
  error: boolean;
}

export const useImageDimensions = (src: string): ImageDimensions => {
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: 16,
    height: 9,
    aspectRatio: 16 / 9,
    isLoaded: false,
    error: false,
  });

  useEffect(() => {
    const img = new Image();

    const handleLoad = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio,
        isLoaded: true,
        error: false,
      });
    };

    const handleError = () => {
      setDimensions((prev) => ({
        ...prev,
        error: true,
        isLoaded: true,
      }));
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return dimensions;
};
