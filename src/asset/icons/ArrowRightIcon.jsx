function ArrowRightIcon({ color = '#494D5A', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 7H17.33" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.43 0.93L17.5 7L11.43 13.07" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ArrowRightIcon;
