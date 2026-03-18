# @apt.today/react-korea-icons - 예제

이 폴더는 `@apt.today/react-korea-icons` 패키지를 실제로 사용하는 예제입니다.

## 실행 방법

### 1. 상위 패키지 빌드

먼저 상위 폴더에서 패키지를 빌드해야 합니다:

```bash
cd ..
yarn build
```

### 2. 예제 의존성 설치

```bash
cd example
yarn install
```

### 3. 개발 서버 실행

```bash
yarn dev
```

브라우저에서 자동으로 열립니다 (보통 http://localhost:5173)

## 주요 기능

- ✅ 패키지를 로컬 파일로 설치하여 실제 사용 방식 시연
- ✅ 시도 및 시군구 전체 아이콘 갤러리
- ✅ 크기와 색상을 동적으로 조절 가능
- ✅ 다양한 사용 예제 코드 제공
- ✅ currentColor를 활용한 색상 제어 시연

## 패키지 링크 방식

`package.json`에서 `"@apt.today/react-korea-icons": "file:.."`로 설정하여 
상위 폴더의 패키지를 직접 링크합니다. 

이는 실제 npm에 배포되었을 때와 동일한 방식으로 패키지를 사용할 수 있게 해줍니다.

