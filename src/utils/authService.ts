export interface AdminUser {
  username: string;
  name: string;
  email: string;
}

export class AuthService {
  private static readonly TOKEN_KEY = 'admin_token';
  private static readonly USER_KEY = 'admin_user';
  private static readonly REMEMBER_KEY = 'remember_admin';

  // Get stored token
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get stored user data
  static getUser(): AdminUser | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  // Check if token is expired
  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  // Logout user
  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.REMEMBER_KEY);
  }

  // Get authorization headers for API calls
  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }

  // Make authenticated API call
  static async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If unauthorized, logout and redirect
    if (response.status === 401) {
      this.logout();
      window.location.href = '/signin';
    }

    return response;
  }
}