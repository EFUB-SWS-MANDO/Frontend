import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommentIcon from '@/asset/icons/CommentIcon';
import LeafIcon from '@/asset/icons/LeafIcon';

function PostCard({ post }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <Title>{post.title}</Title>
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
          <span><CommentIcon color="#6B7280" size={16} /> {post.commentCount}</span>
          <span><LeafIcon color="#6B7280" size={16} /> {post.likeCount}</span>
        </Stats>
      </Footer>
    </Card>
  );
}

const Card = styled.article`
  padding: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  line-height: 1.5;
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