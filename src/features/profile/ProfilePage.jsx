import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../features/profile/ProfileHeader';
import PostList from '../features/post/PostList';
import { getUserProfile, getUserPosts } from '../apis/endpoints';
import { useUserStore } from '../store/useUserStore';

function ProfilePage() {
  const { userId } = useParams(); // URL 예: /profile/123 → userId = "123"
  const myUserId = useUserStore((state) => state.userId); // 로그인한 내 유저 ID

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isOwner = String(userId) === String(myUserId);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const [profileData, postsData] = await Promise.all([
          getUserProfile(userId),
          getUserPosts(userId),
        ]);
        setProfile(profileData);
        setPosts(postsData);
      } catch (error) {
        console.error('프로필 데이터 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfileData();
  }, [userId]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 추후 Spinner 컴포넌트로 교체
  }

  return (
    <div>
      <ProfileHeader user={profile} isOwner={isOwner} />
      <h3>{isOwner ? '내가 쓴 글' : `${profile?.name}님의 글`}</h3>
      <PostList posts={posts} />
    </div>
  );
}

export default ProfilePage;