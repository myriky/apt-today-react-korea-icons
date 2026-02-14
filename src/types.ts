import * as React from "react";

/**
 * 아이콘 컴포넌트 타입
 */
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 시도(광역자치단체) 정보
 */
export interface RegionInfo {
  /** 시도 코드 (2자리, 예: 11 = 서울특별시) */
  code: number;
  /** 전체 이름 (예: "서울특별시") */
  name: string;
  /** 단축명 (예: "서울") */
  shortName: string;
  /** 영문명 (예: "Seoul") */
  englishName: string;
  /** 아이콘 컴포넌트 (없으면 null) */
  component: IconComponent | null;
}

/**
 * 시군구(기초자치단체) 아이콘 정보
 */
export interface IconInfo {
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
  /** 컴포넌트 영문명 (예: "GangnamGu") */
  componentName: string;
  /** 아이콘 컴포넌트 */
  component: IconComponent;
}
