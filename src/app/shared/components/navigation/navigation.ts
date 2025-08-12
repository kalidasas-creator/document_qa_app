import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav-menu">
      <div class="nav-container">
        <button 
          class="nav-btn" 
          (click)="goBack()" 
          title="Go Back"
          [disabled]="!canGoBack"
          [class.disabled]="!canGoBack">
          <span class="nav-icon">←</span>
          <span class="nav-text">Back</span>
        </button>
        <button class="nav-btn" (click)="goHome()" title="Go Home">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Home</span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .nav-menu {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 1000;
    }

    .nav-container {
      display: flex;
      gap: 10px;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-btn:hover:not(.disabled) {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .nav-btn.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: rgba(255, 255, 255, 0.5);
    }

    .nav-btn.disabled:hover {
      transform: none;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-icon {
      font-size: 16px;
      font-weight: bold;
    }

    .nav-text {
      font-size: 14px;
    }
  `]
})
export class NavigationComponent implements OnInit {
  canGoBack = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkHistory();
  }

  private checkHistory(): void {
    // Check if there's history to go back to
    this.canGoBack = window.history.length > 1;
  }

  goBack(): void {
    if (this.canGoBack) {
      window.history.back();
    }
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
