// Fix 후 회귀 테스트 — fix가 적용된 컴포넌트는 ID 자체가 없어 cross-call 충돌이 사라져야 함
// 변환되지 않은 컴포넌트(C/D/E 케이스)는 여전히 useId 패턴이라 cross-call에서 같은 id가 나옴 (알려진 잔여 이슈)
import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h, Fragment } from "react";
import {
  Seoul, Jeju, Gwangju, Incheon, Jeonnam,
  AnyangSi, DongdaemunGu,
} from "@apt.today/react-korea-icons";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const hr = () => console.log("─".repeat(72));
const log = (s) => console.log(s);

let pass = 0, fail = 0;
function expect(label, cond, detail = "") {
  const tag = cond ? "✅ PASS" : "❌ FAIL";
  cond ? pass++ : fail++;
  console.log(`  ${tag}  ${label}${detail ? ` — ${detail}` : ""}`);
}

function getId(html) {
  return html.match(/<(?:clipPath|defs)[^>]* id="([^"]+)"/)?.[1] || null;
}

function countIdAttrs(html) {
  return (html.match(/\sid="[^"]+"/g) || []).length;
}

function countUrlRefs(html) {
  return (html.match(/url\(#[^)]+\)/g) || []).length;
}

hr();
log("Fix 검증 — 변환된 광역시는 ID 자체가 사라졌어야 함");
hr();

for (const [name, Comp] of [["Seoul", Seoul], ["Jeju", Jeju], ["Gwangju", Gwangju], ["Incheon", Incheon], ["Jeonnam", Jeonnam]]) {
  const html = renderToStaticMarkup(h(Comp, {}));
  const ids = countIdAttrs(html);
  const refs = countUrlRefs(html);
  expect(`${name}: id 속성 0개`, ids === 0, `id=${ids}, url(#…)=${refs}`);
}

hr();
log("Fix 검증 — 변환된 컴포넌트는 cross-call에서 동일 출력 (멱등)");
hr();

for (const [name, Comp] of [["Seoul", Seoul], ["Jeju", Jeju], ["Incheon", Incheon]]) {
  const a = renderToStaticMarkup(h(Comp, {}));
  const b = renderToStaticMarkup(h(Comp, {}));
  expect(`${name}: 두 호출의 출력이 정확히 동일`, a === b, `len=${a.length}`);
  expect(`${name}: 출력에 :R…: 패턴 없음 (useId 안 씀)`, !/:R[0-9a-z]*:/.test(a));
}

hr();
log("Fix 검증 — AnyangSi 하드코딩 id 사라짐");
hr();

const anyang1 = renderToStaticMarkup(h(AnyangSi, {}));
const anyang2 = renderToStaticMarkup(h(Fragment, null, h(AnyangSi, { key: 1 }), h(AnyangSi, { key: 2 })));
expect("AnyangSi: id 속성 0개", countIdAttrs(anyang1) === 0);
expect("AnyangSi: 두 인스턴스 단일 tree에서 id 중복 없음 (id 자체 없음)", countIdAttrs(anyang2) === 0);

hr();
log("실전 시나리오 — 지도 마커처럼 Seoul × 3 별도 SSR");
hr();
const m1 = renderToStaticMarkup(h(Seoul, {}));
const m2 = renderToStaticMarkup(h(Seoul, {}));
const m3 = renderToStaticMarkup(h(Seoul, {}));
const page = `${m1}${m2}${m3}`;
const idsInPage = page.match(/\sid="[^"]+"/g) || [];
expect("페이지 내 Seoul × 3 → id 충돌 없음 (id 자체가 없음)", idsInPage.length === 0, `${idsInPage.length}개 id`);
const refsInPage = page.match(/url\(#[^)]+\)/g) || [];
expect("페이지 내 url(#…) 참조도 없음", refsInPage.length === 0);

hr();
log("옵션 D 적용 — 그라디언트 컴포넌트도 cross-call 안전 (hardcoded prefix)");
hr();
const dong1 = renderToStaticMarkup(h(DongdaemunGu, {}));
const dong2 = renderToStaticMarkup(h(DongdaemunGu, {}));
expect("DongdaemunGu cross-call 출력 동일 (멱등)", dong1 === dong2, `len=${dong1.length}`);
expect("DongdaemunGu에 useId 결과 :R…: 패턴 없음", !/:R[0-9a-z]*:/.test(dong1));
expect("DongdaemunGu에 hardcoded kicon- prefix 사용", /kicon-dongdaemungu/.test(dong1));

hr();
log("영향 범위 카운트");
hr();
function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith(".tsx")) files.push(p);
  }
  return files;
}
const root = "/Users/riky/Documents/workspace/react-seoul-icons/src/components";
const files = walk(root);
let useIdN = 0, hardcodedN = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  if (src.includes("useId")) useIdN++;
  if (!src.includes("useId") && /<(?:clipPath|mask)\s+id="[^"$`{}]+"/.test(src)) hardcodedN++;
}
log(`  전체 컴포넌트: ${files.length}`);
log(`  useId 사용 (잔여 cross-call 이슈 보유): ${useIdN}`);
log(`  하드코딩 id (CSR도 깨지는 케이스): ${hardcodedN}`);
expect("하드코딩 id 0개", hardcodedN === 0);
expect("useId 사용 컴포넌트 100→0 (옵션 D 일괄 적용)", useIdN === 0);

hr();
log(`결과: PASS ${pass} / FAIL ${fail}`);
hr();
process.exit(fail === 0 ? 0 : 1);
