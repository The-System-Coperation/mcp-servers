# kakao-local-mcp

이 프로젝트는 카카오 로컬 API를 Model Context Protocol(MCP) 인터페이스로 제공하는 서버입니다.

## 기능

### 키워드로 장소 검색

* 카카오 로컬 API의 키워드 기반 장소 검색 기능 제공
* 다양한 카테고리 필터링 지원 (마트, 편의점, 학교 등 18개 카테고리)
* 위치 기반 검색 (반경 또는 사각형 영역)
* 거리/정확도 기준 정렬 지원
* 페이지네이션 지원 (최대 45페이지)

## 설치

### npm을 통한 설치

```bash
npm install -g kakao-local-mcp-server
```

### 소스코드로 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/kakao-map-mcp.git
cd kakao-map-mcp

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
KAKAO_API_KEY=your_kakao_rest_api_key_here
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

### 키워드 검색 파라미터

```typescript
{
  query: string;              // 검색을 원하는 질의어
  category_group_code?: CategoryGroupCode; // 카테고리 그룹 코드
  x?: string;                // 중심 좌표의 X값 (경도)
  y?: string;                // 중심 좌표의 Y값 (위도)
  radius?: number;           // 중심 좌표부터의 반경거리 (미터)
  rect?: string;             // 사각형의 지정 범위
  page?: number;             // 결과 페이지 번호 (1-45)
  size?: number;             // 한 페이지의 결과 수 (1-15)
  sort?: 'distance' | 'accuracy'; // 정렬 옵션
}
```

### 카테고리 그룹 코드

* MT1: 대형마트
* CS2: 편의점
* PS3: 어린이집, 유치원
* SC4: 학교
* AC5: 학원
* PK6: 주차장
* OL7: 주유소, 충전소
* SW8: 지하철역
* BK9: 은행
* CT1: 문화시설
* AG2: 중개업소
* PO3: 공공기관
* AT4: 관광명소
* AD5: 숙박
* FD6: 음식점
* CE7: 카페
* HP8: 병원
* PM9: 약국

## MCP 서버 설정

### MCP 서버 실행

```bash
npx -y kakao-local-mcp-server
```

### MCP 설정 예시

```json
{
  "kakao-local": {
    "command": "npx",
    "args": [
      "-y",
      "kakao-local-mcp-server"
    ],
    "env": {
      "KAKAO_API_KEY": "your_kakao_rest_api_key_here"
    }
  }
}
```

## 시스템 요구사항

* Node.js >= 18.0.0

## 라이선스

MIT
