export interface CartItem {
  id: string;
  dressId: string;
  dressName: string;
  size: string;
  startDate: string;
  endDate: string;
  rentalDurationDays: number;
  pricePerDay: number;
  deposit: number;
  deliveryCharges: number;
  city?: string;
  savedForLater?: boolean;
}
