// 코드·이름 조회 인덱스 (utils와 meta가 같은 규칙을 쓰도록 공유한다)
// 컴포넌트를 import하지 않는다.

interface RegionLike {
  code: number;
  name: string;
  shortName: string;
}

interface IconLike {
  code: number;
  regionCode: number;
  name: string;
  shortName: string;
}

export function createIndex<R extends RegionLike, I extends IconLike>(
  regions: readonly R[],
  icons: readonly I[],
) {
  const regionCodeMap = new Map<number, R>(regions.map((r) => [r.code, r]));
  const regionShortNameMap = new Map<string, R>(regions.map((r) => [r.shortName, r]));
  const iconCodeMap = new Map<number, I>(icons.map((i) => [i.code, i]));

  // 이름 → 아이콘 데이터 (중복 가능)
  const nameToIconMap = new Map<string, I[]>();
  const addToNameMap = (key: string, data: I) => {
    const existing = nameToIconMap.get(key);
    if (existing) {
      existing.push(data);
    } else {
      nameToIconMap.set(key, [data]);
    }
  };

  icons.forEach((icon) => {
    const region = regionCodeMap.get(icon.regionCode);
    if (region) {
      addToNameMap(icon.name, icon); // "강남구"
      addToNameMap(icon.shortName, icon); // "강남"
      addToNameMap(`${region.name} ${icon.name}`, icon); // "서울특별시 강남구"
      addToNameMap(`${region.shortName} ${icon.name}`, icon); // "서울 강남구"
    }
  });

  /** 이름으로 시군구 하나를 찾는다. 결과가 여러 개면(중복 이름) null */
  function findIconByName(name: string, options?: { region?: string }): I | null {
    const list = nameToIconMap.get(name);
    if (!list || list.length === 0) return null;

    if (options?.region) {
      const region = regionShortNameMap.get(options.region);
      if (!region) return null;
      const filtered = list.filter((i) => i.regionCode === region.code);
      return filtered.length === 1 ? filtered[0] : null;
    }

    return list.length === 1 ? list[0] : null;
  }

  /** 시도 코드(숫자) 또는 단축명(문자열)으로 소속 시군구 목록 */
  function iconsInRegion(regionCodeOrName: number | string): I[] {
    const code =
      typeof regionCodeOrName === "number"
        ? regionCodeOrName
        : regionShortNameMap.get(regionCodeOrName)?.code;
    if (code === undefined) return [];
    return icons.filter((i) => i.regionCode === code);
  }

  function regionsWithIcons(): R[] {
    return regions.filter((r) => icons.some((i) => i.regionCode === r.code));
  }

  function isValid(code: number): boolean {
    if (code < 100) return regionCodeMap.has(code);
    return iconCodeMap.has(code);
  }

  return {
    regionCodeMap,
    iconCodeMap,
    findIconByName,
    iconsInRegion,
    regionsWithIcons,
    isValid,
  };
}
