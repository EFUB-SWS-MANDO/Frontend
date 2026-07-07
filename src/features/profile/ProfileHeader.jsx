// features/profile/ProfileHeader.jsx
import { useState } from 'react';
import EditIntroButton from './EditIntroButton';
import EditPhotoMenu from './EditPhotoMenu';
import FollowButton from './FollowButton';

function ProfileHeader({ user, isOwner }) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing ?? false);

  const handleEditIntro = () => {
    // TODO: 소개글 수정 화면 열기
  };

  const handleEditPhoto = () => {
    // TODO: 프로필 사진 수정 동작 - 기능 TBD (버튼만 우선 생성)
  };

  const handleFollowToggle = () => {
    // TODO: 팔로우/언팔로우 API 연동 (나중에)
    setIsFollowing((prev) => !prev);
  };

  return (
    <div>
      <div>
        <img src={user?.profileImage} alt={`${user?.name} 프로필 사진`} />
        <h2>
          {user?.name} 
        </h2>
        <p>{user?.intro}</p>
        <div>
          <span>팔로워 {user?.followerCount}</span>
          <span>팔로잉 {user?.followingCount}</span>
        </div>
      </div>

      <div>
        {isOwner ? (
          <>
            <EditIntroButton onClick={handleEditIntro} />
            <EditPhotoMenu onClick={handleEditPhoto} />
          </>
        ) : (
          <FollowButton
            isFollowing={isFollowing}
            onClick={handleFollowToggle}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;