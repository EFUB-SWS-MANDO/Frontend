import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';

const SELECT_MODES = [
  {
    mode: 'activity',
    label: '활동으로 선택하기',
    description: '기록해 둔 활동을 골라 면접에 활용해요',
  },
  {
    mode: 'category',
    label: '카테고리로 선택하기',
    description: '태그를 골라 관련 활동을 한번에 불러와요',
  },
  {
    mode: 'cover-letter',
    label: '자소서 기반으로 선택하기',
    description: '작성한 자기소개서를 바탕으로 면접을 진행해요',
  },
];

function InterviewPage() {
  const navigate = useNavigate();

  return (
    <section>
      <PageHeader title="모의면접" onBack={() => navigate('/ai')} />
      <Heading>
        모의면접에 활용할
        <br />
        활동을 불러와주세요
      </Heading>
      <CardList>
        {SELECT_MODES.map(({ mode, label, description }) => (
          <ModeCard
            key={mode}
            type="button"
            onClick={() => navigate(`/ai/interview/select/${mode}`)}
          >
            <ModeLabel>{label}</ModeLabel>
            <ModeDescription>{description}</ModeDescription>
          </ModeCard>
        ))}
      </CardList>
    </section>
  );
}

const Heading = styled.h2`
  margin: ${({ theme }) => `${theme.spacing(10)} 0`};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
  line-height: ${29 / 24};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  max-width: 838px;
  margin: 0 auto;
`;

const ModeCard = styled.button`
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(16)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const ModeLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const ModeDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

export default InterviewPage;
