import styled from 'styled-components';

const TAG_COLORS = [
  { bg: 'green50', text: 'green500' },
  { bg: 'blue50', text: 'blue100' },
  { bg: 'yellow50', text: 'yellow100' },
  { bg: 'pink50', text: 'pink100' },
  { bg: 'red50', text: 'red100' },
  { bg: 'bgSub', text: 'textSub' },
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
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.radius.xs};
  background: ${({ theme, $bg }) => theme.colors[$bg]};
  color: ${({ theme, $text }) => theme.colors[$text]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.xxs};
  white-space: nowrap;
`;

export default Tag;
