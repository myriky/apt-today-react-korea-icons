# Changelog

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
