import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import type { CartItem } from '../../../models/cart-item.model';
import type { Order } from '../../../models/order.model';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="grid gap-10 xl:grid-cols-[0.7fr_0.3fr]">
        <section class="space-y-8">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">Checkout</h1>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Complete your rental order with delivery details and payment.</p>
          </div>

          <section class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step 1</p>
            <h2 class="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Review cart</h2>
            <div *ngIf="cartService.items().length; else noItems" class="mt-6 space-y-4">
              <article *ngFor="let item of cartService.items()" class="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span>{{ item.dressName }}</span>
                  <span>{{ item.rentalDurationDays }} days</span>
                </div>
                <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span>Size: {{ item.size }}</span>
                  <span>Dates: {{ item.startDate }} → {{ item.endDate }}</span>
                </div>
              </article>
            </div>
          </section>

          <section *ngIf="!authService.isAuthenticated()" class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step 2</p>
            <h2 class="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Login or register</h2>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">Please sign in to complete your booking and save your order history.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a routerLink="/auth/login" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Login</a>
              <a routerLink="/auth/register" class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-base hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200">Register</a>
            </div>
          </section>

          <section *ngIf="authService.isAuthenticated()" class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step 3</p>
            <h2 class="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Delivery details</h2>
            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span>Full name</span>
                <input type="text" [(ngModel)]="delivery.fullName" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span>Mobile number</span>
                <input type="tel" [(ngModel)]="delivery.phone" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span>Address</span>
                <textarea rows="3" [(ngModel)]="delivery.address" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"></textarea>
              </label>
              <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span>City</span>
                <input type="text" [(ngModel)]="delivery.city" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span>State</span>
                <input type="text" [(ngModel)]="delivery.state" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span>Pincode</span>
                <input type="text" [(ngModel)]="delivery.pincode" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
            </div>
          </section>

          <section *ngIf="authService.isAuthenticated()" class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step 4</p>
            <h2 class="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Delivery method</h2>
            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <label class="rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 transition-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <input type="radio" name="deliveryMethod" value="Home Delivery" [(ngModel)]="deliveryMethod" /> Home Delivery
              </label>
              <label class="rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 transition-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <input type="radio" name="deliveryMethod" value="Store Pickup" [(ngModel)]="deliveryMethod" /> Store Pickup
              </label>
            </div>
          </section>

          <section *ngIf="authService.isAuthenticated()" class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step 5</p>
            <h2 class="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Order summary</h2>
            <div class="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div class="flex items-center justify-between"><span>Rental charges</span><span>₹{{ cartService.subtotal }}</span></div>
              <div class="flex items-center justify-between"><span>Deposit</span><span>₹{{ cartService.depositTotal }}</span></div>
              <div class="flex items-center justify-between"><span>Delivery charges</span><span>₹{{ cartService.deliveryTotal }}</span></div>
              <div class="flex items-center justify-between"><span>GST</span><span>₹{{ cartService.gstTotal }}</span></div>
              <div class="flex flex-wrap items-center gap-3">
                <input type="text" [(ngModel)]="couponCode" placeholder="Apply coupon" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
                <button type="button" (click)="applyCoupon()" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Apply</button>
              </div>
              <div *ngIf="couponMessage" class="text-sm font-medium text-rose-600 dark:text-rose-400">{{ couponMessage }}</div>
              <div class="border-t border-slate-200 pt-4 dark:border-slate-700">
                <div class="flex items-center justify-between text-base font-semibold text-slate-950 dark:text-white"><span>Final amount</span><span>₹{{ cartService.totalAmount }}</span></div>
              </div>
            </div>
          </section>

          <section *ngIf="authService.isAuthenticated()" class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step 6</p>
            <h2 class="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Payment</h2>
            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <label class="rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 transition-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <input type="radio" name="paymentMethod" value="UPI" [(ngModel)]="paymentMethod" /> UPI
              </label>
              <label class="rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 transition-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <input type="radio" name="paymentMethod" value="Card" [(ngModel)]="paymentMethod" /> Credit/Debit Card
              </label>
              <label class="rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 transition-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <input type="radio" name="paymentMethod" value="Net Banking" [(ngModel)]="paymentMethod" /> Net Banking
              </label>
              <label class="rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 transition-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <input type="radio" name="paymentMethod" value="Wallet" [(ngModel)]="paymentMethod" /> Wallet
              </label>
            </div>
            <button type="button" (click)="placeOrder()" class="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Place order</button>
            <div *ngIf="successMessage" class="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{{ successMessage }}</div>
          </section>
        </section>

        <aside class="space-y-6">
          <div class="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Need help?</p>
            <h2 class="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Delivery support</h2>
            <p class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">Choose your preferred delivery method and confirm availability before payment.</p>
          </div>
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Order totals</p>
            <div class="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div class="flex items-center justify-between"><span>Rental charges</span><span>₹{{ cartService.subtotal }}</span></div>
              <div class="flex items-center justify-between"><span>Deposit</span><span>₹{{ cartService.depositTotal }}</span></div>
              <div class="flex items-center justify-between"><span>Delivery</span><span>₹{{ cartService.deliveryTotal }}</span></div>
              <div class="flex items-center justify-between"><span>GST</span><span>₹{{ cartService.gstTotal }}</span></div>
              <div class="border-t border-slate-200 pt-4 dark:border-slate-700">
                <div class="flex items-center justify-between text-base font-semibold text-slate-950 dark:text-white"><span>Final total</span><span>₹{{ cartService.totalAmount }}</span></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <ng-template #noItems>
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950 text-center">
        <p class="text-lg font-semibold text-slate-950 dark:text-white">No items in the cart.</p>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">Add dresses to your cart before proceeding to checkout.</p>
        <a routerLink="/catalog" class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Browse catalog</a>
      </div>
    </ng-template>
  `
})
export class CheckoutPage {
  protected readonly cartService = inject(CartService);
  protected readonly bookingService = inject(BookingService);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected couponCode = '';
  protected couponMessage = '';
  protected successMessage = '';
  protected deliveryMethod: 'Home Delivery' | 'Store Pickup' = 'Home Delivery';
  protected paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Wallet' = 'UPI';
  protected delivery = {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  };

  protected applyCoupon() {
    const applied = this.cartService.applyCoupon(this.couponCode);
    this.couponMessage = applied ? 'Coupon applied successfully.' : 'Invalid or expired coupon.';
  }

  protected placeOrder() {
    if (!this.authService.isAuthenticated()) {
      this.couponMessage = 'Please login before placing the order.';
      return;
    }

    const createdOrderIds: string[] = [];
    const items = this.cartService.items().filter((item) => !item.savedForLater);
    if (!items.length) {
      this.couponMessage = 'Add at least one rental item to proceed.';
      return;
    }

    items.forEach((item) => {
      const order: Order = {
        id: '',
        userId: this.authService.currentUser()?.id ?? 'guest',
        dressId: item.dressId,
        dressName: item.dressName,
        status: 'Confirmed',
        rentalDurationDays: item.rentalDurationDays,
        price: item.pricePerDay * item.rentalDurationDays,
        deposit: item.deposit,
        rentalStart: item.startDate,
        rentalEnd: item.endDate,
        paymentMethod: this.paymentMethod,
        deliveryMethod: this.deliveryMethod,
        address: `${this.delivery.address}, ${this.delivery.city}, ${this.delivery.state} - ${this.delivery.pincode}`
      };
      this.bookingService.createBooking(order).subscribe((response) => {
        createdOrderIds.push(response.order.id);
        if (createdOrderIds.length === items.length) {
          this.cartService.markLastOrders(createdOrderIds);
          this.cartService.clearCart();
          this.successMessage = 'Your order has been placed successfully!';
          this.router.navigate(['/order-confirmation']);
        }
      });
    });
  }
}
