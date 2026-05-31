import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/90">
      <div class="container flex flex-wrap items-center justify-between gap-4 py-4">
        <a routerLink="/" class="flex items-center gap-3 font-semibold text-slate-950 dark:text-white">
          <div class="h-11 w-11 rounded-3xl bg-brand-500/10 text-brand-600 grid place-items-center">F</div>
          <div>
            <p class="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Fashion</p>
            <p class="text-lg font-semibold">Dress Rental</p>
          </div>
        </a>

        <nav class="hidden items-center gap-4 md:flex">
          <a routerLink="/catalog" routerLinkActive="text-brand-600" class="text-sm text-slate-700 hover:text-brand-600 dark:text-slate-300">Catalog</a>
          <a routerLink="/booking" routerLinkActive="text-brand-600" class="text-sm text-slate-700 hover:text-brand-600 dark:text-slate-300">Booking</a>
          <a routerLink="/customer" routerLinkActive="text-brand-600" class="text-sm text-slate-700 hover:text-brand-600 dark:text-slate-300">Dashboard</a>
          <a routerLink="/admin" routerLinkActive="text-brand-600" class="text-sm text-slate-700 hover:text-brand-600 dark:text-slate-300">Admin</a>
        </nav>

        <div class="flex items-center gap-3">
          <button type="button" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition-base hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200" (click)="themeService.toggleMode()">
            {{ toggleLabel() }}
          </button>
          <a routerLink="/auth/login" class="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-base hover:bg-brand-700">Sign in</a>
        </div>
      </div>
    </header>
  `
})
export class HeaderShellComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly displayMode = computed(() => this.themeService.effectiveTheme());

  protected toggleLabel() {
    return this.displayMode() === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
}
