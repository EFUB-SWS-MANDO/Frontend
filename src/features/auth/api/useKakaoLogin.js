import { useNavigate } from 'react-router-dom';

// 카카오 OAuth 시작. 백엔드가 인가 코드를 받아 토큰을 발급하는 구조 기준.
// VITE_KAKAO_CLIENT_ID가 없으면(백엔드/카카오 연결 전) 약관 동의 화면으로 바로 이동해
// 온보딩 플로우를 로컬에서 테스트할 수 있게 한다. (시안의 Development 노트 대응)
export function useKakaoLogin() {
  const navigate = useNavigate();

  const loginWithKakao = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      navigate('/signup/terms');
      return;
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
    });
    window.location.href = `https://kauth.kakao.com/oauth/authorize?${params}`;
  };

  return { loginWithKakao };
}
