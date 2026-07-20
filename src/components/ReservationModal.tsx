import React, { useState } from 'react';
import { Smartphone, Reservation } from '../types';
import { X, Calendar, User, Phone, Mail, CheckCircle2, MapPin, Navigation, Clock, MessageSquare, Loader2 } from 'lucide-react';

interface ReservationModalProps {
  phone: Smartphone | null;
  onClose: () => void;
  onSuccess: (reservation: Reservation) => void;
}

export default function ReservationModal({ phone, onClose, onSuccess }: ReservationModalProps) {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Today, 2:00 PM - 4:00 PM');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reservationResult, setReservationResult] = useState<{ code: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!phone) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneId: phone.id,
          customerName,
          customerPhone,
          customerEmail,
          timeSlot,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit reservation.');
      }

      const data = await res.json();
      setReservationResult({
        code: data.reservation.id,
        message: data.message,
      });
      
      // Notify parent about success to update local lists/quantities if needed
      onSuccess(data.reservation);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while securing your reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessage = () => {
    if (!reservationResult) return '';
    const text = `Hi Smart Mobiles! I have successfully reserved the ${phone.name} on your website. 
My Reservation Code is *${reservationResult.code}*. 
Name: ${customerName}
Phone: ${customerPhone}
Preferred Time Slot: ${timeSlot}
Looking forward to visiting your store!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="glass-card rounded-[32px] w-full max-w-lg shadow-2xl border border-white/60 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex justify-between items-center bg-white/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <h3 className="font-display font-bold text-slate-900 text-lg">In-Store Product Reservation</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 text-xs font-medium">
              ⚠️ {error}
            </div>
          )}

          {!reservationResult ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Phone Summary */}
              <div className="flex items-center gap-4 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/10">
                <img 
                  src={phone.imageUrl} 
                  alt={phone.name} 
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl border border-white/40 bg-white/50"
                />
                <div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">{phone.brand}</span>
                  <h4 className="font-bold text-slate-800 text-sm">{phone.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-slate-900 text-sm">₹{phone.price.toLocaleString()}</span>
                    {phone.offerBadge && (
                      <span className="text-[9px] bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded font-bold">
                        {phone.offerBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl p-3.5 text-[11px] text-slate-500 leading-relaxed">
                ℹ️ <strong className="text-slate-700">Zero Prepayment Required.</strong> We hold your smartphone for up to 24 hours. Complete your purchase in-store via Cash, UPI, Card, or Instant Easy EMI. Our team will assist with free phone setup and data transfer!
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
                  />
                </div>

                {/* Visit Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Store Visit Schedule Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
                  >
                    <option value="Today, 10:00 AM - 12:00 PM">Today, 10:00 AM - 12:00 PM</option>
                    <option value="Today, 12:00 PM - 2:00 PM">Today, 12:00 PM - 2:00 PM</option>
                    <option value="Today, 2:00 PM - 4:00 PM">Today, 2:00 PM - 4:00 PM</option>
                    <option value="Today, 4:00 PM - 6:00 PM">Today, 4:00 PM - 6:00 PM</option>
                    <option value="Today, 6:00 PM - 8:00 PM">Today, 6:00 PM - 8:00 PM</option>
                    <option value="Tomorrow, 10:00 AM - 1:00 PM">Tomorrow, 10:00 AM - 1:00 PM</option>
                    <option value="Tomorrow, 2:00 PM - 5:00 PM">Tomorrow, 2:00 PM - 5:00 PM</option>
                    <option value="Tomorrow, 5:00 PM - 8:00 PM">Tomorrow, 5:00 PM - 8:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" /> Securing Device...
                    </>
                  ) : (
                    'Confirm Reservation (Hold for 24 Hrs)'
                  )}
                </button>
              </div>
            </form>
          ) : (
            // Success State
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-xl font-display font-bold text-slate-800">Reservation Secured!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  The {phone.brand} {phone.name} has been put aside for you under code:
                </p>
                <div className="bg-slate-950/80 text-brand-orange border border-white/10 rounded-2xl px-5 py-3 w-fit mx-auto mt-3 font-mono font-black text-xl tracking-widest shadow-md">
                  {reservationResult.code}
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-left space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Your Appointment Slot:</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">{timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Shop Physical Address:</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">SMART MOBILES Store, 128 Tech Park Road, Near Central Mall, Chennai - 600001</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <MessageSquare className="w-4 h-4" /> Send Confirmation Code to WhatsApp
                </a>

                <a
                  href="https://maps.google.com/?q=Smart+Mobiles+Store+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200"
                >
                  <Navigation className="w-4 h-4 text-slate-500" /> Get GPS Directions
                </a>
              </div>

              <p className="text-[10px] text-slate-400">
                *An email with details has been dispatched. Present this receipt to the store cashier to retrieve your item. To cancel, please click the WhatsApp button or call our helpline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
