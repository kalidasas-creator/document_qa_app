import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { Document, DocumentUploadRequest, DocumentQueryRequest, DocumentQueryResponse, DocumentListResponse } from '../dtos/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor() { }

  uploadDocument(file: File, detail: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('detail', detail);

    return from(axios.post(`${this.apiUrl}/upload`, formData))
      .pipe(
        map((response: AxiosResponse) => response.data)
      );
  }

  queryDocument(documentId: string, query: string): Observable<DocumentQueryResponse> {
    return from(axios.get<DocumentQueryResponse>(`${this.apiUrl}/query`, {
      params: { documentId, query }
    })).pipe(
      map((response: AxiosResponse<DocumentQueryResponse>) => response.data)
    );
  }

  listDocuments(): Observable<DocumentListResponse> {
    return from(axios.get<DocumentListResponse>(`${this.apiUrl}/list`))
      .pipe(
        map((response: AxiosResponse<DocumentListResponse>) => response.data)
      );
  }

  getDocumentById(id: string): Observable<Document> {
    return from(axios.get<Document>(`${this.apiUrl}/${id}`))
      .pipe(
        map((response: AxiosResponse<Document>) => response.data)
      );
  }
}
