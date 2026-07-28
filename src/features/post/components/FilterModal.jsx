import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import { POST_CATEGORIES } from '@/constants/postCategories';

// 필터 모달: 카테고리(다중 선택). 확인 시 한번에 적용.
function FilterModal({ initialFilters, onApply, onClose }) {
  const [tags, setTags] = useState(initialFilters.tags);

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Overlay onClick={onClose}>
      <Sheet
        role="dialog"
        aria-label="글 필터"
        onClick={(e) => e.stopPropagation()}
      >
        <SectionTitle>카테고리별 필터</SectionTitle>
        <OptionRow>
          {POST_CATEGORIES.map(({ label }) => (
            <OptionChip
              key={label}
              type="button"
              $selected={tags.includes(label)}
              onClick={() => toggleTag(label)}
            >
              {label}
            </OptionChip>
          ))}
        </OptionRow>

        <ButtonRow>
          <Button variant="outline" type="button" onClick={onClose}>
            취소
          </Button>
          <Button type="button" onClick={() => onApply({ tags })}>
            확인
          </Button>
        </ButtonRow>
      </Sheet>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
`;

const Sheet = styled.div`
  width: 360px;
  max-width: calc(100vw - ${({ theme }) => theme.spacing(8)});
  padding: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const OptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const OptionChip = styled.button`
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.bg};
  color: ${({ theme, $selected }) =>
    $selected ? '#fff' : theme.colors.textSub};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export default FilterModal;
