import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Custom hook for countdown timer logic
 * @param targetDate - The target date to count down to
 * @returns Object with days, hours, minutes, seconds remaining
 */
export const useCountdown = (targetDate: Date): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        // Validate target date
        if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
          console.error('Invalid target date provided to useCountdown');
          return;
        }

        const difference = +targetDate - +new Date();
        
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          // Event has passed
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } catch (error) {
        console.error('Error calculating countdown:', error);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
