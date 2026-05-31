import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div class="space-y-4 text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Reset password</p>
          <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Set a secure new password</h1>
          <p class="text-sm leading-6 text-slate-600 dark:text-slate-400">Enter your new password and confirm to restore access to your rental account.</p>
        </div>
        <div class="mt-8 space-y-4">
          <input type="password" placeholder="New password" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          <input type="password" placeholder="Confirm password" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          <button class="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Update password</button>
          <p class="text-center text-sm text-slate-600 dark:text-slate-400">Back to <a routerLink="/auth/login" class="font-semibold text-brand-600 hover:text-brand-700">Login</a></p>
        </div>
      </div>
    </main>
  `
})
export class ResetPasswordPage {}
