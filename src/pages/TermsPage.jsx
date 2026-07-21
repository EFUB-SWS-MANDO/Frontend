import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import { TERMS } from '@/constants/terms';

function TermsPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Content>
        <TermsBox>
          {TERMS.map((term) => (
            <TermSection key={term.id}>
              <TermTitle>
                {term.label} {term.required ? '(필수)' : '(선택)'}
              </TermTitle>
              <TermBody>{term.content}</TermBody>
            </TermSection>
          ))}
        </TermsBox>
        <NextButton
          type="button"
          onClick={() => navigate('/signup/profile')}
        >
          동의하고 계속하기
        </NextButton>
      </Content>
    </AuthLayout>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;
`;

const TermsBox = styled.div`
  width: 275px;
  height: 355px;
  padding: ${({ theme }) => theme.spacing(5)};
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.gray100};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const TermSection = styled.section``;

const TermTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TermBody = styled.pre`
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
  white-space: pre-wrap;
`;

const NextButton = styled.button`
  width: 350px;
  max-width: 100%;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

export default TermsPage;
