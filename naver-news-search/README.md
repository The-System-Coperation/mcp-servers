# naver-news-mcp

이 프로젝트는 네이버 뉴스 검색 API를 Model Context Protocol(MCP) 인터페이스로 제공하는 서버입니다.

## 기능

### 뉴스 검색

* 네이버 뉴스 검색 API의 키워드 기반 뉴스 검색 기능 제공
* 다양한 정렬 옵션 지원 (정확도순, 날짜순)
* 페이지네이션 지원 (최대 1000개)
* 한 번에 표시할 결과 개수 조절 (최대 100개)

## 설치

### npm을 통한 설치

```bash
npm install -g naver-news-mcp-server
```

### 소스코드로 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/naver-news-mcp.git
cd naver-news-mcp

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

### 뉴스 검색 파라미터

```typescript
{
  query: string;              // 검색을 원하는 질의어 (UTF-8 인코딩 필요)
  display?: number;           // 한 번에 표시할 검색 결과 개수 (기본값: 10, 최대: 100)
  start?: number;             // 검색 시작 위치 (기본값: 1, 최대: 1000)
  sort?: 'sim' | 'date';      // 정렬 옵션 (sim: 정확도순, date: 날짜순)
}
```

## MCP 서버 설정

### MCP 서버 실행

```bash
npx -y naver-news-mcp-server
```

### MCP 설정 예시

```json
{
  "naver-news-search": {
    "command": "npx",
    "args": [
      "-y",
      "naver-news-mcp"
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
