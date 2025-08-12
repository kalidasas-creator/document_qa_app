import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  }
];
