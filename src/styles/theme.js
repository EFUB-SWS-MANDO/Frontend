// Figma 디자인 시스템 색상 팔레트 반영 완료
export const theme = {
  colors: {
// ===== Primary (Green) - 세부 스케일 =====
    green50: '#ECFCEF',
    green100: '#C9F3D1',
    green200: '#9CDDA9',
    green300: '#6FD382',
    green500: '#00BF63',
    green700: '#008947',
    green900: '#004122',

    // ===== GreyScale - 세부 스케일 =====
    white: '#FFFFFF',
    gray50: '#F6F7FA',
    gray100: '#F2F3F5',
    gray200: '#EBECF2',
    gray300: '#E1E3ED',
    gray400: '#D5D9E4',
    gray500: '#CBD0DD',
    gray600: '#AFB5C8',
    gray700: '#9197AC',
    gray800: '#656A7A',
    gray900: '#494D5A',
    gray950: '#2C303D',
    black: '#0F0F0F',

    // ===== 기존 시맨틱 키 (다른 페이지 호환용, 값만 정확한 컬러로 교체) =====
    primary: '#00BF63',      // green500
    primaryDark: '#008947',  // green700
    primaryLight: '#9CDDA9', // green200
    point: '#FF6B6B',        // Figma에 별도 값 없어서 기존 유지
    bg: '#FFFFFF',           // white
    bgSub: '#F6F7FA',        // gray50
    text: '#494D5A',         // gray900
    textSub: '#9197AC',      // gray700
    border: '#E1E3ED',       // gray300
    error: '#E03131',        // 기존 유지
    kakao: '#FEE500',
    kakaoText: '#191919',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
  },
  fontWeight: { regular: 400, medium: 500, bold: 700 },
  radius: { sm: '8px', md: '12px', lg: '20px', full: '9999px' },
  spacing: (n) => `${n * 4}px`, // spacing(4) -> 16px
  breakpoints: { mobile: '480px', tablet: '768px' },
};