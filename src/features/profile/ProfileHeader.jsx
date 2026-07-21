import { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditIntroButton from './EditIntroButton';
import EditPhotoMenu from './EditPhotoMenu';
import FollowButton from './FollowButton';

function ProfileHeader({ user, isOwner }) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing ?? false);

  useEffect(() => {
    setIsFollowing(user?.isFollowing ?? false);
  }, [user?.isFollowing]);

  const handleEditIntro = () => {
    // TODO: 소개글 수정 화면 열기
  };

  const handleEditPhoto = () => {
    // TODO: 프로필 사진 수정 - 버튼만 우선 생성
  };

  const handleFollowToggle = () => {
    // TODO: 팔로우/언팔로우 API 연동 (나중에)
    setIsFollowing((prev) => !prev);
  };

  return (
    <Wrapper>
      <TopRow>
        <ProfileInfo>
          {user?.profileImage ? (
            <Avatar src={user.profileImage} alt={`${user?.name} 프로필 사진`} />
          ) : (
            <AvatarPlaceholder />
          )}
          <TextGroup>
            <NameRow>
              <Name>{user?.name}</Name>
            </NameRow>
            <Intro>{user?.intro}</Intro>
            <FollowCounts>
              <span>팔로워 {user?.followerCount}</span>
              <span>팔로잉 {user?.followingCount}</span>
            </FollowCounts>
          </TextGroup>
        </ProfileInfo>

        <ActionArea>
          {isOwner && <EditPhotoMenu onClick={handleEditPhoto} />}
          {isOwner ? (
            <EditIntroButton onClick={handleEditIntro} />
          ) : (
            <FollowButton isFollowing={isFollowing} onClick={handleFollowToggle} />
          )}
        </ActionArea>
      </TopRow>
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
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-shrink: 0;
`;

export default ProfileHeader;