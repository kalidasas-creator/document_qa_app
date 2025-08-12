export interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  active: boolean;
  createdAt?: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface UpdateUserRoleRequest {
  role?: 'admin' | 'editor' | 'viewer';
  active?: boolean;
}

export interface UserListResponse {
  status: string;
  data: User[];
}

export interface UpdateUserResponse {
  status: string;
  data: User;
}
