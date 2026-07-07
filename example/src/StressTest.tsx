import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { utils, type IconInfo, type RegionInfo } from "@apt.today/react-korea-icons";

/**
 * 다중 인스턴스 렌더링 스트레스 테스트
 *
 * apt.today 프로덕션에서 발견된 버그 재현 페이지:
 * 같은 아이콘이 한 페이지에 여러 번 렌더링될 때 gradient ID가 중복되고,
 * DOM 순서상 첫 번째 인스턴스가 display:none 컨테이너 안에 있으면
 * url(#...)가 숨겨진 defs를 참조해 보이는 아이콘의 fill이 사라진다.
 * (apt.today의 모바일 전용 `lg:hidden` 블록이 이 조건을 만든다)
 */

const ICON_SIZE = 40;

interface StressEntry {
  key: string;
  label: string;
  componentName: string;
  component: IconInfo["component"];
  idCount: number;
  /** ID를 고유 프리픽스로 재작성한 정적 마크업 (정상 렌더링 기준본) */
  refMarkup: string;
}

function buildEntries(): StressEntry[] {
  const entries: StressEntry[] = [];
  const seen = new Set<string>();

  const push = (label: string, componentName: string, component: IconInfo["component"]) => {
    if (seen.has(componentName)) return;
    seen.add(componentName);
    const markup = renderToStaticMarkup(
      createElement(component, { width: ICON_SIZE, height: ICON_SIZE }),
    );
    const idCount = (markup.match(/id="kicon-[^"]+"/g) ?? []).length;
    const refMarkup = markup.replace(
      /kicon-([a-zA-Z]+)-([A-Za-z0-9]+)(?![A-Za-z0-9])/g,
      `ref-${componentName}-kicon-$1-$2`,
    );
    entries.push({ key: componentName, label, componentName, component, idCount, refMarkup });
  };

  utils.getAvailableRegions().forEach((r: RegionInfo) => {
    if (r.component) push(r.shortName, r.englishName, r.component);
  });
  utils.getAll().forEach((i: IconInfo) => push(`${i.regionName} ${i.shortName}`, i.componentName, i.component));
  return entries;
}

/** url(#id) 참조가 display:none 서브트리 안의 요소로 해석되는 인스턴스 탐지 */
function scanBroken(container: HTMLElement): Map<string, number> {
  const broken = new Map<string, number>();
  container.querySelectorAll<HTMLElement>("[data-stress-name]").forEach((wrapper) => {
    const svg = wrapper.querySelector("svg");
    if (!svg) return;
    const refs = svg.outerHTML.match(/url\((?:&quot;|["'])?#(kicon-[^)"'&]+)/g) ?? [];
    const ids = [...new Set(refs.map((r) => r.replace(/url\((?:&quot;|["'])?#/, "")))];
    const isBroken = ids.some((id) => {
      let el: Element | null = document.getElementById(id);
      if (!el) return true;
      while (el && el !== document.body) {
        if (el instanceof HTMLElement && getComputedStyle(el).display === "none") return true;
        el = el.parentElement;
      }
      return false;
    });
    if (isBroken) {
      const name = wrapper.dataset.stressName!;
      broken.set(name, (broken.get(name) ?? 0) + 1);
    }
  });
  return broken;
}

function StressTest() {
  const [repeat, setRepeat] = useState(5);
  const [hideFirst, setHideFirst] = useState(true);
  const [onlyWithIds, setOnlyWithIds] = useState(true);
  const [brokenByName, setBrokenByName] = useState<Map<string, number>>(new Map());
  const gridRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(buildEntries, []);
  const filtered = onlyWithIds ? entries.filter((e) => e.idCount > 0) : entries;
  const withIdCount = entries.filter((e) => e.idCount > 0).length;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (gridRef.current) setBrokenByName(scanBroken(gridRef.current));
    });
    return () => cancelAnimationFrame(raf);
  }, [repeat, hideFirst, onlyWithIds]);

  const brokenCount = filtered.filter((e) => brokenByName.has(e.componentName)).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div>
            <h1 className="text-lg font-bold">다중 인스턴스 스트레스 테스트</h1>
            <a href="#/" className="text-xs text-blue-500 hover:underline">← 갤러리로 돌아가기</a>
          </div>

          <label className="flex items-center gap-2 text-sm">
            반복
            <input
              type="range" min={2} max={10} value={repeat}
              onChange={(e) => setRepeat(Number(e.target.value))}
              className="w-24 accent-blue-500"
            />
            <span className="tabular-nums w-8">{repeat}회</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={hideFirst} onChange={(e) => setHideFirst(e.target.checked)} className="accent-blue-500" />
            첫 인스턴스를 display:none 블록에 렌더 (apt.today 재현 조건)
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={onlyWithIds} onChange={(e) => setOnlyWithIds(e.target.checked)} className="accent-blue-500" />
            내부 ID 사용 아이콘만 ({withIdCount}개)
          </label>

          <div
            data-testid="broken-summary"
            className={`ml-auto text-sm font-medium px-3 py-1.5 rounded-lg ${
              brokenCount > 0
                ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                : "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400"
            }`}
          >
            {brokenCount > 0
              ? `깨짐 감지: ${brokenCount} / ${filtered.length}개 아이콘 (숨겨진 defs 참조)`
              : `깨짐 없음 (${filtered.length}개 아이콘 검사)`}
          </div>
        </div>
      </header>

      {/* apt.today의 lg:hidden 모바일 블록 재현 — 반드시 그리드보다 먼저(DOM 순서) */}
      {hideFirst && (
        <div style={{ display: "none" }} aria-hidden data-testid="hidden-first-block">
          {filtered.map((e) => {
            const Icon = e.component;
            return <Icon key={e.key} width={ICON_SIZE} height={ICON_SIZE} />;
          })}
        </div>
      )}

      <main ref={gridRef} className="max-w-6xl mx-auto px-4 py-6 space-y-1">
        <div className="hidden sm:flex items-center gap-3 pb-2 text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-900">
          <span className="w-44 shrink-0">아이콘</span>
          <span className="flex-1">반복 인스턴스 (문서 공유 ID 참조)</span>
          <span className="w-24 text-center shrink-0">고유 ID 기준본</span>
        </div>

        {filtered.map((e) => {
          const Icon = e.component;
          const broken = brokenByName.get(e.componentName) ?? 0;
          return (
            <div
              key={e.key}
              className={`flex items-center gap-3 py-1.5 rounded-lg ${
                broken > 0 ? "bg-red-50/60 dark:bg-red-950/30" : ""
              }`}
            >
              <div className="w-44 shrink-0 pl-2">
                <p className="text-sm truncate">{e.label}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-mono truncate">
                  {e.componentName}
                  {e.idCount > 0 && <span className="ml-1 text-amber-500">ID×{e.idCount}</span>}
                  {broken > 0 && <span className="ml-1 text-red-500 font-sans font-medium">깨짐 {broken}</span>}
                </p>
              </div>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                {Array.from({ length: repeat }, (_, i) => (
                  <span key={i} data-stress-name={e.componentName} className="shrink-0 leading-none">
                    <Icon width={ICON_SIZE} height={ICON_SIZE} />
                  </span>
                ))}
              </div>
              <div
                className="w-24 shrink-0 flex justify-center border-l border-gray-100 dark:border-gray-900"
                dangerouslySetInnerHTML={{ __html: e.refMarkup }}
              />
            </div>
          );
        })}
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 text-xs text-gray-400 dark:text-gray-500 space-y-1">
        <p>
          "반복 인스턴스"는 같은 컴포넌트를 그대로 여러 번 렌더링한 것으로, 모든 인스턴스가 동일한 gradient ID를 공유합니다.
        </p>
        <p>
          "고유 ID 기준본"은 ID를 인스턴스별로 재작성한 정상 렌더링 결과입니다. 두 열이 다르게 보이면 ID 충돌 버그입니다.
        </p>
      </footer>
    </div>
  );
}

export default StressTest;
