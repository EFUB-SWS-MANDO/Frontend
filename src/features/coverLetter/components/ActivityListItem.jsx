import styled from 'styled-components';
import TickCircleIcon from '../../../asset/icons/TickCircleIcon';
import TickCircleBulkIcon from '../../../asset/icons/TickCircleBulkIcon';

const ActivityListItem = ({ activity, selected, onToggle }) => {
  return (
    <ItemWrapper onClick={() => onToggle(activity.id)} $selected={selected}>
      <TextGroup>
        <ActivityName>{activity.name}</ActivityName>
        <ActivityKeyword>{activity.keyword}</ActivityKeyword>
      </TextGroup>

      {selected ? (
        <TickCircleBulkIcon color="#00BF63" size={24} />
      ) : (
        <TickCircleIcon color="#CBD0DD" size={24} />
      )}
    </ItemWrapper>
  );
};

export default ActivityListItem;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: border-color 0.15s ease;

  & + & {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ActivityName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const ActivityKeyword = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;