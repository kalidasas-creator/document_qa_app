import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { DocumentListResponse, Document } from '../../dtos/document.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent implements OnInit {
  documents: DocumentListResponse | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.documentService.listDocuments().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.documents = response;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load documents.';
      }
    });
  }

  refreshDocuments(): void {
    this.loadDocuments();
  }

  navigateToUpload(): void {
    this.router.navigate(['/upload']);
  }

  navigateToQuery(): void {
    this.router.navigate(['/query']);
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'Success';
      case 'queued':
        return 'Queued';
      case 'started':
        return 'Processing';
      case 'pending':
        return 'Pending';
      default:
        return 'Failed';
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'status-success';
      case 'queued':
      case 'processing':
      case 'pending':
        return 'status-pending';
      default:
        return 'status-failed';
    }
  }
}
