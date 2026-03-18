# Changelog

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
