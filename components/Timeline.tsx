import React from 'react';
import { TIMELINE } from '../constants';
import { Church, Wine, Utensils, Music } from 'lucide-react';

const icons = {
  church: Church,
  toast: Wine,
  dinner: Utensils,
  party: Music,
};

const Timeline: React.FC = () => {
  return (
    <div className="relative py-10 px-4">
      {/* Central Axis - Gold Gradient Line */}
      <div className="absolute left-[28px] md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-gold to-transparent opacity-70"></div>
      
      <div className="space-y-16">
        {TIMELINE.map((event, index) => {
          const Icon = icons[event.icon];
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className={`relative flex items-center md:justify-between flex-row md:flex-row ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for desktop layout */}
              <div className="absolute left-0 md:static md:w-[45%] flex md:justify-end z-10"></div>

              {/* Icon Node - Burgundy Background with Gold Icon & Border */}
              <div className="relative z-20 flex-shrink-0 w-14 h-14 bg-burgundy rounded-full border-2 border-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] mx-auto md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                <Icon size={22} className="text-gold" strokeWidth={1.5} />
              </div>

              {/* Content Card - Elegant Gold Border style */}
              <div className={`ml-16 md:ml-0 w-full md:w-[45%] ${isLeft ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                <div className="bg-white p-6 rounded-lg border-y-2 border-gold shadow-xl relative overflow-hidden group hover:bg-cream transition-colors duration-300">
                  {/* Subtle decorative corner */}
                  <div className={`absolute top-0 w-10 h-10 border-t-4 border-burgundy/20 ${isLeft ? 'right-0 border-r-4 rounded-tr-lg' : 'left-0 border-l-4 rounded-tl-lg'}`}></div>
                  
                  <h3 className="text-burgundy font-serif text-2xl font-bold mb-1">{event.title}</h3>
                  <div className="flex items-center gap-2 justify-center md:justify-start w-full">
                     <span className={`h-px w-8 bg-gold ${isLeft ? 'md:order-last' : ''}`}></span>
                     <p className="text-gray-800 font-sans font-bold tracking-widest text-sm uppercase">
                        {event.time} HRS
                     </p>
                     <span className={`h-px w-8 bg-gold ${isLeft ? 'md:order-first' : ''}`}></span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;