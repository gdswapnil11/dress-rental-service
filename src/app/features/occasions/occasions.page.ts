import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { LocationService } from '../../core/services/location.service';
import { CatalogCardComponent } from '../../shared/components/catalog-card.component';

@Component({
  selector: 'app-occasions-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CatalogCardComponent],
  template: `
    <main class="container py-16">
      <section class="space-y-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Occasion shopping</p>
            <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Shop by occasion for every celebration</h1>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <label class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              City
              <select class="bg-transparent outline-none" [ngModel]="locationService.selectedCity()" (ngModelChange)="onCityChange($event)">
                <option *ngFor="let city of locationService.cities" [value]="city">{{ city }}</option>
              </select>
            </label>
            <label class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <input type="checkbox" [(ngModel)]="availableToday" (ngModelChange)="refresh()" />
              Available Today
            </label>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button type="button" *ngFor="let occasion of catalogService.occasions()" (click)="selectOccasion(occasion)" [class]="selectedOccasion === occasion ? 'rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white' : 'rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'">{{ occasion }}</button>
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <app-catalog-card *ngFor="let dress of catalogService.dresses()" [dress]="dress"></app-catalog-card>
        </div>
      </section>
    </main>
  `
})
export class OccasionsPage {
  protected readonly catalogService = inject(CatalogService);
  protected readonly locationService = inject(LocationService);
  protected selectedOccasion = '';
  protected availableToday = false;

  protected selectOccasion(occasion: string) {
    this.selectedOccasion = occasion;
    this.refresh();
  }

  protected onCityChange(city: string) {
    this.locationService.selectCity(city);
    this.refresh();
  }

  protected refresh() {
    this.catalogService.loadDresses({
      occasion: this.selectedOccasion || undefined,
      city: this.locationService.selectedCity(),
      availableToday: this.availableToday
    });
  }
}
