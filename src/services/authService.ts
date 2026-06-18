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
  },

  /**
   * Registers a new user.
   */
  register: async (data: Omit<RegisterInput, 'confirmPassword'>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

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
