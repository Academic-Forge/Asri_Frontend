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

const MOCK_USERS: Record<string, { user: User; token: string }> = {
  'admin@asri.com': {
    user: { id: 'USR-ADMIN', name: 'Admin Asri', email: 'admin@asri.com', role: 'admin' },
    token: 'mock-token-admin',
  },
  'seller@asri.com': {
    user: { id: 'USR-SELLER', name: 'Seller Asri', email: 'seller@asri.com', role: 'seller' },
    token: 'mock-token-seller',
  },
  'buyer@asri.com': {
    user: { id: 'USR-BUYER', name: 'Buyer Asri', email: 'buyer@asri.com', role: 'buyer' },
    token: 'mock-token-buyer',
  },
  'driver@asri.com': {
    user: { id: 'USR-DRIVER', name: 'Driver Asri', email: 'driver@asri.com', role: 'driver' },
    token: 'mock-token-driver',
  },
  'validator@asri.com': {
    user: { id: 'USR-VALIDATOR', name: 'Validator Asri', email: 'validator@asri.com', role: 'validator' },
    token: 'mock-token-validator',
  },
};

/**
 * Authentication service handling login and registration axios calls.
 */
export const authService = {
  /**
   * Logs in a user using email and password.
   */
  login: async (data: LoginInput): Promise<AuthResponse> => {
    // Check for mock login first to ease testing of roles without running api
    const emailLower = data.email.toLowerCase();
    const mockMatch = MOCK_USERS[emailLower];
    if (mockMatch) {
      if (data.password === 'password123') {
        localStorage.setItem('token', mockMatch.token);
        localStorage.setItem('user', JSON.stringify(mockMatch.user));
        return mockMatch;
      } else {
        throw new Error('Kata sandi salah untuk akun simulasi.');
      }
    }

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
