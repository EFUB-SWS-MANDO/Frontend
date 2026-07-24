import styled from 'styled-components';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu';

// 댓글/대댓글이 공유하는 헤더(아바타·이름·날짜·더보기 메뉴) + 본문(일반/수정중/삭제됨) 렌더링.
function CommentContent({
  item,
  isOwner,
  avatarSize,
  isEditing,
  draftContent,
  onDraftChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onTogglePrivate,
  onDelete,
}) {
  const menuOptions = item.isDeleted
    ? []
    : isOwner
      ? [
          {
            type: 'toggle',
            label: '공개',
            checked: !item.isPrivate,
            onChange: onTogglePrivate,
          },
          { label: '수정하기', onClick: onStartEdit },
          { label: '삭제하기', onClick: onDelete, danger: true },
        ]
      : [{ label: '차단하기', onClick: () => {/* TODO: 차단 API 연동 */}, danger: true }];

  return (
    <>
      <TopRow>
        <AuthorInfo>
          {item.isDeleted || !item.author.profileImage ? (
            <AvatarPlaceholder $size={avatarSize} />
          ) : (
            <Avatar $size={avatarSize} src={item.author.profileImage} alt={`${item.author.name} 프로필`} />
          )}
          <AuthorName>{item.isDeleted ? '(알 수 없음)' : item.author.name}</AuthorName>
          <CreatedAt>{item.createdAt}</CreatedAt>
        </AuthorInfo>
        {!item.isDeleted && <DropdownMenu options={menuOptions} />}
      </TopRow>

      {item.isDeleted ? (
        <DeletedText>삭제된 댓글입니다.</DeletedText>
      ) : isEditing ? (
        <EditArea>
          <EditInput value={draftContent} onChange={onDraftChange} rows={2} />
          <EditButtonRow>
            <EditButton type="button" onClick={onCancelEdit}>
              취소
            </EditButton>
            <EditButton type="button" $primary onClick={onSaveEdit}>
              저장
            </EditButton>
          </EditButtonRow>
        </EditArea>
      ) : (
        <Content>{item.content}</Content>
      )}
    </>
  );
}

export default CommentContent;

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
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ theme }) => theme.radius.full};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AvatarPlaceholder = styled.div`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
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

const DeletedText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const EditArea = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const EditInput = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;

  &:focus {
    outline: none;
  }
`;

const EditButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const EditButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.bg)};
  color: ${({ theme, $primary }) => ($primary ? '#fff' : theme.colors.textSub)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
`;
