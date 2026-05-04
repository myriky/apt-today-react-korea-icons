// SVG 문자열에 같은 변환 적용 (clipPath 제거 + 선택적 path 좌표 변환)
// transform 없으면 path 좌표 그대로 두고 clipPath만 제거 (D 케이스)
import svgpath from "svgpath";

export function transformSvg(svgString) {
  // <defs>...</defs> 단순 clipPath만 있는 경우만 제거 (그라디언트 보존)
  const defsRe = /<defs>([\s\S]*?)<\/defs>/;
  const defsMatch = svgString.match(defsRe);
  if (!defsMatch) return { skip: true, reason: "no <defs>" };
  const defsContent = defsMatch[1];
  if (/<linearGradient|<radialGradient|<mask|<filter|<pattern/.test(defsContent)) {
    return { skip: true, reason: "defs has gradient/mask/filter — keep" };
  }
  // <clipPath ...><path .../></clipPath> 또는 <clipPath ...><path ...></path></clipPath> 둘 다 허용
  if (!/^\s*<clipPath[^>]*>\s*<path[^>]*(?:\/>|>\s*<\/path>)\s*<\/clipPath>\s*$/.test(defsContent)) {
    return { skip: true, reason: "complex defs" };
  }

  let result = svgString.replace(defsRe, "");

  const gMatch = result.match(/<g\b([^>]*)>/);
  if (!gMatch) return { skip: true, reason: "no <g>" };
  const gAttrs = gMatch[1];

  const txMatch = gAttrs.match(/transform="([^"]+)"/);
  const transformValue = txMatch?.[1] ?? null;

  const newGAttrs = gAttrs
    .replace(/\s*clip-path="[^"]*"/g, "")
    .replace(/\s*transform="[^"]+"/g, "");
  result = result.replace(gMatch[0], `<g${newGAttrs}>`);

  if (transformValue) {
    result = result.replace(/<path([^>]*?)d="([^"]+)"([^>]*?)\/?>/g, (m, before, d, after) => {
      try {
        const newD = svgpath(d).transform(transformValue).toString();
        return `<path${before}d="${newD}"${after}/>`;
      } catch {
        return m;
      }
    });
  }

  return { transformed: result, transform: transformValue ?? "(none)" };
}
