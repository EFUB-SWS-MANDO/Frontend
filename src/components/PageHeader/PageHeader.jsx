import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 뒤로가기 + 가운데 타이틀 공통 헤더 (모의면접/과거 기록/저장 목록 등)
function PageHeader({ title, onBack }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <BackButton
        type="button"
        aria-label="뒤로가기"
        onClick={onBack ?? (() => navigate(-1))}
      >
        ←
      </BackButton>
      <Title>{title}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export default PageHeader;
