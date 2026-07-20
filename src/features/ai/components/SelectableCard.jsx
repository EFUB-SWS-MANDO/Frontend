import styled from 'styled-components';

// 체크 선택 가능한 항목 카드 (활동/자소서 공용)
function SelectableCard({ title, description, selected, onToggle }) {
  return (
    <Card type="button" $selected={selected} onClick={onToggle}>
      <TextArea>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </TextArea>
      <CheckCircle $selected={selected} aria-hidden>
        ✓
      </CheckCircle>
    </Card>
  );
}

const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;
  /* 시안: 패딩 12/20, 그림자 */
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-align: left;
`;

const TextArea = styled.div`
  min-width: 0;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing(0.5)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const CheckCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  /* 시안: 체크 아이콘 24 */
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: #fff;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.border};
`;

export default SelectableCard;
