import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';
import ProfileSetupForm from '@/features/auth/components/ProfileSetupForm';

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(16)};
  width: 397px;
  max-width: 100%;
`;

export default ProfileSetupPage;
