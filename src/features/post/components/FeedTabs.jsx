import styled from 'styled-components';

export const FEED_TABS = [
  { key: 'all', label: '전체' },
  { key: 'following', label: '팔로우 중' },
];

function FeedTabs({ activeTab, onChange }) {
  return (
    <TabList role="tablist">
      {FEED_TABS.map((tab) => (
        <Tab
          key={tab.key}
          role="tab"
          type="button"
          aria-selected={activeTab === tab.key}
          $active={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
  );
}

const TabList = styled.div`
  position: relative;
  display: flex;
  height: 42px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const Tab = styled.button`
  position: relative;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.spacing(5)}`};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.regular};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSub};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : 'transparent'};
    z-index: 1;
  }
`;

export default FeedTabs;
