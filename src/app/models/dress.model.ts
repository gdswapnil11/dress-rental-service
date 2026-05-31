export interface Dress {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  deposit: number;
  available: boolean;
  availableToday: boolean;
  availableCities: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  occasion: string;
  collection?: string;
  priceTier: 'Normal' | 'Festival' | 'Wedding Season' | 'Weekend';
  depositCategory: 'Premium Bridal Wear' | 'Designer Collection' | 'Luxury Collection' | 'Standard';
  images: string[];
  tags: string[];
}
