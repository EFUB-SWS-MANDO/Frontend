import styled from 'styled-components';
import LockIcon from '@/asset/icons/LockIcon';
import Tag from '@/features/post/components/Tag';

function PostBody({ content, isPrivate = false, tags = [] }) {
  return (
    <Wrapper>
      {(isPrivate || tags.length > 0) && (
        <MetaRow>
          {isPrivate && <LockIcon size={18} label="비공개 게시물" />}
          {tags.length > 0 && (
            <TagArea>
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </TagArea>
          )}
        </MetaRow>
      )}
      <Content>{content}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 0 ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(6)};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  svg {
    flex-shrink: 0;
  }
`;

const TagArea = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  white-space: pre-wrap;
`;

export default PostBody;