import { useProfile } from '@/features/profile/api/useProfile';
import { usePosts } from '@/features/post/api/usePosts';
import ProfileHeader from '@/features/profile/ProfileHeader';
import PostCard from '@/features/post/components/PostCard';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

function MyPage() {
  const { profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { posts, isLoading: postsLoading, error: postsError } = usePosts();

  if (profileLoading || postsLoading) return <Spinner />;
  if (profileError || postsError) return <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />;

  return (
    <div>
      <ProfileHeader user={profile} isOwner={true} />
      <h3>내가 쓴 글</h3>
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default MyPage;