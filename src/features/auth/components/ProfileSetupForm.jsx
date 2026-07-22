import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useSignup } from '@/features/auth/api/useSignup';

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 10;

function ProfileSetupForm({ onSuccess }) {
  const fileInputRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { signup, isSubmitting, error } = useSignup();

  const isValidNickname =
    nickname.trim().length >= NICKNAME_MIN &&
    nickname.trim().length <= NICKNAME_MAX;

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
    const ok = await signup({
      nickname: nickname.trim(),
      profileImageFile: imageFile,
    });
    if (ok) onSuccess();
  };

  return (
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
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
          maxLength={NICKNAME_MAX}
        />
        <Helper>
          {NICKNAME_MIN}~{NICKNAME_MAX}자로 입력해 주세요.
        </Helper>
      </Field>

      {error && <ErrorText>가입에 실패했어요. 다시 시도해 주세요.</ErrorText>}

      <SubmitButton type="submit" disabled={!isValidNickname || isSubmitting}>
        {isSubmitting ? '가입 중...' : '시작하기'}
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};
  width: 100%;

  > button[type='submit'] {
    width: 100%;
  }
`;

const AvatarButton = styled.button`
  width: 116px;
  height: 116px;
  margin-bottom: ${({ theme }) => theme.spacing(10)};
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
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: ${22 / 16};
  }

  input {
    padding: ${({ theme }) => theme.spacing(3)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: ${({ theme }) => theme.fontSize.md};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Helper = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const SubmitButton = styled.button`
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ProfileSetupForm;
