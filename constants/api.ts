const getApiBaseUrl = (): string => {
  if (__DEV__) {
    return 'https://fungicidal-effetely-myra.ngrok-free.dev'; 
  }
  return 'https://your-production-api.com';
};

export const API_BASE_URL = getApiBaseUrl();

export const AUTH_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
};