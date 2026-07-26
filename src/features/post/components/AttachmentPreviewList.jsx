import { useEffect, useState } from 'react';
import styled from 'styled-components';

function AttachmentPreviewList({ photos, files }) {
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
        <PhotoThumbnail key={url} src={url} alt={`첨부 사진 ${index + 1}`} />
      ))}
      {files.map((attachment) => (
        <FileChip key={attachment.id}>{attachment.file.name}</FileChip>
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

const PhotoThumbnail = styled.img`
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FileChip = styled.span`
  display: flex;
  align-items: center;
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
