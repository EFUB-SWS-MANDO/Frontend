import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';

// AI 홈: 자소서/모의 면접/저장 목록 진입 화면
function AiHomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <GreetingArea>
        <LeafIcon size={56} color={theme.colors.primary} />
        <Greeting>오늘은 어떤 걸 해볼까?</Greeting>
      </GreetingArea>

      <CardGrid>
        <MenuCard type="button" onClick={() => navigate('/ai/cover-letter')}>
          <CardLabel>자소서</CardLabel>
        </MenuCard>
        <MenuCard type="button" onClick={() => navigate('/ai/interview')}>
          <CardLabel>모의 면접</CardLabel>
        </MenuCard>
        <WideCard type="button" onClick={() => navigate('/ai/saved')}>
          <CardLabel>저장 목록</CardLabel>
        </WideCard>
      </CardGrid>
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const MenuCard = styled.button`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 168px;
  padding: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bg};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const WideCard = styled(MenuCard)`
  grid-column: 1 / -1;
  min-height: 0;
  align-items: center;
`;

const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default AiHomePage;
