import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, Cpu, Sliders, Sun, Moon, Maximize, Star, Layers,
  Play, RefreshCw, AlertCircle, Check, Info, Aperture, Gauge
} from 'lucide-react';
import { Smartphone } from '../types';
import { SMARTPHONES } from '../data';

interface CameraSliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhoneId: string;
  initialMode: 'day' | 'night' | 'portrait' | 'zoom' | 'selfie' | 'wide';
}

interface CameraModeConfig {
  key: 'day' | 'night' | 'portrait' | 'zoom' | 'selfie' | 'wide';
  label: string;
  icon: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
}

const CAMERA_MODES: CameraModeConfig[] = [
  { key: 'night', label: 'Night Sight', icon: <Moon className="w-4 h-4" />, beforeLabel: 'Raw 1.2µm Sensor (Noisy)', afterLabel: 'AI Night Sight (Denoised)' },
  { key: 'portrait', label: 'Portrait Depth', icon: <Sliders className="w-4 h-4" />, beforeLabel: 'Flat Sensor Image', afterLabel: 'Cinematic 85mm Bokeh' },
  { key: 'day', label: 'Daylight HDR', icon: <Sun className="w-4 h-4" />, beforeLabel: 'Blown-out Highlights', afterLabel: '48.2 EV Smart HDR+' },
  { key: 'zoom', label: 'Telephoto Zoom', icon: <Maximize className="w-4 h-4" />, beforeLabel: 'Pixelated 10x Crop', afterLabel: 'Super Res AI Upscaled' },
  { key: 'selfie', label: 'HDR Selfie', icon: <Star className="w-4 h-4" />, beforeLabel: 'Unbalanced Backlight', afterLabel: 'Real Tone Balanced' },
  { key: 'wide', label: 'Macro Focus', icon: <Layers className="w-4 h-4" />, beforeLabel: 'Out of Focus Blur', afterLabel: '4cm Macro Super Focus' }
];

// Richer mock comparison photos and technical statistics for the sandbox simulation
const MODAL_MOCK_DATA: Record<string, Record<string, {
  beforeUrl: string;
  afterUrl: string;
  baseIso: number;
  baseShutter: string;
  aperture: string;
  focalLength: string;
  aiPipeline: string;
  explanation: string;
  sensorInfo: string;
}>> = {
  'iphone-16-pro-max': {
    night: {
      beforeUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=30&auto=format&fit=crop&blur=2',
      afterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=90&auto=format&fit=crop',
      baseIso: 3200,
      baseShutter: '1/4s',
      aperture: 'f/1.78',
      focalLength: '24mm',
      aiPipeline: 'Apple Photonic Engine & LiDAR Depth Fusion',
      explanation: 'Merges raw pixels at the earliest stage of processing, preserving 2x more dynamic range. LiDAR computes high-fidelity micro-distance map to clear ambient noise.',
      sensorInfo: '48MP Quad-Pixel Sensor - 2.44µm Active Pixel Size'
    },
    portrait: {
      beforeUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=90&auto=format&fit=crop',
      baseIso: 160,
      baseShutter: '1/120s',
      aperture: 'f/1.2 (Simulated)',
      focalLength: '85mm equivalent',
      aiPipeline: 'Apple Depth Engine v3 & Focus Shifting API',
      explanation: 'Applies secondary stereoscopic disparity maps to isolate individual hair fibers, establishing smooth cinematic dropoff to the background.',
      sensorInfo: 'Dual Photodiode Focus Pixels - 100% Phase Detection'
    },
    day: {
      beforeUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&q=90&auto=format&fit=crop',
      baseIso: 64,
      baseShutter: '1/2000s',
      aperture: 'f/1.78',
      focalLength: '24mm',
      aiPipeline: 'Smart HDR 5 Frame Alignment',
      explanation: 'Synthesizes 4 underexposed and 4 overexposed frames inside the Neural Engine within 8ms, ensuring rich cloud textures and deep green valleys.',
      sensorInfo: 'Apple customized CMOS - Anti-Reflective Lens Coating'
    },
    zoom: {
      beforeUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=40&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=90&auto=format&fit=crop',
      baseIso: 200,
      baseShutter: '1/250s',
      aperture: 'f/2.8',
      focalLength: '120mm (5x optical)',
      aiPipeline: 'Tetraprism OIS & Digital Super Resolution',
      explanation: 'Uses 3-axis optical image stabilization executing 10,000 micro-adjustments per second, then uses neural networks to restore fine landscape foliage.',
      sensorInfo: '12MP 1/3.2" Tetraprism Telephoto Sensor'
    },
    selfie: {
      beforeUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&q=45&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&q=90&auto=format&fit=crop',
      baseIso: 250,
      baseShutter: '1/60s',
      aperture: 'f/1.9',
      focalLength: '23mm',
      aiPipeline: 'TrueDepth Deep Ambient Skin Mapping',
      explanation: 'Maps 30,000 invisible infrared dots to formulate facial dimensions. Preserves realistic facial shadows and balanced skin tones against heavy sunlight backdrops.',
      sensorInfo: '12MP TrueDepth Camera with Focus Autofocus'
    },
    wide: {
      beforeUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1000&q=90&auto=format&fit=crop',
      baseIso: 100,
      baseShutter: '1/500s',
      aperture: 'f/2.2',
      focalLength: '13mm (120° field)',
      aiPipeline: '48MP Macro Texturizer Engine',
      explanation: 'Utilizes phase-detection autofocus to zoom in to 2 centimeters. Blends macro textures with neural sharpening algorithms to inspect organic dust/hairs.',
      sensorInfo: '48MP Ultra Wide with Hybrid Autofocus'
    }
  },
  'galaxy-s24-ultra': {
    night: {
      beforeUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&q=30&auto=format&fit=crop&blur=2',
      afterUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&q=90&auto=format&fit=crop',
      baseIso: 4000,
      baseShutter: '1/2s',
      aperture: 'f/1.7',
      focalLength: '22mm',
      aiPipeline: 'Samsung ProVisual Engine & AI Multi-Frame Denoise',
      explanation: 'Employs ISP block matching algorithms. Recognizes unstable motion trails in starry or nighttime skylines and aligns pixels to neutralize shutter jitters.',
      sensorInfo: '200MP ISOCELL HP2 Sensor - 16-in-1 Pixel Binning'
    },
    portrait: {
      beforeUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=90&auto=format&fit=crop',
      baseIso: 100,
      baseShutter: '1/160s',
      aperture: 'f/1.4 (Simulated)',
      focalLength: '50mm equivalent',
      aiPipeline: 'AI Stereo Depth Map with ISP Co-processor',
      explanation: 'Extracts geometric depth coordinates. Seamlessly blurs background elements while keeping the ears, glasses, and jacket fabrics tack-sharp.',
      sensorInfo: '200MP Sensor Center Crop with AI Enhancements'
    },
    day: {
      beforeUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=90&auto=format&fit=crop',
      baseIso: 50,
      baseShutter: '1/4000s',
      aperture: 'f/1.7',
      focalLength: '22mm',
      aiPipeline: 'Super HDR Engine & 200MP Detail Enhancer',
      explanation: 'Bridges raw dynamic sensor resolution with on-board cognitive AI, unlocking vast pixel details and vivid saturated contrast values under high sun overhead.',
      sensorInfo: 'ISOCELL Super PD Autofocus Array'
    },
    zoom: {
      beforeUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1000&q=30&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1000&q=90&auto=format&fit=crop',
      baseIso: 400,
      baseShutter: '1/180s',
      aperture: 'f/3.4',
      focalLength: '115mm (5x zoom to 100x Digital)',
      aiPipeline: 'Space Zoom Super Resolution AI Model',
      explanation: 'Applies deep learning models trained on millions of high-resolution images. When zoomed beyond 10x, neural blocks recreate crisp textures on far-off peaks.',
      sensorInfo: '50MP Periscope Telephoto with 5x Optical'
    },
    selfie: {
      beforeUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&q=90&auto=format&fit=crop',
      baseIso: 200,
      baseShutter: '1/80s',
      aperture: 'f/2.2',
      focalLength: '26mm',
      aiPipeline: 'Samsung Dual Pixel Autofocus & Portrait Retouch',
      explanation: 'Instantly identifies facial structures to isolate skin, facial hair, and clothing. Prevents dynamic blowouts when taking backlit outdoor selfies.',
      sensorInfo: '12MP Dual Pixel Front Camera'
    },
    wide: {
      beforeUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=90&auto=format&fit=crop',
      baseIso: 80,
      baseShutter: '1/800s',
      aperture: 'f/2.2',
      focalLength: '13mm',
      aiPipeline: 'Geometric Distort Correction Pipeline',
      explanation: 'Uses real-time lens modeling calculations to undo peripheral fish-eye stretching on wide landscape perspectives.',
      sensorInfo: '12MP Ultra Wide with Super Steady Video support'
    }
  },
  'pixel-9-pro': {
    night: {
      beforeUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1000&q=30&auto=format&fit=crop&blur=2',
      afterUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1000&q=90&auto=format&fit=crop',
      baseIso: 5000,
      baseShutter: '1/1.5s',
      aperture: 'f/1.68',
      focalLength: '25mm',
      aiPipeline: 'Google Night Sight v4 with Gemini Tensor Core',
      explanation: 'Executes astronomical-grade bracket mapping. Merges up to 15 RAW frames and processes local shadows using Tensor G4 AI to fully illuminate pitch darkness.',
      sensorInfo: '50MP 1/1.31" Primary Sensor with Octa PD'
    },
    portrait: {
      beforeUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=1000&q=90&auto=format&fit=crop',
      baseIso: 100,
      baseShutter: '1/125s',
      aperture: 'f/1.4 (Simulated)',
      focalLength: '5x Telephoto Crop (110mm equivalent)',
      aiPipeline: 'Google HDR+ Depth Segmentation & Real Tone',
      explanation: 'Maintains incredible portrait separation, tracking fine details like single hairs, clothing collars, and background light rings (bokeh balls).',
      sensorInfo: 'On-device Tensor G4 Neural Segmentation'
    },
    day: {
      beforeUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1000&q=90&auto=format&fit=crop',
      baseIso: 50,
      baseShutter: '1/3200s',
      aperture: 'f/1.68',
      focalLength: '25mm',
      aiPipeline: 'Google HDR+ Dynamic Exposure Mapping',
      explanation: 'Recognizes sky, vegetation, and skin regions on-device, processing each block independently to yield highly realistic textures and shadows.',
      sensorInfo: '50MP Lens with Custom Dual-Exposure Bracketing'
    },
    zoom: {
      beforeUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1000&q=40&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1000&q=90&auto=format&fit=crop',
      baseIso: 320,
      baseShutter: '1/200s',
      aperture: 'f/2.8',
      focalLength: '113mm (5x optical zoom)',
      aiPipeline: 'Super Res Zoom AI Multi-Frame Fusion',
      explanation: 'Uses tiny physical hand tremors to capture additional color data between pixels, reconstructs geometric details up to 30x utilizing Tensor G4.',
      sensorInfo: '48MP Dual PD Telephoto Sensor'
    },
    selfie: {
      beforeUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=90&auto=format&fit=crop',
      baseIso: 160,
      baseShutter: '1/100s',
      aperture: 'f/2.2',
      focalLength: '20mm',
      aiPipeline: 'Google Real Tone Skin Authenticator',
      explanation: 'Trained on diverse high-quality portraits to perfectly render the texture, moisture, and dynamic color of various skin complexions with zero ashiness.',
      sensorInfo: '42MP Dual PD Selfie Camera with Autofocus'
    },
    wide: {
      beforeUrl: 'https://images.unsplash.com/photo-1472214222541-d510753a4907?w=1000&q=50&auto=format&fit=crop',
      afterUrl: 'https://images.unsplash.com/photo-1472214222541-d510753a4907?w=1000&q=90&auto=format&fit=crop',
      baseIso: 64,
      baseShutter: '1/1000s',
      aperture: 'f/1.7',
      focalLength: '12mm (123° field)',
      aiPipeline: 'Super Macro Auto-Macro Mode v2',
      explanation: 'Engages sub-millimeter focus distances automatically to resolve high-fidelity, high-contrast, macro closeups of organic materials.',
      sensorInfo: '48MP Dual PD Ultra Wide Sensor'
    }
  }
};

export default function CameraSliderModal({
  isOpen,
  onClose,
  initialPhoneId,
  initialMode,
}: CameraSliderModalProps) {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>(initialPhoneId);
  const [activeMode, setActiveMode] = useState<'day' | 'night' | 'portrait' | 'zoom' | 'selfie' | 'wide'>(initialMode);
  const [sliderPos, setSliderPos] = useState<number>(50);
  
  // Interactive Simulation Controls
  const [isoControl, setIsoControl] = useState<number>(100); // 100 to 6400
  const [shutterDuration, setShutterDuration] = useState<number>(1); // slider mapped to exposure multiplier
  const [isDenoiseOn, setIsDenoiseOn] = useState<boolean>(true);
  
  // Analyzing simulation animation state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Sync state if initial variables shift
  useEffect(() => {
    setSelectedPhoneId(initialPhoneId);
    setActiveMode(initialMode);
  }, [initialPhoneId, initialMode]);

  const activePhone = SMARTPHONES.find(p => p.id === selectedPhoneId) || SMARTPHONES[0];
  const activeConfig = CAMERA_MODES.find(m => m.key === activeMode) || CAMERA_MODES[0];
  const activeData = MODAL_MOCK_DATA[selectedPhoneId]?.[activeMode] || MODAL_MOCK_DATA['iphone-16-pro-max'][activeMode];

  // Initialize interactive settings based on base data on mode shift
  useEffect(() => {
    setIsoControl(activeData.baseIso);
    setSliderPos(50);
    setShutterDuration(1.0);
    setIsAnalyzing(false);
  }, [selectedPhoneId, activeMode, activeData]);

  // Execute Simulated AI Multi-frame Fusion process
  const triggerAiNeuralScan = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setScanProgress(0);
    
    // Animate a scanning light traversing the camera viewport
    const startTime = Date.now();
    const duration = 1400; // 1.4s

    const updateScan = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setScanProgress(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(updateScan);
      } else {
        setTimeout(() => {
          setIsAnalyzing(false);
          // Reveal the beautifully enhanced image fully
          setSliderPos(100);
        }, 100);
      }
    };

    requestAnimationFrame(updateScan);
  };

  // Drag handlers for split slider
  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderContainerRef.current) return;
    updateSliderFromCoord(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderContainerRef.current || !e.touches[0]) return;
    updateSliderFromCoord(e.touches[0].clientX);
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const updateSliderFromCoord = (clientX: number) => {
    const rect = sliderContainerRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  // Simulated live feedback filters to modify image depending on ISO and Shutter speeds
  const calculateBeforeFilter = () => {
    let brightness = 1.0;
    let blur = 0;
    let saturate = 1.0;
    let contrast = 1.0;

    // ISO alters grain and brightness. Higher ISO = noisier and slightly brighter, lower = cleaner but darker
    // Map ISO (100 to 6400)
    const isoRatio = (isoControl - 100) / 6300;
    
    // Exposure speed impact
    brightness = brightness * shutterDuration;

    // Add noise grain overlay depending on ISO
    let noiseOpacity = 0.05 + isoRatio * 0.45;
    if (!isDenoiseOn) {
      noiseOpacity = noiseOpacity * 1.5;
    }

    if (activeMode === 'night') {
      // Raw feed is darker at low exposure / low ISO
      brightness = brightness * (0.4 + isoRatio * 0.5);
      blur = isoRatio * 1.5;
    } else if (activeMode === 'portrait') {
      // In portrait, the "Before" has NO depth blur (flat lens depth)
      blur = 0;
    } else if (activeMode === 'zoom') {
      // Zoom before has pixelation
      blur = 0.8;
      contrast = 0.9;
    }

    return {
      filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
      noiseOpacity,
      blur
    };
  };

  const calculateAfterFilter = () => {
    let brightness = 1.0;
    let blur = 0;
    let saturate = 1.02; // AI slightly boosts dynamic pop
    let contrast = 1.05;

    // The AI Enhanced output is much less sensitive to ISO noise and maintains exposure stability
    const isoRatio = (isoControl - 100) / 6300;
    
    // Shutter speed still has minor realistic organic exposure adjustment
    brightness = brightness * (0.85 + (shutterDuration - 1) * 0.15);

    // Denoising control toggle
    let noiseOpacity = isDenoiseOn ? 0.01 + isoRatio * 0.03 : 0.08 + isoRatio * 0.25;

    if (activeMode === 'portrait') {
      // After image has cinematic simulated depth blur on background (simulated in CSS slightly or represented in high-res after image)
    }

    return {
      filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
      noiseOpacity
    };
  };

  const beforeParams = calculateBeforeFilter();
  const afterParams = calculateAfterFilter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Main Backdrop Glass overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[150] cursor-pointer"
          />

          {/* Fullscreen Dialog Container */}
          <div className="fixed inset-0 z-[151] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="bg-slate-900 border border-slate-800 text-slate-100 rounded-[32px] shadow-2xl w-full max-w-6xl h-auto xl:h-[88vh] flex flex-col md:grid md:grid-cols-12 overflow-hidden pointer-events-auto select-none"
            >
              
              {/* LEFT SIDEBAR: Phone & Mode Selector Tools (Col-3) */}
              <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-800/85 p-5 md:p-6 flex flex-col justify-between space-y-6 bg-slate-950/60 overflow-y-auto max-h-[40vh] md:max-h-none">
                <div className="space-y-6">
                  {/* Title & Badge */}
                  <div>
                    <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-2.5 py-1 rounded-full border border-brand-orange/25 inline-flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Interactive Sandbox
                    </span>
                    <h3 className="font-display font-black text-white text-lg tracking-tight">AI Camera Lab Pro</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Simulate actual ISP chips, raw sensor streams, and neural processing units in real-time.
                    </p>
                  </div>

                  {/* Device Selectors */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-slate-500" /> Target ISP Hardware
                    </label>
                    <div className="space-y-1.5">
                      {SMARTPHONES.filter(p => ['iphone-16-pro-max', 'galaxy-s24-ultra', 'pixel-9-pro'].includes(p.id)).map((phone) => (
                        <button
                          key={phone.id}
                          type="button"
                          onClick={() => setSelectedPhoneId(phone.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            selectedPhoneId === phone.id
                              ? 'bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-lg shadow-blue-500/10 border-none font-black'
                              : 'bg-slate-900/60 border border-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="truncate">📱 {phone.name}</span>
                          {selectedPhoneId === phone.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Camera Mode Slots */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Aperture className="w-3.5 h-3.5 text-slate-500" /> Camera Mode Presets
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
                      {CAMERA_MODES.map((mode) => (
                        <button
                          key={mode.key}
                          type="button"
                          onClick={() => setActiveMode(mode.key)}
                          className={`text-left px-3 py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            activeMode === mode.key
                              ? 'bg-slate-800 text-brand-orange border border-brand-orange/45 shadow-sm font-extrabold'
                              : 'bg-slate-900/40 border border-slate-800/20 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          <span className={`${activeMode === mode.key ? 'text-brand-orange' : 'text-slate-500'}`}>
                            {mode.icon}
                          </span>
                          <span className="truncate">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Left Side Footer */}
                <div className="pt-4 border-t border-slate-800/50 hidden md:block">
                  <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <Info className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Tested on pre-calibrated Chennai Showroom assets. Simulated with native 10-bit lossless RAW.
                    </p>
                  </div>
                </div>
              </div>

              {/* CENTER: Interactive Viewport with Sliders (Col-6) */}
              <div 
                className="md:col-span-6 p-4 sm:p-5 md:p-6 flex flex-col justify-between bg-slate-950 overflow-hidden relative"
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onTouchEnd={stopDragging}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* Viewport Top Actions */}
                <div className="flex items-center justify-between pb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                      LIVE RAW LENS STREAM
                    </span>
                  </div>

                  {/* Reset Control */}
                  <button
                    type="button"
                    onClick={() => {
                      setSliderPos(50);
                      setIsoControl(activeData.baseIso);
                      setShutterDuration(1.0);
                      setIsDenoiseOn(true);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors text-[10px] font-mono font-bold cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> RESET LAB
                  </button>
                </div>

                {/* Main Interactive Slider Viewport */}
                <div 
                  ref={sliderContainerRef}
                  className="relative aspect-video w-full rounded-[20px] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shrink-0 cursor-ew-resize select-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  {/* AFTER IMAGE (Enhanced AI Engine output) */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={activeData.afterUrl}
                      alt="AI ISP Enhanced"
                      referrerPolicy="no-referrer"
                      style={{
                        ...afterParams,
                        filter: `${afterParams.filter}`
                      }}
                      className="absolute inset-0 w-full h-full object-cover select-none transition-all duration-300"
                    />

                    {/* Grain simulated overlay depending on ISO setting for AFTER */}
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay bg-repeat"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        opacity: afterParams.noiseOpacity,
                        backgroundSize: '150px'
                      }}
                    />

                    {/* Label Badge AFTER */}
                    <div className="absolute bottom-3 right-3 bg-brand-blue/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-mono border border-brand-blue/30 z-10 font-black uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-white fill-current animate-pulse" /> {activeConfig.afterLabel}
                    </div>
                  </div>

                  {/* BEFORE IMAGE (Raw lens output) - Masked by slider coordinates */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <div className="absolute inset-0 w-full h-full" style={{ width: sliderContainerRef.current?.getBoundingClientRect().width || '1000px' }}>
                      <img
                        src={activeData.beforeUrl}
                        alt="Raw CMOS Sensor"
                        referrerPolicy="no-referrer"
                        style={{
                          ...beforeParams,
                          filter: `${beforeParams.filter} blur(${beforeParams.blur}px)`
                        }}
                        className="absolute inset-0 w-full h-full object-cover select-none transition-all duration-300"
                      />

                      {/* Grain simulated overlay depending on ISO setting for BEFORE */}
                      <div 
                        className="absolute inset-0 pointer-events-none mix-blend-overlay bg-repeat"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          opacity: beforeParams.noiseOpacity,
                          backgroundSize: '120px'
                        }}
                      />

                      {/* Label Badge BEFORE */}
                      <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md text-slate-300 px-3 py-1 rounded-full text-[9px] font-mono border border-slate-800 z-10 font-black uppercase tracking-wider flex items-center gap-1">
                        <Aperture className="w-3 h-3 text-slate-400" /> {activeConfig.beforeLabel}
                      </div>
                    </div>
                  </div>

                  {/* CENTER VERTICAL SLIDER DIVIDER */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-brand-orange shadow-lg z-20 pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-orange border-2 border-white text-white flex items-center justify-center font-bold text-xs shadow-2xl">
                      ↔
                    </div>
                  </div>

                  {/* Simulated Neural Scanning Light Overlay */}
                  {isAnalyzing && (
                    <motion.div 
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent shadow-[0_0_15px_#F97316] z-40 pointer-events-none"
                      style={{ top: `${scanProgress}%` }}
                    />
                  )}

                  {/* Simulated Neural Analyzing Overlay */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-brand-orange/5 backdrop-blur-[1px] z-30 pointer-events-none flex items-center justify-center">
                      <div className="bg-slate-950/90 border border-brand-orange/40 p-4 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <Sparkles className="w-5 h-5 text-brand-orange animate-spin" />
                        <div>
                          <p className="text-[10px] font-mono font-black text-brand-orange tracking-widest leading-none">
                            AI MULTI-FRAME FUSION ACTIVE
                          </p>
                          <p className="text-[9px] text-slate-400 mt-1 font-mono">
                            Aligning 15 sub-exposure brackets... {Math.round(scanProgress)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Viewport Bottom Info */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-2">
                  <span>← DRAG VIEWPORT TO COMPARE →</span>
                  <span className="text-brand-orange font-bold uppercase tracking-wider">
                    {sliderPos < 10 ? 'Showing full AI output' : sliderPos > 90 ? 'Showing raw sensor' : `Split: ${Math.round(sliderPos)}%`}
                  </span>
                </div>

                {/* Simulated Lens Stats Readout Overlay */}
                <div className="grid grid-cols-4 gap-2 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 mt-4">
                  <div className="text-center p-1 border-r border-slate-800">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">ISO LIMIT</span>
                    <span className="text-xs font-mono font-bold text-white block mt-0.5">{isoControl}</span>
                  </div>
                  <div className="text-center p-1 border-r border-slate-800">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">APERTURE</span>
                    <span className="text-xs font-mono font-bold text-white block mt-0.5">{activeData.aperture}</span>
                  </div>
                  <div className="text-center p-1 border-r border-slate-800">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">EXPOSURE</span>
                    <span className="text-xs font-mono font-bold text-white block mt-0.5">
                      {(shutterDuration === 1.0) ? activeData.baseShutter : `${Math.round(shutterDuration * 10) / 10}x length`}
                    </span>
                  </div>
                  <div className="text-center p-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">FOCAL LENS</span>
                    <span className="text-xs font-mono font-bold text-white block mt-0.5">{activeData.focalLength}</span>
                  </div>
                </div>

                {/* Sandbox Live Interactive Adjusters */}
                <div className="mt-4 p-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-slate-500" /> Interactive Sensor Modifiers
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ISO Control Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-400">Simulate Sensor ISO Gain:</span>
                        <span className="text-amber-500 font-bold">{isoControl}</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="6400"
                        step="100"
                        value={isoControl}
                        onChange={(e) => setIsoControl(Number(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                      />
                      <p className="text-[8px] text-slate-500 leading-none">
                        *Higher ISO simulates pixel sensor grain, testing the AI's denoise math.
                      </p>
                    </div>

                    {/* Shutter Exposure Control Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-400">Shutter Speed Length:</span>
                        <span className="text-brand-blue font-bold">{shutterDuration.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.4"
                        max="2.5"
                        step="0.1"
                        value={shutterDuration}
                        onChange={(e) => setShutterDuration(Number(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                      />
                      <p className="text-[8px] text-slate-500 leading-none">
                        *Simulates exposure duration. Longer shutter collects more light but risks blur.
                      </p>
                    </div>
                  </div>

                  {/* AI Toggles and Trigger Row */}
                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-3 items-center justify-between">
                    {/* AI Denoise Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsDenoiseOn(!isDenoiseOn)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isDenoiseOn
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isDenoiseOn ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      AI DENOISER: {isDenoiseOn ? 'ENABLED' : 'DISABLED'}
                    </button>

                    {/* AI Multi-Frame Core Scan Trigger Button */}
                    <button
                      type="button"
                      onClick={triggerAiNeuralScan}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-brand-orange text-slate-950 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-brand-orange/10 cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Run Multi-Frame Fusion
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: Computational Analysis & Specs (Col-3) */}
              <div className="md:col-span-3 p-5 md:p-6 flex flex-col justify-between space-y-6 bg-slate-950 overflow-y-auto max-h-[40vh] md:max-h-none border-t md:border-t-0 md:border-l border-slate-800/85">
                <div className="space-y-6">
                  {/* Pipeline Header */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                      AI IMAGE PIPELINE
                    </label>
                    <h4 className="font-display font-bold text-white text-sm mt-1 leading-snug">
                      {activeData.aiPipeline}
                    </h4>
                  </div>

                  {/* AI Explanation Slogan */}
                  <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-[9px] font-black text-brand-orange uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-orange" /> Neural Core Insights
                    </span>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed font-medium">
                      {activeData.explanation}
                    </p>
                  </div>

                  {/* Hardware details */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Physical Sensor Specs
                    </label>
                    
                    <div className="space-y-2">
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">SENSOR TYPE</span>
                        <span className="text-xs font-bold text-slate-200 block mt-0.5">{activeData.sensorInfo}</span>
                      </div>
                      
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">APERTURE CONTROL</span>
                        <span className="text-xs font-bold text-slate-200 block mt-0.5">Physical f-stop: {activeData.aperture}</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Benchmark Evaluation */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      ISP Score Matrix
                    </label>
                    <div className="space-y-1.5 bg-slate-900/30 p-3 rounded-2xl border border-slate-800/40">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Color Fidelity:</span>
                        <span className="font-mono font-bold text-white">9.8 / 10</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Denoising Matrix:</span>
                        <span className="font-mono font-bold text-white">{isDenoiseOn ? '9.9 / 10' : '5.2 / 10'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Dynamic Range:</span>
                        <span className="font-mono font-bold text-brand-blue">{activeMode === 'day' ? '10 / 10' : '9.6 / 10'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Reservation Shortcut / Bottom Close */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/60">
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl text-[10px] text-slate-400">
                    <span>Showroom Demo:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active in Chennai
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                    >
                      Exit Sandbox
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
