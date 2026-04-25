// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, AuthResponse } from '../services/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load token on app start
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setError(null);
    const result = await authService.login(email, password);
    if (result.isSuccess && result.token) {
      await AsyncStorage.setItem('authToken', result.token);
      setToken(result.token);
      setIsAuthenticated(true);
    } else {
      setError(result.message);
    }
    return result;
  };

  const register = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    setError(null);
    const result = await authService.register(fullName, email, password);
    if (result.isSuccess && result.token) {
      await AsyncStorage.setItem('authToken', result.token);
      setToken(result.token);
      setIsAuthenticated(true);
    } else {
      setError(result.message);
    }
    return result;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        token, 
        isLoading, 
        error, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 * (This is what your LoginScreen and RegisterScreen were importing)
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};