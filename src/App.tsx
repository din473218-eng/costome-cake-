import { useState } from 'react';
import { CakeItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CakeGallery from './components/CakeGallery';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import { MessageCircle, Cake, Sparkles, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedPrefill, setSelectedPrefill] = useState<CakeItem | null>(null);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // offset for the sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectCustomize = (cake: CakeItem) => {
    setSelectedPrefill(cake);
    handleNavigate('estimator');
  };

  return (
    <div className="relative bg-[#0d0c0b] text-[#f5f2eb] font-sans antialiased selection:bg-[#d4af37]/30 selection:text-white">
      {/* Sticky Premium Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Hero Presentation */}
      <Hero onNavigate={handleNavigate} />

      {/* Decorative Atelier Intro Banner */}
      <section className="bg-[#0c0b0a] py-16 border-y border-[#2c251e]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#1c1814]/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center items-center space-x-1.5 text-[#d4af37] mb-3">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono font-bold">The Golden Standard</span>
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] italic font-light max-w-3xl mx-auto">
            "A custom cake is not merely dessert; it is the sweet crowning glory of a beautiful memory."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-xs font-mono tracking-widest text-[#f5f2eb]/40 uppercase">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-[#d4af37]" />
              <span>Bespoke Handcrafted in Seattle</span>
            </div>
            <span className="hidden sm:inline text-[#d4af37]/40">•</span>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#d4af37]" />
              <span>Bookings 4-6 Weeks in Advance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Portfolio and Category Filters */}
      <CakeGallery onSelectCustomize={handleSelectCustomize} />

      {/* Dynamic Cake Builder and Inquiry Center */}
      <OrderForm
        prefilledCake={selectedPrefill}
        onClearPrefill={() => setSelectedPrefill(null)}
      />

      {/* Location / Contact details anchoring */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Elegant WhatsApp Button with subtle glowing pulse effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello!%20I%20am%20interested%20in%20ordering%20a%20custom%20cake.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-14 h-14 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2 focus:ring-offset-[#0d0c0b]"
          aria-label="Chat with our cake chef on WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#25d366]/40 animate-ping group-hover:animate-none" />
          
          <MessageCircle className="h-7 w-7 fill-current relative z-10" />
          
          {/* Hover Label tooltip */}
          <span className="absolute right-16 bg-[#0d0c0b] border border-[#2c251e] text-[#d4af37] text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap">
            Chat with Pastry Chef
          </span>
        </a>
      </motion.div>
    </div>
  );
}
