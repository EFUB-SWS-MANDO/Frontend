import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import writeFabIcon from '@/asset/write-fab.svg';
import writeFreeIcon from '@/asset/write-free.svg';
import writeTemplateIcon from '@/asset/write-template.svg';

const WRITE_OPTIONS = [
  { postType: 'free', label: '자유글', icon: writeFreeIcon },
  { postType: 'template', label: '템플릿', icon: writeTemplateIcon },
];

function WriteFabMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (postType) => {
    setIsOpen(false);
    navigate('/write', { state: { postType } });
  };

  return (
    <Wrapper ref={wrapperRef}>
      {isOpen &&
        WRITE_OPTIONS.map((option) => (
          <IconButton
            key={option.postType}
            onClick={() => handleSelect(option.postType)}
            aria-label={option.label}
          >
            <img src={option.icon} alt="" />
          </IconButton>
        ))}
      <IconButton onClick={() => setIsOpen((prev) => !prev)} aria-label="글쓰기">
        <img src={writeFabIcon} alt="" />
      </IconButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  right: 40px;
  bottom: 52px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
  z-index: 15;
`;

const IconButton = styled.button`
  display: block;
  padding: 0;
  border: none;
  background: none;
  line-height: 0;

  img {
    display: block;
  }
`;

export default WriteFabMenu;
