import { useNavigate } from 'react-router-dom';

function PostCard({ post }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`); // 게시글상세로 이동, 실제 경로는 라우터 규칙에 맞춰 조정
  };

  return (
    <div onClick={handleCardClick}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div>
        <img src={post.author.profileImage} alt={`${post.author.name} 프로필`} />
        <span>{post.author.name}</span>
        <span>{post.createdAt}</span>

        <span> {post.commentCount}</span>
        <span> {post.likeCount}</span>
      </div>
    </div>
  );
}

export default PostCard;