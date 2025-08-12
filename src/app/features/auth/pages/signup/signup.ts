import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/shared/services/auth.service';
import { SignupRequest } from '../../../../core/shared/dtos/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  signupData: SignupRequest = {
    username: '',
    password: '',
    role: 'viewer'
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService
  ) {}

  onSubmit(): void {
    if (!this.signupData.username || !this.signupData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully! Please login.';
        // Navigation removed - let parent component handle navigation
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
      }
    });
  }


}
