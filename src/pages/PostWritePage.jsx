import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostTypeDropdown from '@/features/post/components/PostTypeDropdown';
import FreeWriteForm from '@/features/post/components/FreeWriteForm';
import TemplateWriteForm from '@/features/post/components/TemplateWriteForm';
import AttachmentButtons from '@/features/post/components/AttachmentButtons';
import CategorySelector from '@/features/post/components/CategorySelector';
import VisibilityToggle from '@/features/post/components/VisibilityToggle';
import CompletionToast from '@/features/post/components/CompletionToast';

function PostWritePage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState('free');
  const [freeContent, setFreeContent] = useState('');
  const [templateContent, setTemplateContent] = useState({
    basicInfo: '',
    activity: '',
    reflection: '',
  });
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState('public');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleToggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleUpload = () => {
    // TODO: 백엔드 연동 후 실제 게시글 생성 API 호출
    setShowToast(true);
  };

  const handleToastDone = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <TopRow>
        <CloseButton onClick={handleClose} aria-label="닫기">✕</CloseButton>
      </TopRow>

      {step === 1 && (
        <>
          <PostTypeDropdown value={postType} onChange={setPostType} />

          <FormArea>
            {postType === 'free' ? (
              <FreeWriteForm value={freeContent} onChange={setFreeContent} />
            ) : (
              <TemplateWriteForm value={templateContent} onChange={setTemplateContent} />
            )}
          </FormArea>

          <BottomRow>
            <AttachmentButtons onPhotoSelect={setPhotos} onFileSelect={setFiles} />
            <NextButton onClick={handleNext}>다음 →</NextButton>
          </BottomRow>
        </>
      )}

      {step === 2 && (
        <>
          <SectionTitle>내가 쓴 글</SectionTitle>
          <PreviewBox>{postType === 'free' ? freeContent : templateContent.activity}</PreviewBox>

          <BottomSectionRow>
            <VisibilityToggle value={visibility} onChange={setVisibility} />
            <CategorySelector selected={selectedCategories} onToggle={handleToggleCategory} />
          </BottomSectionRow>

          <UploadButtonRow>
            <UploadButton onClick={handleUpload}>업로드하기 ↑</UploadButton>
          </UploadButtonRow>
        </>
      )}

      {showToast && <CompletionToast onDone={handleToastDone} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const FormArea = styled.div``;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.text} !important;
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const PreviewBox = styled.div`
  padding: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  min-height: 160px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
`;

const BottomSectionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(10)};
`;

const UploadButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.primary} !important;
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default PostWritePage;