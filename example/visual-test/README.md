# visual-test — SSR 안전성 + 변환 인프라

이 디렉토리의 도구들은 패키지의 SVG 컴포넌트를 SSR 다중 인스턴스 환경에서 안전하게 만들고 회귀를 방지하기 위한 인프라입니다.

## 스크립트

| 파일 | 용도 |
|---|---|
| `analyze-patterns.mjs` | src/components의 useId/clipPath/transform 패턴을 카테고리별로 분류 |
| `transform-component.mjs` | .tsx 한 파일을 받아 `<defs><clipPath>` 인라인화 + group transform을 path 좌표에 굽기 |
| `transform-svg.mjs` | 같은 변환을 raw SVG 문자열에 적용 (픽셀 비교용) |
| `compare-pair.mjs` | Puppeteer + pixelmatch로 두 SVG의 픽셀 비교 (anti-aliasing 옵션) |
| `bulk-transform.mjs` | 모든 컴포넌트에 대해 변환 시도 → 픽셀 동일성 통과 시만 .tsx 적용 |
| `codemod-option-d.mjs` | useId 호출과 `${id}` 템플릿을 `kicon-{컴포넌트명}-x` hardcoded prefix로 일괄 치환 |

## 빠른 사용

### 새 컴포넌트 추가 후 SSR 안전성 체크
```bash
# 1) 패턴 분류 — 어떤 카테고리인지
node visual-test/analyze-patterns.mjs

# 2) defs 인라인화 시도 (원본/변환본 픽셀 동일성 자동 검증)
cd example
node --experimental-vm-modules visual-test/bulk-transform.mjs --dry-run
# OK 보이면 --dry-run 빼고 실제 적용

# 3) defs 인라인화 안 되는 컴포넌트는 hardcoded prefix
node visual-test/codemod-option-d.mjs --dry-run
# OK면 적용
node visual-test/codemod-option-d.mjs
```

### 빌드 후 회귀 검증
```bash
cd example
yarn build  # 패키지
# bundle 후 실행 (esbuild로 react/react-dom alias 처리 필요)
node ssr-regression-after-fix.mjs   # 사전 번들 필요
```

## 관련 문서

- 패키지 README의 "SSR / 다중 인스턴스 안전성" 섹션
- CHANGELOG의 1.0.3 항목

## 의존성

```
puppeteer  — 헤드리스 Chrome으로 SVG → PNG 렌더
pixelmatch — 픽셀 비교 (anti-aliasing 옵션)
pngjs      — PNG 인코딩/디코딩
svgpath    — SVG path data에 transform 굽기
jsdom      — hydration 테스트 (옵션 B/C 거부 검증용, 필요 시)
```
