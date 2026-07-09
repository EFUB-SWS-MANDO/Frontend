import styled from 'styled-components';
import DropdownMenu from './DropdownMenu';

function CommentItem({ comment, isOwner, onReplyClick }) {
  const menuOptions = isOwner
    ? [
        { label: '수정', onClick: () => {/* TODO: 댓글 수정 */} },
        { label: '삭제', onClick: () => {/* TODO: 댓글 삭제 */}, danger: true },
      ]
    : [{ label: '차단하기', onClick: () => {/* TODO: 차단 API 연동 */}, danger: true }];

  return (
    <Wrapper>
      <TopRow>
        <AuthorInfo>
          {comment.author.profileImage ? (
            <Avatar src={comment.author.profileImage} alt={`${comment.author.name} 프로필`} />
          ) : (
            <AvatarPlaceholder />
          )}
          <AuthorName>{comment.author.name}</AuthorName>
          <CreatedAt>{comment.createdAt}</CreatedAt>
        </AuthorInfo>
        <DropdownMenu options={menuOptions} />
      </TopRow>

      <Content>{comment.content}</Content>

      <ReplyLink onClick={onReplyClick}>답글 달기</ReplyLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(4)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ReplyLink = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  text-decoration: underline;
`;

export default CommentItem;