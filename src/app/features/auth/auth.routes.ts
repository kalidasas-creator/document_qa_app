import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'signup', 
    loadComponent: () => import('./pages/signup/signup').then(m => m.SignupComponent) 
  }
];
