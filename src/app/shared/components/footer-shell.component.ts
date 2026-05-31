import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-shell',
  standalone: true,
  template: `
    <footer class="border-t border-slate-200/80 bg-white/90 py-10 text-slate-700 dark:border-slate-800/80 dark:bg-slate-950/90 dark:text-slate-300">
      <div class="container grid gap-8 md:grid-cols-3">
        <div>
          <h3 class="mb-3 text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Dress Rental</h3>
          <p class="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">A premium digital fashion rental platform built with Angular, Tailwind, and modern signal-driven architecture.</p>
        </div>
        <div>
          <h4 class="mb-3 text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Explore</h4>
          <ul class="space-y-2 text-sm">
            <li><a routerLink="/catalog" class="hover:text-brand-600">Catalog</a></li>
            <li><a routerLink="/booking" class="hover:text-brand-600">Booking</a></li>
            <li><a routerLink="/auth/login" class="hover:text-brand-600">Login</a></li>
          </ul>
        </div>
        <div>
          <h4 class="mb-3 text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Connect</h4>
          <p class="text-sm leading-6 text-slate-600 dark:text-slate-400">Subscribe to get curated dress recommendations and VIP rental alerts.</p>
          <form class="mt-4 flex flex-wrap gap-2">
            <input type="email" placeholder="Email address" class="flex-1 min-w-[180px] rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            <button type="submit" class="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  `
})
export class FooterShellComponent {}
