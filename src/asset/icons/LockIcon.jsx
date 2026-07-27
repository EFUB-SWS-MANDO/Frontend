function LockIcon({ color = '#494D5A', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6.75" width="12" height="9" rx="3" stroke={color} strokeWidth="1.125" />
      <path d="M9 12L9 10.5" stroke={color} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6.75V5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25L6 6.75" stroke={color} strokeWidth="1.125" />
    </svg>
  );
}

export default LockIcon;
