import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CalendarCheck, MapPin, Clock, ExternalLink, AlertTriangle, ShieldCheck, QrCode } from 'lucide-react';
import { SMARTPHONES } from '../data';
import { Reservation } from '../types';
import ReservationReceiptModal from './ReservationReceiptModal';

interface ReservationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancel: (id: string) => void;
  onShowRoute: (phoneId: string) => void;
}

export default function ReservationsDrawer({
  isOpen,
  onClose,
  reservations,
  onCancel,
  onShowRoute,
}: ReservationsDrawerProps) {
  const [selectedReceiptRes, setSelectedReceiptRes] = useState<Reservation | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);

  const selectedPhone = selectedReceiptRes
    ? SMARTPHONES.find((p) => p.id === selectedReceiptRes.phoneId) || null
    : null;
  
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
            className="fixed top-0 right-0 bottom-0 h-screen w-[440px] max-w-[95vw] bg-white/95 backdrop-blur-md border-l border-slate-200/80 shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-indigo-50/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-slate-800 text-base leading-tight">
                    Active Showroom Reservations
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {reservations.length} {reservations.length === 1 ? 'handset' : 'handsets'} locked for pickup
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all border border-slate-200/60 flex items-center justify-center cursor-pointer focus:outline-none"
                aria-label="Close Reservations Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {reservations.length > 0 ? (
                reservations.map((res) => {
                  const phone = SMARTPHONES.find((p) => p.id === res.phoneId);
                  if (!phone) return null;

                  return (
                    <motion.div
                      key={res.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="p-5 bg-slate-50/70 border border-slate-100 hover:border-slate-200 rounded-2xl space-y-4 relative group transition-all duration-300"
                    >
                      {/* Top bar with Code and Delete */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-100/60 text-indigo-700 px-2.5 py-1 rounded-lg">
                          Code: {res.id.toUpperCase()}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => onCancel(res.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                          title="Cancel Reservation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Phone Info Row */}
                      <div className="flex gap-3.5">
                        {/* Compact Image */}
                        <div className="w-16 h-16 bg-white rounded-xl border border-slate-200/60 overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={phone.imageUrl}
                            alt={phone.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-display font-bold text-slate-800 text-xs sm:text-sm truncate">
                            {phone.name}
                          </h4>
                          <p className="text-[10px] text-indigo-600 font-extrabold mt-0.5">
                            ₹{phone.price.toLocaleString('en-IN')}
                          </p>
                          <p className="text-[9px] text-slate-400 mt-1 font-medium">
                            Reserved by {res.customerName}
                          </p>
                        </div>
                      </div>

                      {/* Pickup details box */}
                      <div className="p-3 bg-white/80 border border-slate-100 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span className="text-[10px] font-medium truncate">{res.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span className="text-[10px] font-medium truncate">Chennai Showroom (Guindy)</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            onShowRoute(phone.id);
                            onClose();
                          }}
                          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl text-[10px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Showroom Route</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReceiptRes(res);
                            setIsReceiptOpen(true);
                          }}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-xl text-[10px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-100"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Receipt & QR Pass</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 mb-4">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-700 text-sm">No reservations yet</h4>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-[240px] leading-relaxed">
                    Choose a smartphone, click reserve, and schedule your showroom visit to lock your deal!
                  </p>
                </div>
              )}
            </div>

            {/* Sticky Showroom Disclaimer Footer */}
            {reservations.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-3.5">
                <div className="flex gap-2.5 items-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    Showroom reservations guarantee stock hold for <strong>24 hours</strong>. No payment required online. Pay securely after in-hand inspection.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Reservation Receipt & Scan QR Modal */}
      <ReservationReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => {
          setIsReceiptOpen(false);
          setSelectedReceiptRes(null);
        }}
        reservation={selectedReceiptRes}
        phone={selectedPhone}
      />
    </AnimatePresence>
  );
}
