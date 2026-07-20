import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { 
  Sparkles, GraduationCap, Briefcase, Camera, Building2, 
  ArrowRight, RefreshCw, Eye, Percent, Gift, Check, Clock, Heart,
  Share2, X, Copy, ArrowUpDown, TrendingDown, Mic, BrainCircuit
} from 'lucide-react';
import { Smartphone } from '../types';
import { SMARTPHONES, MOCK_PRICE_HISTORY } from '../data';
import AiReasoningModal from './AiReasoningModal';
import PersonaCardGeneratorModal from './PersonaCardGeneratorModal';

interface AiPersonalizedHomepageProps {
  onSelectPhone: (phone: Smartphone) => void;
  onSelectTab: (tabId: string) => void;
  wishlist?: string[];
  onToggleWishlist?: (phoneId: string) => void;
  comparedPhoneIds?: string[];
  onToggleCompare?: (phoneId: string) => void;
  selectedProfile?: UserProfileType;
  onProfileChange?: (profile: UserProfileType) => void;
  onTriggerVoiceProfileSwitch?: () => void;
}

export type UserProfileType = 'Student' | 'Professional' | 'Photographer' | 'Business';

export const PROFILES: UserProfileType[] = ['Student', 'Professional', 'Photographer', 'Business'];

const getPriceDropInfo = (phoneId: string, currentPrice: number) => {
  const history = MOCK_PRICE_HISTORY[phoneId];
  if (!history || history.length < 2) return null;

  const now = Date.now();
  const twentyFourHoursAgoMs = now - 24 * 60 * 60 * 1000;

  // Filter history items within last 24h (but not the absolute latest current price item)
  const relevantHistory = history.filter(item => {
    const t = new Date(item.timestamp).getTime();
    return t >= twentyFourHoursAgoMs && t < now - 1000;
  });

  if (relevantHistory.length === 0) {
    // Fallback to comparing with previous record if none are strictly in 24h
    const previousRecord = history[history.length - 2];
    if (previousRecord && previousRecord.price > currentPrice) {
      const dropAmount = previousRecord.price - currentPrice;
      const dropPercentage = Math.round((dropAmount / previousRecord.price) * 100);
      return { dropAmount, dropPercentage, previousPrice: previousRecord.price };
    }
    return null;
  }

  // Find the highest price in the relevant 24-hour history
  const maxPrevPrice = Math.max(...relevantHistory.map(item => item.price));
  if (maxPrevPrice > currentPrice) {
    const dropAmount = maxPrevPrice - currentPrice;
    const dropPercentage = Math.round((dropAmount / maxPrevPrice) * 100);
    return { dropAmount, dropPercentage, previousPrice: maxPrevPrice };
  }

  return null;
};

export default function AiPersonalizedHomepage({ 
  onSelectPhone, 
  onSelectTab,
  wishlist = [],
  onToggleWishlist,
  comparedPhoneIds = [],
  onToggleCompare,
  selectedProfile: propsSelectedProfile,
  onProfileChange: propsOnProfileChange,
  onTriggerVoiceProfileSwitch
}: AiPersonalizedHomepageProps) {
  const [localProfile, setLocalProfile] = useState<UserProfileType>('Student');
  const selectedProfile = propsSelectedProfile !== undefined ? propsSelectedProfile : localProfile;
  const setSelectedProfile = propsOnProfileChange !== undefined ? propsOnProfileChange : setLocalProfile;
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [reasoningPhone, setReasoningPhone] = useState<Smartphone | null>(null);
  const [generatorPhone, setGeneratorPhone] = useState<Smartphone | null>(null);
  const [sharingPhoneId, setSharingPhoneId] = useState<string | null>(null);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  // AI Recommender States
  const [recommenderBudget, setRecommenderBudget] = useState<number>(50000);
  const [recommenderBrand, setRecommenderBrand] = useState<string>('Any');
  const [recommenderPriorities, setRecommenderPriorities] = useState<string[]>(['Gaming', 'Best Value']);
  const [recommenderStorage, setRecommenderStorage] = useState<string>('256 GB');
  const [isRecommenderLoading, setIsRecommenderLoading] = useState<boolean>(false);
  const [recommenderLoadingStep, setRecommenderLoadingStep] = useState<string>('');

  interface ScoredSmartphone extends Smartphone {
    matchScore: number;
  }
  const [recommenderMatches, setRecommenderMatches] = useState<ScoredSmartphone[]>([]);

  const runMatching = (budgetVal: number, brandVal: string, prioritiesVal: string[], storageVal: string) => {
    const brandFiltered = brandVal === 'Any' ? SMARTPHONES : SMARTPHONES.filter(p => p.brand.toLowerCase() === brandVal.toLowerCase());
    const budgetFiltered = brandFiltered.filter(p => p.price <= budgetVal);
    const candidates = budgetFiltered.length > 0 ? budgetFiltered : [...brandFiltered].sort((a, b) => a.price - b.price).slice(0, 3);
    
    const scored = candidates.map(phone => {
      let score = 80;
      if (prioritiesVal.includes('Camera') && (phone.specs.camera.includes('200MP') || phone.specs.camera.includes('48MP') || phone.specs.camera.includes('50MP') || phone.specs.camera.includes('Main'))) {
        score += 4;
      }
      if (prioritiesVal.includes('Battery') && (phone.specs.battery.includes('5000 mAh') || phone.specs.battery.includes('4600') || phone.specs.battery.includes('4900') || phone.specs.battery.includes('4685') || phone.specs.battery.includes('4800') || phone.specs.battery.includes('4000'))) {
        score += 4;
      }
      if (prioritiesVal.includes('Gaming') && (phone.specs.processor.includes('Snapdragon 8') || phone.specs.processor.includes('A18 Pro') || phone.specs.processor.includes('Dimensity') || phone.specs.processor.includes('Exynos 2400'))) {
        score += 4;
      }
      if (prioritiesVal.includes('Compact') && (phone.specs.display.includes('6.1"') || phone.specs.display.includes('6.2"') || phone.specs.display.includes('6.3"') || phone.specs.display.includes('6.0"'))) {
        score += 4;
      }
      if (prioritiesVal.includes('Best Value') && (phone.originalPrice && phone.originalPrice > phone.price)) {
        score += 4;
      }
      if (phone.specs.storage.includes(storageVal.replace(' ', ''))) {
        score += 3;
      }
      score = Math.min(score, 99);
      return { ...phone, matchScore: score };
    });
    
    scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommenderMatches(scored);
  };

  useEffect(() => {
    let budget = 50000;
    let brand = 'Any';
    let priorities = ['Gaming', 'Best Value'];
    let storage = '256 GB';

    if (selectedProfile === 'Student') {
      budget = 50000;
      priorities = ['Gaming', 'Best Value'];
      storage = '256 GB';
    } else if (selectedProfile === 'Professional') {
      budget = 120000;
      priorities = ['Battery', 'Best Value'];
      storage = '256 GB';
    } else if (selectedProfile === 'Photographer') {
      budget = 140000;
      priorities = ['Camera'];
      storage = '256 GB';
    } else if (selectedProfile === 'Business') {
      budget = 130000;
      priorities = ['Battery'];
      storage = '512 GB';
    }

    setRecommenderBudget(budget);
    setRecommenderBrand(brand);
    setRecommenderPriorities(priorities);
    setRecommenderStorage(storage);
    runMatching(budget, brand, priorities, storage);
  }, [selectedProfile]);

  const handleGetRecommendations = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecommenderLoading(true);
    setRecommenderLoadingStep('Gemini advisor is compiling specifications...');
    
    const steps = [
      'Accessing real-time in-store catalog...',
      'Computing performance benchmarking scores...',
      'Matching optimal thermal characteristics...',
      'Drafting hyper-personalized curations...'
    ];
    
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setRecommenderLoadingStep(steps[stepIdx]);
        stepIdx++;
      }
    }, 250);
    
    setTimeout(() => {
      clearInterval(interval);
      runMatching(recommenderBudget, recommenderBrand, recommenderPriorities, recommenderStorage);
      setIsRecommenderLoading(false);
    }, 1000);
  };

  const getShareUrl = (phoneId: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?handset=${phoneId}&ref=ai_recommendation`;
  };

  const getShareText = (phone: Smartphone) => {
    return `Check out this AI-recommended handset on GreenPhone: *${phone.name}* (Processor: ${phone.specs.processor}, Camera: ${phone.specs.camera}). It matches my ${selectedProfile} profile perfectly!`;
  };

  const profileButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const phoneCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter recommendations based on profiles
  const getProfileData = (profile: UserProfileType) => {
    switch (profile) {
      case 'Student':
        return {
          title: 'Student Explorer',
          icon: <GraduationCap className="w-5 h-5" />,
          desc: 'High refresh rate screens, outstanding gaming performance, and pocket-friendly budgets.',
          welcomeMsg: "Welcome back, student! We've handpicked the fastest gaming chips and budget multipliers with flat student discounts.",
          badgeText: '🎓 Student Pass: Extra ₹3,000 Off Accessories',
          budgetLimit: 80000,
          recommendedIds: ['oneplus-12', 'galaxy-s24', 'iphone-16'],
          specialOffers: [
            { id: 'off1', title: 'Campus Tech Grant', desc: 'Flat ₹2,500 off on OnePlus/Nothing models with educational ID.', code: 'STUDENTCHNY' },
            { id: 'off2', title: 'Zero Down Payment EMI', desc: 'Pay 0 down payment on smartphones under ₹35,000 with parents credit card.', code: 'CAMPUSZERO' }
          ],
          recentlyViewedIds: ['oneplus-12'],
          continueBrowsingAction: 'Browse Gaming Range'
        };
      case 'Professional':
        return {
          title: 'Working Professional',
          icon: <Briefcase className="w-5 h-5" />,
          desc: 'All-day security, extreme multi-tasking engines, and crystal-clear presentation codecs.',
          welcomeMsg: "Welcome back! Boost your productivity with top-tier multitasking flagships and secure workspace integration.",
          badgeText: '💼 Executive Benefit: Free Data Migration & Diagnostics',
          budgetLimit: 130000,
          recommendedIds: ['pixel-9-pro', 'galaxy-s24-ultra', 'iphone-16-pro-max'],
          specialOffers: [
            { id: 'off3', title: 'GST Invoice Savings', desc: 'Claim up to 18% input tax credit with verified corporate GSTIN.', code: 'PROGST18' },
            { id: 'off4', title: 'Premium Care Bundle', desc: 'Get custom leather pouch and screen guard at 50% discount.', code: 'PROCARE50' }
          ],
          recentlyViewedIds: ['galaxy-s24-ultra'],
          continueBrowsingAction: 'Browse Flagship Models'
        };
      case 'Photographer':
        return {
          title: 'Creative Photographer',
          icon: <Camera className="w-5 h-5" />,
          desc: 'Periscope zooms, manual ISO, computational HDR, and cinematic ProRes/RAW workflows.',
          welcomeMsg: "Hello creative! Discover smartphones with state-of-the-art camera arrays and true-to-life studio colors.",
          badgeText: '📷 Lens Kit Special: Studio Gimbal Bundle included',
          budgetLimit: 150000,
          recommendedIds: ['iphone-16-pro-max', 'pixel-9-pro', 'galaxy-s24-ultra'],
          specialOffers: [
            { id: 'off5', title: 'Shutter Discount', desc: 'Trade in your old camera phone and receive additional ₹5,000 camera bonus.', code: 'CAMERAPRO' },
            { id: 'off6', title: 'Free Lens Care', desc: 'Complementary sapphire camera lens guards for dual/triple arrays.', code: 'GLASSPROTECT' }
          ],
          recentlyViewedIds: ['iphone-16-pro-max'],
          continueBrowsingAction: 'Browse Camera Contenders'
        };
      case 'Business':
        return {
          title: 'Business Flagship',
          icon: <Building2 className="w-5 h-5" />,
          desc: 'Enterprise security, maximum internal memory, elite warranties, and extreme battery capacity.',
          welcomeMsg: "Welcome back, Director! We've compiled elite devices supporting desktop projection, stylus, and premium service desks.",
          badgeText: '👔 Premier Privilege: Concierge Home Pickup Warranty',
          budgetLimit: 140000,
          recommendedIds: ['galaxy-s24-ultra', 'iphone-16-pro-max', 'pixel-9-pro'],
          specialOffers: [
            { id: 'off7', title: 'Corporate Fleet Discount', desc: 'Order 3 or more company devices for up to 12% cashbacks.', code: 'FLEETMOB' },
            { id: 'off8', title: 'Extended Warranty Duo', desc: 'Add 1 year premium accidental protection for just ₹1,999 extra.', code: 'PREMIERWAR' }
          ],
          recentlyViewedIds: ['galaxy-s24-ultra', 'pixel-9-pro'],
          continueBrowsingAction: 'Compare Premium Enterprise'
        };
    }
  };

  const profileData = getProfileData(selectedProfile);
  const baseRecommended = SMARTPHONES.filter(p => profileData.recommendedIds.includes(p.id));

  const recommendedPhones = [...baseRecommended].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    // Default maintains index order of profile recommendation
    return profileData.recommendedIds.indexOf(a.id) - profileData.recommendedIds.indexOf(b.id);
  });

  const recentlyViewedPhones = SMARTPHONES.filter(p => profileData.recentlyViewedIds.includes(p.id));

  // Animation variants for staggered entry of cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 140
      }
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.96,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Profile Switcher Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 text-white p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Real-time Hyper-Personalization
          </p>
          <h4 className="text-base sm:text-lg font-display font-black tracking-tight mt-0.5">Select Your Persona Profile</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Personalize pricing models, camera benchmarks, and accessory vouchers instantly.</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 z-10 w-full sm:w-auto">
          <div 
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="User Persona Profiles"
          >
            {PROFILES.map((prof, index) => {
              const isSel = selectedProfile === prof;
              let icon = <GraduationCap className="w-3.5 h-3.5" />;
              if (prof === 'Professional') icon = <Briefcase className="w-3.5 h-3.5" />;
              if (prof === 'Photographer') icon = <Camera className="w-3.5 h-3.5" />;
              if (prof === 'Business') icon = <Building2 className="w-3.5 h-3.5" />;

              return (
                <button
                  key={prof}
                  ref={(el) => { profileButtonRefs.current[index] = el; }}
                  role="tab"
                  aria-selected={isSel}
                  tabIndex={isSel ? 0 : -1}
                  onClick={() => setSelectedProfile(prof)}
                  onKeyDown={(e) => {
                    let targetIndex = -1;
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                      e.preventDefault();
                      targetIndex = (index + 1) % PROFILES.length;
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      targetIndex = (index - 1 + PROFILES.length) % PROFILES.length;
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      targetIndex = 0;
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      targetIndex = PROFILES.length - 1;
                    }

                    if (targetIndex !== -1) {
                      setSelectedProfile(PROFILES[targetIndex]);
                      profileButtonRefs.current[targetIndex]?.focus();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-slate-950 ${
                    isSel 
                      ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-lg scale-105 border border-brand-orange/30' 
                      : 'bg-slate-900/60 hover:bg-slate-900 text-slate-300 border border-slate-800'
                  }`}
                >
                  {icon}
                  <span>{prof}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Recommendation Engine */}
      <motion.div 
        key={selectedProfile + "-recommender"}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-[#0c0d21] via-[#0f1026] to-[#14152a] text-white border border-slate-800 rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                🤖 AI Recommendation Engine
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mt-3">
                Find Your Perfect Phone
              </h3>
            </div>

            <form onSubmit={handleGetRecommendations} className="space-y-5">
              {/* Budget */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  💰 Budget
                </label>
                <div className="text-2xl md:text-3xl font-display font-black text-indigo-400 mb-2">
                  ₹{recommenderBudget.toLocaleString('en-IN')}
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={recommenderBudget}
                  onChange={(e) => setRecommenderBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold mt-1">
                  <span>₹10K</span>
                  <span>₹2L+</span>
                </div>
              </div>

              {/* Preferred Brand */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  📱 Preferred Brand
                </label>
                <select
                  value={recommenderBrand}
                  onChange={(e) => setRecommenderBrand(e.target.value)}
                  className="w-full bg-[#161730] border border-slate-800 text-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
                >
                  {['Any', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Nothing'].map((brand) => (
                    <option key={brand} value={brand}>{brand === 'Any' ? 'Any Brand' : brand}</option>
                  ))}
                </select>
              </div>

              {/* Priorities */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                  ⚡ Priorities (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'Camera', label: 'Camera', emoji: '📷' },
                    { id: 'Battery', label: 'Battery', emoji: '🔋' },
                    { id: 'Gaming', label: 'Gaming', emoji: '🎮' },
                    { id: 'Compact', label: 'Compact', emoji: '📐' },
                    { id: 'Best Value', label: 'Best Value', emoji: '💸' }
                  ].map((priority) => {
                    const isSelected = recommenderPriorities.includes(priority.id);
                    return (
                      <button
                        key={priority.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setRecommenderPriorities(recommenderPriorities.filter(p => p !== priority.id));
                          } else {
                            setRecommenderPriorities([...recommenderPriorities, priority.id]);
                          }
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <span>{priority.emoji}</span>
                        <span>{priority.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum Storage */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  💾 Minimum Storage
                </label>
                <select
                  value={recommenderStorage}
                  onChange={(e) => setRecommenderStorage(e.target.value)}
                  className="w-full bg-[#161730] border border-slate-800 text-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
                >
                  {['128 GB', '256 GB', '512 GB'].map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isRecommenderLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isRecommenderLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Compiling Recommendation...</span>
                  </>
                ) : (
                  <>
                    <span>🤖 Get AI Recommendations</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7 space-y-4 self-stretch flex flex-col justify-start">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider text-left">
              Your Personalized Picks
            </h4>

            {isRecommenderLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-slate-900/40 rounded-2xl border border-slate-800/60 text-center min-h-[300px]">
                <BrainCircuit className="w-12 h-12 text-indigo-400 animate-pulse mb-4" />
                <h5 className="font-bold text-slate-200">Consulting Expert Engine</h5>
                <p className="text-xs text-slate-400 mt-2 italic animate-pulse">{recommenderLoadingStep}</p>
              </div>
            ) : recommenderMatches.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-center min-h-[300px]">
                <Sparkles className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
                <h5 className="font-bold text-slate-400">Configure & Generate</h5>
                <p className="text-xs text-slate-500 mt-2 max-w-xs">
                  Set your budget, priorities, and storage options on the left, then click Get AI Recommendations to see matches.
                </p>
              </div>
            ) : (
              <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {recommenderMatches.slice(0, 3).map((phone) => {
                  return (
                    <div 
                      key={phone.id}
                      className="bg-[#101127] hover:bg-[#14152f] border border-slate-800/80 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between transition-all group hover:border-indigo-500/30 shadow-md text-left"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img 
                          src={phone.imageUrl} 
                          alt={phone.name} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-xl border border-slate-800 flex-shrink-0" 
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{phone.brand}</span>
                            <span className="bg-indigo-500/10 text-indigo-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-indigo-500/20">
                              {phone.matchScore}% Match
                            </span>
                          </div>
                          <h5 className="font-bold text-slate-100 text-sm mt-0.5 truncate">{phone.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-slate-200">₹{phone.price.toLocaleString('en-IN')}</span>
                            {phone.originalPrice && phone.originalPrice > phone.price && (
                              <span className="text-[10px] text-slate-500 line-through">₹{phone.originalPrice.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => onSelectPhone(phone)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
                        >
                          Reserve Now
                        </button>
                        <button
                          onClick={() => {
                            setReasoningPhone(phone);
                          }}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                          title="Show AI Reasoning Explanation"
                        >
                          <BrainCircuit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Recommended Smartphones Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
            ✨ Handpicked Matches for {selectedProfile}s
          </h4>
          
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-sm text-slate-700 hover:border-slate-300 transition-colors">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="recommended-sort" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Sort by:</label>
              <select
                id="recommended-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer pr-1"
              >
                <option value="default">AI Curated (Default)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-2 rounded-xl uppercase tracking-wider whitespace-nowrap">
              {recommendedPhones.length} Curations
            </span>
          </div>
        </div>

        <LayoutGroup id="recommended-phones-reorder">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedProfile}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {recommendedPhones.map((phone, index) => {
                const priceDrop = getPriceDropInfo(phone.id, phone.price);
                return (
                  <motion.div 
                    layout
                    key={phone.id}
                ref={(el) => { phoneCardRefs.current[index] = el; }}
                variants={itemVariants}
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  transition: { type: 'spring', stiffness: 300, damping: 20 } 
                }}
                whileTap={{ scale: 0.985 }}
                tabIndex={0}
                role="article"
                aria-label={`${phone.name}, Brand: ${phone.brand}, Price: ₹${phone.price.toLocaleString('en-IN')}`}
                onKeyDown={(e) => {
                  let targetIndex = -1;
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    targetIndex = (index + 1) % recommendedPhones.length;
                  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    targetIndex = (index - 1 + recommendedPhones.length) % recommendedPhones.length;
                  } else if (e.key === 'Home') {
                    e.preventDefault();
                    targetIndex = 0;
                  } else if (e.key === 'End') {
                    e.preventDefault();
                    targetIndex = recommendedPhones.length - 1;
                  } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPhone(phone);
                  }

                  if (targetIndex !== -1) {
                    phoneCardRefs.current[targetIndex]?.focus();
                  }
                }}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-50">
                    <img 
                      src={phone.imageUrl} 
                      alt={phone.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                      {phone.brand}
                    </div>
                    {phone.offerBadge && (
                      <div className="absolute bottom-2 left-2 bg-brand-orange text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                        {phone.offerBadge}
                      </div>
                    )}
                    {priceDrop && (
                      <div className="absolute bottom-2 right-2 bg-emerald-600/95 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border border-emerald-500/20">
                        <TrendingDown className="w-3 h-3 text-emerald-100" />
                        <span>-₹{priceDrop.dropAmount.toLocaleString('en-IN')} DROP</span>
                      </div>
                    )}
                    {/* Heart Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleWishlist?.(phone.id);
                      }}
                      className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md border shadow-sm transition-all z-20 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                        wishlist.includes(phone.id)
                          ? 'bg-rose-500 border-rose-500 text-white'
                          : 'bg-white/90 hover:bg-white border-slate-200 text-slate-400 hover:text-rose-500'
                      }`}
                      title={wishlist.includes(phone.id) ? "Remove from Saved" : "Save Handset"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${wishlist.includes(phone.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* AI Reasoning Sparkle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setReasoningPhone(phone);
                      }}
                      className="absolute top-[44px] right-2 p-1.5 rounded-full backdrop-blur-md border border-amber-200/80 bg-amber-50/95 text-amber-600 hover:text-white hover:bg-gradient-to-r hover:from-brand-orange hover:to-amber-500 hover:border-amber-500 shadow-sm transition-all z-20 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95"
                      title="Explain why this handset matches your persona"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                    </button>

                    {/* Social Media Share Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSharingPhoneId(sharingPhoneId === phone.id ? null : phone.id);
                      }}
                      className={`absolute top-[80px] right-2 p-1.5 rounded-full backdrop-blur-md border shadow-sm transition-all z-20 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                        sharingPhoneId === phone.id
                          ? 'bg-brand-blue border-brand-blue text-white'
                          : 'bg-white/90 hover:bg-white border-slate-200 text-slate-500 hover:text-brand-blue'
                      }`}
                      title="Share device recommendation"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Share Menu Overlay */}
                    <AnimatePresence>
                      {sharingPhoneId === phone.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-30 flex flex-col justify-between p-3.5"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black tracking-wider text-brand-orange uppercase flex items-center gap-1">
                              <span>📢</span> Share Handset
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSharingPhoneId(null);
                              }}
                              className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800/50 p-1 rounded-md"
                              title="Close share overlay"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>

                           <div className="space-y-1.5 my-auto">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setGeneratorPhone(phone);
                                setSharingPhoneId(null);
                              }}
                              className="w-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold py-1.5 px-2.5 rounded-lg text-[10px] tracking-tight transition-all flex items-center justify-center gap-1.5 shadow border border-brand-orange/20 animate-pulse cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3 fill-current" />
                              <span>🎨 Stylized AI Share Card</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const shareUrl = getShareUrl(phone.id);
                                const shareText = getShareText(phone);
                                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                                setSharingPhoneId(null);
                              }}
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-2.5 rounded-lg text-[10px] tracking-tight transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                            >
                              <span className="text-[11px]">💬</span> Share on WhatsApp
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const shareUrl = getShareUrl(phone.id);
                                const shareText = getShareText(phone);
                                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                                window.open(twitterUrl, '_blank', 'noopener,noreferrer');
                                setSharingPhoneId(null);
                              }}
                              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2.5 rounded-lg text-[10px] tracking-tight transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                            >
                              <span className="text-[11px]">🐦</span> Share on X / Twitter
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const shareUrl = getShareUrl(phone.id);
                                navigator.clipboard.writeText(shareUrl).then(() => {
                                  setCopiedPhoneId(phone.id);
                                  setTimeout(() => setCopiedPhoneId(null), 2000);
                                }).catch(err => {
                                  console.error("Could not copy text: ", err);
                                });
                              }}
                              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold py-1 px-2.5 rounded-lg text-[10px] tracking-tight transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                            >
                              {copiedPhoneId === phone.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Link Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-400" />
                                  <span>Copy Share Link</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="text-[9px] text-slate-400 font-medium text-center truncate">
                            Includes dynamic spec filters
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-display font-bold text-slate-900 text-sm">{phone.name}</h5>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{phone.color}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center gap-1.5 justify-end">
                        {priceDrop && (
                          <span className="font-mono text-[11px] text-slate-400 line-through font-medium">
                            ₹{priceDrop.previousPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <p className="font-mono text-sm font-black text-slate-900">₹{phone.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider mt-1.5 shadow-2xs select-none transition-all duration-500 ${
                        phone.price <= profileData.budgetLimit
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`} title={phone.price <= profileData.budgetLimit ? `This device fits perfectly within your typical profile budget of ₹${profileData.budgetLimit.toLocaleString('en-IN')}.` : `This is a premium upgrade above your typical profile budget of ₹${profileData.budgetLimit.toLocaleString('en-IN')}.`}>
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                          phone.price <= profileData.budgetLimit
                            ? 'bg-emerald-500 animate-pulse'
                            : 'bg-amber-500'
                        }`} />
                        {phone.price <= profileData.budgetLimit ? 'Within Budget' : 'Premium Tier'}
                      </div>
                    </div>
                  </div>

                  {/* Visual Budget Progress Bar */}
                  <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                      <span>Budget Usage</span>
                      <span className={`transition-colors duration-500 ${phone.price <= profileData.budgetLimit ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {Math.round((phone.price / profileData.budgetLimit) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          phone.price <= profileData.budgetLimit 
                            ? 'bg-emerald-500' 
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min((phone.price / profileData.budgetLimit) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                      <span>₹0</span>
                      <span>Limit: ₹{profileData.budgetLimit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                    <div className="flex justify-between">
                      <span>Processor:</span>
                      <span className="font-medium text-slate-700 max-w-[140px] truncate">{phone.specs.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Camera:</span>
                      <span className="font-medium text-slate-700 max-w-[140px] truncate">{phone.specs.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery:</span>
                      <span className="font-medium text-slate-700 max-w-[140px] truncate">{phone.specs.battery}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => onSelectPhone(phone)}
                    className="flex-1 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  >
                    Reserve Handset
                  </button>
                  <button
                    onClick={() => {
                      if (onToggleCompare) {
                        onToggleCompare(phone.id);
                      } else {
                        onSelectTab('Catalog');
                        setTimeout(() => {
                          const specSection = document.getElementById('specifications-compare');
                          if (specSection) specSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className={`px-3 border text-xs font-bold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 flex items-center gap-1.5 ${
                      comparedPhoneIds.includes(phone.id)
                        ? 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-700 focus:ring-blue-500 font-extrabold shadow-inner'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 focus:ring-slate-300'
                    }`}
                    title={comparedPhoneIds.includes(phone.id) ? "Remove from Compare Dashboard" : "Add to Compare Dashboard Instantly"}
                  >
                    {comparedPhoneIds.includes(phone.id) ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Comparing
                      </>
                    ) : (
                      'Quick Compare'
                    )}
                  </button>
                </div>
              </motion.div>
            );
            })}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
      </div>

      {/* Special Offer Coupons & Recently Viewed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dynamic Vouchers */}
        <div className="lg:col-span-8 space-y-4">
          <h4 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
            🎫 Premium Profile Vouchers & Coupons
          </h4>
          <motion.div 
            key={`${selectedProfile}-vouchers`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {profileData.specialOffers.map((off) => (
              <motion.div 
                key={off.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50/60 to-slate-50/40 border border-blue-100/60 p-4 rounded-2xl flex items-start gap-3 relative overflow-hidden"
              >
                <div className="p-2.5 rounded-xl bg-blue-100/60 text-brand-blue">
                  <Percent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1">
                    {off.title} <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">Active</span>
                  </h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{off.desc}</p>
                  <p className="text-[10px] font-mono text-brand-orange bg-orange-50 inline-block px-2 py-0.5 rounded border border-orange-100 font-black">
                    CODE: {off.code}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recently Viewed Panel */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" /> Recently Viewed
          </h4>
          <motion.div 
            key={`${selectedProfile}-recent`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl space-y-3"
          >
            {recentlyViewedPhones.map((phone) => (
              <motion.div 
                key={phone.id}
                variants={itemVariants}
                whileHover={{ x: 4, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                whileTap={{ scale: 0.985 }}
                className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all cursor-pointer"
              >
                <img 
                  src={phone.imageUrl} 
                  alt={phone.name} 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover bg-slate-50 border border-slate-100" 
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-slate-900 text-xs truncate">{phone.name}</h5>
                  <p className="text-[10px] text-slate-500 font-mono">₹{phone.price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => onSelectPhone(phone)}
                  className="p-1.5 text-[10px] font-black text-brand-blue hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                >
                  Reserve
                </button>
              </motion.div>
            ))}
            
            <button
              onClick={() => onSelectTab('Catalog')}
              className="w-full text-center text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors py-1 block mt-2"
            >
              ← Continue Browsing {profileData.continueBrowsingAction}
            </button>
          </motion.div>
        </div>
      </div>

      {/* AI Reasoning Modal */}
      <AiReasoningModal
        isOpen={!!reasoningPhone}
        onClose={() => setReasoningPhone(null)}
        phone={reasoningPhone}
        persona={selectedProfile}
      />

      {/* Stylized Persona Curation Card Generator Modal */}
      <PersonaCardGeneratorModal
        isOpen={!!generatorPhone}
        onClose={() => setGeneratorPhone(null)}
        phone={generatorPhone}
        persona={selectedProfile}
      />
    </div>
  );
}
