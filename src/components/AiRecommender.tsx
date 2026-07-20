import React, { useState } from 'react';
import { SMARTPHONES } from '../data';
import { Smartphone, RecommendationResponse } from '../types';
import { Sparkles, Loader2, ArrowRight, CheckCircle, BrainCircuit } from 'lucide-react';

interface AiRecommenderProps {
  onReserveClick: (phone: Smartphone) => void;
}

export default function AiRecommender({ onReserveClick }: AiRecommenderProps) {
  const [budget, setBudget] = useState<number>(85000);
  const [primaryUse, setPrimaryUse] = useState<'gaming' | 'camera' | 'battery' | 'business' | 'general'>('general');
  const [preferredBrand, setPreferredBrand] = useState<string>('Any');
  const [otherSpecs, setOtherSpecs] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [response, setResponse] = useState<RecommendationResponse | null>(null);
  const [recommendedPhone, setRecommendedPhone] = useState<Smartphone | null>(null);
  const [alternativePhones, setAlternativePhones] = useState<Smartphone[]>([]);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    'Consulting SMART MOBILES Live Stock catalog...',
    'Checking benchmark scores for processors...',
    'Analyzing camera sensor size and apertures...',
    'Matching with available trade-in and EMI programs...',
    'Generating expert personalized response...'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setRecommendedPhone(null);
    setAlternativePhones([]);

    // Loop through simulated loading steps for standard premium AI feel
    let stepIndex = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
      }
    }, 800);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget,
          primaryUse,
          preferredBrand: preferredBrand === 'Any' ? '' : preferredBrand,
          otherSpecs
        })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch recommendation');
      }

      const data: RecommendationResponse = await res.json();
      
      clearInterval(stepInterval);
      setResponse(data);

      // Find the smartphones from local catalog matching recommended ID and alternatives
      const mainPhone = SMARTPHONES.find(p => p.id === data.recommendedPhoneId);
      if (mainPhone) {
        setRecommendedPhone(mainPhone);
      } else {
        throw new Error('Recommended phone ID not found in local catalog');
      }

      if (data.alternativePhoneIds && data.alternativePhoneIds.length > 0) {
        const alts = SMARTPHONES.filter(p => data.alternativePhoneIds.includes(p.id) && p.id !== data.recommendedPhoneId);
        setAlternativePhones(alts);
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      setError('Failed to connect to our smartphone expert agent. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return '₹' + price.toLocaleString();
  };

  return (
    <div className="glass-card-dark text-white rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-white/10" id="ai-recommender">
      {/* decorative glowing elements */}
      <div className="absolute -left-16 -top-16 w-32 h-32 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest bg-orange-500/10 text-brand-orange px-3 py-1 rounded-full border border-brand-orange/20 inline-flex items-center gap-1.5 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" /> AI Expert Advisory
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-100">AI Smartphone Recommender</h3>
          <p className="text-sm text-slate-400 mt-1">Provide your lifestyle requirements, and let our custom Gemini model select your ultimate match.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-slate-950/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Maximum Budget</label>
                <span className="text-sm font-bold text-brand-orange font-mono">
                  {formatPrice(budget)}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="150000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>₹15K</span>
                <span>₹150K+</span>
              </div>
            </div>

            {/* Primary Use Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Primary Usage Need</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {[
                  { key: 'general', label: 'General / All-rounder' },
                  { key: 'camera', label: 'Photography / Video' },
                  { key: 'gaming', label: 'Gaming Performance' },
                  { key: 'battery', label: 'Long Battery Life' },
                  { key: 'business', label: 'Business / Productivity' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPrimaryUse(item.key as any)}
                    className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all border ${
                      primaryUse === item.key
                        ? 'bg-brand-orange border-brand-orange text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Brand */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Preferred Brand</label>
              <select
                value={preferredBrand}
                onChange={(e) => setPreferredBrand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3.5 py-3 text-xs font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all"
              >
                {['Any', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Nothing'].map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Custom request text area */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Special Requirements (Optional)</label>
              <textarea
                value={otherSpecs}
                onChange={(e) => setOtherSpecs(e.target.value)}
                placeholder="e.g. Needs flat display, screen must be smaller than 6.5 inches, should support wireless charging, fast face unlock..."
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all h-20 resize-none placeholder-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-800 disabled:to-slate-850 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-orange/20 transition-all disabled:text-slate-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> Crafting Matches...
                </>
              ) : (
                <>
                  Generate AI Recommendation <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 flex flex-col justify-stretch">
          {isLoading && (
            <div className="flex-1 text-center py-12 px-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 min-h-[350px] flex flex-col justify-center items-center h-full">
              <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
              <h4 className="font-semibold text-slate-200">Gemini Mobile Expert Reasoning</h4>
              <p className="text-xs text-slate-400 mt-2 italic max-w-sm animate-pulse">{loadingStep}</p>
            </div>
          )}

          {!isLoading && !response && !error && (
            <div className="flex-1 text-center py-12 px-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-dashed border-white/10 min-h-[350px] flex flex-col justify-center items-center h-full">
              <Sparkles className="w-12 h-12 text-slate-500 mb-4" />
              <h4 className="font-semibold text-slate-400">Match Results Screen</h4>
              <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
                Configure your budget and preferences on the left, then click Generate to get a real-time personalized recommendation based on SMART MOBILES live inventory.
              </p>
            </div>
          )}

          {error && (
            <div className="flex-1 text-center py-12 px-6 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20 min-h-[350px] flex flex-col justify-center items-center h-full">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg mb-4">!</div>
              <h4 className="font-semibold text-red-200">System Unreachable</h4>
              <p className="text-xs text-red-400 mt-2 max-w-sm leading-relaxed">{error}</p>
            </div>
          )}

          {!isLoading && response && recommendedPhone && (
            <div className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-6 flex flex-col justify-between h-full">
              {/* Top match header */}
              <div className="flex items-center justify-between gap-4 flex-wrap border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-lg">
                    ★
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">Recommended Expert Choice</h4>
                    <p className="text-[10px] text-emerald-400 font-mono font-medium">Verified In-Store & Available</p>
                  </div>
                </div>
                {/* Match score pill */}
                <div className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Match Score</span>
                  <span className="text-sm font-display font-black text-brand-orange">{response.matchScore}%</span>
                </div>
              </div>

              {/* Recommended phone showcase */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={recommendedPhone.imageUrl}
                  alt={recommendedPhone.name}
                  referrerPolicy="no-referrer"
                  className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-2xl border border-white/10 shadow-md flex-shrink-0"
                />
                <div className="space-y-3 w-full">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{recommendedPhone.brand}</span>
                    <h5 className="text-xl font-display font-bold text-slate-100 mt-0.5">{recommendedPhone.name}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-brand-orange font-mono">{formatPrice(recommendedPhone.price)}</span>
                      {recommendedPhone.originalPrice && recommendedPhone.originalPrice > recommendedPhone.price && (
                        <span className="text-xs text-slate-500 line-through font-mono">{formatPrice(recommendedPhone.originalPrice)}</span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono ${
                        recommendedPhone.stockStatus === 'In Stock'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {recommendedPhone.stockStatus} ({recommendedPhone.stockQuantity} left)
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono bg-white/5 p-3 rounded-xl border border-white/10">
                    <div>🎥 {recommendedPhone.specs.camera.split('(')[0].slice(0, 36)}...</div>
                    <div>⚡ {recommendedPhone.specs.charging.split('(')[0]}</div>
                    <div>⚙️ {recommendedPhone.specs.processor}</div>
                    <div>🛡️ {recommendedPhone.specs.warranty.split(' ')[0]} Yr Warranty</div>
                  </div>
                </div>
              </div>

              {/* Why you'll love it description */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h6 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> Expert Reasoning
                </h6>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{response.reason}"
                </p>
              </div>

              {/* Action row */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onReserveClick(recommendedPhone)}
                  className="flex-1 bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Reserve At Store
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20Smart%20Mobiles,%20I'm%20interested%20in%20reserving%20the%20${encodeURIComponent(recommendedPhone.name)}%20based%20on%20my%20AI%2520Advisor%20match.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  WhatsApp Query
                </a>
              </div>

              {/* Alternative items */}
              {alternativePhones.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <h6 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3">Other Excellent Options</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {alternativePhones.map((phone) => (
                      <div
                        key={phone.id}
                        onClick={() => {
                          setRecommendedPhone(phone);
                          // recalculate simple fallback reason or just keep it
                          if (response) {
                            setResponse({
                              ...response,
                              recommendedPhoneId: phone.id,
                              reason: `The ${phone.name} is a stellar secondary alternative featuring ${phone.specs.processor}, pristine ${phone.specs.display} display, and premium ${phone.brand} aesthetics, perfectly priced at ${formatPrice(phone.price)} INR.`
                            });
                          }
                        }}
                        className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-3 cursor-pointer transition-all"
                      >
                        <img
                          src={phone.imageUrl}
                          alt={phone.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-lg border border-white/10"
                        />
                        <div className="text-left">
                          <span className="text-[9px] text-slate-500 font-bold block">{phone.brand}</span>
                          <span className="text-xs font-bold text-slate-200 block line-clamp-1">{phone.name}</span>
                          <span className="text-xs font-bold text-brand-orange font-mono block mt-0.5">{formatPrice(phone.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
