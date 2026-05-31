export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar: string;
  wishlist: string[];
  savedAddresses: Array<{ id: string; label: string; address: string }>;
}
