import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {
  private isHandlingAuthError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        this.handleAuthError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleAuthError(error: AxiosError): void {
    if (this.isHandlingAuthError) {
      return;
    }

    const status = error.response?.status;
    const errorMessage = this.getErrorMessage(error);

    // Check for authentication-related errors
    if (this.isAuthError(status, errorMessage)) {
      this.isHandlingAuthError = true;
      
      console.warn('Authentication error detected:', {
        status,
        message: errorMessage,
        url: error.config?.url
      });

      
      this.authService.logout();

   
      this.router.navigate(['/login']);

      // Reset flag after a short delay
      setTimeout(() => {
        this.isHandlingAuthError = false;
      }, 1000);
    }
  }

  private isAuthError(status?: number, message?: string): boolean {
  
    if (status === 401 || status === 403) {
      return true;
    }

 
    if (message) {
      const authKeywords = [
        'authentication failed',
        'jwt expired',
        'token expired',
        'invalid token',
        'unauthorized',
        'forbidden',
        'access denied',
        'authentication required',
        'jwt malformed',
        'jwt invalid',
        'token invalid',
        'token malformed',
        'bearer token',
        'authorization failed'
      ];

      const lowerMessage = message.toLowerCase();
      return authKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    return false;
  }

  private getErrorMessage(error: AxiosError): string {
    // Try to extract error message from different response formats
    if (error.response?.data) {
      const data = error.response.data;
      
      // Handle different error response formats
      if (typeof data === 'string') {
        return data;
      }
      
      if (typeof data === 'object') {
        // Common error message fields
        const messageFields = ['message', 'error', 'detail', 'description', 'reason'];
        
        for (const field of messageFields) {
          if (data && typeof data === 'object' && field in data) {
            return String((data as any)[field]);
          }
        }
        
        // If no specific message field, stringify the object
        return JSON.stringify(data);
      }
    }

    // Fallback to error message or status text
    return error.message || error.response?.statusText || 'Unknown error';
  }
}
