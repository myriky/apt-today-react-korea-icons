import * as Icons from "./components";
import { ICON_RECORDS, REGION_RECORDS } from "./data";
import { createIndex } from "./registry";

import type { IconComponent, IconInfo, RegionInfo } from "./types";

// ============================================
// 내부 데이터 (메타데이터 + 컴포넌트 연결)
// ============================================

const iconComponents = Icons as unknown as Record<string, IconComponent | undefined>;

function componentOf(name: string): IconComponent {
  const component = iconComponents[name];
  if (!component) throw new Error(`[react-korea-icons] 컴포넌트를 찾을 수 없음: ${name}`);
  return component;
}

const regionData: RegionInfo[] = REGION_RECORDS.map((r) => ({
  code: r.code,
  name: r.name,
  shortName: r.shortName,
  englishName: r.englishName,
  component: r.componentName ? componentOf(r.componentName) : null,
}));

interface InternalIconData {
  code: number;
  regionCode: number;
  name: string;
  shortName: string;
  componentName: string;
  component: IconComponent;
}

const iconData: InternalIconData[] = ICON_RECORDS.map((i) => ({
  ...i,
  component: componentOf(i.componentName),
}));

const index = createIndex(regionData, iconData);
const { regionCodeMap, iconCodeMap } = index;

// ============================================
// 내부 헬퍼
// ============================================

function toIconInfo(data: InternalIconData): IconInfo {
  const region = regionCodeMap.get(data.regionCode);
  return {
    code: data.code,
    regionCode: data.regionCode,
    regionName: region?.name ?? "",
    name: data.name,
    shortName: data.shortName,
    componentName: data.componentName,
    component: data.component,
  };
}

// ============================================
// Public utils 객체
// ============================================

export const utils = {
  /**
   * 코드로 아이콘 컴포넌트를 가져옵니다.
   * 시도 코드(2자리)와 시군구 코드(5자리)를 자동으로 판별합니다.
   *
   * @example
   * utils.getIcon(11)    // 서울특별시
   * utils.getIcon(11680) // 강남구
   */
  getIcon(code: number): IconComponent | null {
    // 시도 코드 (2자리)
    if (code < 100) {
      return regionCodeMap.get(code)?.component ?? null;
    }
    // 시군구 코드 (5자리)
    return iconCodeMap.get(code)?.component ?? null;
  },

  /**
   * 이름으로 아이콘 컴포넌트를 검색합니다.
   * 다양한 형식을 지원합니다.
   *
   * @example
   * utils.findByName("강남구")              // OK
   * utils.findByName("강남")                // OK
   * utils.findByName("서울특별시 강남구")    // OK
   * utils.findByName("서울 강남구")         // OK
   * utils.findByName("중구", { region: "서울" }) // 중복 이름 해소
   */
  findByName(
    name: string,
    options?: { region?: string },
  ): IconComponent | null {
    return index.findIconByName(name, options)?.component ?? null;
  },

  /**
   * 코드로 아이콘 상세 정보를 가져옵니다.
   * 시도 코드(2자리)는 RegionInfo를, 시군구 코드(5자리)는 IconInfo를 반환합니다.
   *
   * @example
   * utils.getInfo(11680)  // { code: 11680, name: "강남구", regionName: "서울특별시", ... }
   */
  getInfo(code: number): IconInfo | RegionInfo | null {
    if (code < 100) {
      return regionCodeMap.get(code) ?? null;
    }
    const data = iconCodeMap.get(code);
    return data ? toIconInfo(data) : null;
  },

  /**
   * 특정 시도에 속한 모든 시군구 아이콘 정보를 반환합니다.
   * 시도 코드(숫자) 또는 단축명(문자열) 모두 사용 가능합니다.
   *
   * @example
   * utils.getByRegion(11)     // 서울시 모든 구
   * utils.getByRegion("서울") // 서울시 모든 구
   * utils.getByRegion("경기") // 경기도 모든 시
   */
  getByRegion(regionCodeOrName: number | string): IconInfo[] {
    return index.iconsInRegion(regionCodeOrName).map(toIconInfo);
  },

  /**
   * 모든 시도(광역자치단체) 정보를 반환합니다.
   *
   * @example
   * const regions = utils.getAllRegions()
   * // [{ code: 11, name: "서울특별시", ... }, ...]
   */
  getAllRegions(): readonly RegionInfo[] {
    return regionData;
  },

  /**
   * 아이콘이 있는 시도 정보만 반환합니다.
   */
  getAvailableRegions(): RegionInfo[] {
    return regionData.filter((r) => r.component !== null);
  },

  /**
   * 시군구가 있는 시도 정보만 반환합니다.
   */
  getRegionsWithIcons(): RegionInfo[] {
    return index.regionsWithIcons();
  },

  /**
   * 모든 시군구 아이콘 정보를 반환합니다.
   *
   * @example
   * const all = utils.getAll()
   * all.map(icon => <icon.component key={icon.code} width={48} />)
   */
  getAll(): readonly IconInfo[] {
    return iconData.map(toIconInfo);
  },

  /**
   * 유효한 시도 또는 시군구 코드인지 확인합니다.
   *
   * @example
   * utils.isValid(11680)  // true (강남구)
   * utils.isValid(11)     // true (서울특별시)
   * utils.isValid(99999)  // false
   */
  isValid(code: number): boolean {
    return index.isValid(code);
  },
};
