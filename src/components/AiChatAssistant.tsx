import React, { useState, useEffect, useRef } from 'react';
import { SMARTPHONES } from '../data';
import { Smartphone } from '../types';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  CheckCircle, 
  HelpCircle, 
  Trash2, 
  AlertCircle,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiChatAssistantProps {
  onReserveClick: (phone: Smartphone) => void;
  onCompareToggle: (phoneId: string) => void;
  comparedPhoneIds: string[];
  onClose?: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
  stepKey?: string;
  recommendedPhones?: {
    phone: Smartphone;
    matchScore: number;
    reason: string;
  }[];
}

interface QuestionnaireState {
  budget: number;
  useCase: 'Gaming' | 'Photography' | 'Student' | 'Business' | 'Daily Use' | null;
  brand: 'Any' | 'Apple' | 'Samsung' | 'Google' | 'OnePlus' | 'Nothing' | null;
  battery: 'High Importance' | 'Standard' | null;
  camera: 'High Importance' | 'Standard' | null;
  storage: '128GB' | '256GB' | '512GB+' | null;
  need5g: boolean | null;
  needEmi: boolean | null;
  exchange: boolean | null;
}

export default function AiChatAssistant({ onReserveClick, onCompareToggle, comparedPhoneIds, onClose }: AiChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState<QuestionnaireState>({
    budget: 80000,
    useCase: null,
    brand: null,
    battery: null,
    camera: null,
    storage: null,
    need5g: null,
    needEmi: null,
    exchange: null,
  });

  const questionSteps = [
    {
      key: 'useCase',
      question: "Hello! I am your Smart Mobiles AI Assistant. I am here to help you discover your perfect smartphone from our physical store's live catalog. Let's start with your primary focus:",
      options: ['Gaming', 'Photography', 'Student', 'Business', 'Daily Use'],
    },
    {
      key: 'budget',
      question: "Wonderful choice. What is your maximum budget threshold for this handset?",
      isSlider: true,
      min: 15000,
      max: 150000,
      step: 5000,
    },
    {
      key: 'brand',
      question: "Got it! Do you have a preferred premium brand you are leaning towards?",
      options: ['Any', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Nothing'],
    },
    {
      key: 'battery',
      question: "Understood. How vital is extended multi-day battery life for your workflow?",
      options: ['High Importance', 'Standard'],
    },
    {
      key: 'camera',
      question: "And what are your expectations regarding professional-grade camera hardware?",
      options: ['High Importance', 'Standard'],
    },
    {
      key: 'storage',
      question: "What storage size capability will satisfy your files and media?",
      options: ['128GB', '256GB', '512GB+'],
    },
    {
      key: 'need5g',
      question: "Do you require ultra-fast 5G network compatibility?",
      options: ['Yes', 'No'],
    },
    {
      key: 'needEmi',
      question: "Are you interested in calculating low-cost or No-Cost EMI plans for this purchase?",
      options: ['Yes', 'No'],
    },
    {
      key: 'exchange',
      question: "Finally, would you like to exchange an old phone to unlock trade-in value bonuses?",
      options: ['Yes', 'No'],
    }
  ];

  // Initialize Chat
  useEffect(() => {
    if (messages.length === 0) {
      setIsAiTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 'init-1',
            sender: 'ai',
            text: questionSteps[0].question,
            timestamp: new Date(),
            stepKey: 'useCase',
          }
        ]);
        setIsAiTyping(false);
      }, 800);
    }
  }, []);

  // Auto-scroll to bottom of chat inside container, without scrolling the main window
  useEffect(() => {
    const chatContainer = chatEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isAiTyping]);

  const handleSliderSubmit = (val: number) => {
    const updatedAnswers = { ...answers, budget: val };
    setAnswers(updatedAnswers);
    
    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: `My maximum budget is ₹${val.toLocaleString()}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    moveToNextQuestion(1, updatedAnswers);
  };

  const handleOptionSelect = (key: string, optionValue: any) => {
    let formattedVal = optionValue;
    if (optionValue === 'Yes') formattedVal = true;
    if (optionValue === 'No') formattedVal = false;

    const updatedAnswers = { ...answers, [key]: formattedVal };
    setAnswers(updatedAnswers);

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: String(optionValue),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    
    const stepIdx = questionSteps.findIndex(s => s.key === key);
    moveToNextQuestion(stepIdx, updatedAnswers);
  };

  const moveToNextQuestion = (currentIdx: number, currentAnswers: QuestionnaireState) => {
    const nextIdx = currentIdx + 1;
    setIsAiTyping(true);

    setTimeout(() => {
      if (nextIdx < questionSteps.length) {
        setCurrentStep(nextIdx);
        const nextStep = questionSteps[nextIdx];
        
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: nextStep.question,
            timestamp: new Date(),
            stepKey: nextStep.key,
          }
        ]);
        setIsAiTyping(false);
      } else {
        // Questionnaire finished, generate matches
        generateAiMatchResults(currentAnswers);
      }
    }, 900);
  };

  const generateAiMatchResults = (finalAnswers: QuestionnaireState) => {
    // Scoring engine
    const scored = SMARTPHONES.map(phone => {
      let score = 75; // Baseline
      let reasons: string[] = [];

      // Budget check
      if (phone.price <= finalAnswers.budget) {
        score += 10;
        reasons.push("Perfect budget alignment");
      } else {
        const diff = phone.price - finalAnswers.budget;
        const penalty = Math.min(25, Math.ceil((diff / finalAnswers.budget) * 20));
        score -= penalty;
        reasons.push(`Priced slightly above budget threshold (EMI recommended)`);
      }

      // Brand check
      if (finalAnswers.brand && finalAnswers.brand !== 'Any') {
        if (phone.brand.toLowerCase() === finalAnswers.brand.toLowerCase()) {
          score += 15;
          reasons.push(`Official brand alignment with ${phone.brand}`);
        } else {
          score -= 10;
        }
      }

      // Use case alignment
      const specsStr = JSON.stringify(phone.specs).toLowerCase();
      if (finalAnswers.useCase === 'Gaming') {
        if (specsStr.includes('snapdragon') || specsStr.includes('a18 pro') || specsStr.includes('gpu')) {
          score += 15;
          reasons.push("Flagship chipset guarantees ultimate graphics frame-rates");
        }
      } else if (finalAnswers.useCase === 'Photography') {
        if (specsStr.includes('zoom') || specsStr.includes('ultramarine') || specsStr.includes('megapixel') || specsStr.includes('200mp') || specsStr.includes('telephoto')) {
          score += 15;
          reasons.push("Optical Zoom telephotos ideal for cinematic captures");
        }
      } else if (finalAnswers.battery === 'High Importance') {
        if (phone.specs.battery.includes('5000 mAh') || phone.specs.battery.includes('5400 mAh') || phone.specs.battery.includes('5060 mAh') || phone.specs.battery.includes('4900 mAh')) {
          score += 15;
          reasons.push("Over 4,900+ mAh high-capacity cell supports multi-day active use");
        }
      }

      // 5G, EMI, etc.
      if (finalAnswers.need5g && (specsStr.includes('5g') || phone.name.includes('5G'))) {
        score += 5;
      }

      // Stock Check bonus
      if (phone.stockStatus === 'In Stock') score += 5;
      if (phone.stockStatus === 'Out of Stock') score -= 30;

      // Bound score
      score = Math.min(99, Math.max(35, score));

      // Synthesize elegant Gemini reason
      const reasonStr = reasons.length > 0 
        ? `The ${phone.name} is an exceptional ${score}% match. It features the ${phone.specs.processor} matching your ${finalAnswers.useCase || 'Daily'} focus, and ${reasons[0].toLowerCase()}.`
        : `The ${phone.name} perfectly supports your workflow requirements with its ${phone.specs.display} and verified in-store warranty coverage.`;

      return {
        phone,
        matchScore: score,
        reason: reasonStr
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    // Limit to top 3 recommendations
    const recommendations = scored.slice(0, 3);

    setMessages(prev => [
      ...prev,
      {
        id: `ai-match-${Date.now()}`,
        sender: 'ai',
        text: "Analyzing live warehouse counts... compiling benchmark reviews... Here are your highly curated smartphone matches available today at SMART MOBILES Chennai showroom:",
        timestamp: new Date(),
        recommendedPhones: recommendations,
      }
    ]);
    setIsAiTyping(false);
  };

  const handleFreeformSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: new Date()
      }
    ]);

    setIsAiTyping(true);

    // Simulated conversational responses
    setTimeout(() => {
      let responseText = "Understood! I've factored that into your search profiles.";
      const query = userText.toLowerCase();

      if (query.includes('gaming') || query.includes('pubg') || query.includes('processor')) {
        responseText = "I've optimized for higher GPU performance. Devices like the Galaxy S24 Ultra or OnePlus 12 with Snapdragon Gen 3 chipsets are stellar contenders.";
      } else if (query.includes('camera') || query.includes('photo') || query.includes('video')) {
        responseText = "Photographic fidelity priority detected. Re-aligning with 200MP quad sensors and optical telephotos with stabilized lenses.";
      } else if (query.includes('budget') || query.includes('cheap') || query.includes('price')) {
        responseText = "Understood. Factoring in extreme budget value options. Our catalog features stellar premium options under ₹40,000 like Nothing (2a) and Galaxy A55.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: responseText + " Would you like me to compile your match analysis results based on your answers so far?",
          timestamp: new Date(),
          stepKey: 'triggerMatch'
        }
      ]);
      setIsAiTyping(false);
    }, 1000);
  };

  const resetAssistant = () => {
    setAnswers({
      budget: 80000,
      useCase: null,
      brand: null,
      battery: null,
      camera: null,
      storage: null,
      need5g: null,
      needEmi: null,
      exchange: null,
    });
    setCurrentStep(0);
    setMessages([
      {
        id: 'init-1',
        sender: 'ai',
        text: questionSteps[0].question,
        timestamp: new Date(),
        stepKey: 'useCase',
      }
    ]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col h-full" id="ai-chat-assistant">
      {/* Bot Header */}
      <div className="bg-slate-900 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/15 text-brand-blue flex items-center justify-center border border-brand-blue/30 relative shrink-0">
            <Sparkles className="w-5 h-5 text-brand-blue animate-pulse" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 font-display truncate">
              Gemini Advisor Engine <span className="text-[8px] uppercase tracking-widest bg-brand-blue/25 text-brand-blue px-1.5 py-0.5 rounded-full font-black font-mono">Live</span>
            </h3>
            <p className="text-[9px] text-slate-400 font-medium truncate">Empowered with Live Inventory</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={resetAssistant}
            className="text-slate-400 hover:text-white p-1.5 sm:p-2 hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1 cursor-pointer text-xs font-bold"
            title="Reset Chat"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 sm:p-2 hover:bg-slate-800 rounded-xl transition-all flex items-center justify-center cursor-pointer"
              title="Close Chat"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${isAi ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse text-right'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isAi 
                    ? 'bg-slate-950 text-white border-slate-800' 
                    : 'bg-brand-blue text-white border-brand-blue'
                }`}>
                  {isAi ? <Sparkles className="w-4.5 h-4.5 text-brand-orange" /> : <span className="text-xs font-black">U</span>}
                </div>

                <div className="space-y-3">
                  {/* Speech Bubble */}
                  <div className={`p-4 rounded-2xl text-xs md:text-sm font-medium leading-relaxed ${
                    isAi 
                      ? 'bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-tl-sm' 
                      : 'bg-brand-blue text-white shadow-sm rounded-tr-sm text-left'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Interactive Inputs inside AI response */}
                  {isAi && msg.stepKey && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="pl-1"
                    >
                      {/* Budget Slider Render */}
                      {msg.stepKey === 'budget' && (
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md max-w-sm space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Select Target Threshold</span>
                            <span className="text-sm font-mono font-black text-brand-orange">₹{answers.budget.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min="15000"
                            max="150000"
                            step="5000"
                            value={answers.budget}
                            onChange={(e) => setAnswers({ ...answers, budget: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                          />
                          <button
                            onClick={() => handleSliderSubmit(answers.budget)}
                            className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-md"
                          >
                            Lock Budget
                          </button>
                        </div>
                      )}

                      {/* Option badging */}
                      {msg.stepKey !== 'budget' && questionSteps.find(s => s.key === msg.stepKey)?.options && (
                        <div className="flex flex-wrap gap-2 max-w-md mt-1">
                          {questionSteps.find(s => s.key === msg.stepKey)?.options?.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleOptionSelect(msg.stepKey!, opt)}
                              className="px-4 py-2.5 bg-slate-100 hover:bg-brand-blue hover:text-white border border-slate-200 hover:border-brand-blue text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Custom Fallback Trigger Match */}
                      {msg.stepKey === 'triggerMatch' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => generateAiMatchResults(answers)}
                            className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Render AI Matches Now
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Recommendation Cards inside Chat */}
                  {isAi && msg.recommendedPhones && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mt-3">
                      {msg.recommendedPhones.map(({ phone, matchScore, reason }) => (
                        <div 
                          key={phone.id} 
                          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md flex flex-col justify-between space-y-4 group transition-all hover:border-slate-300"
                        >
                          <div className="space-y-3">
                            {/* Device Photo & Rating Badge */}
                            <div className="relative h-32 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                              <img
                                src={phone.imageUrl}
                                alt={phone.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <span className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                ★ {phone.rating}
                              </span>
                              <span className="absolute top-2 right-2 bg-brand-blue text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow animate-pulse">
                                {matchScore}% AI Match
                              </span>
                            </div>

                            {/* Info */}
                            <div>
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{phone.brand}</span>
                              <h4 className="text-sm font-black text-slate-950">{phone.name}</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">{phone.color}</p>
                            </div>

                            {/* Prices & Badges */}
                            <div className="flex items-center justify-between flex-wrap gap-1 border-t border-b border-slate-100 py-2">
                              <span className="text-sm font-mono font-black text-slate-900">₹{phone.price.toLocaleString()}</span>
                              <span className="text-[9px] uppercase font-black text-brand-green bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                {phone.stockStatus}
                              </span>
                            </div>

                            {/* Advisor reason */}
                            <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-brand-blue/30 pl-2">
                              "{reason}"
                            </p>
                          </div>

                          {/* CTA Row */}
                          <div className="space-y-2 pt-2">
                            <button
                              onClick={() => onReserveClick(phone)}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                            >
                              Reserve Handset
                            </button>
                            <button
                              onClick={() => onCompareToggle(phone.id)}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                                comparedPhoneIds.includes(phone.id)
                                  ? 'bg-brand-blue/10 border-brand-blue text-brand-blue'
                                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                              }`}
                            >
                              {comparedPhoneIds.includes(phone.id) ? 'Comparing Selected' : 'Add to Compare'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Typing Indicator */}
          {isAiTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 self-start max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-950 text-white border border-slate-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-brand-orange animate-spin" />
              </div>
              <div className="bg-white text-slate-400 px-4 py-3 rounded-2xl text-xs border border-slate-200/80 shadow-sm flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[11px] text-slate-400 ml-1 font-mono">Gemini is writing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Freeform Typing Footer */}
      <form onSubmit={handleFreeformSubmit} className="p-4 bg-white border-t border-slate-200 flex gap-2 shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Gemini freeform, e.g. 'I want a budget phone with a 100x zoom lens'..."
          className="flex-1 bg-slate-100 text-slate-800 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all placeholder-slate-400"
        />
        <button
          type="submit"
          className="bg-brand-blue hover:bg-blue-600 text-white p-3 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center cursor-pointer shrink-0"
          aria-label="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
