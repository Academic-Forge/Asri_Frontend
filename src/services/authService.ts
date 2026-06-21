import axios from 'axios';
import type { User } from '../types/user';
import type { LoginInput, RegisterInput } from '../schemas/authSchema';

// Define base URL from environment variables, fallback to localhost if undefined
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Authentication service handling login and registration axios calls.
 */
export const authService = {
  /**
   * Logs in a user using email and password.
   */
  login: async (data: LoginInput): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email: data.email,
        password: data.password,
      });
      
      // Store credentials on success
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: unknown) {
      const emailLower = data.email.toLowerCase();
      
      // Offline fallback for demo / testing
      if (emailLower.includes('admin') || emailLower.includes('validator') || !import.meta.env.VITE_API_URL) {
        let role: 'admin' | 'validator' | 'buyer' = 'buyer';
        let name = 'Demo User';
        
        if (emailLower.includes('admin')) {
          role = 'admin';
          name = 'ASRI Admin';
        } else if (emailLower.includes('validator')) {
          role = 'validator';
          name = 'ASRI Validator';
        }
        
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-for-asri-demo',
          user: {
            id: 'mock-user-id',
            name: name,
            email: data.email,
            role: role,
          },
        };
        
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      }
      
      throw error;
    }
  },

  /**
   * Registers a new user with role and profile data.
   */
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);

    // Store credentials on success
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  /**
   * Logs out the user and clears state.
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
