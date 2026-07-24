import { useState } from 'react';
import axios from 'axios';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { useAuthStore } from '@/stores/authStore';

async function uploadProfileImage(file) {
  const { presignedUrl, fileUrl } = await api.post(ENDPOINTS.files.presignedUrl, {
    fileName: file.name,
    contentType: file.type,
  });
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
  });
  return fileUrl;
}

// 정보설정(닉네임/프로필 이미지) 제출. 성공 시 로그인 상태로 전환.
export function useSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const setAuth = useAuthStore((s) => s.setAuth);

  const signup = async ({ nickname, profileImageFile }) => {
    setIsSubmitting(true);
    setError(null);

    // VITE_MOCK_AUTH=true면 API 호출 없이 가입 성공 처리 (시연/개발용)
    if (import.meta.env.VITE_MOCK_AUTH === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAuth({
        accessToken: 'mock-token',
        user: { id: 0, nickname, profileImage: null },
      });
      setIsSubmitting(false);
      return true;
    }

    try {
      const profileImage = profileImageFile
        ? await uploadProfileImage(profileImageFile)
        : null;

      const data = await api.post(ENDPOINTS.profile.create, {
        nickname,
        profileImage,
      });
      setAuth({
        accessToken: useAuthStore.getState().accessToken,
        user: {
          id: data.memberId,
          nickname: data.nickname,
          profileImage: data.profileImage ?? null,
        },
      });
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
