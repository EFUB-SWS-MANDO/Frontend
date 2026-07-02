import styled from 'styled-components';

function EmptyState({ message = '아직 기록이 없어요 🌱' }) {
  return <Wrapper>{message}</Wrapper>;
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(12)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export default EmptyState;
