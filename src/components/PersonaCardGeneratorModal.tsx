import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Download, Share2, Check, Copy, AlertCircle, RefreshCw, Wand2, Image as ImageIcon } from 'lucide-react';
import { Smartphone } from '../types';

interface PersonaCardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: Smartphone | null;
  persona: string;
}

// Map persona to brand styling
const PERSONA_STYLES: Record<string, {
  title: string;
  gradient: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  tagline: string;
}> = {
  Student: {
    title: 'STUDENT EXPLORER MATCH',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    accentColor: '#8B5CF6',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    badgeText: '#6366F1',
    tagline: 'High refresh rate, elite performance, campus-ready.'
  },
  Professional: {
    title: 'WORKING PROFESSIONAL MATCH',
    gradient: 'from-slate-900 via-blue-900 to-indigo-950',
    accentColor: '#3B82F6',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    badgeText: '#3B82F6',
    tagline: 'Supreme multitasking, productivity booster, enterprise secure.'
  },
  Photographer: {
    title: 'CREATIVE PHOTOGRAPHER MATCH',
    gradient: 'from-rose-600 via-orange-500 to-amber-500',
    accentColor: '#F43F5E',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    badgeText: '#F43F5E',
    tagline: 'ProRes cinematic capture, Expert RAW, pristine details.'
  },
  Business: {
    title: 'BUSINESS FLAGSHIP MATCH',
    gradient: 'from-slate-950 via-teal-950 to-slate-900',
    accentColor: '#14B8A6',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    badgeText: '#14B8A6',
    tagline: 'Secure Enclave, S-Pen workspace, premium status.'
  }
};

export default function PersonaCardGeneratorModal({
  isOpen,
  onClose,
  phone,
  persona,
}: PersonaCardGeneratorModalProps) {
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCardReady, setIsCardReady] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  if (!phone) return null;

  const style = PERSONA_STYLES[persona] || {
    title: 'PERSONALIZED SMART MATCH',
    gradient: 'from-slate-900 to-slate-800',
    accentColor: '#3B82F6',
    badgeBg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    badgeText: '#64748B',
    tagline: 'Curated for premium efficiency.'
  };

  // Triggers backend AI Image Generation endpoint
  const generateAiArt = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/generate-card-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneId: phone.id, persona })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate card artwork. Please use local standard artwork.");
      }

      const data = await res.json();
      if (data.imageUrl) {
        setAiImageUrl(data.imageUrl);
      } else {
        throw new Error("Invalid response schema from backend.");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Unable to contact the AI generation server.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Clear AI art state when phone or persona changes
  useEffect(() => {
    setAiImageUrl(null);
    setErrorMsg(null);
    setIsCardReady(false);
  }, [phone.id, persona]);

  // Redraw the canvas card whenever dependencies change
  useEffect(() => {
    if (!isOpen || !phone) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsCardReady(false);

    // Set canvas dimensions (e.g. 800x800 high res square layout)
    canvas.width = 800;
    canvas.height = 800;

    // Background Gradient Draw
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#0F172A'); // deep slate base
    bgGrad.addColorStop(1, '#020617'); // near black
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dynamic accent glows in the background
    const glowGrad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 50,
      canvas.width / 2, canvas.height / 2, 450
    );
    glowGrad.addColorStop(0, style.accentColor + '22'); // semi-transparent accent color
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer Neon border
    ctx.strokeStyle = style.accentColor + '55';
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner subtle border
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Header title band
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(40, 40, canvas.width - 80, 75);

    // Draw Persona Badge Header text
    ctx.font = 'black 20px "Inter", sans-serif';
    ctx.fillStyle = style.accentColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡ GREENPHONE AI CURATION', 65, 77);

    ctx.font = 'black 13px "Courier New", monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'right';
    ctx.fillText('REF_NO: GP-' + phone.id.toUpperCase(), canvas.width - 65, 77);

    // Main Image Box
    const drawContent = () => {
      // Draw phone details
      ctx.textAlign = 'left';
      
      // Brand & Name
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.fillText(phone.brand.toUpperCase() + ' FLAGSHIP', 65, 520);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 38px "Inter", sans-serif';
      ctx.fillText(phone.name, 65, 565);

      // Price Tag Box
      const priceText = '₹' + phone.price.toLocaleString('en-IN');
      ctx.font = '900 24px "Courier New", monospace';
      const priceWidth = ctx.measureText(priceText).width;

      ctx.fillStyle = style.accentColor + '22';
      ctx.fillRect(65, 595, priceWidth + 30, 45);
      ctx.strokeStyle = style.accentColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(65, 595, priceWidth + 30, 45);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(priceText, 80, 618);

      // Draw match score ring in corner
      const centerX = canvas.width - 120;
      const centerY = 580;
      const radius = 55;

      // Outer glow circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1E293B';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = style.accentColor;
      ctx.stroke();

      // Percentage text
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 28px "Inter", sans-serif';
      ctx.fillText('99%', centerX, centerY - 5);
      
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 10px "Inter", sans-serif';
      ctx.fillText('AI MATCH', centerX, centerY + 18);

      // Persona Specific description tagline
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'italic 16px "Inter", sans-serif';
      ctx.fillText(`"${style.tagline}"`, 65, 680);

      // Specs bullet boxes
      const specsY = 715;
      const specBoxWidth = 210;
      const specBoxHeight = 45;

      const specsToDraw = [
        { label: 'PROCESSOR', value: phone.specs.processor },
        { label: 'CAMERA', value: phone.specs.camera },
        { label: 'BATTERY', value: phone.specs.battery }
      ];

      specsToDraw.forEach((spec, i) => {
        const x = 65 + i * (specBoxWidth + 18);
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(x, specsY, specBoxWidth, specBoxHeight);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, specsY, specBoxWidth, specBoxHeight);

        // Subtext label
        ctx.fillStyle = style.accentColor;
        ctx.font = 'bold 9px "Inter", sans-serif';
        ctx.fillText(spec.label, x + 10, specsY + 15);

        // Main spec value
        ctx.fillStyle = '#E2E8F0';
        ctx.font = 'bold 12px "Inter", sans-serif';
        const truncatedValue = spec.value.length > 25 ? spec.value.substring(0, 22) + '...' : spec.value;
        ctx.fillText(truncatedValue, x + 10, specsY + 32);
      });

      setIsCardReady(true);
    };

    // Load either AI-generated art, or the default product handset image
    const imageToLoad = aiImageUrl || phone.imageUrl;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = imageToLoad;

    img.onload = () => {
      // Draw centered showcase backdrop
      const destX = 140;
      const destY = 135;
      const destWidth = 520;
      const destHeight = 340;

      // Soft rounded container backing for image
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(destX, destY, destWidth, destHeight);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(destX, destY, destWidth, destHeight);

      // Blends image cleanly
      ctx.drawImage(img, destX + 10, destY + 10, destWidth - 20, destHeight - 20);

      // Add a nice "STYLIZED ART WORK" tag overlay if generated by AI
      if (aiImageUrl) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fillRect(destX + 15, destY + 15, 160, 30);
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'black 10px "Courier New", monospace';
        ctx.fillText('✨ GEMINI GENERATED', destX + 25, destY + 30);
      } else {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fillRect(destX + 15, destY + 15, 140, 30);
        ctx.fillStyle = '#3B82F6';
        ctx.font = 'black 10px "Courier New", monospace';
        ctx.fillText('📷 PHOTO ARCHIVE', destX + 25, destY + 30);
      }

      drawContent();
    };

    img.onerror = () => {
      // Fallback if image load fails
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(140, 135, 520, 340);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '16px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('[ Handset Showcase Image ]', canvas.width / 2, 305);
      drawContent();
    };

  }, [isOpen, phone, persona, aiImageUrl]);

  // Triggers image download from Canvas
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      link.download = `GreenPhone_Persona_Card_${phone.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error("Canvas toDataURL failed:", e);
      alert("Due to sandbox restrictions, please right-click the image preview inside the modal and click 'Save Image As'.");
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?handset=${phone.id}&ref=personalized_card`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[210] cursor-pointer"
          />

          {/* Modal content body */}
          <div className="fixed inset-0 z-[211] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="bg-slate-900 border border-slate-800 text-slate-100 rounded-[28px] shadow-2xl w-full max-w-4xl p-5 md:p-6 relative overflow-hidden pointer-events-auto flex flex-col md:flex-row gap-6 max-h-[92vh] md:max-h-none overflow-y-auto"
            >
              {/* Header Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close generator modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Canvas Preview */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 relative">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block self-start pl-1">
                  🔴 Live Preview (HQ PNG Output)
                </span>
                
                {/* Visual Showcase Card Container */}
                <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
                  {/* Real Canvas element containing the assembly */}
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-full object-contain"
                  />
                  
                  {!isCardReady && (
                    <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-8 h-8 text-brand-orange animate-spin" />
                      <p className="text-xs font-bold text-slate-400">Rendering digital asset card...</p>
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Tip: On mobile devices, tap & hold the card preview to directly download or add to album.
                </p>
              </div>

              {/* Right Column: Custom Generation controls */}
              <div className="w-full md:w-[350px] flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-brand-orange/10 text-brand-orange font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-brand-orange/20">
                      <Sparkles className="w-3 h-3 fill-current" /> Persona Card Generator
                    </span>
                    <h3 className="text-xl font-display font-black tracking-tight text-white leading-tight">
                      Stylized Recommendation
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Assemble, generate customized digital artwork, and download a 'Persona-Matched' badge card for social feeds.
                    </p>
                  </div>

                  {/* Persona Indicator Badge info */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Selected Persona:</span>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase border ${style.badgeBg}`}>
                        {persona}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Smartphone:</span>
                      <span className="text-white font-bold">{phone.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700 leading-relaxed italic">
                      {style.tagline}
                    </div>
                  </div>

                  {/* AI Art Generation Callout */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                        <Wand2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Gemini Stylized Background</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          Harness Gemini-3.1-flash-lite-image to generate a bespoke backdrop theme reflecting your {persona} role.
                        </p>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl flex items-center gap-2 text-xs">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={generateAiArt}
                      className="w-full bg-gradient-to-r from-amber-500 to-brand-orange hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs tracking-tight transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating AI Background...</span>
                        </>
                      ) : aiImageUrl ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Regenerate AI Background</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          <span>Generate Stylized AI Art</span>
                        </>
                      )}
                    </button>
                    
                    {aiImageUrl && (
                      <button
                        type="button"
                        onClick={() => setAiImageUrl(null)}
                        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold py-1.5 rounded-lg text-[10px] tracking-tight transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3" /> Revert to Standard Picture
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    disabled={!isCardReady}
                    onClick={handleDownload}
                    className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black py-3 rounded-xl text-xs tracking-tight transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" /> Download Recommendation Card
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold py-2.5 rounded-xl text-xs tracking-tight transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const shareUrl = `${window.location.origin}${window.location.pathname}?handset=${phone.id}&ref=card_social`;
                        const shareText = `Check out my ${persona} smartphone curation card for ${phone.name}!`;
                        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-xl text-xs tracking-tight transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Post to X</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full text-center text-slate-500 hover:text-slate-300 transition-colors text-[11px] font-bold py-1 mt-1 block cursor-pointer"
                  >
                    Cancel & Return
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
