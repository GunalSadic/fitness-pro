// services/authService.ts
import { API_BASE_URL, AUTH_ENDPOINTS } from '../constants/api';

export interface AuthResponse {
  isSuccess: boolean;
  message: string;
  token?: string;
}

export const authService = {
  async register(fullName: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });
    return response.json();
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
};