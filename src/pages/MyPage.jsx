import styled from 'styled-components';
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
    <Wrapper>
      <ProfileHeader user={profile} isOwner={true} />
      <PostSection>
        <SectionTitle>내가 쓴 글</SectionTitle>
        <PostList>
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </PostList>
      </PostSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.bg};
`;

const PostSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing(10)};
  padding: 0 ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyPage;