import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useUpdateProfile } from './api/useUpdateProfile';

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 10;
const BIO_MAX = 60;

function ProfileEditModal({ profile, onClose, onUpdated }) {
  const fileInputRef = useRef(null);
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(profile?.profileImage || null);
  const { updateProfile, isSubmitting, error } = useUpdateProfile();

  const isValidNickname =
    nickname.trim().length >= NICKNAME_MIN && nickname.trim().length <= NICKNAME_MAX;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNickname || isSubmitting) return;
    const ok = await updateProfile({
      nickname: nickname.trim(),
      bio: bio.trim(),
      profileImageFile: imageFile,
    });
    if (ok) {
      onUpdated();
      onClose();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Sheet role="dialog" aria-label="프로필 수정" onClick={(e) => e.stopPropagation()}>
        <Title>프로필 수정</Title>

        <Form onSubmit={handleSubmit}>
          <AvatarButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="프로필 이미지 선택"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="프로필 미리보기" />
            ) : (
              <Placeholder>+</Placeholder>
            )}
          </AvatarButton>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <Field>
            <label htmlFor="profile-edit-nickname">닉네임</label>
            <input
              id="profile-edit-nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요"
              maxLength={NICKNAME_MAX}
            />
            <Helper>
              {NICKNAME_MIN}~{NICKNAME_MAX}자로 입력해 주세요.
            </Helper>
          </Field>

          <Field>
            <label htmlFor="profile-edit-bio">소개글</label>
            <textarea
              id="profile-edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
              placeholder="자신을 소개해 주세요"
              maxLength={BIO_MAX}
            />
          </Field>

          {error && <ErrorText>{error.message || '수정에 실패했어요. 다시 시도해 주세요.'}</ErrorText>}

          <ButtonRow>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={!isValidNickname || isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장하기'}
            </SubmitButton>
          </ButtonRow>
        </Form>
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
  max-height: calc(100vh - ${({ theme }) => theme.spacing(16)});
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bg};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
  width: 100%;
`;

const AvatarButton = styled.button`
  width: 88px;
  height: 88px;
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;

  label {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  textarea {
    width: 100%;
    padding: ${({ theme }) => theme.spacing(3)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  textarea {
    resize: none;
    min-height: 72px;
  }
`;

const Helper = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ErrorText = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const SubmitButton = styled.button`
  flex: 1;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ProfileEditModal;
