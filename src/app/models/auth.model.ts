export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  token: string;
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
