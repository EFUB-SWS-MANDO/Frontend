import styled, { css } from 'styled-components';

function Button({ variant = 'primary', children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  `,
  outline: css`
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  `,
};

const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  ${({ $variant }) => variants[$variant]}
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export default Button;
