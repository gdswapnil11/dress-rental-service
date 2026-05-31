import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-order-confirmation-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <section class="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div class="text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Order confirmation</p>
          <h1 class="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Thank you for your rental!</h1>
          <p class="mt-4 max-w-2xl mx-auto text-sm leading-6 text-slate-600 dark:text-slate-400">Your order has been received and our team is preparing your dress for pickup or delivery. Track your booking in My Orders.</p>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-3">
          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Order number</p>
            <p class="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{{ orderIdsText }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Rental dates</p>
            <p class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{{ rentalRange }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Next steps</p>
            <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>Download your invoice</li>
              <li>Track your order status</li>
              <li>Contact support if needed</li>
            </ul>
          </article>
        </div>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a routerLink="/orders" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">View my orders</a>
          <a routerLink="/catalog" class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-base hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200">Continue shopping</a>
        </div>
      </section>
    </main>
  `
})
export class OrderConfirmationPage {
  protected readonly cartService = inject(CartService);
  protected readonly bookingService = inject(BookingService);

  protected get orderIdsText() {
    return this.cartService.lastOrderIds().length ? this.cartService.lastOrderIds().join(', ') : 'N/A';
  }

  protected get rentalRange() {
    const latestOrder = this.bookingService.orders()[0];
    if (!latestOrder) {
      return 'Not available yet';
    }
    return `${latestOrder.rentalStart.slice(0, 10)} → ${latestOrder.rentalEnd.slice(0, 10)}`;
  }
}
