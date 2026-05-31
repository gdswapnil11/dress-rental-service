import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate() {
    const user = this.authService.currentUser();
    if (user?.role === 'admin') {
      return true;
    }
    return this.router.parseUrl('/auth/login');
  }
}
