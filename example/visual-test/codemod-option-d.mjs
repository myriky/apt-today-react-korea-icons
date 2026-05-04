// 옵션 D codemod — useId() 호출과 ${id} 템플릿 참조를 컴포넌트명 기반 hardcoded prefix로 일괄 치환
//
// before:
//   const id = React.useId();
//   <linearGradient id={`${id}-b`} .../>
//   <path fill={`url(#${id}-b)`} .../>
//   <g clipPath={`url(#${id}-a)`} .../>
//
// after (kicon-yonginsi prefix):
//   <linearGradient id="kicon-yonginsi-b" .../>
//   <path fill="url(#kicon-yonginsi-b)" .../>
//   <g clipPath="url(#kicon-yonginsi-a)" .../>
//
// 컴포넌트명은 파일명에서 추출 (Pascal → lower case, 영문/숫자만)
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, basename, relative } from "path";

const ROOT = "/Users/riky/Documents/workspace/react-seoul-icons/src/components";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith(".tsx")) files.push(p);
  }
  return files;
}

function makePrefix(filePath) {
  const name = basename(filePath, ".tsx");
  // PascalCase → lowercase 영문숫자만
  return `kicon-${name.toLowerCase()}`;
}

export function transformWithOptionD(srcText, prefix) {
  if (!srcText.includes("React.useId()")) {
    return { skip: true, reason: "no React.useId()" };
  }

  let result = srcText;
  let changes = 0;

  // 1) ${id}를 prefix string으로 치환 — 어디 있든 (id, xlinkHref, style 객체, etc)
  //    backtick template literal 안의 ${id}만 변수 참조 → string fragment로 변환
  //    예: `${id}-a` → `kicon-yonginsi-a` (여전히 template literal이지만 변수 없는 단순 string)
  result = result.replace(/\$\{id\}/g, (m) => {
    changes++;
    return prefix;
  });

  // 2) const id = React.useId(); 라인 제거
  const beforeLen = result.length;
  result = result.replace(/^[ \t]*const\s+id\s*=\s*React\.useId\(\);\s*\n/m, "");
  if (result.length !== beforeLen) changes++;

  // 3) 빈 줄 정리
  result = result.replace(/\n{3,}/g, "\n\n");

  if (changes === 0) {
    return { skip: true, reason: "no useId/template patterns matched" };
  }

  return { transformed: result, changes };
}

// 변환된 결과에 useId 잔여 패턴이 남아있는지 검증
export function verifyNoUseIdResidue(transformedText) {
  const issues = [];
  if (/React\.useId\(\)/.test(transformedText)) issues.push("React.useId() 호출 잔여");
  if (/\$\{id\}/.test(transformedText)) issues.push("${id} 템플릿 잔여");
  return issues;
}

const DRY_RUN = process.argv.includes("--dry-run");
const FILTER = process.argv.find((a) => a.startsWith("--filter="))?.split("=")[1];

const files = walk(ROOT);
const stats = { applied: [], skipped: [], residue: [] };

for (const f of files) {
  if (FILTER && !f.includes(FILTER)) continue;
  const src = readFileSync(f, "utf8");
  const prefix = makePrefix(f);
  const result = transformWithOptionD(src, prefix);
  const rel = relative(ROOT, f);

  if (result.skip) {
    stats.skipped.push({ file: rel, reason: result.reason });
    continue;
  }

  // 변환 후 잔여 검증
  const issues = verifyNoUseIdResidue(result.transformed);
  if (issues.length > 0) {
    stats.residue.push({ file: rel, issues, prefix });
    console.log(`⚠️  ${rel} (prefix=${prefix}): ${issues.join(", ")}`);
    continue;
  }

  if (!DRY_RUN) {
    writeFileSync(f, result.transformed);
  }
  stats.applied.push({ file: rel, prefix, changes: result.changes });
}

console.log(`\n${"=".repeat(64)}`);
console.log(`옵션 D codemod 결과${DRY_RUN ? " (DRY RUN — 디스크 변경 없음)" : ""}`);
console.log("=".repeat(64));
console.log(`✅ 적용: ${stats.applied.length}`);
stats.applied.slice(0, 5).forEach((x) => console.log(`   - ${x.file}  prefix=${x.prefix}, ${x.changes}건 치환`));
if (stats.applied.length > 5) console.log(`   …외 ${stats.applied.length - 5}개`);

if (stats.residue.length) {
  console.log(`\n⚠️ 잔여 패턴 발견 (변환 안 함): ${stats.residue.length}`);
  stats.residue.forEach((x) => console.log(`   - ${x.file}: ${x.issues.join(", ")}`));
}

console.log(`⏭️  스킵 (대상 아님): ${stats.skipped.length}`);
const skipReasons = {};
stats.skipped.forEach((x) => { skipReasons[x.reason] = (skipReasons[x.reason] || 0) + 1; });
Object.entries(skipReasons).forEach(([r, n]) => console.log(`   - ${r}: ${n}개`));
