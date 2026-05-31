import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { CatalogCardComponent } from '../../shared/components/catalog-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CatalogCardComponent],
  template: `
    <main class="space-y-24 pt-10 pb-20">
      <section class="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <div class="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div class="space-y-6">
            <span class="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/80">Luxury rental experience</span>
            <h1 class="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">Rent premium dresses for every event, delivered with luxury service.</h1>
            <p class="max-w-2xl text-lg text-slate-200/90">Discover beautifully curated collections, instant booking workflow, and designer dresses made available for discerning renters.</p>
            <div class="flex flex-wrap gap-4 pt-2">
              <a routerLink="/catalog" class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100">Browse dresses</a>
              <a routerLink="/auth/login" class="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white transition-colors hover:bg-white/20">Get started</a>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[2rem] bg-white/5 p-5 shadow-soft backdrop-blur-xl">
              <h2 class="text-xl font-semibold text-white">Trending Collections</h2>
              <p class="mt-2 text-sm text-slate-300">Chic selections for gala nights, weddings, and editorial-style events.</p>
              <div class="mt-6 grid gap-3">
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Wedding</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Cocktail</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Red Carpet</span>
              </div>
            </div>
            <div class="rounded-[2rem] bg-white/5 p-5 shadow-soft backdrop-blur-xl">
              <h2 class="text-xl font-semibold text-white">Fast Booking</h2>
              <p class="mt-2 text-sm text-slate-300">Complete your rental in minutes with streamlined size selection, duration, and delivery options.</p>
              <div class="mt-6 grid gap-3">
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Home Delivery</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Store Pickup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="container space-y-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Featured Dresses</p>
            <h2 class="text-3xl font-semibold text-slate-950 dark:text-white">Curated rental highlights</h2>
          </div>
          <a routerLink="/catalog" class="text-sm font-medium text-brand-600 hover:text-brand-700">View full catalog</a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <app-catalog-card *ngFor="let dress of catalogService.dresses() | slice:0:6" [dress]="dress"></app-catalog-card>
        </div>
      </section>
    </main>
  `
})
export class HomePage {
  protected readonly catalogService = inject(CatalogService);
}
