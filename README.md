# @apt.today/react-korea-icons

[![npm version](https://img.shields.io/npm/v/@apt.today/react-korea-icons.svg?style=flat-square)](https://www.npmjs.com/package/@apt.today/react-korea-icons)
[![npm downloads](https://img.shields.io/npm/dm/@apt.today/react-korea-icons.svg?style=flat-square)](https://www.npmjs.com/package/@apt.today/react-korea-icons)
[![GitHub stars](https://img.shields.io/github/stars/myriky/apt-today-react-korea-icons.svg?style=flat-square)](https://github.com/myriky/apt-today-react-korea-icons)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Custom-orange.svg?style=flat-square)](./LICENSE)

대한민국 17개 광역자치단체 + 210개 기초자치단체 공식 로고를 React 컴포넌트로 제공합니다.

![Screenshot of a react-korea-icons](https://private-user-images.githubusercontent.com/581861/565518382-67ceccb4-133d-4a1b-ae54-27f1e589461f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzM4MzM3MTgsIm5iZiI6MTc3MzgzMzQxOCwicGF0aCI6Ii81ODE4NjEvNTY1NTE4MzgyLTY3Y2VjY2I0LTEzM2QtNGExYi1hZTU0LTI3ZjFlNTg5NDYxZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMxOFQxMTMwMThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04MjRkNWY2OGQzYmVmMGQwODAwM2JlNzlkMDgzYzM1YTVkMWFjODY1MTY3YTYxY2JiNmU3M2NjNDFiMWM1NmZmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9._N6u9C0s728m7q6_4u83WVdHAbDT6ynQaVX1oVjwyYk)

[데모 페이지](https://myriky.github.io/apt-today-react-korea-icons/)

> 이전 패키지명 `@apt.today/react-seoul-icons`에서 전국 확장에 맞춰 이름을 변경했습니다.

## 설치

```bash
npm install @apt.today/react-korea-icons
```

```bash
yarn add @apt.today/react-korea-icons
```

## 사용법

### 컴포넌트 직접 사용

```tsx
import { GangnamGu, Seoul, Busan, HaeundaeGu } from "@apt.today/react-korea-icons";

function App() {
  return (
    <div>
      <Seoul width={64} height={64} />
      <GangnamGu className="w-12 h-12" />
      <Busan style={{ width: 48, height: 48 }} />
      <HaeundaeGu width={48} height={48} />
    </div>
  );
}
```

### 유틸리티로 동적 조회

코드나 이름으로 아이콘을 동적으로 가져올 때는 `utils`를 사용합니다.

```tsx
import { utils } from "@apt.today/react-korea-icons";

// 코드로 아이콘 가져오기 (시도 2자리 / 시군구 5자리 자동 판별)
const SeoulIcon = utils.getIcon(11);      // 서울특별시
const GangnamIcon = utils.getIcon(11680); // 강남구

// 이름으로 아이콘 검색
const Icon = utils.findByName("강남구");
const Icon2 = utils.findByName("해운대구");

// 중복 이름(중구, 동구 등)은 region 옵션으로 구분
const JungGu = utils.findByName("중구", { region: "서울" });
const BusanDongGu = utils.findByName("동구", { region: "부산" });
```

### 지역별 목록 조회

```tsx
import { utils } from "@apt.today/react-korea-icons";

// 시도별 시군구 목록
const seoulIcons = utils.getByRegion(11);      // 코드로
const busanIcons = utils.getByRegion("부산");   // 이름으로

// 전체 시도 목록 (17개)
const regions = utils.getAllRegions();

// 전체 시군구 아이콘 목록 (210개)
const allIcons = utils.getAll();

function DistrictList() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {busanIcons.map((icon) => (
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
import { utils } from "@apt.today/react-korea-icons";

// 행정구역 코드를 받은 경우
function DistrictIcon({ code }: { code: number }) {
  const Icon = utils.getIcon(code);
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
import type { IconComponent, IconInfo, RegionInfo } from "@apt.today/react-korea-icons";

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

17개 광역자치단체 CI + 210개 기초자치단체 로고

| 시도 | 코드 | 컴포넌트명 | 시군구 |
| --- | --- | --- | --- |
| 서울특별시 | `11` | `Seoul` | 25개 (강남구, 종로구, 마포구 등) |
| 부산광역시 | `26` | `Busan` | 16개 (해운대구, 부산진구, 금정구 등) |
| 대구광역시 | `27` | `Daegu` | 9개 (수성구, 달서구, 군위군 등) |
| 인천광역시 | `28` | `Incheon` | 10개 (연수구, 부평구, 강화군 등) |
| 광주광역시 | `29` | `Gwangju` | 5개 (동구, 서구, 남구, 북구, 광산구) |
| 대전광역시 | `30` | `Daejeon` | 5개 (동구, 중구, 서구, 유성구, 대덕구) |
| 울산광역시 | `31` | `Ulsan` | 5개 (남구, 중구, 동구, 북구, 울주군) |
| 세종특별자치시 | `36` | `Sejong` | - |
| 경기도 | `41` | `Gyeonggi` | 15개 (수원시, 고양시, 용인시 등) |
| 강원특별자치도 | `42` | `Gangwon` | 18개 (춘천시, 원주시, 강릉시 등) |
| 충청북도 | `43` | `Chungbuk` | 11개 (청주시, 충주시, 제천시 등) |
| 충청남도 | `44` | `Chungnam` | 15개 (천안시, 아산시, 공주시 등) |
| 전북특별자치도 | `45` | `Jeonbuk` | 14개 (전주시, 군산시, 익산시 등) |
| 전라남도 | `46` | `Jeonnam` | 22개 (목포시, 여수시, 순천시 등) |
| 경상북도 | `47` | `Gyeongbuk` | 22개 (포항시, 경주시, 안동시 등) |
| 경상남도 | `48` | `Gyeongnam` | 18개 (창원시, 진주시, 김해시 등) |
| 제주특별자치도 | `50` | `Jeju` | - |

## react-seoul-icons에서 마이그레이션

패키지명만 변경하면 됩니다. API는 동일합니다.

```diff
- import { GangnamGu, utils } from "@apt.today/react-seoul-icons";
+ import { GangnamGu, utils } from "@apt.today/react-korea-icons";
```

## 라이선스

### 아이콘 저작권

본 라이브러리의 아이콘은 각 지방자치단체의 공식 심볼/로고로, 공공누리 제1유형(출처표시)에 따라 자유롭게 이용할 수 있습니다.

### 라이브러리 코드

MIT 라이선스. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

## About apt.today

이 라이브러리는 [apt.today](https://apt.today) 프로젝트의 일부입니다.

**apt.today**는 전국 지자체별 고시공고문, 모집공고문, 토지거래허가내역을 비롯한 다양한 아파트 관련 정보를 제공하는 플랫폼입니다.

## 기여

이슈 제보 및 풀 리퀘스트는 언제나 환영합니다!
