import styled, { useTheme } from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';
import wordmark from '@/asset/sprout-wordmark.svg';

function SproutLogo({ size = 'md' }) {
  const theme = useTheme();
  return (
    <Wrapper $size={size}>
      <LeafIcon color={theme.colors.primary} size={sizes[size].icon} />
      <Wordmark src={wordmark} alt="SPROUT" $size={size} />
    </Wrapper>
  );
}

const sizes = {
  sm: { icon: 28, wordmark: 16, gap: 2 },
  md: { icon: 40, wordmark: 22, gap: 2 },
  lg: { icon: 59, wordmark: 33, gap: 8 },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme, $size }) => theme.spacing(sizes[$size].gap)};
`;

const Wordmark = styled.img`
  height: ${({ $size }) => sizes[$size].wordmark}px;
`;

export default SproutLogo;
