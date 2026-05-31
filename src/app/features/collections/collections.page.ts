import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../core/services/catalog.service';
import { CatalogCardComponent } from '../../shared/components/catalog-card.component';

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [CommonModule, CatalogCardComponent],
  template: `
    <main class="container py-16">
      <section class="space-y-10">
        <div>
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Event collections</p>
          <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Curated collections for upcoming events</h1>
        </div>

        <div class="grid gap-6 xl:grid-cols-3">
          <article *ngFor="let collection of catalogService.collections()" class="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft transition-base hover:-translate-y-1 hover:border-brand-300 dark:border-slate-800 dark:bg-slate-950">
            <img [src]="collection.image" alt="{{ collection.title }}" class="h-64 w-full object-cover" />
            <div class="p-6">
              <p class="text-xs uppercase tracking-[0.32em] text-brand-600">Collection</p>
              <h2 class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{{ collection.title }}</h2>
              <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{{ collection.description }}</p>
              <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">{{ collection.highlight }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span *ngFor="let tag of collection.occasionTags" class="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  `
})
export class CollectionsPage {
  protected readonly catalogService = inject(CatalogService);
}
