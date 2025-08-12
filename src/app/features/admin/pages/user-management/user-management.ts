import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/shared/services/auth.service';
import { User, UpdateUserRoleRequest } from '../../../../core/shared/dtos/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  error = '';
  success = '';
  editingUser: User | null = null;
  editForm: UpdateUserRoleRequest = {};

  constructor(private authService: AuthService) {
    // Ensure users is always initialized as an empty array
    this.users = [];
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = '';
    
    this.authService.getAllUsers().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // Handle both direct array response and wrapped response
        this.users = Array.isArray(response) ? response : (response?.data || []);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to load users';
        console.error('Error loading users:', err);
        // Ensure users is always an array even on error
        this.users = [];
      }
    });
  }

  startEdit(user: User): void {
    this.editingUser = { ...user };
    this.editForm = {
      role: user.role,
      active: user.active
    };
  }

  cancelEdit(): void {
    this.editingUser = null;
    this.editForm = {};
  }

  saveEdit(): void {
    if (!this.editingUser) return;

    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.authService.updateUser(this.editingUser.id, this.editForm).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.success = 'User updated successfully';
        
        // Handle both direct object response and wrapped response
        const updatedUser = response?.data || response;
        
        // Update the user in the local array
        const index = this.users.findIndex(u => u.id === this.editingUser!.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        
        this.editingUser = null;
        this.editForm = {};
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to update user';
        console.error('Error updating user:', err);
      }
    });
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'admin':
        return 'badge-admin';
      case 'editor':
        return 'badge-editor';
      case 'viewer':
        return 'badge-viewer';
      default:
        return 'badge-default';
    }
  }

  getRoleDisplayName(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  getStatusBadgeClass(active: boolean): string {
    return active ? 'badge-active' : 'badge-inactive';
  }

  getStatusDisplayName(active: boolean): string {
    return active ? 'Active' : 'Inactive';
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }

  getActiveUsersCount(): number {
    return this.users.filter(u => u.active).length;
  }

  getAdminUsersCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }

  getEditorUsersCount(): number {
    return this.users.filter(u => u.role === 'editor').length;
  }

  getViewerUsersCount(): number {
    return this.users.filter(u => u.role === 'viewer').length;
  }
}
