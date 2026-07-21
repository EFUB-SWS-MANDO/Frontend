import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { useAuthStore } from '@/stores/authStore';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

async function exchangeKakaoToken(code) {
  const res = await axios.post(
    KAKAO_TOKEN_URL,
    new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      code,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
  return res.data.access_token;
}

export function useKakaoSignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const startedRef = useRef(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const code = searchParams.get('code');
    if (!code) {
      setError(new Error(searchParams.get('error_description') ?? '인가 코드가 없습니다.'));
      return;
    }

    (async () => {
      try {
        const kakaoAccessToken = await exchangeKakaoToken(code);

        const data = await api.post(ENDPOINTS.auth.signIn, {
          provider: 'KAKAO',
          oauthAccessToken: kakaoAccessToken,
        });

        setAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: { id: data.memberId, nickname: null, profileImage: null },
        });

        if (data.isNewUser) {
          navigate('/signup/terms', { replace: true });
          return;
        }

        const profile = await api
          .get(ENDPOINTS.profile.detail(data.memberId))
          .catch(() => null);
        if (profile) {
          setAuth({
            user: {
              id: data.memberId,
              nickname: profile.nickname,
              profileImage: profile.profileImage ?? null,
            },
          });
        }
        navigate('/', { replace: true });
      } catch (e) {
        setError(e);
      }
    })();
  }, [searchParams, navigate, setAuth]);

  return { error };
}
