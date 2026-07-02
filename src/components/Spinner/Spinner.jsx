import styled, { keyframes } from 'styled-components';

function Spinner() {
  return (
    <Center>
      <Circle />
    </Center>
  );
}

const spin = keyframes`to { transform: rotate(360deg); }`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
`;
const Circle = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default Spinner;
