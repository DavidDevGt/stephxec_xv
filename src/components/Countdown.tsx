import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDate: Date;
}

interface TimeUnitProps {
  value: number;
  label: string;
  ariaLabel: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, ariaLabel }) => (
  <div className="flex flex-col items-center mx-1 sm:mx-2 md:mx-4" role="group" aria-label={ariaLabel}>
    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border border-gold/30 bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm">
      <span 
        className="text-lg sm:text-2xl md:text-3xl font-serif text-burgundy font-bold"
        aria-live="polite"
        aria-atomic="true"
      >
        {value < 10 ? `0${value}` : value}
      </span>
    </div>
    <span className="text-[0.65rem] sm:text-xs uppercase tracking-widest mt-1 sm:mt-2 text-gray-600 font-sans">{label}</span>
  </div>
);

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const timeLeft = useCountdown(targetDate);

  return (
    <div 
      className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 py-4 sm:py-8"
      role="timer"
      aria-label="Tiempo restante para el evento"
    >
      <TimeUnit 
        value={timeLeft.days} 
        label="Días" 
        ariaLabel={`${timeLeft.days} días restantes`}
      />
      <TimeUnit 
        value={timeLeft.hours} 
        label="Hrs" 
        ariaLabel={`${timeLeft.hours} horas restantes`}
      />
      <TimeUnit 
        value={timeLeft.minutes} 
        label="Min" 
        ariaLabel={`${timeLeft.minutes} minutos restantes`}
      />
      <TimeUnit 
        value={timeLeft.seconds} 
        label="Seg" 
        ariaLabel={`${timeLeft.seconds} segundos restantes`}
      />
    </div>
  );
};

export default Countdown;