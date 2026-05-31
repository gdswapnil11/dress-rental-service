import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="space-y-8">
        <div class="grid gap-6 md:grid-cols-4">
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Upcoming Rentals</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ upcoming }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Active Rentals</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ active }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Past Rentals</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ past }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Returns</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ returned }}</p>
          </article>
        </div>

        <section class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">My orders</h1>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Track your rentals, manage returns, and reorder favorite dresses.</p>
            </div>
            <a routerLink="/catalog" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Browse more dresses</a>
          </div>
          <div class="mt-8 space-y-4">
            <article *ngFor="let order of bookingService.orders()" class="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p class="text-lg font-semibold text-slate-950 dark:text-white">{{ order.dressName }}</p>
                  <p class="text-sm text-slate-600 dark:text-slate-400">{{ order.deliveryMethod }} • {{ order.paymentMethod }}</p>
                </div>
                <span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{{ order.status }}</span>
              </div>
              <div class="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-600 dark:text-slate-300">
                <div><strong>Rental:</strong> {{ order.rentalStart | slice:0:10 }} → {{ order.rentalEnd | slice:0:10 }}</div>
                <div><strong>Total:</strong> ₹{{ order.price + order.deposit + 199 }}</div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  `
})
export class OrdersPage {
  protected readonly bookingService = inject(BookingService);

  protected get upcoming() {
    return this.bookingService.orders().filter((order) => order.status === 'Confirmed' || order.status === 'Packed').length;
  }

  protected get active() {
    return this.bookingService.orders().filter((order) => order.status === 'Shipped' || order.status === 'Delivered').length;
  }

  protected get past() {
    return this.bookingService.orders().filter((order) => order.status === 'Completed').length;
  }

  protected get returned() {
    return this.bookingService.orders().filter((order) => order.status === 'Returned').length;
  }
}
