import styled from 'styled-components';
import LeafIcon from '../../../asset/icons/LeafIcon';

const CoverLetterStep1 = ({ onNext }) => {
  return (
    <StepWrapper>
      <TextGroup>
        <GuideText>
          자소서 작성에 활용할
          <br />
          활동을 불러와주세요
        </GuideText>
      </TextGroup>

      <IconWrapper>
        <LeafIcon color="#00BF63" size={56} />
      </IconWrapper>

      <BottomArea>
        <PrimaryButton onClick={onNext}>활동 선택하기</PrimaryButton>
      </BottomArea>
    </StepWrapper>
  );
};

export default CoverLetterStep1;

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px; /* 헤더 → 안내 텍스트 (Figma 실측) */
`;

const TextGroup = styled.div`
  text-align: center;
`;

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px; /* 안내 텍스트 → 아이콘 (Figma 실측) */
`;

const BottomArea = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 130px; /* 아이콘 → 버튼 (Figma 실측) */
`;

const PrimaryButton = styled.button`
  width: 100%;
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
`;