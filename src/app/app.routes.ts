import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AUTH_ROUTES } from './features/auth';
import { DASHBOARD_ROUTES } from './features/dashboard';
import { DOCUMENTS_ROUTES } from './features/documents';
import { ADMIN_ROUTES } from './features/admin';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Auth routes
  ...AUTH_ROUTES,
  
  // Dashboard routes
  ...DASHBOARD_ROUTES,
  
  // Documents routes
  ...DOCUMENTS_ROUTES,
  
  // Admin routes
  ...ADMIN_ROUTES,
  
  // Fallback route
  { path: '**', redirectTo: '/dashboard' }
];
