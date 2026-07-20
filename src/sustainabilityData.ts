export interface EcoScoreData {
  score: number;
  carbon: string;
  efficiency: string;
  recyclability: number;
  packaging: string;
  repairability: number;
  lifespan: string;
  description: string;
  badges: string[];
}

export const SUSTAINABILITY_DATA: Record<string, EcoScoreData> = {
  'iphone-16-pro-max': {
    score: 88,
    carbon: '68 kg CO2e',
    efficiency: 'A+ (A18 Pro low-draw cores)',
    recyclability: 95,
    packaging: '100% fiber-based (zero plastic)',
    repairability: 84,
    lifespan: '6-7 Years support',
    description: 'Manufactured with over 30% recycled content overall, including 100% recycled cobalt in the battery and 100% recycled gold in the camera wire.',
    badges: ['♻️ Zero Plastic Pack', '🔋 Durable Cycle Gold', '🥇 Recycled Cobalt']
  },
  'iphone-16': {
    score: 91,
    carbon: '55 kg CO2e',
    efficiency: 'A+ (A18 low-draw)',
    recyclability: 96,
    packaging: '100% fiber-based (zero plastic)',
    repairability: 86,
    lifespan: '6-7 Years support',
    description: 'Features 85% recycled aluminum enclosures and fully modular battery release mechanisms facilitating straightforward in-store swap loops.',
    badges: ['🌱 85% Recycled Frame', '♻️ Zero Plastic Pack', '🔧 Easy Battery Release']
  },
  'galaxy-s24-ultra': {
    score: 85,
    carbon: '74 kg CO2e',
    efficiency: 'A (Snapdragon energy optimization)',
    recyclability: 92,
    packaging: '100% recycled paper packaging',
    repairability: 82,
    lifespan: '7 Years OS updates',
    description: 'Integrates recycled titanium alloys in the frame structure, pre-consumer recycled glass in front/back layers, and recycled ocean-bound plastics.',
    badges: ['🌊 Ocean Bound Plastic', '🏔️ Recycled Titanium', '🛡️ 7-Year OS Promise']
  },
  'galaxy-s24': {
    score: 89,
    carbon: '60 kg CO2e',
    efficiency: 'A (Exynos smart core balancing)',
    recyclability: 94,
    packaging: '100% recycled paper packaging',
    repairability: 85,
    lifespan: '7 Years OS updates',
    description: 'Compact frame size combined with post-consumer recycled polycarbonates in internal speaker modules results in lower baseline manufacturing footprints.',
    badges: ['🌱 Compact Resource Footprint', '🛡️ 7-Year OS Promise', '🔋 Multi-Cycle Standard']
  },
  'pixel-9-pro': {
    score: 93,
    carbon: '51 kg CO2e',
    efficiency: 'A++ (Tensor G4 micro-grid optimization)',
    recyclability: 98,
    packaging: '100% plastic-free compostable pack',
    repairability: 90,
    lifespan: '7 Years OS updates',
    description: 'Crafted with 100% recycled aluminum enclosures, fully mercury-free, BFR-free, PVC-free assembly layers, and highly rated repair blueprints.',
    badges: ['🥇 100% Recycled Alu', '🌿 100% Chemical Safe', '🔧 Repairability Master']
  },
  'pixel-9': {
    score: 92,
    carbon: '49 kg CO2e',
    efficiency: 'A++ (Tensor G4 low footprint)',
    recyclability: 97,
    packaging: '100% plastic-free compostable pack',
    repairability: 88,
    lifespan: '7 Years OS updates',
    description: 'Boasts an exceptionally low carbon footprint at just 49 kg CO2e, representing one of Google’s most sustainable consumer electronics products to date.',
    badges: ['📉 Minimalist Carbon Index', '🌿 100% Chemical Safe', '🛡️ 7-Year OS Promise']
  },
  'oneplus-12': {
    score: 82,
    carbon: '82 kg CO2e',
    efficiency: 'B+ (Ultra speed high throughput charger)',
    recyclability: 89,
    packaging: 'FSC Certified paper pulp',
    repairability: 78,
    lifespan: '4-5 Years support',
    description: 'Includes proprietary battery health algorithms doubling the lifecycle up to 1,600 full charges, reducing premature battery scrap.',
    badges: ['🔋 1600 Cycle Durability', '📦 FSC Certified Pulp']
  },
  'nothing-phone-2a': {
    score: 90,
    carbon: '46 kg CO2e',
    efficiency: 'A+ (Optimized MediaTek Dimensity)',
    recyclability: 95,
    packaging: '100% plastic-free recycled carton board',
    repairability: 85,
    lifespan: '4 Years support',
    description: 'Nothing Phone (2a) features a 100% recycled aluminum midframe, 100% recycled tin on 6 circuit boards, and over 50% bio-based/recycled plastic parts.',
    badges: ['🌱 100% Recycled Midframe', '📦 FSC Certified Pack', '⚡ Carbon Neutral Prod']
  },
  'galaxy-a55': {
    score: 86,
    carbon: '58 kg CO2e',
    efficiency: 'A (Smart Exynos core distribution)',
    recyclability: 92,
    packaging: 'FSC certified paper pulp (no plastic)',
    repairability: 84,
    lifespan: '5 Years security updates',
    description: 'Constructed with recycled plastic brackets and a lead-free solder alloy. Utilizes post-consumer recycled polycarbonates.',
    badges: ['🌱 Recycled Bracket Alloys', '🛡️ 5-Year Security Path']
  },
  'redmi-note-13-pro-plus': {
    score: 81,
    carbon: '79 kg CO2e',
    efficiency: 'B+ (High speed charging optimization)',
    recyclability: 88,
    packaging: 'FSC-mix lightweight cardboard',
    repairability: 76,
    lifespan: '4 Years security updates',
    description: 'Utilizes recycled bio-polycarbonate polymers for the rear cover option. Reduced heavy metal traces in display manufacturing.',
    badges: ['🌿 Bio-based Rear Option', '📦 FSC-Mix Packaging']
  }
};

export const DEFAULT_SUSTAINABILITY: EcoScoreData = {
  score: 80,
  carbon: '85 kg CO2e',
  efficiency: 'B (Standard optimized)',
  recyclability: 85,
  packaging: 'Standard eco packaging',
  repairability: 75,
  lifespan: '3-4 Years support',
  description: 'This handset meets standard global compliance rules, utilizing recycled metal traces in circuit board soldering.',
  badges: ['☘️ Global Standard Certified']
};

export function getSustainabilityData(phoneId: string): EcoScoreData {
  return SUSTAINABILITY_DATA[phoneId] || DEFAULT_SUSTAINABILITY;
}
