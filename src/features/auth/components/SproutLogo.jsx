import styled, { useTheme } from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';

// 스플래시/로그인/정보설정 공통 로고 (잎 아이콘 + 워드마크)
function SproutLogo({ size = 'md' }) {
  const theme = useTheme();
  return (
    <Wrapper>
      <LeafIcon color={theme.colors.primary} size={sizes[size].icon} />
      <Wordmark $size={size}>SPROUT</Wordmark>
    </Wrapper>
  );
}

const sizes = {
  sm: { icon: 28, font: 'md' },
  md: { icon: 40, font: 'lg' },
  lg: { icon: 56, font: 'xl' },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Wordmark = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme, $size }) => theme.fontSize[sizes[$size].font]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.2em;
`;

export default SproutLogo;
