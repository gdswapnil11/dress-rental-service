import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface AnalyticsPayload {
  revenue: number;
  orders: number;
  activeRentals: number;
  dresses: number;
  users: number;
}

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="space-y-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Admin overview</p>
            <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Inventory and booking analytics</h1>
          </div>
          <a routerLink="/admin/users" class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-base hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200">Manage users</a>
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Revenue</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">₹{{ analytics?.revenue | number }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Orders</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ analytics?.orders }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Active rentals</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ analytics?.activeRentals }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Dress inventory</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ analytics?.dresses }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Users</p>
            <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{{ analytics?.users }}</p>
          </article>
        </div>
      </div>
    </main>
  `
})
export class AdminDashboardPage implements OnInit {
  protected analytics: AnalyticsPayload | null = null;
  private readonly http = inject(HttpClient);

  ngOnInit() {
    this.http.get<AnalyticsPayload>('/api/analytics').subscribe((data) => (this.analytics = data));
  }
}
