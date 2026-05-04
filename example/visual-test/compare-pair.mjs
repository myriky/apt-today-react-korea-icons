// 일반화된 SVG 쌍 픽셀 비교 도구
// 사용: node compare-pair.mjs <before.svg> <after.svg> [size1,size2,...] [outDir]
// 또는 import해서 comparePair(beforeSvg, afterSvg, sizes) 호출
import puppeteer from "puppeteer";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

let _browser = null;
async function getBrowser() {
  if (!_browser) _browser = await puppeteer.launch({ headless: true });
  return _browser;
}

export async function closeBrowser() {
  if (_browser) {
    await _browser.close();
    _browser = null;
  }
}

async function renderSvgToPng(svgContent, size) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const html = `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;background:#fff;}
    .box{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;}
    svg{width:${size}px;height:${size}px;}
  </style></head><body><div class="box">${svgContent}</div></body></html>`;
  await page.setContent(html);
  const buffer = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, width: size, height: size },
    omitBackground: false,
  });
  await page.close();
  return buffer;
}

export async function comparePair(label, beforeSvg, afterSvg, sizes = [16, 32, 48, 128, 512], outDir = null) {
  const results = [];
  for (const size of sizes) {
    const [b, a] = await Promise.all([
      renderSvgToPng(beforeSvg, size),
      renderSvgToPng(afterSvg, size),
    ]);
    const bImg = PNG.sync.read(b);
    const aImg = PNG.sync.read(a);
    if (bImg.width !== aImg.width || bImg.height !== aImg.height) {
      results.push({ size, error: "dimension mismatch" });
      continue;
    }
    const diff = new PNG({ width: bImg.width, height: bImg.height });
    const strict = pixelmatch(bImg.data, aImg.data, diff.data, bImg.width, bImg.height, {
      threshold: 0.0,
      includeAA: true,
    });
    const aaDiff = new PNG({ width: bImg.width, height: bImg.height });
    const aa = pixelmatch(bImg.data, aImg.data, aaDiff.data, bImg.width, bImg.height, {
      threshold: 0.1,
      includeAA: false,
    });

    if (outDir && !existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    if (outDir) {
      writeFileSync(`${outDir}/${label}-${size}-before.png`, b);
      writeFileSync(`${outDir}/${label}-${size}-after.png`, a);
      writeFileSync(`${outDir}/${label}-${size}-diff.png`, PNG.sync.write(diff));
    }

    results.push({
      size,
      total: bImg.width * bImg.height,
      strict,
      aa,
      strictPct: ((strict / (bImg.width * bImg.height)) * 100).toFixed(4),
      aaPct: ((aa / (bImg.width * bImg.height)) * 100).toFixed(4),
    });
  }
  return results;
}

// CLI mode — COMPARE_PAIR_CLI=1 일 때만 CLI 실행
(async () => {
  if (process.env.COMPARE_PAIR_CLI !== "1") return;
  const [, , beforePath, afterPath, sizesArg, outDir] = process.argv;
  if (!beforePath || !afterPath) {
    console.error("Usage: node compare-pair.mjs <before.svg> <after.svg> [sizes] [outDir]");
    process.exit(2);
  }
  const sizes = sizesArg ? sizesArg.split(",").map(Number) : [16, 32, 48, 128, 512];
  const before = readFileSync(beforePath, "utf8");
  const after = readFileSync(afterPath, "utf8");
  const label = beforePath.split("/").pop().replace(/\.svg$/, "");
  const results = await comparePair(label, before, after, sizes, outDir);

  console.log(`\n[${label}]  size  | strict diff (px / %) | AA-tolerant (px / %)`);
  console.log("-".repeat(72));
  let totalStrict = 0;
  for (const r of results) {
    if (r.error) {
      console.log(`${String(r.size).padEnd(7)}| ERROR ${r.error}`);
      continue;
    }
    totalStrict += r.strict;
    console.log(`${String(r.size).padEnd(7)}| ${String(r.strict).padStart(8)} (${r.strictPct}%)  | ${String(r.aa).padStart(8)} (${r.aaPct}%)`);
  }
  console.log(`\n총 strict diff: ${totalStrict} 픽셀`);
  console.log(totalStrict === 0 ? "✅ 완벽 일치" : "⚠️  diff 존재 — diff PNG 검토");
  await closeBrowser();
})();
