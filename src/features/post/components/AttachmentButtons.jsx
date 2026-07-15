import { useRef } from 'react';
import styled from 'styled-components';
import GalleryIcon from '@/asset/icons/GalleryIcon';
import FolderAddIcon from '@/asset/icons/FolderAddIcon';

function AttachmentButtons({ onPhotoSelect, onFileSelect }) {
  const photoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  return (
    <Wrapper>
      <Item onClick={() => photoInputRef.current?.click()}>
        <GalleryIcon size={24} />
        <Label>사진</Label>
        <HiddenInput
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onPhotoSelect(Array.from(e.target.files))}
        />
      </Item>
      <Item onClick={() => fileInputRef.current?.click()}>
        <FolderAddIcon size={24} />
        <Label>파일</Label>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => onFileSelect(Array.from(e.target.files))}
        />
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const Item = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const HiddenInput = styled.input`
  display: none;
`;

export default AttachmentButtons;