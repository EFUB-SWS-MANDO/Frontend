import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MoreIcon from '@/asset/icons/MoreIcon';

function DropdownMenu({ options }) {
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

  return (
    <Wrapper ref={wrapperRef}>
      <IconButton onClick={() => setIsOpen((prev) => !prev)} aria-label="더보기 메뉴">
        <MoreIcon color="#1A1A1A" size={20} />
      </IconButton>
      {isOpen && (
        <Menu>
          {options.map((option) => (
            <MenuItem
              key={option.label}
              $danger={option.danger}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  z-index: 10;
  min-width: 120px;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ $danger, theme }) => ($danger ? theme.colors.error : theme.colors.text)};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

export default DropdownMenu;