import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { LocationService } from '../../core/services/location.service';
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
            <p class="max-w-2xl text-lg text-slate-200/90">Discover beautifully curated collections, fast booking, and personalized recommendations based on your city and upcoming festivals.</p>
            <div class="flex flex-wrap gap-4 pt-2">
              <a routerLink="/occasions" class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100">Shop by occasion</a>
              <a routerLink="/collections" class="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white transition-colors hover:bg-white/20">Explore collections</a>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[2rem] bg-white/5 p-5 shadow-soft backdrop-blur-xl">
              <h2 class="text-xl font-semibold text-white">Trending Now</h2>
              <p class="mt-2 text-sm text-slate-300">Styles that are popular in {{ locationService.selectedCity() }} this week.</p>
              <div class="mt-6 grid gap-3">
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Navratri</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Wedding</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Festival</span>
              </div>
            </div>
            <div class="rounded-[2rem] bg-white/5 p-5 shadow-soft backdrop-blur-xl">
              <h2 class="text-xl font-semibold text-white">Available Today</h2>
              <p class="mt-2 text-sm text-slate-300">Immediate rentals available in {{ locationService.selectedCity() }} for urgent events.</p>
              <div class="mt-6 grid gap-3">
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Same-day</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Fast pickup</span>
                <span class="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">Last-minute</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="container space-y-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Quick access</p>
            <h2 class="text-3xl font-semibold text-slate-950 dark:text-white">Browse by occasion</h2>
          </div>
          <a routerLink="/occasions" class="text-sm font-medium text-brand-600 hover:text-brand-700">See all occasions</a>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <a *ngFor="let occasion of catalogService.occasions() | slice:0:8" [routerLink]="['/occasions']" class="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm font-semibold text-slate-950 transition-colors hover:border-brand-600 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            {{ occasion }}
          </a>
        </div>
      </section>

      <section class="container space-y-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Curated collections</p>
            <h2 class="text-3xl font-semibold text-slate-950 dark:text-white">Curated event-ready collections</h2>
          </div>
          <a routerLink="/collections" class="text-sm font-medium text-brand-600 hover:text-brand-700">Explore all collections</a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article *ngFor="let collection of catalogService.collections() | slice:0:3" class="rounded-[2rem] border border-slate-200 bg-white shadow-soft transition-base hover:-translate-y-1 hover:border-brand-300 dark:border-slate-800 dark:bg-slate-950">
            <img [src]="collection.image" alt="{{ collection.title }}" class="h-64 w-full object-cover" />
            <div class="p-6">
              <p class="text-xs uppercase tracking-[0.32em] text-brand-600">Collection</p>
              <h3 class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{{ collection.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{{ collection.highlight }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="container space-y-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Available today</p>
            <h2 class="text-3xl font-semibold text-slate-950 dark:text-white">Last-minute rentals in your city</h2>
          </div>
          <a routerLink="/catalog" class="text-sm font-medium text-brand-600 hover:text-brand-700">Browse available dresses</a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <app-catalog-card *ngFor="let dress of featuredToday" [dress]="dress"></app-catalog-card>
        </div>
      </section>
    </main>
  `
})
export class HomePage implements OnInit {
  protected readonly catalogService = inject(CatalogService);
  protected readonly locationService = inject(LocationService);
  protected featuredToday = [] as any[];

  ngOnInit() {
    this.catalogService.loadDresses({ city: this.locationService.selectedCity(), availableToday: true });
    this.featuredToday = this.catalogService.dresses().filter((dress) => dress.availableToday).slice(0, 6);
  }
}
