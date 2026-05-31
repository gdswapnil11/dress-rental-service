import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import type { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="grid gap-10 xl:grid-cols-[0.75fr_0.25fr]">
        <section class="space-y-6">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">Your rental cart</h1>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Review dresses, select rental dates, and save favorites for later.</p>
          </div>

          <ng-container *ngIf="cartService.items().length; else emptyCart">
            <article *ngFor="let item of cartService.items()" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="space-y-3">
                  <p class="text-sm uppercase tracking-[0.32em] text-brand-600">{{ item.dressName }}</p>
                  <h2 class="text-xl font-semibold text-slate-950 dark:text-white">Size {{ item.size }}</h2>
                  <p class="text-sm text-slate-600 dark:text-slate-400">{{ item.city || 'Selected city' }} • {{ item.status || 'Available' }}</p>
                </div>
                <span class="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">₹{{ item.pricePerDay }}/day</span>
              </div>
              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <span>Rental start</span>
                  <input type="date" [(ngModel)]="item.startDate" (ngModelChange)="updateItem(item)" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
                </label>
                <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <span>Rental end</span>
                  <input type="date" [(ngModel)]="item.endDate" (ngModelChange)="updateItem(item)" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
                </label>
                <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <span>Size</span>
                  <input type="text" [(ngModel)]="item.size" (ngModelChange)="updateItem(item)" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
                </label>
                <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <span>Move</span>
                  <button type="button" (click)="toggleSaved(item)" class="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-base hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{{ item.savedForLater ? 'Move to Cart' : 'Save for later' }}</button>
                </label>
              </div>
              <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                <div class="text-sm text-slate-600 dark:text-slate-400">Deposit ₹{{ item.deposit }} • Delivery ₹{{ item.deliveryCharges }}</div>
                <div class="flex gap-3">
                  <button type="button" (click)="remove(item.id)" class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-base hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Remove</button>
                </div>
              </div>
            </article>
            <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">Order summary</h2>
              <div class="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <div class="flex items-center justify-between"><span>Items</span><span>{{ cartService.cartCount }}</span></div>
                <div class="flex items-center justify-between"><span>Rental subtotal</span><span>₹{{ cartService.subtotal }}</span></div>
                <div class="flex items-center justify-between"><span>Deposit</span><span>₹{{ cartService.depositTotal }}</span></div>
                <div class="flex items-center justify-between"><span>Delivery</span><span>₹{{ cartService.deliveryTotal }}</span></div>
                <div class="flex items-center justify-between"><span>GST</span><span>₹{{ cartService.gstTotal }}</span></div>
                <div class="border-t border-slate-200 pt-4 dark:border-slate-700">
                  <div class="flex items-center justify-between text-base font-semibold text-slate-950 dark:text-white"><span>Total</span><span>₹{{ cartService.totalAmount }}</span></div>
                </div>
              </div>
              <a routerLink="/checkout" class="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Proceed to checkout</a>
            </div>
          </ng-container>

          <ng-template #emptyCart>
            <div class="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <p class="text-lg font-semibold text-slate-950 dark:text-white">Your cart is empty</p>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">Browse our catalog and add dresses to start your rental journey.</p>
              <a routerLink="/catalog" class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Browse catalog</a>
            </div>
          </ng-template>
        </section>
      </div>
    </main>
  `
})
export class CartPage {
  protected readonly cartService = inject(CartService);

  protected updateItem(item: CartItem) {
    this.cartService.updateItem(item);
  }

  protected remove(itemId: string) {
    this.cartService.removeItem(itemId);
  }

  protected toggleSaved(item: CartItem) {
    this.cartService.toggleSavedForLater(item.id);
  }
}
