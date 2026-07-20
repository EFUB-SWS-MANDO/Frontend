function FilterIcon({ color = '#494D5A', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5h14M5.5 10h9M8 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default FilterIcon;
