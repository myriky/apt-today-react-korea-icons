// /meta 서브패스와 utils 회귀 검사
// 사용: node scripts/meta-regression.mjs [--baseline 기준 dist/index.js]
// - 기준(baseline)을 주면 v1.1.1 등 이전 빌드의 utils와 비교한다. 없으면 현재 dist의 utils와 비교한다.
// - 검사: (1) 현재 utils가 기준 utils와 같은 결과를 내는지 (2) /meta가 기준 utils와 같은 결과를 내는지
//         (3) iconFile 폴백 규칙 (4) 모든 iconFile 결과가 dist/svg에 있는지 (5) meta 번들에 컴포넌트가 없는지
import { createRequire } from "module";
import { existsSync, readFileSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const args = process.argv.slice(2);
const baselineArg = args.includes("--baseline") ? args[args.indexOf("--baseline") + 1] : null;

const current = require(join(root, "dist/index.js"));
const baseline = baselineArg ? require(resolve(baselineArg)) : current;
const meta = require(join(root, "dist/meta.js"));

let pass = 0;
let fail = 0;
const failures = [];
function check(label, cond, detail = "") {
  if (cond) pass++;
  else {
    fail++;
    if (failures.length < 30) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
  }
}

// 컴포넌트 함수 → export 이름 (번들러가 함수 이름을 바꿀 수 있으므로 export 표로 역참조)
const nameMap = (lib) => {
  const m = new Map();
  for (const [k, v] of Object.entries(lib)) if (typeof v === "function") m.set(v, k);
  return m;
};
const baseNames = nameMap(baseline);
const curNames = nameMap(current);
const bName = (c) => (c == null ? null : baseNames.get(c) ?? "?unknown");
const cName = (c) => (c == null ? null : curNames.get(c) ?? "?unknown");

// 컴포넌트를 이름으로 바꾼 비교용 형태
const normRegion = (r, nm) => r && { code: r.code, name: r.name, shortName: r.shortName, englishName: r.englishName, componentName: nm(r.component) };
const normIcon = (i, nm) => i && { code: i.code, regionCode: i.regionCode, regionName: i.regionName, name: i.name, shortName: i.shortName, componentName: i.componentName, component: nm(i.component) };
const normInfo = (x, nm) => (x == null ? null : "regionCode" in x ? normIcon(x, nm) : normRegion(x, nm));
const metaRegion = (r) => r && { code: r.code, name: r.name, shortName: r.shortName, englishName: r.englishName, componentName: r.componentName };
const metaIcon = (i) => i && { code: i.code, regionCode: i.regionCode, regionName: i.regionName, name: i.name, shortName: i.shortName, componentName: i.componentName, component: i.componentName };
const metaInfo = (x) => (x == null ? null : "regionCode" in x ? metaIcon(x) : metaRegion(x));
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const B = baseline.utils;
const C = current.utils;

// ---- 입력 집합 ----
const allIcons = B.getAll();
const allRegions = B.getAllRegions();
const codes = new Set([0, 1, 10, 99, 100, 9999, 100000, 99999]);
for (let c = 0; c < 100; c++) codes.add(c);
for (const i of allIcons) for (let d = -9; d <= 9; d++) codes.add(i.code + d);
const names = new Set(["", "없는구", "중구", "동구", "서구", "남구", "북구", "강서구"]);
for (const i of allIcons) {
  const r = allRegions.find((x) => x.code === i.regionCode);
  names.add(i.name);
  names.add(i.shortName);
  if (r) {
    names.add(`${r.name} ${i.name}`);
    names.add(`${r.shortName} ${i.name}`);
  }
}
const regionOpts = [undefined, "없는시도", ...allRegions.map((r) => r.shortName)];
const regionKeys = [-1, 0, 99, "", "없는시도", ...allRegions.map((r) => r.code), ...allRegions.map((r) => r.shortName), ...allRegions.map((r) => r.name)];

// ---- (1)(2) 코드 조회 ----
for (const code of codes) {
  const b = normInfo(B.getInfo(code), bName);
  check(`utils.getInfo(${code})`, eq(normInfo(C.getInfo(code), cName), b));
  check(`meta.getByCode(${code})`, eq(metaInfo(meta.getByCode(code)), b));
  check(`utils.getIcon(${code})`, cName(C.getIcon(code)) === bName(B.getIcon(code)));
  check(`utils.isValid(${code})`, C.isValid(code) === B.isValid(code));
  check(`meta.isValid(${code})`, meta.isValid(code) === B.isValid(code));
}

// ---- 이름 조회 ----
for (const name of names) {
  for (const region of regionOpts) {
    const opt = region === undefined ? undefined : { region };
    const b = bName(B.findByName(name, opt));
    check(`utils.findByName(${name}, ${region})`, cName(C.findByName(name, opt)) === b);
    check(`meta.findByName(${name}, ${region})`, (meta.findByName(name, opt)?.componentName ?? null) === b, `meta=${meta.findByName(name, opt)?.componentName} base=${b}`);
  }
}

// ---- 목록 ----
for (const key of regionKeys) {
  const b = B.getByRegion(key).map((i) => normIcon(i, bName));
  check(`utils.getByRegion(${key})`, eq(C.getByRegion(key).map((i) => normIcon(i, cName)), b));
  check(`meta.getByRegion(${key})`, eq(meta.getByRegion(key).map(metaIcon), b));
}
const lists = [
  ["getAllRegions", (u, nm) => u.getAllRegions().map((r) => normRegion(r, nm)), () => meta.getAllRegions().map(metaRegion)],
  ["getAvailableRegions", (u, nm) => u.getAvailableRegions().map((r) => normRegion(r, nm)), () => meta.getAvailableRegions().map(metaRegion)],
  ["getRegionsWithIcons", (u, nm) => u.getRegionsWithIcons().map((r) => normRegion(r, nm)), () => meta.getRegionsWithIcons().map(metaRegion)],
  ["getAll", (u, nm) => u.getAll().map((i) => normIcon(i, nm)), () => meta.getAll().map(metaIcon)],
];
for (const [label, fromUtils, fromMeta] of lists) {
  const b = fromUtils(B, bName);
  check(`utils.${label}`, eq(fromUtils(C, cName), b));
  check(`meta.${label}`, eq(fromMeta(), b));
}

// ---- (3) iconFile: 원래 코드 우선, 없을 때만 5자리 끝자리 0 폴백 ----
for (let code = 0; code < 100000; code++) {
  const direct = bName(B.getIcon(code));
  const fallback =
    direct == null && code >= 10000 && code < 100000 && code % 10 !== 0 ? bName(B.getIcon(code - (code % 10))) : null;
  const expected = direct ?? fallback;
  const got = meta.iconFile(code);
  check(`meta.iconFile(${code})`, got === (expected ? `${expected}.svg` : null), `got=${got} expected=${expected}`);
}
check("iconFile(41135) 성남 분당구 → 성남시 폴백", meta.iconFile(41135) === "SeongnamSi.svg", meta.iconFile(41135));
check("iconFile(41130) 성남시", meta.iconFile(41130) === "SeongnamSi.svg");

// ---- (4) 파일 존재 ----
const files = new Set([...allIcons.map((i) => meta.iconFile(i.code)), ...allRegions.map((r) => meta.iconFile(r.code))].filter(Boolean));
for (const f of files) check(`dist/svg/${f} 존재`, existsSync(join(root, "dist/svg", f)));

// ---- (5) meta 번들에 컴포넌트·React가 없는지 ----
for (const f of ["dist/meta.js", "dist/meta.mjs"]) {
  const src = readFileSync(join(root, f), "utf8");
  check(`${f}: viewBox 없음`, !src.includes("viewBox"));
  check(`${f}: react import 없음`, !/require\(["']react["']\)|from ["']react["']/.test(src));
}

// ---- (6) meta 반환 객체는 고정(수정 불가) ----
check("meta.getAll() 객체 고정", Object.isFrozen(meta.getAll()[0]));

console.log(`기준: ${baselineArg ? resolve(baselineArg) : "현재 dist"}`);
console.log(`PASS ${pass} / FAIL ${fail}`);
for (const f of failures) console.log(`  ❌ ${f}`);
process.exitCode = fail ? 1 : 0;
