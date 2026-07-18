import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import TermsAgreement from '@/features/auth/components/TermsAgreement';

// 약관동의: 필수 약관 동의 후 정보설정으로 이동
function TermsPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Title>약관 동의</Title>
      <TermsAgreement
        onComplete={({ marketingAgreed }) =>
          navigate('/signup/profile', { state: { marketingAgreed } })
        }
      />
    </AuthLayout>
  );
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default TermsPage;
