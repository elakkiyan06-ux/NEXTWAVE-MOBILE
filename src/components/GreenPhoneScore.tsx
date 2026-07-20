import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, ShieldAlert, Award, Scale, HelpCircle, Check, 
  Trash2, FileText, BatteryCharging, Heart, Sparkles 
} from 'lucide-react';
import { SMARTPHONES } from '../data';
import { Smartphone } from '../types';
import { getSustainabilityData } from '../sustainabilityData';

export default function GreenPhoneScore() {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>('pixel-9-pro');

  const targetPhone = SMARTPHONES.find(p => p.id === selectedPhoneId) || SMARTPHONES[0];
  const ecoStats = getSustainabilityData(selectedPhoneId);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 border-emerald-500/30 bg-emerald-50';
    if (score >= 85) return 'text-teal-600 border-teal-500/30 bg-teal-50';
    return 'text-amber-600 border-amber-500/30 bg-amber-50';
  };

  return (
    <div className="space-y-8">
      {/* Phone Selector Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500 animate-bounce" />
          <div>
            <h4 className="text-sm font-display font-black text-slate-900">Green Tech Audit & Sustainability</h4>
            <p className="text-[10px] text-slate-500">Analyze verified environmental footprints, mineral audits, and lifecycle repair parameters.</p>
          </div>
        </div>

        <select
          value={selectedPhoneId}
          onChange={(e) => setSelectedPhoneId(e.target.value)}
          className="px-3 py-2 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200/80 shadow-sm focus:outline-none cursor-pointer"
        >
          {SMARTPHONES.map((phone) => (
            <option key={phone.id} value={phone.id}>
              {phone.brand} - {phone.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Stats Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Large Eco Score Card */}
        <div className="lg:col-span-5 bg-gradient-to-tr from-slate-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Eco-Index Certificate
            </span>
            <h4 className="text-lg font-display font-black">{targetPhone.name} Evaluation</h4>
          </div>

          <div className="text-center py-8 space-y-3">
            <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-emerald-500 bg-emerald-500/5 shadow-2xl relative">
              <span className="text-4xl font-display font-black text-emerald-400 font-mono">{ecoStats.score}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Eco Points</span>
            </div>
            <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">
              {ecoStats.score >= 90 ? '⭐⭐⭐⭐⭐ Elite Green' : '⭐⭐⭐⭐ Eco Choice'}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {ecoStats.badges.map((badge, idx) => (
              <span key={idx} className="text-[10px] font-black bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard Details Card */}
        <div className="lg:col-span-7 bg-white/45 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                🌱 Sustainability Blueprint
              </span>
              <h4 className="text-lg font-display font-black text-slate-900 mt-2">Materials & Carbon Breakdown</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                {ecoStats.description}
              </p>
            </div>

            {/* Grid of specifications */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Carbon Footprint</span>
                <span className="font-mono font-black text-slate-900 text-sm">{ecoStats.carbon}</span>
              </div>
              <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Energy Efficiency</span>
                <span className="font-mono font-black text-slate-900 text-sm truncate block">{ecoStats.efficiency}</span>
              </div>
              <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recyclability Index</span>
                <span className="font-mono font-black text-slate-900 text-sm">{ecoStats.recyclability}% Recyclable</span>
              </div>
              <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected Lifespan</span>
                <span className="font-mono font-black text-slate-900 text-sm">{ecoStats.lifespan}</span>
              </div>
            </div>
          </div>

          {/* Education Block */}
          <div className="pt-6 border-t border-slate-100 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 mt-4">
            <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              🌍 Why Choose Environmentally Friendly Devices?
            </h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Opting for a device with a **90+ Eco Score** reduces electronic waste recycling burden by up to 40% and offsets raw coltan mining. At SMART MOBILES, we guarantee high-value circular trade-ins to ensure your discarded device never enters local Chennai landfills.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
