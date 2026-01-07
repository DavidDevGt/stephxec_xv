import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MapPin, Gift, Gem, Shirt, CircleSlash, Heart, Camera, Star } from 'lucide-react';
import Countdown from './Countdown';
import Timeline from './Timeline';
import { EVENT_DETAILS, GUEST_INFO } from '../constants';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

// --- Decorative Components ---

const Butterfly = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
    }}
    transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay
    }}
    className={`absolute pointer-events-none z-0 ${className}`}
  >
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold opacity-70">
      <path d="M12 12C10 9 9 3 12 3C15 3 14 9 12 12Z" fill="currentColor"/>
      <path d="M12 12C9 14 3 13 3 10C3 7 9 7 12 12Z" fill="currentColor"/>
      <path d="M12 12C15 14 21 13 21 10C21 7 15 7 12 12Z" fill="currentColor"/>
      <path d="M12 12C10 15 10 21 12 21C14 21 14 15 12 12Z" fill="currentColor"/>
    </svg>
  </motion.div>
);

const GoldDivider = () => (
    <div className="flex justify-center items-center py-16 opacity-100 relative">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent w-full max-w-xs"></div>
        <div className="mx-4 text-gold transform rotate-45">
            <Star size={16} fill="currentColor" />
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent w-full max-w-xs"></div>
    </div>
);

const SubtleGoldPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-multiply" 
       style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
       }}>
  </div>
);

// --- Main Component ---

const Invitation: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream overflow-hidden font-sans relative">
      {/* Global Background Texture */}
      <SubtleGoldPattern />
      
      {/* --- Section 1: Modern Arch Hero --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative pt-12 pb-20 px-4 flex flex-col items-center text-center z-10"
      >
        <Butterfly className="top-20 left-10" delay={0.5} />
        <Butterfly className="top-40 right-10" delay={1.5} />

        <div className="relative mb-8 p-4 bg-white shadow-2xl rounded-t-[12rem] rounded-b-[3rem] border-2 border-gold/30">
             {/* Inner border for elegance */}
             <div className="absolute inset-2 rounded-t-[11.5rem] rounded-b-[2.5rem] border border-gold/20 pointer-events-none"></div>

            {/* Image Container with Arch */}
            <div className="w-72 h-[28rem] md:w-80 md:h-[32rem] rounded-t-[11rem] rounded-b-[2rem] overflow-hidden relative border-[3px] border-gold p-1 shadow-inner">
                 <div className="w-full h-full rounded-t-[10.8rem] rounded-b-[1.8rem] overflow-hidden relative">
                    <img 
                        src="https://picsum.photos/400/600?grayscale" 
                        alt="Stephanie Xec" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-transparent to-transparent mix-blend-multiply"></div>
                </div>
            </div>
            
            {/* Floating Title Overlap */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[140%]">
                 <h1 className="font-script text-8xl md:text-9xl text-burgundy drop-shadow-[0_2px_0px_rgba(255,255,255,0.8)] rotate-[-5deg] origin-center z-10 relative">
                    {EVENT_DETAILS.name}
                    {/* Gold text accent/stroke simulation */}
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-gold to-yellow-600 opacity-30 -z-10 blur-[1px]">
                         {EVENT_DETAILS.name}
                    </span>
                 </h1>
            </div>
        </div>

        <div className="mt-12 max-w-lg mx-auto relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 bg-gold/5 blur-3xl rounded-full -z-10"></div>
             <p className="font-serif italic text-gold text-xl mb-4 tracking-wide relative inline-block">
                Con la bendición de Dios y mis padres
                <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1px] bg-gold/40"></span>
             </p>
             <h2 className="font-serif text-5xl text-dark tracking-widest uppercase border-y border-double border-gold py-4 relative">
                <span className="relative z-10 bg-gradient-to-r from-dark via-burgundy to-dark bg-clip-text text-transparent">Mis XV Años</span>
             </h2>
        </div>
      </motion.section>

      {/* --- Section 2: Date & Countdown --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-4 py-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gold/20 p-8 md:p-12 relative overflow-hidden">
            <SubtleGoldPattern />
            
            {/* Decorative corners - Simple Gold Lines */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/40 rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>
            
            <div className="relative z-10 text-center">
                <h3 className="text-4xl font-serif text-burgundy mb-2">Sábado, 20 de Junio</h3>
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

      {/* --- Section 3: Photo Gallery --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="px-4 py-8 max-w-6xl mx-auto relative z-10"
      >
        <Butterfly className="top-0 left-10" delay={2} />

        <div className="text-center mb-12">
            <Camera className="w-8 h-8 text-gold mx-auto mb-3" strokeWidth={1} />
            <h3 className="font-serif text-4xl text-burgundy">Momentos Inolvidables</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
                <motion.div 
                    key={item} 
                    variants={fadeInUp}
                    className="group relative h-96 p-2 bg-white shadow-xl transform transition-transform duration-500 hover:-translate-y-2"
                >
                    {/* Thin gold border around the image container */}
                    <div className="absolute inset-0 border border-gold/30 m-1"></div>
                    
                    <div className="w-full h-full overflow-hidden relative">
                        <img 
                            src={`https://picsum.photos/400/600?random=${item}`} 
                            alt="Gallery" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                         {/* Golden inner frame */}
                        <div className="absolute inset-0 border-4 border-white/10 pointer-events-none"></div>
                        <div className="absolute inset-4 border border-gold/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </motion.div>
            ))}
        </div>
      </motion.section>

      <GoldDivider />

      {/* --- Section 4: Location (Stacked Block 1) --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-4 py-8 max-w-4xl mx-auto z-10 relative"
      >
          <div className="bg-burgundy text-cream p-10 md:p-16 rounded-[2rem] shadow-2xl border-[3px] border-gold/50 outline outline-4 outline-burgundy/20 outline-offset-4 relative overflow-hidden text-center">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-linen.png')]"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
             
             {/* Simple Gold Circles in corners */}
             <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-gold/40"></div>
             <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-gold/40"></div>
             <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full bg-gold/40"></div>
             <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-gold/40"></div>

             <div className="relative z-10">
                <div className="inline-block p-4 rounded-full border border-gold/50 mb-6 bg-red-950 shadow-lg relative">
                    <div className="absolute inset-1 border border-gold/30 rounded-full"></div>
                    <MapPin size={32} className="text-gold" />
                </div>
                
                <h3 className="font-serif text-5xl text-gold mb-4 drop-shadow-md">Celebración</h3>
                <p className="font-serif italic text-white text-2xl mb-8 opacity-90">{EVENT_DETAILS.locationName}</p>
                
                <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
                    <div className="h-px w-12 bg-gold"></div>
                    <Star size={10} className="text-gold" fill="currentColor" />
                    <div className="h-px w-12 bg-gold"></div>
                </div>

                <p className="text-cream/80 font-sans font-light text-lg mb-10 tracking-wide max-w-md mx-auto">{EVENT_DETAILS.address}</p>
                
                <a 
                    href={EVENT_DETAILS.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-12 py-4 bg-transparent border border-gold text-gold font-bold hover:bg-gold hover:text-burgundy transition-all duration-300 uppercase text-sm tracking-[0.2em] rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] relative overflow-hidden group"
                >
                    <span className="relative z-10">Ver en Mapa</span>
                    <div className="absolute inset-0 bg-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </a>
             </div>
          </div>
      </motion.section>

      {/* --- Section 5: Timeline (Stacked Block 2) --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-4 py-12 max-w-4xl mx-auto relative z-10"
      >
         <Butterfly className="top-10 right-10" delay={0.8} />
         <div className="text-center mb-12 relative">
            <h3 className="font-serif text-5xl text-burgundy inline-block bg-cream px-12 py-2 relative z-10 border-y border-gold/20">Itinerario</h3>
         </div>
         <Timeline />
      </motion.section>

      {/* --- Section 6: Dress Code (Gold & Burgundy) --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-4 py-16 text-center relative z-10"
      >
        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.1)] max-w-5xl mx-auto border-4 border-double border-gold/20 relative overflow-hidden">
             <SubtleGoldPattern />
             
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-burgundy px-10 py-3 rounded-full shadow-lg border border-gold z-20">
                <h3 className="font-serif text-xl text-gold uppercase tracking-widest">Código de Vestimenta</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10 relative z-10">
                {/* Women */}
                <div className="group">
                    <div className="mx-auto w-20 h-20 bg-burgundy rounded-full flex items-center justify-center mb-6 shadow-xl border border-gold group-hover:scale-110 transition-transform relative">
                        <div className="absolute inset-1 border border-gold/30 rounded-full"></div>
                        <Gem size={32} strokeWidth={1} className="text-gold" />
                    </div>
                    <h4 className="font-serif text-3xl text-dark mb-2">Damas</h4>
                    <p className="text-gray-500 font-sans text-sm uppercase tracking-wider">Vestido Largo</p>
                </div>

                {/* Men */}
                <div className="group">
                    <div className="mx-auto w-20 h-20 bg-burgundy rounded-full flex items-center justify-center mb-6 shadow-xl border border-gold group-hover:scale-110 transition-transform relative">
                        <div className="absolute inset-1 border border-gold/30 rounded-full"></div>
                        <Shirt size={32} strokeWidth={1} className="text-gold" />
                    </div>
                    <h4 className="font-serif text-3xl text-dark mb-2">Caballeros</h4>
                    <p className="text-gray-500 font-sans text-sm uppercase tracking-wider">Traje Formal</p>
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col items-center relative z-10">
                 <div className="flex items-center gap-3 text-burgundy bg-red-50/50 px-6 py-3 rounded-full border border-red-100/50 shadow-sm">
                    <CircleSlash size={20} />
                    <span className="font-bold text-sm uppercase tracking-wide">Reservado para la Quinceañera: Rojo Vino</span>
                 </div>
             </div>
        </div>
      </motion.section>

      {/* --- Section 7: Gifts --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-6 pb-40 pt-10 text-center max-w-3xl mx-auto relative z-10"
      >
        <div className="bg-gradient-to-br from-white to-cream rounded-2xl p-12 shadow-inner border border-gold/30 relative overflow-hidden">
             <div className="absolute inset-0 border-[6px] border-double border-gold/10 pointer-events-none rounded-2xl"></div>
             <Heart size={40} className="text-gold/20 absolute top-6 right-6 animate-pulse" fill="currentColor" />
             
             <div className="bg-burgundy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-gold relative z-10">
                <Gift size={28} className="text-gold" />
             </div>
             
             <h3 className="font-serif text-3xl text-burgundy mt-4 mb-6 relative z-10">Lluvia de Sobres</h3>
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
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Confirmar Asistencia
        </a>
      </div>
    </div>
  );
};

export default Invitation;