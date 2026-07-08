import * as React from "react";

/**
 * 같은 아이콘을 한 페이지에 여러 번 렌더링할 때 gradient/clipPath ID 충돌을 방지하는 훅.
 *
 * `React.useId()` 기반 (v1.1.1):
 * - react-server 서브셋(RSC)에 포함된 훅이라 서버 컴포넌트에서도 렌더 가능
 *   (v1.1.0의 useState+useLayoutEffect 방식은 RSC에서 `useState is not a function` 빌드 실패)
 * - SSR과 hydration에서 같은 값이 보장되어 mismatch 없음
 * - 첫 렌더부터 인스턴스 고유 접미사가 채워지므로, 공유 ID 상태의 첫 페인트에서
 *   숨겨진 첫 인스턴스로 인해 fill이 사라지는 문제도 발생하지 않음
 * - 요구 peer: React 18+ (useId)
 */
export function useInstanceSuffix(): string {
  // useId 반환값은 ":r0:" 형태 — SVG id/url(#...) 조각에서 콜론이 문제될 수 있어 제거
  return React.useId().replace(/:/g, "");
}
