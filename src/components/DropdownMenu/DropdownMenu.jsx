import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MoreIcon from '@/asset/icons/MoreIcon';

// options: { label, onClick, danger? } | { type: 'toggle', label, checked, onChange }
// 토글 옵션은 클릭해도 메뉴가 닫히지 않고, 나머지 옵션은 클릭 시 메뉴가 닫힘
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
          {options.map((option) =>
            option.type === 'toggle' ? (
              <ToggleRow key={option.label}>
                <span>{option.label}</span>
                <Switch
                  type="button"
                  role="switch"
                  aria-checked={option.checked}
                  aria-label={option.label}
                  $checked={option.checked}
                  onClick={() => option.onChange(!option.checked)}
                >
                  <SwitchKnob $checked={option.checked} />
                </Switch>
              </ToggleRow>
            ) : (
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
            ),
          )}
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

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Switch = styled.button`
  position: relative;
  width: 34px;
  height: 20px;
  flex-shrink: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $checked, theme }) => ($checked ? theme.colors.primary : theme.colors.gray300)};
  transition: background-color 0.15s ease;
`;

const SwitchKnob = styled.span`
  position: absolute;
  top: 2px;
  left: ${({ $checked }) => ($checked ? '16px' : '2px')};
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  transition: left 0.15s ease;
`;

export default DropdownMenu;
