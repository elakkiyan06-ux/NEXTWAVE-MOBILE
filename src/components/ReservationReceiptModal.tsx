import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Printer, Download, CalendarCheck, MapPin, Clock, 
  User, Mail, Phone, ShoppingBag, BadgeCheck, AlertCircle, Share2, Copy
} from 'lucide-react';
import { Smartphone, Reservation } from '../types';
import QRCode from 'qrcode';

interface ReservationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  phone: Smartphone | null;
}

export default function ReservationReceiptModal({
  isOpen,
  onClose,
  reservation,
  phone
}: ReservationReceiptModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  useEffect(() => {
    if (reservation && phone) {
      // Create a clean verification structure that can be scanned at the showroom terminal
      const qrData = JSON.stringify({
        resId: reservation.id,
        phoneId: phone.id,
        phoneName: phone.name,
        customerName: reservation.customerName,
        customerPhone: reservation.customerPhone,
        timeSlot: reservation.timeSlot,
        status: reservation.status,
        showroom: 'Chennai Showroom (Guindy)'
      });

      QRCode.toDataURL(qrData, {
        width: 320,
        margin: 1,
        color: {
          dark: '#0f172a', // Slate 900
          light: '#ffffff'
        }
      })
      .then(url => {
        setQrCodeUrl(url);
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [reservation, phone]);

  if (!isOpen || !reservation || !phone) return null;

  const handlePrint = () => {
    // Add temporary class to body for clean print layout target
    document.body.classList.add('printing-receipt-mode');
    window.print();
    // Remove class on focus return
    const handleAfterPrint = () => {
      document.body.classList.remove('printing-receipt-mode');
      window.removeEventListener('afterprint', handleAfterPrint);
    };
    window.addEventListener('afterprint', handleAfterPrint);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservation.id.toUpperCase());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formattedDate = new Date(reservation.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer print:hidden"
        />

        {/* CSS rules for printing */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body.printing-receipt-mode * {
              visibility: hidden !important;
            }
            body.printing-receipt-mode .print-receipt-container,
            body.printing-receipt-mode .print-receipt-container * {
              visibility: visible !important;
            }
            body.printing-receipt-mode .print-receipt-container {
              position: absolute !important;
              left: 50% !important;
              top: 5% !important;
              transform: translateX(-50%) !important;
              width: 100% !important;
              max-width: 500px !important;
              border: none !important;
              box-shadow: none !important;
              background: white !important;
              padding: 0 !important;
            }
          }
        `}} />

        {/* Modal wrapper */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 print:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="print-receipt-container relative transform overflow-hidden rounded-[28px] bg-white text-left shadow-2xl transition-all w-full max-w-lg border border-slate-100 flex flex-col pointer-events-auto print:border-none print:shadow-none"
            id="printable-receipt-area"
          >
            {/* Top colored aesthetic strip */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 print:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 print:hidden">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-800 text-sm">Reservation Verified</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Showroom Scan Receipt</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 border border-slate-200/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Receipt Ticket Content */}
            <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
              {/* Receipt Visual Ticket Header */}
              <div className="text-center space-y-2 pb-6 border-b border-dashed border-slate-200 relative">
                {/* Visual Notch cutouts on the left and right */}
                <div className="absolute -left-9 bottom-[-10px] w-5 h-5 rounded-full bg-slate-950/70 backdrop-blur-md border-r border-slate-200/20 print:hidden" />
                <div className="absolute -right-9 bottom-[-10px] w-5 h-5 rounded-full bg-slate-950/70 backdrop-blur-md border-l border-slate-200/20 print:hidden" />

                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold bg-indigo-50 border border-indigo-100/60 px-3 py-1 rounded-full">
                  Fast-Track Showroom Pass
                </span>
                
                <h1 className="font-display font-black text-2xl text-slate-900 tracking-tight pt-1">
                  REMIX MOBILE STORE
                </h1>
                
                <p className="text-[10px] font-mono text-slate-400">
                  Guindy Chennai Showroom &bull; Next Wave Mobile
                </p>
              </div>

              {/* Reservation Code block */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Reservation Code</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-base font-black text-slate-900 select-all">
                      {reservation.id.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="p-1 rounded hover:bg-slate-200/80 text-slate-400 hover:text-slate-600 transition-colors print:hidden"
                      title="Copy reservation code"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  {copiedCode && (
                    <span className="text-[9px] text-emerald-600 font-bold block animate-fade-in">Copied!</span>
                  )}
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Created Date</span>
                  <span className="text-xs font-bold text-slate-800 mt-1 block">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Customer Details & Showroom Location */}
              <div className="space-y-3.5 pt-1">
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Pickup Details
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  <div className="flex items-center gap-3 text-slate-700 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-slate-400 block font-medium leading-none">Customer</span>
                      <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{reservation.customerName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-slate-400 block font-medium leading-none">Assigned Pickup Time</span>
                      <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{reservation.timeSlot}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-slate-400 block font-medium leading-none">Store Showroom Location</span>
                      <span className="text-xs font-bold text-slate-800 block mt-0.5">Chennai Showroom (Guindy)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handset Summary */}
              <div className="border border-slate-100 rounded-2xl p-4 space-y-3.5 bg-slate-50/30">
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Reserved Handset Item
                </h4>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl border border-slate-200/50 overflow-hidden shrink-0 flex items-center justify-center p-1.5 shadow-sm">
                    <img 
                      src={phone.imageUrl} 
                      alt={phone.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="font-display font-extrabold text-xs text-slate-900 leading-tight">
                      {phone.name}
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                      Color finish: {phone.color} &bull; {phone.specs.storage}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs font-black text-emerald-600">
                        ₹{phone.price.toLocaleString('en-IN')}
                      </span>
                      {phone.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          ₹{phone.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Graphic Generator Card */}
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-white space-y-3">
                <div className="relative p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                  {qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Showroom Fast-Scan QR Code" 
                      className="w-48 h-48 block"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center bg-slate-100 animate-pulse rounded-xl" />
                  )}
                  {/* Subtle target alignment markers to make it look extremely technical and polished */}
                  <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-300" />
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-300" />
                  <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-slate-300" />
                  <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-slate-300" />
                </div>
                
                <div className="text-center max-w-[280px]">
                  <p className="text-[11px] font-black text-slate-800 leading-tight">
                    SCAN FOR SECURE IN-STORE PICKUP
                  </p>
                  <p className="text-[9px] text-slate-400 font-medium leading-relaxed mt-1">
                    Store assistants will scan this secure QR code at the counter to retrieve your deal, check out instantly, and process any exchange discount!
                  </p>
                </div>
              </div>

              {/* In-store pickup advisory message */}
              <div className="flex gap-2.5 items-start p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/40 text-left">
                <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-[9px] text-indigo-900 font-medium leading-relaxed">
                  <strong>Important Hold Policy:</strong> Stock for code <strong>{reservation.id.toUpperCase()}</strong> is guaranteed reserved for 24 hours. No upfront payment has been made. Bring your old phone if you estimated an exchange discount.
                </div>
              </div>
            </div>

            {/* Footer with Action buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Pass Receipt</span>
              </button>

              {qrCodeUrl && (
                <a
                  href={qrCodeUrl}
                  download={`NextWave_Reservation_${reservation.id.toUpperCase()}.png`}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pass QR</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
