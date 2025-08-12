import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminGuard } from '../../core/shared/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { 
        path: 'users', 
        loadComponent: () => import('./pages/user-management/user-management').then(m => m.UserManagementComponent)
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  }
];
