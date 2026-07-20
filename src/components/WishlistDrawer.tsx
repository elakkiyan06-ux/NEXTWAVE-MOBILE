import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Calendar, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { SMARTPHONES } from '../data';
import { Smartphone } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemove: (id: string) => void;
  onReserve: (phone: Smartphone) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  onRemove,
  onReserve,
}: WishlistDrawerProps) {
  // Find full smartphone objects matching the IDs in wishlist
  const savedPhones = SMARTPHONES.filter((phone) => wishlistIds.includes(phone.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 h-screen w-[420px] max-w-[95vw] bg-white/95 backdrop-blur-md border-l border-slate-200/80 shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-display font-black text-slate-800 text-base leading-tight">
                    Saved Showroom Wishlist
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {savedPhones.length} {savedPhones.length === 1 ? 'handset' : 'handsets'} locked to cache
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all border border-slate-200/60 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Close Wishlist Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedPhones.length > 0 ? (
                savedPhones.map((phone) => (
                  <motion.div
                    key={phone.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="p-4 bg-slate-50/70 border border-slate-100 hover:border-slate-200 rounded-2xl flex gap-3.5 relative group transition-all duration-300"
                  >
                    {/* Compact Image */}
                    <div className="w-20 h-20 bg-white rounded-xl border border-slate-200/60 overflow-hidden shrink-0 relative flex items-center justify-center">
                      <img
                        src={phone.imageUrl}
                        alt={phone.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      {phone.stockStatus === 'Limited Stock' && (
                        <span className="absolute bottom-1 right-1 bg-amber-500 text-white text-[7px] font-black px-1 py-0.5 rounded uppercase leading-none tracking-widest animate-pulse">
                          Low Stock
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                            {phone.brand}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemove(phone.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove from saved wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="font-display font-black text-slate-800 text-sm leading-tight -mt-0.5 truncate">
                          {phone.name}
                        </h4>
                        <p className="font-mono text-xs font-bold text-slate-900 mt-1">
                          ₹{phone.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Small Info Banner */}
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500">
                        <span className="flex items-center gap-0.5 font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                          ★ {phone.rating}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="truncate">{phone.color}</span>
                      </div>

                      {/* Action Row */}
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onReserve(phone);
                            onClose();
                          }}
                          disabled={phone.stockStatus === 'Out of Stock'}
                          className="flex-1 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-2 px-3 rounded-xl text-[11px] tracking-wide transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3 h-3" /> Reserve Hold
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-slate-700 text-sm">
                    Your Wishlist is Empty
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                    Click the premium heart icons on smartphone cards in the showroom catalog or home to save models you like.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {savedPhones.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-3.5">
                <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Your saved items are securely synced with local device storage. Reservable for 24 hours at the Chennai outlet.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-blue-500/10"
                >
                  Continue Showroom Tour <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
