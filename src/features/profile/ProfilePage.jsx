import { useParams } from 'react-router-dom';
import { useProfile } from '@/features/profile/api/useProfile';
import { usePosts } from '@/features/post/api/usePosts';
import ProfileHeader from '@/features/profile/ProfileHeader';
import PostCard from '@/features/post/components/PostCard';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useUserStore } from '@/stores/authStore'; // 아까 확인한 실제 파일명

function ProfilePage() {
  const { userId } = useParams();
  const myUserId = useUserStore((state) => state.userId);
  const isOwner = String(userId) === String(myUserId);

  const { profile, isLoading: profileLoading, error: profileError } = useProfile(userId);
  const { posts, isLoading: postsLoading, error: postsError } = usePosts({ userId });

  if (profileLoading || postsLoading) return <Spinner />;
  if (profileError || postsError) return <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />;

  return (
    <div>
      <ProfileHeader user={profile} isOwner={isOwner} />
      <h3>{isOwner ? '내가 쓴 글' : `${profile?.name}님의 글`}</h3>
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default ProfilePage;