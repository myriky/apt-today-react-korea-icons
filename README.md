# @apt.today/react-seoul-icons

[![npm version](https://img.shields.io/npm/v/@apt.today/react-seoul-icons.svg?style=flat-square)](https://www.npmjs.com/package/@apt.today/react-seoul-icons)
[![npm downloads](https://img.shields.io/npm/dm/@apt.today/react-seoul-icons.svg?style=flat-square)](https://www.npmjs.com/package/@apt.today/react-seoul-icons)
[![GitHub stars](https://img.shields.io/github/stars/myriky/apt-today-react-seoul-icons.svg?style=flat-square)](https://github.com/myriky/apt-today-react-seoul-icons)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Custom-orange.svg?style=flat-square)](./LICENSE)

![Seoul Icons Preview](https://myriky.github.io/apt-today-react-seoul-icons/preview.png)

대한민국 광역자치단체(시/도) 및 기초자치단체(시/군/구) 로고 아이콘을 React 컴포넌트로 제공하는 라이브러리입니다.

[데모 페이지](https://myriky.github.io/apt-today-react-seoul-icons/)

## 설치

```bash
npm install @apt.today/react-seoul-icons
```

```bash
yarn add @apt.today/react-seoul-icons
```

## 사용법

### 컴포넌트 직접 사용

아이콘을 직접 import해서 React 컴포넌트로 사용합니다.

```tsx
import { GangnamGu, Seoul, MapoGu } from "@apt.today/react-seoul-icons";

function App() {
  return (
    <div>
      <Seoul width={64} height={64} />
      <GangnamGu className="w-12 h-12" />
      <MapoGu style={{ width: 48, height: 48 }} />
    </div>
  );
}
```

### 유틸리티로 동적 조회

코드나 이름으로 아이콘을 동적으로 가져올 때는 `utils`를 사용합니다.

```tsx
import { utils } from "@apt.today/react-seoul-icons";

// 코드로 아이콘 가져오기 (시도 2자리 / 시군구 5자리 자동 판별)
const SeoulIcon = utils.getIcon(11);      // 서울특별시
const GangnamIcon = utils.getIcon(11680); // 강남구

// 이름으로 아이콘 검색
const Icon = utils.findByName("강남구");
const Icon2 = utils.findByName("강남");
const Icon3 = utils.findByName("서울특별시 강남구");
const Icon4 = utils.findByName("서울 강남구");

// 중복 이름(중구 등)은 region 옵션으로 구분
const JungGu = utils.findByName("중구", { region: "서울" });
```

### 지역별 목록 조회

```tsx
import { utils } from "@apt.today/react-seoul-icons";

// 시도별 시군구 목록
const seoulIcons = utils.getByRegion(11);      // 코드로
const gyeonggiIcons = utils.getByRegion("경기"); // 이름으로

// 전체 시도 목록
const regions = utils.getAllRegions();

// 전체 시군구 목록
const allIcons = utils.getAll();

function DistrictList() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {seoulIcons.map((icon) => (
        <div key={icon.code} className="flex flex-col items-center">
          <icon.component className="w-12 h-12" />
          <span>{icon.name}</span>
        </div>
      ))}
    </div>
  );
}
```

### API 응답에서 동적으로 사용

```tsx
import { utils } from "@apt.today/react-seoul-icons";

// 행정구역 코드를 받은 경우
function DistrictIcon({ code }: { code: number }) {
  const Icon = utils.getIcon(code);
  if (!Icon) return null;
  return <Icon width={48} height={48} />;
}

// 지역명을 받은 경우
function DistrictIconByName({ name }: { name: string }) {
  const Icon = utils.findByName(name);
  if (!Icon) return null;
  return <Icon width={48} height={48} />;
}
```

## API

### 아이콘 컴포넌트

모든 아이콘 컴포넌트는 `React.SVGProps<SVGSVGElement>`를 지원합니다.

```tsx
<GangnamGu width={48} height={48} />
<GangnamGu className="w-12 h-12" />
<GangnamGu style={{ width: 48 }} />
```

### utils

| 메서드 | 설명 | 반환 타입 |
| --- | --- | --- |
| `utils.getIcon(code)` | 시도/시군구 코드로 아이콘 가져오기 | `IconComponent \| null` |
| `utils.findByName(name, options?)` | 이름으로 아이콘 검색 | `IconComponent \| null` |
| `utils.getInfo(code)` | 코드로 상세 정보 가져오기 | `IconInfo \| RegionInfo \| null` |
| `utils.getByRegion(codeOrName)` | 특정 시도의 시군구 목록 | `IconInfo[]` |
| `utils.getAllRegions()` | 모든 시도 정보 | `RegionInfo[]` |
| `utils.getAvailableRegions()` | 아이콘이 있는 시도만 | `RegionInfo[]` |
| `utils.getRegionsWithIcons()` | 시군구가 있는 시도만 | `RegionInfo[]` |
| `utils.getAll()` | 모든 시군구 아이콘 정보 | `IconInfo[]` |
| `utils.isValid(code)` | 유효한 코드인지 확인 | `boolean` |

### 타입

```tsx
import type { IconComponent, IconInfo, RegionInfo } from "@apt.today/react-seoul-icons";

// IconComponent
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// IconInfo - 시군구 아이콘 정보
interface IconInfo {
  code: number;          // 시군구 코드 (예: 11680)
  regionCode: number;    // 소속 시도 코드 (예: 11)
  regionName: string;    // 소속 시도명 (예: "서울특별시")
  name: string;          // 이름 (예: "강남구")
  shortName: string;     // 단축명 (예: "강남")
  componentName: string; // 컴포넌트명 (예: "GangnamGu")
  component: IconComponent;
}

// RegionInfo - 시도 정보
interface RegionInfo {
  code: number;               // 시도 코드 (예: 11)
  name: string;               // 전체 이름 (예: "서울특별시")
  shortName: string;          // 단축명 (예: "서울")
  englishName: string;        // 영문명 (예: "Seoul")
  component: IconComponent | null;
}
```

## 지원 행정구역

### 시도 (광역시/도)

| 시도 | 코드 | 컴포넌트명 |
| --- | --- | --- |
| 서울특별시 | `11` | `Seoul` |
| 부산광역시 | `26` | `Busan` |
| 대구광역시 | `27` | `Daegu` |
| 인천광역시 | `28` | `Incheon` |
| 울산광역시 | `31` | `Ulsan` |
| 경기도 | `41` | `Gyeonggi` |

### 시군구

- **서울특별시**: 25개 자치구 (강남구, 종로구, 마포구 등)
- **경기도**: 14개 시 (수원시, 고양시, 용인시, 화성시, 성남시, 안양시, 광명시, 과천시, 구리시, 남양주시, 하남시, 의왕시, 김포시, 파주시)
- **부산광역시**: 해운대구
- **대구광역시**: 수성구
- **인천광역시**: 연수구
- **울산광역시**: 남구

## v1에서 마이그레이션

v2에서는 API가 `utils` 네임스페이스로 통합되었습니다.

| v1 | v2 |
| --- | --- |
| `getSidoIcon(11)` | `utils.getIcon(11)` |
| `getSigunguIcon(11680)` | `utils.getIcon(11680)` |
| `getIconByCode(11680)` | `utils.getIcon(11680)` |
| `getIconByName("강남구")` | `utils.findByName("강남구")` |
| `getSigunguIconByName("강남구")` | `utils.findByName("강남구")` |
| `getAllDistrictInfo()` | `utils.getAll()` |
| `getAllSigunguInfo()` | `utils.getAll()` |
| `getDistrictsByRegion("서울")` | `utils.getByRegion("서울")` |
| `getSigunguBySido(11)` | `utils.getByRegion(11)` |
| `getAllSidoInfo()` | `utils.getAllRegions()` |
| `type SidoInfo` | `type RegionInfo` |
| `type SigunguInfo` | `type IconInfo` |
| `type DistrictInfo` | `type IconInfo` |

아이콘 컴포넌트의 직접 import는 변경 없이 동일합니다:

```tsx
// v1과 v2 모두 동일
import { GangnamGu, Seoul } from "@apt.today/react-seoul-icons";
```

## 라이선스

### 아이콘 저작권

본 라이브러리의 아이콘은 각 지방자치단체의 공식 심볼/로고로, 공공누리 제1유형(출처표시)에 따라 자유롭게 이용할 수 있습니다.

### 라이브러리 코드

본 라이브러리의 소스 코드는 MIT 라이선스를 따릅니다.

자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

## About apt.today

이 라이브러리는 [apt.today](https://apt.today) 프로젝트의 일부입니다.

**apt.today**는 부동산 정보를 제공하는 서비스로, 전국 지자체별 고시공고문, 모집공고문, 토지거래허가내역을 비롯한 다양한 아파트 관련 정보를 확인 할 수 있는 플랫폼입니다.

## 기여

이슈 제보 및 풀 리퀘스트는 언제나 환영합니다!
