import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, User, Mail, Phone, MapPin, Award, Sparkles, 
  ShieldCheck, Calendar, Trophy, Zap, Heart, CalendarDays 
} from 'lucide-react';
import { Reservation } from '../types';

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  wishlistCount: number;
  onOpenReservations: () => void;
  onOpenWishlist: () => void;
}

export default function CustomerProfileModal({
  isOpen,
  onClose,
  reservations,
  wishlistCount,
  onOpenReservations,
  onOpenWishlist
}: CustomerProfileModalProps) {
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[200] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-[32px] w-full max-w-lg shadow-2xl p-6 md:p-8 relative overflow-hidden pointer-events-auto"
            >
              {/* Background gradient flares */}
              <div className="absolute right-[-10%] top-[-10%] w-56 h-56 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute left-[-10%] bottom-[-10%] w-56 h-56 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-6 top-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all border border-slate-200/60 flex items-center justify-center cursor-pointer focus:outline-none"
                aria-label="Close Profile Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Profile Header */}
              <div className="flex items-center gap-4.5 pb-6 border-b border-slate-100">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-black text-2xl shadow-xl shadow-blue-500/20 shrink-0">
                    N
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 border-2 border-white rounded-lg px-1.5 py-0.5 text-[8px] font-black text-white uppercase flex items-center gap-0.5 shadow-sm">
                    <Trophy className="w-2.5 h-2.5" /> Gold
                  </div>
                </div>

                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-slate-800 text-lg md:text-xl">
                      Nithin Jee
                    </h3>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">NW-GOLD-2026-0719</p>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" /> Member Since July 2024
                  </p>
                </div>
              </div>

              {/* Personal Details List */}
              <div className="py-5 space-y-4 text-left">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Personal Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
                    <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
                      <p className="text-xs font-bold text-slate-700 truncate">nithinjee07@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
                    <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Phone Number</p>
                      <p className="text-xs font-bold text-slate-700 truncate">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/60 border border-slate-100 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Preferred Showroom</p>
                      <p className="text-xs font-bold text-slate-700 truncate">Chennai (Guindy Tech Hub Showroom)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loyalty Program & Perks */}
              <div className="pb-5 space-y-3.5 text-left">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Gold Membership Status
                </h4>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl text-center">
                    <Trophy className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                    <span className="text-[9px] text-slate-400 font-bold block">Tier</span>
                    <span className="text-xs font-black text-indigo-700">Gold</span>
                  </div>

                  <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-2xl text-center">
                    <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <span className="text-[9px] text-slate-400 font-bold block">Coins</span>
                    <span className="text-xs font-black text-amber-700">1,250 Co.</span>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl text-center">
                    <Zap className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                    <span className="text-[9px] text-slate-400 font-bold block">Perks Active</span>
                    <span className="text-xs font-black text-emerald-700">4 Elite</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/60 space-y-2">
                  <span className="text-[9px] font-black uppercase text-amber-800 tracking-wider">
                    👑 Exclusive Tier Benefits:
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-1.5 font-medium">
                    <li className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Priority 24-Hour Stock Hold on Reservations</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Complimentary Premium Coffee & Drinks at showroom</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Express Billing Lanes & Dedicated Assistant</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Active Stats Buttons */}
              <div className="pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onOpenReservations();
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-left transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Reservations</span>
                    <span className="text-xs font-black text-slate-800 mt-0.5 block truncate">
                      {reservations.length} Active Pickup
                    </span>
                  </div>
                  <CalendarDays className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenWishlist();
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-left transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Wishlist</span>
                    <span className="text-xs font-black text-slate-800 mt-0.5 block truncate">
                      {wishlistCount} saved devices
                    </span>
                  </div>
                  <Heart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform fill-current" />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
