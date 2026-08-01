import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostTypeDropdown from '@/features/post/components/PostTypeDropdown';
import FreeWriteForm from '@/features/post/components/FreeWriteForm';
import TemplateWriteForm from '@/features/post/components/TemplateWriteForm';
import AttachmentButtons from '@/features/post/components/AttachmentButtons';
import AttachmentPreviewList from '@/features/post/components/AttachmentPreviewList';
import CategorySelector from '@/features/post/components/CategorySelector';
import VisibilityToggle from '@/features/post/components/VisibilityToggle';
import CompletionToast from '@/features/post/components/CompletionToast';
import ArrowRightIcon from '@/asset/icons/ArrowRightIcon';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useTemplates } from '@/features/post/api/useTemplates';
import { useCreatePost } from '@/features/post/api/useCreatePost';
import { useAuthStore } from '@/stores/authStore';
import { MOCK_CATEGORIES } from '@/mocks/mockCategories';
import { categoryLabelToCode } from '@/constants/postCategories';

const TITLE_MAX_LENGTH = 20;

function buildTitle(content) {
  const firstLine = content.trim().split('\n')[0];
  if (!firstLine) return '제목 없음';
  const characters = Array.from(firstLine);
  return characters.length > TITLE_MAX_LENGTH
    ? `${characters.slice(0, TITLE_MAX_LENGTH - 3).join('')}...`
    : firstLine;
}

function PostWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const myUser = useAuthStore((state) => state.user);
  const { createPost, isSubmitting, error } = useCreatePost();

  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState(location.state?.postType ?? 'free');
  const [freeContent, setFreeContent] = useState('');
  const [templateContent, setTemplateContent] = useState({});
  const {
    values: templateFields,
    isLoading: isTemplateLoading,
    error: templateError,
  } = useTemplates('BASIC', postType !== 'free');
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState('public');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [attachmentBlocked, setAttachmentBlocked] = useState(false);

  const isTemplateUnavailable =
    postType !== 'free' && (isTemplateLoading || templateError || templateFields.length === 0);

  const handleClose = () => {
    navigate(-1);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleEvidenceUpload = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleToggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleUpload = async () => {
    if (!myUser?.id) {
      navigate('/login');
      return;
    }
    if (photos.length > 0 || files.length > 0) {
      setAttachmentBlocked(true);
      return;
    }

    const content =
      postType === 'free'
        ? freeContent
        : templateFields
            .map((field) => templateContent[field])
            .filter(Boolean)
            .join('\n\n');
    const categories = selectedCategories
      .map((id) => MOCK_CATEGORIES.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .map(categoryLabelToCode);

    const post = await createPost({
      title: buildTitle(content),
      content,
      categories,
      isPrivate: visibility === 'private',
    });

    if (post) setShowToast(true);
  };

  const handleToastDone = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      {step === 1 && (
        <>
          <TopRow>
            <CloseButton onClick={handleClose} aria-label="닫기">✕</CloseButton>
            <PostTypeDropdown value={postType} onChange={setPostType} />
          </TopRow>

          <FormArea>
            {postType === 'free' ? (
              <FreeWriteForm value={freeContent} onChange={setFreeContent} />
            ) : isTemplateLoading ? (
              <Spinner />
            ) : templateError ? (
              <EmptyState message="템플릿을 불러오지 못했어요. 다시 시도해 주세요." />
            ) : templateFields.length === 0 ? (
              <EmptyState message="사용할 수 있는 템플릿이 없어요." />
            ) : (
              <TemplateWriteForm
                fields={templateFields}
                value={templateContent}
                onChange={setTemplateContent}
                uploadedFiles={files}
                onUpload={handleEvidenceUpload}
              />
            )}
          </FormArea>

          <AttachmentPreviewList photos={photos} files={files} />

          <BottomRow>
            <AttachmentButtons
              onPhotoSelect={(newPhotos) => setPhotos((prev) => [...prev, ...newPhotos])}
              onFileSelect={(newFiles) => setFiles((prev) => [...prev, ...newFiles])}
            />
            <NextButton onClick={handleNext} disabled={isTemplateUnavailable}>
              다음
              <ArrowRightIcon color="#494D5A" size={16} />
            </NextButton>
          </BottomRow>
        </>
      )}

      {step === 2 && (
        <>
          <TopRow>
            <CloseButton onClick={handleClose} aria-label="닫기">✕</CloseButton>
          </TopRow>

          <SectionTitle>내가 쓴 글</SectionTitle>
          <PreviewBox>
            {postType === 'free'
              ? freeContent
              : templateFields
                  .map((field) => templateContent[field])
                  .filter(Boolean)
                  .join('\n\n')}
          </PreviewBox>

          <BottomSectionRow>
            <VisibilityToggle value={visibility} onChange={setVisibility} />
            <CategorySelector selected={selectedCategories} onToggle={handleToggleCategory} />
          </BottomSectionRow>

          <UploadButtonRow>
            {attachmentBlocked && (
              <ErrorText role="alert">사진/파일 첨부는 아직 지원하지 않아요. 첨부를 제거하고 다시 시도해주세요.</ErrorText>
            )}
            {error && <ErrorText role="alert">게시글을 등록하지 못했어요. 다시 시도해주세요.</ErrorText>}
            <UploadButton onClick={handleUpload} disabled={isSubmitting}>
              {isSubmitting ? '업로드 중...' : '업로드하기 ↑'}
            </UploadButton>
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
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const FormArea = styled.div`
  flex: 1;

  & > * {
    min-height: 380px;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.bg} !important;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  background: ${({ theme }) => theme.colors.bg};
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
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default PostWritePage;