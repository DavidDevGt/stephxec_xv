import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Gift,
  Gem,
  Shirt,
  CircleSlash,
  Heart,
  Camera,
  Star,
} from "lucide-react";
import Countdown from "./Countdown";
import ImageSlider from "./ImageSlider";
import Butterfly from "./decorative/Butterfly";
import GoldDivider from "./decorative/GoldDivider";
import SubtleGoldPattern from "./decorative/SubtleGoldPattern";
import { EVENT_DETAILS, GUEST_INFO } from "../constants";
import { 
  fadeInUp, 
  staggerContainer,
  fadeInUpReduced,
  staggerContainerReduced
} from "../constants/animations";

const Invitation: React.FC<{ guestName?: string | null }> = ({ guestName }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Choose variants based on user preference
  const activeFadeInUp = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const activeStaggerContainer = prefersReducedMotion ? staggerContainerReduced : staggerContainer;

  return (
    <div className="light min-h-screen bg-[#FDFBF7] overflow-hidden font-sans relative text-[#2D2D2D]">
      {/* Global Background Texture */}
      <SubtleGoldPattern />

      {/* --- Section 1: Modern Arch Hero --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={activeFadeInUp}
        className="relative pt-8 pb-16 px-3 sm:px-4 flex flex-col items-center text-center z-10 md:py-20"
      >
        <Butterfly className="top-20 left-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" delay={0.5} />
        <Butterfly className="top-40 right-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" delay={1.5} />

        <div className="relative mb-6 sm:mb-8 p-2 sm:p-4 bg-white shadow-2xl rounded-t-[8rem] sm:rounded-t-[10rem] md:rounded-t-[12rem] rounded-b-[2rem] sm:rounded-b-[2.5rem] border-2 border-gold/30">
          {/* Inner border for elegance */}
          <div className="absolute inset-2 rounded-t-[7.5rem] sm:rounded-t-[9.5rem] md:rounded-t-[11.5rem] rounded-b-[1.8rem] sm:rounded-b-[2.3rem] border border-gold/20 pointer-events-none"></div>

          {/* Image Container with Arch */}
          <div className="w-56 h-80 sm:w-72 sm:h-[28rem] md:w-80 md:h-[32rem] rounded-t-[7.5rem] sm:rounded-t-[10.8rem] md:rounded-t-[11rem] rounded-b-[1.5rem] sm:rounded-b-[2rem] overflow-hidden relative border-[2px] sm:border-[3px] border-gold p-1 shadow-inner">
            <div className="w-full h-full rounded-t-[7.3rem] sm:rounded-t-[10.6rem] md:rounded-t-[10.8rem] rounded-b-[1.3rem] sm:rounded-b-[1.8rem] overflow-hidden relative">
              <img
                src={new URL('/src/assets/IMG_1820.webp', import.meta.url).href}
                alt="Stephanie Xec"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-transparent to-transparent mix-blend-multiply"></div>
            </div>
          </div>

          {/* Floating Title Overlap */}
          <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-[140%]">
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-burgundy drop-shadow-[0_2px_0px_rgba(255,255,255,0.8)] rotate-[-5deg] origin-center z-10 relative leading-none">
              {EVENT_DETAILS.name}
              {/* Gold text accent/stroke simulation */}
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-gold to-yellow-600 opacity-30 -z-10 blur-[1px]">
                {EVENT_DETAILS.name}
              </span>
            </h1>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 max-w-lg mx-auto relative px-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 bg-gold/5 blur-3xl rounded-full -z-10"></div>
          <p className="font-serif italic text-gold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 tracking-wide relative inline-block">
            Con la bendición de Dios y mis padres
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1px] bg-gold/40"></span>
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark tracking-widest uppercase border-y border-double border-gold py-3 sm:py-4 relative">
            <span className="relative z-10 bg-gradient-to-r from-dark via-burgundy to-dark bg-clip-text text-transparent">
              Mis XV Años
            </span>
          </h2>
          {/* Información del invitado */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="font-serif text-gold text-sm sm:text-base md:text-lg mb-1">
              Bienvenid@, {GUEST_INFO.family}
            </p>
            <p className="font-sans text-gray-600 text-xs sm:text-sm">
              Tienes {GUEST_INFO.tickets} pases reservados
            </p>
          </div>
        </div>
      </motion.section>

      {/* --- Section 2: Date & Countdown --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={activeFadeInUp}
        className="px-3 sm:px-4 py-6 sm:py-8 md:py-12 relative z-10"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gold/20 p-6 sm:p-8 md:p-12 relative overflow-hidden">
          <SubtleGoldPattern />

          {/* Decorative corners - Simple Gold Lines */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 sm:w-16 h-10 sm:h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-16 h-10 sm:h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-xl"></div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-10 sm:w-16 h-10 sm:h-16 border-b-2 border-l-2 border-gold/40 rounded-bl-xl"></div>
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 sm:w-16 h-10 sm:h-16 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-4xl font-serif text-burgundy mb-2">
              Sábado, 07 de Marzo
            </h3>
            <p className="font-sans text-gold font-bold uppercase tracking-[0.3em] text-sm mb-10 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-gold"></span>
              2026
              <span className="h-px w-8 bg-gold"></span>
            </p>
            <Countdown targetDate={EVENT_DETAILS.date} />
          </div>
        </div>
      </motion.section>

      <GoldDivider />

      {/* --- Section 3: Photo Gallery Slider --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={activeStaggerContainer}
        className="px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl mx-auto relative z-10"
      >
        <Butterfly className="top-0 left-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" delay={2} />

        <div className="text-center mb-6 sm:mb-8">
          <Camera className="w-6 sm:w-8 h-6 sm:h-8 text-gold mx-auto mb-2 sm:mb-3" strokeWidth={1} />
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-burgundy mb-1 sm:mb-2">
            Momentos Inolvidables
          </h3>
          <p className="text-sm sm:text-base text-gold italic font-serif">Desliza para ver más fotos</p>
        </div>

        <motion.div variants={activeFadeInUp}>
          <ImageSlider
            images={[
              { src: new URL('/src/assets/slider/IMG_1703.jpg', import.meta.url).href, alt: 'Galería - Foto 1' },
              { src: new URL('/src/assets/slider/IMG_1713.jpg', import.meta.url).href, alt: 'Galería - Foto 2' },
              { src: new URL('/src/assets/slider/IMG_1720.jpg', import.meta.url).href, alt: 'Galería - Foto 3' },
            ]}
            autoPlay={true}
            autoPlayDelay={4000}
            showIndicators={true}
            showControls={true}
            className="border-[2px] sm:border-[3px] border-gold/50 rounded-xl sm:rounded-2xl"
          />
        </motion.div>
      </motion.section>

      <GoldDivider />

      {/* --- Section 4: Location (Stacked Block 1) --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={activeFadeInUp}
        className="px-3 sm:px-4 py-6 sm:py-8 md:py-12 max-w-4xl mx-auto z-10 relative"
      >
        <div className="bg-burgundy text-cream p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-[2rem] shadow-2xl border-[2px] sm:border-[3px] border-gold/50 outline outline-4 outline-burgundy/20 outline-offset-4 relative overflow-hidden text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-linen.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>

          {/* Simple Gold Circles in corners */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gold/40"></div>
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gold/40"></div>
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gold/40"></div>
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gold/40"></div>

          <div className="relative z-10">
            <div className="inline-block p-3 sm:p-4 rounded-full border border-gold/50 mb-4 sm:mb-6 bg-red-950 shadow-lg relative">
              <div className="absolute inset-1 border border-gold/30 rounded-full"></div>
              <MapPin size={24} className="sm:w-8 sm:h-8 text-gold" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold mb-2 sm:mb-4 drop-shadow-md">
              Celebración
            </h3>
            <p className="font-serif italic text-white text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8 opacity-90">
              {EVENT_DETAILS.locationName}
            </p>

            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 opacity-50">
              <div className="h-px w-8 sm:w-12 bg-gold"></div>
              <Star size={8} className="sm:w-2.5 sm:h-2.5 text-gold" fill="currentColor" />
              <div className="h-px w-8 sm:w-12 bg-gold"></div>
            </div>

            <p className="text-cream/80 font-sans font-light text-base sm:text-lg md:text-lg mb-6 sm:mb-10 tracking-wide max-w-md mx-auto px-2">
              {EVENT_DETAILS.address}
            </p>

            <a
              href={EVENT_DETAILS.mapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 sm:px-12 py-2 sm:py-4 bg-transparent border border-gold text-gold font-bold hover:bg-gold hover:text-burgundy transition-all duration-300 uppercase text-xs sm:text-sm tracking-[0.2em] rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] relative overflow-hidden group"
            >
              <span className="relative z-10">Ver en Mapa</span>
              <div className="absolute inset-0 bg-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      </motion.section>



      {/* --- Section 6: Dress Code --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={activeFadeInUp}
        className="px-3 sm:px-4 py-12 sm:py-20 md:py-24 relative z-10"
      >
        <div className="relative max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-[2rem] shadow-[0_10px_50px_rgba(0,0,0,0.08)] border border-gold/20 p-6 sm:p-12 md:p-16 text-center">
          {/* Título Superior - El "Tag" de la imagen */}
          <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-burgundy px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg border border-gold/50">
              <h3 className="font-serif text-xs sm:text-sm md:text-base text-gold uppercase tracking-[0.3em] whitespace-nowrap">
                Código de Vestimenta
              </h3>
            </div>
          </div>

          {/* Contenido de Damas y Caballeros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 md:gap-12 mt-4 sm:mt-8">
            {/* Damas */}
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-burgundy rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md border border-gold/30">
                <Gem size={24} strokeWidth={1.2} className="sm:w-8 sm:h-8 text-gold" />
              </div>
              <h4 className="font-serif text-2xl sm:text-4xl text-dark mb-1">Damas</h4>
              <p className="text-gray-500 font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] font-medium">
                Vestido
              </p>
            </div>

            {/* Caballeros */}
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-burgundy rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md border border-gold/30">
                <Shirt size={24} strokeWidth={1.2} className="sm:w-8 sm:h-8 text-gold" />
              </div>
              <h4 className="font-serif text-2xl sm:text-4xl text-dark mb-1">Caballeros</h4>
              <p className="text-gray-500 font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] font-medium">
                Traje Formal
              </p>
            </div>
          </div>
          
          {/* Sección para evitar el color corinto */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gold/10 flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-3 text-burgundy bg-red-50/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-red-100/50 shadow-sm">
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">Evitar usar el color corinto</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- Section 7: Gifts --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={activeFadeInUp}
        className="px-6 pb-40 pt-10 text-center max-w-3xl mx-auto relative z-10"
      >
        <div className="bg-gradient-to-br from-white to-cream rounded-2xl p-12 shadow-inner border border-gold/30 relative overflow-hidden">
          <div className="absolute inset-0 border-[6px] border-double border-gold/10 pointer-events-none rounded-2xl"></div>
          <Heart
            size={40}
            className="text-gold/20 absolute top-6 right-6 animate-pulse"
            fill="currentColor"
          />

          <div className="bg-burgundy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-gold relative z-10">
            <Gift size={28} className="text-gold" />
          </div>

          <h3 className="font-serif text-3xl text-burgundy mt-4 mb-6 relative z-10">
            Lluvia de Sobres
          </h3>
          <p className="font-serif text-xl text-gray-600 leading-relaxed italic px-4 relative z-10">
            "{EVENT_DETAILS.giftMessage}"
          </p>
        </div>
      </motion.section>

      {/* --- Footer --- */}
      <div className="fixed bottom-6 left-4 right-4 z-40 flex justify-center">
        <a
          href={`https://wa.me/${EVENT_DETAILS.whatsappNumber}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Stephanie.%20Familia:%20${GUEST_INFO.family}`}
          target="_blank"
          rel="noreferrer"
          className="w-full max-w-lg bg-burgundy text-gold font-sans text-sm font-bold py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform border border-gold ring-2 ring-burgundy ring-offset-2 ring-offset-transparent"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Confirmar Asistencia
        </a>
      </div>
    </div>
  );
};

export default Invitation;
