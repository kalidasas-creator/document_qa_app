import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { Document, DocumentQueryResponse } from '../../dtos/document.model';
import { Nl2brPipe } from '../../../../shared/pipes/nl2br.pipe';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule, FormsModule, Nl2brPipe],
  templateUrl: './query.html',
  styleUrl: './query.css'
})
export class QueryComponent implements OnInit {
  availableDocuments: Document[] = [];
  selectedDocumentId: string = '';
  query: string = '';
  isLoading = false;
  errorMessage = '';
  queryResult: any = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadAvailableDocuments();
  }

  loadAvailableDocuments(): void {
    this.documentService.listDocuments().subscribe({
      next: (response) => {
        // Only show completed/success documents for querying
        this.availableDocuments = [
          ...response.success.documents,
          ...response.pending.documents.filter((doc: Document) => doc.ingestionStatus === 'completed')
        ];
      },
      error: (error) => {
        this.errorMessage = 'Failed to load documents.';
      }
    });
  }

  onSubmit(): void {
    if (!this.selectedDocumentId) {
      this.errorMessage = 'Please select a document';
      return;
    }

    if (!this.query.trim()) {
      this.errorMessage = 'Please enter a query';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.queryResult = null;

    this.documentService.queryDocument(this.selectedDocumentId, this.query).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.queryResult = response;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Query failed. Please try again.';
      }
    });
  }

  clearQuery(): void {
    this.query = '';
    this.queryResult = null;
    this.errorMessage = '';
  }

  getSelectedDocument(): Document | undefined {
    return this.availableDocuments.find(doc => doc.id === this.selectedDocumentId);
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'Success';
      case 'queued':
        return 'Queued';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      default:
        return 'Failed';
    }
  }

  formatLLMResponse(data: any): string {
    if (!data) return 'No response data available.';

    // Handle different response formats
    if (typeof data === 'string') {
      return data;
    }

    if (typeof data === 'object') {
      // Check for common LLM response patterns
      if (data.answer) {
        return data.answer;
      }
      
      if (data.response) {
        return data.response;
      }
      
      if (data.content) {
        return data.content;
      }
      
      if (data.text) {
        return data.text;
      }
      
      if (data.message) {
        return data.message;
      }
      
      if (data.result) {
        return data.result;
      }

      // If it's an array, try to extract text from first item
      if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];
        if (typeof firstItem === 'string') {
          return firstItem;
        }
        if (typeof firstItem === 'object') {
          return this.formatLLMResponse(firstItem);
        }
      }

      // If none of the above, return formatted JSON
      return JSON.stringify(data, null, 2);
    }

    return String(data);
  }

  getFormattedResponse(): string {
    if (!this.queryResult || !this.queryResult.data) {
      return '';
    }
    return this.formatLLMResponse(this.queryResult.data);
  }

  isResponseFormatted(): boolean {
    if (!this.queryResult || !this.queryResult.data) {
      return false;
    }
    
    const formatted = this.formatLLMResponse(this.queryResult.data);
    return typeof this.queryResult.data === 'string' || 
           this.queryResult.data.answer || 
           this.queryResult.data.response || 
           this.queryResult.data.content ||
           this.queryResult.data.text ||
           this.queryResult.data.message ||
           this.queryResult.data.result;
  }
}
