import { API_BASE_URL, AUTH_ENDPOINTS, SUBSCRIPTION_ENDPOINTS, STATS_ENDPOINTS, GOALS_ENDPOINTS } from '../constants/api';

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

export interface GoalDto {
  weeklyGoal: number;
}

export interface AchievementDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
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
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async getSubscription(token: string): Promise<SubscriptionDto> {
    const response = await fetch(`${API_BASE_URL}${SUBSCRIPTION_ENDPOINTS.SUBSCRIPTION}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async getGoal(token: string): Promise<GoalDto> {
    const response = await fetch(`${API_BASE_URL}${GOALS_ENDPOINTS.GOAL}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async setGoal(token: string, weeklyGoal: number): Promise<void> {
    await fetch(`${API_BASE_URL}${GOALS_ENDPOINTS.GOAL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ weeklyGoal }),
    });
  },

  async getAchievements(token: string): Promise<AchievementDto[]> {
    const response = await fetch(`${API_BASE_URL}${GOALS_ENDPOINTS.ACHIEVEMENTS}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};
