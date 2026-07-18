import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';
import ProfileSetupForm from '@/features/auth/components/ProfileSetupForm';

// 정보설정: 닉네임/프로필 이미지 설정 후 홈으로
function ProfileSetupPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <SproutLogo size="md" />
      <ProfileSetupForm onSuccess={() => navigate('/', { replace: true })} />
    </AuthLayout>
  );
}

export default ProfileSetupPage;
