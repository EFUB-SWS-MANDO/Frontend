function CopyIcon({ color = '#9197AC', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M3.5 10V3.5C3.5 2.94772 3.94772 2.5 4.5 2.5H11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default CopyIcon;
