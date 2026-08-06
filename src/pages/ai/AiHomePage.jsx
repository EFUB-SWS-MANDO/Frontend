import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';
import coverLetterImage from '@/asset/images/ai-cover-letter.webp';
import interviewImage from '@/asset/images/ai-interview.webp';

function AiHomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Container>
        <GreetingArea>
          <LeafIcon size={59} color={theme.colors.primary} />
          <Greeting>오늘은 어떤 걸 해볼까?</Greeting>
        </GreetingArea>

        <CardGrid>
          <MenuCard type="button" onClick={() => navigate('/ai/cover-letter')}>
            <CardContent>
              <CardImage src={coverLetterImage} alt="" />
              <CardLabel>자소서</CardLabel>
            </CardContent>
          </MenuCard>
          <MenuCard type="button" onClick={() => navigate('/ai/interview')}>
            <CardContent>
              <CardImage src={interviewImage} alt="" />
              <CardLabel>모의 면접</CardLabel>
            </CardContent>
          </MenuCard>
          <WideCard type="button" onClick={() => navigate('/ai/saved')}>
            <CardLabel>저장 목록</CardLabel>
          </WideCard>
        </CardGrid>
      </Container>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  min-height: 100vh;
  background: radial-gradient(
    ellipse 30.3% 75.3% at 51.7% 88.3%,
    ${({ theme }) => theme.colors.green500} 0%,
    ${({ theme }) => theme.colors.pageBg} 100%
  );
`;

const Container = styled.section`
  max-width: 756px;
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing(35)};
  padding-bottom: ${({ theme }) => theme.spacing(35)};
`;

const GreetingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(10)};
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

const CardContent = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const CardImage = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
`;

const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default AiHomePage;
