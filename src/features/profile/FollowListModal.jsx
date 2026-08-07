import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useFollowList } from './api/useFollowList';
import { useFollow } from './api/useFollow';
import FollowButton from './FollowButton';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

const FOCUSABLE_SELECTOR =
  'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

function FollowListItem({ member }) {
  const { isFollowing, isToggling, toggleFollow } = useFollow(member.memberId, member.isFollowing);

  return (
    <Item>
      <ItemInfo>
        {member.profileImage ? (
          <Avatar src={member.profileImage} alt={`${member.nickname} 프로필 사진`} />
        ) : (
          <AvatarPlaceholder />
        )}
        <Nickname>{member.nickname}</Nickname>
      </ItemInfo>
      <FollowButton isFollowing={isFollowing} onClick={toggleFollow} disabled={isToggling} />
    </Item>
  );
}

function FollowListModal({ memberId, mode, onClose }) {
  const { members, isLoading, error } = useFollowList(memberId, mode);
  const title = mode === 'followers' ? `팔로워 ${members.length}` : `팔로잉 ${members.length}`;
  const emptyMessage = mode === 'followers' ? '아직 팔로워가 없어요' : '아직 팔로잉이 없어요';
  const sheetRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const triggerElement = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = sheetRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      triggerElement?.focus();
    };
  }, []);

  return (
    <Overlay onClick={onClose}>
      <Sheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <CloseButton ref={closeButtonRef} type="button" onClick={onClose} aria-label="닫기">
            ✕
          </CloseButton>
        </Header>

        <List>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <EmptyState message="목록을 불러오지 못했어요" />
          ) : members.length === 0 ? (
            <EmptyState message={emptyMessage} />
          ) : (
            members.map((member) => <FollowListItem key={member.memberId} member={member} />)
          )}
        </List>
      </Sheet>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
`;

const Sheet = styled.div`
  width: 353px;
  max-width: calc(100vw - ${({ theme }) => theme.spacing(8)});
  height: 389px;
  padding: ${({ theme }) => theme.spacing(6)};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const List = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin-top: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  min-width: 0;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const AvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const Nickname = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default FollowListModal;
