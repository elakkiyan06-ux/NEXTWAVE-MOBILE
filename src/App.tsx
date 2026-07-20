import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SMARTPHONES, ACCESSORIES } from './data';
import { Smartphone, Reservation } from './types';
import { 
  Sparkles, ShieldCheck, Clock, Check, ArrowRight, PhoneCall, 
  MapPin, HelpCircle, Star, Search, RefreshCw, Send, 
  Smartphone as PhoneIcon, MessageSquare, Wrench, Laptop, 
  Tv, Battery, Layers, Info, Award, AlertTriangle, ChevronRight,
  TrendingUp, CreditCard, Gift, Users, ExternalLink, Menu, X, Home, Heart, User,
  Mic, Camera, Tag, Percent, Facebook, Instagram, Mail, Phone, Twitter, CalendarCheck, GitCompare
} from 'lucide-react';

// Sub-components
import AiChatAssistant from './components/AiChatAssistant';
import StoreWalkthrough from './components/StoreWalkthrough';
import PriceTransparency from './components/PriceTransparency';
import EmiCalculator from './components/EmiCalculator';
import ExchangeEstimator from './components/ExchangeEstimator';
import CompareSection from './components/CompareSection';
import AccessoriesSection from './components/AccessoriesSection';
import ReservationModal from './components/ReservationModal';
import WishlistDrawer from './components/WishlistDrawer';
import ReservationsDrawer from './components/ReservationsDrawer';
import CustomerProfileModal from './components/CustomerProfileModal';
import PhoneDetailModal from './components/PhoneDetailModal';
import PhoneDetailPage from './components/PhoneDetailPage';

// AI Modules
import AiPersonalizedHomepage from './components/AiPersonalizedHomepage';
import GreenPhoneScore from './components/GreenPhoneScore';
import GreenPhoneHoverCard from './components/GreenPhoneHoverCard';
import ArViewModelModal from './components/ArViewModelModal';

// Glass-morphic shimmer skeleton loaders
function SmartphoneSkeletonCard() {
  return (
    <div className="glass-card rounded-[24px] p-6 flex flex-col justify-between space-y-5 shadow-sm animate-pulse relative overflow-hidden">
      <div className="space-y-4">
        {/* Image holder with premium glow */}
        <div className="relative h-52 bg-slate-200/50 rounded-2xl overflow-hidden border border-white/20 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-300/40 animate-pulse" />
        </div>
        
        {/* Title and Rating Row */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 w-1/3 bg-slate-300/50 rounded-full animate-pulse" />
            <div className="h-4 w-12 bg-slate-200/50 rounded-full animate-pulse" />
          </div>
          <div className="h-6 w-3/4 bg-slate-300/70 rounded-lg animate-pulse" />
        </div>

        {/* Pricing placeholder */}
        <div className="h-5 w-24 bg-slate-300/80 rounded-md animate-pulse" />

        {/* Specs snippet placeholder */}
        <div className="space-y-2 pt-4 border-t border-slate-200/60 text-xs">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-slate-200/60 animate-pulse" />
            <div className="h-3 w-1/2 bg-slate-200/50 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-slate-200/60 animate-pulse" />
            <div className="h-3 w-2/3 bg-slate-200/50 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-slate-200/60 animate-pulse" />
            <div className="h-3 w-5/12 bg-slate-200/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
        <div className="h-11 flex-1 bg-slate-300/70 rounded-xl animate-pulse" />
        <div className="h-11 px-5 bg-slate-200/50 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

function DashboardPanelSkeleton() {
  return (
    <div className="bg-white/50 backdrop-blur-md border border-white/40 rounded-[32px] p-6 md:p-8 shadow-xl relative overflow-hidden animate-pulse min-h-[460px] flex flex-col justify-between">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] bg-blue-100/25 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-orange-100/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="space-y-6 relative z-10">
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-7 w-64 bg-slate-300/60 rounded-xl animate-pulse" />
            <div className="h-3.5 w-96 max-w-full bg-slate-200/50 rounded-lg animate-pulse" />
          </div>
          <div className="h-8 w-28 bg-slate-200/60 rounded-xl shrink-0 animate-pulse" />
        </div>

        {/* Dynamic Bento-Grid Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-4 bg-white/40 p-5 rounded-2xl border border-white/30">
            <div className="h-4.5 w-1/4 bg-slate-300/50 rounded-md animate-pulse" />
            <div className="h-28 bg-slate-200/30 rounded-xl animate-pulse" />
            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full bg-slate-200/40 rounded-md animate-pulse" />
              <div className="h-3.5 w-11/12 bg-slate-200/40 rounded-md animate-pulse" />
              <div className="h-3.5 w-3/4 bg-slate-200/40 rounded-md animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-4 bg-white/40 p-5 rounded-2xl border border-white/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-4.5 w-1/2 bg-slate-300/50 rounded-md animate-pulse" />
              <div className="h-3.5 w-5/6 bg-slate-200/40 rounded-md animate-pulse" />
              <div className="h-3.5 w-2/3 bg-slate-200/40 rounded-md animate-pulse" />
            </div>
            <div className="h-10 bg-slate-200/50 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Footnotes placeholder */}
        <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/30">
          <div className="h-3 w-1/4 bg-slate-200/40 rounded-md animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-white/30 rounded-xl border border-white/20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200/30">
        <div className="h-10 w-24 bg-slate-200/40 rounded-xl animate-pulse" />
        <div className="h-10 w-32 bg-slate-300/60 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function App() {
  // Page state for separate tab views
  const [activePage, setActivePage] = useState<'home' | 'phones' | 'accessories' | 'livestock' | 'compare' | 'offers' | 'emi' | 'services' | 'store' | 'phone-detail'>('home');
  const [heroPhoneId, setHeroPhoneId] = useState<string>('iphone-16-pro-max');

  // Navigation active tab highlighting on scroll could be added, but simple hash scrolling works perfect.
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<string>('All');
  
  // Tab switcher state for the premium Decision Platform Workspace
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>('PersonalizedHome');
  
  // Shared profile state for user persona, synchronized across the workspace
  const [selectedProfile, setSelectedProfile] = useState<'Student' | 'Professional' | 'Photographer' | 'Business'>('Student');
  const [autoStartVoiceAssistant, setAutoStartVoiceAssistant] = useState<boolean>(false);
  const [voiceAssistantQueryType, setVoiceAssistantQueryType] = useState<'profile' | 'general'>('general');
  
  // Track the most recent reserved phone to dynamically chart 2D showroom routing path
  const [lastReservedPhone, setLastReservedPhone] = useState<Smartphone | null>(null);

  // Wishlist / Saved Items Feature State (persists to localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('sm_wishlist');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isReservationsDrawerOpen, setIsReservationsDrawerOpen] = useState<boolean>(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedDetailPhone, setSelectedDetailPhone] = useState<Smartphone | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [myReservations, setMyReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('sm_my_reservations');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sm_my_reservations', JSON.stringify(myReservations));
  }, [myReservations]);

  const handleCancelReservation = (resId: string) => {
    setMyReservations(prev => prev.filter(r => r.id !== resId));
    setRecentReservations(prev => prev.filter(r => r.id !== resId));
    setNotification('Reservation cancelled successfully.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleShowroomRoute = (phoneId: string) => {
    const phoneObj = SMARTPHONES.find(p => p.id === phoneId);
    if (phoneObj) {
      setLastReservedPhone(phoneObj);
      setActiveDashboardTab('FloorMap');
      const floorSection = document.getElementById('decision-hub');
      if (floorSection) {
        floorSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleWishlist = (phoneId: string) => {
    setWishlist(prev => {
      if (prev.includes(phoneId)) {
        return prev.filter(id => id !== phoneId);
      }
      return [...prev, phoneId];
    });
  };
  
  // Comparison Feature State
  const [comparedPhoneIds, setComparedPhoneIds] = useState<string[]>([]);
  const [isCompareSummaryOpen, setIsCompareSummaryOpen] = useState<boolean>(false);
  const [compareNotification, setCompareNotification] = useState<string | null>(null);

  // Glass-morphic Loading State hooks
  const [isCatalogLoading, setIsCatalogLoading] = useState<boolean>(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState<boolean>(false);

  const toggleCompare = (phoneId: string) => {
    setComparedPhoneIds(prev => {
      if (prev.includes(phoneId)) {
        return prev.filter(id => id !== phoneId);
      }
      if (prev.length >= 3) {
        setCompareNotification("You can select up to 3 smartphones for comparative analysis!");
        setTimeout(() => setCompareNotification(null), 4000);
        return prev;
      }
      return [...prev, phoneId];
    });
  };
  
  // Reservation Modal state
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [targetPhone, setTargetPhone] = useState<Smartphone | null>(null);

  // AR 3D View Modal state
  const [isArOpen, setIsArOpen] = useState<boolean>(false);
  const [arTargetPhone, setArTargetPhone] = useState<Smartphone | null>(null);

  // Active reservations ticker/live updates (adds real-time feel!)
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Flash Sale Countdown State
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 42, seconds: 18 });

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Affordability Active Tab State
  const [affordabilityTab, setAffordabilityTab] = useState<'calculator' | 'exchange' | 'plans'>('calculator');

  // Floating back to top show state
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Floating AI Chat Assistant state
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState<boolean>(false);

  // Dynamic scrolling state for premium floating navigation look
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Fetch recent reservations and force-reset state on mount
  useEffect(() => {
    // Reset state to default Curated Home tab and clear all search/filters on initial mount/refresh
    setActiveDashboardTab('PersonalizedHome');
    setSelectedBrand('All');
    setSearchQuery('');
    setStockFilter('All');
    
    // Smoothly scroll window to absolute top to guarantee starting from first
    window.scrollTo({ top: 0, left: 0 });
    
    // Clear URL hash cleanly on refresh to start fresh
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }

    const fetchReservations = async () => {
      try {
        const res = await fetch('/api/reservations');
        if (res.ok) {
          const data = await res.json();
          setRecentReservations(data);
        }
      } catch (err) {
        console.error('Failed to load reservations:', err);
      }
    };
    fetchReservations();

    // Setup an interval to decrement countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // reset
        }
      });
    }, 1000);

    // Watch scroll position to show back to top home button and style floating navbar
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simulate active loading effect for filters to show premium shimmer skeleton loaders
  useEffect(() => {
    setIsCatalogLoading(true);
    const timer = setTimeout(() => {
      setIsCatalogLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [selectedBrand, searchQuery, stockFilter]);

  // Simulate active loading effect for dashboard workspace tab changes
  useEffect(() => {
    setIsDashboardLoading(true);
    const timer = setTimeout(() => {
      setIsDashboardLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeDashboardTab]);

  const handleTriggerVoiceProfileSwitch = () => {
    // Cycle profile directly
    const profiles: ('Student' | 'Professional' | 'Photographer' | 'Business')[] = ['Student', 'Professional', 'Photographer', 'Business'];
    const currentIndex = profiles.indexOf(selectedProfile);
    const nextProfile = profiles[(currentIndex + 1) % profiles.length];
    setSelectedProfile(nextProfile);
    
    // Show a quick notification
    setNotification(`Simulated Voice: Switched active profile to ${nextProfile}!`);
    setTimeout(() => {
      setNotification(null);
    }, 4000);

    // Smooth scroll workspace hub into center view
    setTimeout(() => {
      document.getElementById('decision-hub')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleOpenReservation = (phone: Smartphone) => {
    setTargetPhone(phone);
    setIsReservationOpen(true);
  };

  const handleReservationSuccess = (newRes: Reservation) => {
    setRecentReservations(prev => [newRes, ...prev]);
    setMyReservations(prev => [newRes, ...prev]);
    
    const reservedPhoneObj = SMARTPHONES.find(p => p.id === newRes.phoneId);
    if (reservedPhoneObj) {
      setLastReservedPhone(reservedPhoneObj);
      // Auto-focus the Floor Map tab to demonstrate live unboxing pickup routing
      setActiveDashboardTab('FloorMap');
    }

    setNotification(`Successfully reserved the ${reservedPhoneObj?.name || 'Handset'}! Code: ${newRes.id}`);
    
    // Auto clear notification after 6 seconds
    setTimeout(() => {
      setNotification(null);
    }, 6000);
    
    setIsReservationOpen(false);
  };

  const handleScrollToTop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMobileMenuOpen(false);
    setActivePage('home');
    
    // Reset state to default Curated Home tab and clear all search/filters
    setActiveDashboardTab('PersonalizedHome');
    setSelectedBrand('All');
    setSearchQuery('');
    setStockFilter('All');
    
    // Clear URL hash cleanly
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMobileMenuOpen(false);
    
    let targetPage: 'home' | 'phones' | 'accessories' | 'livestock' | 'compare' | 'offers' | 'emi' | 'services' | 'store' = 'home';
    if (id === 'smartphones') {
      targetPage = 'phones';
      setSelectedBrand('All');
      setSearchQuery('');
    } else if (id === 'accessories') {
      targetPage = 'accessories';
    } else if (id === 'live-stock') {
      targetPage = 'livestock';
    } else if (id === 'compare-phones') {
      targetPage = 'compare';
    } else if (id === 'offers') {
      targetPage = 'offers';
    } else if (id === 'emi-calculator' || id === 'exchange-estimator') {
      targetPage = 'offers';
    } else if (id === 'support-services') {
      targetPage = 'services';
    } else if (id === 'store-locator' || id === 'floor-map-section') {
      targetPage = 'store';
    }

    setActivePage(targetPage);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 120);
  };

  // Filter smartphones based on brand tab, search query, and stock status
  const filteredSmartphones = SMARTPHONES.filter(phone => {
    const matchesBrand = selectedBrand === 'All' || phone.brand === selectedBrand;
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phone.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = stockFilter === 'All' || 
                         (stockFilter === 'In Stock' && phone.stockStatus === 'In Stock') ||
                         (stockFilter === 'Limited Stock' && phone.stockStatus === 'Limited Stock');
    return matchesBrand && matchesSearch && matchesStock;
  });

  const heroPhone = SMARTPHONES.find(p => p.id === heroPhoneId) || SMARTPHONES[0];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-orange selection:text-white relative overflow-x-hidden bg-slate-50/50">
      {/* Dynamic mesh gradient background elements for Frosted Glass theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-200/25 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-orange-100/30 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-indigo-100/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[30%] left-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-blue-100/20 blur-[130px] rounded-full" />
      </div>

      {/* 1. Header Alert Bar */}
      <div className="relative z-10 bg-slate-900 text-slate-300 py-2.5 px-4 text-xs font-semibold text-center flex items-center justify-center gap-2 flex-wrap border-b border-slate-800">
        <span className="bg-brand-orange text-slate-950 font-extrabold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">Festival Offer</span>
        <span>Get up to ₹10,000 extra exchange bonus + No-Cost EMI on selected smartphone series!</span>
        <a href="#offers" onClick={(e) => handleScrollToSection('offers', e)} className="text-white underline hover:text-brand-orange flex items-center gap-1">View Offers <ChevronRight className="w-3.5 h-3.5" /></a>
      </div>

      {/* 2. Floating Navigation Bar Spacer to preserve content flow */}
      <div className="h-28 sm:h-32" />

      {/* 3. Fixed Floating Navigation Bar */}
      <header 
        className={`fixed left-1/2 -translate-x-1/2 transition-all duration-300 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl backdrop-blur-md border ${
          isScrolled 
            ? 'top-2 sm:top-3 bg-white/95 border-slate-200/80 shadow-xl shadow-slate-100/50 rounded-xl sm:rounded-2xl' 
            : 'top-13 sm:top-15 bg-white/90 border-white/30 shadow-md rounded-2xl sm:rounded-[24px]'
        }`}
      >
        <div className={`px-2.5 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
        }`}>
          {/* Logo upgraded to match screenshot */}
          <a href="#" onClick={handleScrollToTop} className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-display font-black shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all text-base sm:text-lg shrink-0">
              M
            </div>
            <div>
              <span className="font-display font-extrabold text-slate-900 tracking-tight text-sm sm:text-base md:text-lg block leading-none">NextWave Mobiles</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 tracking-wider uppercase font-black hidden sm:block mt-1">YOUR LOCAL MOBILE EXPERT</span>
            </div>
          </a>

          {/* Desktop Unified Search Pill matching screenshot - beautifully responsive and shrink-0 to prevent overlap */}
          <div className="hidden lg:flex items-center bg-slate-50 hover:bg-slate-100/60 border border-slate-200/60 rounded-full py-1.5 pl-3 pr-1.5 w-44 lg:w-56 xl:w-72 2xl:w-80 shadow-inner relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white focus-within:border-indigo-500 transition-all mx-2 lg:mx-4 shrink-0">
            <Mic className="w-4 h-4 text-slate-400 mr-2 shrink-0 cursor-pointer hover:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search phones, accessories, brands..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'phones' && activePage !== 'livestock') {
                  setActivePage('phones');
                }
              }}
              className="w-full bg-transparent text-slate-800 text-xs focus:outline-none placeholder-slate-400 font-medium"
            />
            <div className="flex items-center gap-2 shrink-0">
              <Camera className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
              <button 
                onClick={() => {
                  if (activePage !== 'phones') setActivePage('phones');
                }}
                className="w-7 h-7 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop Links - Beautifully adjusted to appear on lg and xl screens with responsive spacing */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs font-bold text-slate-600 shrink-0">
            <a href="#" onClick={handleScrollToTop} className={`transition-all hover:text-indigo-600 relative py-1 ${activePage === 'home' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
              Home
            </a>
            <a href="#smartphones" onClick={(e) => handleScrollToSection('smartphones', e)} className={`transition-all hover:text-indigo-600 relative py-1 ${activePage === 'phones' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
              Mobiles
            </a>
            <a href="#accessories" onClick={(e) => handleScrollToSection('accessories', e)} className={`transition-all hover:text-indigo-600 relative py-1 ${activePage === 'accessories' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
              Accessories
            </a>
            <a href="#live-stock" onClick={(e) => handleScrollToSection('live-stock', e)} className={`transition-all hover:text-indigo-600 relative py-1 ${activePage === 'livestock' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
              Live Stock
            </a>
            <a href="#offers" onClick={(e) => handleScrollToSection('offers', e)} className={`transition-all hover:text-indigo-600 relative py-1 ${activePage === 'offers' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
              Offers
            </a>
            <a href="#store-locator" onClick={(e) => handleScrollToSection('store-locator', e)} className={`transition-all hover:text-indigo-600 relative py-1 ${activePage === 'store' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
              Contact Us
            </a>
          </nav>

          {/* CTA Button and Wishlist / Account */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Desktop-only controls wrapper */}
            <div className="hidden lg:flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Saved Wishlist Button with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all border border-rose-100 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono font-black text-[8px] sm:text-[9px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Reserved Items Button with Badge */}
            <button
              onClick={() => setIsReservationsDrawerOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              title="My Reservations"
            >
              <CalendarCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {myReservations.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white font-mono font-black text-[8px] sm:text-[9px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {myReservations.length}
                </span>
              )}
            </button>

            {/* Premium User Account Logo & Info Dropdown */}
            <div className="relative animate-in fade-in duration-200">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="relative p-1 border border-slate-200/80 rounded-xl bg-white hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-sm shrink-0"
                title="My Account"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-black text-sm shadow-md shadow-blue-500/10 shrink-0">
                    N
                  </div>
                  {/* Live Online Badge indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
              </button>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10 cursor-default" 
                      onClick={() => setIsAccountMenuOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 shadow-xl z-20"
                    >
                      {/* Member Info - Clickable to open detailed profile */}
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full flex items-center gap-3 pb-3 border-b border-slate-100 mb-3 text-left hover:bg-slate-50 p-1.5 rounded-xl transition-all cursor-pointer group"
                        title="View Detailed Customer Profile"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-black text-sm shadow-md shadow-blue-500/15">
                          N
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-black text-slate-800 text-sm group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                            Nithin Jee <span className="text-[10px] text-indigo-500 font-medium">(View Profile)</span>
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">nithinjee07@gmail.com</p>
                        </div>
                      </button>

                      {/* View Detailed Profile Link Button */}
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 mb-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-black rounded-xl transition-all cursor-pointer border border-indigo-100"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>View Detailed Profile</span>
                      </button>

                      {/* Loyalty & Status Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-left">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Membership</span>
                          <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1 mt-0.5">
                            👑 Gold Tier
                          </span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-left">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Smart Coins</span>
                          <span className="text-xs font-extrabold text-indigo-600 mt-0.5 block">
                            🪙 1,250 S-Coins
                          </span>
                        </div>
                      </div>

                      {/* Special Elite Benefits list */}
                      <div className="space-y-2 mb-3">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Store Perks</p>
                        <div className="space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Free Express Home Delivery</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Extra ₹5,000 Trade-In Bonus</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>0% Interest Instant EMI Plans</span>
                          </div>
                        </div>
                      </div>

                      {/* Store Quick Actions */}
                      <div className="pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            setIsWishlistOpen(true);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl transition-all cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> Saved Wishlist
                          </span>
                          <span className="bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full text-[10px] font-mono">
                            {wishlist.length}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" /> : <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>



      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 h-screen w-[320px] max-w-[90vw] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-blue flex items-center justify-center text-white font-black text-sm shadow-sm shadow-blue-500/20">
                    SM
                  </div>
                  <span className="font-display font-black text-slate-800 tracking-tight text-base">
                    Smart Mobiles
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all border border-slate-200/60 flex items-center justify-center cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-2 text-sm font-semibold text-slate-700">
                <a 
                  href="#" 
                  onClick={(e) => {
                    handleScrollToTop(e);
                  }} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'home' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <Layers className={`w-4.5 h-4.5 transition-colors ${activePage === 'home' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Home</span>
                </a>
                <a 
                  href="#smartphones" 
                  onClick={(e) => handleScrollToSection('smartphones', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'phones' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <PhoneIcon className={`w-4.5 h-4.5 transition-colors ${activePage === 'phones' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Phones</span>
                </a>
                <a 
                  href="#accessories" 
                  onClick={(e) => handleScrollToSection('accessories', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'accessories' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <Tag className={`w-4.5 h-4.5 transition-colors ${activePage === 'accessories' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Accessories</span>
                </a>
                <a 
                  href="#live-stock" 
                  onClick={(e) => handleScrollToSection('live-stock', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'livestock' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <TrendingUp className={`w-4.5 h-4.5 transition-colors ${activePage === 'livestock' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Live Stock</span>
                </a>
                <a 
                  href="#offers" 
                  onClick={(e) => handleScrollToSection('offers', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'offers' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <Gift className={`w-4.5 h-4.5 transition-colors ${activePage === 'offers' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Offers</span>
                </a>
                <a 
                  href="#emi-calculator" 
                  onClick={(e) => handleScrollToSection('emi-calculator', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'offers' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <CreditCard className={`w-4.5 h-4.5 transition-colors ${activePage === 'offers' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>EMI Plans</span>
                </a>
                <a 
                  href="#support-services" 
                  onClick={(e) => handleScrollToSection('support-services', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'services' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <Wrench className={`w-4.5 h-4.5 transition-colors ${activePage === 'services' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Services</span>
                </a>
                <a 
                  href="#store-locator" 
                  onClick={(e) => handleScrollToSection('store-locator', e)} 
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activePage === 'store' ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-slate-50 hover:text-brand-blue'}`}
                >
                  <MapPin className={`w-4.5 h-4.5 transition-colors ${activePage === 'store' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  <span>Contact Us</span>
                </a>

                {/* Saved Wishlist Mobile Link */}
                <button 
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="group w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-rose-50/50 hover:text-rose-600 transition-all text-left font-semibold cursor-pointer text-slate-700"
                >
                  <div className="flex items-center gap-3.5">
                    <Heart className="w-4.5 h-4.5 text-slate-400 group-hover:text-rose-500 transition-colors fill-current" />
                    <span>Saved Wishlist</span>
                  </div>
                  {wishlist.length > 0 && (
                    <span className="bg-rose-500 text-white font-mono font-black text-xs px-2 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* My Reservations Mobile Link */}
                <button 
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsReservationsDrawerOpen(true);
                  }}
                  className="group w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-indigo-50/50 hover:text-indigo-600 transition-all text-left font-semibold cursor-pointer text-slate-700"
                >
                  <div className="flex items-center gap-3.5">
                    <CalendarCheck className="w-4.5 h-4.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span>My Reservations</span>
                  </div>
                  {myReservations.length > 0 && (
                    <span className="bg-indigo-600 text-white font-mono font-black text-xs px-2 py-0.5 rounded-full">
                      {myReservations.length}
                    </span>
                  )}
                </button>

                {/* Personal Profile Details Card inside Mobile Drawer */}
                <div className="pt-4 border-t border-slate-100 mt-4 px-4 pb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">My Account Status</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full text-left bg-slate-50 hover:bg-slate-100/80 transition-all border border-slate-100 rounded-2xl p-3 cursor-pointer group"
                    title="View Detailed Customer Profile"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-black text-sm shadow-sm shrink-0">
                        N
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-black text-slate-800 text-xs group-hover:text-brand-blue transition-colors flex items-center gap-1">
                          N <span className="text-[9px] text-indigo-500 font-medium">(View Profile)</span>
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">nithinjee07@gmail.com</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-100">
                        <span className="text-[8px] text-slate-400 font-bold block uppercase">Tier</span>
                        <span className="font-extrabold text-slate-700">👑 Gold Member</span>
                      </div>
                      <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-100">
                        <span className="text-[8px] text-slate-400 font-bold block uppercase">Smart Coins</span>
                        <span className="font-extrabold text-indigo-600">🪙 1,250</span>
                      </div>
                    </div>
                  </button>
                </div>
              </nav>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <a 
                  href="#live-stock" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Check Live Stock
                </a>
                
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/50 text-xs">
                  <div className="flex items-center justify-between text-slate-500 font-medium">
                    <span>© {new Date().getFullYear()} SMART MOBILES</span>
                    <a 
                      href="https://wa.me/919876543210?text=Hi%20Smart%20Mobiles!%20I'm%20on%20your%20website%20and%20have%20a%20question%20about%20your%20live%20stock."
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline font-bold flex items-center gap-1"
                    >
                      WhatsApp Support
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reservation Notification toast banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300 max-w-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">✓</div>
          <div className="text-xs">
            <p className="font-bold">Device Reserved!</p>
            <p className="text-slate-400 mt-0.5 leading-relaxed">{notification}</p>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {activePage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 3. Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden z-10 bg-gradient-to-b from-[#0b0c1e] via-[#0e0f26] to-[#080915] text-white border-b border-slate-900/40" id="hero">
              {/* Subtle background blur spheres */}
              <div className="absolute right-0 top-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-10 bottom-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  {/* Left Texts */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-950/60 backdrop-blur-sm text-emerald-400 border border-indigo-800/50 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Mumbai's #1 Mobile Store • Est. 2018
                    </span>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter leading-[1.05] flex flex-col">
                      <span>Find Your</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#c084fc] to-[#e879f9] filter drop-shadow-sm font-black">
                        Perfect
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#c084fc] to-[#e879f9] filter drop-shadow-sm font-black">
                        Smartphone
                      </span>
                      <span>at the Best Local Price</span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                      Compare, reserve, and experience before you buy. Genuine products, expert guidance, and unbeatable after-sales support.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      <a 
                        href="#live-stock" 
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePage('livestock');
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black px-8 py-4 rounded-full shadow-lg shadow-indigo-500/20 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        📱 Explore Mobiles <ArrowRight className="w-4 h-4 text-white animate-pulse" />
                      </a>
                      <a 
                        href="#offers" 
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePage('offers');
                        }}
                        className="w-full sm:w-auto bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-full transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        🏷️ Check Offers
                      </a>
                      <button 
                        onClick={() => {
                          setActivePage('home');
                          setTimeout(() => {
                            document.getElementById('decision-hub')?.scrollIntoView({ behavior: 'smooth' });
                            setActiveDashboardTab('PersonalizedHome');
                          }, 100);
                        }}
                        className="w-full sm:w-auto bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-full transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        🤖 AI Recommend Me
                      </button>
                    </div>

                    {/* Trust Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                      {[
                        { value: '150+', label: 'Smartphones in Stock' },
                        { value: '20+', label: 'Global Brands' },
                        { value: '4.9★', label: 'Customer Rating' },
                        { value: '3×', label: 'Higher Purchase Confidence' }
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 shadow-sm text-center transition-all hover:scale-105 duration-300">
                          <p className="text-xl md:text-2xl font-display font-black text-indigo-300">{stat.value}</p>
                          <p className="text-[10px] md:text-xs text-slate-400 font-bold tracking-tight mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right floating product previews & phone model */}
                  <div className="lg:col-span-5 relative flex flex-col items-center">
                    {/* Outer circle glow */}
                    <div className="absolute w-80 h-80 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse top-10" />
                    
                    {/* Card & Phone Wrapper */}
                    <div className="relative w-full flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-center gap-6">
                      
                      {/* 1. Today's Top Pick floating tooltip */}
                      <div className="absolute left-[-10%] top-[25%] hidden xl:flex bg-[#14152a]/95 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl flex-col z-20 w-44">
                        <span className="text-[9px] uppercase text-indigo-400 font-extrabold tracking-widest">Today's Top Pick</span>
                        <span className="text-xs font-black text-white mt-1">iPhone 17 Pro Max</span>
                        <span className="text-[10px] text-emerald-400 font-bold mt-1">₹1,59,900 • In Stock ✓</span>
                      </div>

                      {/* 2. Physical Glass Smartphone Mockup shown in screenshot */}
                      <div className="relative w-64 h-[440px] bg-gradient-to-b from-[#161937] to-[#0a0a1a] rounded-[48px] p-4 shadow-[0_0_50px_rgba(99,102,241,0.25)] border-4 border-[#2c3263] flex flex-col justify-between items-center overflow-hidden shrink-0 group">
                        {/* Speaker Notch */}
                        <div className="w-24 h-4 bg-[#2c3263] rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                          <div className="w-10 h-0.5 bg-slate-900 rounded-full" />
                        </div>

                        {/* App Center Content */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center mt-8">
                          {/* App Grid Icon */}
                          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                            📱
                          </div>
                          <h3 className="text-lg font-display font-black tracking-tight text-white">NextWave Mobiles</h3>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Mumbai's #1 Store</p>
                        </div>

                        {/* Trust Badge at the bottom of inner mockup screen */}
                        <div className="w-full bg-[#181a30]/80 backdrop-blur-sm border border-white/5 py-2.5 px-3 rounded-2xl text-center">
                          <p className="text-[9px] font-bold text-slate-300">📱 Touch & Experience Demo</p>
                        </div>
                      </div>

                      {/* 3. Quick Selector Card of Actual Live Inventory Product Previews */}
                      <div className="relative max-w-sm w-full flex flex-col gap-4">
                        {/* Interactive selector inside the previews */}
                        <div className="flex gap-1 bg-[#12132a] backdrop-blur-md p-1 rounded-xl border border-white/5 shadow-inner">
                          {[
                            { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max', icon: '🍎' },
                            { id: 'galaxy-s24-ultra', label: 'S24 Ultra', icon: '🪐' },
                            { id: 'pixel-9-pro', label: 'Pixel 9 Pro', icon: '🌐' }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setHeroPhoneId(item.id)}
                              className={`flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                heroPhoneId === item.id 
                                  ? 'bg-indigo-600 text-white shadow-md' 
                                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <span>{item.icon}</span>
                              <span>{item.label.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>

                        {/* Custom Styled Preview Card */}
                        <div className="bg-[#151733]/90 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden group">
                          <div className="relative h-44 bg-[#0e0f24] rounded-2xl overflow-hidden mb-4 border border-white/5 flex items-center justify-center">
                            <img 
                              src={heroPhone.imageUrl}
                              alt={heroPhone.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                            />

                            {/* Floating Trust tags on image */}
                            <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-slate-950 py-0.5 px-2 rounded-full text-[9px] font-black uppercase tracking-wider">
                              Live Stock Verified
                            </div>
                          </div>

                          {/* Floating details overlay on the render */}
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Trending Match</span>
                              <h4 className="font-display font-black text-white text-base mt-0.5">{heroPhone.name}</h4>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{heroPhone.color}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-mono font-black text-white">₹{heroPhone.price.toLocaleString()}</p>
                              <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-extrabold mt-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /> {heroPhone.stockQuantity} Left
                              </span>
                            </div>
                          </div>

                          {/* Quick CTAs directly on the card */}
                          <div className="flex gap-2.5 mt-4 pt-3 border-t border-white/10">
                            <button
                              onClick={() => handleOpenReservation(heroPhone)}
                              className="flex-grow bg-white hover:bg-slate-100 text-slate-950 font-black py-2.5 rounded-xl text-[11px] transition-colors cursor-pointer shadow-sm text-center flex items-center justify-center gap-1"
                            >
                              Reserve Device
                            </button>
                            <button
                              onClick={() => {
                                toggleCompare(heroPhone.id);
                                setIsCompareSummaryOpen(true);
                              }}
                              className={`px-3 py-2.5 border rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                                comparedPhoneIds.includes(heroPhone.id) 
                                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 font-black' 
                                  : 'bg-transparent hover:bg-white/5 text-slate-300 border-white/10'
                              }`}
                            >
                              {comparedPhoneIds.includes(heroPhone.id) ? 'Selected' : 'Compare'}
                            </button>
                          </div>
                        </div>

                        {/* 4. Special Offer Floating Pill */}
                        <div className="bg-[#14152a]/95 border border-amber-500/20 p-4 rounded-2xl shadow-xl flex items-center gap-3 relative z-10 w-full">
                          <span className="text-xl">🎉</span>
                          <div className="text-left">
                            <p className="text-[10px] uppercase text-amber-400 font-black tracking-widest">Special Offer</p>
                            <p className="text-xs font-black text-white mt-0.5">No-Cost EMI Available</p>
                            <p className="text-[10px] text-slate-400 font-medium">Up to 24 months zero interest schemes</p>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>

      {/* 2.5 Interactive Smart Experience Workspace Hub */}
      <section className="relative py-12 z-20 scroll-mt-24" id="decision-hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-[32px] p-6 md:p-8 shadow-xl relative overflow-hidden">
            
            {/* Ambient accent decor */}
            <div className="absolute right-[-10%] top-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute left-[-10%] bottom-[-10%] w-[40%] h-[40%] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/60 mb-8 relative z-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" /> Interactive Decision Ecosystem
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900 mt-2">Smart Retail Experience Hub</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click any system panel below to view real-time green scores, interactive floor layouts, and transparent pricing breakdowns.
                </p>
              </div>
            </div>

            {/* Premium Workspace Selector Tabs row */}
            <div className="flex flex-wrap gap-2.5 mb-8 bg-slate-100/50 p-2 rounded-2xl border border-slate-200/40 relative z-10">
              {[
                { id: 'PersonalizedHome', label: 'AI Curated For You', icon: '✨' },
                { id: 'GreenScore', label: 'AI Green Score', icon: '🌱' },
                { id: 'FloorMap', label: 'Store Floor Map', icon: '🗺️' },
                { id: 'PriceTransparency', label: 'Price Transparency', icon: '🛡️' }
              ].map((tab) => {
                const isActive = activeDashboardTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveDashboardTab(tab.id);
                      // Smooth scroll tab element into center view
                      document.getElementById('decision-hub')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black tracking-tight transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg scale-105'
                        : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-200/40 shadow-sm'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Panel rendering */}
            <div className="relative z-10">
              {isDashboardLoading ? (
                <div className="animate-in fade-in duration-200">
                  <DashboardPanelSkeleton />
                </div>
              ) : (
                <>
                  {activeDashboardTab === 'PersonalizedHome' && (
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-350">
                      <AiPersonalizedHomepage 
                        onSelectPhone={(phone) => {
                          setSelectedDetailPhone(phone);
                          setActivePage('phone-detail');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        onSelectTab={(tabId) => {
                          setActiveDashboardTab(tabId);
                          document.getElementById('decision-hub')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        wishlist={wishlist}
                        onToggleWishlist={toggleWishlist}
                        comparedPhoneIds={comparedPhoneIds}
                        onToggleCompare={toggleCompare}
                        selectedProfile={selectedProfile}
                        onProfileChange={setSelectedProfile}
                        onTriggerVoiceProfileSwitch={handleTriggerVoiceProfileSwitch}
                      />
                    </div>
                  )}

                  {activeDashboardTab === 'GreenScore' && (
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-350">
                      <GreenPhoneScore />
                    </div>
                  )}

                  {activeDashboardTab === 'FloorMap' && (
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-350">
                      <StoreWalkthrough lastReservedPhone={lastReservedPhone} />
                    </div>
                  )}

                  {activeDashboardTab === 'PriceTransparency' && (
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-350">
                      <PriceTransparency />
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Business Solution Section */}
      <section className="relative py-20 z-10 border-t border-b border-white/20" id="solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Smarter Offline Purchasing</span>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 mt-3">How We Help Customers Buy Smarter</h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">Why struggle with online delays or physical store uncertainty? SMART MOBILES combines digital research convenience with physical-store after-sales reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Live Stock Visibility',
                desc: 'Never travel to discover your target handset or preferred color is unavailable. Our dashboard shows physical store availability refreshed every 5 minutes.',
                icon: <PhoneIcon className="w-6 h-6 text-brand-blue" />,
                badge: 'Transparency'
              },
              {
                title: 'No-Haggle Store Offers',
                desc: 'See exact trade-in bonuses, student cashbacks, and bank interest waivers beforehand. We honor 100% of the online listed rates at our physical billing counter.',
                icon: <Gift className="w-6 h-6 text-brand-orange" />,
                badge: 'Best Pricing'
              },
              {
                title: 'Reserve Before You Travel',
                desc: 'Secure your phone for up to 24 hours. If it is the last unit, we immediately lock it for you. Pay comfortably in-store after physically touching and testing the model.',
                icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
                badge: 'Convenience'
              }
            ].map((sol, index) => (
              <div key={index} className="glass-card hover:bg-white/55 border border-white/60 hover:border-white rounded-3xl p-6 transition-all shadow-sm hover:shadow-md group">
                <div className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
                  {sol.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-6">{sol.badge}</span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{sol.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



          </div>
        )}

        {activePage === 'phones' && (
          <div className="animate-in fade-in duration-300">
            {/* 6. Featured Smartphones Section */}
            <section className="relative py-20 z-10" id="smartphones">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Explore Store Catalog</span>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 mt-2">Today's Featured Smartphones</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Physically touch, test, and buy any of these devices at our store. Exchange options available.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              {/* Search Bar for smartphones catalog */}
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search smartphones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-9 py-3 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all placeholder-slate-400 shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Brand filtering tabs */}
              <div className="flex flex-wrap gap-1.5 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
                {['All', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Nothing'].map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedBrand === brand
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'hover:bg-white/50 text-slate-600'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isCatalogLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SmartphoneSkeletonCard key={i} />
              ))
            ) : filteredSmartphones.length > 0 ? (
              filteredSmartphones.slice(0, 12).map((phone) => (
                <div 
                  key={phone.id} 
                  onClick={() => {
                    setSelectedDetailPhone(phone);
                    setActivePage('phone-detail');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="glass-card rounded-3xl shadow-sm hover:shadow-xl hover:border-slate-300 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  {/* Photo area */}
                  <div className="relative bg-slate-50/20 h-56 overflow-hidden">
                    <img 
                      src={phone.imageUrl} 
                      alt={phone.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    {phone.offerBadge && (
                      <span className="absolute top-4 left-4 bg-brand-orange text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md z-10">
                        🔥 {phone.offerBadge}
                      </span>
                    )}

                    <span className={`absolute bottom-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full shadow-md ${
                      phone.stockStatus === 'In Stock'
                        ? 'bg-emerald-500 text-white'
                        : phone.stockStatus === 'Limited Stock'
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-red-500 text-white'
                    }`}>
                      {phone.stockStatus === 'In Stock' ? '🟢 In Stock' : phone.stockStatus === 'Limited Stock' ? '🟡 Low Stock' : '🔴 Out of Stock'}
                    </span>
                  </div>

                  {/* Info area */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{phone.brand}</span>
                          <h3 className="font-display font-bold text-slate-800 text-lg leading-tight mt-0.5">{phone.name}</h3>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                          ★ <span className="text-slate-700">{phone.rating}</span>
                        </div>
                      </div>

                      {/* Pricing Row */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-display font-black text-slate-900 font-mono">₹{phone.price.toLocaleString()}</span>
                        {phone.originalPrice && phone.originalPrice > phone.price && (
                          <span className="text-xs text-slate-400 line-through font-mono">₹{phone.originalPrice.toLocaleString()}</span>
                        )}
                      </div>

                      {/* Green Phone Score Badge Row */}
                      <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
                        <GreenPhoneHoverCard phoneId={phone.id} phoneName={phone.name} />
                      </div>

                      {/* Specs snippet */}
                      <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-2 text-xs text-slate-600">
                        <div className="flex items-start gap-1.5">
                          <span className="text-slate-400 select-none">📸</span>
                          <span className="line-clamp-1">{phone.specs.camera}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-slate-400 select-none">⚙️</span>
                          <span className="line-clamp-1">{phone.specs.processor}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-slate-400 select-none">🔋</span>
                          <span className="line-clamp-1">{phone.specs.battery}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReservation(phone);
                        }}
                        disabled={phone.stockStatus === 'Out of Stock'}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100/50 disabled:text-slate-400 text-white font-bold py-3 px-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer disabled:cursor-not-allowed text-center"
                        id={`reserve-btn-${phone.id}`}
                      >
                        Reserve
                      </button>

                      {/* Compare Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!comparedPhoneIds.includes(phone.id)) {
                            if (comparedPhoneIds.length >= 3) {
                              setCompareNotification("You can select up to 3 smartphones for comparative analysis!");
                              setTimeout(() => setCompareNotification(null), 4000);
                              return;
                            }
                            setComparedPhoneIds(prev => [...prev, phone.id]);
                          } else {
                            setComparedPhoneIds(prev => prev.filter(id => id !== phone.id));
                          }
                          setIsCompareSummaryOpen(true);
                        }}
                        className={`p-3 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          comparedPhoneIds.includes(phone.id)
                            ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue scale-105 shadow-sm shadow-indigo-100'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                        title={comparedPhoneIds.includes(phone.id) ? "Remove from Compare" : "Compare Specifications"}
                        id={`compare-btn-${phone.id}`}
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>

                      {/* Saved/Heart Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(phone.id);
                        }}
                        className={`p-3 border rounded-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                          wishlist.includes(phone.id)
                            ? 'bg-rose-50 border-rose-200 text-rose-500 fill-rose-500 shadow-sm shadow-rose-100'
                            : 'bg-white hover:bg-slate-50 text-slate-400 hover:text-rose-500 border-slate-200'
                        }`}
                        title={wishlist.includes(phone.id) ? "Remove from Saved" : "Save Handset"}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full glass-card rounded-3xl p-12 text-center border border-dashed border-white/60">
                <p className="text-slate-500 font-medium">No smartphones matches found for your current brand filter or keywords.</p>
              </div>
            )}
          </div>
        </div>
      </section>

          </div>
        )}

        {activePage === 'accessories' && (
          <div className="animate-in fade-in duration-300">
            <section className="relative py-20 z-10" id="accessories">
              <AccessoriesSection onReserveClick={handleOpenReservation} />
            </section>
          </div>
        )}

        {activePage === 'livestock' && (
          <div className="animate-in fade-in duration-300">
            {/* 7. Live Stock Dashboard Section */}
            <section className="relative py-20 z-10" id="live-stock">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-orange-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Real-Time Inventory</span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mt-2">Live Store Inventory Dashboard</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Refreshed 5 minutes ago. Reserve online and collect within 24 hours at Chennai outlet.</p>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <RefreshCw className="w-4 h-4 animate-spin-slow text-brand-blue" />
              Live stock synced with central store POS.
            </div>
          </div>

          {/* Filtering Tools Dashboard */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search smartphone model, processor, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-4 py-3 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all placeholder-slate-400"
              />
            </div>

            {/* Brand Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
              >
                <option value="All">All Brands</option>
                <option value="Apple">Apple iPhone</option>
                <option value="Samsung">Samsung Galaxy</option>
                <option value="Google">Google Pixel</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Nothing">Nothing</option>
              </select>
            </div>

            {/* Stock Availability status */}
            <div className="md:col-span-4 flex gap-2">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-xl px-3 py-3 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
              >
                <option value="All">All Availability</option>
                <option value="In Stock">In Stock Only</option>
                <option value="Limited Stock">Limited Stock Only</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('All');
                  setSearchQuery('');
                  setStockFilter('All');
                }}
                className="px-4 bg-white/80 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                title="Reset Filters"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="glass-card rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/30 border-b border-white/20 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 w-2/5">Handset Model</th>
                    <th className="py-4 px-4 w-1/8">Storage Specs</th>
                    <th className="py-4 px-4 w-1/8 text-right">Retail Value</th>
                    <th className="py-4 px-4 w-1/5">Live Stock Code</th>
                    <th className="py-4 px-6 w-1/6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                  {filteredSmartphones.map((phone) => (
                    <tr key={phone.id} className="hover:bg-slate-50/50 transition-all">
                      {/* Name & Brand */}
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img 
                          src={phone.imageUrl} 
                          alt={phone.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-white"
                        />
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">{phone.brand}</span>
                          <strong className="text-slate-800 text-sm mt-1 block">{phone.name}</strong>
                          <span className="text-[10px] text-brand-orange mt-0.5 block">{phone.offerBadge || "Official warranty package"}</span>
                        </div>
                      </td>

                      {/* Storage */}
                      <td className="py-4 px-4 text-slate-500 font-mono">
                        {phone.specs.storage.split(' / ')[0]} Base
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right font-bold text-slate-900 font-mono text-sm">
                        ₹{phone.price.toLocaleString()}
                      </td>

                      {/* Stock availability badge */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            phone.stockStatus === 'In Stock'
                              ? 'bg-emerald-400 animate-ping'
                              : phone.stockStatus === 'Limited Stock'
                              ? 'bg-amber-400 animate-pulse'
                              : 'bg-red-400'
                          }`} />
                          <span className={`font-semibold ${
                            phone.stockStatus === 'In Stock'
                              ? 'text-emerald-700'
                              : phone.stockStatus === 'Limited Stock'
                              ? 'text-amber-700'
                              : 'text-red-700'
                          }`}>
                            {phone.stockStatus} ({phone.stockQuantity} units left)
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleOpenReservation(phone)}
                          disabled={phone.stockStatus === 'Out of Stock'}
                          className="bg-brand-blue hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                          Reserve Hold
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSmartphones.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No products match your custom filter. Try reducing search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

          </div>
        )}

        {activePage === 'compare' && (
          <div className="animate-in fade-in duration-300">
            {/* 8. Compare Side-by-Side Section */}
            <section className="relative py-20 z-10 scroll-mt-24" id="compare-phones">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompareSection onReserveClick={handleOpenReservation} />
        </div>
      </section>

          </div>
        )}

        {activePage === 'offers' && (
          <div className="animate-in fade-in duration-300">
            {/* 11. Today's Offers Section & Countdown */}
            <section className="py-20 bg-slate-900 text-white" id="offers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider bg-orange-500/10 px-3 py-1 rounded-full border border-brand-orange/20">Store Special Campaign</span>
              <h2 className="text-3xl md:text-4xl font-display font-black mt-3 text-slate-100">Today's Promotion Deals</h2>
              <p className="text-sm text-slate-400 mt-1">Claim exclusive benefits physically at our billing counter. Present reservation to lock deals.</p>
            </div>

            {/* CountDown timer */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
              <span className="text-xs text-slate-400 font-semibold leading-tight max-w-[100px]">Flash Deal Countdown:</span>
              <div className="flex gap-2 text-center">
                <div className="bg-brand-orange text-slate-950 font-mono font-bold px-3 py-1.5 rounded-lg text-sm w-12">
                  {countdown.hours.toString().padStart(2, '0')}
                </div>
                <span className="font-mono text-slate-600 font-bold mt-1">:</span>
                <div className="bg-brand-orange text-slate-950 font-mono font-bold px-3 py-1.5 rounded-lg text-sm w-12">
                  {countdown.minutes.toString().padStart(2, '0')}
                </div>
                <span className="font-mono text-slate-600 font-bold mt-1">:</span>
                <div className="bg-brand-orange text-slate-950 font-mono font-bold px-3 py-1.5 rounded-lg text-sm w-12 animate-pulse">
                  {countdown.seconds.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Samsung Festival Sale',
                desc: 'Get flat ₹10,000 instant bank discount on Galaxy S24 Ultra, plus a free travel adaptor worth ₹2,999 in-store.',
                deal: 'Save ₹10,000',
                accent: 'border-blue-500/20 bg-blue-500/5'
              },
              {
                title: 'Apple Exchange Bonus',
                desc: 'Upgrade your existing iPhone to an iPhone 16 series. Receive up to ₹4,000 extra trade-in bonus over physical appraisal valuation.',
                deal: 'Up to ₹4,000 Bonus',
                accent: 'border-orange-500/20 bg-orange-500/5'
              },
              {
                title: 'No-Cost EMI plans',
                desc: 'Pay for your premium smartphone in up to 12 interest-free installments. Zero processing fees with HDFC & IDFC Bank.',
                deal: '0% Interest EMI',
                accent: 'border-emerald-500/20 bg-emerald-500/5'
              },
              {
                title: 'Exclusive Student Discount',
                desc: 'Students present college ID card at store to receive a flat ₹1,500 off on select Nothing, OnePlus, & Redmi smartphones.',
                deal: 'Flat ₹1,500 Off',
                accent: 'border-purple-500/20 bg-purple-500/5'
              }
            ].map((promo, idx) => (
              <div key={idx} className={`rounded-2xl p-6 border flex flex-col justify-between ${promo.accent}`}>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block">Promotion {idx+1}</span>
                  <h3 className="font-display font-bold text-slate-100 text-lg mt-2 leading-tight">{promo.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{promo.desc}</p>
                </div>
                <span className="mt-6 text-brand-orange font-bold text-xs bg-brand-orange/10 px-3 py-1.5 rounded-lg w-fit">
                  {promo.deal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affordability, Calculators and EMI Plans */}
      <section className="py-20 bg-slate-50 text-slate-800 border-t border-slate-200/40" id="affordability-hub">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section title & subtitle - spacious & minimal */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Affordable Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 mt-3">Smart Finance & Trade-In</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">
              Calculate standard EMI schemes, estimate your current old device's trade-in value, and check instant bank cashbacks before visiting our showroom.
            </p>
          </div>

          {/* Unified Tab Switcher (Minimalist & Sleek) */}
          <div className="bg-slate-200/60 p-1 rounded-2xl max-w-xl mx-auto flex gap-1">
            <button
              type="button"
              onClick={() => setAffordabilityTab('calculator')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                affordabilityTab === 'calculator'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>EMI Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => setAffordabilityTab('exchange')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                affordabilityTab === 'exchange'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Device Trade-In</span>
            </button>
            <button
              type="button"
              onClick={() => setAffordabilityTab('plans')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                affordabilityTab === 'plans'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>EMI Plans & Partners</span>
            </button>
          </div>

          {/* Tab Content Display Area with Elegant Frameless Style */}
          <div className="bg-white border border-slate-100 rounded-[32px] shadow-xs p-6 md:p-8">
            {affordabilityTab === 'calculator' && (
              <div className="animate-in fade-in duration-200">
                <EmiCalculator isTabbed={true} onReserveClick={handleOpenReservation} />
              </div>
            )}
            
            {affordabilityTab === 'exchange' && (
              <div className="animate-in fade-in duration-200">
                <ExchangeEstimator isTabbed={true} onReserveClick={handleOpenReservation} />
              </div>
            )}
            
            {affordabilityTab === 'plans' && (
              <div className="animate-in fade-in duration-200 space-y-10">
                {/* 1. Simplified Bank Grid with Elegant Design */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5 text-center">
                    🏦 Certified Zero-Cost EMI Partner Banks
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {[
                      { name: 'HDFC Bank', color: 'bg-blue-50/20 text-blue-800' },
                      { name: 'ICICI Bank', color: 'bg-orange-50/20 text-orange-800' },
                      { name: 'SBI Card', color: 'bg-sky-50/20 text-sky-800' },
                      { name: 'Axis Bank', color: 'bg-purple-50/20 text-purple-800' },
                      { name: 'Kotak Bank', color: 'bg-red-50/20 text-red-800' },
                      { name: 'IndusInd', color: 'bg-amber-50/20 text-amber-800' },
                      { name: 'Yes Bank', color: 'bg-cyan-50/20 text-cyan-800' },
                      { name: 'AMEX', color: 'bg-slate-50 text-slate-800' },
                    ].map((bank, idx) => (
                      <div key={idx} className={`border border-slate-100/70 rounded-xl p-3.5 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-105 ${bank.color}`}>
                        <span className="text-base">🏛️</span>
                        <span className="text-[10px] font-bold">{bank.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Simplified Reference Table */}
                <div className="pt-8 border-t border-slate-100 max-w-2xl mx-auto">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5 text-center">
                    📊 Quick Reference EMI Rates
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-slate-100 uppercase tracking-wider font-bold">
                          <th className="py-3 px-5">Phone Price</th>
                          <th className="py-3 px-5 text-emerald-400">6 Months (0% No-Cost)</th>
                          <th className="py-3 px-5">12 Months (12% Interest)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {[
                          { price: 15000, mo6: 2500, mo12: 1333 },
                          { price: 25000, mo6: 4167, mo12: 2221 },
                          { price: 40000, mo6: 6667, mo12: 3554 },
                          { price: 65000, mo6: 10833, mo12: 5775 },
                          { price: 100000, mo6: 16667, mo12: 8885 },
                          { price: 160000, mo6: 26667, mo12: 14216 },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                            <td className="py-3 px-5 font-bold text-slate-900">₹{row.price.toLocaleString('en-IN')}</td>
                            <td className="py-3 px-5 font-bold text-emerald-600">₹{row.mo6.toLocaleString('en-IN')}/mo</td>
                            <td className="py-3 px-5">₹{row.mo12.toLocaleString('en-IN')}/mo</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center mt-3">
                    *Actual bank calculations are completed physically at our Chennai billing showroom counter.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

          </div>
        )}



        {/* Showroom Map section removed for a cleaner, non-congested UI */}

        {activePage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 13. Customer Testimonials */}
            <section className="relative py-20 z-10" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Customer Stories</span>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 mt-2">What Our Customers Say</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Read reviews from real customers who researched online and bought at our store.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Karthik Raja',
                role: 'Engineering Student & Gamer',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
                review: 'Loved using the website to check if Nothing Phone (2a) was in stock! Reserved online, calculated my EMI down payment, and picked it up within an hour. Saved flat ₹1,500 using the student discount.',
                stars: 5
              },
              {
                name: 'Meera Deshmukh',
                role: 'Senior Financial Analyst',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                review: 'Excellent service! I wanted the iPhone 16 Pro desert color. The website correctly showed only 4 units left. Secured a reservation, estimated my trade-in value online, and swapped my old iPhone 14 flawlessly in the store.',
                stars: 5
              },
              {
                name: 'Anish Abraham',
                role: 'Creative Director',
                avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=80',
                review: 'Fantastic experience. Unlike other shops, their live stock quantities actually match physical store inventory. The after-sales help was superb. They migrated my whole 200GB WhatsApp data and photos for free!',
                stars: 5
              }
            ].map((test, index) => (
              <div key={index} className="glass-card rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: test.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 italic mt-4 leading-relaxed">
                    "{test.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm">{test.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

          </div>
        )}

        {activePage === 'store' && (
          <div className="animate-in fade-in duration-300">
            {/* 14. Store Information, Directions, and Social Contacts Section */}
            <section className="relative py-20 z-10 bg-slate-50/50" id="store-locator">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Clean, minimalist section title */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    Contact Us & Showroom
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mt-3">Get in Touch with NextWave</h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">
                    Check showroom location, active hours, or contact us instantly. Visit our store to experience live demos in hand.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
                  
                  {/* Left Column: Address, Hours & Grid of Social logos */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    {/* Address & Hours card */}
                    <div className="bg-white border border-slate-100/80 rounded-[28px] p-6 shadow-xs space-y-6">
                      
                      {/* Address detail */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <MapPin className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs">Chennai Showroom Address</h4>
                          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
                            128 Tech Park Road, Opp. Central Mall Terminal,<br />
                            Guindy, Chennai - 600001
                          </p>
                        </div>
                      </div>

                      {/* Store hours detail */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <Clock className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs">Showroom Hours</h4>
                          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
                            Monday to Sunday: 10:00 AM - 9:00 PM
                          </p>
                          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-emerald-100 mt-2">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Showroom is Open
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Social links grid */}
                    <div className="space-y-3.5">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                        Direct Communication Channels
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        
                        {/* WhatsApp */}
                        <a 
                          href="https://wa.me/919876543210?text=Hi%20NextWave%20Mobiles!%20I'm%20visiting%20your%20website%20and%20had%20some%20questions."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-emerald-50/15 hover:border-emerald-200 hover:shadow-xs transition-all cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <MessageSquare className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate">WhatsApp Chat</h4>
                            <p className="text-[10px] text-emerald-600 font-bold truncate mt-0.5">+91 98765 43210</p>
                          </div>
                        </a>

                        {/* Phone call */}
                        <a 
                          href="tel:+919876543210"
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-indigo-50/15 hover:border-indigo-200 hover:shadow-xs transition-all cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Phone className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate">Phone Support</h4>
                            <p className="text-[10px] text-indigo-600 font-bold truncate mt-0.5">044-98765432</p>
                          </div>
                        </a>

                        {/* Email */}
                        <a 
                          href="mailto:support@nextwavemobiles.com"
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-rose-50/15 hover:border-rose-200 hover:shadow-xs transition-all cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Mail className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate">Email Us</h4>
                            <p className="text-[10px] text-rose-600 font-bold truncate mt-0.5">support@nextwave.com</p>
                          </div>
                        </a>

                        {/* Instagram */}
                        <a 
                          href="https://instagram.com/nextwavemobiles"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-pink-50/15 hover:border-pink-200 hover:shadow-xs transition-all cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Instagram className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate">Instagram</h4>
                            <p className="text-[10px] text-pink-600 font-bold truncate mt-0.5">@nextwave_mobiles</p>
                          </div>
                        </a>

                        {/* Facebook */}
                        <a 
                          href="https://facebook.com/nextwavemobiles"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-blue-50/15 hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Facebook className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate">Facebook Page</h4>
                            <p className="text-[10px] text-blue-600 font-bold truncate mt-0.5">facebook.com/nextwavemobiles</p>
                          </div>
                        </a>

                        {/* X (Twitter) */}
                        <a 
                          href="https://x.com/nextwavemobiles"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/15 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Twitter className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate">X (Twitter)</h4>
                            <p className="text-[10px] text-slate-600 font-bold truncate mt-0.5">@nextwave_mobiles</p>
                          </div>
                        </a>

                      </div>
                    </div>

                  </div>

                  {/* Right Column: Real Google Map frame */}
                  <div className="lg:col-span-7 bg-white border border-slate-100/80 rounded-[32px] p-4 shadow-sm flex flex-col justify-between h-full min-h-[440px]">
                    <div className="w-full h-[330px] rounded-2xl overflow-hidden border border-slate-100/60 shadow-inner">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.387019623838!2d80.2033095!3d13.0110398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52670f5e3e26c1%3A0xe54e6ffec262d4e8!2sGuindy%20Industrial%20Estate%2c%20Guindy%2c%20Chennai%2c%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer"
                      ></iframe>
                    </div>
                    
                    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-50 mt-3 pl-1">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Showroom Directions</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium leading-relaxed">
                          Located right opposite Guindy Central Metro Gate B, beside State Bank. Valet parking free.
                        </p>
                      </div>
                      <a
                        href="https://maps.google.com/?q=128+Tech+Park+Road+Guindy+Chennai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-500/10 text-center shrink-0 w-full sm:w-auto"
                      >
                        <span>Open In Maps</span>
                        <ExternalLink className="w-3" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* Trusted Local Support & Care Section Integrated into Contact Us */}
            <section className="relative py-20 z-10 border-t border-slate-100 bg-white" id="support-services">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Continuous Support Desk</span>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mt-2">Trusted Local Support & Care</h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Our customer relationship doesn't terminate at the billing counter. Bring your device back anytime.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: 'Free Setup & Migration', desc: 'Transfer massive databases of WhatsApp messages, system files, and contacts.', icon: <Layers className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Warranty Claims Assistance', desc: 'If issues crop up, bring it to us. We coordinate direct with authorized repair labs.', icon: <ShieldCheck className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Screen Replacements', desc: 'Genuine replacement glass certified directly by manufacturer technicians.', icon: <Wrench className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Software Updates support', desc: 'Issues with firmware? Get complimentary OS flashing and debugging advice.', icon: <Info className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Original Accessories', desc: '100% genuine chargers, rugged protection covers, and clear film protectors.', icon: <Layers className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Battery Refurbishment', desc: 'Is your previous handset sluggish? Instant certified power swaps in 30 minutes.', icon: <Battery className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Trade-In Assistance', desc: 'Need advice on cleaning old storage blocks before exchange? Free wiping help.', icon: <RefreshCw className="w-5 h-5 text-brand-blue" /> },
                    { title: 'Glass Guard Fitment', desc: 'Complimentary high-impact screen guard application with every smartphone.', icon: <Award className="w-5 h-5 text-brand-blue" /> }
                  ].map((serv, index) => (
                    <div key={index} className="glass-card p-5 rounded-3xl border border-white/60 shadow-sm flex flex-col justify-between h-40">
                      <div>
                        <div className="text-slate-400 mb-3">{serv.icon}</div>
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm">{serv.title}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal mt-1">{serv.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activePage === 'services' && (
          <div className="animate-in fade-in duration-300">
            {/* 15. After-Sales Support services */}
            <section className="relative py-20 z-10" id="support-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50/60 backdrop-blur-sm px-3 py-1 rounded-full">Continuous Support Desk</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mt-2">Trusted Local Support & Care</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Our customer relationship doesn't terminate at the billing counter. Bring your device back anytime.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Free Setup & Migration', desc: 'Transfer massive databases of WhatsApp messages, system files, and contacts.', icon: <Layers className="w-5 h-5 text-brand-blue" /> },
              { title: 'Warranty Claims Assistance', desc: 'If issues crop up, bring it to us. We coordinate direct with authorized repair labs.', icon: <ShieldCheck className="w-5 h-5 text-brand-blue" /> },
              { title: 'Screen Replacements', desc: 'Genuine replacement glass certified directly by manufacturer technicians.', icon: <Wrench className="w-5 h-5 text-brand-blue" /> },
              { title: 'Software Updates support', desc: 'Issues with firmware? Get complimentary OS flashing and debugging advice.', icon: <Info className="w-5 h-5 text-brand-blue" /> },
              { title: 'Original Accessories', desc: '100% genuine chargers, rugged protection covers, and clear film protectors.', icon: <Layers className="w-5 h-5 text-brand-blue" /> },
              { title: 'Battery Refurbishment', desc: 'Is your previous handset sluggish? Instant certified power swaps in 30 minutes.', icon: <Battery className="w-5 h-5 text-brand-blue" /> },
              { title: 'Trade-In Assistance', desc: 'Need advice on cleaning old storage blocks before exchange? Free wiping help.', icon: <RefreshCw className="w-5 h-5 text-brand-blue" /> },
              { title: 'Glass Guard Fitment', desc: 'Complimentary high-impact screen guard application with every smartphone.', icon: <Award className="w-5 h-5 text-brand-blue" /> }
            ].map((serv, index) => (
              <div key={index} className="glass-card p-5 rounded-3xl border border-white/60 shadow-sm flex flex-col justify-between h-40">
                <div>
                  <div className="text-slate-400 mb-3">{serv.icon}</div>
                  <h4 className="font-bold text-slate-800 text-xs md:text-sm">{serv.title}</h4>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal mt-1">{serv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

          </div>
        )}

        {activePage === 'phone-detail' && (
          <div className="animate-in fade-in duration-300">
            <PhoneDetailPage
              phone={selectedDetailPhone}
              onBack={() => {
                setActivePage('home');
                setSelectedDetailPhone(null);
              }}
              onReserve={(phone) => {
                handleOpenReservation(phone);
              }}
              onToggleWishlist={toggleWishlist}
              onToggleCompare={(id) => {
                toggleCompare(id);
                // Sync state for immediate feedback inside details view
                if (selectedDetailPhone && selectedDetailPhone.id === id) {
                  setSelectedDetailPhone({ ...selectedDetailPhone });
                }
              }}
              isSaved={selectedDetailPhone ? wishlist.includes(selectedDetailPhone.id) : false}
              isCompared={selectedDetailPhone ? comparedPhoneIds.includes(selectedDetailPhone.id) : false}
            />
          </div>
        )}

        {activePage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 16. Final CTA Section */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative">
          <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest bg-orange-500/15 text-brand-orange px-3 py-1 rounded-full border border-brand-orange/20">Chennai Guindy Branch</span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter leading-tight">Ready to Visit SMART MOBILES?</h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Take the guesswork out of purchasing your next phone. Check stock availability, compute EMI schemes, estimate your exchange value, and secure your device reservation before walking in!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#live-stock" 
              onClick={(e) => handleScrollToSection('live-stock', e)}
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-orange/10 transition-all text-sm cursor-pointer"
            >
              Explore Live Stock Dashboard
            </a>
            <a 
              href="tel:+919876543210" 
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold px-8 py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" /> Speak with Sales Manager
            </a>
          </div>
        </div>
      </section>

          </div>
        )}
      </main>

      {/* 17. Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1 Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-blue-600 flex items-center justify-center text-white font-display font-black">
                SM
              </div>
              <span className="font-display font-extrabold text-slate-100 tracking-tight text-base">SMART MOBILES</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500 max-w-sm">
              We are Chennai's premium physical mobile shop. Research on our customer platform, verify our actual live quantities, and buy in-store with confidence.
            </p>
            <p className="text-[10px] text-slate-600 font-mono">© 2026 SMART MOBILES Store. All Rights Reserved.</p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="md:col-span-2 space-y-3 text-left">
            <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Product Navigation</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#smartphones" onClick={(e) => handleScrollToSection('smartphones', e)} className="hover:text-white transition-all">Apple iPhones</a></li>
              <li><a href="#smartphones" onClick={(e) => handleScrollToSection('smartphones', e)} className="hover:text-white transition-all">Samsung Galaxy</a></li>
              <li><a href="#smartphones" onClick={(e) => handleScrollToSection('smartphones', e)} className="hover:text-white transition-all">Google Pixel</a></li>
              <li><a href="#smartphones" onClick={(e) => handleScrollToSection('smartphones', e)} className="hover:text-white transition-all">Nothing Phones</a></li>
              <li><a href="#live-stock" onClick={(e) => handleScrollToSection('live-stock', e)} className="hover:text-white transition-all">Live Store Stock</a></li>
            </ul>
          </div>

          {/* Col 3 Resources */}
          <div className="md:col-span-2 space-y-3 text-left">
            <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Smart Utilities</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#ai-recommender" onClick={(e) => handleScrollToSection('ai-recommender', e)} className="hover:text-white transition-all">AI Recommender</a></li>
              <li><a href="#emi-calculator" onClick={(e) => handleScrollToSection('emi-calculator', e)} className="hover:text-white transition-all">EMI Estimator</a></li>
              <li><a href="#exchange-estimator" onClick={(e) => handleScrollToSection('exchange-estimator', e)} className="hover:text-white transition-all">Trade-In Evaluator</a></li>
              <li><a href="#compare-phones" onClick={(e) => handleScrollToSection('compare-phones', e)} className="hover:text-white transition-all">Compare Handsets</a></li>
              <li><a href="#support-services" onClick={(e) => handleScrollToSection('support-services', e)} className="hover:text-white transition-all">In-Store Assistance</a></li>
            </ul>
          </div>

          {/* Col 4 Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Newsletter & Alerts</h4>
            <p className="leading-relaxed text-[11px] text-slate-500">
              Subscribe to get notified about flash discount campaigns, restock updates of highly demanded models, and festival cashbacks.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! We will keep you updated with live flash deals."); }} className="flex gap-2 max-w-sm">
              <input 
                type="email" 
                required
                placeholder="yourname@gmail.com"
                className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3.5 py-2 w-full text-xs focus:ring-1 focus:ring-brand-orange focus:outline-none transition-all placeholder-slate-600"
              />
              <button 
                type="submit" 
                className="bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 rounded-xl px-4 py-2 font-bold cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </footer>

      {/* Compare Warning notification toast */}
      <AnimatePresence>
        {compareNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[120] bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">⚠️</div>
            <div className="text-xs">
              <p className="font-bold">Compare Limit Reached</p>
              <p className="text-slate-400 mt-0.5 leading-relaxed">{compareNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Comparison Pill */}
      <AnimatePresence>
        {comparedPhoneIds.length > 0 && !isCompareSummaryOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[92%] max-w-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              {/* Device Thumbnails list */}
              <div className="flex -space-x-3 overflow-hidden">
                {comparedPhoneIds.map(phoneId => {
                  const phone = SMARTPHONES.find(p => p.id === phoneId);
                  if (!phone) return null;
                  return (
                    <div 
                      key={phoneId} 
                      className="relative w-11 h-11 rounded-xl border-2 border-slate-900 bg-white shadow-md overflow-hidden flex items-center justify-center group"
                    >
                      <img 
                        src={phone.imageUrl} 
                        alt={phone.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => toggleCompare(phoneId)}
                        className="absolute inset-0 bg-red-650/90 text-white opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer animate-in fade-in"
                        title={`Remove ${phone.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
                {/* Empty slots placeholders */}
                {Array.from({ length: 3 - comparedPhoneIds.length }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-11 h-11 rounded-xl border-2 border-slate-900 border-dashed bg-slate-800/40 text-slate-600 flex items-center justify-center text-xs font-bold"
                  >
                    +
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-100">Comparing Smartphones</p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {comparedPhoneIds.length} of 3 devices selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setComparedPhoneIds([])}
                className="flex-1 sm:flex-initial text-slate-400 hover:text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsCompareSummaryOpen(true)}
                className="flex-1 sm:flex-initial bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Compare Specs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Side-by-Side Comparison Overlay Modal */}
      <AnimatePresence>
        {isCompareSummaryOpen && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/80 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="bg-slate-50 w-full h-[90vh] rounded-t-[32px] shadow-2xl flex flex-col border-t border-white/20 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 md:px-8 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">Comparative Analysis</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{comparedPhoneIds.length} Handsets</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mt-1">Smart Comparison Engine</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setComparedPhoneIds([])}
                    className="text-slate-500 hover:text-slate-800 text-xs font-bold px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer hidden sm:block"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCompareSummaryOpen(false)}
                    className="p-2.5 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all border border-slate-200 flex items-center justify-center cursor-pointer"
                    aria-label="Close Comparison"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Specs Comparison Table Body */}
              <div className="flex-1 overflow-auto p-6 md:p-8 font-sans">
                {comparedPhoneIds.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto">
                    <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">No phones selected</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Choose up to 3 phones from the catalog grid above to compare their features and retail offerings side-by-side.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCompareSummaryOpen(false)}
                      className="bg-brand-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                    >
                      Browse Smartphones
                    </button>
                  </div>
                ) : (
                  <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left min-w-[700px]">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50/50">
                            <th className="p-5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 w-1/4">Technical Metrics</th>
                            {comparedPhoneIds.map(phoneId => {
                              const phone = SMARTPHONES.find(p => p.id === phoneId);
                              if (!phone) return null;
                              return (
                                <th key={phoneId} className="p-5 text-center relative w-1/4 border-l border-slate-100">
                                  {/* Remove single phone link */}
                                  <button
                                    type="button"
                                    onClick={() => toggleCompare(phoneId)}
                                    className="absolute top-4 right-4 p-1 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors cursor-pointer"
                                    title="Remove from Comparison"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>

                                  <div className="flex flex-col items-center pt-2">
                                    <img
                                      src={phone.imageUrl}
                                      alt={phone.name}
                                      referrerPolicy="no-referrer"
                                      className="w-24 h-24 object-cover rounded-2xl border border-slate-200 bg-slate-50 mb-3 shadow-sm transition-transform"
                                    />
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{phone.brand}</span>
                                    <span className="text-sm font-black text-slate-800 mt-0.5 leading-tight">{phone.name}</span>
                                    
                                    <div className="flex items-center gap-1.5 mt-2 bg-slate-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-600">
                                      ★ {phone.rating}
                                    </div>
                                  </div>
                                </th>
                              );
                            })}
                            {/* Empty placeholders if less than 3 */}
                            {Array.from({ length: 3 - comparedPhoneIds.length }).map((_, i) => (
                              <th key={i} className="p-5 text-center text-slate-300 w-1/4 border-l border-slate-100 bg-slate-50/20">
                                <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center font-bold text-lg mb-2">+</div>
                                  <span className="text-xs font-medium">Slot Available</span>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Specs rows */}
                          {[
                            { label: 'Retail price', val: (p: Smartphone) => (
                              <div className="font-mono">
                                <span className="text-base font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                                {p.originalPrice && p.originalPrice > p.price && (
                                  <p className="text-[10px] text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</p>
                                )}
                              </div>
                            )},
                            { label: 'Store Inventory', val: (p: Smartphone) => (
                              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                                p.stockStatus === 'In Stock' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                  : p.stockStatus === 'Limited Stock' 
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100' 
                                  : 'bg-red-50 text-red-700 border border-red-100'
                              }`}>
                                {p.stockStatus === 'In Stock' ? '🟢 In Stock' : p.stockStatus === 'Limited Stock' ? '🟡 Low Stock' : '🔴 Out of Stock'}
                              </span>
                            )},
                            { label: 'Camera Hardware', val: (p: Smartphone) => p.specs.camera },
                            { label: 'Processor & chip', val: (p: Smartphone) => p.specs.processor },
                            { label: 'Battery Capacity', val: (p: Smartphone) => p.specs.battery },
                            { label: 'Power & Charging', val: (p: Smartphone) => p.specs.charging },
                            { label: 'Storage Options', val: (p: Smartphone) => p.specs.storage },
                            { label: 'Display specifications', val: (p: Smartphone) => p.specs.display },
                            { label: 'warranty coverage', val: (p: Smartphone) => p.specs.warranty },
                          ].map((row, rIdx) => (
                            <tr 
                              key={row.label} 
                              className={`border-b border-slate-100 transition-colors hover:bg-slate-50/50 ${
                                rIdx % 2 === 0 ? 'bg-slate-50/20' : ''
                              }`}
                            >
                              <td className="p-4 pl-5 font-bold text-slate-600 text-xs uppercase tracking-wider">{row.label}</td>
                              {comparedPhoneIds.map(phoneId => {
                                const phone = SMARTPHONES.find(p => p.id === phoneId);
                                if (!phone) return null;
                                return (
                                  <td key={phoneId} className="p-4 text-slate-700 text-xs md:text-sm border-l border-slate-100 text-center font-medium">
                                    {row.val(phone)}
                                  </td>
                                );
                              })}
                              {/* Empty slot cells */}
                              {Array.from({ length: 3 - comparedPhoneIds.length }).map((_, i) => (
                                <td key={i} className="p-4 border-l border-slate-100 bg-slate-50/5 text-slate-300 text-center">-</td>
                              ))}
                            </tr>
                          ))}

                          {/* CTA Row */}
                          <tr className="bg-slate-50/40">
                            <td className="p-5"></td>
                            {comparedPhoneIds.map(phoneId => {
                              const phone = SMARTPHONES.find(p => p.id === phoneId);
                              if (!phone) return null;
                              return (
                                <td key={phoneId} className="p-5 text-center border-l border-slate-100">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsCompareSummaryOpen(false);
                                      handleOpenReservation(phone);
                                    }}
                                    disabled={phone.stockStatus === 'Out of Stock'}
                                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    Reserve {phone.name.split(' ')[0]}
                                  </button>
                                </td>
                              );
                            })}
                            {/* Empty slots placeholders */}
                            {Array.from({ length: 3 - comparedPhoneIds.length }).map((_, i) => (
                              <td key={i} className="p-5 border-l border-slate-100"></td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 18. Reservation Form Dialog */}
      {isReservationOpen && targetPhone && (
        <ReservationModal
          phone={targetPhone}
          onClose={() => {
            setIsReservationOpen(false);
            setTargetPhone(null);
          }}
          onSuccess={handleReservationSuccess}
        />
      )}

      {/* 18b. Interactive 3D AR Model Viewer Modal */}
      {isArOpen && arTargetPhone && (
        <ArViewModelModal
          isOpen={isArOpen}
          phone={arTargetPhone}
          onClose={() => {
            setIsArOpen(false);
            setArTargetPhone(null);
          }}
        />
      )}

      {/* 19. Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemove={toggleWishlist}
        onReserve={handleOpenReservation}
      />

      {/* 20. Active Reservations Drawer */}
      <ReservationsDrawer
        isOpen={isReservationsDrawerOpen}
        onClose={() => setIsReservationsDrawerOpen(false)}
        reservations={myReservations}
        onCancel={handleCancelReservation}
        onShowRoute={handleShowroomRoute}
      />

      {/* 21. Detailed Customer Profile Modal */}
      <CustomerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        reservations={myReservations}
        wishlistCount={wishlist.length}
        onOpenReservations={() => setIsReservationsDrawerOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* 22. Detailed Smartphone Specifications Modal */}
      <PhoneDetailModal
        isOpen={isDetailModalOpen}
        phone={selectedDetailPhone}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDetailPhone(null);
        }}
        onReserve={(phone) => {
          handleOpenReservation(phone);
        }}
        onToggleWishlist={toggleWishlist}
        onToggleCompare={(id) => {
          toggleCompare(id);
          // Sync state for immediate feedback on bottom button highlights
          if (selectedDetailPhone && selectedDetailPhone.id === id) {
            // Re-render trigger by updating dummy or ref
            setSelectedDetailPhone({ ...selectedDetailPhone });
          }
        }}
        isSaved={selectedDetailPhone ? wishlist.includes(selectedDetailPhone.id) : false}
        isCompared={selectedDetailPhone ? comparedPhoneIds.includes(selectedDetailPhone.id) : false}
      />

      {/* Floating AI Chat Assistant Panel and Toggle Trigger */}
      <AnimatePresence>
        {isFloatingChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-24 right-6 z-[95] w-[380px] sm:w-[460px] max-w-[calc(100vw-2rem)] h-[580px] sm:h-[650px] max-h-[calc(100vh-8rem)] shadow-2xl rounded-[28px] border border-slate-200/80 bg-white overflow-hidden flex flex-col"
          >
            <AiChatAssistant 
              onReserveClick={(phone) => {
                handleOpenReservation(phone);
                setIsFloatingChatOpen(false); // Close assistant when user decides to reserve a phone
              }} 
              onCompareToggle={toggleCompare}
              comparedPhoneIds={comparedPhoneIds}
              onClose={() => setIsFloatingChatOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Gemini Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button
          onClick={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
          className="bg-slate-950 hover:bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl border border-slate-800 flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 relative hover:scale-105 active:scale-95"
          title="Ask Gemini Advisor Engine"
          id="floating-gemini-chat-btn"
        >
          {/* Active notification bubble to invite user interaction */}
          <span className="absolute top-1 right-1 w-3 h-3 bg-brand-orange border border-slate-950 rounded-full animate-pulse" />
          
          <Sparkles className={`w-5 h-5 text-brand-orange group-hover:scale-115 transition-transform duration-300 ${isFloatingChatOpen ? 'rotate-90 text-indigo-400' : ''}`} />
          <span className="text-[8px] font-black uppercase tracking-wider text-slate-300 mt-0.5">Chatbot</span>
        </button>
      </div>


    </div>
  );
}
