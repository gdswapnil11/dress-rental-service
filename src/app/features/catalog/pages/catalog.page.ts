import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../../core/services/catalog.service';
import { CatalogCardComponent } from '../../../shared/components/catalog-card.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CatalogCardComponent],
  template: `
    <main class="container py-16">
      <section class="space-y-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Dress Catalog</p>
            <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Explore curated rentals across categories</h1>
          </div>
          <div class="flex flex-wrap gap-3">
            <input type="search" [(ngModel)]="query" (ngModelChange)="search()" placeholder="Search dresses, brands, occasions" class="rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          </div>
        </div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <app-catalog-card *ngFor="let dress of catalogService.dresses()" [dress]="dress"></app-catalog-card>
        </div>
      </section>
    </main>
  `
})
export class CatalogPage {
  protected readonly catalogService = inject(CatalogService);
  protected query = '';

  search() {
    this.catalogService.loadDresses(this.query);
  }
}
