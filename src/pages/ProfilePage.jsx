// src/pages/ProfilePage.jsx
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProfile } from '@/features/profile/api/useProfile';
import { usePosts } from '@/features/post/api/usePosts';
import ProfileHeader from '@/features/profile/ProfileHeader';
import PostCard from '@/features/post/components/PostCard';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useAuthStore } from '@/stores/authStore';

function ProfilePage() {
  const { userId: rawUserId } = useParams();
  const myUser = useAuthStore((state) => state.user);
  const userId = rawUserId === 'me' ? myUser?.id : rawUserId;

  const { profile, isLoading: profileLoading, error: profileError } = useProfile(userId);
  const { posts, isLoading: postsLoading, error: postsError } = usePosts({ userId });

  if (profileLoading || postsLoading) return <Spinner />;
  if (profileError || postsError) {
    return (
      <EmptyState
        message={profileError?.message || postsError?.message || '불러오지 못했어요. 다시 시도해 주세요.'}
      />
    );
  }

  return (
    <div>
      <ProfileHeader user={profile} isOwner={profile?.isMe} />
      <PostSection>
        <SectionTitle>{profile?.isMe ? '내가 쓴 글' : `${profile?.nickname}님의 글`}</SectionTitle>
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </PostSection>
    </div>
  );
}

const PostSection = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export default ProfilePage;