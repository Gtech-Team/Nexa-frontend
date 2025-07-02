/**
 * API Client for Nexa Frontend
 * Handles all HTTP requests to the backend with proper authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6002/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?: 'user' | 'business';
  city?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'user' | 'business' | 'admin' | 'superadmin';
  city?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  city?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Get access token from localStorage
    const accessToken = localStorage.getItem('nexa_access_token');
    if (accessToken) {
      defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include cookies for refresh token
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401 && accessToken) {
          // Try to refresh token
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the original request with new token
            const newAccessToken = localStorage.getItem('nexa_access_token');
            if (newAccessToken) {
              config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${newAccessToken}`,
              };
              const retryResponse = await fetch(url, config);
              return await retryResponse.json();
            }
          }
          // If refresh failed, redirect to login
          this.clearAuthData();
          window.location.href = '/';
        }

        return {
          success: false,
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }

  // Authentication endpoints
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.request<void>('/auth/logout', {
      method: 'POST',
    });
    this.clearAuthData();
    return result;
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('nexa_refresh_token');
      if (!refreshToken) {
        return false;
      }

      const response = await this.request<AuthResponse>('/auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });

      if (response.success && response.data) {
        this.setAuthData(response.data);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/profile');
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async updatePassword(passwords: UpdatePasswordRequest): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    });
  }

  async deleteAccount(): Promise<ApiResponse<void>> {
    const result = await this.request<void>('/auth/account', {
      method: 'DELETE',
    });
    this.clearAuthData();
    return result;
  }

  async checkEmail(email: string): Promise<ApiResponse<{ exists: boolean }>> {
    return this.request<{ exists: boolean }>('/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async checkPhone(phone: string): Promise<ApiResponse<{ exists: boolean }>> {
    return this.request<{ exists: boolean }>('/auth/check-phone', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }

  async getAuthStatus(): Promise<ApiResponse<{ isAuthenticated: boolean; user?: User }>> {
    return this.request<{ isAuthenticated: boolean; user?: User }>('/auth/status');
  }

  // Helper methods for managing auth data
  setAuthData(authData: AuthResponse): void {
    // Handle both flat structure and nested tokens structure
    const accessToken = authData.accessToken || authData.tokens?.accessToken;
    const refreshToken = authData.refreshToken || authData.tokens?.refreshToken;
    
    if (accessToken && refreshToken) {
      localStorage.setItem('nexa_access_token', accessToken);
      localStorage.setItem('nexa_refresh_token', refreshToken);
      localStorage.setItem('nexa_user', JSON.stringify(authData.user));
    } else {
      console.error('Invalid auth data structure:', authData);
    }
  }

  clearAuthData(): void {
    localStorage.removeItem('nexa_access_token');
    localStorage.removeItem('nexa_refresh_token');
    localStorage.removeItem('nexa_user');
  }

  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('nexa_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('nexa_access_token');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
