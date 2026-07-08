function LeafIcon({ color = '#494D5A', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.15076 14.5153C5.24611 16.4737 8.22245 16.7841 10.0311 16.5566C11.8475 16.3739 15.5894 14.8021 16.0253 9.97701C16.4613 5.15195 18.0234 3.21461 18.75 2.84908C12.7557 -0.989036 0.222278 0.107568 0.767211 8.8804C0.931864 11.5311 1.87905 13.3267 3.15076 14.5153ZM3.15076 14.5153C4.91317 10.8739 7.86363 8.59993 9.48596 7.78377M3.15076 14.5153C2.54516 15.7666 2.07984 17.1793 1.8569 18.7498" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default LeafIcon;