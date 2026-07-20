import styled, { useTheme } from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';

// 스플래시/로그인/정보설정 공통 로고 (잎 아이콘 + 워드마크)
function SproutLogo({ size = 'md' }) {
  const theme = useTheme();
  return (
    <Wrapper $size={size}>
      <LeafIcon color={theme.colors.primary} size={sizes[size].icon} />
      <Wordmark $size={size}>SPROUT</Wordmark>
    </Wrapper>
  );
}

// lg는 시안 수치(리프 59, 워드마크 높이 33, 간격 32) 기준
const sizes = {
  sm: { icon: 28, font: 'md', gap: 2 },
  md: { icon: 40, font: 'lg', gap: 2 },
  lg: { icon: 59, font: 'xl', gap: 8 },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme, $size }) => theme.spacing(sizes[$size].gap)};
`;

const Wordmark = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme, $size }) => theme.fontSize[sizes[$size].font]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.2em;
`;

export default SproutLogo;
