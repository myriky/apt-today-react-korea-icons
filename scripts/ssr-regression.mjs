// SSR / 다중 인스턴스 회귀 검사 (README "SSR / 다중 인스턴스 안전성"과 같은 내용)
// - id 없는 컴포넌트: 따로 렌더해도 id·url(#) 참조 자체가 없음
// - id 있는 컴포넌트(useInstanceSuffix): 같은 트리에서는 인스턴스마다 id가 다르고 참조가 모두 해석됨,
//   따로 렌더하면 출력이 같음(= id도 같음, 알려진 한계 — 정적 SVG <img> 사용 권장)
import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h, Fragment } from "react";
import {
  Seoul, Jeju, Gwangju, Incheon, Jeonnam,
  AnyangSi, DongdaemunGu,
} from "@apt.today/react-korea-icons";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as Lib from "@apt.today/react-korea-icons";

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
log("그라디언트 컴포넌트 — 따로 렌더해도 결정적 (kicon- 접두사)");
hr();
const dong1 = renderToStaticMarkup(h(DongdaemunGu, {}));
const dong2 = renderToStaticMarkup(h(DongdaemunGu, {}));
expect("DongdaemunGu cross-call 출력 동일 (멱등)", dong1 === dong2, `len=${dong1.length}`);
expect("DongdaemunGu id에 콜론(:R…:) 없음", !/:R[0-9a-z]*:/.test(dong1));
expect("DongdaemunGu에 kicon- 접두사 사용", /kicon-dongdaemungu/.test(dong1));

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
const root = join(dirname(fileURLToPath(import.meta.url)), "../src/components");
const files = walk(root);
let suffixN = 0, staticIdN = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  if (src.includes("useInstanceSuffix()")) suffixN++;
  // 접미사 없이 문자열로 고정된 id (여러 개 띄우면 DOM에 id 중복)
  else if (/\sid="[^"]+"/.test(src)) staticIdN++;
}
log(`  전체 컴포넌트: ${files.length}`);
log(`  useInstanceSuffix 사용(id 있음): ${suffixN}`);
log(`  고정 문자열 id: ${staticIdN}`);
expect("고정 문자열 id 0개", staticIdN === 0);

hr();
log("v1.1.1~ 설계 — id가 있는 모든 컴포넌트 전수 검사");
hr();
const idsOf = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const refsOf = (html) => [...html.matchAll(/url\(#([^)]+)\)|href="#([^"]+)"/g)].map((m) => m[1] ?? m[2]);
let withIds = 0, sameTreeBad = [], danglingBad = [], crossCallSame = 0, crossCallNondet = [];
for (const [name, Comp] of Object.entries(Lib)) {
  if (typeof Comp !== "function") continue;
  const one = renderToStaticMarkup(h(Comp, {}));
  if (idsOf(one).length === 0) continue;
  withIds++;
  // 같은 트리 2개: id 집합이 겹치지 않아야 함
  const two = renderToStaticMarkup(h(Fragment, null, h(Comp, { key: 1 }), h(Comp, { key: 2 })));
  const all = idsOf(two);
  if (new Set(all).size !== all.length) sameTreeBad.push(name);
  // 모든 url(#)/href(#) 참조가 같은 출력 안의 id를 가리켜야 함
  const idset = new Set(all);
  if (refsOf(two).some((r) => !idset.has(r))) danglingBad.push(name);
  // 따로 렌더 2회: 결정적(같은 출력)이고, 따라서 id도 같음 — README에 적은 알려진 한계
  const again = renderToStaticMarkup(h(Comp, {}));
  if (again !== one) crossCallNondet.push(name);
  else crossCallSame++;
}
log(`  id가 있는 컴포넌트: ${withIds}`);
expect("같은 트리 2개 → id 중복 없음 (전수)", sameTreeBad.length === 0, sameTreeBad.join(","));
expect("url(#)/href(#) 참조가 모두 같은 출력 안에서 해석됨 (전수)", danglingBad.length === 0, danglingBad.join(","));
expect("따로 렌더 2회 → 출력 동일 (결정적, id도 같음: 알려진 한계)", crossCallNondet.length === 0, `${crossCallSame}/${withIds}`);

hr();
log(`결과: PASS ${pass} / FAIL ${fail}`);
hr();
process.exit(fail === 0 ? 0 : 1);
