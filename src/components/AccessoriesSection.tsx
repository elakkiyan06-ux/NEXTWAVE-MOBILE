import React, { useState } from 'react';
import { ACCESSORIES } from '../data';
import { Smartphone } from '../types';
import { ShoppingBag, MessageSquare, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccessoriesSectionProps {
  onReserveClick: (product: Smartphone) => void;
}

export default function AccessoriesSection({ onReserveClick }: AccessoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Charger', 'Audio', 'Case'];

  const filteredAccessories = selectedCategory === 'All'
    ? ACCESSORIES
    : ACCESSORIES.filter(acc => acc.category === selectedCategory);

  // Map Accessory to Smartphone structure so it can seamlessly use the standard Reservation Modal
  const mapToSmartphone = (acc: typeof ACCESSORIES[0]): Smartphone => {
    return {
      id: acc.id,
      name: acc.name,
      brand: acc.category,
      price: acc.price,
      originalPrice: acc.price,
      rating: 4.8,
      reviewCount: 42,
      stockStatus: acc.stock as 'In Stock' | 'Limited Stock' | 'Out of Stock',
      stockQuantity: acc.stock === 'In Stock' ? 15 : 3,
      offerBadge: '100% Genuine Accessory',
      imageUrl: acc.imageUrl,
      color: 'Default',
      specs: {
        camera: 'N/A',
        battery: 'N/A',
        processor: 'N/A',
        display: 'N/A',
        charging: acc.category === 'Charger' ? 'High Speed Power Delivery' : 'N/A',
        storage: 'N/A',
        warranty: 'Official Manufacturer Warranty',
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="accessories-section">
      {/* Premium Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-blue-100">
          <Sparkles className="w-3 h-3 text-brand-blue" /> Smart Mobiles Extras
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mt-3">
          100% Genuine Smart Accessories
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          Power adapters, high-fidelity audio, and robust cases synced directly with our live physical inventory.
        </p>
      </div>

      {/* Category Pills Selector */}
      <div className="flex justify-center items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/15 scale-105'
                : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {cat === 'All' ? 'View All' : `${cat}s`}
          </button>
        ))}
      </div>

      {/* Accessories Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredAccessories.map((acc) => {
            const isLimited = acc.stock === 'Limited Stock';
            const mappedProduct = mapToSmartphone(acc);
            
            return (
              <motion.div
                layout
                key={acc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative"
                onMouseEnter={() => setHoveredId(acc.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Product Image Section */}
                <div className="relative aspect-square bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/20 to-transparent pointer-events-none" />
                  <img
                    src={acc.imageUrl}
                    alt={acc.name}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-slate-900 text-white shadow-sm">
                    {acc.category}
                  </span>

                  {/* Stock Status Pill */}
                  <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-wider font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${
                    isLimited 
                      ? 'bg-amber-50 text-amber-600 border border-amber-100'
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${isLimited ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    {acc.stock}
                  </span>
                </div>

                {/* Card Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                      {acc.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-semibold text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>100% Brand Certified</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    {/* Price with styling */}
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-xl font-black text-slate-900">₹{acc.price.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 font-medium">incl. GST</span>
                    </div>

                    {/* Action buttons matching design */}
                    <div className="grid grid-cols-5 gap-2">
                      <button
                        onClick={() => onReserveClick(mappedProduct)}
                        className="col-span-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Reserve Free</span>
                      </button>

                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(
                          `Hi Smart Mobiles! I'm interested in buying the *${acc.name}* (Price: ₹${acc.price.toLocaleString()}) which I saw on your website accessory list.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95"
                        title="Inquire via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
