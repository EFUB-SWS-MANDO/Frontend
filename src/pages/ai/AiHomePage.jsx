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
        <LeafIcon size={59} color={theme.colors.primary} />
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
  max-width: 756px;
  margin: 0 auto;
  /* 시안: 헤더 아래 140px */
  padding-top: ${({ theme }) => theme.spacing(35)};
`;

const GreetingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(10)};
  /* 시안: 인사 영역과 카드 사이 80px */
  margin-bottom: ${({ theme }) => theme.spacing(20)};
`;

const Greeting = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* 시안: 카드끼리 24px, 카드-저장 목록 15px */
  column-gap: ${({ theme }) => theme.spacing(6)};
  row-gap: 15px;
`;

const MenuCard = styled.button`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 180px;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const WideCard = styled(MenuCard)`
  grid-column: 1 / -1;
  height: 52px;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.full};
`;

const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default AiHomePage;
