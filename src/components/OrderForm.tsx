import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { CakeItem, OrderDetails } from '../types';
import { FLAVORS, FILLINGS, SIZES, CONTACT_INFO } from '../data';
import { Send, Sparkles, AlertCircle, MessageCircle, Info, Calendar, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderFormProps {
  prefilledCake: CakeItem | null;
  onClearPrefill: () => void;
}

export default function OrderForm({ prefilledCake, onClearPrefill }: OrderFormProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cakeType: 'Custom Cake Design',
    size: SIZES[2].name, // 2-Tiers Standard
    flavor: FLAVORS[0].name, // Double Belgian Chocolate
    filling: FILLINGS[0].name,
    designTheme: '',
    dateNeeded: '',
    specialNotes: '',
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  const [estPrice, setEstPrice] = useState<number>(280);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [waLink, setWaLink] = useState<string>('');
  
  const formRef = useRef<HTMLDivElement>(null);

  // When a user selects "Customize Style" in the gallery, we populate the form and scroll to it
  useEffect(() => {
    if (prefilledCake) {
      // Find matching size based on category
      let suggestedSize = SIZES[2].name; // Default 2 tier
      if (prefilledCake.category === 'wedding') {
        suggestedSize = SIZES[3].name; // 3-Tier Luxe
      } else if (prefilledCake.category === 'chocolate') {
        suggestedSize = SIZES[1].name; // 1-Tier Large
      }

      setOrderDetails((prev) => ({
        ...prev,
        cakeType: prefilledCake.name,
        designTheme: `Inspired by "${prefilledCake.name}" - ${prefilledCake.features.join(', ')}`,
        size: suggestedSize,
        flavor: prefilledCake.flavors[0] || FLAVORS[0].name
      }));

      // Scroll to the form smoothly
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      // Clean up the prefill trigger so it can be re-triggered
      onClearPrefill();
    }
  }, [prefilledCake]);

  // Recalculate price estimate when size changes
  useEffect(() => {
    const selectedSizeObj = SIZES.find(s => s.name === orderDetails.size);
    if (selectedSizeObj) {
      setEstPrice(selectedSizeObj.basePrice);
    }
  }, [orderDetails.size]);

  // Handle form field change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeSelect = (sizeName: string) => {
    setOrderDetails(prev => ({ ...prev, size: sizeName }));
  };

  const generateWhatsAppLink = (details: OrderDetails, price: number) => {
    const text = `Hello L'Étoile Cake Atelier! 🌟

I am writing to inquire about a bespoke custom cake consultation. Here are my design selections:

🎂 *Cake Reference:* ${details.cakeType}
📏 *Tier Size:* ${details.size}
🍰 *Cake Sponge Flavor:* ${details.flavor}
🧁 *Premium Cream/Filling:* ${details.filling}
🎨 *Visual Theme & Design Notes:* ${details.designTheme || 'Custom elegant design'}

📅 *Date Needed:* ${details.dateNeeded || 'To be discussed'}
💰 *Estimated Starting Price:* $${price} USD

👤 *Contact Name:* ${details.customerName}
📞 *Phone Number:* ${details.customerPhone}
✉️ *Email:* ${details.customerEmail}
✍️ *Special Requests / Notes:* ${details.specialNotes || 'None'}

Thank you! I look forward to creating something beautiful together.`;

    return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Generate the live WhatsApp link with updated details
    const link = generateWhatsAppLink(orderDetails, estPrice);
    setWaLink(link);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setOrderDetails({
      cakeType: 'Custom Cake Design',
      size: SIZES[2].name,
      flavor: FLAVORS[0].name,
      filling: FILLINGS[0].name,
      designTheme: '',
      dateNeeded: '',
      specialNotes: '',
      customerName: '',
      customerPhone: '',
      customerEmail: ''
    });
  };

  return (
    <section id="estimator" ref={formRef} className="py-24 bg-[#12110f] border-t border-[#2c251e]/40 relative">
      <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-[#1c1814]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#d4af37] font-semibold">Bespoke Design Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2eb] mt-3 font-light">
            Cake Builder & <span className="italic font-normal text-[#d4af37]">Quote Inquiry</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6" />
          <p className="text-[#f5f2eb]/70 text-sm sm:text-base mt-4 font-light">
            Tailor your cake layer by layer. Submit the inquiry to generate a customized WhatsApp order summary to chat directly with our chef.
          </p>
        </div>

        {isSubmitted ? (
          /* Submission Success State with WhatsApp Action */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-[#0d0c0b] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Visual glow background */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d4af37]/5 blur-3xl rounded-full" />
            
            <div className="w-16 h-16 bg-[#d4af37]/10 border border-[#d4af37]/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-[#d4af37]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb]">Bespoke Order Compiled!</h3>
            <p className="text-[#f5f2eb]/75 text-sm sm:text-base mt-3 max-w-md mx-auto font-light leading-relaxed">
              We have compiled your selection summary with an estimated price. To complete your inquiry and discuss details directly with our head chef, please click the button below to launch WhatsApp.
            </p>

            {/* Summary details */}
            <div className="bg-[#12110f] border border-[#2c251e] rounded-2xl p-6 my-8 text-left space-y-3.5 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-[#2c251e]/60 pb-3">
                <span className="text-[#f5f2eb]/50 text-xs uppercase tracking-wider font-mono">Customer Name</span>
                <span className="text-[#f5f2eb] text-sm font-semibold">{orderDetails.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#2c251e]/60 pb-3">
                <span className="text-[#f5f2eb]/50 text-xs uppercase tracking-wider font-mono">Bespoke Size</span>
                <span className="text-[#f5f2eb] text-sm">{orderDetails.size}</span>
              </div>
              <div className="flex justify-between border-b border-[#2c251e]/60 pb-3">
                <span className="text-[#f5f2eb]/50 text-xs uppercase tracking-wider font-mono">Flavor Profile</span>
                <span className="text-[#d4af37] text-sm">{orderDetails.flavor}</span>
              </div>
              <div className="flex justify-between border-b border-[#2c251e]/60 pb-3">
                <span className="text-[#f5f2eb]/50 text-xs uppercase tracking-wider font-mono">Filing Layer</span>
                <span className="text-[#f5f2eb] text-sm">{orderDetails.filling}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#d4af37] text-xs uppercase tracking-wider font-mono font-bold">Est. Starting Price</span>
                <span className="text-[#d4af37] text-base font-mono font-bold">${estPrice} USD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#d4af37] hover:bg-[#c5a030] text-[#0d0c0b] px-8 py-4 rounded-full text-xs font-sans uppercase tracking-widest font-bold transition-all shadow-lg shadow-[#d4af37]/20 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>Open in WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto text-[#f5f2eb]/60 hover:text-[#f5f2eb] text-xs font-sans uppercase tracking-widest py-3 transition-colors hover:underline"
              >
                Design Another Cake
              </button>
            </div>
          </motion.div>
        ) : (
          /* Interactive Builder Form */
          <div className="max-w-6xl mx-auto bg-[#0d0c0b] border border-[#2c251e] rounded-3xl overflow-hidden shadow-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Visual Selectors & Size Builder (7 Columns) */}
              <div className="lg:col-span-7 p-6 sm:p-10 border-r border-[#2c251e]/60 space-y-10">
                
                {/* 1. Size Selection with Visual Representation */}
                <div>
                  <div className="flex items-center space-x-2 text-[#d4af37] font-serif mb-4">
                    <Layers className="h-5 w-5" />
                    <h3 className="text-lg tracking-wide font-medium">1. Choose Your Tier Configuration</h3>
                  </div>
                  <p className="text-[#f5f2eb]/50 text-xs font-light mb-6">
                    Base pricing depends on size and tiers. Servings are generous event portions.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SIZES.map((sz) => {
                      const isSelected = orderDetails.size === sz.name;
                      return (
                        <div
                          key={sz.id}
                          onClick={() => handleSizeSelect(sz.name)}
                          className={`cursor-pointer p-4 rounded-2xl border transition-all relative flex flex-col justify-between h-28 ${
                            isSelected
                              ? 'bg-[#1c1814] border-[#d4af37] shadow-lg shadow-[#d4af37]/5'
                              : 'bg-[#12110f]/50 border-[#2c251e] hover:border-[#d4af37]/30'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-xs font-sans tracking-widest uppercase font-semibold ${isSelected ? 'text-[#d4af37]' : 'text-[#f5f2eb]'}`}>
                              {sz.name}
                            </span>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                            )}
                          </div>
                          <div className="mt-2 flex justify-between items-end border-t border-[#2c251e]/30 pt-2">
                            <div>
                              <p className="text-[10px] uppercase text-[#f5f2eb]/40 font-mono">Servings</p>
                              <p className="text-xs text-[#f5f2eb]/80 font-mono font-semibold">{sz.servings}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] uppercase text-[#f5f2eb]/40 font-mono">Starting Est.</p>
                              <p className="text-xs text-[#d4af37] font-mono font-semibold">${sz.basePrice}+</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Flavor Profiler */}
                <div>
                  <div className="flex items-center space-x-2 text-[#d4af37] font-serif mb-4">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="text-lg tracking-wide font-medium">2. Select Cake Sponge Flavor</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {FLAVORS.map((flv) => {
                      const isSelected = orderDetails.flavor === flv.name;
                      return (
                        <div
                          key={flv.id}
                          onClick={() => setOrderDetails(prev => ({ ...prev, flavor: flv.name }))}
                          className={`cursor-pointer p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#1c1814] border-[#d4af37]'
                              : 'bg-[#12110f]/30 border-[#2c251e] hover:border-[#d4af37]/20'
                          }`}
                        >
                          <p className={`text-xs font-semibold tracking-wide ${isSelected ? 'text-[#d4af37]' : 'text-[#f5f2eb]'}`}>
                            {flv.name}
                          </p>
                          <p className="text-[10px] text-[#f5f2eb]/55 font-light mt-1.5 leading-relaxed">
                            {flv.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Filling Profiler */}
                <div>
                  <div className="flex items-center space-x-2 text-[#d4af37] font-serif mb-4">
                    <Info className="h-5 w-5" />
                    <h3 className="text-lg tracking-wide font-medium">3. Choose Premium Filing / Cream</h3>
                  </div>
                  
                  <div className="relative">
                    <select
                      name="filling"
                      value={orderDetails.filling}
                      onChange={handleChange}
                      className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] px-4 py-3.5 rounded-xl outline-none transition-all appearance-none cursor-pointer"
                    >
                      {FILLINGS.map((fill) => (
                        <option key={fill.id} value={fill.name}>
                          {fill.name}
                        </option>
                      ))}
                    </select>
                    {/* Select arrow pointer */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                      ▼
                    </div>
                  </div>
                </div>

                {/* 4. Visual Themes / Design notes */}
                <div>
                  <div className="flex items-center space-x-2 text-[#d4af37] font-serif mb-4">
                    <Calendar className="h-5 w-5" />
                    <h3 className="text-lg tracking-wide font-medium">4. Share Your Design & Vision</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#f5f2eb]/40 font-mono mb-2">
                        Design Theme / Inspiration Notes
                      </label>
                      <textarea
                        name="designTheme"
                        value={orderDetails.designTheme}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe your vision (e.g. Elegant emerald green and gold textures, minimalist dry flowers, watercolor illustrations...)"
                        className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] p-4 rounded-xl outline-none transition-all placeholder:text-[#f5f2eb]/30 resize-none font-sans"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Details & Estimate Recap (5 Columns) */}
              <div className="lg:col-span-5 p-6 sm:p-10 bg-[#0e0d0c] flex flex-col justify-between">
                <div className="space-y-8">
                  
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block">Recap & Quote</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f5f2eb] mt-1">Order Estimation</h3>
                    <div className="w-8 h-[1px] bg-[#d4af37] mt-3" />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#12110f] border border-[#2c251e] rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#f5f2eb]/50">Tier Size:</span>
                      <span className="text-[#f5f2eb] font-semibold">{orderDetails.size}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#f5f2eb]/50">Sponge Flavor:</span>
                      <span className="text-[#d4af37] text-right font-semibold max-w-[180px] truncate">{orderDetails.flavor}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#f5f2eb]/50">Filling:</span>
                      <span className="text-[#f5f2eb] text-right truncate max-w-[180px]">{orderDetails.filling}</span>
                    </div>

                    <div className="pt-4 border-t border-[#2c251e] flex justify-between items-baseline">
                      <span className="text-xs uppercase text-[#d4af37] font-mono font-bold">Estimated Base Price:</span>
                      <span className="text-2xl text-[#d4af37] font-mono font-bold">${estPrice}*</span>
                    </div>
                    
                    <div className="flex items-start space-x-2 text-[10px] text-[#f5f2eb]/40 leading-relaxed bg-[#0d0c0b]/50 p-2.5 rounded-lg border border-[#2c251e]/50">
                      <AlertCircle className="h-3.5 w-3.5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <span>*Price is an estimate for simple finishes. Elaborate sugar flowers, gold leaf, or bespoke figurines may carry extra custom tooling fees.</span>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-wider text-[#d4af37] font-mono border-b border-[#2c251e] pb-1.5">
                      5. Contact Information
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <input
                          type="text"
                          name="customerName"
                          required
                          value={orderDetails.customerName}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] px-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-[#f5f2eb]/30"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="tel"
                          name="customerPhone"
                          required
                          value={orderDetails.customerPhone}
                          onChange={handleChange}
                          placeholder="Phone Number *"
                          className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] px-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-[#f5f2eb]/30"
                        />
                        <input
                          type="email"
                          name="customerEmail"
                          required
                          value={orderDetails.customerEmail}
                          onChange={handleChange}
                          placeholder="Email Address *"
                          className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] px-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-[#f5f2eb]/30"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#f5f2eb]/40 font-mono mb-2">
                            Date Required *
                          </label>
                          <input
                            type="date"
                            name="dateNeeded"
                            required
                            value={orderDetails.dateNeeded}
                            onChange={handleChange}
                            className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] px-4 py-3.5 rounded-xl outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          name="specialNotes"
                          value={orderDetails.specialNotes}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Allergies, delivery requests, or other special instructions..."
                          className="w-full bg-[#12110f] border border-[#2c251e] focus:border-[#d4af37] text-xs text-[#f5f2eb] p-4 rounded-xl outline-none transition-all placeholder:text-[#f5f2eb]/30 resize-none font-sans"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Submit button */}
                <div className="pt-8 mt-8 border-t border-[#2c251e]/60">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-3 bg-[#d4af37] hover:bg-[#c5a030] text-[#0d0c0b] py-4 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all shadow-lg shadow-[#d4af37]/10 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Compile Inquiry Summary</span>
                  </button>
                </div>

              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
