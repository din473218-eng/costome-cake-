import { motion } from 'motion/react';
import { ChevronRight, Calendar, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import heroLuxuryImg from '../assets/images/hero_luxury_cake_1784502950164.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#0d0c0b] pt-24 overflow-hidden"
    >
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-[#1c1814]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Text Block */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-xs tracking-[0.4em] uppercase text-[#d4af37] font-semibold">
                Bespoke Sugar Artistry
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f5f2eb] leading-tight font-light">
                Crafting Your Dream <br />
                <span className="font-semibold italic text-[#d4af37] text-5xl sm:text-6xl md:text-7xl">
                  Masterpiece
                </span>
              </h1>
              <p className="text-[#f5f2eb]/75 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                At L'Étoile, we turn your unique milestones into edible works of art. From minimal botanicals to gilded luxury tiers, every cake is custom-tailored with premium ingredients and pristine detail.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => onNavigate('estimator')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#d4af37] hover:bg-[#c5a030] text-[#0d0c0b] px-8 py-4 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all hover:scale-105 shadow-xl shadow-[#d4af37]/10"
              >
                <Calendar className="h-4 w-4" />
                <span>Begin Your Order</span>
              </button>

              <button
                onClick={() => onNavigate('gallery')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-[#1c1814] text-[#f5f2eb] border border-[#f5f2eb]/20 hover:border-[#d4af37] px-8 py-4 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-all"
              >
                <span>View Gallery</span>
                <ChevronRight className="h-4 w-4 text-[#d4af37]" />
              </button>
            </motion.div>

            {/* Quick trust metrics / attributes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-6 border-t border-[#2c251e]/60 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <p className="font-serif text-lg text-[#d4af37] font-semibold">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-[#f5f2eb]/50 font-sans">Bespoke Design</p>
              </div>
              <div className="border-x border-[#2c251e]/60 px-4">
                <p className="font-serif text-lg text-[#d4af37] font-semibold">Organic</p>
                <p className="text-[10px] uppercase tracking-wider text-[#f5f2eb]/50 font-sans">Premium Sourcing</p>
              </div>
              <div>
                <p className="font-serif text-lg text-[#d4af37] font-semibold">Boutique</p>
                <p className="text-[10px] uppercase tracking-wider text-[#f5f2eb]/50 font-sans">Atelier Quality</p>
              </div>
            </motion.div>
          </div>

          {/* Premium Image Block with Elegant Framed Accent */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Gold abstract frame accent */}
              <div className="absolute -inset-4 border border-[#d4af37]/25 rounded-2xl -z-10 translate-x-3 translate-y-3 pointer-events-none hidden sm:block" />
              
              {/* Image Container with high contrast border */}
              <div className="overflow-hidden rounded-2xl border-2 border-[#2c251e] shadow-2xl bg-[#1c1814] aspect-[3/4] relative">
                <img
                  src={heroLuxuryImg}
                  alt="Luxurious multi-tiered custom wedding cake with gold leaf detailing"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge on image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0d0c0b]/80 backdrop-blur-md border border-[#d4af37]/30 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#d4af37] uppercase tracking-widest font-sans font-semibold">Signature Creation</p>
                    <p className="font-serif text-sm text-[#f5f2eb] mt-0.5">The Gilded Rose Cake</p>
                  </div>
                  <span className="text-xs text-[#d4af37]/90 font-mono tracking-wider">$650 Est.</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
