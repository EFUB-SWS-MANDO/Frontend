import styled from 'styled-components';

// Figma 태그 색상 팔레트 (6종)
export const TAG_COLOR_VARIANTS = [
  { bg: '#ECFCEF', text: '#008947' },
  { bg: '#E7F0FF', text: '#2E6FF2' },
  { bg: '#FDEAF3', text: '#D6409F' },
  { bg: '#FFE9E9', text: '#E4483C' },
  { bg: '#FFF3E0', text: '#C9760C' },
  { bg: '#F2F3F5', text: '#494D5A' },
];

export function randomTagColor() {
  return TAG_COLOR_VARIANTS[Math.floor(Math.random() * TAG_COLOR_VARIANTS.length)];
}

function Tag({ label, color = TAG_COLOR_VARIANTS[0] }) {
  return (
    <Chip $bg={color.bg} $text={color.text}>
      {label}
    </Chip>
  );
}

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $bg }) => $bg};
  color: ${({ $text }) => $text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
`;

export default Tag;
