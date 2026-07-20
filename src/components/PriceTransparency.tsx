import React from 'react';
import { ShieldCheck, ArrowRight, HeartHandshake, Zap, HelpCircle, Trophy, UserCheck, Star } from 'lucide-react';

export default function PriceTransparency() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden" id="price-transparency">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/40">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Transparent Value Assessment
        </span>
        <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mt-2">SMART MOBILES Price Transparency Dashboard</h3>
        <p className="text-xs text-slate-500 mt-1">
          Why buying from our physical showroom delivers significantly more real-world value than waiting on anonymous online parcel deliveries.
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core comparison dashboard */}
        <div className="lg:col-span-8 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs md:text-sm font-sans">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="pb-3 w-1/2">Service or Value Perk</th>
                  <th className="pb-3 text-center bg-blue-50/40 text-brand-blue rounded-t-xl px-4 font-black">SMART MOBILES Showroom</th>
                  <th className="pb-3 text-center text-slate-500 px-4">Standard Online App (Amazon/Flipkart)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {[
                  { perk: 'Instant In-Hand Physical Inspection', local: '✅ 100% Unboxing & Dead-Pixel test before leaving', online: '❌ Blind purchase, high returns risk' },
                  { perk: 'Secure Device Setup & Operating System Updates', local: '✅ Free (Normally ₹1,500 value)', online: '❌ Customer handles alone, zero setup assistance' },
                  { perk: 'Hassle-Free WhatsApp/Contacts Data Migration', local: '✅ Free on any iOS & Android handset', online: '❌ Risky, manual transfer required' },
                  { perk: 'Immediate trade-in valuation & Instant cash back', local: '✅ Spot evaluation + flat ₹4,000 bonus', online: '❌ Pickup delayed by delivery couriers' },
                  { perk: 'Same-day instant collection (Under 3 minutes)', local: '✅ Zero waiting slots', online: '❌ 1-to-3 working days shipping wait' },
                  { perk: 'On-site local diagnostic and repairs service desk', local: '✅ Live in-store engineers online', online: '❌ Courier device to distant service centers' },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pr-4 font-bold text-slate-900">{row.perk}</td>
                    <td className="py-3.5 text-center bg-blue-50/20 text-brand-blue border-l border-r border-blue-50 font-black px-4">{row.local}</td>
                    <td className="py-3.5 text-center text-slate-500 px-4">{row.online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Holistic trust summary card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Trust Gauge card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden space-y-4">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Holistic Quality Rating</span>
                <h4 className="text-xl font-display font-black text-white mt-1">Trust Score Index</h4>
              </div>
              <div className="w-12 h-12 bg-brand-blue/20 rounded-xl border border-brand-blue/30 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-brand-blue" />
              </div>
            </div>

            {/* Score Big Indicator */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-black text-brand-green">98.4%</span>
              <span className="text-xs text-slate-400 font-mono">Verified Chennai Feedback</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-brand-green pl-3">
              "Buying physical showroom items ensures genuine IMEI alignment, direct brand-warranty activation on spot, and zero unboxing transit damages. That's true transparency."
            </p>

            <div className="border-t border-slate-800 pt-4 space-y-2.5 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Showroom Operational Guarantee:</span>
                <span className="text-white">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Free Services Added:</span>
                <span className="text-brand-green font-bold">₹3,500 Estimated Value</span>
              </div>
            </div>
          </div>

          {/* Social Proof metrics */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
            <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Showroom Operational Stats Today</h5>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Setup Assist</span>
                <span className="text-sm font-black text-slate-800 block mt-0.5">144 Devices</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Data Restored</span>
                <span className="text-sm font-black text-slate-800 block mt-0.5">82 Terrabytes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
