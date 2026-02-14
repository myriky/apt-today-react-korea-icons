import {
  // 시도
  Seoul,
  Gyeonggi,
  Busan,
  Ulsan,
  Daegu,
  Incheon,
  // 서울 시군구
  DobongGu,
  DongdaemunGu,
  DongjakGu,
  EunpyeongGu,
  GangbukGu,
  GangdongGu,
  GangnamGu,
  GangseoGu,
  GeumcheonGu,
  GuroGu,
  GwanakGu,
  GwangjinGu,
  JongnoGu,
  JungGu,
  JungnangGu,
  MapoGu,
  NowonGu,
  SeochoGu,
  SeodaemunGu,
  SeongbukGu,
  SeongdongGu,
  SongpaGu,
  YangcheonGu,
  YeongdeungpoGu,
  YongsanGu,
  // 경기도 시군구
  SuwonSi,
  GoyangSi,
  YonginSi,
  HwaseongSi,
  SeongnamSi,
  AnyangSi,
  GwangmyeongSi,
  GwacheonSi,
  GuriSi,
  NamyangjuSi,
  HanamSi,
  UiwangSi,
  GimpoSi,
  PajuSi,
  UijeongbuSi,
  // 부산 시군구
  HaeundaeGu,
  // 울산 시군구
  UlsanJungGu,
  UlsanNamGu,
  UlsanDongGu,
  UlsanBukGu,
  UlsanUljuGun,
  // 대구 시군구
  SuseongGu,
  // 인천 시군구
  YeonsuGu,
} from "./components";

import type { IconComponent, IconInfo, RegionInfo } from "./types";

// ============================================
// 내부 데이터
// ============================================

const regionData: RegionInfo[] = [
  {
    code: 11,
    name: "서울특별시",
    shortName: "서울",
    englishName: "Seoul",
    component: Seoul,
  },
  {
    code: 26,
    name: "부산광역시",
    shortName: "부산",
    englishName: "Busan",
    component: Busan,
  },
  {
    code: 27,
    name: "대구광역시",
    shortName: "대구",
    englishName: "Daegu",
    component: Daegu,
  },
  {
    code: 28,
    name: "인천광역시",
    shortName: "인천",
    englishName: "Incheon",
    component: Incheon,
  },
  {
    code: 29,
    name: "광주광역시",
    shortName: "광주",
    englishName: "Gwangju",
    component: null,
  },
  {
    code: 30,
    name: "대전광역시",
    shortName: "대전",
    englishName: "Daejeon",
    component: null,
  },
  {
    code: 31,
    name: "울산광역시",
    shortName: "울산",
    englishName: "Ulsan",
    component: Ulsan,
  },
  {
    code: 36,
    name: "세종특별자치시",
    shortName: "세종",
    englishName: "Sejong",
    component: null,
  },
  {
    code: 41,
    name: "경기도",
    shortName: "경기",
    englishName: "Gyeonggi",
    component: Gyeonggi,
  },
  {
    code: 42,
    name: "강원특별자치도",
    shortName: "강원",
    englishName: "Gangwon",
    component: null,
  },
  {
    code: 43,
    name: "충청북도",
    shortName: "충북",
    englishName: "Chungbuk",
    component: null,
  },
  {
    code: 44,
    name: "충청남도",
    shortName: "충남",
    englishName: "Chungnam",
    component: null,
  },
  {
    code: 45,
    name: "전북특별자치도",
    shortName: "전북",
    englishName: "Jeonbuk",
    component: null,
  },
  {
    code: 46,
    name: "전라남도",
    shortName: "전남",
    englishName: "Jeonnam",
    component: null,
  },
  {
    code: 47,
    name: "경상북도",
    shortName: "경북",
    englishName: "Gyeongbuk",
    component: null,
  },
  {
    code: 48,
    name: "경상남도",
    shortName: "경남",
    englishName: "Gyeongnam",
    component: null,
  },
  {
    code: 50,
    name: "제주특별자치도",
    shortName: "제주",
    englishName: "Jeju",
    component: null,
  },
];

interface InternalIconData {
  code: number;
  regionCode: number;
  name: string;
  shortName: string;
  componentName: string;
  component: IconComponent;
}

const iconData: InternalIconData[] = [
  // 서울특별시
  {
    code: 11110,
    regionCode: 11,
    name: "종로구",
    shortName: "종로",
    componentName: "JongnoGu",
    component: JongnoGu,
  },
  {
    code: 11140,
    regionCode: 11,
    name: "중구",
    shortName: "중",
    componentName: "JungGu",
    component: JungGu,
  },
  {
    code: 11170,
    regionCode: 11,
    name: "용산구",
    shortName: "용산",
    componentName: "YongsanGu",
    component: YongsanGu,
  },
  {
    code: 11200,
    regionCode: 11,
    name: "성동구",
    shortName: "성동",
    componentName: "SeongdongGu",
    component: SeongdongGu,
  },
  {
    code: 11215,
    regionCode: 11,
    name: "광진구",
    shortName: "광진",
    componentName: "GwangjinGu",
    component: GwangjinGu,
  },
  {
    code: 11230,
    regionCode: 11,
    name: "동대문구",
    shortName: "동대문",
    componentName: "DongdaemunGu",
    component: DongdaemunGu,
  },
  {
    code: 11260,
    regionCode: 11,
    name: "중랑구",
    shortName: "중랑",
    componentName: "JungnangGu",
    component: JungnangGu,
  },
  {
    code: 11290,
    regionCode: 11,
    name: "성북구",
    shortName: "성북",
    componentName: "SeongbukGu",
    component: SeongbukGu,
  },
  {
    code: 11305,
    regionCode: 11,
    name: "강북구",
    shortName: "강북",
    componentName: "GangbukGu",
    component: GangbukGu,
  },
  {
    code: 11320,
    regionCode: 11,
    name: "도봉구",
    shortName: "도봉",
    componentName: "DobongGu",
    component: DobongGu,
  },
  {
    code: 11350,
    regionCode: 11,
    name: "노원구",
    shortName: "노원",
    componentName: "NowonGu",
    component: NowonGu,
  },
  {
    code: 11380,
    regionCode: 11,
    name: "은평구",
    shortName: "은평",
    componentName: "EunpyeongGu",
    component: EunpyeongGu,
  },
  {
    code: 11410,
    regionCode: 11,
    name: "서대문구",
    shortName: "서대문",
    componentName: "SeodaemunGu",
    component: SeodaemunGu,
  },
  {
    code: 11440,
    regionCode: 11,
    name: "마포구",
    shortName: "마포",
    componentName: "MapoGu",
    component: MapoGu,
  },
  {
    code: 11470,
    regionCode: 11,
    name: "양천구",
    shortName: "양천",
    componentName: "YangcheonGu",
    component: YangcheonGu,
  },
  {
    code: 11500,
    regionCode: 11,
    name: "강서구",
    shortName: "강서",
    componentName: "GangseoGu",
    component: GangseoGu,
  },
  {
    code: 11530,
    regionCode: 11,
    name: "구로구",
    shortName: "구로",
    componentName: "GuroGu",
    component: GuroGu,
  },
  {
    code: 11545,
    regionCode: 11,
    name: "금천구",
    shortName: "금천",
    componentName: "GeumcheonGu",
    component: GeumcheonGu,
  },
  {
    code: 11560,
    regionCode: 11,
    name: "영등포구",
    shortName: "영등포",
    componentName: "YeongdeungpoGu",
    component: YeongdeungpoGu,
  },
  {
    code: 11590,
    regionCode: 11,
    name: "동작구",
    shortName: "동작",
    componentName: "DongjakGu",
    component: DongjakGu,
  },
  {
    code: 11620,
    regionCode: 11,
    name: "관악구",
    shortName: "관악",
    componentName: "GwanakGu",
    component: GwanakGu,
  },
  {
    code: 11650,
    regionCode: 11,
    name: "서초구",
    shortName: "서초",
    componentName: "SeochoGu",
    component: SeochoGu,
  },
  {
    code: 11680,
    regionCode: 11,
    name: "강남구",
    shortName: "강남",
    componentName: "GangnamGu",
    component: GangnamGu,
  },
  {
    code: 11710,
    regionCode: 11,
    name: "송파구",
    shortName: "송파",
    componentName: "SongpaGu",
    component: SongpaGu,
  },
  {
    code: 11740,
    regionCode: 11,
    name: "강동구",
    shortName: "강동",
    componentName: "GangdongGu",
    component: GangdongGu,
  },
  // 경기도
  {
    code: 41110,
    regionCode: 41,
    name: "수원시",
    shortName: "수원",
    componentName: "SuwonSi",
    component: SuwonSi,
  },
  {
    code: 41280,
    regionCode: 41,
    name: "고양시",
    shortName: "고양",
    componentName: "GoyangSi",
    component: GoyangSi,
  },
  {
    code: 41460,
    regionCode: 41,
    name: "용인시",
    shortName: "용인",
    componentName: "YonginSi",
    component: YonginSi,
  },
  {
    code: 41590,
    regionCode: 41,
    name: "화성시",
    shortName: "화성",
    componentName: "HwaseongSi",
    component: HwaseongSi,
  },
  {
    code: 41130,
    regionCode: 41,
    name: "성남시",
    shortName: "성남",
    componentName: "SeongnamSi",
    component: SeongnamSi,
  },
  {
    code: 41170,
    regionCode: 41,
    name: "안양시",
    shortName: "안양",
    componentName: "AnyangSi",
    component: AnyangSi,
  },
  {
    code: 41210,
    regionCode: 41,
    name: "광명시",
    shortName: "광명",
    componentName: "GwangmyeongSi",
    component: GwangmyeongSi,
  },
  {
    code: 41290,
    regionCode: 41,
    name: "과천시",
    shortName: "과천",
    componentName: "GwacheonSi",
    component: GwacheonSi,
  },
  {
    code: 41310,
    regionCode: 41,
    name: "구리시",
    shortName: "구리",
    componentName: "GuriSi",
    component: GuriSi,
  },
  {
    code: 41360,
    regionCode: 41,
    name: "남양주시",
    shortName: "남양주",
    componentName: "NamyangjuSi",
    component: NamyangjuSi,
  },
  {
    code: 41450,
    regionCode: 41,
    name: "하남시",
    shortName: "하남",
    componentName: "HanamSi",
    component: HanamSi,
  },
  {
    code: 41430,
    regionCode: 41,
    name: "의왕시",
    shortName: "의왕",
    componentName: "UiwangSi",
    component: UiwangSi,
  },
  {
    code: 41570,
    regionCode: 41,
    name: "김포시",
    shortName: "김포",
    componentName: "GimpoSi",
    component: GimpoSi,
  },
  {
    code: 41480,
    regionCode: 41,
    name: "파주시",
    shortName: "파주",
    componentName: "PajuSi",
    component: PajuSi,
  },
  {
    code: 41550,
    regionCode: 41,
    name: "의정부시",
    shortName: "의정부",
    componentName: "UijeongbuSi",
    component: UijeongbuSi,
  },
  // 부산광역시
  {
    code: 26350,
    regionCode: 26,
    name: "해운대구",
    shortName: "해운대",
    componentName: "HaeundaeGu",
    component: HaeundaeGu,
  },
  // 울산광역시
  {
    code: 31110,
    regionCode: 31,
    name: "중구",
    shortName: "중",
    componentName: "UlsanJungGu",
    component: UlsanJungGu,
  },
  {
    code: 31140,
    regionCode: 31,
    name: "남구",
    shortName: "남",
    componentName: "UlsanNamGu",
    component: UlsanNamGu,
  },
  {
    code: 31170,
    regionCode: 31,
    name: "동구",
    shortName: "동",
    componentName: "UlsanDongGu",
    component: UlsanDongGu,
  },
  {
    code: 31200,
    regionCode: 31,
    name: "북구",
    shortName: "북",
    componentName: "UlsanBukGu",
    component: UlsanBukGu,
  },
  {
    code: 31710,
    regionCode: 31,
    name: "울주군",
    shortName: "울주",
    componentName: "UlsanUljuGun",
    component: UlsanUljuGun,
  },
  // 대구광역시
  {
    code: 27260,
    regionCode: 27,
    name: "수성구",
    shortName: "수성",
    componentName: "SuseongGu",
    component: SuseongGu,
  },
  // 인천광역시
  {
    code: 28185,
    regionCode: 28,
    name: "연수구",
    shortName: "연수",
    componentName: "YeonsuGu",
    component: YeonsuGu,
  },
];

// ============================================
// 내부 조회용 맵 (초기화)
// ============================================

const regionCodeMap = new Map<number, RegionInfo>(
  regionData.map((r) => [r.code, r]),
);

const regionShortNameMap = new Map<string, RegionInfo>(
  regionData.map((r) => [r.shortName, r]),
);

const iconCodeMap = new Map<number, InternalIconData>(
  iconData.map((i) => [i.code, i]),
);

// 이름 → 아이콘 데이터 (중복 가능)
const nameToIconMap = new Map<string, InternalIconData[]>();

function addToNameMap(key: string, data: InternalIconData) {
  const existing = nameToIconMap.get(key);
  if (existing) {
    existing.push(data);
  } else {
    nameToIconMap.set(key, [data]);
  }
}

iconData.forEach((icon) => {
  const region = regionCodeMap.get(icon.regionCode);
  if (region) {
    addToNameMap(icon.name, icon); // "강남구"
    addToNameMap(icon.shortName, icon); // "강남"
    addToNameMap(`${region.name} ${icon.name}`, icon); // "서울특별시 강남구"
    addToNameMap(`${region.shortName} ${icon.name}`, icon); // "서울 강남구"
  }
});

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
    const list = nameToIconMap.get(name);
    if (!list || list.length === 0) return null;

    if (options?.region) {
      const region = regionShortNameMap.get(options.region);
      if (!region) return null;
      const filtered = list.filter((i) => i.regionCode === region.code);
      return filtered.length === 1 ? filtered[0].component : null;
    }

    return list.length === 1 ? list[0].component : null;
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
    let code: number | undefined;

    if (typeof regionCodeOrName === "number") {
      code = regionCodeOrName;
    } else {
      code = regionShortNameMap.get(regionCodeOrName)?.code;
    }

    if (code === undefined) return [];
    return iconData.filter((i) => i.regionCode === code).map(toIconInfo);
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
    return regionData.filter((r) => {
      return iconData.some((i) => i.regionCode === r.code);
    });
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
    if (code < 100) return regionCodeMap.has(code);
    return iconCodeMap.has(code);
  },
};
