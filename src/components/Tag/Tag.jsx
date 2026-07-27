import styled from 'styled-components';

const TAG_COLORS = [
  { bg: '#ECFCEF', text: '#008947' },
  { bg: '#EAF3FF', text: '#2E6FD8' },
  { bg: '#F3EEFF', text: '#7C5CD9' },
  { bg: '#FFF4E5', text: '#C77414' },
  { bg: '#FFEEF3', text: '#D9527C' },
  { bg: '#FFF9DB', text: '#A8850E' },
];

const pickColor = (label) => {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) % TAG_COLORS.length;
  }
  return TAG_COLORS[hash];
};

function Tag({ label }) {
  const { bg, text } = pickColor(label);
  return (
    <Chip $bg={bg} $text={text}>
      {label}
    </Chip>
  );
}

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $bg }) => $bg};
  color: ${({ $text }) => $text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
`;

export default Tag;
