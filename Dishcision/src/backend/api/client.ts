/**
 * API Client
 * Centralized HTTP client for making API requests
 */

interface RequestConfig {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  /**
   * Make HTTP request
   */
  async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const { endpoint, method = 'GET', body, headers = {}, requiresAuth = true } = config;

    try {
      // Add authentication token if required
      if (requiresAuth) {
        const token = localStorage.getItem('auth_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      // Add content type for JSON
      if (body) {
        headers['Content-Type'] = 'application/json';
      }

      const url = `${this.baseURL}${endpoint}`;

      // Mock response for demo purposes
      // Replace with actual fetch call:
      // const response = await fetch(url, {
      //   method,
      //   headers,
      //   body: body ? JSON.stringify(body) : undefined,
      // });

      await this.delay(500);

      return {
        data: body as T,
        status: 200,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An error occurred',
        status: 500,
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, requiresAuth = true): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'GET', requiresAuth });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body: any, requiresAuth = true): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'POST', body, requiresAuth });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body: any, requiresAuth = true): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'PUT', body, requiresAuth });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, requiresAuth = true): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'DELETE', requiresAuth });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const apiClient = new ApiClient();
