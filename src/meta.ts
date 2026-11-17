// @apt.today/react-korea-icons/meta
// 컴포넌트를 import하지 않는 조회 전용 entry. 코드·이름으로 지역 정보와 정적 SVG 파일 이름을 찾는다.
// 정적 SVG는 패키지의 dist/svg/{componentName}.svg (exports: "@apt.today/react-korea-icons/svg/*")
import { ICON_RECORDS, REGION_RECORDS } from "./data";
import { createIndex } from "./registry";

/** 시도(광역자치단체) 메타데이터 */
export interface RegionMeta {
  /** 시도 코드 (2자리, 예: 11 = 서울특별시) */
  code: number;
  /** 전체 이름 (예: "서울특별시") */
  name: string;
  /** 단축명 (예: "서울") */
  shortName: string;
  /** 영문명 (예: "Seoul") */
  englishName: string;
  /** 아이콘 컴포넌트 이름 = 정적 SVG 파일 이름(확장자 제외). 아이콘이 없으면 null */
  componentName: string | null;
}

/** 시군구(기초자치단체) 메타데이터 */
export interface IconMeta {
  /** 시군구 코드 (5자리, 예: 11680 = 강남구) */
  code: number;
  /** 소속 시도 코드 (2자리) */
  regionCode: number;
  /** 소속 시도명 (예: "서울특별시") */
  regionName: string;
  /** 이름 (예: "강남구") */
  name: string;
  /** 단축명 (예: "강남") */
  shortName: string;
  /** 아이콘 컴포넌트 이름 = 정적 SVG 파일 이름(확장자 제외) */
  componentName: string;
}

// 반환 객체는 내부 데이터를 그대로 공유하므로 수정하지 못하게 고정한다.
const regionData: RegionMeta[] = REGION_RECORDS.map((r) => Object.freeze({ ...r }));
const iconData: IconMeta[] = ICON_RECORDS.map((i) =>
  Object.freeze({
    code: i.code,
    regionCode: i.regionCode,
    regionName: REGION_RECORDS.find((r) => r.code === i.regionCode)?.name ?? "",
    name: i.name,
    shortName: i.shortName,
    componentName: i.componentName,
  }),
);

const index = createIndex(regionData, iconData);

const fileOf = (componentName: string | null | undefined) =>
  componentName ? `${componentName}.svg` : null;

/**
 * 코드로 시도 또는 시군구 정보를 가져옵니다. (utils.getInfo와 같은 규칙, 컴포넌트 없음)
 *
 * @example
 * getByCode(11)    // { code: 11, name: "서울특별시", ... }
 * getByCode(11680) // { code: 11680, name: "강남구", regionName: "서울특별시", ... }
 */
export function getByCode(code: number): RegionMeta | IconMeta | null {
  if (code < 100) return index.regionCodeMap.get(code) ?? null;
  return index.iconCodeMap.get(code) ?? null;
}

/**
 * 코드에 해당하는 정적 SVG 파일 이름(`{componentName}.svg`)을 반환합니다.
 *
 * 일반구 폴백: 5자리 코드에 아이콘이 없고 끝자리가 0이 아니면(예: 성남시 분당구 41135),
 * 끝자리를 0으로 바꾼 소속 시 코드(41130)로 한 번 더 찾습니다. 원래 코드에 아이콘이 있으면 그것을 씁니다.
 *
 * @example
 * iconFile(11680) // "GangnamGu.svg"
 * iconFile(41135) // "SeongnamSi.svg" (소속 시 폴백)
 * iconFile(99999) // null
 */
export function iconFile(code: number): string | null {
  if (code < 100) return fileOf(index.regionCodeMap.get(code)?.componentName);
  const direct = index.iconCodeMap.get(code);
  if (direct) return fileOf(direct.componentName);
  if (code >= 10000 && code < 100000 && code % 10 !== 0) {
    return fileOf(index.iconCodeMap.get(code - (code % 10))?.componentName);
  }
  return null;
}

/**
 * 이름으로 시군구 정보를 찾습니다. (utils.findByName과 같은 규칙, 결과는 컴포넌트 대신 메타데이터)
 * 같은 이름이 여러 개면 null이며, `{ region: "서울" }`처럼 시도 단축명으로 좁힐 수 있습니다.
 */
export function findByName(name: string, options?: { region?: string }): IconMeta | null {
  return index.findIconByName(name, options);
}

/** 특정 시도에 속한 시군구 목록. 시도 코드(숫자) 또는 단축명(문자열) */
export function getByRegion(regionCodeOrName: number | string): IconMeta[] {
  return index.iconsInRegion(regionCodeOrName);
}

/** 모든 시도 */
export function getAllRegions(): readonly RegionMeta[] {
  return regionData;
}

/** 아이콘이 있는 시도 */
export function getAvailableRegions(): RegionMeta[] {
  return regionData.filter((r) => r.componentName !== null);
}

/** 시군구가 있는 시도 */
export function getRegionsWithIcons(): RegionMeta[] {
  return index.regionsWithIcons();
}

/** 모든 시군구 */
export function getAll(): readonly IconMeta[] {
  return iconData;
}

/** 유효한 시도 또는 시군구 코드인지 확인 */
export function isValid(code: number): boolean {
  return index.isValid(code);
}
