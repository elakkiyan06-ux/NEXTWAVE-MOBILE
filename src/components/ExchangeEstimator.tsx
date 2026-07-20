import React, { useState, useEffect } from 'react';
import { EXCHANGE_BRANDS, SMARTPHONES } from '../data';
import { Smartphone } from '../types';
import { RefreshCw, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface ExchangeEstimatorProps {
  onReserveClick: (phone: Smartphone) => void;
  isTabbed?: boolean;
}

export default function ExchangeEstimator({ onReserveClick, isTabbed = false }: ExchangeEstimatorProps) {
  const [selectedBrandIndex, setSelectedBrandIndex] = useState<number>(0);
  const [selectedModelIndex, setSelectedModelIndex] = useState<number>(0);
  const [condition, setCondition] = useState<'Excellent' | 'Good' | 'Average' | 'Poor'>('Good');
  const [targetPhone, setTargetPhone] = useState<Smartphone>(SMARTPHONES[1]); // Default to iPhone 16

  const activeBrand = EXCHANGE_BRANDS[selectedBrandIndex];
  const activeModel = activeBrand.models[selectedModelIndex];

  // Recalculate model index if brand changes
  useEffect(() => {
    setSelectedModelIndex(0);
  }, [selectedBrandIndex]);

  const calculateExchangeValue = () => {
    if (!activeModel) return 0;
    const baseValue = activeModel.baseValue;
    switch (condition) {
      case 'Excellent': return baseValue;
      case 'Good': return Math.round(baseValue * 0.85);
      case 'Average': return Math.round(baseValue * 0.65);
      case 'Poor': return Math.round(baseValue * 0.40);
      default: return 0;
    }
  };

  const estimatedValue = calculateExchangeValue();
  const storeBonus = 2000; // SMART MOBILES Special Exchange Bonus on visit
  const totalTradeInAllowance = estimatedValue + storeBonus;
  
  const netEffectivePrice = Math.max(0, targetPhone.price - totalTradeInAllowance);

  return (
    <div className={isTabbed ? "w-full" : "glass-card rounded-[32px] shadow-xl p-6 md:p-8"} id={isTabbed ? undefined : "exchange-estimator"}>
      {!isTabbed ? (
        <div className="mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-orange-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Smart Exchange Program</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">Exchange Value Estimator</h3>
          <p className="text-sm text-slate-500 mt-1">Trade in your old smartphone for maximum value plus an exclusive ₹2,000 in-store bonus.</p>
        </div>
      ) : (
        <div className="mb-6 flex items-center gap-2 bg-orange-500/10 text-orange-800 px-4 py-2.5 rounded-xl border border-orange-500/10 w-fit">
          <Sparkles className="w-4 h-4 text-brand-orange shrink-0 animate-pulse" />
          <span className="text-xs font-bold">Special Offer: Get flat ₹2,000 extra store bonus on any working model!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Old Brand */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Old Phone Brand</label>
              <select
                value={selectedBrandIndex}
                onChange={(e) => setSelectedBrandIndex(Number(e.target.value))}
                className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
              >
                {EXCHANGE_BRANDS.map((item, index) => (
                  <option key={item.brand} value={index}>{item.brand}</option>
                ))}
              </select>
            </div>

            {/* Old Model */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Old Phone Model</label>
              <select
                value={selectedModelIndex}
                onChange={(e) => setSelectedModelIndex(Number(e.target.value))}
                className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
              >
                {activeBrand.models.map((model, index) => (
                  <option key={model.name} value={index}>{model.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Device Condition</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { key: 'Excellent', label: 'Excellent', desc: 'Pristine, no scratches' },
                { key: 'Good', label: 'Good', desc: 'Minor wear, no cracks' },
                { key: 'Average', label: 'Average', desc: 'Moderate dents/scratches' },
                { key: 'Poor', label: 'Poor', desc: 'Cracked, heavily damaged' }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setCondition(item.key as any)}
                  className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                    condition === item.key
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-white/60 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="font-bold text-sm">{item.label}</span>
                  <span className={`text-[10px] leading-relaxed ${condition === item.key ? 'text-slate-300' : 'text-slate-400'}`}>
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Smartphone Selector */}
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Calculate Net Cost for New Smartphone</h4>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-3/5">
                <select
                  value={targetPhone.id}
                  onChange={(e) => {
                    const found = SMARTPHONES.find(p => p.id === e.target.value);
                    if (found) setTargetPhone(found);
                  }}
                  className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
                >
                  {SMARTPHONES.map(phone => (
                    <option key={phone.id} value={phone.id}>
                      {phone.name} (₹{phone.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-2/5 flex items-center justify-end gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Fully warrantied & certified
              </div>
            </div>
          </div>
        </div>

        {/* Right Pricing Calculation Panel */}
        <div className="lg:col-span-5 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 flex flex-col justify-between shadow-sm">
          <div className="space-y-5">
            <div className="text-center pb-4 border-b border-white/40">
              <RefreshCw className="w-8 h-8 text-brand-orange mx-auto mb-2 animate-spin-slow" />
              <h4 className="font-bold text-slate-800 text-sm">Estimated Old Phone Value</h4>
              <p className="text-3xl font-display font-extrabold text-slate-900 mt-1">
                ₹{estimatedValue.toLocaleString()}
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-bold mt-1 bg-emerald-500/10 border border-emerald-500/10 w-fit mx-auto px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> Includes + ₹{storeBonus.toLocaleString()} Store Bonus
              </div>
            </div>

            <div className="space-y-3 pt-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Selected New Phone</span>
                <span className="font-semibold text-slate-800">{targetPhone.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>New Phone Price</span>
                <span className="font-semibold text-slate-800">₹{targetPhone.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Old Phone Value</span>
                <span className="font-semibold text-slate-800">- ₹{estimatedValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 pb-2 border-b border-dashed border-white/40">
                <span>SMART MOBILES In-Store Bonus</span>
                <span className="font-semibold text-emerald-600">- ₹{storeBonus.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="font-bold text-slate-800 block">Net Effective Price</span>
                  <span className="text-[10px] text-slate-400">Payable in store</span>
                </div>
                <span className="text-2xl font-display font-extrabold text-brand-blue">
                  ₹{netEffectivePrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/40 space-y-3">
            <button
              type="button"
              onClick={() => onReserveClick(targetPhone)}
              className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Reserve & Upgrade Now <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-400 leading-relaxed text-center">
              *The final evaluation will be verified physically at the SMART MOBILES Store counter by our technical staff. We test screen quality, speakers, Wi-Fi, battery health, and network connectivity. Bring your old phone's original bill, box, and charger to lock in full price!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
