import React, { useState } from 'react';
import { SMARTPHONES } from '../data';
import { Smartphone } from '../types';
import { Check, X, ShieldAlert } from 'lucide-react';

interface CompareSectionProps {
  onReserveClick: (phone: Smartphone) => void;
}

export default function CompareSection({ onReserveClick }: CompareSectionProps) {
  const [phoneAId, setPhoneAId] = useState<string>('iphone-16-pro-max');
  const [phoneBId, setPhoneBId] = useState<string>('galaxy-s24-ultra');

  const phoneA = SMARTPHONES.find(p => p.id === phoneAId) || SMARTPHONES[0];
  const phoneB = SMARTPHONES.find(p => p.id === phoneBId) || SMARTPHONES[1];

  const handleSelectA = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneAId(e.target.value);
  };

  const handleSelectB = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneBId(e.target.value);
  };

  const formatPrice = (price: number) => {
    return '₹' + price.toLocaleString();
  };

  // Specs Rows configuration
  const specRows = [
    { label: 'Brand', key: 'brand' as const, isDirect: true },
    { label: 'Display Specifications', key: 'display' as const, isSpec: true },
    { label: 'Processor & Graphics', key: 'processor' as const, isSpec: true },
    { label: 'Camera Hardware', key: 'camera' as const, isSpec: true },
    { label: 'Battery Capacity', key: 'battery' as const, isSpec: true },
    { label: 'Power & Charging', key: 'charging' as const, isSpec: true },
    { label: 'Storage Options', key: 'storage' as const, isSpec: true },
    { label: 'Official Warranty', key: 'warranty' as const, isSpec: true },
    { label: 'Retail Value', key: 'price' as const, isPrice: true },
    { label: 'Stock Status', key: 'stockStatus' as const, isStock: true },
  ];

  return (
    <div className="glass-card rounded-[32px] shadow-xl p-6 md:p-8" id="compare-phones">
      <div className="mb-8 text-center md:text-left">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Spec-to-Spec Comparison</span>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">Compare Smartphones</h3>
        <p className="text-sm text-slate-500 mt-1">Make informed decisions by evaluating technical specifications, live local prices, and warranty packages side-by-side.</p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model A</label>
          <select
            value={phoneA.id}
            onChange={handleSelectA}
            className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
          >
            {SMARTPHONES.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model B</label>
          <select
            value={phoneB.id}
            onChange={handleSelectB}
            className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
          >
            {SMARTPHONES.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-4 pr-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">Specification</th>
              <th className="py-4 px-4 w-3/8 text-center bg-white/20 backdrop-blur-sm rounded-t-2xl">
                <div className="flex flex-col items-center">
                  <img
                    src={phoneA.imageUrl}
                    alt={phoneA.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xl border border-white/40 bg-white/50 mb-2 shadow-sm"
                  />
                  <span className="text-[10px] uppercase font-bold text-slate-400">{phoneA.brand}</span>
                  <span className="text-sm font-bold text-slate-800">{phoneA.name}</span>
                </div>
              </th>
              <th className="py-4 px-4 w-3/8 text-center">
                <div className="flex flex-col items-center">
                  <img
                    src={phoneB.imageUrl}
                    alt={phoneB.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xl border border-white/40 bg-white/50 mb-2 shadow-sm"
                  />
                  <span className="text-[10px] uppercase font-bold text-slate-400">{phoneB.brand}</span>
                  <span className="text-sm font-bold text-slate-800">{phoneB.name}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {specRows.map((row, idx) => {
              let cellAContent: React.ReactNode;
              let cellBContent: React.ReactNode;

              if (row.isDirect) {
                cellAContent = phoneA[row.key as 'brand'];
                cellBContent = phoneB[row.key as 'brand'];
              } else if (row.isSpec) {
                cellAContent = phoneA.specs[row.key as keyof typeof phoneA.specs];
                cellBContent = phoneB.specs[row.key as keyof typeof phoneB.specs];
              } else if (row.isPrice) {
                cellAContent = (
                  <div>
                    <span className="text-base font-bold text-slate-900">{formatPrice(phoneA.price)}</span>
                    {phoneA.originalPrice && phoneA.originalPrice > phoneA.price && (
                      <p className="text-[10px] text-slate-400 line-through">{formatPrice(phoneA.originalPrice)}</p>
                    )}
                  </div>
                );
                cellBContent = (
                  <div>
                    <span className="text-base font-bold text-slate-900">{formatPrice(phoneB.price)}</span>
                    {phoneB.originalPrice && phoneB.originalPrice > phoneB.price && (
                      <p className="text-[10px] text-slate-400 line-through">{formatPrice(phoneB.originalPrice)}</p>
                    )}
                  </div>
                );
              } else if (row.isStock) {
                cellAContent = (
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    phoneA.stockStatus === 'In Stock' ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/10' : 'bg-amber-500/10 text-amber-700 border border-amber-500/10'
                  }`}>
                    {phoneA.stockStatus === 'In Stock' ? '🟢 In Stock' : '🟡 Limited'}
                  </span>
                );
                cellBContent = (
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    phoneB.stockStatus === 'In Stock' ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/10' : 'bg-amber-500/10 text-amber-700 border border-amber-500/10'
                  }`}>
                    {phoneB.stockStatus === 'In Stock' ? '🟢 In Stock' : '🟡 Limited'}
                  </span>
                );
              }

              return (
                <tr 
                  key={row.label} 
                  className={`border-b border-white/20 ${
                    idx % 2 === 0 ? 'bg-white/10' : ''
                  }`}
                >
                  <td className="py-4 pr-4 font-bold text-slate-700 text-xs md:text-sm">{row.label}</td>
                  <td className="py-4 px-4 text-slate-600 text-xs text-center bg-white/10">{cellAContent}</td>
                  <td className="py-4 px-4 text-slate-600 text-xs text-center">{cellBContent}</td>
                </tr>
              );
            })}
            
            {/* CTA Actions row */}
            <tr>
              <td className="py-6 pr-4"></td>
              <td className="py-6 px-4 text-center bg-white/20 backdrop-blur-sm rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => onReserveClick(phoneA)}
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  Reserve {phoneA.name.split(' ')[0]}
                </button>
              </td>
              <td className="py-6 px-4 text-center">
                <button
                  type="button"
                  onClick={() => onReserveClick(phoneB)}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  Reserve {phoneB.name.split(' ')[0]}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
