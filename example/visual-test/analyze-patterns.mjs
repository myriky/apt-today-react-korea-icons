// useId / clipPath / transform / 하드코딩 id 패턴 분류
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = "/Users/riky/Documents/workspace/react-seoul-icons/src/components";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith(".tsx")) files.push(p);
  }
  return files;
}

const files = walk(ROOT);

const buckets = {
  noId_noClipPath: [],            // id 사용 안 함, clipPath 없음 — 안전 (대부분 시군구)
  useId_simpleTranslate: [],       // useId + clipPath + group transform="translate(x y)" — 변환 대상
  useId_otherTransform: [],        // useId + clipPath + 다른 transform (matrix/rotate 등)
  useId_noTransform: [],           // useId + clipPath이지만 group transform 없음
  useId_noClipPath: [],            // useId 쓰지만 clipPath 없음 (왜 useId 쓰는지)
  hardcodedId: [],                 // useId 안 쓰고 id="…" 하드코딩
};

const transformPatterns = {};

for (const f of files) {
  const src = readFileSync(f, "utf8");
  const rel = relative(ROOT, f);

  const hasUseId = src.includes("useId");
  const hasClipPath = src.includes("clipPath");
  const hardcoded = !hasUseId && /<(?:clipPath|mask|linearGradient|radialGradient|filter|pattern)\s+id="[^"]+"/.test(src);

  // group transform 검출
  const transformMatch = src.match(/<g[^>]*transform="([^"]+)"/);
  const tr = transformMatch?.[1];

  if (tr) {
    transformPatterns[tr] = (transformPatterns[tr] || 0) + 1;
  }

  if (hardcoded) {
    buckets.hardcodedId.push({ file: rel, transform: tr });
  } else if (!hasUseId && !hasClipPath) {
    buckets.noId_noClipPath.push(rel);
  } else if (hasUseId && hasClipPath) {
    if (!tr) {
      buckets.useId_noTransform.push({ file: rel });
    } else if (/^translate\(\s*-?[\d.]+[\s,]+-?[\d.]+\s*\)$/.test(tr)) {
      buckets.useId_simpleTranslate.push({ file: rel, transform: tr });
    } else {
      buckets.useId_otherTransform.push({ file: rel, transform: tr });
    }
  } else if (hasUseId && !hasClipPath) {
    buckets.useId_noClipPath.push(rel);
  }
}

console.log(`전체 .tsx 파일: ${files.length}`);
console.log();
console.log("[A] 안전 — id 사용 안 함, clipPath 없음:");
console.log(`    ${buckets.noId_noClipPath.length}개 (대부분 시군구)`);

console.log();
console.log("[B] 변환 대상 — useId + clipPath + 단순 translate transform:");
console.log(`    ${buckets.useId_simpleTranslate.length}개`);
buckets.useId_simpleTranslate.slice(0, 5).forEach((x) =>
  console.log(`      - ${x.file}  ${x.transform}`)
);
if (buckets.useId_simpleTranslate.length > 5) console.log(`      …외 ${buckets.useId_simpleTranslate.length - 5}개`);

console.log();
console.log("[C] 검토 필요 — useId + clipPath + 다른 transform:");
console.log(`    ${buckets.useId_otherTransform.length}개`);
buckets.useId_otherTransform.forEach((x) =>
  console.log(`      - ${x.file}  ${x.transform}`)
);

console.log();
console.log("[D] 검토 필요 — useId + clipPath이지만 group transform 없음:");
console.log(`    ${buckets.useId_noTransform.length}개`);
buckets.useId_noTransform.slice(0, 10).forEach((x) =>
  console.log(`      - ${x.file}`)
);
if (buckets.useId_noTransform.length > 10) console.log(`      …외 ${buckets.useId_noTransform.length - 10}개`);

console.log();
console.log("[E] 의문 — useId 쓰지만 clipPath 없음:");
console.log(`    ${buckets.useId_noClipPath.length}개`);
buckets.useId_noClipPath.forEach((x) => console.log(`      - ${x}`));

console.log();
console.log("[F] 하드코딩 id (P0 대상):");
console.log(`    ${buckets.hardcodedId.length}개`);
buckets.hardcodedId.forEach((x) => console.log(`      - ${x.file}  transform=${x.transform || "(없음)"}`));

console.log();
console.log("─".repeat(72));
console.log("group transform 패턴 빈도:");
const sorted = Object.entries(transformPatterns).sort((a, b) => b[1] - a[1]);
sorted.slice(0, 20).forEach(([tr, n]) => console.log(`  ${n}회: ${tr}`));
if (sorted.length > 20) console.log(`  …외 ${sorted.length - 20}개 패턴`);
