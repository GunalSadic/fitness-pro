import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, AuthResponse, SubscriptionDto } from '../services/AuthService';
import { jwtDecode } from 'jwt-decode';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  subscription: SubscriptionDto | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (fullName: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuthSuccess = async (newToken: string) => {
    await AsyncStorage.setItem('authToken', newToken);
    setToken(newToken);
    try {
      const decoded: any = jwtDecode(newToken);
      setUser({
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        fullName: decoded.fullName || 'User',
      });
      setIsAuthenticated(true);

      const sub = await authService.getSubscription(newToken);
      setSubscription(sub);
    } catch (e) {
      console.error("Auth success handling failed", e);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        await handleAuthSuccess(storedToken);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setError(null);
    const result = await authService.login(email, password);
    if (result.isSuccess && result.token) {
      await handleAuthSuccess(result.token);
    } else {
      setError(result.message);
    }
    return result;
  };

  const register = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    setError(null);
    const result = await authService.register(fullName, email, password);
    if (result.isSuccess && result.token) {
      await handleAuthSuccess(result.token);
    } else {
      setError(result.message);
    }
    return result;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setSubscription(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, subscription, isLoading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
