import { useState, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import MoreIcon from '@/asset/icons/MoreIcon';
function DropdownMenu({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const theme = useTheme();

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
      <IconButton type="button" onClick={() => setIsOpen((prev) => !prev)} aria-label="더보기 메뉴">
        <MoreIcon color={theme.colors.text} size={20} />
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
                type="button"
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
  width: ${({ theme }) => theme.spacing(9)};
  height: ${({ theme }) => theme.spacing(5)};
  flex-shrink: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $checked, theme }) => ($checked ? theme.colors.primary : theme.colors.gray300)};
  transition: background-color 0.15s ease;
`;

const SwitchKnob = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing(0.5)};
  left: ${({ $checked, theme }) => ($checked ? theme.spacing(4.5) : theme.spacing(0.5))};
  width: ${({ theme }) => theme.spacing(4)};
  height: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  transition: left 0.15s ease;
`;

export default DropdownMenu;
