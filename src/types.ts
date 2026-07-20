export interface PhoneSpec {
  camera: string;
  battery: string;
  processor: string;
  display: string;
  charging: string;
  storage: string;
  warranty: string;
}

export interface Smartphone {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  stockQuantity: number;
  offerBadge?: string;
  imageUrl: string;
  color: string;
  specs: PhoneSpec;
}

export interface Reservation {
  id: string;
  phoneId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface ExchangeEstimation {
  brand: string;
  model: string;
  condition: 'Excellent' | 'Good' | 'Average' | 'Poor';
  estimatedValue: number;
}

export interface RecommendationRequest {
  budget: number;
  primaryUse: 'gaming' | 'camera' | 'battery' | 'business' | 'general';
  preferredBrand: string;
  otherSpecs: string;
}

export interface RecommendationResponse {
  recommendedPhoneId: string;
  reason: string;
  matchScore: number;
  alternativePhoneIds: string[];
}

export interface PriceHistoryItem {
  timestamp: string; // ISO date string or similar, or offset
  price: number;
}
