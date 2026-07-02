import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PostCard({ post }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/posts/${post.id}`)}>
      <Title>{post.title}</Title>
      <Meta>
        {post.category} · 좋아요 {post.likeCount}
      </Meta>
    </Card>
  );
}

const Card = styled.article`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;
const Meta = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

export default PostCard;
