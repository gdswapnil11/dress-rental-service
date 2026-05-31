import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-otp-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="container py-16">
      <div class="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div class="mb-8 text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-brand-600">WhatsApp OTP</p>
          <h1 class="mt-3 text-4xl font-semibold text-slate-950 dark:text-white">Verify your mobile number</h1>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Complete sign in with a secure One-Time Password delivered to WhatsApp.</p>
        </div>

        <form [formGroup]="otpForm" (ngSubmit)="submit()" class="space-y-6">
          <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>Mobile number</span>
            <input formControlName="phone" type="tel" placeholder="+91 90000 12345" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          </label>

          <label class="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>OTP code</span>
            <input formControlName="otp" type="text" placeholder="123456" class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition-base focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
          </label>

          <button type="submit" class="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-base hover:bg-brand-700">Verify OTP</button>

          <p class="text-center text-sm text-slate-600 dark:text-slate-400">Return to <a routerLink="/auth/login" class="font-semibold text-brand-600 hover:text-brand-700">Sign in</a></p>
        </form>
      </div>
    </main>
  `
})
export class OtpPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly otpForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    otp: new FormControl('', [Validators.required])
  });

  submit() {
    if (this.otpForm.invalid) {
      return;
    }
    this.authService.verifyOtp(this.otpForm.value as any).subscribe(() => this.router.navigate(['/customer']));
  }
}
