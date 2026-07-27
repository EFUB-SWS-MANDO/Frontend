import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import CommentIcon from '@/asset/icons/CommentIcon';
import LeafIcon from '@/asset/icons/LeafIcon';
import LockIcon from '@/asset/icons/LockIcon';
import Tag from '@/features/post/components/Tag';

function PostCard({ post }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <TitleRow>
        <Title>{post.title}</Title>
        {post.onlyMe && <LockIcon size={18} label="비공개 게시물" />}
        {post.tags?.length > 0 && (
          <TagArea>
            {post.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </TagArea>
        )}
      </TitleRow>
      <Content>{post.content}</Content>
      <Footer>
        <AuthorInfo>
          {post.author.profileImage ? (
            <AuthorImage src={post.author.profileImage} alt={`${post.author.name} 프로필`} />
          ) : (
            <AuthorImagePlaceholder />
          )}
          <AuthorName>{post.author.name}</AuthorName>
          <CreatedAt>{post.createdAt}</CreatedAt>
        </AuthorInfo>
        <Stats>
          <span>
            <CommentIcon color={theme.colors.textSub} size={16} /> {post.commentCount}
          </span>
          <span>
            <LeafIcon color={post.isLiked ? '#4CAF50' : theme.colors.textSub} size={16} /> {post.likeCount}
          </span>
        </Stats>
      </Footer>
    </Card>
  );
}

const Card = styled.article`
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  svg {
    flex-shrink: 0;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  line-height: ${20 / 14};
`;

const TagArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-left: ${({ theme }) => theme.spacing(3)};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const AuthorImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const AuthorImagePlaceholder = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const Stats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};

  span {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`;

export default PostCard;