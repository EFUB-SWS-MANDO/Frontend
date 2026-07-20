function SaveIcon({ color = '#9197AC', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2V10M8 10L5.5 7.5M8 10L10.5 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 10.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V10.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SaveIcon;
