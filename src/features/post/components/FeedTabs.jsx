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
  display: flex;
  height: 42px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray100};
`;

const Tab = styled.button`
  padding: ${({ theme }) => `0 ${theme.spacing(5)}`};
  margin-bottom: -2px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.regular};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSub};
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
`;

export default FeedTabs;
