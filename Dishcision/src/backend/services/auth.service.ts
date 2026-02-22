/**
 * Authentication Service
 * Handles user authentication, session management, and token validation
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  provider?: 'email' | 'google' | 'apple';
}

class AuthService {
  private readonly API_BASE_URL = '/api/auth';
  private currentUser: User | null = null;

  /**
   * Sign in with email
   */
  async signInWithEmail(email: string): Promise<AuthResponse> {
    try {
      // Mock API call - replace with actual backend endpoint
      const response = await this.mockApiCall<AuthResponse>({
        endpoint: `${this.API_BASE_URL}/signin`,
        method: 'POST',
        body: { email, provider: 'email' },
      });

      if (response.success && response.user) {
        this.currentUser = response.user;
        this.storeToken(response.token!);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to sign in. Please try again.',
      };
    }
  }

  /**
   * Sign in with OAuth provider (Google, Apple)
   */
  async signInWithProvider(provider: 'google' | 'apple'): Promise<AuthResponse> {
    try {
      // Mock OAuth flow - replace with actual OAuth implementation
      const response = await this.mockApiCall<AuthResponse>({
        endpoint: `${this.API_BASE_URL}/oauth/${provider}`,
        method: 'POST',
      });

      if (response.success && response.user) {
        this.currentUser = response.user;
        this.storeToken(response.token!);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: `Failed to sign in with ${provider}. Please try again.`,
      };
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      await this.mockApiCall({
        endpoint: `${this.API_BASE_URL}/signout`,
        method: 'POST',
      });
    } finally {
      this.currentUser = null;
      this.clearToken();
    }
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Store authentication token
   */
  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear authentication token
   */
  private clearToken(): void {
    localStorage.removeItem('auth_token');
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Mock API call - replace with actual fetch/axios call
   */
  private async mockApiCall<T>(config: {
    endpoint: string;
    method: string;
    body?: any;
  }): Promise<T> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful response
    return {
      success: true,
      user: {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: config.body?.email || 'user@example.com',
        name: 'Demo User',
        createdAt: new Date(),
        lastLogin: new Date(),
      },
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 16),
    } as T;
  }
}

export const authService = new AuthService();
