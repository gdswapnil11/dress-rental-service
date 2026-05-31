import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-customer-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="space-y-8">
        <div class="grid gap-6 md:grid-cols-3">
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Upcoming Rentals</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ upcomingCount }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Active Rentals</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ activeCount }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Total Bookings</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ bookingService.orders().length }}</p>
          </article>
        </div>

        <section class="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">Recent bookings</h2>
              <p class="text-sm text-slate-600 dark:text-slate-400">Track your latest dress rental activity.</p>
            </div>
            <a routerLink="/booking" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">New booking</a>
          </div>
          <div class="space-y-4">
            <article *ngFor="let order of bookingService.orders().slice(0, 5)" class="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p class="font-semibold text-slate-950 dark:text-white">{{ order.dressName }}</p>
                  <p class="text-sm text-slate-600 dark:text-slate-400">{{ order.deliveryMethod }} • {{ order.paymentMethod }}</p>
                </div>
                <span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{{ order.status }}</span>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  `
})
export class CustomerDashboardPage {
  protected readonly bookingService = inject(BookingService);

  get upcomingCount() {
    return this.bookingService.orders().filter((order) => order.status === 'Confirmed' || order.status === 'Packed').length;
  }

  get activeCount() {
    return this.bookingService.orders().filter((order) => order.status === 'Shipped' || order.status === 'Delivered').length;
  }
}
