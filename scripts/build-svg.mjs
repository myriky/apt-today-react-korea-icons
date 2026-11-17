// dist 컴포넌트를 렌더해 최적화된 정적 SVG(dist/svg/{componentName}.svg)를 만든다.
// 사용: node scripts/build-svg.mjs [--only A,B,C] [--out dir] [--lib path/to/index.js]
// - 원본: renderToStaticMarkup 출력 (useInstanceSuffix 접미사 "R0"를 떼어 id를 고정)
// - 최적화: SVGO, floatPrecision은 viewBox 크기에 비례 (256px 표시 기준 오차 0.1px 이하)
import { createRequire } from "module";
import { mkdirSync, writeFileSync, existsSync, rmSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { optimize } from "svgo";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));
const { renderToStaticMarkup } = require("react-dom/server");
const { createElement: h } = require("react");

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const only = arg("--only")?.split(",").filter(Boolean);
const outDir = resolve(arg("--out") ?? join(root, "dist/svg"));
const libPath = resolve(arg("--lib") ?? join(root, "dist/index.js"));

// 256px로 표시할 때 반올림 오차가 화면 0.1px 이하가 되는 소수 자릿수
const TARGET_PX = 256;
const MAX_ERROR_PX = Number(arg("--max-error") ?? 0.1);
// 기본 오차(0.1px)로는 v1.1.1 렌더와의 픽셀 비교 기준(scripts/compare-static-svg.mjs)을 넘는 파일만 오차를 줄인다.
// 충주시: 붓질 끝의 가는 선, 강원·울주군: 16px에서 가는 가로선 위치가 한 픽셀 어긋남
const MAX_ERROR_OVERRIDES = {
  ChungjuSi: 0.03,
  Gangwon: 0.03,
  UlsanUljuGun: 0.03,
};
export function precisionFor(viewBox, maxErrorPx = MAX_ERROR_PX) {
  const [, , w, h] = viewBox.trim().split(/[\s,]+/).map(Number);
  const unitsPerPx = Math.max(w, h) / TARGET_PX;
  const step = unitsPerPx * maxErrorPx;
  return Math.max(0, Math.ceil(-Math.log10(step)));
}

// 컴포넌트 렌더 출력 → 고정 id SVG 문자열
export function extractSvg(Comp) {
  const html = renderToStaticMarkup(h(Comp));
  // useInstanceSuffix(React.useId)는 단독 렌더에서 항상 "R0"를 낸다. kicon- id에서만 떼어 낸다.
  const ids = [...html.matchAll(/\sid="(kicon-[^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) {
    if (!id.endsWith("R0")) throw new Error(`예상하지 못한 id 접미사: ${id}`);
  }
  let svg = html.replace(/(kicon-[a-z0-9]+-[A-Za-z0-9]*?)R0(?=["')])/g, "$1");
  // React는 xlinkHref를 xlink:href로 내보내지만 xmlns:xlink를 붙이지 않는다.
  // 인라인 HTML에서는 문제없지만 독립 SVG 파일(XML)에서는 파싱 오류이므로 선언을 추가한다.
  if (svg.includes("xlink:") && !svg.includes("xmlns:xlink")) {
    svg = svg.replace(/^<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }
  return svg;
}

// href가 없는 <image>는 그려지지 않는 죽은 마크업이므로 제거
const removeEmptyImage = {
  name: "removeEmptyImage",
  fn: () => ({
    element: {
      enter: (node, parent) => {
        if (node.name === "image" && !node.attributes.href && !node.attributes["xlink:href"]) {
          parent.children = parent.children.filter((c) => c !== node);
        }
      },
    },
  }),
};

export function optimizeSvg(svg, viewBox, name) {
  const maxError = arg("--max-error") ? MAX_ERROR_PX : (MAX_ERROR_OVERRIDES[name] ?? MAX_ERROR_PX);
  const floatPrecision = precisionFor(viewBox, maxError);
  const { data } = optimize(svg, {
    multipass: true,
    floatPrecision,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // 곡선을 원호로 바꾸는 근사(허용 오차가 반지름의 0.5%)는 큰 원에서 가장자리가 눈에 띄게 어긋난다
            convertPathData: { makeArcs: false },
          },
        },
      },
      removeEmptyImage,
    ],
  });
  // viewBox는 원본 값을 유지한다 (반올림하면 전체 배율·가장자리 위치가 달라진다)
  const fixed = data.replace(/^(<svg\b[^>]*?\sviewBox=")[^"]*(")/, `$1${viewBox}$2`);
  return { data: fixed, floatPrecision };
}

async function main() {
  const lib = require(libPath);
  const names = Object.keys(lib)
    .filter((k) => k !== "utils" && typeof lib[k] === "function")
    .filter((k) => !only || only.includes(k))
    .sort();
  if (only && names.length !== only.length) {
    const missing = only.filter((n) => !names.includes(n));
    throw new Error(`없는 컴포넌트: ${missing.join(", ")}`);
  }

  if (!only && existsSync(outDir)) rmSync(outDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  let before = 0;
  let after = 0;
  for (const name of names) {
    const raw = extractSvg(lib[name]);
    const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1];
    if (!viewBox) throw new Error(`viewBox 없음: ${name}`);
    const { data } = optimizeSvg(raw, viewBox, name);
    writeFileSync(join(outDir, `${name}.svg`), data);
    before += Buffer.byteLength(raw);
    after += Buffer.byteLength(data);
  }
  console.log(
    `[build-svg] ${names.length}개 → ${outDir} (렌더 원본 ${before.toLocaleString()} → ${after.toLocaleString()} bytes)`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
