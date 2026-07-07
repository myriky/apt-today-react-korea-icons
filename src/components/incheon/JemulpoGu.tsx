import * as React from "react";

/**
 * 인천광역시 제물포구 (2026-07-01 신설, 구 중구 내륙 + 동구 통합)
 *
 * ⚠️ 임시 placeholder — 신설 구의 공식 로고가 아직 공표되지 않아
 * 중립 배지 형태로 제공합니다. 공식 심볼 공표 시 교체 예정입니다.
 */
export const JemulpoGu = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" {...props}>
      <circle cx="60" cy="60" r="55" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="5" />
      <text
        x="60"
        y="63"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
        fontSize="30"
        fontWeight="700"
        fill="#475569"
      >
        제물포
      </text>
    </svg>
  );
};
