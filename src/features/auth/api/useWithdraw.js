import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { useAuthStore } from '@/stores/authStore';

export function useWithdraw() {
  const navigate = useNavigate();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [error, setError] = useState(null);
  const clearAuth = useAuthStore((s) => s.logout);

  const withdraw = async () => {
    setIsWithdrawing(true);
    setError(null);
    try {
      if (import.meta.env.VITE_MOCK_AUTH !== 'true') {
        await api.delete(ENDPOINTS.member.withdraw);
      }
      clearAuth();
      navigate('/login', { replace: true });
      return true;
    } catch (e) {
      setError(e);
      return false;
    } finally {
      setIsWithdrawing(false);
    }
  };

  return { withdraw, isWithdrawing, error };
}
