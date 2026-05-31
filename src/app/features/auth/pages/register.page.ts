import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="mx-auto max-w-3xl space-y-10 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div class="space-y-3 text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">Create an account</p>
          <h1 class="text-4xl font-semibold text-slate-950 dark:text-white">Register for seamless dress rental experiences</h1>
          <p class="max-w-2xl mx-auto text-sm leading-6 text-slate-600 dark:text-slate-400">Join the community to start booking premium outfits with flexible durations and delivery options.</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="submit()" class="space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <span>Full name</span>
              <input formControlName="fullName" type="text" placeholder="Your full name" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
            <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <span>Mobile number</span>
              <input formControlName="phone" type="tel" placeholder="+91 90000 12345" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <span>Email</span>
              <input formControlName="email" type="email" placeholder="name@example.com" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
            <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <span>Password</span>
              <input formControlName="password" type="password" placeholder="Create password" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </label>
          </div>

          <button type="submit" class="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Create account</button>

          <p class="text-center text-sm text-slate-600 dark:text-slate-400">Already have an account? <a routerLink="/auth/login" class="font-semibold text-brand-600 hover:text-brand-700">Sign in</a></p>
        </form>
      </div>
    </main>
  `
})
export class RegisterPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value as any).subscribe(() => this.router.navigate(['/customer']));
  }
}
