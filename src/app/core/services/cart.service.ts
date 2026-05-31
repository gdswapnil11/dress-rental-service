import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import type { CartItem } from '../../models/cart-item.model';
import type { Coupon } from '../../models/coupon.model';
import { tap } from 'rxjs/operators';
import { BookingService } from './booking.service';
import { CatalogService } from './catalog.service';
import { Observable } from 'rxjs';

const DELIVERY_FEE = 199;
const GST_RATE = 0.18;

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly coupon = signal<Coupon | null>(null);
  readonly coupons = signal<Coupon[]>([]);
  readonly lastOrderIds = signal<string[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly bookingService: BookingService,
    private readonly catalogService: CatalogService
  ) {
    this.loadCoupons();
  }

  loadCoupons() {
    this.http.get<Coupon[]>('/api/coupons').pipe(tap((data) => this.coupons.set(data))).subscribe();
  }

  addItem(item: CartItem) {
    const existing = this.items().find(
      (entry) => entry.dressId === item.dressId && entry.size === item.size && entry.startDate === item.startDate && entry.endDate === item.endDate
    );
    if (existing) {
      return;
    }

    const validItem = this.validateItem(item);
    this.items.update((items) => [...items.filter((entry) => entry.id !== item.id), validItem]);
  }

  updateItem(item: CartItem) {
    const validItem = this.validateItem(item);
    this.items.update((items) => items.map((entry) => (entry.id === item.id ? validItem : entry)));
  }

  removeItem(itemId: string) {
    this.items.update((items) => items.filter((entry) => entry.id !== itemId));
  }

  toggleSavedForLater(itemId: string) {
    this.items.update((items) =>
      items.map((entry) =>
        entry.id === itemId ? { ...entry, savedForLater: !entry.savedForLater } : entry
      )
    );
  }

  clearCart() {
    this.items.set([]);
    this.coupon.set(null);
  }

  applyCoupon(code: string): boolean {
    const coupon = this.coupons().find((entry) => entry.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      this.coupon.set(null);
      return false;
    }
    const expiry = new Date(coupon.expiresAt);
    if (expiry < new Date()) {
      this.coupon.set(null);
      return false;
    }
    this.coupon.set(coupon);
    return true;
  }

  get subtotal() {
    return this.items().reduce((sum, item) => sum + item.pricePerDay * item.rentalDurationDays, 0);
  }

  get depositTotal() {
    return this.items().reduce((sum, item) => sum + item.deposit, 0);
  }

  get deliveryTotal() {
    return this.items().reduce((sum, item) => sum + item.deliveryCharges, 0);
  }

  get gstTotal() {
    return Math.round((this.subtotal + this.depositTotal + this.deliveryTotal) * GST_RATE);
  }

  get discountTotal() {
    const coupon = this.coupon();
    return coupon ? Math.round((this.subtotal + this.depositTotal + this.deliveryTotal + this.gstTotal) * (coupon.discountPercentage / 100)) : 0;
  }

  get totalAmount() {
    return this.subtotal + this.depositTotal + this.deliveryTotal + this.gstTotal - this.discountTotal;
  }

  get cartCount() {
    return this.items().filter((item) => !item.savedForLater).length;
  }

  markLastOrders(ids: string[]) {
    this.lastOrderIds.set(ids);
  }

  private validateItem(item: CartItem): CartItem {
    const dress = this.catalogService.dresses().find((entry) => entry.id === item.dressId);
    const overlapping = this.bookingService.orders().some((order) =>
      order.dressId === item.dressId && this.datesOverlap(order.rentalStart, order.rentalEnd, item.startDate, item.endDate)
    );
    const availableStatus = dress && dress.available ? (overlapping ? 'Not Available' : 'Available') : 'Not Available';
    return {
      ...item,
      deliveryCharges: DELIVERY_FEE,
      savedForLater: item.savedForLater ?? false,
      rentalDurationDays: this.calculateDuration(item.startDate, item.endDate),
      size: item.size || dress?.sizes[0] || 'M',
      city: dress?.availableCities[0] || item.city,
      deposit: dress?.deposit ?? item.deposit,
      pricePerDay: dress?.price ?? item.pricePerDay,
      status: availableStatus as any
    };
  }

  private datesOverlap(startA: string, endA: string, startB: string, endB: string) {
    const aStart = new Date(startA).getTime();
    const aEnd = new Date(endA).getTime();
    const bStart = new Date(startB).getTime();
    const bEnd = new Date(endB).getTime();
    return aStart <= bEnd && bStart <= aEnd;
  }

  private calculateDuration(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000));
    return days || 1;
  }
}
