import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Camera, Battery, Cpu, Monitor, Zap, HardDrive, Shield, 
  Star, Heart, GitCompare, CalendarCheck, CheckCircle2, Award
} from 'lucide-react';
import { Smartphone } from '../types';

interface PhoneDetailModalProps {
  phone: Smartphone | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (phone: Smartphone) => void;
  onToggleWishlist: (phoneId: string) => void;
  onToggleCompare: (phoneId: string) => void;
  isSaved: boolean;
  isCompared: boolean;
}

export default function PhoneDetailModal({
  phone,
  isOpen,
  onClose,
  onReserve,
  onToggleWishlist,
  onToggleCompare,
  isSaved,
  isCompared
}: PhoneDetailModalProps) {
  if (!phone) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[250] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[251] flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white border border-slate-200 rounded-[32px] w-full max-w-4xl shadow-2xl relative overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Image Side */}
              <div className="relative w-full md:w-5/12 bg-slate-50 flex flex-col justify-between p-6 border-r border-slate-100 min-h-[240px] md:min-h-0">
                {/* Close Button on Mobile (absolute over image) */}
                <button
                  type="button"
                  onClick={onClose}
                  className="md:hidden absolute right-4 top-4 p-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all shadow-md z-30 cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Offer Badge inside product view */}
                {phone.offerBadge && (
                  <span className="absolute top-4 left-4 bg-brand-orange text-slate-950 text-[10px] font-black px-3 py-1 rounded-full shadow-sm z-10">
                    🔥 {phone.offerBadge}
                  </span>
                )}

                {/* Phone Image Container */}
                <div className="flex-1 flex items-center justify-center py-4">
                  <img
                    src={phone.imageUrl}
                    alt={phone.name}
                    referrerPolicy="no-referrer"
                    className="max-h-48 md:max-h-72 object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info Card Badge on Image Side */}
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm border border-slate-200/60 p-3 rounded-2xl">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Color Finish</span>
                      <span className="text-xs font-bold text-slate-700">{phone.color}</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-black uppercase">
                      Official Retail
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Side */}
              <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Header (desktop only has close button here) */}
                <div className="p-6 md:p-8 pb-4 border-b border-slate-100 relative">
                  <button
                    type="button"
                    onClick={onClose}
                    className="hidden md:flex absolute right-6 top-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all border border-slate-200/60 items-center justify-center cursor-pointer"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">{phone.brand}</span>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mt-1">{phone.name}</h2>
                  
                  {/* Rating, stock, and code info */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-black px-2.5 py-0.5 rounded-lg">
                      <Star className="w-3 h-3 fill-current" /> {phone.rating}
                      <span className="text-[10px] text-slate-400 font-medium">({phone.reviewCount} Reviews)</span>
                    </div>

                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
                      phone.stockStatus === 'In Stock'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : phone.stockStatus === 'Limited Stock'
                        ? 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {phone.stockStatus === 'In Stock' ? '🟢 In Stock' : phone.stockStatus === 'Limited Stock' ? `🟡 Low Stock (${phone.stockQuantity} Left)` : '🔴 Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Scrollable specs and pricing container */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                  {/* Pricing Overview */}
                  <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4.5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Exclusive Chennai Store Price</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-display font-black text-slate-900">₹{phone.price.toLocaleString()}</span>
                        {phone.originalPrice && phone.originalPrice > phone.price && (
                          <span className="text-xs text-slate-400 line-through">₹{phone.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    {phone.originalPrice && phone.originalPrice > phone.price && (
                      <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase px-2.5 py-1 rounded-xl">
                        Save ₹{(phone.originalPrice - phone.price).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Detailed Smartphone Specifications
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Camera className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Camera System</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.camera}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Battery className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Battery & Lifecycle</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.battery}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Cpu className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Processor & Core Architecture</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.processor}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Monitor className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Display & Visual Panel</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.display}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Fast Power Charging</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.charging}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <HardDrive className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Memory & Storage Tiers</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.storage}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm sm:col-span-2">
                        <Shield className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Official Warranty Coverage</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{phone.specs.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Included Store Benefits */}
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/60 space-y-2">
                    <span className="text-[9px] font-black uppercase text-indigo-800 tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-indigo-500" /> Exclusive NextWave Care Benefits Included:
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1.5 font-medium">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Instant 1-Hour Device Setup & WhatsApp Chat Restore</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Free High-Impact Tempered Glass guard expertly applied</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Priority 24-Hour Hold period on online bookings</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Footer Controls / CTAs */}
                <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onReserve(phone);
                      onClose();
                    }}
                    disabled={phone.stockStatus === 'Out of Stock'}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100/50 disabled:text-slate-400 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-md text-center"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Reserve For Pickup</span>
                  </button>

                  {/* Compare Action */}
                  <button
                    type="button"
                    onClick={() => {
                      onToggleCompare(phone.id);
                    }}
                    className={`p-3.5 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isCompared
                        ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue scale-105'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                    title={isCompared ? "Remove from Compare" : "Add to Comparison List"}
                  >
                    <GitCompare className="w-4.5 h-4.5" />
                  </button>

                  {/* Wishlist Action */}
                  <button
                    type="button"
                    onClick={() => {
                      onToggleWishlist(phone.id);
                    }}
                    className={`p-3.5 border rounded-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                      isSaved
                        ? 'bg-rose-50 border-rose-200 text-rose-500 fill-rose-500 shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-rose-500 border-slate-200'
                    }`}
                    title={isSaved ? "Remove from Saved" : "Save Handset to Wishlist"}
                  >
                    <Heart className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
