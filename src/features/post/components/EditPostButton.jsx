import styled from 'styled-components';

function EditPostButton({ onClick }) {
  return <Button onClick={onClick}>수정하기</Button>;
}

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.bg} !important;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgSub} !important;
  }
`;

export default EditPostButton;