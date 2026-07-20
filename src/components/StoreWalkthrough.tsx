import React, { useState } from 'react';
import { SMARTPHONES } from '../data';
import { Smartphone } from '../types';
import { 
  Map, 
  Navigation, 
  Users, 
  Clock, 
  Sparkles, 
  Info, 
  CheckCircle, 
  BookmarkCheck,
  Compass,
  Video,
  Thermometer,
  Tv,
  Coffee,
  HelpCircle,
  Eye,
  Zap,
  ShoppingBag,
  Cpu,
  Wrench,
  CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';

interface Zone {
  id: string;
  name: string;
  products: string[];
  offers: string;
  stock: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
  waitingTime: string;
  x: number; // For SVG mapping coordinate
  y: number;
  width: number;
  height: number;
  color: string;
}

const STORE_ZONES: Zone[] = [
  {
    id: 'apple-zone',
    name: 'Apple Experience Desk',
    products: ['iPhone 16 Pro Max', 'iPhone 16', 'Official MagSafe Adapters'],
    offers: 'Flat ₹6,000 off on major bank credit cards',
    stock: 'High Availability',
    crowdLevel: 'Medium',
    waitingTime: '3 mins',
    x: 40,
    y: 40,
    width: 140,
    height: 100,
    color: 'fill-slate-900/10 stroke-slate-900 hover:fill-slate-900/20'
  },
  {
    id: 'samsung-zone',
    name: 'Samsung Galaxy Zone',
    products: ['Galaxy S24 Ultra', 'Galaxy S24', 'Galaxy A55 5G'],
    offers: 'Free travel adapters + flat ₹10k instant cashback',
    stock: 'High Availability',
    crowdLevel: 'Low',
    waitingTime: '1 min',
    x: 200,
    y: 40,
    width: 140,
    height: 100,
    color: 'fill-blue-500/10 stroke-blue-500 hover:fill-blue-500/20'
  },
  {
    id: 'oneplus-zone',
    name: 'OnePlus Flagship Counter',
    products: ['OnePlus 12', 'OnePlus Nord 4'],
    offers: 'Free OnePlus Buds 3 included with phone purchase',
    stock: 'In Stock',
    crowdLevel: 'High',
    waitingTime: '8 mins',
    x: 360,
    y: 40,
    width: 130,
    height: 100,
    color: 'fill-red-500/10 stroke-red-500 hover:fill-red-500/20'
  },
  {
    id: 'nothing-zone',
    name: 'Nothing Glyph Desk',
    products: ['Nothing Phone (2a) Plus', 'Nothing Ear buds'],
    offers: 'Special Flat ₹1,500 off on student verifications',
    stock: 'High Availability',
    crowdLevel: 'Low',
    waitingTime: '2 mins',
    x: 510,
    y: 40,
    width: 130,
    height: 100,
    color: 'fill-neutral-800/10 stroke-neutral-800 hover:fill-neutral-800/20'
  },
  {
    id: 'accessories',
    name: 'Accessories Hub',
    products: ['Spigen Covers', 'Fast Chargers', 'Tempered Glass'],
    offers: 'Buy Phone and get 30% off accessories bundle',
    stock: 'In Stock',
    crowdLevel: 'Medium',
    waitingTime: '4 mins',
    x: 40,
    y: 170,
    width: 140,
    height: 90,
    color: 'fill-orange-500/10 stroke-orange-500 hover:fill-orange-500/20'
  },
  {
    id: 'reception',
    name: 'Store Reception desk',
    products: ['Store brochures', 'Token dispenser'],
    offers: 'Scan QR to unlock local surprise scratch-card',
    stock: 'Always Open',
    crowdLevel: 'Low',
    waitingTime: '0 mins',
    x: 200,
    y: 170,
    width: 140,
    height: 90,
    color: 'fill-emerald-500/10 stroke-emerald-500 hover:fill-emerald-500/20'
  },
  {
    id: 'waiting-area',
    name: 'Lounge & Waiting Area',
    products: ['Coffee machines', 'Demo devices', 'Interactive TV'],
    offers: 'Enjoy free gourmet beverages while you wait',
    stock: '15 available sofas',
    crowdLevel: 'Low',
    waitingTime: '0 mins',
    x: 360,
    y: 170,
    width: 280,
    height: 90,
    color: 'fill-teal-500/10 stroke-teal-500 hover:fill-teal-500/20'
  },
  {
    id: 'service-center',
    name: 'Showroom Repair Clinic',
    products: ['Hardware repairs', 'Screen changes', 'Battery replacements'],
    offers: 'Free phone diagnostic health checks today',
    stock: '2 expert techs online',
    crowdLevel: 'Medium',
    waitingTime: '12 mins',
    x: 40,
    y: 290,
    width: 140,
    height: 100,
    color: 'fill-indigo-500/10 stroke-indigo-500 hover:fill-indigo-500/20'
  },
  {
    id: 'billing-counter',
    name: 'Billing & Cash Desk',
    products: ['EMI documentation', 'Cash/Card receipts'],
    offers: 'Unlock flat ₹1,000 coupon for your next visit',
    stock: '3 billing counters active',
    crowdLevel: 'Medium',
    waitingTime: '5 mins',
    x: 200,
    y: 290,
    width: 140,
    height: 100,
    color: 'fill-purple-500/10 stroke-purple-500 hover:fill-purple-500/20'
  },
  {
    id: 'pickup-counter',
    name: 'Smart Online Pickup desk',
    products: ['Reserved handsets', 'Unboxing assistance'],
    offers: 'Verify code and collect product in under 3 mins',
    stock: 'All digital reservations handled here',
    crowdLevel: 'Low',
    waitingTime: '1 min',
    x: 360,
    y: 290,
    width: 280,
    height: 100,
    color: 'fill-pink-500/15 stroke-pink-500 hover:fill-pink-500/25'
  }
];

interface StoreWalkthroughProps {
  lastReservedPhone: Smartphone | null;
}

const getPickupPathDetails = (zoneId: string): { d: string; distance: number; steps: number; time: number; directions: string[] } => {
  switch (zoneId) {
    case 'apple-zone':
      return {
        d: 'M 110 90 L 110 150 L 500 150 L 500 340',
        distance: 32,
        steps: 42,
        time: 27,
        directions: [
          'Exit the Apple Experience Desk southwards into the main row hallway.',
          'Walk east along the main horizontal aisle past the reception desk.',
          'Turn right at the Lounge and enter the Smart Online Pickup desk.'
        ]
      };
    case 'samsung-zone':
      return {
        d: 'M 270 90 L 270 150 L 500 150 L 500 340',
        distance: 24,
        steps: 31,
        time: 20,
        directions: [
          'Leave the Samsung Galaxy Zone and head southwards.',
          'Turn left onto the main row hallway.',
          'Turn right at the waiting area to arrive at the Pickup Counter.'
        ]
      };
    case 'oneplus-zone':
      return {
        d: 'M 425 90 L 425 150 L 500 150 L 500 340',
        distance: 16,
        steps: 21,
        time: 14,
        directions: [
          'Walk south from OnePlus Flagship Counter.',
          'Turn left onto the main row hallway corridor.',
          'Head straight down into the Smart Online Pickup desk.'
        ]
      };
    case 'nothing-zone':
      return {
        d: 'M 575 90 L 575 150 L 500 150 L 500 340',
        distance: 16,
        steps: 21,
        time: 14,
        directions: [
          'Step out of the Nothing Glyph Desk and walk southwards.',
          'Turn right onto the main row hallway corridor.',
          'Walk down directly into the Smart Online Pickup desk.'
        ]
      };
    case 'accessories':
      return {
        d: 'M 110 215 L 500 215 L 500 340',
        distance: 26,
        steps: 34,
        time: 22,
        directions: [
          'Walk straight out of the Accessories Hub heading east.',
          'Walk through the reception hallway past the waiting lounge.',
          'Turn right directly into the Smart Online Pickup desk.'
        ]
      };
    case 'reception':
      return {
        d: 'M 270 215 L 500 215 L 500 340',
        distance: 18,
        steps: 23,
        time: 15,
        directions: [
          'Leave the Reception Desk heading eastwards.',
          'Walk past the Lounge & Waiting Area hallway.',
          'Turn right to reach the Smart Online Pickup desk.'
        ]
      };
    case 'waiting-area':
      return {
        d: 'M 500 215 L 500 340',
        distance: 6,
        steps: 8,
        time: 5,
        directions: [
          'Walk straight down from the Lounge & Waiting Area.',
          'Arrive instantly at the adjacent Smart Online Pickup desk.'
        ]
      };
    case 'service-center':
      return {
        d: 'M 110 340 L 500 340',
        distance: 20,
        steps: 26,
        time: 16,
        directions: [
          'Walk straight east from the Showroom Repair Clinic.',
          'Pass the Billing & Cash Desk corridor.',
          'Arrive directly at the Smart Online Pickup desk.'
        ]
      };
    case 'billing-counter':
      return {
        d: 'M 270 340 L 500 340',
        distance: 12,
        steps: 15,
        time: 10,
        directions: [
          'Walk straight east from the Billing & Cash Desk.',
          'Arrive directly at the adjacent Smart Online Pickup desk.'
        ]
      };
    case 'pickup-counter':
      return {
        d: 'M 500 340',
        distance: 0,
        steps: 0,
        time: 0,
        directions: [
          'You are currently already at the Smart Online Pickup desk!'
        ]
      };
    default:
      return {
        d: 'M 270 215 L 500 215 L 500 340',
        distance: 18,
        steps: 23,
        time: 15,
        directions: [
          'Walk directly towards the Smart Online Pickup desk.'
        ]
      };
  }
};

export default function StoreWalkthrough({ lastReservedPhone }: StoreWalkthroughProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('reception');
  const [animateRoute, setAnimateRoute] = useState<boolean>(true);
  const [navigationMode, setNavigationMode] = useState<'entrance' | 'pickup'>(
    lastReservedPhone ? 'pickup' : 'entrance'
  );
  const [isPathClicked, setIsPathClicked] = useState<boolean>(false);
  const [zoomMode, setZoomMode] = useState<'fit' | 'zone'>('zone');

  const renderZoneLogo = (zoneId: string, sizeClass = "w-6 h-6", invertOnDark = false) => {
    switch (zoneId) {
      case 'apple-zone':
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            className={`${sizeClass} object-contain ${invertOnDark ? 'invert brightness-0' : 'filter brightness-0'}`}
            alt="Apple"
            referrerPolicy="no-referrer"
          />
        );
      case 'samsung-zone':
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
            className={`h-4 object-contain ${invertOnDark ? 'invert brightness-0' : 'filter brightness-0'}`}
            style={{ width: 'auto' }}
            alt="Samsung"
            referrerPolicy="no-referrer"
          />
        );
      case 'oneplus-zone':
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OnePlus_Logo.svg"
            className={`h-5 object-contain ${invertOnDark ? 'invert brightness-0' : 'filter brightness-0'}`}
            style={{ width: 'auto' }}
            alt="OnePlus"
            referrerPolicy="no-referrer"
          />
        );
      case 'nothing-zone':
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Nothing-Logo.svg"
            className={`h-4 object-contain ${invertOnDark ? 'invert brightness-0' : 'filter brightness-0'}`}
            style={{ width: 'auto' }}
            alt="Nothing"
            referrerPolicy="no-referrer"
          />
        );
      case 'accessories':
        return <ShoppingBag className={`${sizeClass} text-orange-500`} />;
      case 'reception':
        return <Info className={`${sizeClass} text-emerald-500`} />;
      case 'waiting-area':
        return <Coffee className={`${sizeClass} text-teal-500`} />;
      case 'service-center':
        return <Cpu className={`${sizeClass} text-indigo-500`} />;
      case 'billing-counter':
        return <CreditCard className={`${sizeClass} text-purple-500`} />;
      case 'pickup-counter':
        return <BookmarkCheck className={`${sizeClass} text-pink-500`} />;
      default:
        return <Sparkles className={`${sizeClass} text-slate-500`} />;
    }
  };

  const ZONE_IMAGES: Record<string, string> = {
    'apple-zone': 'https://images.unsplash.com/photo-1592890284241-75fd5c2f2405?q=80&w=600&auto=format&fit=crop',
    'samsung-zone': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
    'oneplus-zone': 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?q=80&w=600&auto=format&fit=crop',
    'nothing-zone': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    'accessories': 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop',
    'reception': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
    'waiting-area': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
    'service-center': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
    'billing-counter': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop',
    'pickup-counter': 'https://images.unsplash.com/photo-1521503862198-2ae9a997bbc9?q=80&w=600&auto=format&fit=crop'
  };

  const selectedZone = STORE_ZONES.find(z => z.id === selectedZoneId) || STORE_ZONES[5];

  const targetScale = selectedZone.id === 'waiting-area' || selectedZone.id === 'pickup-counter' ? 1.3 : 1.6;
  const cx = selectedZone.x + selectedZone.width / 2;
  const cy = selectedZone.y + selectedZone.height / 2;
  const tx = 340 - cx * targetScale;
  const ty = 215 - cy * targetScale;

  let targetX = selectedZone.x + selectedZone.width / 2;
  let targetY = selectedZone.y + selectedZone.height / 2;

  // If a phone is reserved, default route target is the Pickup Counter
  if (lastReservedPhone && animateRoute) {
    const pickupZone = STORE_ZONES.find(z => z.id === 'pickup-counter')!;
    targetX = pickupZone.x + pickupZone.width / 2;
    targetY = pickupZone.y + pickupZone.height / 2;
  }

  // Generate SVG path coordinate strings
  // Starts from entrance, goes to center vertical aisle, then offsets to target
  const entranceX = 340;
  const entranceY = 415;
  const pathData = `M ${entranceX} ${entranceY} L 340 215 L ${targetX} 215 L ${targetX} ${targetY}`;

  // Calculate dynamic walk statistics from entrance
  const totalEntrancePixels = 200 + Math.abs(340 - targetX) + Math.abs(215 - targetY);
  const entranceDistanceMeters = Math.round((totalEntrancePixels / 20) * 10) / 10;
  const entranceSteps = Math.round(entranceDistanceMeters * 1.3);
  const entranceTimeSeconds = Math.round(entranceDistanceMeters / 1.2);

  const pickupPath = getPickupPathDetails(selectedZone.id);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden" id="store-walkthrough">
      {/* Walkthrough Header */}
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" /> Real-Time Showroom Map
            </span>
            <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mt-2">Digital Store Walkthrough</h3>
            <p className="text-xs text-slate-500 mt-1">
              Interact with our 2D interactive layout before stepping inside. See crowd denseness, active service counters, and walkthrough routing.
            </p>
          </div>
          {lastReservedPhone && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-2.5 max-w-sm shrink-0">
              <BookmarkCheck className="w-5 h-5 text-brand-green shrink-0 animate-bounce" />
              <div>
                <p className="text-xs font-black">Pickup route activated!</p>
                <p className="text-[10px] text-emerald-600 font-semibold">
                  Your reserved <strong className="font-bold">{lastReservedPhone.name}</strong> is held at the <strong className="font-bold">Smart Online Pickup desk</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 items-stretch">
        
        {/* SVG Interactive Floor Plan Column */}
        <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-inner relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Showroom 2D Navigation Hub</span>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" /> Pickup Counter
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${navigationMode === 'pickup' ? 'bg-pink-500' : 'bg-brand-blue'} animate-pulse`} /> Live Client Route
              </div>
            </div>

            {/* Navigation Mode Selector */}
            <div className="flex bg-slate-200/60 p-1 rounded-xl gap-1 w-full sm:w-auto shrink-0 border border-slate-300/30">
              <button
                type="button"
                onClick={() => {
                  setNavigationMode('entrance');
                  setIsPathClicked(false);
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  navigationMode === 'entrance'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Navigation className="w-3 h-3 text-brand-blue" />
                Entrance Route
              </button>
              <button
                type="button"
                onClick={() => {
                  setNavigationMode('pickup');
                  setIsPathClicked(false);
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  navigationMode === 'pickup'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                Pickup Shortcut
              </button>
            </div>
          </div>

          {/* SVG Frame with relative container for absolute popup */}
          <div className="relative w-full h-auto overflow-hidden bg-slate-50/50 p-2 rounded-xl border border-slate-100">
            {/* Active zoom focus state indicator */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm border transition-all duration-300 ${
                zoomMode === 'zone' 
                  ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' 
                  : 'bg-slate-200/80 text-slate-500 border-slate-300/30'
              }`}>
                {zoomMode === 'zone' ? `🔍 Zoomed: ${selectedZone.name}` : '🌐 View: Full Showroom'}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-20 flex bg-white/95 backdrop-blur-md border border-slate-200/80 p-1 rounded-xl shadow-md gap-1 items-center">
              <button
                type="button"
                onClick={() => setZoomMode('fit')}
                className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all ${
                  zoomMode === 'fit'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Full Map
              </button>
              <button
                type="button"
                onClick={() => setZoomMode('zone')}
                className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all flex items-center gap-1 ${
                  zoomMode === 'zone'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-3 h-3" /> Focus Zone
              </button>
            </div>

            {/* Immersive Viewport Container */}
            <div 
              style={{
                transform: 'none',
                boxShadow: 'none',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%',
                maxWidth: '680px',
                margin: '0 auto',
              }}
              className="relative p-2"
            >
              <svg 
                viewBox="0 0 680 430" 
                className="w-full min-w-[550px] h-auto font-sans"
                id="store-svg-map"
              >
              <defs>
                {/* Elegant tile grid flooring pattern */}
                <pattern id="floor-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  <path d="M 30 0 L 30 30 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
                </pattern>

                {/* Table Top & Base Gradients */}
                <linearGradient id="apple-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <linearGradient id="apple-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                <linearGradient id="samsung-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="60%" stopColor="#1E40AF" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="samsung-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>

                <linearGradient id="oneplus-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="oneplus-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>

                <linearGradient id="nothing-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="70%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="nothing-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>

                <linearGradient id="accessories-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF7ED" />
                  <stop offset="70%" stopColor="#FFEDD5" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
                <linearGradient id="accessories-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#9A3412" />
                </linearGradient>

                <linearGradient id="reception-desk-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#F1F5F9" />
                  <stop offset="70%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
                <linearGradient id="reception-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>

                <linearGradient id="lounge-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CCFBF1" />
                  <stop offset="70%" stopColor="#99F6E4" />
                  <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
                <linearGradient id="lounge-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#115E59" />
                </linearGradient>

                <linearGradient id="repair-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EEF2FF" />
                  <stop offset="75%" stopColor="#E0E7FF" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
                <linearGradient id="repair-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#3730A3" />
                </linearGradient>

                <linearGradient id="billing-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5F3FF" />
                  <stop offset="70%" stopColor="#EDE9FE" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="billing-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#5B21B6" />
                </linearGradient>

                <linearGradient id="pickup-desk-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FCE7F3" />
                  <stop offset="60%" stopColor="#FBCFE8" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
                <linearGradient id="pickup-desk-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#9D174D" />
                </linearGradient>

                {/* Miniature Device Screen Glow Gradients */}
                <linearGradient id="apple-screen-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="apple-screen-glow-pink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#BE185D" />
                </linearGradient>
                <linearGradient id="apple-screen-glow-blue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
                <linearGradient id="samsung-screen-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="samsung-screen-glow-green" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>

              <motion.g
                animate={{
                  transform: zoomMode === 'zone' 
                    ? `translate(${tx}px, ${ty}px) scale(${targetScale})` 
                    : `translate(0px, 0px) scale(1)`
                }}
                transition={{
                  type: 'spring',
                  damping: 24,
                  stiffness: 100
                }}
                style={{ transformOrigin: '0px 0px' }}
              >
                {/* Store Boundary Outer Floor Tiles */}
                <rect x="10" y="10" width="660" height="410" rx="16" fill="url(#floor-grid)" />
                <rect x="10" y="10" width="660" height="410" rx="16" fill="none" stroke="#0F172A" strokeWidth="4" />
                
                {/* Render Zones */}
                {STORE_ZONES.map((zone) => {
                  const isSelected = selectedZoneId === zone.id;
                  const isReservedPickupNode = lastReservedPhone && zone.id === 'pickup-counter';

                  // Dynamic top/base gradient identifiers
                  let cleanId = zone.id.replace('-zone', '');
                  if (cleanId === 'waiting-area') cleanId = 'lounge';
                  if (cleanId === 'service-center') cleanId = 'repair';
                  if (cleanId === 'billing-counter') cleanId = 'billing';
                  if (cleanId === 'pickup-counter') cleanId = 'pickup';

                  const topGrad = `url(#${cleanId}-desk-top)`;
                  const baseGrad = `url(#${cleanId}-desk-base)`;

                  return (
                    <g 
                      key={zone.id} 
                      onClick={() => {
                        setSelectedZoneId(zone.id);
                        setAnimateRoute(false);
                        setIsPathClicked(false);
                        setZoomMode('zone');
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Floor Spotlight / Active Halo under table */}
                      <ellipse
                        cx={zone.x + zone.width / 2}
                        cy={zone.y + zone.height / 2 + 8}
                        rx={zone.width / 2 + 8}
                        ry={zone.height / 2 + 8}
                        className={`transition-all duration-500 fill-none ${
                          isSelected 
                            ? 'stroke-blue-500/30 stroke-[3px] opacity-100' 
                            : isReservedPickupNode 
                            ? 'stroke-pink-500/30 stroke-[3px] opacity-100' 
                            : 'stroke-transparent opacity-0 group-hover:stroke-slate-300/30 group-hover:opacity-60'
                        }`}
                      />

                      {/* 3D Drop Shadow Beneath Desk */}
                      <rect
                        x={zone.x + 3}
                        y={zone.y + 10}
                        width={zone.width - 6}
                        height={zone.height - 10}
                        rx="12"
                        fill="#020617"
                        opacity={isSelected ? "0.22" : "0.12"}
                        className="transition-all duration-300"
                      />

                      {/* 3D Extruded Front/Side Table Chassis */}
                      <rect
                        x={zone.x}
                        y={zone.y + 10}
                        width={zone.width}
                        height={zone.height - 10}
                        rx="12"
                        fill={baseGrad}
                        className="transition-all duration-300"
                      />

                      {/* Table Top Surface (Shifted up slightly for 3D volumetric depth) */}
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height - 10}
                        rx="12"
                        fill={topGrad}
                        stroke={
                          isSelected 
                            ? "#3B82F6" 
                            : isReservedPickupNode 
                            ? "#EC4899" 
                            : "#CBD5E1"
                        }
                        strokeWidth={isSelected ? "2.5" : "1.2"}
                        className="transition-all duration-300"
                      />

                      {/* Glass Sheen / Light Reflection Overlay */}
                      <path
                        d={`M ${zone.x + 2} ${zone.y + 2} L ${zone.x + zone.width - 2} ${zone.y + 2} L ${zone.x + 2} ${zone.y + zone.height - 12} Z`}
                        fill="#FFFFFF"
                        opacity="0.10"
                        className="pointer-events-none"
                      />

                      {/* Brand-Specific SVGs & Immersive Miniature Props */}
                      {zone.id === 'apple-zone' && (
                        <g className="pointer-events-none" opacity="0.95">
                          {/* Mini iPhones on metallic table */}
                          <g transform={`translate(${zone.x + 20}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="21" rx="3" fill="#0F172A" stroke="#E2E8F0" strokeWidth="0.8" />
                            <rect x="1" y="1" width="10" height="19" rx="2" fill="#020617" />
                            <rect x="1.5" y="1.5" width="9" height="18" rx="1.5" fill="#0A0F1D" />
                            {/* Glowing phone screen representation */}
                            <rect x="2" y="2" width="8" height="17" rx="1" fill="url(#apple-screen-glow)" />
                          </g>
                          <g transform={`translate(${zone.x + 64}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="21" rx="3" fill="#0F172A" stroke="#E2E8F0" strokeWidth="0.8" />
                            <rect x="1" y="1" width="10" height="19" rx="2" fill="#020617" />
                            <rect x="1.5" y="1.5" width="9" height="18" rx="1.5" fill="#0A0F1D" />
                            <rect x="2" y="2" width="8" height="17" rx="1" fill="url(#apple-screen-glow-pink)" />
                          </g>
                          <g transform={`translate(${zone.x + 108}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="21" rx="3" fill="#0F172A" stroke="#E2E8F0" strokeWidth="0.8" />
                            <rect x="1" y="1" width="10" height="19" rx="2" fill="#020617" />
                            <rect x="1.5" y="1.5" width="9" height="18" rx="1.5" fill="#0A0F1D" />
                            <rect x="2" y="2" width="8" height="17" rx="1" fill="url(#apple-screen-glow-blue)" />
                          </g>
                        </g>
                      )}

                      {zone.id === 'samsung-zone' && (
                        <g className="pointer-events-none" opacity="0.95">
                          {/* Galaxy displays */}
                          <g transform={`translate(${zone.x + 28}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="14" height="22" rx="2.5" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="0.8" />
                            <rect x="1" y="1" width="12" height="20" rx="1.5" fill="#020617" />
                            <rect x="2" y="2" width="10" height="18" rx="1" fill="url(#samsung-screen-glow)" />
                          </g>
                          <g transform={`translate(${zone.x + 92}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="14" height="22" rx="2.5" fill="#1E3A8A" stroke="#34D399" strokeWidth="0.8" />
                            <rect x="1" y="1" width="12" height="20" rx="1.5" fill="#020617" />
                            <rect x="2" y="2" width="10" height="18" rx="1" fill="url(#samsung-screen-glow-green)" />
                          </g>
                        </g>
                      )}

                      {zone.id === 'oneplus-zone' && (
                        <g className="pointer-events-none" opacity="0.95">
                          {/* Demos */}
                          <g transform={`translate(${zone.x + 22}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="21" rx="2" fill="#991B1B" stroke="#F87171" strokeWidth="0.8" />
                            <rect x="1" y="1" width="10" height="19" rx="1.5" fill="#EF4444" />
                          </g>
                          <g transform={`translate(${zone.x + 95}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="21" rx="2" fill="#111827" stroke="#F87171" strokeWidth="0.8" />
                            <rect x="1" y="1" width="10" height="19" rx="1.5" fill="#020617" />
                            <line x1="1" y1="10" x2="11" y2="10" stroke="#EF4444" strokeWidth="1.2" />
                          </g>
                        </g>
                      )}

                      {zone.id === 'nothing-zone' && (
                        <g className="pointer-events-none" opacity="0.95">
                          {/* Glowing glyph displays */}
                          <g transform={`translate(${zone.x + 25}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="22" rx="2.5" fill="#000000" stroke="#FFFFFF" strokeWidth="0.8" />
                            <path d="M 4 4 A 2 2 0 0 1 8 4" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
                            <circle cx="6" cy="12" r="2.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
                            <circle cx="6" cy="12" r="0.8" fill="#FFFFFF" className="animate-pulse" />
                          </g>
                          <g transform={`translate(${zone.x + 92}, ${zone.y + 48})`}>
                            <rect x="0" y="0" width="12" height="22" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="0.8" />
                            <rect x="1" y="1" width="10" height="20" rx="1.5" fill="#F8FAFC" />
                            <path d="M 4 4 A 2 2 0 0 1 8 4" stroke="#000000" strokeWidth="0.8" fill="none" />
                            <circle cx="6" cy="12" r="2.5" stroke="#000000" strokeWidth="0.8" fill="none" />
                          </g>
                        </g>
                      )}

                      {zone.id === 'accessories' && (
                        <g className="pointer-events-none" opacity="0.9">
                          <line x1={zone.x + 15} y1={zone.y + 25} x2={zone.x + zone.width - 15} y2={zone.y + 25} stroke="#F97316" strokeWidth="1" strokeDasharray="3 3" />
                          <rect x={zone.x + 25} y={zone.y + 32} width="8" height="12" rx="1.5" fill="#EF4444" />
                          <rect x={zone.x + 52} y={zone.y + 32} width="8" height="12" rx="1.5" fill="#3B82F6" />
                          <rect x={zone.x + 80} y={zone.y + 32} width="8" height="12" rx="1.5" fill="#10B981" />
                          <rect x={zone.x + 106} y={zone.y + 32} width="8" height="12" rx="1.5" fill="#F59E0B" />
                          <rect x={zone.x + 35} y={zone.y + 54} width="10" height="10" rx="1" fill="#FFFFFF" stroke="#CBD5E1" />
                          <rect x={zone.x + 90} y={zone.y + 54} width="10" height="10" rx="1" fill="#1E293B" />
                        </g>
                      )}

                      {zone.id === 'reception' && (
                        <g className="pointer-events-none" opacity="0.8">
                          <line x1={zone.x + 15} y1={zone.y + 5} x2={zone.x + zone.width - 15} y2={zone.y + 40} stroke="#E2E8F0" strokeWidth="0.7" />
                          {/* Virtual PC Monitor */}
                          <rect x={zone.x + zone.width / 2 - 12} y={zone.y + 28} width="24" height="14" rx="1" fill="#1E293B" />
                          <rect x={zone.x + zone.width / 2 - 10} y={zone.y + 29} width="20" height="10" fill="#10B981" />
                          <rect x={zone.x + zone.width / 2 - 2} y={zone.y + 42} width="4" height="6" fill="#94A3B8" />
                          <ellipse cx={zone.x + zone.width / 2} cy={zone.y + 48} rx="7" ry="2" fill="#64748B" />
                        </g>
                      )}

                      {zone.id === 'waiting-area' && (
                        <g className="pointer-events-none" opacity="0.85">
                          {/* Scandinavian Sofas with cushions */}
                          <g transform={`translate(${zone.x + 15}, ${zone.y + 22})`}>
                            <rect x="0" y="0" width="75" height="24" rx="4" fill="#475569" stroke="#334155" strokeWidth="0.5" />
                            <rect x="4" y="4" width="31" height="16" rx="2" fill="#1E293B" />
                            <rect x="40" y="4" width="31" height="16" rx="2" fill="#1E293B" />
                            <rect x="2" y="2" width="4" height="20" rx="1.5" fill="#334155" />
                            <rect x="69" y="2" width="4" height="20" rx="1.5" fill="#334155" />
                          </g>
                          <g transform={`translate(${zone.x + 115}, ${zone.y + 22})`}>
                            <rect x="0" y="0" width="75" height="24" rx="4" fill="#475569" stroke="#334155" strokeWidth="0.5" />
                            <rect x="4" y="4" width="31" height="16" rx="2" fill="#1E293B" />
                            <rect x="40" y="4" width="31" height="16" rx="2" fill="#1E293B" />
                            <rect x="2" y="2" width="4" height="20" rx="1.5" fill="#334155" />
                            <rect x="69" y="2" width="4" height="20" rx="1.5" fill="#334155" />
                          </g>
                          {/* Coffee table */}
                          <rect x={zone.x + 98} y={zone.y + 26} width="10" height="16" rx="1.5" fill="#D97706" />
                          <circle cx={zone.x + 103} cy={zone.y + 34} r="2.2" fill="#FFFFFF" />
                        </g>
                      )}

                      {zone.id === 'service-center' && (
                        <g className="pointer-events-none" opacity="0.9">
                          <rect x={zone.x + 20} y={zone.y + 20} width="100" height="42" rx="3" fill="#1E1B4B" stroke="#4338CA" strokeWidth="0.5" />
                          <rect x={zone.x + 25} y={zone.y + 25} width="16" height="10" fill="#000000" />
                          <path d={`M ${zone.x + 25} ${zone.y + 30} Q ${zone.x + 30} ${zone.y + 25} ${zone.x + 33} ${zone.y + 33} T ${zone.x + 41} ${zone.y + 30}`} stroke="#10B981" strokeWidth="0.8" fill="none" />
                        </g>
                      )}

                      {zone.id === 'billing-counter' && (
                        <g className="pointer-events-none" opacity="0.9">
                          <rect x={zone.x + 15} y={zone.y + 20} width="110" height="10" rx="2" fill="#5B21B6" />
                          <rect x={zone.x + 15} y={zone.y + 45} width="110" height="10" rx="2" fill="#5B21B6" />
                          <rect x={zone.x + 30} y={zone.y + 16} width="12" height="8" rx="1" fill="#1E293B" />
                          <rect x={zone.x + 80} y={zone.y + 16} width="12" height="8" rx="1" fill="#1E293B" />
                        </g>
                      )}

                      {zone.id === 'pickup-counter' && (
                        <g className="pointer-events-none" opacity="0.9">
                          {/* Volumetric Pink storage lockers */}
                          <rect x={zone.x + 15} y={zone.y + 20} width="250" height="40" rx="4" fill="#831843" stroke="#DB2777" strokeWidth="0.5" />
                          <line x1={zone.x + 65} y1={zone.y + 20} x2={zone.x + 65} y2={zone.y + 60} stroke="#DB2777" strokeWidth="0.5" />
                          <line x1={zone.x + 115} y1={zone.y + 20} x2={zone.x + 115} y2={zone.y + 60} stroke="#DB2777" strokeWidth="0.5" />
                          <line x1={zone.x + 165} y1={zone.y + 20} x2={zone.x + 165} y2={zone.y + 60} stroke="#DB2777" strokeWidth="0.5" />
                          <line x1={zone.x + 215} y1={zone.y + 20} x2={zone.x + 215} y2={zone.y + 60} stroke="#DB2777" strokeWidth="0.5" />
                          <line x1={zone.x + 15} y1={zone.y + 40} x2={zone.x + 265} y2={zone.y + 40} stroke="#DB2777" strokeWidth="0.5" />
                          
                          {/* Status lights & boxed models */}
                          <circle cx={zone.x + 40} cy={zone.y + 30} r="1.5" fill="#10B981" />
                          <circle cx={zone.x + 90} cy={zone.y + 30} r="1.5" fill="#10B981" />
                          <circle cx={zone.x + 140} cy={zone.y + 30} r="1.5" fill="#EF4444" />
                          <circle cx={zone.x + 190} cy={zone.y + 30} r="1.5" fill="#10B981" />
                          <circle cx={zone.x + 240} cy={zone.y + 30} r="1.5" fill="#10B981" />
                          <rect x={zone.x + 30} y={zone.y + 45} width="22" height="11" rx="1" fill="#D97706" opacity="0.8" />
                          <rect x={zone.x + 130} y={zone.y + 45} width="22" height="11" rx="1" fill="#D97706" opacity="0.8" />
                          <rect x={zone.x + 180} y={zone.y + 45} width="22" height="11" rx="1" fill="#D97706" opacity="0.8" />
                        </g>
                      )}



                      {/* 3D-styled Bottom Badge Label */}
                      <rect
                        x={zone.x + 10}
                        y={zone.y + zone.height - 24}
                        width={zone.width - 20}
                        height={13}
                        rx="4"
                        fill="#0F172A"
                        opacity={isSelected ? "0.9" : "0.75"}
                        className="transition-all duration-300"
                      />
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height - 15}
                        textAnchor="middle"
                        className="text-[8px] font-black tracking-tight fill-white uppercase select-none"
                      >
                        {zone.name.replace(' Showroom', '').replace(' Experience', '')}
                      </text>

                      {/* Floating Crowd Density Tag */}
                      <g transform={`translate(${zone.x + 8}, ${zone.y + zone.height - 8})`}>
                        <circle
                          cx="2"
                          cy="-2"
                          r="2.5"
                          className={`${
                            zone.crowdLevel === 'High' 
                              ? 'fill-red-500 animate-pulse' 
                              : zone.crowdLevel === 'Medium' 
                              ? 'fill-amber-500' 
                              : 'fill-emerald-500'
                          }`}
                        />
                        <text
                          x="8"
                          y="1"
                          className="text-[7px] fill-slate-400 font-extrabold uppercase tracking-wide"
                        >
                          {zone.crowdLevel} Wait
                        </text>
                      </g>
                    </g>
                  );
                })}

              {/* Entrance visual gate block */}
              <g>
                <rect x="290" y="415" width="100" height="15" fill="#0F172A" rx="4" />
                <text x="340" y="426" textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-black uppercase tracking-widest">
                  MAIN ENTRANCE
                </text>
              </g>

              {/* Dynamic Animated Clickable Walkthrough Routes */}
              {navigationMode === 'entrance' ? (
                <>
                  {/* Invisible broad hitbox path for flawless clickable triggers */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="16"
                    className="cursor-pointer"
                    onClick={() => setIsPathClicked(prev => !prev)}
                  />
                  {/* Styled visible line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="animate-[dash_10s_linear_infinite] pointer-events-none"
                    style={{
                      strokeDashoffset: 100,
                      transition: 'd 0.5s ease-in-out'
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Invisible broad hitbox path for flawless clickable triggers */}
                  <path
                    d={pickupPath.d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="16"
                    className="cursor-pointer"
                    onClick={() => setIsPathClicked(prev => !prev)}
                  />
                  {/* Styled visible line with premium glow */}
                  <path
                    d={pickupPath.d}
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="animate-[dash_10s_linear_infinite] pointer-events-none drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                    style={{
                      strokeDashoffset: 100,
                      transition: 'd 0.5s ease-in-out'
                    }}
                  />
                </>
              )}

              {/* Beacons and Markers based on mode */}
              {navigationMode === 'entrance' ? (
                <g className="pointer-events-none">
                  {/* Starting node marker */}
                  <circle cx={entranceX} cy={entranceY} r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  
                  {/* Bouncing arrival pin */}
                  <circle
                    cx={targetX}
                    cy={targetY}
                    r="7"
                    className="fill-brand-blue stroke-white stroke-2 animate-bounce"
                  />
                  <circle
                    cx={targetX}
                    cy={targetY}
                    r="14"
                    className="fill-brand-blue/20 stroke-none animate-ping"
                  />
                </g>
              ) : (
                <g className="pointer-events-none">
                  {/* Current view starting beacon */}
                  <circle 
                    cx={selectedZone.x + selectedZone.width / 2} 
                    cy={selectedZone.y + selectedZone.height / 2} 
                    r="6" 
                    fill="#3B82F6" 
                    stroke="#FFFFFF" 
                    strokeWidth="2" 
                    className="animate-pulse"
                  />
                  <circle 
                    cx={selectedZone.x + selectedZone.width / 2} 
                    cy={selectedZone.y + selectedZone.height / 2} 
                    r="12" 
                    className="fill-blue-500/20 stroke-none animate-ping"
                  />
                  
                  {/* Pickup counter ending pin */}
                  {selectedZoneId !== 'pickup-counter' && (
                    <>
                      <circle
                        cx={500}
                        cy={340}
                        r="8"
                        className="fill-pink-500 stroke-white stroke-2 animate-bounce"
                      />
                      <circle
                        cx={500}
                        cy={340}
                        r="16"
                        className="fill-pink-500/20 stroke-none animate-ping"
                      />
                    </>
                  )}
                </g>
              )}
              </motion.g>
            </svg>
            </div>

            {/* In-Map Clickable Path Floating Directions Card */}
            {isPathClicked && (
              <div 
                className="absolute inset-x-4 bottom-4 bg-slate-950/95 backdrop-blur text-white p-4 rounded-2xl shadow-2xl border border-slate-800 z-30 flex items-start gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <div className="p-2 bg-pink-500/10 text-pink-500 rounded-xl shrink-0 border border-pink-500/20">
                  <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase text-pink-400 tracking-wider">
                      {navigationMode === 'entrance' ? 'Entrance Navigation active' : 'Shortest Path details'}
                    </h4>
                    <button 
                      type="button"
                      onClick={() => setIsPathClicked(false)}
                      className="text-[9px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-lg text-slate-400 hover:text-white font-bold transition-all"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-100 truncate">
                    {navigationMode === 'entrance' 
                      ? `Walking from Main Entrance to ${selectedZone.name}`
                      : `From ${selectedZone.name} to Pickup Counter`
                    }
                  </p>
                  
                  {/* Walk Directions */}
                  <div className="mt-2 text-[10px] text-slate-300 space-y-1 border-t border-slate-800 pt-1.5 font-medium">
                    {navigationMode === 'entrance' ? (
                      <div>
                        Walk straight through the Main Entrance. Turn and follow the blue indicators directly to the <strong className="text-brand-blue font-bold">{selectedZone.name}</strong>. (~{entranceDistanceMeters}m)
                      </div>
                    ) : (
                      pickupPath.directions.map((dir, i) => (
                        <div key={i} className="flex gap-1.5 items-start">
                          <span className="text-pink-400 font-bold">0{i+1}.</span>
                          <span>{dir}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-[10px] text-slate-500 font-bold italic mt-2 text-center bg-white py-2.5 rounded-xl border border-slate-100 px-4">
            {navigationMode === 'entrance' 
              ? '💡 Pro Tip: Tap any zone block above to plot a live route. Click the blue path on the map for walking directions.'
              : '✨ Interactive Path: Click the dashed pink path line on the map to show/hide detailed step-by-step walking directions!'
            }
          </div>
        </div>

        {/* Selected Zone details Column */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md space-y-5">
            <div>
              <span className="text-[9px] font-black uppercase bg-slate-100 px-2.5 py-1 rounded-full text-slate-500 tracking-wider">
                Showroom Zone Insights
              </span>
              <h4 className="text-lg font-display font-black text-slate-950 mt-2 flex items-center gap-2">
                {renderZoneLogo(selectedZone.id, "w-6 h-6", false)}
                <span>{selectedZone.name}</span>
              </h4>
            </div>

            {/* Metric widgets */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Users className="w-4 h-4 text-brand-blue" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Crowd Flow</span>
                  <span className="text-xs font-black text-slate-800 block mt-0.5">{selectedZone.crowdLevel} Density</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-orange" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Waiting Time</span>
                  <span className="text-xs font-black text-slate-800 block mt-0.5">{selectedZone.waitingTime}</span>
                </div>
              </div>
            </div>

            {/* List of models available inside this zone */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Models Displayed Here:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedZone.products.map((pName, index) => (
                  <span key={index} className="text-[11px] font-bold bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1 rounded-xl">
                    📱 {pName}
                  </span>
                ))}
              </div>
            </div>

            {/* Live active promo inside that zone */}
            <div className="bg-brand-blue/5 border border-brand-blue/15 p-3.5 rounded-xl space-y-1">
              <span className="text-[9px] uppercase font-black text-brand-blue tracking-wider block">Live Desk Promo:</span>
              <p className="text-xs text-slate-700 font-bold leading-normal">
                {selectedZone.offers}
              </p>
            </div>

            {/* Walking Metrics */}
            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl space-y-2">
              <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">
                {navigationMode === 'entrance' ? 'Est. Walk from Entrance:' : 'Shortest Path to Pickup Desk:'}
              </span>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Total Distance:</span>
                <span className="font-mono font-black text-slate-900">
                  {navigationMode === 'entrance' ? `~${entranceDistanceMeters} meters` : `~${pickupPath.distance} meters`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Estimated Transit:</span>
                <span className="font-mono font-black text-slate-900">
                  {navigationMode === 'entrance' ? `${entranceTimeSeconds} seconds` : `${pickupPath.time} seconds`}
                </span>
              </div>
              {navigationMode === 'pickup' && (
                <div className="flex justify-between items-center text-xs border-t border-slate-200/60 pt-2">
                  <span className="font-bold text-slate-700">Estimated Steps:</span>
                  <span className="font-mono font-black text-pink-600">
                    {pickupPath.steps} steps
                  </span>
                </div>
              )}
            </div>

            {/* Step-by-Step Directions inside the details container */}
            {navigationMode === 'pickup' && (
              <div className="bg-pink-50/50 border border-pink-100 rounded-xl p-3.5 space-y-2 animate-in fade-in duration-200">
                <span className="text-[9px] uppercase font-black text-pink-600 tracking-wider block">
                  Step-by-Step Directions:
                </span>
                <div className="space-y-1.5 text-[11px] font-semibold text-slate-700 leading-normal">
                  {pickupPath.directions.map((dir, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <span className="text-pink-600 font-bold">0{i+1}.</span>
                      <span>{dir}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Business Pitch badge */}
          <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 relative overflow-hidden space-y-2">
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-xl pointer-events-none" />
            <h5 className="text-xs font-black text-brand-orange uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Skip Waiting Lines
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              SMART MOBILES guarantees zero unboxing delays. When you reserve a phone online, it is immediate-ready at the **Pickup Counter**. Touch, test, and walk out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
