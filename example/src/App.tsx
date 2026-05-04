import { useState, useCallback, useEffect } from "react";
import { utils, type IconInfo, type RegionInfo } from "@apt.today/react-korea-icons";

const PACKAGE_NAME = "@apt.today/react-korea-icons";

// 시군구가 있는 시도만 필터
const allIcons = utils.getAll();
const availableRegions = utils.getAvailableRegions();

function App() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<number | null>(null);
  const [iconSize, setIconSize] = useState(48);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredIcons = allIcons.filter((icon) => {
    const matchesRegion = activeRegion === null || icon.regionCode === activeRegion;
    if (!matchesRegion) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      icon.name.includes(q) ||
      icon.shortName.includes(q) ||
      icon.componentName.toLowerCase().includes(q) ||
      icon.regionName.includes(q)
    );
  });

  const handleCopy = useCallback(async (icon: IconInfo) => {
    const importStatement = `import { ${icon.componentName} } from '${PACKAGE_NAME}'`;
    try {
      await navigator.clipboard.writeText(importStatement);
      setCopiedName(icon.componentName);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // fallback
    }
  }, []);

  const handleRegionCopy = useCallback(async (region: RegionInfo) => {
    const importStatement = `import { ${region.englishName} } from '${PACKAGE_NAME}'`;
    try {
      await navigator.clipboard.writeText(importStatement);
      setCopiedName(region.englishName);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // fallback
    }
  }, []);

  const handleInstallCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`npm install ${PACKAGE_NAME}`);
      setCopiedName("__install__");
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="테마 전환"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            대한민국 행정구역 아이콘
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            광역/기초자치단체 공식 로고를 React 컴포넌트로 제공합니다.
            <br className="hidden sm:block" />
            클릭하면 import 구문이 복사됩니다. 상단 아이콘으로 지역 필터링이 가능합니다.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleInstallCopy}
              className="group inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full px-5 py-2.5 text-sm font-mono hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            >
              <span>npm install {PACKAGE_NAME}</span>
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
              {copiedName === "__install__" && (
                <span className="text-green-400 dark:text-green-600 text-xs font-sans">복사됨!</span>
              )}
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            {allIcons.length}개 아이콘 &middot; MIT 라이선스 &middot; React &amp; TypeScript
          </p>
        </div>
      </header>

      {/* Region Grid */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
          {availableRegions.map((region) => (
            <RegionCard
              key={region.code}
              region={region}
              iconSize={48}
              isActive={activeRegion === region.code}
              onFilter={() => setActiveRegion(activeRegion === region.code ? null : region.code)}
              onCopy={handleRegionCopy}
              isCopied={copiedName === region.englishName}
            />
          ))}
        </div>
      </section>

      {/* Search & Filter */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="아이콘 검색... (강남, Gangnam, 서울...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Size Control */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIconSize((s) => Math.max(14, s - 2))}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="아이콘 축소"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <input
                type="range"
                min={14}
                max={128}
                step={2}
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                className="w-20 sm:w-24 accent-blue-500"
              />
              <button
                onClick={() => setIconSize((s) => Math.min(128, s + 2))}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="아이콘 확대"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <span className="text-xs text-gray-400 dark:text-gray-500 w-8 text-right tabular-nums">{iconSize}</span>
            </div>
          </div>

          {/* Active filter indicator */}
          {activeRegion !== null && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {availableRegions.find(r => r.code === activeRegion)?.shortName} 필터 적용중
              </span>
              <button
                onClick={() => setActiveRegion(null)}
                className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                전체 보기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Icon Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredIcons.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              검색 결과가 없습니다.
            </p>
          </div>
        ) : (
          <div className={`grid gap-3 ${
            iconSize >= 96
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : iconSize >= 64
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
          }`}>
            {filteredIcons.map((icon) => (
              <IconCard
                key={icon.code}
                icon={icon}
                iconSize={iconSize}
                onCopy={handleCopy}
                isCopied={copiedName === icon.componentName}
              />
            ))}
          </div>
        )}

        {/* count */}
        <p className="mt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          {filteredIcons.length}개 아이콘
          {activeRegion !== null && ` (${availableRegions.find(r => r.code === activeRegion)?.shortName})`}
        </p>
      </main>

      {/* Usage Examples */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">사용법</h2>

          <div className="space-y-6">
            <CodeExample
              title="컴포넌트 직접 사용"
              code={`import { GangnamGu, Seoul } from '${PACKAGE_NAME}'

function MyApp() {
  return (
    <>
      <Seoul width={48} height={48} />
      <GangnamGu className="w-12 h-12" />
    </>
  )
}`}
            />

            <CodeExample
              title="코드로 동적 조회 (유틸리티)"
              code={`import { utils } from '${PACKAGE_NAME}'

// 시도 코드 (2자리) 또는 시군구 코드 (5자리)
const SeoulIcon = utils.getIcon(11)      // 서울특별시
const GangnamIcon = utils.getIcon(11680) // 강남구

// 이름으로 검색
const Icon = utils.findByName("강남구")
const Icon2 = utils.findByName("중구", { region: "서울" })

// 지역별 목록
const seoulIcons = utils.getByRegion("서울")
seoulIcons.map(icon => <icon.component key={icon.code} width={48} />)`}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>아이콘: 공공누리 제1유형 &middot; 코드: MIT</p>
          <p className="mt-1">
            Made by{" "}
            <a
              href="https://apt.today"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:underline"
            >
              apt.today 오늘의아파트
            </a>
          </p>
        </div>
      </footer>

      {/* Toast */}
      {copiedName && copiedName !== "__install__" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-mono px-4 py-2.5 rounded-xl shadow-lg">
            import {"{"} {copiedName} {"}"} 복사됨!
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Sub Components
// ============================================

function IconCard({
  icon,
  iconSize,
  onCopy,
  isCopied,
}: {
  icon: IconInfo;
  iconSize: number;
  onCopy: (icon: IconInfo) => void;
  isCopied: boolean;
}) {
  const Icon = icon.component;

  return (
    <button
      onClick={() => onCopy(icon)}
      className={`
        group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all
        ${isCopied
          ? "border-green-500 bg-green-50 dark:bg-green-950/30"
          : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
        }
      `}
      title={`${icon.componentName} — 클릭하여 복사`}
    >
      <Icon style={{ width: iconSize, height: iconSize }} />
      <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight truncate w-full">
        {icon.name}
      </span>
      {isCopied && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-50/90 dark:bg-green-950/80 rounded-xl">
          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      )}
    </button>
  );
}

function RegionCard({
  region,
  iconSize,
  isActive,
  onFilter,
  onCopy,
  isCopied,
}: {
  region: RegionInfo;
  iconSize: number;
  isActive: boolean;
  onFilter: () => void;
  onCopy: (region: RegionInfo) => void;
  isCopied: boolean;
}) {
  const Icon = region.component;
  if (!Icon) return null;

  return (
    <div
      className={`
        group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all cursor-pointer
        ${isActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 ring-1 ring-blue-500"
          : isCopied
          ? "border-green-500 bg-green-50 dark:bg-green-950/30"
          : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
        }
      `}
      onClick={onFilter}
      title={`${region.shortName} — 클릭하여 필터`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onCopy(region); }}
        className="absolute top-1.5 right-1.5 p-1 rounded-md text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        title="import 복사"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>
      </button>
      <Icon style={{ width: iconSize, height: iconSize }} />
      <span className={`text-xs text-center leading-tight truncate w-full ${
        isActive ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-500 dark:text-gray-400"
      }`}>
        {region.shortName}
      </span>
      {isCopied && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-50/90 dark:bg-green-950/80 rounded-xl">
          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      )}
    </div>
  );
}

function CodeExample({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          {copied ? "복사됨!" : "복사"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-white dark:bg-gray-900">
        <code className="text-gray-800 dark:text-gray-200">{code}</code>
      </pre>
    </div>
  );
}

export default App;
