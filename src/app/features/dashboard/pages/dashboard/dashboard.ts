import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/shared/services/auth.service';
import { User } from '../../../../core/shared/dtos/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.isLoading = true;
    this.authService.getMe().subscribe({
      next: (user) => {
        this.isLoading = false;
        this.currentUser = user;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Failed to load user:', error);
      }
    });
  }

  // Role-based permission methods
  canUpload(): boolean {
    return this.currentUser?.role === 'editor' || this.currentUser?.role === 'admin';
  }

  canViewDocuments(): boolean {
    return this.currentUser?.role === 'viewer' || this.currentUser?.role === 'editor' || this.currentUser?.role === 'admin';
  }

  canQueryDocuments(): boolean {
    return this.currentUser?.role === 'viewer' || this.currentUser?.role === 'editor' || this.currentUser?.role === 'admin';
  }

  canManageUsers(): boolean {
    return this.currentUser?.role === 'admin';
  }

  navigateToUpload(): void {
    console.log('Navigating to upload...');
    this.router.navigate(['/documents/upload']);
  }

  navigateToDocuments(): void {
    console.log('Navigating to documents...');
    this.router.navigate(['/documents/list']);
  }

  navigateToQuery(): void {
    console.log('Navigating to query...');
    this.router.navigate(['/documents/query']);
  }

  navigateToUserManagement(): void {
    console.log('Navigating to user management...');
    this.router.navigate(['/admin/users']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getWelcomeMessage(): string {
    if (!this.currentUser) return 'Welcome!';
    return `Welcome, ${this.currentUser.username}!`;
  }

  getUserRole(): string {
    if (!this.currentUser) return '';
    return this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1);
  }

  getRoleDescription(): string {
    if (!this.currentUser) return '';
    
    switch (this.currentUser.role) {
      case 'viewer':
        return 'You can view document status and query documents';
      case 'editor':
        return 'You can upload, view, and query documents';
      case 'admin':
        return 'You can manage users, upload, view, and query documents';
      default:
        return '';
    }
  }
}
