import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { useAuthStore } from '@/stores/authStore';

// 정보설정(닉네임/프로필 이미지) 제출. 성공 시 로그인 상태로 전환.
export function useSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const setAuth = useAuthStore((s) => s.setAuth);

  const signup = async ({ nickname, profileImageFile }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('nickname', nickname);
      if (profileImageFile) formData.append('profileImage', profileImageFile);

      const { data } = await api.post(ENDPOINTS.auth.signup, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAuth({ accessToken: data.accessToken, user: data.user });
      return true;
    } catch (e) {
      setError(e);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { signup, isSubmitting, error };
}
