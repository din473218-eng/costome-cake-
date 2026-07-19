import { useState, useEffect } from 'react';
import { Cake, Menu, X, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0c0b]/90 backdrop-blur-md border-b border-[#2c251e] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleLinkClick('home')}
          >
            <Cake className="h-8 w-8 text-[#d4af37]" />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-wider font-semibold text-[#f5f2eb]">
                L'ÉTOILE
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-sans -mt-1">
                Cake Atelier
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-[#f5f2eb]/80 hover:text-[#d4af37] text-sm tracking-widest font-sans uppercase transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('gallery')}
              className="text-[#f5f2eb]/80 hover:text-[#d4af37] text-sm tracking-widest font-sans uppercase transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => handleLinkClick('estimator')}
              className="text-[#f5f2eb]/80 hover:text-[#d4af37] text-sm tracking-widest font-sans uppercase transition-colors"
            >
              Design Studio
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-[#f5f2eb]/80 hover:text-[#d4af37] text-sm tracking-widest font-sans uppercase transition-colors"
            >
              Contact
            </button>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello!%20I%20am%20interested%20in%20ordering%20a%20custom%20cake.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#1c1814] hover:bg-[#2c251e] text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37] px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#f5f2eb] hover:text-[#d4af37] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[72px] bg-[#0d0c0b] z-40 transition-transform duration-300 border-t border-[#2c251e] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-6 p-8 h-full bg-gradient-to-b from-[#0d0c0b] to-[#1c1814]">
          <button
            onClick={() => handleLinkClick('home')}
            className="text-[#f5f2eb] text-lg tracking-widest font-serif text-left border-b border-[#2c251e] pb-3"
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('gallery')}
            className="text-[#f5f2eb] text-lg tracking-widest font-serif text-left border-b border-[#2c251e] pb-3"
          >
            Gallery
          </button>
          <button
            onClick={() => handleLinkClick('estimator')}
            className="text-[#f5f2eb] text-lg tracking-widest font-serif text-left border-b border-[#2c251e] pb-3"
          >
            Design Studio
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className="text-[#f5f2eb] text-lg tracking-widest font-serif text-left border-b border-[#2c251e] pb-3"
          >
            Contact
          </button>

          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello!%20I%20am%20interested%20in%20ordering%20a%20custom%20cake.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#d4af37] hover:bg-[#c5a030] text-[#0d0c0b] py-4 rounded-full font-sans uppercase tracking-widest text-sm font-semibold transition-all mt-4 shadow-lg shadow-[#d4af37]/10"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span>WhatsApp Consultation</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
