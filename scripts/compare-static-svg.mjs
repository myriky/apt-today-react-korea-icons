// 기준(컴포넌트 렌더 원본)과 정적 SVG(dist/svg)를 픽셀 비교한다.
// puppeteer·pixelmatch·pngjs가 example/에 있으므로 example/에서 실행한다.
//   cd example && node ../scripts/compare-static-svg.mjs [--only A,B] [--sizes 256,16,13]
//     [--lib 기준 dist/index.js] [--svg dist/svg] [--out 결과 폴더] [--json 결과.json]
// 두 쪽 모두 <img src="data:image/svg+xml,..."> 로 그려서, 최적화 차이만 남도록 한다.
import { createRequire } from "module";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requireRoot = createRequire(join(root, "package.json"));
const requireExample = createRequire(join(root, "example/package.json"));
const puppeteer = requireExample("puppeteer");
const pixelmatch = requireExample("pixelmatch").default ?? requireExample("pixelmatch");
const { PNG } = requireExample("pngjs");
const { renderToStaticMarkup } = requireRoot("react-dom/server");
const { createElement: h } = requireRoot("react");

const args = process.argv.slice(2);
const arg = (n) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};
const only = arg("--only")?.split(",").filter(Boolean);
const sizes = (arg("--sizes") ?? "256,16,13").split(",").map(Number);
const libPath = resolve(arg("--lib") ?? join(root, "dist/index.js"));
const svgDir = resolve(arg("--svg") ?? join(root, "dist/svg"));
const outDir = arg("--out") ? resolve(arg("--out")) : null;
const jsonOut = arg("--json") ? resolve(arg("--json")) : null;

const lib = requireRoot(libPath);
const names = readdirSync(svgDir)
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.slice(0, -4))
  .filter((n) => !only || only.includes(n))
  .sort();

// 불일치 기준: 큰 크기(>16px)는 눈에 띄는 차이 픽셀이 0.2% 초과, 작은 크기(<=16px)는 5픽셀 초과
const isMismatch = (size, r) => (size > 16 ? r.perceptual / r.total > 0.002 : r.perceptual > 5);

const toDataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

async function render(svg, size) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;background:#fff">` +
      `<img id="i" width="${size}" height="${size}" style="display:block" src="${toDataUri(svg)}"></body></html>`,
  );
  const ok = await page.evaluate(async () => {
    const i = document.getElementById("i");
    try {
      await i.decode();
      return true;
    } catch {
      return false;
    }
  });
  if (!ok) throw new Error("SVG를 이미지로 불러오지 못함 (XML 파싱 오류 가능)");
  return page.screenshot({ type: "png", clip: { x: 0, y: 0, width: size, height: size } });
}

const results = [];
for (const name of names) {
  const Comp = lib[name];
  if (!Comp) throw new Error(`기준 라이브러리에 없는 컴포넌트: ${name}`);
  // 기준: 컴포넌트 렌더 원본 그대로. 독립 XML로 열리도록 xmlns:xlink 선언만 보탠다(그 외 변경 없음).
  let before = renderToStaticMarkup(h(Comp));
  if (before.includes("xlink:") && !before.includes("xmlns:xlink")) {
    before = before.replace(/^<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }
  const after = readFileSync(join(svgDir, `${name}.svg`), "utf8");
  const row = { name, beforeBytes: Buffer.byteLength(before), afterBytes: Buffer.byteLength(after), sizes: {} };
  for (const size of sizes) {
    const [b, a] = [PNG.sync.read(await render(before, size)), PNG.sync.read(await render(after, size))];
    const total = size * size;
    const diff = new PNG({ width: size, height: size });
    // strict: 색이 조금이라도 다른 픽셀 / perceptual: 임계값 0.1, 안티앨리어싱 차이 제외
    const strict = pixelmatch(b.data, a.data, null, size, size, { threshold: 0, includeAA: true });
    const perceptual = pixelmatch(b.data, a.data, diff.data, size, size, { threshold: 0.1, includeAA: false });
    // 채널별 최대 차이 (0~255)
    let maxDelta = 0;
    for (let i = 0; i < b.data.length; i++) maxDelta = Math.max(maxDelta, Math.abs(b.data[i] - a.data[i]));
    row.sizes[size] = { strict, perceptual, total, maxDelta };
    row.sizes[size].mismatch = isMismatch(size, row.sizes[size]);
    if (outDir && row.sizes[size].mismatch) {
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, `${name}-${size}-before.png`), PNG.sync.write(b));
      writeFileSync(join(outDir, `${name}-${size}-after.png`), PNG.sync.write(a));
      writeFileSync(join(outDir, `${name}-${size}-diff.png`), PNG.sync.write(diff));
    }
  }
  results.push(row);
  const cols = sizes
    .map((s) => {
      const r = row.sizes[s];
      return `${s}px strict ${r.strict} / perc ${r.perceptual} / maxΔ ${r.maxDelta}`;
    })
    .join(" | ");
  console.log(`${name.padEnd(16)} ${row.beforeBytes.toString().padStart(7)} → ${row.afterBytes.toString().padStart(7)}  ${cols}`);
}
await browser.close();

if (jsonOut) writeFileSync(jsonOut, JSON.stringify(results, null, 2));
const withDiff = results.filter((r) => sizes.some((s) => r.sizes[s].perceptual > 0));
const failing = results.filter((r) => sizes.some((s) => r.sizes[s].mismatch));
console.log(`\n비교 ${results.length}개, 눈에 띄는 차이가 조금이라도 있는 항목 ${withDiff.length}개, 불일치(기준 초과) ${failing.length}개`);
for (const r of failing) {
  const detail = sizes
    .filter((s) => r.sizes[s].mismatch)
    .map((s) => `${s}px ${r.sizes[s].perceptual}px(${((r.sizes[s].perceptual / r.sizes[s].total) * 100).toFixed(2)}%)`)
    .join(", ");
  console.log(`  불일치: ${r.name} — ${detail}`);
}
process.exitCode = failing.length ? 1 : 0;
