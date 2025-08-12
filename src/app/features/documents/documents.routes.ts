import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { EditorGuard } from '../../core/shared/guards/editor.guard';

export const DOCUMENTS_ROUTES: Routes = [
  {
    path: 'documents',
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'upload', 
        loadComponent: () => import('./pages/upload/upload').then(m => m.UploadComponent),
        canActivate: [EditorGuard]
      },
      { 
        path: 'list', 
        loadComponent: () => import('./pages/list/list').then(m => m.ListComponent)
      },
      { 
        path: 'query', 
        loadComponent: () => import('./pages/query/query').then(m => m.QueryComponent)
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
  // Keep the old direct routes for backward compatibility
  { 
    path: 'upload', 
    loadComponent: () => import('./pages/upload/upload').then(m => m.UploadComponent),
    canActivate: [AuthGuard, EditorGuard]
  },
  { 
    path: 'query', 
    loadComponent: () => import('./pages/query/query').then(m => m.QueryComponent),
    canActivate: [AuthGuard]
  }
];
