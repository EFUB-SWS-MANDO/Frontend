import styled from 'styled-components';
import ArrowRightIcon from '../../../asset/icons/ArrowRightIcon';

const TITLE_MAX_LENGTH = 20;

const CoverLetterStep3 = ({ title, setTitle, onNext }) => {
  const handleChange = (e) => {
    setTitle(e.target.value.slice(0, TITLE_MAX_LENGTH));
  };

  return (
    <StepWrapper>
      <GuideArea>
        <GuideText>자소서 제목을 입력해주세요.</GuideText>
        <SubText>입력한 제목으로 저장돼요.</SubText>
      </GuideArea>

      <TitleCard>
        <TitleInput
          placeholder="삼성전자 2026 하반기 공개채용"
          value={title}
          onChange={handleChange}
          maxLength={TITLE_MAX_LENGTH}
        />
      </TitleCard>

      <BottomArea>
        <PrimaryButton onClick={onNext} disabled={title.trim() === ''}>
          다음으로
          <ArrowRightIcon color="#FFFFFF" size={16} />
        </PrimaryButton>
      </BottomArea>
    </StepWrapper>
  );
};

export default CoverLetterStep3;

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const GuideArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const TitleCard = styled.div`
  flex: 1;
  display: flex;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
`;

const TitleInput = styled.textarea`
  flex: 1;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const BottomArea = styled.div`
  width: 100%;
`;

const PrimaryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(3.5)};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray400};
    cursor: not-allowed;
  }
`;
