import { Routes } from '@angular/router';
import { AdminGuard, AuthGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register.page').then((m) => m.RegisterPage)
  },
  {
    path: 'auth/otp',
    loadComponent: () => import('./features/auth/pages/otp.page').then((m) => m.OtpPage)
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./features/auth/pages/forgot-password.page').then((m) => m.ForgotPasswordPage)
  },
  {
    path: 'auth/reset-password',
    loadComponent: () => import('./features/auth/pages/reset-password.page').then((m) => m.ResetPasswordPage)
  },
  {
    path: 'auth/profile-completion',
    loadComponent: () => import('./features/auth/pages/profile-completion.page').then((m) => m.ProfileCompletionPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/verify',
    loadComponent: () => import('./features/auth/pages/account-verification.page').then((m) => m.AccountVerificationPage)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./features/catalog/pages/catalog.page').then((m) => m.CatalogPage)
  },
  {
    path: 'catalog/:id',
    loadComponent: () => import('./features/catalog/pages/dress-details.page').then((m) => m.DressDetailsPage)
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/pages/booking-wizard.page').then((m) => m.BookingWizardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    loadComponent: () => import('./features/customer/pages/customer-dashboard.page').then((m) => m.CustomerDashboardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/pages/admin-dashboard.page').then((m) => m.AdminDashboardPage),
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
