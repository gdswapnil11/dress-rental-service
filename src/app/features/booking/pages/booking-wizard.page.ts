import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { CatalogService } from '../../../core/services/catalog.service';
import type { Dress } from '../../../models/dress.model';

@Component({
  selector: 'app-booking-wizard-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="container py-16">
      <div class="grid gap-10 xl:grid-cols-[0.9fr_0.6fr]">
        <section class="space-y-8">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">Complete booking workflow</h1>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Follow the steps to choose a dress, select your rental duration, and complete checkout.</p>
            <div class="mt-8 space-y-4">
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Step {{ step }} of 5</p>
                <h2 class="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{{ stepTitle() }}</h2>
              </div>
              <div [ngSwitch]="step" class="space-y-6">
                <div *ngSwitchCase="1" class="space-y-4">
                  <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <span>Select dress</span>
                    <select [(ngModel)]="selectedDressId" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                      <option value="">Choose a dress</option>
                      <option *ngFor="let dress of catalogService.dresses()" [value]="dress.id">{{ dress.name }} — ₹{{ dress.price }}/day</option>
                    </select>
                  </label>
                </div>
                <div *ngSwitchCase="2" class="space-y-4">
                  <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <span>Choose size</span>
                    <select [(ngModel)]="selectedSize" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                      <option *ngFor="let size of selectedDress?.sizes || ['S', 'M', 'L']" [value]="size">{{ size }}</option>
                    </select>
                  </label>
                </div>
                <div *ngSwitchCase="3" class="space-y-4">
                  <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <span>Rental duration</span>
                    <input type="number" min="1" [(ngModel)]="duration" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
                  </label>
                </div>
                <div *ngSwitchCase="4" class="space-y-4">
                  <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <span>Delivery method</span>
                    <select [(ngModel)]="deliveryMethod" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                      <option value="Home Delivery">Home Delivery</option>
                      <option value="Store Pickup">Store Pickup</option>
                    </select>
                  </label>
                  <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <span>Delivery address</span>
                    <textarea [(ngModel)]="address" rows="3" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"></textarea>
                  </label>
                </div>
                <div *ngSwitchCase="5" class="space-y-4">
                  <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <span>Payment method</span>
                    <select [(ngModel)]="paymentMethod" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Wallet">Wallet</option>
                    </select>
                  </label>
                  <div class="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p class="text-sm text-slate-500 dark:text-slate-400">Order review</p>
                    <div class="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                      <p>Dress: {{ selectedDress?.name || 'Select a dress' }}</p>
                      <p>Duration: {{ duration }} days</p>
                      <p>Delivery: {{ deliveryMethod }}</p>
                      <p>Address: {{ address }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-3 pt-4">
                <button type="button" class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-base hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200" [disabled]="step === 1" (click)="previous()">Back</button>
                <button type="button" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700" (click)="continue()">{{ step < 5 ? 'Next step' : 'Complete booking' }}</button>
              </div>
            </div>
          </div>
        </section>
        <aside class="space-y-6">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <h2 class="text-lg font-semibold text-slate-950 dark:text-white">Booking summary</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Review your rental details before completing your booking.</p>
            <div class="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div class="flex items-center justify-between"><span>Dress</span><span>{{ selectedDress?.name || 'Not selected' }}</span></div>
              <div class="flex items-center justify-between"><span>Daily rate</span><span>₹{{ selectedDress?.price || 0 }}</span></div>
              <div class="flex items-center justify-between"><span>Duration</span><span>{{ duration }} days</span></div>
              <div class="flex items-center justify-between"><span>Deposit</span><span>₹{{ selectedDress?.deposit || 0 }}</span></div>
              <div class="border-t border-slate-200 pt-4 dark:border-slate-700">
                <div class="flex items-center justify-between text-sm font-semibold text-slate-950 dark:text-white">
                  <span>Total estimate</span>
                  <span>₹{{ (selectedDress?.price || 0) * duration + (selectedDress?.deposit || 0) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-[2rem] border border-slate-200 bg-brand-50 p-8 dark:border-brand-500/20 dark:bg-brand-950/20">
            <h3 class="text-lg font-semibold text-brand-700 dark:text-brand-300">Need help?</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Message our concierge team for personal styling advice and delivery planning.</p>
          </div>
        </aside>
      </div>
    </main>
  `
})
export class BookingWizardPage {
  private readonly bookingService = inject(BookingService);
  protected readonly catalogService = inject(CatalogService);
  protected step = 1;
  protected selectedDressId = '';
  protected selectedSize = 'M';
  protected duration = 3;
  protected deliveryMethod = 'Home Delivery';
  protected address = '123 Fashion Avenue, Mumbai';
  protected paymentMethod = 'UPI';

  get selectedDress(): Dress | undefined {
    return this.catalogService.dresses().find((dress) => dress.id === this.selectedDressId);
  }

  stepTitle() {
    const titles = ['Select dress', 'Choose size', 'Choose duration', 'Delivery details', 'Review & pay'];
    return titles[this.step - 1] || 'Booking';
  }

  continue() {
    if (this.step < 5) {
      this.step += 1;
      return;
    }
    const dress = this.selectedDress;
    if (!dress) {
      return;
    }
    this.bookingService.createBooking({
      id: '',
      userId: 'user-2',
      dressId: dress.id,
      dressName: dress.name,
      status: 'Confirmed',
      rentalDurationDays: this.duration,
      price: dress.price * this.duration,
      deposit: dress.deposit,
      rentalStart: new Date().toISOString(),
      rentalEnd: new Date(Date.now() + this.duration * 86400000).toISOString(),
      paymentMethod: this.paymentMethod as any,
      deliveryMethod: this.deliveryMethod as any,
      address: this.address
    }).subscribe();
  }

  previous() {
    if (this.step > 1) {
      this.step -= 1;
    }
  }
}
