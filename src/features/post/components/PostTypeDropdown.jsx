import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TYPE_LABEL = {
  free: '자유롭게 글쓰기',
  template: '템플릿 활용하기',
};

function PostTypeDropdown({ value, onChange }) {
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
      <Trigger onClick={() => setIsOpen((prev) => !prev)}>
        {TYPE_LABEL[value]}
        <Arrow $open={isOpen}>▾</Arrow>
      </Trigger>
      {isOpen && (
        <Menu>
          {Object.entries(TYPE_LABEL).map(([key, label]) => (
            <MenuItem
              key={key}
              $selected={key === value}
              onClick={() => {
                onChange(key);
                setIsOpen(false);
              }}
            >
              {label}
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

const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.bg} !important;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Arrow = styled.span`
  transition: transform 0.15s;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  z-index: 10;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.text)};
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.bgSub : theme.colors.bg)} !important;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgSub} !important;
  }
`;

export default PostTypeDropdown;