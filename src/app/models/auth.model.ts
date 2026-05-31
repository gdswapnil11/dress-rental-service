export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  token: string;
  gender?: 'female' | 'male' | 'unisex';
  ageGroup?: '18-24' | '25-34' | '35-44' | '45+';
  membershipLevel?: 'Silver' | 'Gold' | 'Platinum';
  favoriteCategories?: string[];
  previousRentals?: string[];
  city?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface OtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}
