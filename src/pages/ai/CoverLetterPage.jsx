import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowLeftIcon from '../../asset/icons/ArrowLeftIcon';
import CoverLetterStep1 from '../../features/coverLetter/components/CoverLetterStep1';
import CoverLetterStep2 from '../../features/coverLetter/components/CoverLetterStep2';
import CoverLetterStep3 from '../../features/coverLetter/components/CoverLetterStep3';
import CoverLetterStep4 from '../../features/coverLetter/components/CoverLetterStep4';
import CoverLetterStep5 from '../../features/coverLetter/components/CoverLetterStep5';
import CoverLetterStep6 from '../../features/coverLetter/components/CoverLetterStep6';
import { useCreateResume } from '../../features/coverLetter/api/useCreateResume';
import { useRegenerateResume } from '../../features/coverLetter/api/useRegenerateResume';

const TOTAL_STEPS = 5;

const CoverLetterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, content: '', maxLength: '500' },
  ]);
  const [draftAnswers, setDraftAnswers] = useState({});
  const [draftVariant, setDraftVariant] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const { createResume, isSubmitting, error } = useCreateResume();
  const {
    regenerateResume,
    isSubmitting: isRegenerating,
    error: regenerateError,
  } = useRegenerateResume();

  const goNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));

  const applyResumeQuestions = (resumeQuestions) => {
    setQuestions(
      resumeQuestions.map((q) => ({
        id: q.questionId,
        content: q.content,
        maxLength: q.maxLength,
      })),
    );
    setDraftAnswers(
      resumeQuestions.reduce((acc, q) => {
        acc[q.questionId] = { content: q.answer, explanation: q.description };
        return acc;
      }, {}),
    );
  };

  const handleGenerateDrafts = async () => {
    const resume = await createResume({ title, postIds: selectedActivities, questions });
    if (!resume) return;

    setResumeId(resume.resumeId);
    applyResumeQuestions(resume.questions);
    goNext();
  };

  const handleRegenerateDrafts = async () => {
    const nextVariant = draftVariant + 1;
    const resumeQuestions = await regenerateResume(resumeId, questions, nextVariant);
    if (!resumeQuestions) return;

    setDraftVariant(nextVariant);
    applyResumeQuestions(resumeQuestions);
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
        return <CoverLetterStep3 title={title} setTitle={setTitle} onNext={goNext} />;
      case 4:
        return (
          <CoverLetterStep4
            questions={questions}
            setQuestions={setQuestions}
            onNext={handleGenerateDrafts}
            isSubmitting={isSubmitting}
            error={error}
          />
        );
      case 5: {
        if (activeQuestionId !== null) {
          const activeIndex = questions.findIndex((q) => q.id === activeQuestionId);
          return (
            <CoverLetterStep6
              index={activeIndex}
              question={questions[activeIndex]}
              draft={draftAnswers[activeQuestionId]}
            />
          );
        }
        return (
          <CoverLetterStep5
            questions={questions}
            draftAnswers={draftAnswers}
            onSelectQuestion={setActiveQuestionId}
            onRestart={handleRegenerateDrafts}
            onFinish={handleFinish}
            isRegenerating={isRegenerating}
            regenerateError={regenerateError}
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