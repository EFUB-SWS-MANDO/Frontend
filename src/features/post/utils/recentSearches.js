// 최근 검색어 localStorage 관리 (최대 5개, 최신순)
const STORAGE_KEY = 'sprout-recent-searches';
const MAX_COUNT = 5;

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function addRecentSearch(keyword) {
  const next = [
    keyword,
    ...getRecentSearches().filter((k) => k !== keyword),
  ].slice(0, MAX_COUNT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function removeRecentSearch(keyword) {
  const next = getRecentSearches().filter((k) => k !== keyword);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
