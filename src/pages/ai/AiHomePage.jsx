import styled, { useTheme } from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';

// AI 홈: 자소서/모의 면접/저장 목록 진입 화면
function AiHomePage() {
  const theme = useTheme();

  return (
    <Container>
      <GreetingArea>
        <LeafIcon size={56} color={theme.colors.primary} />
        <Greeting>오늘은 어떤 걸 해볼까?</Greeting>
      </GreetingArea>
    </Container>
  );
}

const Container = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing(20)};
`;

const GreetingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(20)};
`;

const Greeting = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default AiHomePage;
