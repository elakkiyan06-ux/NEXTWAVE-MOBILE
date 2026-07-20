import React, { useState, useEffect } from 'react';
import { SMARTPHONES } from '../data';
import { Smartphone } from '../types';
import { Percent, Calendar, CheckCircle, Smartphone as SmartphoneIcon } from 'lucide-react';

interface EmiCalculatorProps {
  initialPhoneId?: string;
  onReserveClick: (phone: Smartphone) => void;
  isTabbed?: boolean;
}

export default function EmiCalculator({ initialPhoneId, onReserveClick, isTabbed = false }: EmiCalculatorProps) {
  const [selectedPhone, setSelectedPhone] = useState<Smartphone>(
    SMARTPHONES.find(p => p.id === initialPhoneId) || SMARTPHONES[0]
  );
  
  const [downPayment, setDownPayment] = useState<number>(Math.round(selectedPhone.price * 0.2));
  const [tenure, setTenure] = useState<number>(12); // months
  const [interestRate, setInterestRate] = useState<number>(0); // 0% No-cost EMI default if phone has it, otherwise 12%
  const [isNoCostAvailable, setIsNoCostAvailable] = useState<boolean>(false);

  // Sync state if phone selected or changed
  useEffect(() => {
    const hasNoCost = selectedPhone.offerBadge?.toLowerCase().includes('emi') || selectedPhone.brand === 'Samsung';
    setIsNoCostAvailable(hasNoCost);
    setInterestRate(hasNoCost ? 0 : 12);
    // Adjust down payment bounds
    if (downPayment > selectedPhone.price) {
      setDownPayment(Math.round(selectedPhone.price * 0.2));
    }
  }, [selectedPhone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const phone = SMARTPHONES.find(p => p.id === e.target.value);
    if (phone) setSelectedPhone(phone);
  };

  // Calculations
  const loanAmount = Math.max(0, selectedPhone.price - downPayment);
  
  const calculateEmi = () => {
    if (loanAmount === 0) return 0;
    if (interestRate === 0) {
      return Math.round(loanAmount / tenure);
    }
    const monthlyRate = (interestRate / 12) / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const emiAmount = calculateEmi();
  const totalPayment = emiAmount * tenure + downPayment;
  const totalInterest = Math.max(0, totalPayment - selectedPhone.price);

  return (
    <div className={isTabbed ? "w-full" : "glass-card rounded-[32px] shadow-xl p-6 md:p-8"} id={isTabbed ? undefined : "emi-calculator"}>
      {!isTabbed ? (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Finance Options</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">Smart EMI Calculator</h3>
            <p className="text-sm text-slate-500 mt-1">Check monthly plans and explore pre-approved 0% interest No-Cost EMI options.</p>
          </div>
          {isNoCostAvailable && (
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-500/10 animate-pulse">
              <CheckCircle className="w-5 h-5" />
              <div className="text-xs">
                <p className="font-bold">0% No-Cost EMI Available</p>
                <p className="opacity-90">Special deal on this model</p>
              </div>
            </div>
          )}
        </div>
      ) : isNoCostAvailable ? (
        <div className="mb-6 flex items-center gap-2 bg-emerald-500/10 text-emerald-800 px-4 py-2.5 rounded-xl border border-emerald-500/10 w-fit">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">0% No-Cost EMI is active for {selectedPhone.name}!</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Choose Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <SmartphoneIcon className="w-4 h-4 text-slate-400" /> Choose Smartphone
            </label>
            <select
              value={selectedPhone.id}
              onChange={handlePhoneChange}
              className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
            >
              {SMARTPHONES.map(phone => (
                <option key={phone.id} value={phone.id}>
                  {phone.name} ({phone.brand}) — ₹{phone.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Down Payment</label>
              <span className="text-sm font-bold text-brand-blue bg-blue-50/60 backdrop-blur-sm px-2.5 py-0.5 rounded-lg">
                ₹{downPayment.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={selectedPhone.price}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹0 (Zero Down Payment)</span>
              <span>Max: ₹{selectedPhone.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Tenure selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" /> Loan Tenure (Months)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[3, 6, 9, 12, 18, 24].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setTenure(months)}
                  className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border ${
                    tenure === months
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-white/60 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-slate-400" /> Interest Rate (p.a.)
              </label>
              <span className="text-sm font-bold text-slate-800">
                {interestRate}%
              </span>
            </div>
            <div className="flex gap-4">
              {isNoCostAvailable && (
                <button
                  type="button"
                  onClick={() => setInterestRate(0)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    interestRate === 0
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 shadow-sm'
                      : 'bg-white/60 border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Apply 0% No-Cost EMI
                </button>
              )}
              <button
                type="button"
                onClick={() => setInterestRate(12)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  interestRate === 12
                    ? 'bg-blue-500/10 border-blue-500/30 text-brand-blue shadow-sm'
                    : 'bg-white/60 border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                Standard Rate (12%)
              </button>
            </div>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between border border-slate-800 relative overflow-hidden">
          {/* subtle background glow */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6">
            <div>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Estimated Monthly Installment</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl md:text-5xl font-display font-bold text-gradient bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  ₹{emiAmount.toLocaleString()}
                </span>
                <span className="text-sm text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium mt-1">For {tenure} months period</p>
            </div>

            <div className="border-t border-slate-800/80 pt-6 space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Smartphone Price</span>
                <span className="font-semibold text-slate-100">₹{selectedPhone.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Down Payment</span>
                <span className="font-semibold text-slate-100">- ₹{downPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Principal Loan Amount</span>
                <span className="font-semibold text-slate-100">₹{loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Interest Charges ({interestRate}%)</span>
                <span className={`font-semibold ${interestRate === 0 ? 'text-emerald-400' : 'text-slate-100'}`}>
                  {interestRate === 0 ? 'FREE (0%)' : `+ ₹${totalInterest.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-slate-800/80 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-200">Total Effective Cost</span>
                <span className="text-lg font-display font-bold text-brand-orange">
                  ₹{totalPayment.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => onReserveClick(selectedPhone)}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Reserve Model & Lock EMI Offer
            </button>
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              *All finance schemes are serviced in-store through trusted partners: Bajaj Finserv, HDFC, and IDFC First Bank. Please bring your Aadhaar and PAN Card for instant approval in 10 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
