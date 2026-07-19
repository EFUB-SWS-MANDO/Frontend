import styled, { useTheme } from 'styled-components';
import GalleryIcon from '@/asset/icons/GalleryIcon';
import LeafIcon from '@/asset/icons/LeafIcon';
import MedalStarIcon from '@/asset/icons/MedalStarIcon';
import MagicpenIcon from '@/asset/icons/MagicpenIcon';
import FolderAddIcon from '@/asset/icons/FolderAddIcon';

function StatsSummary({ stats }) {
  const theme = useTheme();

  const items = [
    { key: 'postCount', label: '게시글', value: stats.postCount, Icon: GalleryIcon },
    { key: 'likeCount', label: '좋아요', value: stats.likeCount, Icon: LeafIcon },
    { key: 'streakDays', label: '연속 접속', value: `${stats.streakDays}일`, Icon: MedalStarIcon },
    { key: 'interviewCount', label: 'AI 면접 연습', value: stats.interviewCount, Icon: MagicpenIcon },
    { key: 'coverLetterCount', label: '작성한 자소서', value: stats.coverLetterCount, Icon: FolderAddIcon },
  ];

  return (
    <Grid>
      {items.map(({ key, label, value, Icon }) => (
        <StatItem key={key}>
          <IconWrap>
            <Icon size={20} color={theme.colors.primary} />
          </IconWrap>
          <Value>{value}</Value>
          <Label>{label}</Label>
        </StatItem>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const IconWrap = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.white};
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

export default StatsSummary;
