import styled from 'styled-components';
import LockIcon from '@/asset/icons/LockIcon';
import Tag from '@/features/post/components/Tag';

const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif)(\?|$)/i;

const getFileName = (url) => {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop());
  } catch {
    return url;
  }
};

function PostBody({ content, isPrivate = false, tags = [], fileUrls = [] }) {
  const imageUrls = fileUrls.filter((url) => IMAGE_EXTENSIONS.test(url));
  const attachmentUrls = fileUrls.filter((url) => !IMAGE_EXTENSIONS.test(url));

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
      {imageUrls.length > 0 && (
        <ImageList>
          {imageUrls.map((url) => (
            <AttachedImage key={url} src={url} alt="첨부 이미지" loading="lazy" />
          ))}
        </ImageList>
      )}
      {attachmentUrls.length > 0 && (
        <FileList>
          {attachmentUrls.map((url) => (
            <FileLink key={url} href={url} target="_blank" rel="noopener noreferrer">
              {getFileName(url)}
            </FileLink>
          ))}
        </FileList>
      )}
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

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const AttachedImage = styled.img`
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const FileLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.primaryDark};
  text-decoration: underline;
  word-break: break-all;
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