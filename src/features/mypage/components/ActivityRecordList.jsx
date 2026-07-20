import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/components/EmptyState/EmptyState';

const TYPE_LABEL = {
  post: '게시글',
  coverLetter: '자소서',
};

function ActivityRecordList({ records }) {
  const navigate = useNavigate();

  const handleClick = (record) => {
    if (record.type === 'post') {
      navigate(`/posts/${record.postId}`);
    }
    // TODO: 자소서 상세/열람 라우트가 생기면 coverLetter 타입도 연결
  };

  return (
    <Box>
      {records.length === 0 ? (
        <EmptyState />
      ) : (
        <List>
          {records.map((record) => {
            const clickable = record.type === 'post';
            return (
              <Item key={`${record.type}-${record.id}`}>
                <ItemContent
                  as={clickable ? 'button' : 'div'}
                  type={clickable ? 'button' : undefined}
                  onClick={clickable ? () => handleClick(record) : undefined}
                  $clickable={clickable}
                >
                  <TypeTag $type={record.type}>{TYPE_LABEL[record.type]}</TypeTag>
                  <Title>{record.title}</Title>
                  <DateText>{record.createdAt}</DateText>
                </ItemContent>
              </Item>
            );
          })}
        </List>
      )}
    </Box>
  );
}

const Box = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  min-height: 220px;
  padding: 0 ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)} 0;
  border: none;
  background: none;
  font: inherit;
  text-align: left;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const TypeTag = styled.span`
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $type }) => ($type === 'post' ? theme.colors.primary : theme.colors.gray800)};
  background: ${({ theme, $type }) => ($type === 'post' ? theme.colors.green50 : theme.colors.gray200)};
`;

const Title = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DateText = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

export default ActivityRecordList;
