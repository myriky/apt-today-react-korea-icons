import { useMemo, useState } from "react";
// 이 페이지의 조회는 /meta만 사용한다 (컴포넌트 import 없음).
import { iconFile, findByName, getByCode, getAll, getAvailableRegions } from "@apt.today/react-korea-icons/meta";
// 아래 "컴포넌트와 비교" 섹션에서만 컴포넌트를 쓴다.
import { utils } from "@apt.today/react-korea-icons";

/** public/korea-icons 에 복사된 정적 SVG의 URL (scripts/copy-static-icons.mjs) */
const ICON_BASE = `${import.meta.env.BASE_URL}korea-icons/`;
const iconUrl = (code: number) => {
  const file = iconFile(code);
  return file ? ICON_BASE + file : null;
};

/** 앱에서 쓸 법한 최소 컴포넌트: 코드 → <img> */
function RegionIcon({ code, size = 24, alt }: { code: number; size?: number; alt?: string }) {
  const src = iconUrl(code);
  if (!src) return <span style={{ width: size, height: size }} className="inline-block rounded bg-gray-200 dark:bg-gray-800" />;
  const info = getByCode(code);
  return <img src={src} width={size} height={size} alt={alt ?? info?.name ?? ""} loading="lazy" decoding="async" style={{ width: size, height: size }} className="inline-block object-contain" />;
}

const SAMPLE_CODES = [11, 11680, 41130, 41135, 41117, 26290, 50, 99999];

const USAGE = `// 1) 정적 SVG를 public 아래로 복사 (빌드 전에 실행)
//    node_modules/@apt.today/react-korea-icons/dist/svg → public/korea-icons

// 2) /meta로 파일 이름을 찾아 <img>로 표시 (컴포넌트·React 코드가 번들에 안 들어감)
import { iconFile, getByCode } from "@apt.today/react-korea-icons/meta";

function RegionIcon({ code, size = 24 }) {
  const file = iconFile(code);          // 41135(분당구) → "SeongnamSi.svg"
  if (!file) return null;
  // Tailwind preflight(img { height: auto })를 쓰면 height 속성이 무시되므로 style로 고정
  return <img src={\`/korea-icons/\${file}\`} width={size} height={size}
              style={{ width: size, height: size }}
              alt={getByCode(code)?.name ?? ""} loading="lazy" />;
}`;

const USAGE_IMPORT = `// 번들러가 파일 하나만 asset으로 처리 (코드가 고정일 때)
import gangnamUrl from "@apt.today/react-korea-icons/svg/GangnamGu.svg";
<img src={gangnamUrl} width={32} height={32} alt="강남구" />`;

export default function StaticSvg() {
  const [codeInput, setCodeInput] = useState("41135");
  const [nameInput, setNameInput] = useState("중구");
  const [region, setRegion] = useState("");
  const [size, setSize] = useState(32);

  const code = Number(codeInput);
  const codeFile = Number.isFinite(code) && codeInput !== "" ? iconFile(code) : null;
  const codeInfo = Number.isFinite(code) && codeInput !== "" ? getByCode(code) : null;
  const byName = nameInput ? findByName(nameInput, region ? { region } : undefined) : null;

  const regions = getAvailableRegions();
  const all = getAll();
  const compareCodes = useMemo(() => [11680, 41460, 27110, 26290], []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <a href="#/" className="text-xs text-blue-500 hover:underline">← 갤러리로 돌아가기</a>
          <h1 className="mt-2 text-2xl font-bold">정적 SVG + <code className="font-mono">/meta</code></h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            아이콘을 React 컴포넌트 대신 정적 <code>.svg</code> 파일(<code>&lt;img&gt;</code>)로 쓰는 방법.
            조회는 컴포넌트를 import하지 않는 <code>@apt.today/react-korea-icons/meta</code>로 합니다.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-lg font-semibold mb-3">사용법</h2>
          <pre className="text-xs bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto"><code>{USAGE}</code></pre>
          <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto"><code>{USAGE_IMPORT}</code></pre>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">코드로 찾기 — <code className="font-mono text-base">iconFile(code)</code></h2>
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))}
              className="w-32 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-1.5 font-mono"
              placeholder="41135"
            />
            {SAMPLE_CODES.map((c) => (
              <button key={c} onClick={() => setCodeInput(String(c))} className="text-xs font-mono rounded-full border border-gray-300 dark:border-gray-700 px-2.5 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                {c}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <RegionIcon code={code} size={64} />
            <div className="text-sm font-mono space-y-1">
              <div>iconFile({codeInput || "?"}) → {codeFile ? `"${codeFile}"` : "null"}</div>
              <div className="text-gray-500">getByCode({codeInput || "?"}) → {codeInfo ? `${"regionName" in codeInfo ? codeInfo.regionName + " " : ""}${codeInfo.name}` : "null"}</div>
              {codeFile && !codeInfo && (
                <div className="text-amber-600 dark:text-amber-400">일반구 폴백: {code - (code % 10)} 소속 시 아이콘 사용</div>
              )}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">이름으로 찾기 — <code className="font-mono text-base">findByName(name, {"{ region }"})</code></h2>
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-48 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-1.5"
              placeholder="강남구, 서울 중구 …"
            />
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1.5">
              <option value="">region 없음</option>
              {regions.map((r) => <option key={r.code} value={r.shortName}>{r.shortName}</option>)}
            </select>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            {byName ? <RegionIcon code={byName.code} size={64} /> : <span className="w-16 h-16 rounded bg-gray-200 dark:bg-gray-800" />}
            <div className="text-sm font-mono">
              {byName
                ? `${byName.regionName} ${byName.name} (${byName.code}) → ${iconFile(byName.code)}`
                : "null — 없거나 같은 이름이 여러 개 (region으로 좁히세요)"}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">컴포넌트와 비교</h2>
          <label className="flex items-center gap-2 text-sm mb-4">
            크기
            <input type="range" min={13} max={128} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-40 accent-blue-500" />
            <span className="tabular-nums">{size}px</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {compareCodes.map((c) => {
              const Comp = utils.getIcon(c);
              return (
                <div key={c} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-center">
                  <div className="text-xs mb-2">{getByCode(c)?.name}</div>
                  <div className="flex justify-around items-end">
                    <div>{Comp && <Comp width={size} height={size} />}<div className="text-[10px] text-gray-500">컴포넌트</div></div>
                    <div><RegionIcon code={c} size={size} /><div className="text-[10px] text-gray-500">&lt;img&gt;</div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-1">전체 {all.length}개 — <code className="font-mono text-base">&lt;img loading="lazy"&gt;</code></h2>
          <p className="text-xs text-gray-500 mb-4">화면에 들어온 파일만 내려받습니다 (네트워크 탭에서 확인).</p>
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-3">
            {all.map((i) => (
              <div key={i.code} title={`${i.regionName} ${i.name} · ${i.componentName}.svg`} className="flex flex-col items-center gap-1">
                <RegionIcon code={i.code} size={32} />
                <span className="text-[10px] text-gray-500 truncate w-full text-center">{i.shortName}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
