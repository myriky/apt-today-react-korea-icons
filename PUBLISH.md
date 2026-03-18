# npm 배포 가이드

## 사전 준비

1. npm 계정 생성 (아직 없는 경우)
   - https://www.npmjs.com/ 에서 회원가입

2. npm 로그인
   ```bash
   npm login
   ```

## 배포 절차

### 1. package.json 확인

- `name`: 패키지명이 고유한지 확인
- `version`: 버전 확인
- `description`, `keywords`: 검색 최적화를 위해 작성
- `author`: 작성자 정보 입력
- `license`: 라이선스 확인
- `repository`: GitHub 저장소 URL 추가

### 2. README.md 최종 검토

- 사용 예제 확인
- 설치 방법 확인
- 문서 완성도 확인

### 3. 빌드 테스트

```bash
npm run build
```

### 4. 패키지 내용 확인

```bash
npm pack --dry-run
```

이 명령으로 실제로 배포될 파일 목록을 확인할 수 있습니다.

### 5. npm 배포

```bash
npm publish
```

처음 배포하는 경우:
```bash
npm publish --access public
```

### 6. 배포 확인

- https://www.npmjs.com/package/@apt.today/react-korea-icons 에서 패키지 확인
- 설치 테스트:
  ```bash
  npx create-react-app test-app
  cd test-app
  npm install @apt.today/react-korea-icons
  ```

## 버전 업데이트

### Patch 버전 (버그 수정)
```bash
npm version patch
npm publish
```

### Minor 버전 (새로운 기능)
```bash
npm version minor
npm publish
```

### Major 버전 (Breaking Changes)
```bash
npm version major
npm publish
```

## GitHub 저장소 연결 (선택사항)

1. GitHub에 저장소 생성

2. 로컬 저장소와 연결
   ```bash
   git remote add origin https://github.com/apt-today/react-korea-icons.git
   git branch -M main
   git push -u origin main
   ```

3. package.json의 repository 필드 업데이트
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/apt-today/react-korea-icons.git"
   }
   ```

## 자동화 (선택사항)

GitHub Actions를 사용한 자동 배포:

`.github/workflows/publish.yml` 파일 생성:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 주의사항

- 한 번 배포한 버전은 삭제하거나 수정할 수 없습니다
- 패키지명은 고유해야 하며, 이미 사용 중인 이름은 사용할 수 없습니다
- 배포 전 항상 빌드 테스트를 실행하세요
- 라이선스를 명확히 지정하세요

