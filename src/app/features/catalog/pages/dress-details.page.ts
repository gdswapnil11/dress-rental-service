import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from '../../../core/services/catalog.service';
import type { Dress } from '../../../models/dress.model';
import type { Review } from '../../../models/review.model';

@Component({
  selector: 'app-dress-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <section *ngIf="dress" class="space-y-10">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_0.6fr]">
          <div class="space-y-6">
            <div class="grid gap-4 md:grid-cols-2">
              <img [src]="dress.images[0]" alt="{{ dress.name }}" class="h-[420px] w-full rounded-[2rem] object-cover" />
              <div class="grid gap-4">
                <img [src]="dress.images[1]" alt="{{ dress.name }} image 2" class="h-48 w-full rounded-[2rem] object-cover" />
                <img [src]="dress.images[2]" alt="{{ dress.name }} image 3" class="h-48 w-full rounded-[2rem] object-cover" />
              </div>
            </div>
            <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.32em] text-brand-600">{{ dress.category }}</p>
                  <h1 class="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">{{ dress.name }}</h1>
                </div>
                <div class="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 dark:bg-slate-900 dark:text-slate-200">₹{{ dress.price }}/day</div>
              </div>
              <p class="mt-6 text-slate-600 dark:text-slate-300">{{ dress.description }}</p>
              <div class="mt-8 grid gap-4 sm:grid-cols-2">
                <div class="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                  <p class="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Sizes</p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span *ngFor="let size of dress.sizes" class="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase text-slate-600 dark:border-slate-700 dark:text-slate-300">{{ size }}</span>
                  </div>
                </div>
                <div class="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                  <p class="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Availability</p>
                  <p class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{{ dress.available ? 'In stock' : 'Currently unavailable' }}</p>
                </div>
              </div>
            </div>
          </div>
          <aside class="space-y-4">
            <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <p class="text-xs uppercase tracking-[0.32em] text-brand-600">Booking details</p>
              <div class="mt-6 space-y-3">
                <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Deposit</span><span>₹{{ dress.deposit }}</span></div>
                <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Ratings</span><span>⭐ {{ dress.rating.toFixed(1) }}</span></div>
                <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Reviews</span><span>{{ dress.reviews }}</span></div>
              </div>
              <a routerLink="/booking" class="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Start booking</a>
            </div>
            <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <h2 class="text-lg font-semibold text-slate-950 dark:text-white">Customer reviews</h2>
              <div class="mt-6 space-y-4">
                <article *ngFor="let review of reviews.slice(0, 3)" class="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                  <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ review.userName }}</p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ review.comment }}</p>
                  <p class="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">Rating: {{ review.rating.toFixed(1) }}</p>
                </article>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  `
})
export class DressDetailsPage implements OnInit {
  protected dress: Dress | null = null;
  protected reviews: Review[] = [];
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly catalogService = inject(CatalogService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.catalogService.getDressById(id).subscribe((data) => (this.dress = data));
    this.http.get<Review[]>(`/api/reviews?dressId=${id}`).subscribe((data) => (this.reviews = data));
  }
}
