export interface Order {
  id: string;
  userId: string;
  dressId: string;
  dressName: string;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Returned' | 'Completed';
  rentalDurationDays: number;
  price: number;
  deposit: number;
  rentalStart: string;
  rentalEnd: string;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Wallet';
  deliveryMethod: 'Home Delivery' | 'Store Pickup';
  address: string;
}
