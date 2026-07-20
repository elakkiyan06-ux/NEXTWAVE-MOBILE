import React, { useState } from 'react';
import { 
  X, Camera, Battery, Cpu, Monitor, Zap, HardDrive, Shield, 
  Star, Heart, GitCompare, CalendarCheck, CheckCircle2, Award, 
  ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCw, ChevronRight, HelpCircle
} from 'lucide-react';
import { Smartphone } from '../types';

interface PhoneDetailPageProps {
  phone: Smartphone | null;
  onBack: () => void;
  onReserve: (phone: Smartphone) => void;
  onToggleWishlist: (phoneId: string) => void;
  onToggleCompare: (phoneId: string) => void;
  isSaved: boolean;
  isCompared: boolean;
}

export default function PhoneDetailPage({
  phone,
  onBack,
  onReserve,
  onToggleWishlist,
  onToggleCompare,
  isSaved,
  isCompared
}: PhoneDetailPageProps) {
  const [selectedTab, setSelectedTab] = useState<'specs' | 'offers' | 'reviews'>('specs');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  if (!phone) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 font-medium">No phone selected. Please return to the homepage.</p>
        <button 
          onClick={onBack}
          className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Calculate simulated reviews breakdown
  const reviewScore = phone.rating;
  const totalReviews = phone.reviewCount || 128;
  const originalPrice = phone.originalPrice || Math.round(phone.price * 1.15);
  const discountAmount = originalPrice - phone.price;
  const discountPercent = Math.round((discountAmount / originalPrice) * 100);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-16">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap py-1">
            <span className="hover:text-indigo-600 cursor-pointer" onClick={onBack}>Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="hover:text-indigo-600 cursor-pointer" onClick={onBack}>Smartphones</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-400">{phone.brand}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold truncate">{phone.name}</span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black text-slate-700 bg-white border border-slate-200/80 px-4 py-2 rounded-xl hover:bg-slate-50 shadow-sm transition-all self-start cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>Back to Store Catalog</span>
          </button>
        </div>

        {/* Flipkart / Amazon Main Two-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Gallery & Immediate Action Buttons */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm sticky top-24 space-y-6">
            
            {/* Tag/Offer indicators */}
            <div className="flex items-center justify-between">
              {phone.offerBadge ? (
                <span className="bg-brand-orange text-slate-950 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                  🔥 {phone.offerBadge}
                </span>
              ) : (
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full">
                  ⭐ Top Rated Choice
                </span>
              )}

              <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                phone.stockStatus === 'In Stock'
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : phone.stockStatus === 'Limited Stock'
                  ? 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'
                  : 'bg-rose-50 text-rose-600 border border-rose-100'
              }`}>
                {phone.stockStatus === 'In Stock' ? '🟢 In Stock' : phone.stockStatus === 'Limited Stock' ? `🟡 Low Stock (${phone.stockQuantity || 3} Left)` : '🔴 Out of Stock'}
              </span>
            </div>

            {/* Immersive Image Display */}
            <div className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center min-h-[320px] relative overflow-hidden group">
              <img
                src={phone.imageUrl}
                alt={phone.name}
                referrerPolicy="no-referrer"
                className="max-h-64 sm:max-h-72 object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-4 gap-3">
              {[phone.imageUrl, phone.imageUrl, phone.imageUrl, phone.imageUrl].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`border-2 rounded-xl p-2 bg-slate-50/50 flex items-center justify-center h-16 transition-all ${
                    activeImageIdx === idx ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="max-h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Immediate Buy/Reserve & Tools CTA Bar */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={() => onReserve(phone)}
                disabled={phone.stockStatus === 'Out of Stock'}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100/50 disabled:text-slate-400 text-white font-extrabold py-4 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <CalendarCheck className="w-5 h-5 text-emerald-400" />
                <span className="uppercase tracking-wider">Reserve For In-Store Pickup</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                {/* Compare Action */}
                <button
                  type="button"
                  onClick={() => onToggleCompare(phone.id)}
                  className={`py-3 px-4 border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-bold text-xs ${
                    isCompared
                      ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue scale-[1.02] shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <GitCompare className="w-4.5 h-4.5" />
                  <span>{isCompared ? 'Compared ✓' : 'Add to Compare'}</span>
                </button>

                {/* Wishlist Action */}
                <button
                  type="button"
                  onClick={() => onToggleWishlist(phone.id)}
                  className={`py-3 px-4 border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-bold text-xs ${
                    isSaved
                      ? 'bg-rose-50 border-rose-200 text-rose-500 fill-rose-500 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'In Wishlist ✓' : 'Save to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* NextWave Store Logistics Info */}
            <div className="bg-indigo-50/40 border border-indigo-100/40 rounded-2xl p-4.5 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-extrabold text-slate-800">FREE Same-Day Collection</p>
                  <p className="text-slate-400 mt-0.5">Reserve online, pay & pick up in Chennai store within 1 hr.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-indigo-100/30">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-extrabold text-slate-800">100% Original & Brand New</p>
                  <p className="text-slate-400 mt-0.5">Includes official manufacturer warranty & box accessories.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Rich Specification Details, Tab view, Pricing */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Brand Header */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{phone.brand}</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900 mt-1 leading-tight">{phone.name}</h1>
                <p className="text-xs text-slate-400 font-semibold mt-1">Official Chennai Showroom Model ({phone.color})</p>
              </div>

              {/* Star reviews rating bar */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1.5">
                <div className="flex items-center gap-1 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-current" /> {phone.rating}
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  <span className="text-slate-700 underline">{totalReviews} Ratings</span> & <span className="text-slate-700 underline">42 Answered FAQs</span>
                </div>
              </div>
            </div>

            {/* Amazon / Flipkart Style Pricing Block */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">NextWave Special Local Retail Price</p>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-3xl sm:text-4xl font-display font-black text-slate-900">₹{phone.price.toLocaleString()}</span>
                  <span className="text-sm sm:text-base text-slate-400 line-through">₹{originalPrice.toLocaleString()}</span>
                  <span className="text-sm sm:text-base text-emerald-600 font-black">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">
                  🎉 You save ₹{discountAmount.toLocaleString()} today! (Price inclusive of all taxes)
                </p>
              </div>

              {/* Bank Promo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="border border-indigo-100 bg-indigo-50/20 rounded-2xl p-4 space-y-1">
                  <p className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    💳 Bank Credit Offer
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Flat ₹6,000 instant discount on HDFC bank credit cards.
                  </p>
                </div>
                <div className="border border-orange-100 bg-orange-50/20 rounded-2xl p-4 space-y-1">
                  <p className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    🔄 Old Handset Exchange
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Get up to ₹24,000 off on exchange of your old smartphone in store.
                  </p>
                </div>
              </div>

              {/* No Cost EMI Promo */}
              <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200/50 flex items-center justify-between text-xs text-slate-600">
                <div>
                  <span className="font-extrabold text-slate-800">No Cost EMI starts from ₹6,650/month</span>
                  <p className="text-slate-400 mt-0.5">Available on all major credit cards. Tap to calculate plans.</p>
                </div>
                <span className="text-[10px] bg-slate-900 text-white font-black px-3 py-1 rounded-lg uppercase tracking-wide">
                  Calculate EMI
                </span>
              </div>
            </div>

            {/* TAB SELECTOR: Specs, Store Offers, Customer Reviews */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex border-b border-slate-100 pb-3 gap-6">
                {[
                  { id: 'specs', label: 'Technical Specs' },
                  { id: 'offers', label: 'Store Benefits' },
                  { id: 'reviews', label: 'User Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`text-xs sm:text-sm font-black pb-2 transition-all relative cursor-pointer ${
                      selectedTab === tab.id 
                        ? 'text-indigo-600' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab.label}
                    {selectedTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT: Specs Table */}
              {selectedTab === 'specs' && (
                <div className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: <Camera className="w-4.5 h-4.5 text-indigo-600" />, label: 'Rear/Front Camera', value: phone.specs.camera },
                      { icon: <Cpu className="w-4.5 h-4.5 text-indigo-600" />, label: 'Chipset & Performance', value: phone.specs.processor },
                      { icon: <Battery className="w-4.5 h-4.5 text-indigo-600" />, label: 'Battery Capacity', value: phone.specs.battery },
                      { icon: <Monitor className="w-4.5 h-4.5 text-indigo-600" />, label: 'Screen Display Panel', value: phone.specs.display },
                      { icon: <Zap className="w-4.5 h-4.5 text-indigo-600" />, label: 'Wired/Wireless Charging', value: phone.specs.charging },
                      { icon: <HardDrive className="w-4.5 h-4.5 text-indigo-600" />, label: 'Storage Options', value: phone.specs.storage },
                      { icon: <Shield className="w-4.5 h-4.5 text-indigo-600" />, label: 'Store/Brand Warranty', value: phone.specs.warranty }
                    ].map((spec, i) => (
                      <div key={i} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex gap-3">
                        <div className="p-2 bg-white rounded-xl border border-slate-200/50 shadow-sm shrink-0 self-start">
                          {spec.icon}
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{spec.label}</p>
                          <p className="text-xs font-bold text-slate-800 leading-tight mt-1">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Standard Amazon/Flipkart specifications table */}
                  <div className="pt-6">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">General Information</h3>
                    <table className="w-full text-xs text-slate-600 border-collapse">
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 font-bold text-slate-400 w-1/3">Model Name</td>
                          <td className="py-3 font-semibold text-slate-800">{phone.name}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 font-bold text-slate-400">Brand Series</td>
                          <td className="py-3 font-semibold text-slate-800">{phone.brand}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 font-bold text-slate-400">Device Finish</td>
                          <td className="py-3 font-semibold text-slate-800">{phone.color}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 font-bold text-slate-400">Box Contents</td>
                          <td className="py-3 font-semibold text-slate-800">Smartphone, USB-C Charging cable, Documentation, Warranty pamphlet</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold text-slate-400">Sustainability Index</td>
                          <td className="py-3 font-extrabold text-emerald-600">Eco Score: 88/100 (Highly Recyclable parts)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Store Benefits */}
              {selectedTab === 'offers' && (
                <div className="pt-6 space-y-4">
                  <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                    <p className="font-extrabold text-slate-800 text-sm">NextWave continuous Support desk benefits:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Free Setup & Migration', desc: 'Complete transfer of contacts, chat backups (WhatsApp/iMessage), and photos.', icon: <Award className="w-4.5 h-4.5 text-indigo-500" /> },
                        { title: 'Complimentary Glass Guard', desc: 'Premium tempered glass protection fitted expertly on screen upon receipt.', icon: <CheckCircle2 className="w-4.5 h-4.5 text-indigo-500" /> },
                        { title: 'Warranty Claim Assistance', desc: 'We take the burden of dealing with service centers if anything breaks.', icon: <ShieldCheck className="w-4.5 h-4.5 text-indigo-500" /> },
                        { title: 'Priority 24h Reservation Hold', desc: 'Secure the price and model for a full 24 hours without paying a rupee.', icon: <CalendarCheck className="w-4.5 h-4.5 text-indigo-500" /> }
                      ].map((offer, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 self-start">
                            {offer.icon}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{offer.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{offer.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Reviews */}
              {selectedTab === 'reviews' && (
                <div className="pt-6 space-y-6">
                  {/* Rating Breakdown */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50">
                    <div className="text-center sm:border-r sm:border-slate-200 sm:pr-8">
                      <p className="text-4xl font-display font-black text-slate-800">{phone.rating}</p>
                      <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(reviewScore) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5">Average Customer Rating</p>
                    </div>

                    <div className="flex-grow w-full space-y-1.5 text-xs">
                      {[
                        { stars: 5, pct: 82 },
                        { stars: 4, pct: 12 },
                        { stars: 3, pct: 4 },
                        { stars: 2, pct: 1 },
                        { stars: 1, pct: 1 }
                      ].map((row) => (
                        <div key={row.stars} className="flex items-center gap-3">
                          <span className="w-3 text-right font-bold text-slate-400">{row.stars}</span>
                          <Star className="w-3 h-3 text-slate-400 fill-current" />
                          <div className="flex-grow h-2 bg-slate-200/60 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${row.pct}%` }} />
                          </div>
                          <span className="w-8 text-right text-slate-400 font-bold">{row.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer comments */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Top Critical Reviews from Chennai Buyers</h4>
                    {[
                      { author: 'Ramesh Kumar (Adyar, Chennai)', rating: 5, date: '2 days ago', title: 'Flawless purchasing experience!', comment: 'Reserved the phone in the morning, came down at 2 PM, and the phone was ready with my pre-saved tempered glass. Ramesh fitted it flawlessly. Highly recommended local shop!' },
                      { author: 'Divya S. (Velachery, Chennai)', rating: 5, date: '1 week ago', title: 'Cheaper than Amazon online prices', comment: 'Surprised to find they match and even beat online portal prices after factoring in HDFC card discounts. The staff is polite, zero waiting time, set up my WhatsApp in 10 minutes.' }
                    ].map((rev, index) => (
                      <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800">{rev.author}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                          <span className="text-xs font-black text-slate-800 ml-1.5">{rev.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
