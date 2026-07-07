import * as React from "react";

let instanceCounter = 0;

// SSR(react-dom/server)에서 useLayoutEffect 경고를 피하기 위한 isomorphic effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * 같은 아이콘을 한 페이지에 여러 번 렌더링할 때 gradient/clipPath ID 충돌을 방지하는 훅.
 *
 * - SSR 마크업과 첫 클라이언트 렌더는 빈 접미사("")를 반환해 컴포넌트명 기반
 *   결정적 공유 ID를 유지한다 (cross-call 멱등, hydration mismatch 없음).
 * - 클라이언트 마운트 직후(paint 전) 인스턴스 고유 접미사로 전환한다.
 *   공유 ID 상태에서는 url(#...)가 문서상 첫 번째 defs로 해석되는데, 그 인스턴스가
 *   display:none 컨테이너(예: 반응형 숨김 블록) 안에 있으면 보이는 아이콘의
 *   fill이 통째로 사라지기 때문이다.
 */
export function useInstanceSuffix(): string {
  const [suffix, setSuffix] = React.useState("");
  useIsomorphicLayoutEffect(() => {
    setSuffix(`-i${++instanceCounter}`);
  }, []);
  return suffix;
}
