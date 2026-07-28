import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FollowButton from '@/features/profile/FollowButton';
import { useFollow } from '@/features/profile/api/useFollow';
import { useDeletePost } from '@/features/post/api/useDeletePost';
import EditPostButton from './EditPostButton';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu';

function PostDetailHeader({ post, isOwner }) {
  const navigate = useNavigate();
  const { isFollowing, isToggling, error: followError, toggleFollow } = useFollow(
    post.author.id,
    post.author.isFollowing ?? false,
  );
  const { deletePost, error: deleteError } = useDeletePost();

  const handleDelete = async () => {
    const ok = await deletePost(post.id);
    if (ok) navigate('/');
  };

  const menuOptions = isOwner
    ? [
        { label: '본문 수정', onClick: () => {/* TODO: 수정 화면 이동 */} },
        { label: '본문 삭제', onClick: handleDelete, danger: true },
      ]
    : [{ label: '차단하기', onClick: () => {/* TODO: 차단 API 연동 */}, danger: true }];

  return (
    <Wrapper>
      <TopRow>
        <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">←</BackButton>
      </TopRow>

      <AuthorRow>
        <AuthorInfo>
          {post.author.profileImage ? (
            <Avatar src={post.author.profileImage} alt={`${post.author.name} 프로필`} />
          ) : (
            <AvatarPlaceholder />
          )}
          <TextGroup>
            <AuthorName>{post.author.name}</AuthorName>
            <CreatedAt>{post.createdAt}</CreatedAt>
          </TextGroup>
        </AuthorInfo>

        <ActionArea>
          {isOwner ? (
            <EditPostButton onClick={() => {}} />
          ) : (
            <FollowButton isFollowing={isFollowing} onClick={toggleFollow} disabled={isToggling} />
          )}
          <DropdownMenu options={menuOptions} />
        </ActionArea>
      </AuthorRow>

      {!isOwner && followError && <FollowErrorText>{followError.message}</FollowErrorText>}
      {isOwner && deleteError && (
        <FollowErrorText>게시글을 삭제하지 못했어요. 다시 시도해주세요.</FollowErrorText>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing(6)};
`;

const TopRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const BackButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const AuthorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.full};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AvatarPlaceholder = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const FollowErrorText = styled.p`
  margin-top: ${({ theme }) => theme.spacing(2)};
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export default PostDetailHeader;