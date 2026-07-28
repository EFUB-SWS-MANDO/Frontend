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
import { useCreatePost } from '@/features/post/api/useCreatePost';
import { MOCK_CATEGORIES } from '@/mocks/mockCategories';
import { useAuthStore } from '@/stores/authStore';

function buildTitle(content) {
  const firstLine = content.trim().split('\n')[0];
  if (!firstLine) return '제목 없음';
  return firstLine.length > 30 ? `${firstLine.slice(0, 27)}...` : firstLine;
}

function PostWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const myUser = useAuthStore((state) => state.user);
  const { createPost, isSubmitting, error } = useCreatePost();

  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState(location.state?.postType ?? 'free');
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

  const handleUpload = async () => {
    if (!myUser?.id) {
      navigate('/login');
      return;
    }

    const content = postType === 'free' ? freeContent : templateContent.activity;
    const tags = MOCK_CATEGORIES.filter((c) => selectedCategories.includes(c.id)).map((c) => c.name);

    const ok = await createPost({
      id: crypto.randomUUID(),
      title: buildTitle(content),
      content,
      author: {
        id: myUser?.id,
        name: myUser?.nickname ?? '나',
        profileImage: myUser?.profileImage ?? '',
        isFollowing: false,
      },
      createdAt: new Date().toLocaleString(),
      commentCount: 0,
      likeCount: 0,
      tags,
      recruitStatus: 'recruiting',
      isPrivate: visibility === 'private',
    });

    if (ok) setShowToast(true);
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
            ) : (
              <TemplateWriteForm value={templateContent} onChange={setTemplateContent} />
            )}
          </FormArea>

          <AttachmentPreviewList photos={photos} files={files} />

          <BottomRow>
            <AttachmentButtons
              onPhotoSelect={(newPhotos) => setPhotos((prev) => [...prev, ...newPhotos])}
              onFileSelect={(newFiles) => setFiles((prev) => [...prev, ...newFiles])}
            />
            <NextButton onClick={handleNext}>
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
          <PreviewBox>{postType === 'free' ? freeContent : templateContent.activity}</PreviewBox>

          <BottomSectionRow>
            <VisibilityToggle value={visibility} onChange={setVisibility} />
            <CategorySelector selected={selectedCategories} onToggle={handleToggleCategory} />
          </BottomSectionRow>

          <UploadButtonRow>
            {error && <ErrorText role="alert">게시글을 등록하지 못했습니다. 다시 시도해주세요.</ErrorText>}
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