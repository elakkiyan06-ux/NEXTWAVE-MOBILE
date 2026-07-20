import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Cpu, Award, Zap, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Smartphone } from '../types';

interface AiReasoningModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: Smartphone | null;
  persona: string;
}

const AI_REASONING_DATA: Record<string, {
  matchScore: number;
  highlight: string;
  personaFit: string;
  hardwareMVP: { label: string; spec: string; logic: string };
  accessoryCurated: string;
}> = {
  // --- Student ---
  'Student_oneplus-12': {
    matchScore: 97,
    highlight: 'Budget Flagship Performance & Hyper-Fast 100W Charging',
    personaFit: 'The OnePlus 12 provides an unbeatable blend of ultra-premium hardware and gaming capacity without the premium brand tax. For students, the Snapdragon 8 Gen 3 paired with a smooth 120Hz refresh rate screen makes it perfect for intense gaming breaks between lectures, while the massive battery and Dual-Cryo cooling system ensure it stays ice-cold under load.',
    hardwareMVP: {
      label: 'Dual Cryo-Velocity Cooling',
      spec: '9140mm² Extra-Large Vapor Chamber',
      logic: 'Prevents thermal throttling and frame drops during intense gaming sessions or heavy study group research.'
    },
    accessoryCurated: 'OnePlus SuperVOOC 100W Car Charger - perfect for rapid power recovery during busy campus commutes.'
  },
  'Student_galaxy-s24': {
    matchScore: 94,
    highlight: 'Galaxy AI Study Assistant & Ultra-Compact Portability',
    personaFit: 'The compact Galaxy S24 fits easily into active campus life. Its Galaxy AI integration acts as an on-device personal research tutor—letting students transcribe lectures, auto-summarize extensive PDFs in Samsung Notes, and use Circle to Search to instantly lookup formulas or diagrams during exam prep.',
    hardwareMVP: {
      label: 'Lecture Audio Transcriber',
      spec: 'Galaxy AI Voice Assistant / Voice Recorder',
      logic: 'Auto-records lectures and instantly converts complex voice files into structured bullet-point summaries.'
    },
    accessoryCurated: 'Samsung Galaxy Buds2 Pro - features Active Noise Cancellation to focus inside noisy libraries.'
  },
  'Student_iphone-16': {
    matchScore: 95,
    highlight: 'Next-Gen Apple Silicon A18 & Robust Apple Ecosystem Entry',
    personaFit: 'Perfect entry point for students who want high performance within Apple ecosystem. The A18 chip matches high-end desktop compute levels, letting you compile apps, edit classroom presentations, and run AAA games fluidly. With Apple Intelligence, you get system-wide writing tools for polishing essays.',
    hardwareMVP: {
      label: 'A18 Neural Engine Compute',
      spec: 'A18 chip with 16-core Neural Engine',
      logic: 'Accelerates local AI processing, making academic writing tools, dictation, and school tasks lightning-fast.'
    },
    accessoryCurated: 'Apple Pencil / iPad Companion Bundle - seamlessly syncs your notes and diagrams via iCloud.'
  },

  // --- Professional ---
  'Professional_pixel-9-pro': {
    matchScore: 98,
    highlight: 'Gemini Advanced Workspace & Crystal Clear Business Communications',
    personaFit: 'Curated for the executive, the Pixel 9 Pro is built entirely around Google Workspace integration. Use Gemini Nano to live-translate business calls, draft client replies, or query your Gmail inbox instantly. Clean stock Android ensures no bloatware or distractions during your workday.',
    hardwareMVP: {
      label: 'Titan M2 Dedicated Security Core',
      spec: 'Titan M2 Coprocessor & Knox equivalents',
      logic: 'Provides hardware-level cryptographic isolation, keeping proprietary corporate data and emails perfectly secure.'
    },
    accessoryCurated: 'Spigen Tough Armor Case - highly professional design that protects against drop damages on site.'
  },
  'Professional_galaxy-s24-ultra': {
    matchScore: 99,
    highlight: 'Integrated S-Pen Executive Hub & Multi-Screen Productivity',
    personaFit: 'This is the ultimate workspace tool. The flat 6.8-inch screen with an integrated S-Pen stylus allows working professionals to annotate reports, sign official agreements on-the-go, and sketch diagrams. Samsung DeX enables casting a complete virtual desktop layout directly onto office conference monitors.',
    hardwareMVP: {
      label: 'Samsung DeX Interface',
      spec: 'USB 3.2 DisplayPort Desktop Mode',
      logic: 'Transforms your smartphone into a full computer setup by connecting it to external keyboards and monitors.'
    },
    accessoryCurated: 'Anker Nano 3 30W Charger - ensures rapid power recovery during quick airport layovers.'
  },
  'Professional_iphone-16-pro-max': {
    matchScore: 97,
    highlight: 'Dynamic Island Task Hub & All-Day High Capacity Battery',
    personaFit: 'Engineered for seamless corporate performance. Apple Business Manager support ensures secure fleet onboarding. Dynamic Island updates you on live Slack threads or cab arrivals without having to toggle apps. The extraordinary battery life easily outlasts long business travels and video-conferencing arrays.',
    hardwareMVP: {
      label: 'Extreme Battery Architecture',
      spec: '4685 mAh Power Cell with A18 Pro Efficiency',
      logic: 'Delivers continuous, reliable performance through long flights and extended business hours.'
    },
    accessoryCurated: 'Apple MagSafe Battery Pack - snap-on power for non-stop back-to-back meeting days.'
  },

  // --- Photographer ---
  'Photographer_iphone-16-pro-max': {
    matchScore: 99,
    highlight: 'ProRes Cinematic Recording & Hardware Camera Control Sensor',
    personaFit: 'For creative directors and vloggers, the iPhone 16 Pro Max is a true pocket cinematic rig. It offers professional 4K120 ProRes video capture directly onto external SSDs, along with high fidelity spatial audio. The Camera Control physical gesture button gives instant access to exposure, aperture, and depth of field.',
    hardwareMVP: {
      label: 'Camera Control Tactile Button',
      spec: 'Force-sensitive camera shutter & slider key',
      logic: 'Slide to adjust zoom, depth of field, or photographic styles instantly without tapping the glass screen.'
    },
    accessoryCurated: 'SanDisk Extreme Portable SSD - connect via USB-C to record high-bitrate ProRes video directly.'
  },
  'Photographer_pixel-9-pro': {
    matchScore: 98,
    highlight: 'Computational Magic Editor & 30x Super Res Zoom Telephoto',
    personaFit: 'The Google Pixel 9 Pro uses advanced computational photography to produce incredible, color-accurate portraits. The Zoom Enhance AI model sharpens details even at extreme digital zooms. The Magic Editor allows photographers to dynamically recompose shots, shift sky tones, or erase crowd distracting factors instantly.',
    hardwareMVP: {
      label: 'Magic Editor AI Suite',
      spec: 'On-device Gemini-powered Generative Fill',
      logic: 'Reimagines lighting, deletes unwanted elements, and adjusts composition after the photo is already taken.'
    },
    accessoryCurated: 'Premium Phone Tripod & Ring Light - perfect for stable astronomical shots or studio portraiture.'
  },
  'Photographer_galaxy-s24-ultra': {
    matchScore: 97,
    highlight: '200MP Primary Sensor & Expert RAW Pro Control Studio',
    personaFit: 'An absolute photography behemoth featuring 200MP sensor technology, allowing photographers to crop heavily into landscapes without losing any detail. Expert RAW integration outputs uncompressed raw files, allowing for custom color grading in Lightroom, while dual telephotos span 3x to 100x distances.',
    hardwareMVP: {
      label: '200MP Isocell HP2 Sensor',
      spec: '1/1.3" high resolution sensor with pixel binning',
      logic: 'Produces highly detailed photos in low-light environments and yields enormous RAW files for master editing.'
    },
    accessoryCurated: 'Lexar Professional USB-C Dual-Slot Reader - perfect for moving high-resolution raw imagery.'
  },

  // --- Business ---
  'Business_galaxy-s24-ultra': {
    matchScore: 99,
    highlight: 'Knox Defense Suite & S-Pen Signature Workspace',
    personaFit: 'The Galaxy S24 Ultra matches the needs of high-ranking corporate leaders and founders. It offers enterprise-grade military Knox security shielding, blocking side-loading attacks and safeguarding core crypto-wallets or accounts. Dual eSIM support streamlines cross-continental business travel.',
    hardwareMVP: {
      label: 'Knox Security Enclave',
      spec: 'Samsung Knox Vault hardware isolation',
      logic: 'Isolates confidential PINs, biometric credentials, and corporate certificates from the main OS to block exploits.'
    },
    accessoryCurated: 'Samsung Trio Wireless Charger Pad - charges phone, galaxy watch, and earbuds on your office desk.'
  },
  'Business_iphone-16-pro-max': {
    matchScore: 96,
    highlight: 'Secure Enclave Biometrics & High Corporate Residual Value',
    personaFit: 'A standard in global business leadership. Provides high-security biometric Face ID integration, seamlessly authenticating banking APIs and confidential enterprise apps. Apple Trade-In guarantees a predictable, high residual asset value, reducing corporate fleet refresh costs.',
    hardwareMVP: {
      label: 'Secure Enclave Biometrics',
      spec: 'FaceID infrared dot projector + isolated enclave',
      logic: 'Blocks spoofing and provides fast biometric authentication for secure remote server login.'
    },
    accessoryCurated: 'Belkin BoostCharge Pro 3-in-1 - elegant metallic desktop charging station for an organized executive desk.'
  },
  'Business_pixel-9-pro': {
    matchScore: 95,
    highlight: 'Google Workspace Fleet Management & Titan Security',
    personaFit: 'The Pixel 9 Pro is highly recommended for business domains fully invested in Google Cloud, Android Enterprise, and Google Workspace ecosystems. Titan M2 architecture shields the boot sector, while AI-powered Call Assist automatically filters spam and robocalls to keep business interactions focus-driven.',
    hardwareMVP: {
      label: 'Titan M2 Dedicated Shield',
      spec: 'Google-designed independent security module',
      logic: 'Verifies operating system integrity on boot to defend your business from advanced hardware hacks.'
    },
    accessoryCurated: 'Bellroy Premium Leather Wallet Case - professional, high-grade leather with space for corporate keycards.'
  }
};

export default function AiReasoningModal({
  isOpen,
  onClose,
  phone,
  persona,
}: AiReasoningModalProps) {
  if (!phone) return null;

  const key = `${persona}_${phone.id}`;
  const data = AI_REASONING_DATA[key] || {
    matchScore: 92,
    highlight: 'High Capability Flagship & Smart Efficiency',
    personaFit: `This handset excels at delivering premium processing power, durable glass chassis architecture, and excellent daylight cameras tailored specifically for ${persona} daily routines.`,
    hardwareMVP: {
      label: 'System Performance CPU',
      spec: phone.specs.processor,
      logic: 'Delivers high processing speeds and multi-app orchestration to maintain snappy system load responses.'
    },
    accessoryCurated: 'Premium high-speed wired charger adapter to support maximum fast charging limits.'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[200] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 210 }}
              className="bg-white rounded-[28px] border border-slate-200 shadow-2xl w-full max-w-lg p-6 md:p-7 relative overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Sparkly Ambient Corner Background */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-brand-orange/10 via-brand-blue/5 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-md shadow-brand-orange/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-slate-950 text-base leading-snug">
                      Gemini Recommendation Reasoning
                    </h3>
                    <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">
                      Target Role: {persona}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Body */}
              <div className="mt-5 space-y-5 flex-1 overflow-y-auto max-h-[70vh] pr-1">
                {/* Handset Overview Card */}
                <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="w-16 h-16 bg-white rounded-xl border border-slate-200/80 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                    <img
                      src={phone.imageUrl}
                      alt={phone.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{phone.brand}</span>
                    <h4 className="font-display font-black text-slate-900 text-sm leading-tight -mt-0.5">{phone.name}</h4>
                    <p className="font-mono text-xs font-bold text-slate-800 mt-0.5">₹{phone.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex flex-col items-center justify-center bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shadow-sm shadow-emerald-500/5">
                      <span className="text-[10px] font-black text-emerald-800 leading-none">{data.matchScore}%</span>
                      <span className="text-[7px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5 leading-none">Match</span>
                    </div>
                  </div>
                </div>

                {/* Highlight Slogan */}
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-brand-orange uppercase tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3 text-brand-orange" /> Recommendation Pillar
                  </span>
                  <h5 className="font-display font-bold text-slate-950 text-sm leading-tight">
                    {data.highlight}
                  </h5>
                </div>

                {/* Persona Fit Long Logic */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/20 p-4 rounded-2xl border border-slate-200/50 relative">
                  <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                    {data.personaFit}
                  </p>
                </div>

                {/* Hardware MVP Component */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" /> Key Hardware Multiplier
                  </span>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {data.hardwareMVP.label}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-brand-blue truncate max-w-[200px]">
                        {data.hardwareMVP.spec}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal pl-0.5 pt-1 border-t border-slate-100">
                      {data.hardwareMVP.logic}
                    </p>
                  </div>
                </div>

                {/* Curated Accessory Recommendation */}
                <div className="space-y-1.5 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
                  <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" /> Curated Bundle Advantage
                  </span>
                  <p className="text-[11.5px] text-emerald-800 font-medium leading-relaxed">
                    {data.accessoryCurated}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3 relative z-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                >
                  Back to Curated Feed
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                  }}
                  className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  Keep Handset Focus <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
