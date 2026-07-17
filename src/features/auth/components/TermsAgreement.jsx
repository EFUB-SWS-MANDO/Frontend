import { useState } from 'react';
import styled from 'styled-components';
import { TERMS } from '@/constants/terms';
import Button from '@/components/Button/Button';

// 약관 목록 + 전체 동의 체크. 필수 약관이 모두 체크되면 onComplete 호출 가능.
function TermsAgreement({ onComplete }) {
  const [checked, setChecked] = useState(() => new Set());

  const allChecked = checked.size === TERMS.length;
  const requiredChecked = TERMS.filter((t) => t.required).every((t) =>
    checked.has(t.id),
  );

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setChecked(allChecked ? new Set() : new Set(TERMS.map((t) => t.id)));
  };

  return (
    <Wrapper>
      <AllAgreeRow>
        <CheckLabel $checked={allChecked}>
          <input type="checkbox" checked={allChecked} onChange={toggleAll} />
          전체 동의
        </CheckLabel>
      </AllAgreeRow>

      {TERMS.map((term) => (
        <TermItem key={term.id}>
          <CheckLabel $checked={checked.has(term.id)}>
            <input
              type="checkbox"
              checked={checked.has(term.id)}
              onChange={() => toggle(term.id)}
            />
            {term.label}
            <Required>{term.required ? '(필수)' : '(선택)'}</Required>
          </CheckLabel>
          <TermContent>{term.content}</TermContent>
        </TermItem>
      ))}

      <Button
        disabled={!requiredChecked}
        onClick={() =>
          onComplete({ marketingAgreed: checked.has('marketing') })
        }
      >
        동의하고 계속하기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`;

const AllAgreeRow = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TermItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $checked }) =>
    $checked ? theme.fontWeight.medium : theme.fontWeight.regular};
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
    width: 18px;
    height: 18px;
  }
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const TermContent = styled.pre`
  max-height: 120px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.bgSub};
  color: ${({ theme }) => theme.colors.textSub};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.6;
  white-space: pre-wrap;
`;

export default TermsAgreement;
