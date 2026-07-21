# Frontend
EFUB 6기 SWS 프로젝트 프론트엔드 레포지토리

## API 연동 가이드

- 베이스 URL: `.env`의 `VITE_API_BASE_URL` — 실제 주소는 팀 공유 채널 참고
- `VITE_USE_MOCK=true`면 목 데이터로 동작합니다. 담당 API가 아직 없으면 true로 두고 개발하세요.
- axios 인스턴스(`@/apis/axiosInstance`)가 공통 응답 `{ success, message, data }`를 자동으로 벗겨줍니다.
  - `const data = await api.get(ENDPOINTS.categories.list);` 처럼 바로 data를 받습니다.
  - 401(토큰 만료)은 인스턴스가 refresh → 재시도까지 자동 처리합니다. 실패하면 로그아웃됩니다.
  - 에러 메시지는 `error.message`로 통일되어 있습니다.
- API 경로는 문자열 하드코딩 대신 `@/apis/endpoints`의 `ENDPOINTS`에서 꺼내 씁니다.
- 훅 전환 견본: `src/features/post/api/useCategories.js`
  1. `USE_MOCK`이면 목 데이터 반환
  2. 아니면 `api.get/post(...)` 호출
  3. 로딩/에러 상태는 기존처럼 `{ data, isLoading, error }` 형태 유지 (화면 코드는 수정하지 않습니다)
