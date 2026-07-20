import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Info, Award, Wind, RefreshCw, Wrench, 
  ShieldCheck, ArrowRight, ShieldAlert, Sparkles 
} from 'lucide-react';
import { getSustainabilityData } from '../sustainabilityData';

interface GreenPhoneHoverCardProps {
  phoneId: string;
  phoneName: string;
  className?: string;
}

export default function GreenPhoneHoverCard({
  phoneId,
  phoneName,
  className = ""
}: GreenPhoneHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = getSustainabilityData(phoneId);

  // Close when clicking outside (for mobile toggle support)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getScoreColorClasses = (score: number) => {
    if (score >= 90) return {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      text: 'text-emerald-500',
      scoreText: 'text-emerald-600',
      ringColor: 'ring-emerald-500/20',
      barColor: 'bg-emerald-500'
    };
    if (score >= 85) return {
      badge: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
      text: 'text-teal-500',
      scoreText: 'text-teal-600',
      ringColor: 'ring-teal-500/20',
      barColor: 'bg-teal-500'
    };
    return {
      badge: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
      text: 'text-amber-500',
      scoreText: 'text-amber-600',
      ringColor: 'ring-amber-500/20',
      barColor: 'bg-amber-500'
    };
  };

  const colors = getScoreColorClasses(data.score);

  // Toggle for click/mobile, hover for desktop
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const showModal = isHovered || isOpen;

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Small 'Green Phone Score' Badge */}
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shadow-sm transition-all duration-300 select-none cursor-pointer ${colors.badge}`}
      >
        <Leaf className="w-3.5 h-3.5 animate-pulse" />
        <span>Eco Score:</span>
        <span className="font-mono">{data.score}</span>
      </button>

      {/* Sustainability Metrics Floating Hover Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 bottom-full mb-3 z-50 w-80 bg-slate-900 border border-slate-800 text-slate-100 p-5 rounded-2xl shadow-2xl pointer-events-auto"
            style={{ originX: 0, originY: 1 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-emerald-400" /> Green Phone Index
                </span>
                <h4 className="text-xs font-display font-black text-white leading-tight">
                  {phoneName}
                </h4>
              </div>
              
              {/* Circular score dial in header */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-950 shadow-inner">
                <span className="text-[13px] font-mono font-black text-emerald-400">
                  {data.score}
                </span>
              </div>
            </div>

            {/* Grid of Key Sustainability Metrics */}
            <div className="grid grid-cols-2 gap-3.5 my-4">
              {/* Carbon Footprint */}
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/40">
                <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Wind className="w-3 h-3 text-sky-400" /> Carbon
                </span>
                <span className="text-[11px] font-mono font-black text-slate-200 mt-1 block">
                  {data.carbon}
                </span>
              </div>

              {/* Recyclability */}
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/40">
                <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-emerald-400" /> Recyclable
                </span>
                <span className="text-[11px] font-mono font-black text-slate-200 mt-1 block">
                  {data.recyclability}% Index
                </span>
              </div>

              {/* Repairability rating */}
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/40 col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-amber-400" /> Repairability Rating
                  </span>
                  <span className="text-[11px] font-mono font-black text-slate-200">
                    {data.repairability / 10} / 10
                  </span>
                </div>
                {/* Micro progress bar for repairability */}
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${data.repairability}%` }}
                  />
                </div>
              </div>

              {/* Expected OS Lifespan Support */}
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/40 col-span-2">
                <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Lifespan Support
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-200 mt-0.5 block">
                  {data.lifespan}
                </span>
              </div>
            </div>

            {/* Material Highlight Slogan */}
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-[10.5px] text-slate-300 leading-relaxed">
              <span className="font-extrabold text-emerald-400">Materials:</span> {data.description}
            </div>

            {/* Achievement Badges list */}
            <div className="flex flex-wrap gap-1 mt-3">
              {data.badges.map((badge, idx) => (
                <span key={idx} className="text-[9px] bg-slate-800/50 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-800">
                  {badge}
                </span>
              ))}
            </div>

            {/* Footer / Guide */}
            <div className="text-[9px] text-slate-500 mt-3.5 pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span>*Verified Chennai Eco Audit</span>
              <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                Chennai Trade-In Ready <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
