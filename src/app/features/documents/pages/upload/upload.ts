import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  detail: string = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Please select a valid file type (PDF, TXT, DOC, DOCX)';
        this.selectedFile = null;
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        this.errorMessage = 'File size must be less than 10MB';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file';
      return;
    }

    if (!this.detail.trim()) {
      this.errorMessage = 'Please provide document details';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.documentService.uploadDocument(this.selectedFile, this.detail).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Document uploaded successfully!';
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/documents']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Upload failed. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.selectedFile = null;
    this.detail = '';
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
