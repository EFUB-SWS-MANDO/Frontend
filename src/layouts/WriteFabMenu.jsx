import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WRITE_OPTIONS = [
  { postType: 'free', label: '자유글' },
  { postType: 'template', label: '템플릿' },
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
          <OptionButton key={option.postType} onClick={() => handleSelect(option.postType)}>
            {option.label}
          </OptionButton>
        ))}
      <FabButton onClick={() => setIsOpen((prev) => !prev)}>글쓰기 +</FabButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  right: 40px;
  bottom: 52px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
  z-index: 15;
`;

const FabButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const OptionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default WriteFabMenu;
