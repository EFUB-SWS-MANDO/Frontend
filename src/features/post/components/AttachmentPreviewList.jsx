import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseCircleIcon from '@/asset/icons/CloseCircleIcon';

function AttachmentPreviewList({ photos, files, onRemovePhoto, onRemoveFile }) {
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    setPhotoUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [photos]);

  if (photos.length === 0 && files.length === 0) return null;

  return (
    <Wrapper>
      {photoUrls.map((url, index) => (
        <PhotoItem key={url}>
          <PhotoThumbnail src={url} alt={`첨부 사진 ${index + 1}`} />
          <RemoveButton onClick={() => onRemovePhoto(index)} aria-label="사진 삭제">
            <CloseCircleIcon size={20} />
          </RemoveButton>
        </PhotoItem>
      ))}
      {files.map((attachment) => (
        <FileChip key={attachment.id}>
          {attachment.file.name}
          <RemoveButton onClick={() => onRemoveFile(attachment.id)} aria-label="파일 삭제">
            <CloseCircleIcon size={20} />
          </RemoveButton>
        </FileChip>
      ))}
    </Wrapper>
  );
}

export default AttachmentPreviewList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const PhotoItem = styled.div`
  position: relative;
`;

const PhotoThumbnail = styled.img`
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const RemoveButton = styled.button`
  display: flex;
  padding: 0;
  line-height: 0;

  ${PhotoItem} & {
    position: absolute;
    top: -6px;
    right: -6px;
  }
`;

const FileChip = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
