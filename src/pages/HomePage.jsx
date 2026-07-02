import { usePosts } from '@/features/post/api/usePosts';
import PostCard from '@/features/post/components/PostCard';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

// 모든 목록 화면이 따라야 할 기준 패턴:
// 로딩 / 에러 / 빈 상태를 항상 처리한다.
function HomePage() {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) return <Spinner />;
  if (error) return <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />;
  if (posts.length === 0) return <EmptyState />;

  return (
    <section>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default HomePage;
