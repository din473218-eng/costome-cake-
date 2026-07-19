import { useState } from 'react';
import { CakeItem, CakeCategory } from '../types';
import { CAKE_GALLERY } from '../data';
import { Info, X, Star, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CakeGalleryProps {
  onSelectCustomize: (cake: CakeItem) => void;
}

export default function CakeGallery({ onSelectCustomize }: CakeGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('all');
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);

  const categories: { label: string; value: CakeCategory }[] = [
    { label: 'All Creations', value: 'all' },
    { label: 'Royal Wedding', value: 'wedding' },
    { label: 'Indulgent Chocolate', value: 'chocolate' },
    { label: 'Modern Minimalist', value: 'minimalist' },
    { label: 'Artisanal Botanical', value: 'botanical' }
  ];

  const filteredCakes = activeCategory === 'all'
    ? CAKE_GALLERY
    : CAKE_GALLERY.filter(cake => cake.category === activeCategory);

  const handleCustomizeClick = (cake: CakeItem) => {
    setSelectedCake(null);
    onSelectCustomize(cake);
  };

  return (
    <section id="gallery" className="py-24 bg-[#0d0c0b] border-t border-[#2c251e]/40 relative">
      <div className="absolute inset-0 bg-radial-[circle_at_bottom_left] from-[#1c1814]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#d4af37] font-semibold">The Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb] mt-3 font-light">
            Custom Cake <span className="italic font-normal text-[#d4af37]">Gallery</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6" />
          <p className="text-[#f5f2eb]/70 text-sm sm:text-base mt-4 font-light">
            Every creation is bespoke, crafted with extreme precision and the absolute finest ingredients. Filter our primary themes below.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat.value
                  ? 'bg-[#d4af37] text-[#0d0c0b] border-[#d4af37] font-semibold'
                  : 'bg-[#1c1814]/50 text-[#f5f2eb]/80 border-[#2c251e] hover:border-[#d4af37]/50 hover:text-[#f5f2eb]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredCakes.map((cake) => (
              <motion.div
                key={cake.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative bg-[#12110f] border border-[#2c251e]/60 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1814]">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Shimmer Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Quick category badge */}
                  <span className="absolute top-4 left-4 bg-[#0d0c0b]/90 border border-[#d4af37]/30 text-[#d4af37] text-[10px] uppercase tracking-widest font-sans px-3 py-1 rounded-full">
                    {cake.category}
                  </span>

                  {/* Price Estimate Badge */}
                  <span className="absolute bottom-4 right-4 bg-[#d4af37] text-[#0d0c0b] text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded">
                    Est. {cake.priceEst}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-[#f5f2eb] group-hover:text-[#d4af37] transition-colors">
                      {cake.name}
                    </h3>
                    <p className="text-[#f5f2eb]/70 text-xs sm:text-sm mt-3 font-light line-clamp-2">
                      {cake.description}
                    </p>
                    
                    {/* Tiny Specs row */}
                    <div className="flex items-center space-x-6 mt-4 text-[11px] font-mono tracking-wider text-[#f5f2eb]/40">
                      <span>Servings: <strong className="text-[#f5f2eb]/70">{cake.servings}</strong></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" />
                      <span>Tier Type: <strong className="text-[#f5f2eb]/70 uppercase">{cake.category}</strong></span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#2c251e]/40 mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedCake(cake)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-[#1c1814] hover:bg-[#2c251e] text-[#f5f2eb] border border-[#2c251e] hover:border-[#d4af37]/30 py-3 rounded-xl text-xs font-sans uppercase tracking-widest transition-all"
                    >
                      <Info className="h-4 w-4 text-[#d4af37]" />
                      <span>View Details</span>
                    </button>
                    
                    <button
                      onClick={() => handleCustomizeClick(cake)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0c0b] border border-[#d4af37]/30 hover:border-[#d4af37] py-3 rounded-xl text-xs font-sans uppercase tracking-widest transition-all font-semibold"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Customize Style</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Info Modal */}
        <AnimatePresence>
          {selectedCake && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0d0c0b]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCake(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-[#12110f] border border-[#2c251e] rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCake(null)}
                  className="absolute top-4 right-4 bg-[#0d0c0b]/80 border border-[#2c251e] text-[#f5f2eb] hover:text-[#d4af37] p-2 rounded-full transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Side: Image */}
                  <div className="relative h-64 md:h-full min-h-[300px] bg-[#1c1814]">
                    <img
                      src={selectedCake.image}
                      alt={selectedCake.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#12110f]" />
                  </div>

                  {/* Right Side: Details */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Bespoke Collection</span>
                      </div>
                      
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] leading-tight">
                        {selectedCake.name}
                      </h3>
                      
                      <div className="flex items-center gap-4 mt-3 font-mono text-xs text-[#f5f2eb]/50 border-b border-[#2c251e] pb-4">
                        <span>Servings: <strong className="text-[#d4af37]">{selectedCake.servings}</strong></span>
                        <span>|</span>
                        <span>Est: <strong className="text-[#d4af37]">{selectedCake.priceEst}</strong></span>
                      </div>

                      <p className="text-[#f5f2eb]/75 text-sm mt-4 font-light leading-relaxed">
                        {selectedCake.description}
                      </p>

                      {/* Custom Features List */}
                      <div className="mt-6 space-y-2">
                        <h4 className="text-[10px] uppercase tracking-wider text-[#d4af37] font-mono">Premium Accents</h4>
                        <div className="space-y-1.5">
                          {selectedCake.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs text-[#f5f2eb]/85">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af37] flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Flavors recommended */}
                      <div className="mt-6">
                        <h4 className="text-[10px] uppercase tracking-wider text-[#f5f2eb]/40 font-mono mb-2">Recommended Flavors</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCake.flavors.map((flv, idx) => (
                            <span key={idx} className="bg-[#1c1814] text-xs text-[#f5f2eb]/80 px-2.5 py-1 rounded-md border border-[#2c251e]">
                              {flv}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-8 pt-6 border-t border-[#2c251e] flex gap-3">
                      <button
                        onClick={() => handleCustomizeClick(selectedCake)}
                        className="w-full flex items-center justify-center space-x-2 bg-[#d4af37] hover:bg-[#c5a030] text-[#0d0c0b] py-3.5 rounded-xl text-xs font-sans uppercase tracking-widest font-bold transition-all shadow-lg shadow-[#d4af37]/10"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Customize this design</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
