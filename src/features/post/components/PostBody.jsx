import styled from 'styled-components';

function PostBody({ content }) {
  return (
    <Wrapper>
      <Content>{content}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 0 ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(6)};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  white-space: pre-wrap;
`;

export default PostBody;