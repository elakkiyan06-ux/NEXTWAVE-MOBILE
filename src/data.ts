import { Smartphone, PriceHistoryItem } from './types';

export const SMARTPHONES: Smartphone[] = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: 144900,
    originalPrice: 144900,
    rating: 4.9,
    reviewCount: 312,
    stockStatus: 'Limited Stock',
    stockQuantity: 4,
    offerBadge: '₹6,000 Bank Discount',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    color: 'Titanium Desert',
    specs: {
      camera: '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      battery: '4685 mAh (Up to 29 hours video playback)',
      processor: 'A18 Pro chip with 6-core GPU',
      display: '6.9" Super Retina XDR OLED (120Hz ProMotion)',
      charging: '25W MagSafe Wireless, 20W Wired (50% in 30m)',
      storage: '256GB / 512GB / 1TB',
      warranty: '1 Year Apple Official Warranty',
    }
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    brand: 'Apple',
    price: 79900,
    originalPrice: 79900,
    rating: 4.8,
    reviewCount: 184,
    stockStatus: 'In Stock',
    stockQuantity: 12,
    offerBadge: 'Exchange Bonus Up to ₹4,000',
    imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop&q=80',
    color: 'Ultramarine Blue',
    specs: {
      camera: '48MP Fusion + 12MP Ultra Wide',
      battery: '3561 mAh (Up to 22 hours video playback)',
      processor: 'A18 chip with 5-core GPU',
      display: '6.1" Super Retina XDR OLED (60Hz)',
      charging: '25W MagSafe Wireless, 20W Wired (50% in 30m)',
      storage: '128GB / 256GB / 512GB',
      warranty: '1 Year Apple Official Warranty',
    }
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 129999,
    originalPrice: 139999,
    rating: 4.9,
    reviewCount: 428,
    stockStatus: 'In Stock',
    stockQuantity: 9,
    offerBadge: 'Samsung Festival Sale (₹10,000 Off)',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    color: 'Titanium Gray',
    specs: {
      camera: '200MP Main + 50MP + 12MP + 10MP Quad Camera with 100x Space Zoom',
      battery: '5000 mAh (Up to 30 hours battery life)',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      display: '6.8" Dynamic AMOLED 2X QHD+ (120Hz Adapt, S-Pen Support)',
      charging: '45W Super Fast Charging 2.0, 15W Wireless',
      storage: '256GB / 512GB / 1TB',
      warranty: '1 Year Samsung India Warranty',
    }
  },
  {
    id: 'galaxy-s24',
    name: 'Galaxy S24',
    brand: 'Samsung',
    price: 74999,
    originalPrice: 79999,
    rating: 4.7,
    reviewCount: 156,
    stockStatus: 'In Stock',
    stockQuantity: 15,
    offerBadge: 'No Cost EMI Up to 12 Months',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    color: 'Onyx Black',
    specs: {
      camera: '50MP Main + 12MP + 10MP Triple Camera with 30x Space Zoom',
      battery: '4000 mAh (All-day battery life)',
      processor: 'Exynos 2400 Deca-Core',
      display: '6.2" Dynamic AMOLED 2X FHD+ (120Hz Adapt)',
      charging: '25W Super Fast Charging, 15W Wireless',
      storage: '128GB / 256GB / 512GB',
      warranty: '1 Year Samsung India Warranty',
    }
  },
  {
    id: 'pixel-9-pro',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    price: 124999,
    originalPrice: 124999,
    rating: 4.8,
    reviewCount: 96,
    stockStatus: 'Limited Stock',
    stockQuantity: 2,
    offerBadge: 'Free Google AI Premium for 1 Year',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    color: 'Hazel Grey',
    specs: {
      camera: '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto',
      battery: '5060 mAh (Extreme Battery Saver up to 72 hrs)',
      processor: 'Google Tensor G4 with Titan M2 security',
      display: '6.8" Super Actua LTPO OLED (120Hz, 3000 nits peak)',
      charging: '37W Fast Charging (70% in 30m), 23W Wireless',
      storage: '128GB / 256GB / 512GB / 1TB',
      warranty: '1 Year Google India Warranty',
    }
  },
  {
    id: 'pixel-9',
    name: 'Pixel 9',
    brand: 'Google',
    price: 79999,
    originalPrice: 79999,
    rating: 4.6,
    reviewCount: 82,
    stockStatus: 'In Stock',
    stockQuantity: 8,
    offerBadge: 'Flat ₹5,000 Bank Cashback',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    color: 'Wintergreen',
    specs: {
      camera: '50MP Main + 48MP Ultra Wide',
      battery: '4700 mAh (All-day battery life)',
      processor: 'Google Tensor G4 with AI Core',
      display: '6.3" Actua OLED (120Hz, 2700 nits peak)',
      charging: '27W Fast Charging (55% in 30m), 15W Wireless',
      storage: '128GB / 256GB',
      warranty: '1 Year Google India Warranty',
    }
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 64999,
    originalPrice: 69999,
    rating: 4.8,
    reviewCount: 224,
    stockStatus: 'In Stock',
    stockQuantity: 11,
    offerBadge: 'Free OnePlus Buds 3 Worth ₹5,499',
    imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
    color: 'Flowy Emerald',
    specs: {
      camera: '50MP Sony LYT-808 + 64MP Periscope + 48MP Ultra Wide (Hasselblad)',
      battery: '5400 mAh (Extremely durable)',
      processor: 'Snapdragon 8 Gen 3',
      display: '6.82" 2K 120Hz ProXDR BOE X1 Display (4500 nits peak)',
      charging: '100W SUPERVOOC Wired (100% in 26m), 50W AIRVOOC Wireless',
      storage: '256GB / 512GB',
      warranty: '1 Year OnePlus Official Warranty',
    }
  },
  {
    id: 'nothing-phone-2a',
    name: 'Nothing Phone (2a) Plus',
    brand: 'Nothing',
    price: 27999,
    originalPrice: 29999,
    rating: 4.7,
    reviewCount: 143,
    stockStatus: 'In Stock',
    stockQuantity: 18,
    offerBadge: 'Student Discount Flat ₹1,500 Off',
    imageUrl: 'https://images.unsplash.com/photo-1565849511593-ed3de33d4543?w=600&auto=format&fit=crop&q=80',
    color: 'Grey Transparent',
    specs: {
      camera: '50MP Main + 50MP Ultra Wide + 50MP Selfie Camera',
      battery: '5000 mAh (Up to 2 days life)',
      processor: 'MediaTek Dimensity 7350 Pro 5G',
      display: '6.7" Flexible AMOLED FHD+ (120Hz, Glyph Interface)',
      charging: '50W Wired Charging (No Wireless)',
      storage: '256GB',
      warranty: '1 Year Nothing India Warranty',
    }
  },
  {
    id: 'galaxy-a55',
    name: 'Galaxy A55 5G',
    brand: 'Samsung',
    price: 39999,
    originalPrice: 42999,
    rating: 4.5,
    reviewCount: 110,
    stockStatus: 'In Stock',
    stockQuantity: 14,
    offerBadge: 'Exchange Bonus Up to ₹2,500',
    imageUrl: 'https://images.unsplash.com/photo-1574757568689-3d141e1509b2?w=600&auto=format&fit=crop&q=80',
    color: 'Awesome Iceblue',
    specs: {
      camera: '50MP Main with OIS + 12MP Ultra Wide + 5MP Macro',
      battery: '5000 mAh with Knox Vault Security',
      processor: 'Exynos 1480 Octa-Core',
      display: '6.6" Super AMOLED FHD+ (120Hz)',
      charging: '25W Fast Charging (Wired only)',
      storage: '128GB / 256GB',
      warranty: '1 Year Samsung India Warranty',
    }
  },
  {
    id: 'redmi-note-13-pro-plus',
    name: 'Redmi Note 13 Pro+ 5G',
    brand: 'Xiaomi',
    price: 31999,
    originalPrice: 33999,
    rating: 4.6,
    reviewCount: 195,
    stockStatus: 'Out of Stock',
    stockQuantity: 0,
    offerBadge: 'Instant ₹2,000 ICICI Discount',
    imageUrl: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=600&auto=format&fit=crop&q=80',
    color: 'Fusion Purple',
    specs: {
      camera: '200MP Main with OIS + 8MP Ultra Wide + 2MP Macro',
      battery: '5000 mAh with IP68 Water Proofing',
      processor: 'MediaTek Dimensity 7200-Ultra',
      display: '6.67" 1.5K Curved AMOLED (120Hz, Gorilla Glass Victus)',
      charging: '120W HyperCharge (100% in 19m)',
      storage: '256GB / 512GB',
      warranty: '1 Year Xiaomi India Warranty',
    }
  }
];

export const ACCESSORIES = [
  {
    id: 'acc-1',
    name: 'Apple 20W USB-C Power Adapter',
    price: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80',
    category: 'Charger',
    stock: 'In Stock'
  },
  {
    id: 'acc-2',
    name: 'Samsung 45W Power Adapter with Cable',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80',
    category: 'Charger',
    stock: 'In Stock'
  },
  {
    id: 'acc-3',
    name: 'Nothing Ear (a) ANC Earbuds',
    price: 7999,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80',
    category: 'Audio',
    stock: 'In Stock'
  },
  {
    id: 'acc-4',
    name: 'Spigen Ultra Hybrid Clear Case for iPhone 16',
    price: 1499,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&auto=format&fit=crop&q=80',
    category: 'Case',
    stock: 'In Stock'
  },
  {
    id: 'acc-5',
    name: 'OnePlus Supervooc 100W Dual Port Charger',
    price: 4299,
    imageUrl: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80',
    category: 'Charger',
    stock: 'Limited Stock'
  }
];

export const EXCHANGE_BRANDS = [
  {
    brand: 'Apple',
    models: [
      { name: 'iPhone 15 Pro Max', baseValue: 70000 },
      { name: 'iPhone 15 Pro', baseValue: 60000 },
      { name: 'iPhone 15', baseValue: 45000 },
      { name: 'iPhone 14 Pro Max', baseValue: 55000 },
      { name: 'iPhone 14', baseValue: 35000 },
      { name: 'iPhone 13 Pro Max', baseValue: 45000 },
      { name: 'iPhone 13', baseValue: 28000 },
      { name: 'iPhone 12', baseValue: 18000 }
    ]
  },
  {
    brand: 'Samsung',
    models: [
      { name: 'Galaxy S23 Ultra', baseValue: 55000 },
      { name: 'Galaxy S23', baseValue: 32000 },
      { name: 'Galaxy S22 Ultra', baseValue: 38000 },
      { name: 'Galaxy S22', baseValue: 22000 },
      { name: 'Galaxy S21 Ultra', baseValue: 24000 },
      { name: 'Galaxy A54', baseValue: 14000 }
    ]
  },
  {
    brand: 'OnePlus',
    models: [
      { name: 'OnePlus 11', baseValue: 30000 },
      { name: 'OnePlus 11R', baseValue: 22000 },
      { name: 'OnePlus 10 Pro', baseValue: 20000 },
      { name: 'OnePlus Nord 3', baseValue: 13000 }
    ]
  },
  {
    brand: 'Google',
    models: [
      { name: 'Pixel 8 Pro', baseValue: 42000 },
      { name: 'Pixel 8', baseValue: 28000 },
      { name: 'Pixel 7 Pro', baseValue: 22000 },
      { name: 'Pixel 7a', baseValue: 16000 }
    ]
  }
];

const nowMs = Date.now();
const hourInMs = 60 * 60 * 1000;

export const MOCK_PRICE_HISTORY: Record<string, PriceHistoryItem[]> = {
  'iphone-16-pro-max': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 144900 },
    { timestamp: new Date(nowMs - 12 * hourInMs).toISOString(), price: 144900 },
    { timestamp: new Date(nowMs).toISOString(), price: 144900 },
  ],
  'iphone-16': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 79900 },
    { timestamp: new Date(nowMs - 12 * hourInMs).toISOString(), price: 79900 },
    { timestamp: new Date(nowMs).toISOString(), price: 79900 },
  ],
  'galaxy-s24-ultra': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 134999 },
    { timestamp: new Date(nowMs - 18 * hourInMs).toISOString(), price: 132999 },
    { timestamp: new Date(nowMs).toISOString(), price: 129999 },
  ],
  'galaxy-s24': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 77999 },
    { timestamp: new Date(nowMs - 12 * hourInMs).toISOString(), price: 76999 },
    { timestamp: new Date(nowMs).toISOString(), price: 74999 },
  ],
  'pixel-9-pro': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 128999 },
    { timestamp: new Date(nowMs - 15 * hourInMs).toISOString(), price: 126999 },
    { timestamp: new Date(nowMs).toISOString(), price: 124999 },
  ],
  'pixel-9': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 79999 },
    { timestamp: new Date(nowMs - 12 * hourInMs).toISOString(), price: 79999 },
    { timestamp: new Date(nowMs).toISOString(), price: 79999 },
  ],
  'oneplus-12': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 68999 },
    { timestamp: new Date(nowMs - 15 * hourInMs).toISOString(), price: 67999 },
    { timestamp: new Date(nowMs).toISOString(), price: 64999 },
  ],
  'nothing-phone-2a': [
    { timestamp: new Date(nowMs - 30 * hourInMs).toISOString(), price: 27999 },
    { timestamp: new Date(nowMs - 12 * hourInMs).toISOString(), price: 27999 },
    { timestamp: new Date(nowMs).toISOString(), price: 27999 },
  ],
};

