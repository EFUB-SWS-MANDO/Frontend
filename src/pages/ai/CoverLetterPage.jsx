import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowLeftIcon from '../../asset/icons/ArrowLeftIcon';
import CoverLetterStep1 from '../../features/coverLetter/components/CoverLetterStep1';
import CoverLetterStep2 from '../../features/coverLetter/components/CoverLetterStep2';
import CoverLetterStep3 from '../../features/coverLetter/components/CoverLetterStep3';
import CoverLetterStep4 from '../../features/coverLetter/components/CoverLetterStep4';
import CoverLetterStep5 from '../../features/coverLetter/components/CoverLetterStep5';
import { buildMockDraftAnswers } from '../../features/coverLetter/mocks/drafts';

const TOTAL_STEPS = 4;

const CoverLetterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [questions, setQuestions] = useState([
    { id: 1, content: '', maxLength: '' },
  ]);
  const [draftAnswers, setDraftAnswers] = useState({});
  const [draftVariant, setDraftVariant] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const goNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));

  const handleGenerateDrafts = () => {
    setDraftAnswers(buildMockDraftAnswers(questions, draftVariant));
    goNext();
  };

  const handleRegenerateDrafts = () => {
    const nextVariant = draftVariant + 1;
    setDraftVariant(nextVariant);
    setDraftAnswers(buildMockDraftAnswers(questions, nextVariant));
  };

  const handleFinish = () => {
    navigate('/ai');
  };

  const goBack = () => {
    if (activeQuestionId !== null) {
      setActiveQuestionId(null);
    } else if (step === 1) {
      navigate(-1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CoverLetterStep1 onNext={goNext} />;
      case 2:
        return (
          <CoverLetterStep2
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
            onNext={goNext}
          />
        );
      case 3:
        return (
          <CoverLetterStep3
            questions={questions}
            setQuestions={setQuestions}
            onNext={handleGenerateDrafts}
          />
        );
      case 4: {
        if (activeQuestionId !== null) {
          const activeIndex = questions.findIndex((q) => q.id === activeQuestionId);
          return (
            <CoverLetterStep5
              index={activeIndex}
              question={questions[activeIndex]}
              draft={draftAnswers[activeQuestionId]}
            />
          );
        }
        return (
          <CoverLetterStep4
            questions={questions}
            draftAnswers={draftAnswers}
            onSelectQuestion={setActiveQuestionId}
            onRestart={handleRegenerateDrafts}
            onFinish={handleFinish}
          />
        );
      }
      default:
        return <PlaceholderText>아직 준비 중인 단계예요.</PlaceholderText>;
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={goBack} aria-label="뒤로가기">
          <ArrowLeftIcon color="#494D5A" />
        </BackButton>
        <Title>자소서</Title>
        <HeaderSpacer />
      </Header>

      <Content>{renderStep()}</Content>
    </Wrapper>
  );
};

export default CoverLetterPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing(6)};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const HeaderSpacer = styled.div`
  width: 20px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PlaceholderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(10)};
`;