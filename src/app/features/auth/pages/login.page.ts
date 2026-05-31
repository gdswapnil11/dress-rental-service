import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="mx-auto max-w-3xl space-y-10 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div class="space-y-3 text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Welcome back</p>
          <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Sign in to your fashion rental account</h1>
          <p class="max-w-2xl mx-auto text-sm leading-6 text-slate-600 dark:text-slate-400">Access your bookings, wishlist, and premium dress recommendations.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="submit()" class="space-y-6">
          <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>Email or mobile</span>
            <input formControlName="email" type="text" placeholder="Email or phone" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          </label>

          <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>Password</span>
            <input formControlName="password" type="password" placeholder="••••••••" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          </label>

          <div class="flex items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
            <a routerLink="/auth/forgot-password" class="hover:text-brand-600">Forgot password?</a>
            <a routerLink="/auth/register" class="font-semibold text-brand-600 hover:text-brand-700">Create account</a>
          </div>

          <button type="submit" class="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Sign in</button>
        </form>
      </div>
    </main>
  `
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value as any).subscribe(() => this.router.navigate(['/customer']));
  }
}
