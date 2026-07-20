import styled from 'styled-components';
import MoreIcon from '@/asset/icons/MoreIcon';

function EditPhotoMenu({ onClick }) {
  return (
    <IconButton onClick={onClick} aria-label="더보기 메뉴">
      <MoreIcon color="#1A1A1A" size={22} />
    </IconButton>
  );
}

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EditPhotoMenu;