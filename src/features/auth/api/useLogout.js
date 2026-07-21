import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { useAuthStore } from '@/stores/authStore';

export function useLogout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const clearAuth = useAuthStore((s) => s.logout);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      if (import.meta.env.VITE_MOCK_AUTH !== 'true') {
        await api.post(ENDPOINTS.auth.signOut).catch(() => null);
      }
    } finally {
      clearAuth();
      setIsLoggingOut(false);
      navigate('/login', { replace: true });
    }
  };

  return { logout, isLoggingOut };
}
