import styled, { useTheme } from 'styled-components';
import FilterIcon from '@/asset/icons/FilterIcon';

export const RECRUIT_LABELS = {
  recruiting: '모집 중',
  closed: '모집 완료',
};

function FilterChips({ filters, onRemoveTag, onClearRecruit, onOpenModal }) {
  const theme = useTheme();
  const { tags, recruitStatus } = filters;

  return (
    <Row>
      <Chips>
        {recruitStatus !== 'all' && (
          <Chip type="button" onClick={onClearRecruit}>
            {RECRUIT_LABELS[recruitStatus]} <span aria-hidden>×</span>
          </Chip>
        )}
        {tags.map((tag) => (
          <Chip key={tag} type="button" onClick={() => onRemoveTag(tag)}>
            {tag} <span aria-hidden>×</span>
          </Chip>
        ))}
      </Chips>
      <IconButton type="button" aria-label="필터" onClick={onOpenModal}>
        <FilterIcon size={20} color={theme.colors.textSub} />
      </IconButton>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(8)};
  min-height: 36px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.full};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

export default FilterChips;
