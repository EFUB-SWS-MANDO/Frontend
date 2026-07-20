function SearchIcon({ color = '#494D5A', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6.25" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 17.5L13.75 13.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default SearchIcon;
