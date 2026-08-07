import { useState } from 'react';
import styled from 'styled-components';
import { useFollow } from './api/useFollow';
import FollowButton from './FollowButton';
import ProfileEditModal from './ProfileEditModal';
import FollowListModal from './FollowListModal';

function ProfileHeader({ user, isOwner, onProfileUpdated }) {
  const { isFollowing, isToggling, error: followError, toggleFollow } = useFollow(
    user?.memberId,
    user?.isFollowing ?? false,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [followListMode, setFollowListMode] = useState(null);

  const handleToggleFollow = async () => {
    const ok = await toggleFollow();
    if (ok) onProfileUpdated?.();
  };

  return (
    <Wrapper>
      <TopRow>
        <ProfileInfo>
          {user?.profileImage ? (
            <Avatar src={user.profileImage} alt={`${user?.nickname} 프로필 사진`} />
          ) : (
            <AvatarPlaceholder />
          )}
          <TextGroup>
            <NameRow>
              <Name>{user?.nickname}</Name>
            </NameRow>
            <Intro>{user?.bio}</Intro>
            <FollowCounts>
              <CountButton
                type="button"
                disabled={!user?.memberId}
                onClick={() => setFollowListMode('followers')}
              >
                팔로워 {user?.followerCount}
              </CountButton>
              <CountButton
                type="button"
                disabled={!user?.memberId}
                onClick={() => setFollowListMode('following')}
              >
                팔로잉 {user?.followeeCount}
              </CountButton>
            </FollowCounts>
          </TextGroup>
        </ProfileInfo>

        <ActionArea>
          {isOwner ? (
            <EditButton type="button" onClick={() => setIsEditOpen(true)}>
              수정하기
            </EditButton>
          ) : (
            <>
              <FollowButton isFollowing={isFollowing} onClick={handleToggleFollow} disabled={isToggling} />
              {followError && <FollowErrorText>{followError.message}</FollowErrorText>}
            </>
          )}
        </ActionArea>
      </TopRow>

      {isEditOpen && (
        <ProfileEditModal
          profile={user}
          onClose={() => setIsEditOpen(false)}
          onUpdated={onProfileUpdated}
        />
      )}

      {followListMode && user?.memberId && (
        <FollowListModal
          memberId={user?.memberId}
          mode={followListMode}
          isOwner={isOwner}
          onProfileUpdated={onProfileUpdated}
          onClose={() => setFollowListMode(null)}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(8)};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(8)};
`;

const Avatar = styled.img`
  width: 104px;
  height: 104px;
  border-radius: ${({ theme }) => theme.radius.full};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const AvatarPlaceholder = styled.div`
  width: 104px;
  height: 104px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Name = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const Intro = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const FollowCounts = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(6)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const CountButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.textSub};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(5)};
  flex-shrink: 0;
`;

const FollowErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

const EditButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.bg} !important;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgSub} !important;
  }
`;

export default ProfileHeader;
