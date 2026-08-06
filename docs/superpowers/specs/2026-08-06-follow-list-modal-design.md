# 팔로워/팔로잉 모달 API 연동 + 디자인 설계

## 배경

프로필 페이지에 팔로워/팔로잉 목록을 보여주는 모달을 추가한다. 원래 티켓은 "mock 데이터를 실제 API로 교체"하는 작업으로 요청되었으나, 코드베이스 확인 결과 `FollowerModal`/`FollowingModal`에 해당하는 컴포넌트가 존재하지 않았다(`ProfileHeader.jsx`의 "팔로워 N" / "팔로잉 N"은 클릭 불가능한 텍스트일 뿐). 따라서 이 작업은 **신규 구축**이며, mock 제거 대상 자체가 없다. (사용자 확인 완료)

## 범위

- 팔로워 목록 모달, 팔로잉 목록 모달 (하나의 공유 컴포넌트로 구현, 아래 참고)
- `ProfileHeader`의 팔로워/팔로잉 카운트를 클릭 가능하게 만들어 모달 오픈 트리거로 연결
- 팔로우 토글은 기존 `useFollow`/`toggleFollow`/`FollowButton`을 그대로 재사용 (신규 핸들러/API 함수 작성 금지)

## 컴포넌트 구조 결정

팔로워 모달과 팔로잉 모달은 헤더 텍스트("팔로워 N" vs "팔로잉 N")와 API 엔드포인트만 다르고 레이아웃·리스트 아이템 구조·버튼 로직이 100% 동일하다. 두 파일로 분리하지 않고 `FollowListModal` 하나에 `mode: 'followers' | 'following'` prop을 받아 헤더 텍스트/엔드포인트만 분기한다. (사용자 확인 완료 — 유지보수 편의 우선)

## 파일 구조

```text
src/apis/endpoints.js          # follow.followers, follow.followings 추가
src/features/profile/
  api/useFollowList.js         # 신규: 팔로워/팔로잉 목록 조회 훅 (mode로 분기)
  FollowListModal.jsx          # 신규: 모달 본체 + 리스트 아이템 서브컴포넌트(같은 파일 내부)
  ProfileHeader.jsx            # 수정: 카운트 클릭 가능화, 모달 오픈 상태 추가
```

`apis/` 폴더에 별도 API 함수 파일을 추가하지 않는다. `usePosts.js`, `useComments.js`가 이미 훅 내부에서 `api.get`을 직접 호출하는 패턴을 쓰고 있으므로 그 컨벤션을 그대로 따른다.

## API 명세

### GET /api/members/{memberId}/followers
### GET /api/members/{memberId}/followings

- Header: `Authorization: Bearer {accessToken}`
- Query: `idAfter`(선택, 이전 페이지 마지막 followId), `limit`(선택, 기본 20, 1~100)
- 정렬: 생성 순서 Desc
- Response 200:
  ```json
  {
    "success": true,
    "message": "...",
    "data": {
      "members": [{ "memberId": 1, "nickname": "...", "profileImage": "...", "isFollowing": true }],
      "nextIdAfter": 2,
      "hasNext": true
    }
  }
  ```
- `axiosInstance.js`의 response 인터셉터가 `res.data.data`를 반환하므로, 훅에서 `api.get(...)` 호출 결과는 `{ members, nextIdAfter, hasNext }` 형태로 바로 받는다.
- `isFollowing`은 항상 "로그인한 나" 기준 (API가 이미 그렇게 내려줌, 프론트에서 별도 계산 없음)

`endpoints.js`에 추가:
```js
follow: {
  toggle: (memberId) => `/api/members/${memberId}/follow`,
  followers: (memberId) => `/api/members/${memberId}/followers`,
  followings: (memberId) => `/api/members/${memberId}/followings`,
},
```

## 데이터 흐름 / 페이지네이션

`usePosts`/`useComments`는 무한스크롤이나 "더보기" UI 없이, 훅 내부 `while(hasNext)` 루프로 전체 페이지를 선적재한 뒤 한 번에 state에 반영하는 패턴을 쓴다 (`MAX_PAGES=50` 캡). 이 프로젝트에는 실시간 스크롤 트리거(IntersectionObserver 등) 패턴이 없으므로, `useFollowList`도 동일하게 구현한다. (사용자 확인 완료)

```js
useFollowList(memberId, mode)
// mode === 'followers' → ENDPOINTS.follow.followers(memberId)
// mode === 'following' → ENDPOINTS.follow.followings(memberId)
// while (hasNext && page < 50) { api.get(endpoint, { params: { idAfter, limit: 20 } }) ... }
// return { members, isLoading, error, refetch }
```

모달은 고정 높이(389px)에 `overflow-y: auto` 스크롤 처리이므로 전체 선적재가 UX상 자연스럽다. (ponytail: 팔로워 5000명 초과 시 50페이지 캡에 걸림 — 실사용 규모에서 초과 시 진짜 무한스크롤로 전환)

각 리스트 아이템은 `useFollow(item.memberId, item.isFollowing)`을 개별 호출해야 하므로 (훅은 반복문 안에서 직접 호출 불가), 리스트 아이템을 `FollowListItem`이라는 별도 서브컴포넌트로 분리한다 (파일은 `FollowListModal.jsx` 안에 함께 둠). 토글 성공/실패 시 화면 반영은 `useFollow`의 기존 낙관적 업데이트 동작을 그대로 사용하며, 새로운 토글 로직은 작성하지 않는다.

## 상태 처리

- 로딩: 기존 `Spinner` 컴포넌트 재사용
- 에러: 기존 `EmptyState` 재사용, message="목록을 불러오지 못했어요"
- 빈 목록: 기존 `EmptyState` 재사용, mode별 message ("아직 팔로워가 없어요" / "아직 팔로잉이 없어요")

## 디자인

- `Overlay` + `Sheet` 구조는 `ProfileEditModal`/`FilterModal`과 동일한 패턴 (`position: fixed; inset: 0` 오버레이, 중앙 정렬 sheet, `role="dialog"`, 배경 클릭 시 닫힘)
- Sheet: width 353px, height 389px, padding `theme.spacing(6)`(24px), background `theme.colors.bg`(#FFFFFF)
- border-radius: theme에 16px 토큰이 없으므로(`xs:4 sm:8 md:12 lg:20`) 리터럴 `16px` 사용 (lg=20px로 반올림하지 않음)
- 헤더(좌: "팔로워 N"/"팔로잉 N", 우: X 닫기 버튼)는 고정, 리스트 영역만 `flex: 1; overflow-y: auto`
- count는 API 응답 `members.length` 사용 (명세에 별도 total 필드 없음)
- 리스트 아이템: 좌측 원형 아바타 + 닉네임, 우측 `FollowButton` — 기존 `FollowButton`이 이미 팔로잉(초록 채움)/팔로우(흰 배경+테두리) 두 상태를 지원하므로 그대로 재사용, 신규 스타일 추가 없음
- 반응형: 목업 이미지가 실제로 첨부되지 않아, 기존 모달들(`ProfileEditModal`, `FilterModal`)과 동일하게 `max-width: calc(100vw - theme.spacing(8))`만 두고 별도 breakpoint 분기는 넣지 않음 (프로젝트에 모달 전용 반응형 패턴이 없어 기존 컨벤션을 따름). 실제 모바일 목업이 이와 다르면 이후 조정.

## ProfileHeader 연결

- `FollowCounts`의 두 `<span>`을 클릭 가능하게 변경 (`button` 또는 `role="button"` + `onClick`)
- `followModalMode` state: `null | 'followers' | 'following'`
- 클릭 시 해당 mode로 state 세팅 → `followModalMode`가 있으면 `<FollowListModal memberId={user?.memberId} mode={followModalMode} onClose={() => setFollowModalMode(null)} />` 렌더

## 테스트 계획

- `useFollowList`: 페이지네이션 루프(hasNext=false에서 멈춤, MAX_PAGES 캡 동작) 동작 확인용 수동 콘솔 체크 또는 최소 유닛 케이스 1개
- 수동 확인: 팔로워/팔로잉 모달 각각 열기 → 목록 표시 → 팔로우 토글 클릭 시 버튼 상태 즉시 반영 → 모달 닫고 다시 열어도 최신 상태 유지 → 빈 목록/에러 상태 확인

## 주의사항 (티켓 원문 유지)

- mock 데이터/관련 import 없음 (애초에 없었음)
- 새로운 팔로우 토글 핸들러나 API 함수 작성 금지 — 기존 `useFollow` 재사용
- 커밋 메시지 컨벤션: `[feat/design/fix] #이슈번호 설명`
