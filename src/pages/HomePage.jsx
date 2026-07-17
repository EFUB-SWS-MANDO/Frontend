import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { usePosts } from '@/features/post/api/usePosts';
import PostCard from '@/features/post/components/PostCard';
import FeedTabs from '@/features/post/components/FeedTabs';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import SearchIcon from '@/asset/icons/SearchIcon';

// 메인(글목록): Welcome 헤더 + 탭 + 글 목록. 로딩/에러/빈 상태 항상 처리.
function HomePage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const { posts, isLoading, error } = usePosts({ tab: activeTab });

  return (
    <section>
      <TitleRow>
        <Title>Welcome</Title>
        <IconButton type="button" aria-label="검색">
          <SearchIcon size={20} color={theme.colors.textSub} />
        </IconButton>
      </TitleRow>

      <FeedTabs activeTab={activeTab} onChange={setActiveTab} />

      <ListArea>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />
        ) : posts.length === 0 ? (
          <EmptyState message="아직 글이 없어요." />
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </ListArea>
    </section>
  );
}

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.full};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const ListArea = styled.div`
  padding-top: ${({ theme }) => theme.spacing(4)};
`;

export default HomePage;
