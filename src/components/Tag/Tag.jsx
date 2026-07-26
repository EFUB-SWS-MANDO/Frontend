import styled, { useTheme } from 'styled-components';

export const TAG_COLOR_VARIANTS = ['green', 'blue', 'pink', 'red', 'orange', 'gray'];

export function randomTagColor() {
  return TAG_COLOR_VARIANTS[Math.floor(Math.random() * TAG_COLOR_VARIANTS.length)];
}

function Tag({ label, color = TAG_COLOR_VARIANTS[0] }) {
  const theme = useTheme();
  const variant = theme.colors.tag[color] ?? theme.colors.tag[TAG_COLOR_VARIANTS[0]];

  return (
    <Chip $bg={variant.bg} $text={variant.text}>
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
