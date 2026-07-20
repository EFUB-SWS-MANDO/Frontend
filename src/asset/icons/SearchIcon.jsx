function SearchIcon({ color = '#494D5A', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8335 9.58333C15.8335 13.0351 13.0353 15.8333 9.5835 15.8333C6.13172 15.8333 3.3335 13.0351 3.3335 9.58333C3.3335 6.13155 6.13172 3.33333 9.5835 3.33333C13.0353 3.33333 15.8335 6.13155 15.8335 9.58333Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.0771 14.0999L16.6439 16.6667" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SearchIcon;