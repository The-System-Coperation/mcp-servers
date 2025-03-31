# naver-local-mcp

이 프로젝트는 네이버 지역 검색 API를 Model Context Protocol(MCP) 인터페이스로 제공하는 서버입니다.

## 기능

### 지역 검색

* 네이버 지역 검색 API의 키워드 기반 업체/기관 검색 기능 제공
* 정확도/리뷰 수 기준 정렬 지원
* 페이지네이션 지원
* 한 번에 표시할 결과 개수 조절 (최대 5개)
* KATECH 좌표계 기반 위치 정보 제공

## 설치

### npm을 통한 설치

```bash
npm install -g naver-local-mcp-server
```

### 소스코드로 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/naver-local-mcp.git
cd naver-local-mcp

# 의존성 설치 및 빌드
npm install
npm run build
```

## 개발 환경 설정

### 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가합니다:

```bash
# .env.example 파일을 복사하여 .env 파일 생성
cp .env.example .env

# .env 파일을 열고 다음 내용을 수정
NAVER_CLIENT_ID=your_naver_client_id_here
NAVER_CLIENT_SECRET=your_naver_client_secret_here
```

### 개발 서버 실행

```bash
# 개발 모드로 실행
npm run dev

# 빌드
npm run build

# 실행
npm start
```

## API 사용 방법

### 지역 검색 파라미터

```typescript
{
  query: string;                    // 검색을 원하는 질의어
  display?: number;                 // 한 번에 표시할 검색 결과 개수 (기본값: 1, 최대: 5)
  start?: number;                   // 검색 시작 위치 (기본값: 1, 최대: 1)
  sort?: 'random' | 'comment';      // 정렬 옵션 (random: 정확도순, comment: 리뷰 수순)
}
```

## MCP 서버 설정

### MCP 서버 실행

```bash
npx -y naver-local-mcp-server
```

### MCP 설정 예시

```json
{
  "naver-local": {
    "command": "npx",
    "args": [
      "-y",
      "naver-local-mcp"
    ],
    "env": {
      "NAVER_CLIENT_ID": "your_naver_client_id_here",
      "NAVER_CLIENT_SECRET": "your_naver_client_secret_here"
    }
  }
}
```

## 시스템 요구사항

* Node.js >= 18.0.0

## 라이선스

MIT
