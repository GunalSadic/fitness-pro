import { API_BASE_URL, AUTH_ENDPOINTS, SUBSCRIPTION_ENDPOINTS, STATS_ENDPOINTS } from '../constants/api';

export interface AuthResponse {
  isSuccess: boolean;
  message: string;
  token?: string;
}

export interface StatsDto {
  currentStreak: number;
  bestStreak: number;
  visitsThisMonth: number;
}

export interface SubscriptionDto {
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  daysRemaining: number | null;
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

  async getStats(token: string): Promise<StatsDto> {
    const response = await fetch(`${API_BASE_URL}${STATS_ENDPOINTS.STATS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async getSubscription(token: string): Promise<SubscriptionDto> {
    const response = await fetch(`${API_BASE_URL}${SUBSCRIPTION_ENDPOINTS.SUBSCRIPTION}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
