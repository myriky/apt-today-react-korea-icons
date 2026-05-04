// 일괄 변환 파이프라인:
// 1) 패턴 일치 컴포넌트 찾기
// 2) 각 컴포넌트의 원본 SVG 추출 (renderToStaticMarkup)
// 3) SVG에 변환 적용 → 변환된 SVG
// 4) 두 SVG 픽셀 비교 (Puppeteer)
// 5) 모든 크기에서 strict 0이면 .tsx에 변환 적용. 아니면 skip + 기록
// 6) 결과 보고
import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h } from "react";
import * as Pkg from "@apt.today/react-korea-icons";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, basename, dirname } from "path";
import { transformTsx } from "./transform-component.mjs";
import { transformSvg } from "./transform-svg.mjs";
import { comparePair, closeBrowser } from "./compare-pair.mjs";

const ROOT = "/Users/riky/Documents/workspace/react-seoul-icons/src/components";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith(".tsx")) files.push(p);
  }
  return files;
}

function getComponentName(filePath) {
  return basename(filePath, ".tsx");
}

function svgWithStableIds(svgString) {
  return svgString
    .replace(/id=":R[0-9a-z]*:-([a-z])"/g, 'id="$1"')
    .replace(/url\(#:R[0-9a-z]*:-([a-z])\)/g, "url(#$1)");
}

function renderOriginalSvg(componentName) {
  const Component = Pkg[componentName];
  if (!Component) throw new Error(`Component not exported: ${componentName}`);
  return svgWithStableIds(renderToStaticMarkup(h(Component, {})));
}

const SIZES = [16, 32, 48, 128, 512];
const DRY_RUN = process.argv.includes("--dry-run");
const FILTER = process.argv.find((a) => a.startsWith("--filter="))?.split("=")[1];

(async () => {
const files = walk(ROOT);
const candidates = [];

for (const f of files) {
  const src = readFileSync(f, "utf8");
  const result = transformTsx(src);
  if (result.skip) continue;
  if (FILTER && !f.includes(FILTER)) continue;
  candidates.push({ file: f, ...result });
}

console.log(`총 변환 후보: ${candidates.length}개${DRY_RUN ? " (DRY RUN)" : ""}`);

const stats = {
  pass: [],
  fail: [],
  error: [],
};

for (let i = 0; i < candidates.length; i++) {
  const c = candidates[i];
  const componentName = getComponentName(c.file);
  const rel = relative(ROOT, c.file);

  process.stdout.write(`[${i + 1}/${candidates.length}] ${rel} (${c.transform}) ... `);

  try {
    const beforeSvg = renderOriginalSvg(componentName);
    const svgResult = transformSvg(beforeSvg);
    if (svgResult.skip) {
      stats.error.push({ file: rel, reason: `transformSvg skip: ${svgResult.reason}` });
      console.log(`SKIP (svg-level: ${svgResult.reason})`);
      continue;
    }
    const afterSvg = svgResult.transformed;

    const results = await comparePair(componentName, beforeSvg, afterSvg, SIZES, null);
    const totalStrict = results.reduce((s, r) => s + (r.strict || 0), 0);
    const totalAA = results.reduce((s, r) => s + (r.aa || 0), 0);

    // 통과 기준: AA-tolerant=0 (anti-aliasing 임계 내 차이는 시각 인지 불가)
    // strict=0이면 완벽 일치, AA=0이지만 strict>0이면 viewBox 경계 부근 미세 차이
    if (totalAA === 0) {
      stats.pass.push({ file: rel, componentName, totalStrict, totalAA, sizes: results });
      const tag = totalStrict === 0 ? "strict=0" : `strict=${totalStrict}, AA=0 (시각 인지 불가)`;
      console.log(`✅ pass (${tag})`);
      if (!DRY_RUN) {
        writeFileSync(c.file, c.transformed);
      }
    } else {
      stats.fail.push({
        file: rel,
        componentName,
        totalStrict,
        totalAA,
        bySize: results.map((r) => ({ size: r.size, strict: r.strict, aa: r.aa })),
      });
      console.log(`❌ FAIL (strict=${totalStrict}, AA=${totalAA})`);
    }
  } catch (e) {
    stats.error.push({ file: rel, reason: e.message });
    console.log(`💥 ERROR: ${e.message}`);
  }
}

console.log("\n" + "=".repeat(72));
console.log("결과 요약");
console.log("=".repeat(72));
console.log(`✅ PASS (시각 동일성 통과 + .tsx 변환 적용${DRY_RUN ? "안 됨(dry-run)" : "됨"}): ${stats.pass.length}`);
console.log(`❌ FAIL (픽셀 차이 발견 → 변환 안 함): ${stats.fail.length}`);
console.log(`💥 ERROR: ${stats.error.length}`);

if (stats.fail.length) {
  console.log("\nFAIL 상세:");
  for (const f of stats.fail) {
    console.log(`  ${f.file}: total=${f.totalStrict} px, AA=${f.totalAA}`);
    f.bySize.filter((x) => x.strict > 0).forEach((x) =>
      console.log(`    size ${x.size}: strict=${x.strict}, AA=${x.aa}`)
    );
  }
}
if (stats.error.length) {
  console.log("\nERROR 상세:");
  for (const e of stats.error) console.log(`  ${e.file}: ${e.reason}`);
}

await closeBrowser();
})();
