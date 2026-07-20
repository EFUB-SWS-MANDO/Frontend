import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';
import ProfileSetupForm from '@/features/auth/components/ProfileSetupForm';

// 정보설정: 닉네임/프로필 이미지 설정 후 홈으로
function ProfileSetupPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Content>
        <SproutLogo size="md" />
        <ProfileSetupForm onSuccess={() => navigate('/', { replace: true })} />
      </Content>
    </AuthLayout>
  );
}

/* 시안: 콘텐츠 폭 397, 로고와 프로필 이미지 사이 64 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(16)};
  width: 397px;
  max-width: 100%;
`;

export default ProfileSetupPage;
