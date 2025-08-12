export interface Document {
  id: string;
  name: string;
  ingestionPercent: number;
  ingestionStatus: string;
  detail: string;
  createdAt: Date;
}

export interface DocumentUploadRequest {
  detail: string;
  file: File;
}

export interface DocumentQueryRequest {
  documentId: string;
  query: string;
}

export interface DocumentQueryResponse {
  status: string;
  data: any;
}

export interface DocumentListResponse {
  total: number;
  success: {
    count: number;
    documents: Document[];
  };
  pending: {
    count: number;
    documents: Document[];
  };
  failed: {
    count: number;
    documents: Document[];
  };
}

export interface WebhookCallback {
  documentId: string;
  percent: number;
  statusMessage: string;
}
