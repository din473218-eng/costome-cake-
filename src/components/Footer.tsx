import { Cake, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#080706] border-t border-[#2c251e] pt-20 pb-10 relative">
      <div className="absolute inset-x-0 bottom-0 h-48 bg-radial-[circle_at_bottom] from-[#1c1814]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2c251e]/60">
          
          {/* Brand block (5 columns) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <Cake className="h-8 w-8 text-[#d4af37]" />
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-wider font-semibold text-[#f5f2eb]">
                  L'ÉTOILE
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-sans -mt-1">
                  Cake Atelier
                </span>
              </div>
            </div>
            
            <p className="text-[#f5f2eb]/60 text-sm font-light max-w-sm leading-relaxed">
              We design and craft extraordinary custom cakes that elevate life's most precious occasions. Driven by passion, artistry, and impeccable culinary standards.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello!%20I%20am%20interested%20in%20ordering%20a%20custom%20cake.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1c1814] hover:bg-[#d4af37] border border-[#2c251e] hover:border-[#d4af37] text-[#d4af37] hover:text-[#0d0c0b] flex items-center justify-center transition-all shadow-md hover:scale-105"
                title="WhatsApp Consultation"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 columns) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold">
              The Atelier
            </h4>
            <div className="flex flex-col space-y-3 font-sans text-sm text-[#f5f2eb]/75 font-light">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-[#d4af37] transition-colors"
              >
                Back to Top
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-left hover:text-[#d4af37] transition-colors"
              >
                Custom Cake Portfolio
              </button>
              <button
                onClick={() => onNavigate('estimator')}
                className="text-left hover:text-[#d4af37] transition-colors"
              >
                Interactive Estimator
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#d4af37] transition-colors"
              >
                Atelier Location
              </button>
            </div>
          </div>

          {/* Contact Details (4 columns) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold">
              Inquiries & Visits
            </h4>
            
            <div className="space-y-4 font-sans text-sm text-[#f5f2eb]/75 font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <span className="leading-relaxed">{CONTACT_INFO.address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#d4af37] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-[#2c251e]/40">
                <Clock className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <span className="text-xs text-[#f5f2eb]/60 leading-relaxed">
                  {CONTACT_INFO.hours}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f5f2eb]/40 font-mono tracking-wider">
          <p>© 2026 L'Étoile Cake Atelier. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed to be Tasted.</p>
        </div>
      </div>
    </footer>
  );
}
