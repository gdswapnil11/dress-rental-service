export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar: string;
  wishlist: string[];
  savedAddresses: Array<{ id: string; label: string; address: string }>;
  gender: 'female' | 'male' | 'unisex';
  ageGroup: '18-24' | '25-34' | '35-44' | '45+';
  measurements: { height: number; weight: number; bust: number; waist: number; hip: number };
  membershipLevel: 'Silver' | 'Gold' | 'Platinum';
  favoriteCategories: string[];
  previousRentals: string[];
  city: string;
}
