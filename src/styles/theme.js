// Figma 디자인 확정되면 값 교체. SPROUT(새싹) 컨셉 = 그린 계열 기본값.
export const theme = {
  colors: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#A5D6A7',
    point: '#FF6B6B',
    bg: '#FFFFFF',
    bgSub: '#F7F9F5',
    text: '#1A1A1A',
    textSub: '#6B7280',
    border: '#E5E7EB',
    error: '#E03131',
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
