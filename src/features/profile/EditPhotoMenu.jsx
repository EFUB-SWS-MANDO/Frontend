import MoreIcon from '../../assets/icons/MoreIcon';

function EditPhotoMenu({ onClick }) {
  return (
    <button onClick={onClick} aria-label="더보기 메뉴">
      <MoreIcon />
    </button>
  );
}

export default EditPhotoMenu;