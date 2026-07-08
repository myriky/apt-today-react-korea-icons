# Changelog

## [1.1.1] - 2026-07-08

### Fixed

- **RSC(React Server Components) 빌드 실패 수정** — 1.1.0의 `useInstanceSuffix`가
  `useState`+`useLayoutEffect`를 사용해, Next.js App Router 서버 컴포넌트(react-server 서브셋에는
  해당 훅이 없음)에서 아이콘 렌더 시 `useState is not a function`으로 빌드/SSR이 실패하던 문제.
  `React.useId()` 기반으로 교체 — 서버/클라이언트 양쪽에서 동작하고, 첫 렌더부터 인스턴스 고유
  id가 채워져 1.1.0 방식의 부수 결함(첫 페인트 공유 id 충돌, setState 재렌더, hydration 시 DOM
  mutation)도 함께 해소. 상세 분석: apt-today-web `docs/20260707-react-korea-icons-1.1.0-rsc-build-failure.md`

### Changed

- peerDependencies `react >=17.0.0` → `>=18.0.0` (`useId` 요구)
- **1.1.0은 npm에서 unpublish됨** (RSC 환경 빌드 실패). 1.1.0의 기능(행정구역 개편 아이콘 등)은
  1.1.1에 모두 포함

## [1.1.0] - 2026-07-07 (unpublished)

### Added

- **2026-07-01 행정구역 개편 반영**
  - 전남광주통합특별시(시도 코드 12, 축약형 "광주특별시") 신설 — 광주광역시(29) + 전라남도(46) 통합. 시도 CI는 공표 전까지 중립 배지 placeholder
  - 통합시 산하 27개 시군구 신 코드(12110~12870) 추가 — 기관 존속으로 기존 공식 로고 재사용
  - 인천 신설 4구 추가: 제물포구(28125) / 영종구(28155) / 서해구(28275) / 검단구(28290) — **공식 로고 반영**
  - 구 코드(29xxx/46xxx, 인천 중구·동구·서구)와 기존 export는 하위호환 유지 (행안부 코드 유효 기간 및 과거 데이터 렌더링 대응)
  - 총 아이콘 226 → 257, 시도 17 → 18
- example 갤러리를 시도별 섹션으로 그룹핑 (시도 로고 + 명칭 + 개수 헤더), 폐지 예정 시도(광주광역시·전라남도) 섹션에 통합 안내 뱃지 표시

### Fixed

- **다중 인스턴스 시 gradient ID 충돌 — 첫 인스턴스가 숨겨진 경우 fill 소실 (63개 컴포넌트)**
  - 증상: 같은 아이콘을 한 페이지에 여러 번 렌더링할 때, DOM 순서상 첫 번째 인스턴스가 `display:none` 컨테이너(반응형 숨김 블록 등) 안에 있으면 `url(#...)`가 숨겨진 defs로 해석되어 보이는 아이콘의 gradient fill이 통째로 사라짐. apt.today 프로덕션(모바일 전용 `lg:hidden` 블록)에서 발견 — 금천구·중구·동대문구는 완전 비표시, 광명시·용인시·성북구는 부분 렌더링.
  - 원인: v1.0.3의 "같은 컴포넌트 다중 인스턴스가 같은 ID를 공유해도 정의가 동일하므로 시각 무해" 가정이 첫 인스턴스가 숨겨진 경우 성립하지 않음 (브라우저는 `display:none` 서브트리 안의 paint server를 렌더링에 사용하지 못함).
  - 수정: `useInstanceSuffix` 훅 도입. SSR 마크업과 첫 클라이언트 렌더는 기존 결정적 공유 ID를 유지하고(cross-call 멱등, hydration mismatch 없음), 클라이언트 마운트 직후(layout effect, paint 전) 인스턴스 고유 접미사(`-i<n>`)로 전환. 그라디언트 사용 63개 컴포넌트에 일괄 적용.
  - 참고: JS 없이 SSR 정적 마크업만 사용하는 환경에서는 여전히 공유 ID이므로, 그 경우 첫 인스턴스를 숨기지 않도록 배치 필요.
- **BucheonSi(부천시) gradient 참조 오타** — `url(#a)`가 존재하지 않는 ID를 가리켜 로고의 그라디언트 조각이 렌더링되지 않던 버그 (v1.0.0부터 존재). `kicon-bucheonsi-a` 참조로 수정되어 하단 사선 조각 복원.
- **BusanNamGu(부산 남구) dangling filter 참조 제거** — `url(#filter1453)`, `url(#filter1603)`이 존재하지 않는 filter를 가리켜 해당 path 2개가 브라우저에서 렌더링되지 않던 버그.
- **GapyeongGun(가평군) gradient 참조 형식 통일** — 문자열 리터럴 참조가 접미사 미적용으로 남던 문제.

### Added

- example에 **다중 인스턴스 스트레스 테스트 페이지**(`#/stress`) 추가 — 전 아이콘 N회 반복 + "첫 인스턴스 display:none" 재현 토글 + `url(#)` 참조가 숨겨진 defs로 해석되는지 자동 감지 + 고유 ID 기준본과 나란히 비교.

### Changed

- SSR 회귀 스크립트를 `example/ssr-regression-after-fix.mjs` → `scripts/ssr-regression.mjs`로 이동 (패키지가 훅을 사용하게 되면서 react 이중 복사본 문제를 피하기 위해 루트의 react/react-dom 단일 쌍으로 실행). 루트 devDependencies에 `react-dom` 추가.
- example Vite 설정에 `resolve.dedupe: ["react", "react-dom"]` 추가 (link 패키지의 훅 사용 대응).

## [1.0.3] - 2026-05-04

### Fixed

- **SSR 다중 인스턴스 시 ID 충돌 — 모든 컴포넌트 해결 (잔여 0건)**
  - 증상: `renderToStaticMarkup`을 컴포넌트당 별도로 여러 번 호출하면 내부 `React.useId()`가 동일한 값(`:R0:`)을 반환해 `clipPath`/`linearGradient`의 `id`가 페이지 내에서 중복됨. 결과적으로 첫 번째 외 인스턴스에서 그라디언트가 깨지거나 path가 비표시되는 버그(특히 지도 마커처럼 같은 컴포넌트를 다수 띄울 때).
  - 두 단계 fix:
    1. **defs 인라인화 (38개)**: `<defs><clipPath>` 정의와 group `transform`을 path 좌표에 미리 굽기. ID 자체가 사라짐. Puppeteer + pixelmatch 픽셀 비교로 변환 전후 시각 동일성 검증(anti-aliasing 임계 내).
    2. **hardcoded prefix (63개)**: 그라디언트 정의가 디자인적으로 의미 있어 인라인화가 어려운 컴포넌트는 `useId()` 결과를 컴포넌트명 기반 hardcoded prefix(예: `kicon-yonginsi-b`)로 일괄 변환. 같은 컴포넌트의 여러 인스턴스가 같은 ID를 공유하지만 정의가 동일하므로 시각적으로 무해. SSR cross-call/hydration 모두 안전.
  - 결과: 빌드 dist에서 `React.useId()` 호출 0회. 모든 컴포넌트가 `renderToStaticMarkup` 다중 호출에서 결정적·시각 동일.
- **AnyangSi의 하드코딩 `id="a"` (참조도 안 되는 dead `<defs>`) 제거** — CSR 환경에서도 다중 인스턴스 시 충돌하던 케이스

## [1.0.2] - 2026-03-20

### Fixed

- 경상북도(Gyeongbuk) CI 아이콘 가운데 정렬 수정 — SVG `transform` 이중 보정으로 아이콘이 위로 치우치는 버그

### Changed

- example 의존성을 `file:..` → `link:..`로 변경 (symlink 방식으로 빌드 즉시 반영)

## [1.0.1] - 2026-03-19

### Added

- 경기도 시군구 16개 추가 (31개 전체 커버)
- README에 전체 시군구 법정동코드 상세 테이블 추가

### Fixed

- 의정부시 행정구역 코드 수정 (41550 → 41150)
- 강원특별자치도 코드 수정 (42 → 51, 시군구 18개 포함)
- 전북특별자치도 코드 수정 (45 → 52, 시군구 14개 포함)

## [1.0.0] - 2026-03-18

### Changed

- 패키지명 변경: `@apt.today/react-seoul-icons` → `@apt.today/react-korea-icons`

### Added

- 전국 17개 광역자치단체 CI 아이콘
- 210개 기초자치단체 로고 아이콘
- 광역자치단체 카드 필터 토글 UI

---

> 아래는 이전 패키지 `@apt.today/react-seoul-icons` 기록입니다.

## [1.2.1] - 2026-03-10

### Fixed

- SVG `linearGradient`·`clipPath`의 정적 `id`가 HTML 문서 전역에서 충돌하여, 같은 페이지에 아이콘 여러 개를 렌더링할 때 색상이 깨지는 문제 수정
- 영향받는 19개 컴포넌트에 `React.useId()` 적용하여 인스턴스별 유니크 ID 생성

### Added

- 예제 앱에 아이콘 크기 조절 슬라이더 추가 (16px ~ 128px)

## [1.2.0] - 2025-06-15

### Changed

- v2 API 리디자인: `utils` 네임스페이스로 통합
  - `getSidoIcon()` → `utils.getIcon()`
  - `getIconByName()` → `utils.findByName()`
  - `getAllDistrictInfo()` → `utils.getAll()`
  - `getDistrictsByRegion()` → `utils.getByRegion()`

### Added

- 울산광역시 아이콘 (울산, 남구, 중구, 울주군)
- 경기도 아이콘 확장 (14개 시)
- `utils.getAvailableRegions()`, `utils.getRegionsWithIcons()`, `utils.isValid()` 추가
- `findByName()`에 `region` 옵션 지원 (중복 이름 구분)

## [1.1.0] - 2025-05-20

### Added

- 시도/시군구 계층 구조 도입
- 부산, 대구, 인천 시도 아이콘 및 일부 시군구 추가
- 전국 확장 기반 마련

## [1.0.1] - 2025-05-10

### Fixed

- 저장소 이름 변경 (`apt-today-react-korea-icons`)
- README 뱃지, 데모 페이지 링크 추가

## [1.0.0] - 2025-05-01

### Added

- 서울특별시 25개 자치구 공식 로고 아이콘
- `getIconByCode()`, `getIconByName()` 헬퍼 함수
- GitHub Pages 데모 사이트
- TypeScript 지원
