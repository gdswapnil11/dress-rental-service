import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div class="space-y-4 text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Forgot password</p>
          <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Reset your account password</h1>
          <p class="text-sm leading-6 text-slate-600 dark:text-slate-400">Enter your email address to receive a secure password reset link.</p>
        </div>
        <div class="mt-8 space-y-4">
          <input type="email" placeholder="Email address" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          <button class="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Send reset link</button>
          <p class="text-center text-sm text-slate-600 dark:text-slate-400">Back to <a routerLink="/auth/login" class="font-semibold text-brand-600 hover:text-brand-700">Login</a></p>
        </div>
      </div>
    </main>
  `
})
export class ForgotPasswordPage {}
