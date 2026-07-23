import styled from 'styled-components';

function EditIntroButton({ onClick }) {
  return <Button onClick={onClick}>수정</Button>;
}

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

export default EditIntroButton;