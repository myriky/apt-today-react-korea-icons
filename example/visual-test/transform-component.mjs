// 단일 .tsx 컴포넌트를 변환하는 함수
// - useId + clipPath + (선택적 group transform) 패턴 → clipPath/transform 제거 + path 좌표에 transform 굽기
// - group transform이 없으면 path 좌표 그대로 (D 케이스)
// - 시각 동일성 픽셀 비교 통과 시에만 적용
import { readFileSync, writeFileSync } from "fs";
import svgpath from "svgpath";

export function transformTsx(srcText) {
  const hasUseId = /React\.useId\(\)/.test(srcText);
  if (!hasUseId) return { skip: true, reason: "no useId" };

  // <defs>...</defs> 블록 — clipPath만 단순 path를 가진 케이스
  // 그라디언트 등을 함께 가지면 변환 안 함 (E 케이스 회피)
  const defsRe = /\s*<defs>([\s\S]*?)<\/defs>/;
  const defsMatch = srcText.match(defsRe);
  if (!defsMatch) return { skip: true, reason: "no <defs>" };
  const defsContent = defsMatch[1];

  if (/<linearGradient|<radialGradient|<mask|<filter|<pattern/.test(defsContent)) {
    return { skip: true, reason: "defs contains gradient/mask/filter (E case, gradient kept)" };
  }
  // 단순 <clipPath><path/></clipPath> 만 있어야
  if (!/^\s*<clipPath[^>]*>\s*<path\s+d="[^"]+"\s*\/>\s*<\/clipPath>\s*$/.test(defsContent)) {
    return { skip: true, reason: "<defs> not a simple single clipPath/path (manual review)" };
  }

  // 단일 <g> 블록 (clipPath 속성 필수, transform은 선택)
  const gOpenRe = /<g\b([^>]*)>/;
  const gMatch = srcText.match(gOpenRe);
  if (!gMatch) return { skip: true, reason: "no <g> tag" };
  const gAttrs = gMatch[1];

  const txAttrMatch = gAttrs.match(/transform="([^"]+)"/);
  // suffix는 -a, -b, -c... 다양 가능하게
  const cpAttrMatch = gAttrs.match(/clipPath=\{`url\(#\$\{id\}-[a-z]\)`\}/);
  if (!cpAttrMatch) return { skip: true, reason: "no useId-based clipPath on <g>" };

  const transformValue = txAttrMatch?.[1] ?? null;

  // svgpath transform 검증 (transform 있을 때만)
  if (transformValue) {
    try {
      const test = svgpath("M0 0L1 1").transform(transformValue).toString();
      if (!test) return { skip: true, reason: "transform produced empty result" };
    } catch (e) {
      return { skip: true, reason: `svgpath cannot parse transform: ${e.message}` };
    }
  }

  // <g>에서 transform과 clipPath 속성 제거
  const newGAttrs = gAttrs
    .replace(/\s*clipPath=\{`url\(#\$\{id\}-[a-z]\)`\}/g, "")
    .replace(/\s*transform="[^"]+"/g, "");
  const newGOpen = `<g${newGAttrs}>`;

  // 모든 <path … d="…" /> 의 d에 transform 굽기 (transform 있을 때만)
  const pathRe = /<path([^>]*?)d="([^"]+)"([^>]*?)\/>/g;
  let transformedSrc = srcText
    .replace(defsRe, "")
    .replace(gOpenRe, newGOpen);

  let pathCount = 0;
  if (transformValue) {
    transformedSrc = transformedSrc.replace(pathRe, (m, before, d, after) => {
      pathCount++;
      const newD = svgpath(d).transform(transformValue).toString();
      return `<path${before}d="${newD}"${after}/>`;
    });
  } else {
    pathCount = (transformedSrc.match(pathRe) || []).length;
  }

  // useId 호출 제거
  transformedSrc = transformedSrc
    .replace(/^\s*const\s+id\s*=\s*React\.useId\(\);\s*\n/m, "")
    .replace(/\n{3,}/g, "\n\n");

  return {
    original: srcText,
    transformed: transformedSrc,
    pathCount,
    transform: transformValue ?? "(none — D case)",
  };
}

if (process.env.TRANSFORM_COMPONENT_CLI === "1") {
  const [, , inFile, outFile] = process.argv;
  if (!inFile) {
    console.error("Usage: node transform-component.mjs <input.tsx> [output.tsx]");
    process.exit(2);
  }
  const src = readFileSync(inFile, "utf8");
  const result = transformTsx(src);
  if (result.skip) {
    console.log(`SKIP: ${inFile} — ${result.reason}`);
    process.exit(0);
  }
  console.log(`Transform: ${result.transform}, paths: ${result.pathCount}`);
  if (outFile) {
    writeFileSync(outFile, result.transformed);
    console.log(`Wrote: ${outFile}`);
  } else {
    console.log(result.transformed.slice(0, 800));
  }
}
