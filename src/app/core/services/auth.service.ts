import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, signal } from '@angular/core';
import { AuthUser, LoginPayload, OtpPayload, RegisterPayload, VerifyOtpPayload } from '../../models/auth.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<AuthUser | null>(this.restoreUser());
  readonly isAuthenticated = computed(() => Boolean(this.currentUser()));

  constructor(private readonly http: HttpClient) {
    effect(() => this.persistUser());
  }

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.http.post<AuthUser>('/api/auth/login', payload).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  register(payload: RegisterPayload): Observable<AuthUser> {
    return this.http.post<AuthUser>('/api/auth/register', payload).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  sendOtp(payload: OtpPayload): Observable<{ success: boolean; otpSent: boolean }> {
    return this.http.post<{ success: boolean; otpSent: boolean }>('/api/auth/send-otp', payload);
  }

  verifyOtp(payload: VerifyOtpPayload): Observable<AuthUser> {
    return this.http.post<AuthUser>('/api/auth/verify-otp', payload).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  logout() {
    this.currentUser.set(null);
  }

  private restoreUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem('dress-rental-user');
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private persistUser() {
    const user = this.currentUser();
    if (user) {
      localStorage.setItem('dress-rental-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dress-rental-user');
    }
  }
}
