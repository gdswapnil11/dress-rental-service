import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dress } from '../../models/dress.model';

@Component({
  selector: 'app-catalog-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition-base hover:-translate-y-1 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900">
      <a [routerLink]="['/catalog', dress.id]" class="block h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img [src]="dress.images[0]" alt="{{ dress.name }}" class="h-full w-full object-cover transition-base duration-500 hover:scale-105" />
      </a>
      <div class="space-y-3 p-5">
        <div class="flex items-center justify-between gap-3">
          <span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{{ dress.category }}</span>
          <span class="text-sm font-semibold text-slate-900 dark:text-white">₹{{ dress.price }}/day</span>
        </div>
        <a [routerLink]="['/catalog', dress.id]" class="block text-lg font-semibold text-slate-950 transition-colors hover:text-brand-600 dark:text-white">{{ dress.name }}</a>
        <p class="text-sm leading-6 text-slate-600 dark:text-slate-400">{{ dress.description }}</p>
        <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{{ dress.available ? 'Available' : 'Out of stock' }}</span>
          <span>⭐ {{ dress.rating.toFixed(1) }}</span>
        </div>
      </div>
    </article>
  `
})
export class CatalogCardComponent {
  @Input({ required: true }) dress!: Dress;
}
